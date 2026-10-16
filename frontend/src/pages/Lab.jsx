import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  Terminal as TerminalIcon, 
  ArrowLeft,
  Copy,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronRight,
  BookOpen,
  Target
} from 'lucide-react'
import TerminalEmulator from '../components/TerminalEmulator'
import RootLayout from '../layouts/RootLayout'

const LAB_TASKS = {
  // default
  default: [
    { cmd: 'pwd', desc: 'Lihat kamu ada di mana sekarang', hint: 'Hasilnya mis: /home/labuser' },
    { cmd: 'ls -la', desc: 'Lihat semua file (termasuk hidden)', hint: 'Perhatikan .bashrc dan .profile' },
    { cmd: 'echo "halo sysadmin" > /tmp/latihan.txt && cat /tmp/latihan.txt', desc: 'Bikin file lalu lihat isinya', hint: 'Harus keluar: halo sysadmin' },
  ],
  '1': [
    { cmd: 'pwd', desc: 'Cek posisi sekarang', hint: '/home/labuser' },
    { cmd: 'ls -la', desc: 'Lihat isi home + file hidden', hint: 'Cari .bashrc' },
    { cmd: 'cat /etc/os-release', desc: 'Cek distro Ubuntu', hint: 'Harus ada Ubuntu 22.04' },
  ],
  '2': [
    { cmd: 'pwd', desc: 'Posisi awal', hint: '' },
    { cmd: 'cd /etc && ls | head -20', desc: 'Pindah ke /etc lalu lihat isinya', hint: 'Banyak file config' },
    { cmd: 'cd ~ && pwd', desc: 'Balik ke home', hint: 'Harus /home/labuser' },
  ],
}

