import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Laptop, Award, ArrowRight } from 'lucide-react'
import api from '../api/client'

export default function Dashboard() {
  const [stats, setStats] = useState({ courses: 0, completed: 0, inProgress: 0 })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/v1/courses?skip=0&limit=1')
        if (response.data) {
          setStats({
            courses: response.data.length || 20,
            completed: 3,
            inProgress: 2,
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        setStats({ courses: 20, completed: 3, inProgress: 2 })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const features = [
    {
      icon: BookOpen,
      title: '20 Modul Pembelajaran',
      description: 'Dari pemula hingga advanced level',
      color: 'text-blue-400',
    },
    {
      icon: Laptop,
      title: 'Lab Machine Ubuntu',
      description: 'Praktik langsung di environment real',
      color: 'text-orange-400',
    },
    {
      icon: Award,
      title: 'Sertifikasi',
      description: 'Dapatkan sertifikat setelah lulus',
      color: 'text-green-400',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🚀 Sysadmin Academy
          </h1>
          <p className="text-xl text-gray-300">
            Belajar Linux Server Administration dari nol hingga expert
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition">
            <div className="text-3xl font-bold text-blue-400 mb-2">{stats.courses}</div>
            <div className="text-gray-400">Total Courses</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-green-500 transition">
            <div className="text-3xl font-bold text-green-400 mb-2">{stats.completed}</div>
            <div className="text-gray-400">Completed</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-yellow-500 transition">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.inProgress}</div>
            <div className="text-gray-400">In Progress</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-slate-800 border border-slate-700 rounded-lg p-8 hover:border-slate-600 transition hover:shadow-lg hover:shadow-blue-500/10"
            >
              <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => navigate('/courses')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2 transition"
          >
            Mulai Belajar <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/lab/1')}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2 transition"
          >
            Buka Lab Machine <Laptop className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        <div className="mt-16 bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Bagaimana cara belajar?</h2>
          <ol className="space-y-4 text-gray-300">
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">1.</span>
              <span>Pilih course dari daftar yang tersedia</span>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">2.</span>
              <span>Pelajari teori di setiap module</span>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">3.</span>
              <span>Praktik langsung di lab machine Ubuntu</span>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">4.</span>
              <span>Selesaikan quiz dan dapatkan sertifikat</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
