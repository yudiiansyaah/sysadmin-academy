import asyncio
import asyncssh
from typing import Optional
import logging

logger = logging.getLogger(__name__)


class SSHClient:
    """SSH client untuk lab machine connection"""
    
    def __init__(self, host: str, port: int, username: str, password: str):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.conn: Optional[asyncssh.SSHClientConnection] = None
        self.process = None
    
    async def connect(self):
        """Connect ke SSH server"""
        try:
            self.conn = await asyncssh.connect(
                self.host,
                port=self.port,
                username=self.username,
                password=self.password,
                known_hosts=None,
            )
            logger.info(f"SSH Connected: {self.username}@{self.host}:{self.port}")
            return True
        except Exception as e:
            logger.error(f"SSH Connection failed: {e}")
            return False
    
    async def execute(self, command: str) -> str:
        """Execute command di SSH server"""
        if not self.conn:
            return "Error: Not connected to SSH"
        
        try:
            result = await self.conn.run(command, check=False)
            return result.stdout + result.stderr
        except Exception as e:
            return f"Error: {str(e)}"
    
    async def close(self):
        """Close SSH connection"""
        if self.conn:
            self.conn.close()
            logger.info("SSH Connection closed")


class SSHTerminal:
    """Interactive SSH terminal session"""
    
    def __init__(self, host: str, port: int, username: str, password: str):
        self.ssh = SSHClient(host, port, username, password)
        self.session = None
    
    async def start_session(self):
        """Start interactive SSH session"""
        connected = await self.ssh.connect()
        if not connected:
            return False
        
        try:
            self.session = await self.ssh.conn.create_session(
                asyncssh.SSHClientProcess,
                request_pty=True,
            )
            return True
        except Exception as e:
            logger.error(f"Failed to create session: {e}")
            return False
    
    async def send_input(self, data: str):
        """Send input ke terminal"""
        if not self.session:
            return
        
        try:
            self.session.stdin.write(data.encode())
            await self.session.stdin.drain()
        except Exception as e:
            logger.error(f"Error sending input: {e}")
    
    async def read_output(self) -> str:
        """Read output dari terminal"""
        if not self.session:
            return ""
        
        try:
            output = await asyncio.wait_for(
                self.session.stdout.read(4096),
                timeout=1.0
            )
            return output.decode('utf-8', errors='replace')
        except asyncio.TimeoutError:
            return ""
        except Exception as e:
            logger.error(f"Error reading output: {e}")
            return ""
    
    async def close(self):
        """Close session"""
        if self.session:
            self.session.close()
        await self.ssh.close()
