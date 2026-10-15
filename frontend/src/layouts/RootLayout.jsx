import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookOpen, 
  Terminal, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  User as UserIcon,
  Bell
} from 'lucide-react'
import { useAppStore } from '../store/appStore'
import { clsx } from 'clsx'

export default function RootLayout({ children }) {
  const { sidebarOpen, toggleSidebar, logout, user } = useAppStore()
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'All Courses', path: '/courses' },
    { icon: Terminal, label: 'Sandbox Lab', path: '/lab/sandbox' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <aside 
        className={clsx(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 shadow-xl",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                SA
              </div>
              <span className="font-bold text-lg tracking-tight text-white">Sysadmin</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white mx-auto shadow-lg shadow-blue-500/20">
              S
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                isActive(item.path) 
                  ? "bg-blue-600/10 text-blue-500 shadow-sm" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              )}
            >
              <item.icon className={clsx("w-6 h-6 shrink-0 transition-transform group-hover:scale-110", isActive(item.path) && "text-blue-500")} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
              {!sidebarOpen && (
                <div className="absolute left-full ml-6 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={toggleSidebar}
            className="flex items-center gap-3 w-full px-3 py-3 text-slate-400 hover:bg-slate-800 hover:text-slate-200 rounded-xl transition-colors group"
          >
            {sidebarOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6 mx-auto" />}
            {sidebarOpen && <span className="text-sm font-medium">Collapse Sidebar</span>}
          </button>
          
          <button 
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="flex items-center gap-3 w-full px-3 py-3 text-red-400/80 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors group"
          >
            <LogOut className="w-6 h-6 shrink-0 mx-auto" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={clsx(
        "flex-1 flex flex-col transition-all duration-300",
        sidebarOpen ? "pl-64" : "pl-20"
      )}>
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-medium text-slate-400 uppercase tracking-widest">
              {location.pathname === '/' ? 'Overview' : location.pathname.split('/')[1]}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-slate-200 relative group transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-900 group-hover:scale-125 transition-transform" />
            </button>
            
            <div className="h-8 w-px bg-slate-800" />
            
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">{user?.username || 'Guest'}</p>
                <p className="text-xs text-slate-500 italic">Sysadmin Trainee</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white border-2 border-slate-800 shadow-lg group-hover:border-blue-500 transition-all overflow-hidden ring-4 ring-slate-900/50">
                <UserIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8">
          {children}
        </div>

        {/* Footer */}
        <footer className="py-6 px-8 border-t border-slate-900 bg-slate-900/30 text-slate-500 text-xs flex justify-between">
          <p>© 2026 Sysadmin Academy. Powered by Hermes.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Documentation</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Support</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
