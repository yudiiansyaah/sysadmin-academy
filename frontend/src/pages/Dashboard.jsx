import { useNavigate } from 'react-router-dom'
import { 
  Play, 
  BookOpen, 
  Terminal as TerminalIcon, 
  CheckCircle2,
  ArrowRight,
  Clock,
  Trophy,
  Users,
  Shield,
  GraduationCap
} from 'lucide-react'
import RootLayout from '../layouts/RootLayout'

export default function Dashboard() {
  const navigate = useNavigate()
  
  return (
    <RootLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* HERO - super clear CTA */}
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-8 md:p-12 shadow-2xl">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur rounded-full text-white text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Untuk Pemula - Tidak Perlu Pengalaman
            </div>
            
            <h1 className="text-3xl md:text-[42px] font-black text-white leading-[1.1] max-w-2xl">
              Jadi <span className="text-blue-200 underline decoration-white/30 decoration-4 underline-offset-8">Sysadmin Linux</span><br />
              dari NOL sampai siap kerja
            </h1>
            <p className="text-blue-100 text-[15px] md:text-lg leading-relaxed mt-4 max-w-xl opacity-90">
              Ikuti <b className="text-white">1 jalur lurus</b> — baca teori 5 menit, langsung praktek di lab Ubuntu asli. Nggak perlu bingung mau mulai dari mana.
            </p>

            {/* PRIMARY CTA - HUGE */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/courses')}
                className="group bg-white text-blue-700 hover:bg-blue-50 px-8 py-[18px] rounded-2xl font-black text-[17px] shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
              >
                <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </span>
                Mulai Belajar Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-3 text-blue-100 text-sm">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-blue-600 flex items-center justify-center text-xs font-bold">👨‍💻</div>
                  <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-blue-600 flex items-center justify-center text-xs font-bold">👩‍💻</div>
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-xs font-bold text-blue-600">+2k</div>
                </div>
                <span>2.400+ sudah mulai</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold tracking-wide">
              <span className="px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/10">✓ 20 Modul</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/10">✓ Lab Ubuntu Asli</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/10">✓ Sertifikat</span>
            </div>
          </div>

          {/* deco */}
          <div className="absolute -right-10 -top-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-6 bottom-6 hidden lg:flex w-56 h-56 bg-indigo-400/20 rounded-[32px] border border-white/10 items-center justify-center backdrop-blur">
            <div className="text-center space-y-2">
              <TerminalIcon className="w-12 h-12 text-white/80 mx-auto" />
              <p className="text-white/60 text-xs font-mono">labuser@academy:~$</p>
              <p className="text-emerald-300 text-xs font-mono">▌ pwd → /home/labuser</p>
            </div>
          </div>
        </section>

        {/* 3 STEPS - HOW IT WORKS - ultra clear */}
        <section className="bg-slate-900 border border-slate-800 rounded-[24px] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white font-black text-sm">?</div>
            <h2 className="text-white font-black text-lg">Gimana cara belajarnya? <span className="text-slate-500 font-normal">Cuma 3 langkah, ulang terus.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 relative">
            {/* arrow line desktop */}
            <div className="hidden md:block absolute top-[34px] left-[18%] right-[18%] h-0.5 bg-slate-800" />
            {[
              { n: '1', icon: BookOpen, title: 'Baca 5 Menit', desc: 'Penjelasan singkat pakai bahasa santai + contoh perintah', color: 'bg-blue-600' },
              { n: '2', icon: TerminalIcon, title: 'Praktek di Lab', desc: 'Ketik perintah beneran di Ubuntu. Salah? Coba lagi.', color: 'bg-orange-500' },
              { n: '3', icon: Trophy, title: 'Dapat Centang ✓', desc: 'Selesai 1 modul → progress nambah → lanjut modul berikut', color: 'bg-emerald-500' },
            ].map(s => (
              <div key={s.n} className="relative bg-slate-800/50 border border-slate-800 rounded-2xl p-5 text-center">
                <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center mx-auto shadow-lg text-white relative z-10`}>
                  <s.icon className="w-7 h-7" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center text-xs font-black text-white z-20">{s.n}</div>
                <h3 className="font-black text-white mt-4">{s.title}</h3>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-slate-500">Bingung?</span>
            <button onClick={() => navigate('/courses')} className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1">
              Lihat Jalur Belajar Lengkap <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* CONTINUE vs START - personalized */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-[24px] p-6 md:p-7">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-white text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" /> Lanjutkan Belajar
              </h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Rekomendasi untuk kamu</span>
            </div>

            <div className="space-y-4">
              {[
                { id: 1, title: 'Pengenalan Linux', next: 'Struktur File System • 3 menit lagi', pct: 100, done: true },
                { id: 2, title: 'CLI Basics', next: 'File Navigation (cd, ls) • Mulai di sini', pct: 35, done: false, active: true },
              ].map(c => (
                <div key={c.id} className={`rounded-2xl border p-5 flex gap-4 items-center ${c.active ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-slate-800 border-slate-700 opacity-90'}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${c.active ? 'bg-white text-blue-600' : c.done ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    {c.done ? <CheckCircle2 className="w-6 h-6" /> : c.active ? <Play className="w-5 h-5 fill-current ml-0.5" /> : <BookOpen className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold truncate ${c.active ? 'text-white' : 'text-white'}`}>{c.title}</h3>
                      {c.done && <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">SELESAI</span>}
                      {c.active && <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white text-blue-600">LANJUTKAN</span>}
                    </div>
                    <p className={`text-sm truncate ${c.active ? 'text-blue-100' : 'text-slate-400'}`}>{c.next}</p>
                    <div className="mt-2 h-1.5 rounded-full overflow-hidden bg-black/20">
                      <div className={`h-full ${c.active ? 'bg-white' : 'bg-emerald-500'}`} style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                  <button onClick={() => navigate(c.active ? `/courses/${c.id}` : `/courses/${c.id}`)} className={`hidden sm:flex px-5 py-2.5 rounded-xl font-black text-sm shrink-0 ${c.active ? 'bg-white text-blue-600' : 'bg-slate-700 text-slate-200'}`}>
                    {c.done ? 'Ulangi' : c.active ? 'Lanjut' : 'Mulai'}
                  </button>
                </div>
              ))}
            </div>

            <button onClick={() => navigate('/courses')} className="w-full mt-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold transition-colors">
              Lihat Semua 20 Modul →
            </button>
          </div>

          {/* RIGHT - levels overview */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-[24px] p-6">
              <h3 className="font-black text-white flex items-center gap-2"><GraduationCap className="w-5 h-5 text-purple-500" /> Jalur 20 Modul</h3>
              <p className="text-slate-500 text-sm mt-1">Urut dari paling gampang. Jangan loncat.</p>
              <div className="mt-5 space-y-3">
                {[
                  { level: 'Pemula', range: 'Modul 1-6', desc: 'Linux, CLI, User', color: 'emerald', count: '6 modul • 4 jam', pct: 50 },
                  { level: 'Menengah', range: 'Modul 7-13', desc: 'Network, SSH, Service', color: 'amber', count: '7 modul • 6 jam', pct: 0 },
                  { level: 'Mahir', range: 'Modul 14-20', desc: 'Docker, Security', color: 'rose', count: '7 modul • 8 jam', pct: 0 },
                ].map(l => (
                  <div key={l.level} className="flex gap-3 items-center p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0 ${l.color==='emerald' ? 'bg-emerald-600' : l.color==='amber' ? 'bg-amber-500' : 'bg-rose-500'}`}>{l.range.split(' ')[1]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm leading-none">{l.level}</p>
                      <p className="text-slate-500 text-xs truncate">{l.desc}</p>
                      <p className="text-[11px] text-slate-600">{l.count}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-white">{l.pct}%</p>
                      <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden mt-1"><div className="h-full bg-white" style={{ width: `${l.pct}%` }} /></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-2">
                <Shield className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-200 leading-relaxed"><b className="text-white">Tips:</b> Selesaikan berurutan. Modul 1 dulu, baru 2. Jangan loncat — nanti bingung.</p>
              </div>
            </div>

            <div className="rounded-[24px] p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center"><Users className="w-6 h-6 text-slate-300" /></div>
              <div>
                <p className="text-white font-bold text-sm">Butuh bantuan?</p>
                <p className="text-slate-400 text-xs">Lab error? Tanya di lab, ada panduan perintah siap pakai.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </RootLayout>
  )
}
