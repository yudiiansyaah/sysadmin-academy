import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, Play, BookOpen } from 'lucide-react'
import api from '../api/client'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [activeModule, setActiveModule] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseRes = await api.get(`/v1/courses/${id}`)
        setCourse(courseRes.data)

        const modulesRes = await api.get(`/v1/courses/${id}/modules`)
        setModules(modulesRes.data)
      } catch (error) {
        console.error('Error fetching course:', error)
        // Mock data
        setCourse({
          id,
          title: 'CLI Basics',
          description: 'Master terminal CLI',
          level: 'beginner',
        })
        setModules([
          { id: 1, title: 'Command Dasar', content: 'pwd, ls, cd...' },
          { id: 2, title: 'File Navigation', content: 'Navigasi file system...' },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white">Course not found</div>
      </div>
    )
  }

  const currentModule = modules[activeModule]

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/courses')}
            className="text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-2"
          >
            ← Back to Courses
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
          <p className="text-gray-400">{course.description}</p>
          <div className="mt-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              course.level === 'beginner' ? 'bg-green-900 text-green-200' :
              course.level === 'intermediate' ? 'bg-yellow-900 text-yellow-200' :
              'bg-red-900 text-red-200'
            }`}>
              {course.level}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Modules */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="bg-slate-700 px-4 py-3 font-semibold text-white">
                Modules ({modules.length})
              </div>
              <div className="divide-y divide-slate-700">
                {modules.map((mod, idx) => (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModule(idx)}
                    className={`w-full text-left px-4 py-3 transition ${
                      activeModule === idx
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-bold mt-0.5">{idx + 1}</span>
                      <span className="text-sm">{mod.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-400" />
                {currentModule?.title}
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 whitespace-pre-wrap">{currentModule?.content}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <button
                onClick={() => activeModule > 0 && setActiveModule(activeModule - 1)}
                disabled={activeModule === 0}
                className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
              >
                ← Previous
              </button>
              
              <button
                onClick={() => navigate(`/lab/${course.id}`)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Play className="w-4 h-4" />
                Buka Lab
              </button>

              <button
                onClick={() => activeModule < modules.length - 1 && setActiveModule(activeModule + 1)}
                disabled={activeModule === modules.length - 1}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                Next →
              </button>
            </div>

            {/* Progress */}
            <div className="mt-6 bg-slate-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="text-white font-semibold">
                  {activeModule + 1} / {modules.length}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${((activeModule + 1) / modules.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
