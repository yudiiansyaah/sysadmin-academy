import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

export default function TerminalEmulator({ host = 'localhost', port = 2222, user = 'labuser' }) {
  const terminalRef = useRef(null)

  useEffect(() => {
    const term = new Terminal({
      theme: {
        background: '#0f172a',
        foreground: '#e2e8f0',
        cursor: '#64748b',
        black: '#1e293b',
        red: '#ef4444',
        green: '#22c55e',
        yellow: '#eab308',
        blue: '#3b82f6',
        magenta: '#d946ef',
        cyan: '#06b6d4',
        white: '#e2e8f0',
      },
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)

    if (terminalRef.current) {
      term.open(terminalRef.current)
      fitAddon.fit()
    }

    // Resize handler
    const handleResize = () => {
      try {
        fitAddon.fit()
      } catch (e) {
        console.error('Resize error:', e)
      }
    }

    window.addEventListener('resize', handleResize)

    // Mock terminal output (replace with real SSH connection)
    term.writeln('\x1b[32m$ Welcome to Sysadmin Academy Lab\x1b[0m')
    term.writeln('Connecting to lab machine...')
    term.writeln('SSH: ' + user + '@' + host + ':' + port)
    term.writeln('')
    term.writeln('Type your commands:')
    term.writeln('')

    // Handle input
    let currentInput = ''
    term.onData((data) => {
      if (data === '\r') {
        term.writeln('')
        // Mock command execution
        if (currentInput.trim() === 'help') {
          term.writeln('Available commands: help, pwd, ls, cd, echo, clear')
        } else if (currentInput.trim() === 'pwd') {
          term.writeln('/home/labuser')
        } else if (currentInput.trim() === 'ls') {
          term.writeln('Documents  Downloads  Desktop')
        } else if (currentInput.trim() === 'clear') {
          term.clear()
        } else if (currentInput.trim()) {
          term.writeln('$ ' + currentInput)
        }
        currentInput = ''
        term.write('\n$ ')
      } else if (data === '\u007f') {
        if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1)
          term.write('\b \b')
        }
      } else if (data >= String.fromCharCode(0x20) && data <= String.fromCharCode(0x7e)) {
        currentInput += data
        term.write(data)
      }
    })

    term.write('$ ')

    return () => {
      window.removeEventListener('resize', handleResize)
      term.dispose()
    }
  }, [host, port, user])

  return (
    <div
      ref={terminalRef}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0f172a',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    />
  )
}
