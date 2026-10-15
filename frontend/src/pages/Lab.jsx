import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Terminal, X } from 'lucide-react'
import TerminalEmulator from '../components/TerminalEmulator'

export default function Lab() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <div className={`${fullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-dark`}>
      {/* Header */}
      {!fullscreen && (
        <div className="bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-6 h-6 text-green-400" />
            <h1 className="text-2xl font-bold text-white">Lab Environment - Course {id}</h1>
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="text-gray-400 hover:text-white transition"
          >
            ← Exit
          </button>
        </div>
      )}

      {/* Terminal Container */}
      <div className={`${fullscreen ? 'w-full h-full' : 'p-6'}`}>
        <div className={`bg-slate-900 rounded-lg border border-slate-700 overflow-hidden ${
          fullscreen ? 'w-full h-full' : 'h-96'
        }`}>
          {/* Terminal Header */}
          <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-gray-400 text-sm font-mono">
                labuser@sysadmin-academy:~$
              </span>
            </div>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="text-gray-400 hover:text-white transition text-sm"
            >
              {fullscreen ? '[ Exit Fullscreen ]' : '[ Fullscreen ]'}
            </button>
          </div>

          {/* Terminal Content */}
          <div className={`${fullscreen ? 'w-full h-full' : 'h-full'}`}>
            <TerminalEmulator
              host="localhost"
              port={2222}
              user="labuser"
            />
          </div>
        </div>
      </div>

      {/* Instructions Panel */}
      {!fullscreen && (
        <div className="p-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Info */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">ℹ️ Lab Information</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p><strong className="text-white">Host:</strong> localhost</p>
                <p><strong className="text-white">Port:</strong> 2222</p>
                <p><strong className="text-white">User:</strong> labuser</p>
                <p><strong className="text-white">Password:</strong> labuser123</p>
                <p className="mt-4 text-yellow-400">⚠️ This is a sandbox environment for learning only.</p>
              </div>
            </div>

            {/* Common Commands */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">📋 Common Commands</h3>
              <div className="space-y-2 text-xs font-mono text-gray-300">
                <div><span className="text-green-400">pwd</span> - Print working directory</div>
                <div><span className="text-green-400">ls -la</span> - List files</div>
                <div><span className="text-green-400">cd /path</span> - Change directory</div>
                <div><span className="text-green-400">cat file.txt</span> - View file</div>
                <div><span className="text-green-400">echo "text" > file</span> - Create file</div>
                <div><span className="text-green-400">sudo apt update</span> - Update packages</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
