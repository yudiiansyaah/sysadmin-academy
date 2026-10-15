import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Star, ArrowRight } from 'lucide-react'
import api from '../api/client'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/v1/courses?skip=0&limit=20')
        setCourses(response.data || [])
      } catch (error) {
        console.error('Error fetching courses:', error)
        // Mock data
        setCourses([
          {
            id: 1,
            title: 'Pengenalan Linux',
            description: 'Dasar-dasar Linux, sejarah, dan distro populer',
            level: 'beginner',
          },
          {
            id: 2,
            title: 'CLI Basics',
            description: 'Master terminal CLI untuk sysadmin produktif',
            level: 'beginner',
          },
          {
            id: 3,
            title: 'User & Group Management',
            description: 'Manage users, groups, dan permissions',
            level: 'beginner',
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-900 text-green-200'
      case 'intermediate':
        return 'bg-yellow-900 text-yellow-200'
      case 'advanced':
        return 'bg-red-900 text-red-200'
      default:
        return 'bg-gray-900 text-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white">Loading courses...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-blue-400" />
            Courses
          </h1>
          <p className="text-gray-400">
            {courses.length} courses available - Choose your learning path
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            All Courses
          </button>
          <button className="px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition">
            Beginner
          </button>
          <button className="px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition">
            Intermediate
          </button>
          <button className="px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition">
            Advanced
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition group"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white opacity-50" />
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-white flex-1">{course.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Progress Bar (mock) */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-3 mb-4 text-xs text-gray-400">
                  <span>📚 3 modules</span>
                  <span>⏱ 2-3 hours</span>
                </div>

                {/* Button */}
                <button
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
