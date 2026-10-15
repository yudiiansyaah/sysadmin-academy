"""
SSH Service unit tests
"""
import pytest
from app.services.ssh_service import SSHClient, SSHTerminal


@pytest.mark.asyncio
async def test_ssh_client_connection_failed():
    """Test SSH connection failure"""
    client = SSHClient(
        host="invalid.host",
        port=2222,
        username="testuser",
        password="testpass"
    )
    result = await client.connect()
    assert result == False


@pytest.mark.asyncio
async def test_ssh_terminal_init():
    """Test SSH terminal initialization"""
    terminal = SSHTerminal(
        host="localhost",
        port=2222,
        username="labuser",
        password="labuser123"
    )
    assert terminal.ssh.host == "localhost"
    assert terminal.ssh.port == 2222
    assert terminal.ssh.username == "labuser"
