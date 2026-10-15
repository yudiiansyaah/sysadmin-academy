from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.ssh_service import SSHTerminal
from app.core.config import settings
import asyncio
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1", tags=["terminal"])

# Store active terminals (user_id -> terminal)
active_terminals = {}


@router.websocket("/ws/terminal/{user_id}")
async def websocket_terminal(websocket: WebSocket, user_id: int):
    """WebSocket endpoint untuk SSH terminal"""
    await websocket.accept()
    
    terminal = None
    try:
        # Create SSH terminal connection
        terminal = SSHTerminal(
            host=settings.LAB_SSH_HOST,
            port=settings.LAB_SSH_PORT,
            username=settings.LAB_SSH_USER,
            password="labuser123",  # Dari config
        )
        
        # Start session
        session_started = await terminal.start_session()
        if not session_started:
            await websocket.send_json({
                "type": "error",
                "message": "Failed to connect to lab machine"
            })
            await websocket.close()
            return
        
        active_terminals[user_id] = terminal
        
        # Send welcome message
        await websocket.send_json({
            "type": "output",
            "data": f"Connected to {settings.LAB_SSH_HOST}:{settings.LAB_SSH_PORT}\n"
        })
        
        # Read loop
        while True:
            data = await websocket.receive_text()
            
            if data == "ping":
                await websocket.send_json({"type": "pong"})
                continue
            
            # Send command
            await terminal.send_input(data)
            
            # Read response
            await asyncio.sleep(0.1)
            output = await terminal.read_output()
            
            if output:
                await websocket.send_json({
                    "type": "output",
                    "data": output
                })
    
    except WebSocketDisconnect:
        logger.info(f"Terminal disconnected: {user_id}")
    except Exception as e:
        logger.error(f"Terminal error: {e}")
        await websocket.send_json({
            "type": "error",
            "message": str(e)
        })
    finally:
        # Cleanup
        if terminal:
            await terminal.close()
        if user_id in active_terminals:
            del active_terminals[user_id]


@router.get("/terminal/status/{user_id}")
async def terminal_status(user_id: int):
    """Check terminal connection status"""
    connected = user_id in active_terminals
    return {
        "user_id": user_id,
        "connected": connected,
        "host": settings.LAB_SSH_HOST,
        "port": settings.LAB_SSH_PORT
    }


@router.post("/terminal/disconnect/{user_id}")
async def disconnect_terminal(user_id: int):
    """Disconnect terminal"""
    if user_id in active_terminals:
        terminal = active_terminals[user_id]
        await terminal.close()
        del active_terminals[user_id]
        return {"message": "Disconnected"}
    return {"message": "Not connected"}
