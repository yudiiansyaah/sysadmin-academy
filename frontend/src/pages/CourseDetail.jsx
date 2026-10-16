import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  BookOpen, 
  Terminal as TerminalIcon,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Clock,
  Copy,
  Lightbulb,
  Target,
  ChevronRight,
  Menu,
  X
} from 'lucide-react'
import api from '../api/client'
import RootLayout from '../layouts/RootLayout'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [activeModule, setActiveModule] = useState(0)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [doneModules, setDoneModules] = useState(new Set([0]))

  useEffect(() => {
    const fetch = async () => {
      try {
        const c = await api.get(`/v1/courses/${id}`)
        setCourse(c.data)
        const m = await api.get(`/v1/courses/${id}/modules`)
        if (m.data && m.data.length) setModules(m.data)
        else throw new Error('empty')
      } catch {
        setCourse({ id, title: id==1 ? 'Pengenalan Linux' : id==2 ? 'CLI Basics' : `Modul ${id}`, description: 'Belajar langkah demi langkah dengan praktek langsung di lab.', level: 'beginner' })
        const mocks = {
          1: [
            { id: 1, title: 'Apa itu Linux?', content: `Linux itu sistem operasi seperti Windows, tapi gratis dan dipakai di hampir semua server di dunia.\n\nKenapa sysadmin harus kuasai Linux?\n• 96% server cloud pakai Linux\n• Lebih stabil & aman untuk server\n• Gratis, bisa dioprek sesuka hati\n\nDistro populer:\n• Ubuntu — paling ramah pemula (kita pakai ini di lab)\n• Debian — stabil untuk server\n• Rocky/Alma — pengganti CentOS\n\nStruktur folder penting:\n/\n├── /home  → file kamu\n├── /etc   → konfigurasi\n├── /var   → log & data\n└── /tmp   → file sementara\n\nCoba di lab: ketik "pwd" lalu "ls -la" untuk lihat kamu ada di mana.` },
            { id: 2, title: 'Distro & Memilih Ubuntu', content: `Untuk pemula, pakai Ubuntu.\n\nKenapa Ubuntu?\n• Dokumentasi paling banyak\n• apt install gampang\n• Komunitas besar\n\nPerintah cek distro:\n\ncat /etc/os-release\nlsb_release -a\nuname -a\n\nDi lab kita sudah pakai Ubuntu 22.04. Kamu tidak perlu install — langsung pakai.` },
            { id: 3, title: 'Struktur File System', content: `Bayangkan "/" itu seperti C:\\ di Windows.\n\nPerintah penting:\n\npwd          → lihat posisi sekarang\nls -la       → lihat isi folder (+ hidden)\ncd /etc      → pindah ke /etc\ncd ~         → pulang ke home\ncd ..        → naik 1 level\ncd -         → balik ke folder sebelumnya\n\nLatihan lab:\n1. pwd\n2. ls -la\n3. cd /etc && ls | head -20\n4. cd ~ && pwd` },
          ],
          2: [
            { id: 1, title: 'Perintah Wajib Hafal', content: `5 perintah yang dipakai tiap hari:\n\npwd  — Print Working Directory\nMenunjukkan kamu di mana.\n  $ pwd\n  /home/labuser\n\nls — List\nMelihat isi folder.\n  $ ls\n  Documents  Downloads\n  $ ls -la        # lengkap + hidden\n  $ ls -lh        # ukuran readable\n  $ ls -lt        # urut waktu\n\ncd — Change Directory\nPindah folder.\n  $ cd /etc\n  $ cd ~          # ke home\n  $ cd ..         # naik\n  $ cd -          # balik sebelumnya\n\nTips TAB: ketik "cd /e" lalu tekan TAB → otomatis jadi /etc` },
            { id: 2, title: 'Navigasi File', content: `Path ada 2 jenis:\n• Absolute: /home/labuser/file.txt  (dari akar)\n• Relative: Documents/file.txt      (dari posisi sekarang)\n\nSimbol penting:\n.   → folder sekarang\n..  → folder induk\n~   → home kamu\n-   → folder sebelumnya\n\nPerintah bantuan navigasi:\n\npushd /tmp    # simpan posisi + pindah\npopd          # balik ke posisi tersimpan\ntree -L 2     # lihat struktur pohon (install: sudo apt install tree)\n\nLatihan:\n  cd /var/log\n  pwd\n  ls | head -20\n  cd ~\n  pushd /tmp && pwd && popd && pwd` },
            { id: 3, title: 'Edit & Lihat File', content: `Lihat isi file:\n  cat file.txt         # tampil semua\n  less file.txt        # bisa scroll (q keluar)\n  head -20 file.txt    # 20 baris pertama\n  tail -20 file.txt    # 20 baris terakhir\n  tail -f /var/log/syslog  # ikuti log live\n\nEdit file:\n  nano file.txt\n    Ctrl+O → Save\n    Ctrl+X → Exit\n    Ctrl+K → Cut\n    Ctrl+U → Paste\n\n  vim file.txt (lebih pro)\n    i → mode ketik\n    ESC → mode perintah\n    :w → save, :q → quit, :wq → save+quit\n    dd → hapus baris, yy → copy, p → paste\n\nCoba:\n  echo "halo sysadmin" > /tmp/coba.txt\n  cat /tmp/coba.txt\n  nano /tmp/coba.txt` },
          ],
        }
        setModules(mocks[id] || [
          { id: 1, title: 'Materi 1 — Baca dulu', content: 'Penjelasan singkat dengan bahasa santai. Fokus 1 topik per materi, jangan loncat.\n\nContoh perintah:\n  echo "hello"\n  pwd\n  ls -la' },
          { id: 2, title: 'Materi 2 — Praktek', content: 'Setelah baca, langsung praktek di lab. Salah itu wajar — ulang sampai bisa.' },
          { id: 3, title: 'Materi 3 — Rangkuman', content: 'Cek lagi apa yang sudah dipelajari. Tandai selesai kalau sudah paham.' },
        ])
      } finally { setLoading(false) }
    }
    fetch()
  }, [id])

  const copyCmd = (t) => { navigator.clipboard.writeText(t); setCopied(t); setTimeout(()=>setCopied(''), 1500) }

  if (loading) {
    return <RootLayout><div className="max-w-5xl mx-auto py-20 text-center"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" /><p className="text-slate-500 mt-4">Memuat modul...</p></div></RootLayout>
  }
  if (!course) {
    return <RootLayout><div className="max-w-xl mx-auto py-16 text-center bg-slate-900 border border-slate-800 rounded-2xl p-8"><p className="text-white font-bold">Modul tidak ketemu</p><button onClick={()=>navigate('/courses')} className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">Kembali ke Daftar</button></div></RootLayout>
  }

  const cur = modules[activeModule]
  const pct = Math.round(((activeModule + 1) / modules.length) * 100)
  const isDone = doneModules.has(activeModule)
  const isLast = activeModule === modules.length - 1

  // simple markdown-ish renderer for code blocks
  const renderContent = (text) => {
    const parts = text.split(/```/g)
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        // code block
        const lines = part.replace(/^bash\n?/, '').trim()
        return (
          <div key={i} className="relative group/code bg-slate-950 border border-slate-800 rounded-xl overflow-hidden my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
              <span className="text-[11px] font-black tracking-widest uppercase text-slate-500">Terminal</span>
              <button onClick={()=>copyCmd(lines)} className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
                <Copy className="w-3.5 h-3.5" /> {copied===lines ? 'Tersalin!' : 'Salin'}
              </button>
            </div>
            <pre className="p-4 text-[13px] leading-relaxed text-emerald-300 font-mono overflow-x-auto whitespace-pre-wrap">{lines}</pre>
          </div>
        )
      }
      // normal text - handle bold and bullets
      return (
        <div key={i} className="space-y-3 text-[15px] leading-relaxed text-slate-300 whitespace-pre-wrap">
          {part.split('\n').map((line, li) => {
            if (!line.trim()) return <div key={li} className="h-2" />
            if (line.startsWith('•') || line.startsWith('-')) return <div key={li} className="flex gap-2"><span className="text-blue-500 mt-1">•</span><span>{line.replace(/^[•\-]\s*/, '')}</span></div>
            // bold **text**
            const boldSplit = line.split(/(\*\*.*?\*\*)/g)
            return <div key={li}>{boldSplit.map((b, bi) => b.startsWith('**') ? <b key={bi} className="text-white font-bold">{b.slice(2,-2)}</b> : b)}</div>
          })}
        </div>
      )
    })
  }

  return (
    <RootLayout>
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <Link to="/" className="text-slate-500 hover:text-slate-300">Beranda</Link>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <Link to="/courses" className="text-slate-500 hover:text-slate-300">Semua Modul</Link>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="text-white font-bold truncate">{course.title}</span>
        </div>

        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-black uppercase tracking-widest">Pemula • Modul {course.order || id}</span>
              <span className="flex items-center gap-1 text-xs text-slate-500"><Clock className="w-3.5 h-3.5" /> ±60 menit • 3 materi</span>
            </div>
            <h1 className="text-2xl md:text-[26px] font-black text-white leading-tight">{course.title}</h1>
            <p className="text-slate-400 text-sm mt-1">{course.description}</p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-black tracking-widest uppercase text-slate-500">Progress Modul Ini</p>
              <p className="text-white font-black">{activeModule+1} / {modules.length} • {pct}%</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-white">{pct}%</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-600 transition-all" style={{ width: `${pct}%` }} /></div>

        <div className="mt-6 flex gap-6">
          {/* Sidebar */}
          <aside className={`${mobileMenu ? 'fixed inset-0 z-40 bg-slate-950/80 backdrop-blur p-4 md:static md:bg-transparent md:p-0' : 'hidden md:block'} md:w-[300px] shrink-0`}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden md:sticky md:top-24">
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-black text-white text-sm">Daftar Materi</h3>
                <button onClick={()=>setMobileMenu(false)} className="md:hidden p-1 text-slate-400"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-3 space-y-2">
                {modules.map((m, idx) => {
                  const done = doneModules.has(idx)
                  const active = idx === activeModule
                  return (
                    <button key={m.id} onClick={()=>{ setActiveModule(idx); setMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className={`w-full text-left rounded-xl p-3.5 flex gap-3 items-start border transition-all ${active ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : done ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-800/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-black ${active ? 'bg-white text-blue-600' : done ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                        {done && !active ? <CheckCircle2 className="w-5 h-5" /> : idx+1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold leading-tight ${active ? 'text-white' : done ? 'text-white' : 'text-slate-200'}`}>{m.title}</p>
                        <p className={`text-xs mt-0.5 ${active ? 'text-blue-100' : 'text-slate-500'}`}>{done ? 'Selesai ✓' : active ? 'Sedang dibaca' : 'Belum dibaca'}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
              <div className="p-4 bg-slate-800/40 border-t border-slate-800">
                <p className="text-xs text-slate-500 leading-relaxed"><b className="text-slate-300">Urut ya:</b> baca dari atas ke bawah. Jangan loncat.</p>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Mobile toggle */}
            <button onClick={()=>setMobileMenu(true)} className="md:hidden w-full py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold flex items-center justify-center gap-2">
              <Menu className="w-4 h-4" /> Lihat Daftar Materi ({activeModule+1}/{modules.length})
            </button>

            {/* Top nav */}
            <div className="flex items-center justify-between gap-2">
              <button disabled={activeModule===0} onClick={()=>setActiveModule(v=>Math.max(0,v-1))} className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-sm disabled:opacity-30 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Sebelumnya
              </button>
              <span className="text-xs font-black tracking-widest uppercase text-slate-500 hidden sm:block">Materi {activeModule+1} dari {modules.length}</span>
              <button disabled={isLast} onClick={()=>setActiveModule(v=>Math.min(modules.length-1,v+1))} className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-black text-sm disabled:opacity-30 flex items-center gap-2">
                Selanjutnya <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-black uppercase tracking-widest">
                  <BookOpen className="w-3.5 h-3.5" /> Materi {activeModule+1}
                </div>
                <h2 className="text-[22px] md:text-2xl font-black text-white mt-3 leading-tight">{cur?.title}</h2>

                <div className="mt-6">
                  {cur?.content ? renderContent(cur.content) : <p className="text-slate-400">Konten segera hadir.</p>}
                </div>

                <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-200 leading-relaxed"><b className="text-amber-100">Tips pemula:</b> Jangan hafal semua. Pahami 1 perintah, langsung coba di lab. Salah = belajar.</p>
                </div>
              </div>

              {/* Action bar */}
              <div className="px-6 md:px-8 py-5 bg-slate-800/50 border-t border-slate-800 flex flex-col md:flex-row gap-3 md:items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDone ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    {isDone ? <CheckCircle2 className="w-6 h-6" /> : <Target className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{isDone ? 'Materi ini sudah selesai' : 'Sudah paham materi ini?'}</p>
                    <p className="text-slate-500 text-xs">{isDone ? 'Lanjut praktek atau materi berikutnya.' : 'Tandai selesai kalau sudah ngerti.'}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setDoneModules(s=>{ const n=new Set(s); n.add(activeModule); return n })} className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-black text-sm border ${isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white text-slate-900 border-white hover:bg-slate-100'}`}>
                    {isDone ? '✓ Sudah Selesai' : 'Tandai Selesai'}
                  </button>
                  <button onClick={()=>navigate(`/lab/${course.id}`)} className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                    <TerminalIcon className="w-4 h-4" /> Buka Lab
                  </button>
                </div>
              </div>
            </article>

            {/* Practice task */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-black text-white flex items-center gap-2"><Target className="w-5 h-5 text-orange-500" /> Tugas Praktek Modul Ini</h3>
              <p className="text-slate-500 text-sm mt-1">Kerjakan di lab. Centang kalau sudah berhasil.</p>
              <div className="mt-4 space-y-2.5">
                {[
                  `Ketik "pwd" dan "ls -la" di lab`,
                  `Coba "cd /etc" lalu "pwd" lagi`,
                  `Buat file: echo "halo" > /tmp/latihan.txt && cat /tmp/latihan.txt`,
                ].map((t,i)=>(
                  <label key={i} className="flex gap-3 p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 w-4 h-4 rounded accent-blue-600" />
                    <span className="text-sm text-slate-300 font-mono">{t}</span>
                  </label>
                ))}
              </div>
              <button onClick={()=>navigate(`/lab/${course.id}`)} className="mt-4 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold flex items-center justify-center gap-2">
                <TerminalIcon className="w-4 h-4" /> Kerjakan di Lab Sekarang <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom nav */}
            <div className="flex gap-3">
              <button disabled={activeModule===0} onClick={()=>setActiveModule(v=>v-1)} className="flex-1 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold disabled:opacity-30">← Sebelumnya</button>
              {isLast ? (
                <button onClick={()=>navigate('/courses')} className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black">Selesai Modul Ini → Lihat Modul Berikutnya</button>
              ) : (
                <button onClick={()=>setActiveModule(v=>v+1)} className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black">Lanjut: {modules[activeModule+1]?.title?.slice(0,22)} →</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  )
}