export default function Lab() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [fullscreen, setFullscreen] = useState(false)
  const [checked, setChecked] = useState(new Set())
  const [copied, setCopied] = useState('')

  const tasks = LAB_TASKS[id] || LAB_TASKS.default
  const courseTitle = id === 'sandbox' ? 'Sandbox Lab — Bebas Coba-Coba' : id === '1' ? 'Pengenalan Linux' : id === '2' ? 'CLI Basics' : `Modul ${id}`

  const toggleCheck = (i) => {
    setChecked(s => {
      const n = new Set(s)
      if (n.has(i)) n.delete(i); else n.add(i)
      return n
    })
  }
  const copy = (t) => { navigator.clipboard.writeText(t); setCopied(t); setTimeout(()=>setCopied(''), 1200) }
  const allDone = checked.size === tasks.length

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
        <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
          <span className="text-sm font-mono text-slate-400 flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> labuser@academy:~$ — Fullscreen</span>
          <button onClick={()=>setFullscreen(false)} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold flex items-center gap-2 border border-slate-700"><Minimize2 className="w-4 h-4" /> Keluar Fullscreen</button>
        </div>
        <div className="flex-1 p-3 bg-slate-950"><div className="h-full rounded-xl overflow-hidden border border-slate-800"><TerminalEmulator /></div></div>
      </div>
    )
  }

  return (
    <RootLayout>
      <div className="max-w-[1400px] mx-auto space-y-4">
        {/* Breadcrumb + header */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link to="/" className="text-slate-500 hover:text-slate-300">Beranda</Link>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <Link to="/courses" className="text-slate-500 hover:text-slate-300">Semua Modul</Link>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <Link to={`/courses/${id}`} className="text-slate-500 hover:text-slate-300 truncate">{courseTitle}</Link>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="text-white font-bold">Lab Praktek</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white"><TerminalIcon className="w-5 h-5" /></span>
              Lab Praktek — {courseTitle}
            </h1>
            <p className="text-slate-400 text-sm mt-1">Ketik perintah di terminal kanan. Ikuti checklist kiri — centang kalau sudah berhasil. <b className="text-slate-300">Salah? Ulangi, nggak masalah.</b></p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={()=>navigate(`/courses/${id}`)} className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm flex items-center gap-2"><BookOpen className="w-4 h-4" /> Kembali ke Materi</button>
            <button onClick={()=>setFullscreen(true)} className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm flex items-center gap-2 shadow"><Maximize2 className="w-4 h-4" /> Fullscreen</button>
          </div>
        </div>

        {/* Progress checklist top */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white ${allDone ? 'bg-emerald-500' : 'bg-slate-700'}`}>{checked.size}/{tasks.length}</div>
            <div>
              <p className="text-white font-bold text-sm">{allDone ? 'Mantap! Semua tugas selesai 🎉' : `${checked.size} dari ${tasks.length} tugas selesai`}</p>
              <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1"><div className="h-full bg-emerald-500 transition-all" style={{ width: `${(checked.size/tasks.length)*100}%` }} /></div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setChecked(new Set())} className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> Reset Checklist</button>
            {allDone && <button onClick={()=>navigate(`/courses/${Number(id)+1 || 1}`)} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1">Lanjut Modul Berikutnya <ChevronRight className="w-3.5 h-3.5" /></button>}
          </div>
        </div>

        {/* Split */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 items-start">
          {/* LEFT: Tasks */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-black text-white text-sm flex items-center gap-2"><Target className="w-4 h-4 text-orange-500" /> Checklist Tugas</h3>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{tasks.length} langkah</span>
              </div>
              <div className="p-3 space-y-3">
                {tasks.map((t, i) => {
                  const done = checked.has(i)
                  return (
                    <label key={i} className={`block rounded-xl border p-3 cursor-pointer transition-all ${done ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}`}>
                      <div className="flex gap-3">
                        <input type="checkbox" checked={done} onChange={()=>toggleCheck(i)} className="mt-0.5 w-5 h-5 rounded accent-emerald-500" />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold leading-tight ${done ? 'text-emerald-300 line-through decoration-emerald-500/50' : 'text-white'}`}>{i+1}. {t.desc}</p>
                          {t.hint && <p className="text-xs text-slate-500 mt-1">Harapan: <span className="text-slate-400 font-mono">{t.hint}</span></p>}
                          <div className="mt-2 flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
                            <code className="flex-1 text-xs font-mono text-emerald-300 truncate">$ {t.cmd}</code>
                            <button onClick={(e)=>{ e.preventDefault(); copy(t.cmd) }} className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1">
                              <Copy className="w-3 h-3" /> {copied===t.cmd ? 'Tersalin' : 'Salin'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </label>
                  )
                })}
              </div>
              <div className="p-4 bg-amber-500/10 border-t border-amber-500/20 flex gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="text-xs text-amber-200 leading-relaxed"><b className="text-amber-100">Stuck?</b> Klik <b>Salin</b> lalu <b>paste di terminal</b> (Ctrl+Shift+V) dan Enter. Centang checklist kalau output sesuai harapan.</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <h4 className="font-bold text-white text-sm">Perintah Sering Dipakai</h4>
              <div className="mt-3 grid grid-cols-1 gap-2 text-xs font-mono">
                {[
                  ['pwd', 'posisi sekarang'],
                  ['ls -la', 'lihat file'],
                  ['cd /etc', 'pindah folder'],
                  ['cat file.txt', 'lihat isi'],
                  ['clear', 'bersihkan layar'],
                  ['help', 'bantuan'],
                ].map(([cmd, desc]) => (
                  <div key={cmd} className="flex justify-between bg-slate-800 rounded-lg px-3 py-2 border border-slate-700">
                    <span className="text-emerald-300">{cmd}</span>
                    <span className="text-slate-500 font-sans">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={()=>navigate(`/courses/${id}`)} className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Materi
            </button>
          </div>

          {/* RIGHT: Terminal */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col min-h-[520px] lg:min-h-[640px] shadow-xl">
            <div className="h-11 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">labuser@academy:~$ — Ubuntu 22.04 • Sandbox</span>
                <span className="ml-2 text-xs font-mono text-slate-400 sm:hidden">labuser@academy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-xs text-slate-500">Tip: Ctrl+L = clear</span>
                <button onClick={()=>setFullscreen(true)} className="px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold border border-slate-600 flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" /> Fullscreen</button>
              </div>
            </div>

            <div className="flex-1 bg-[#0f172a] p-0 overflow-hidden">
              <TerminalEmulator host="localhost" port={2222} user="labuser" />
            </div>

            <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500">Lab ini <b className="text-slate-300">aman untuk dicoba-coba</b> — nggak akan merusak laptop kamu.</p>
              <div className="flex gap-2">
                <button onClick={()=>copy('pwd')} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-emerald-300">Coba: pwd</button>
                <button onClick={()=>copy('ls -la')} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-emerald-300">Coba: ls -la</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
          <div>
            <p className="font-black">Sudah selesai semua checklist?</p>
            <p className="text-blue-100 text-sm">Centang semua, lalu lanjut ke modul berikutnya. Progress kamu kesimpan otomatis.</p>
          </div>
          <button onClick={()=>navigate(`/courses/${id}`)} className="shrink-0 px-6 py-3 rounded-xl bg-white text-blue-600 font-black flex items-center justify-center gap-2">
            Tandai Modul Selesai <CheckCircle2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </RootLayout>
  )
}
