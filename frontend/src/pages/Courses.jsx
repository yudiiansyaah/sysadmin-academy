import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  BookOpen, 
  Search, 
  CheckCircle2,
  Lock,
  Play,
  Clock,
  ChevronRight,
  GraduationCap,
  Filter
} from 'lucide-react'
import api from '../api/client'
import RootLayout from '../layouts/RootLayout'
import { clsx } from 'clsx'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/v1/courses?skip=0&limit=20')
        if (response.data && response.data.length > 0) setCourses(response.data)
        else throw new Error('empty')
      } catch {
        setCourses([
          { id: 1, title: 'Pengenalan Linux', description: 'Apa itu Linux, kenapa dipakai server, dan distro populer', level: 'beginner', order: 1, duration: '45 menit' },
          { id: 2, title: 'CLI Basics', description: 'Perintah dasar terminal: pwd, ls, cd, mkdir, cat', level: 'beginner', order: 2, duration: '60 menit' },
          { id: 3, title: 'User & Group', description: 'Buat user, atur password, dan permission file', level: 'beginner', order: 3, duration: '50 menit' },
          { id: 4, title: 'File System & Storage', description: 'Disk, partisi, mount, dan cek pemakaian', level: 'beginner', order: 4, duration: '55 menit' },
          { id: 5, title: 'Package Management', description: 'Install aplikasi pakai apt & yum', level: 'beginner', order: 5, duration: '40 menit' },
          { id: 6, title: 'Process Management', description: 'Lihat proses, hentikan program, dan background job', level: 'beginner', order: 6, duration: '45 menit' },
          { id: 7, title: 'Networking Basics', description: 'Cek IP, ping, DNS, dan port', level: 'intermediate', order: 7, duration: '70 menit' },
          { id: 8, title: 'SSH & Remote Access', description: 'Login jarak jauh yang aman pakai SSH key', level: 'intermediate', order: 8, duration: '60 menit' },
          { id: 9, title: 'Systemd & Services', description: 'Nyalakan/matikan service pakai systemctl', level: 'intermediate', order: 9, duration: '55 menit' },
          { id: 10, title: 'System Monitoring', description: 'Pantau CPU, RAM, disk biar nggak lemot', level: 'intermediate', order: 10, duration: '60 menit' },
          { id: 11, title: 'Backup & Recovery', description: 'Backup pakai tar & rsync, restore saat darurat', level: 'intermediate', order: 11, duration: '65 menit' },
          { id: 12, title: 'Security Hardening', description: 'Firewall UFW, fail2ban, dan amankan SSH', level: 'intermediate', order: 12, duration: '75 menit' },
          { id: 13, title: 'Shell Scripting', description: 'Bikin script bash untuk otomatisasi', level: 'advanced', order: 13, duration: '80 menit' },
          { id: 14, title: 'Cron & Scheduling', description: 'Jadwalkan tugas otomatis tiap jam/hari', level: 'advanced', order: 14, duration: '50 menit' },
          { id: 15, title: 'Web Server (Nginx/Apache)', description: 'Setup web server dan virtual host', level: 'advanced', order: 15, duration: '90 menit' },
          { id: 16, title: 'Database Admin', description: 'Install & backup MySQL/PostgreSQL', level: 'advanced', order: 16, duration: '85 menit' },
          { id: 17, title: 'Docker & Container', description: 'Jalankan aplikasi pakai container', level: 'advanced', order: 17, duration: '90 menit' },
          { id: 18, title: 'Log Management', description: 'Baca log, atur rotasi, dan cari error', level: 'advanced', order: 18, duration: '60 menit' },
          { id: 19, title: 'Troubleshooting', description: 'Cari akar masalah saat server error', level: 'advanced', order: 19, duration: '70 menit' },
          { id: 20, title: 'Production Ready', description: 'Siap deploy: monitoring, HA, dan best practice', level: 'advanced', order: 20, duration: '75 menit' },
        ])
      } finally { setLoading(false) }
    }
    fetchCourses()
  }, [])

  // progress mock: user done 1, current 2
  const completedIds = new Set([1])
  const currentId = 2

  const filtered = courses
    .filter(c => filter === 'all' || c.level === filter)
    .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a,b) => a.order - b.order)

  const overallPct = Math.round((completedIds.size / courses.length) * 100) || 5

  if (loading) {
    return (
      <RootLayout>
        <div className="max-w-5xl mx-auto space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-28 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />)}
        </div>
      </RootLayout>
    )
  }

  return (
    <RootLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header - very explicit */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-blue-400">
            <GraduationCap className="w-4 h-4" /> Jalur Belajar
          </div>
          <h1 className="text-[28px] md:text-3xl font-black text-white leading-tight">
            Ikuti urutan <span className="text-blue-400">1 → 20</span>. Jangan loncat.
          </h1>
          <p className="text-slate-400 text-[15px] leading-relaxed max-w-2xl">
            Dibuat untuk pemula total. Setiap modul cuma <b className="text-slate-200">5–10 menit baca</b> lalu langsung praktek. Selesai 1, baru buka yang berikutnya.
          </p>
        </div>

        {/* Overall progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <p className="text-xs font-black tracking-widest uppercase text-slate-500">Progress Kamu</p>
            <p className="text-white font-bold mt-1">Modul {completedIds.size} selesai dari {courses.length} • {overallPct}% • Sisa ±18 jam</p>
            <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-600" style={{ width: `${overallPct}%` }} /></div>
          </div>
          <button onClick={() => navigate(`/courses/${currentId}`)} className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-black px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <Play className="w-5 h-5 fill-current" /> Lanjutkan Modul {currentId}
          </button>
        </div>

        {/* Controls - subtle */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Cari modul... mis: docker, ssh, nginx" className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id:'all', label:'Semua (20)' },
              { id:'beginner', label:'Pemula' },
              { id:'intermediate', label:'Menengah' },
              { id:'advanced', label:'Mahir' },
            ].map(f=>(
              <button key={f.id} onClick={()=>setFilter(f.id)} className={clsx("px-4 py-3 rounded-xl text-sm font-bold border whitespace-nowrap", filter===f.id ? "bg-white text-slate-900 border-white" : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white")}>{f.label}</button>
            ))}
          </div>
        </div>

        {/* Level hint */}
        <div className="flex gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">Pemula 1–6</span>
          <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">Menengah 7–12</span>
          <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">Mahir 13–20</span>
        </div>

        {/* TIMELINE */}
        <div className="relative">
          <div className="absolute left-[22px] top-6 bottom-6 w-0.5 bg-slate-800 hidden md:block" />
          <div className="space-y-4">
            {filtered.map(course => {
              const isDone = completedIds.has(course.id)
              const isCurrent = course.id === currentId
              const isLocked = course.id > currentId + 2 // lock future far ahead
              const levelStyle = course.level === 'beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : course.level === 'intermediate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              return (
                <div key={course.id} className={clsx("relative bg-slate-900 border rounded-2xl p-5 flex gap-4 items-start md:items-center transition-all", isCurrent ? "border-blue-500 shadow-xl shadow-blue-500/10 bg-slate-900" : isLocked ? "border-slate-800 opacity-60" : "border-slate-800 hover:border-slate-700")}>
                  {/* Number circle */}
                  <div className={clsx("w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border-2", isDone ? "bg-emerald-500 border-emerald-500 text-white" : isCurrent ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30" : isLocked ? "bg-slate-800 border-slate-700 text-slate-500" : "bg-slate-800 border-slate-700 text-slate-300")}>
                    {isDone ? <CheckCircle2 className="w-6 h-6" /> : isLocked ? <Lock className="w-4 h-4" /> : course.order}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={clsx("font-black text-[15px] md:text-base", isLocked ? "text-slate-500" : "text-white")}>{course.order}. {course.title}</h3>
                      <span className={clsx("px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border", levelStyle)}>{course.level === 'beginner' ? 'Pemula' : course.level === 'intermediate' ? 'Menengah' : 'Mahir'}</span>
                      {isCurrent && <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest">Mulai di sini →</span>}
                      {isDone && <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black">SELESAI</span>}
                    </div>
                    <p className={clsx("text-sm mt-1 leading-relaxed", isLocked ? "text-slate-500" : "text-slate-400")}>{course.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> 3 materi</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                      <span className="hidden sm:inline-flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Lab tersedia</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-end gap-2">
                    {isLocked ? (
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1"><Lock className="w-3 h-3" /> Terkunci — selesaikan {currentId} dulu</span>
                    ) : (
                      <button onClick={()=>!isLocked && navigate(`/courses/${course.id}`)} className={clsx("px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-2", isCurrent ? "bg-blue-600 hover:bg-blue-500 text-white shadow" : isDone ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700" : "bg-white hover:bg-slate-100 text-slate-900")}>
                        {isDone ? "Ulangi" : isCurrent ? "Lanjutkan" : "Mulai"} <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {filtered.length===0 && (
          <div className="py-16 text-center bg-slate-900 border border-slate-800 rounded-2xl">
            <Search className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-white font-bold mt-3">Tidak ketemu</p>
            <p className="text-slate-500 text-sm">Coba kata kunci lain atau ganti filter.</p>
          </div>
        )}

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4 flex gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-black">!</div>
          <p className="text-sm text-blue-200 leading-relaxed"><b className="text-white">Kenapa urut?</b> Modul 2 butuh paham Modul 1. Kalau loncat, perintah di lab bakal error dan kamu bingung. Ikuti angka — sudah diurut dari paling gampang.</p>
        </div>
      </div>
    </RootLayout>
  )
}
