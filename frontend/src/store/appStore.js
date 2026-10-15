import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set, get) => ({
      // User
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),

      // Current course/module
      currentCourse: null,
      currentModuleIndex: 0,
      setCurrentCourse: (course) => set({ currentCourse: course, currentModuleIndex: 0 }),
      setCurrentModuleIndex: (index) => set({ currentModuleIndex: index }),

      // Progress
      progress: {},
      updateProgress: (courseId, moduleIndex, completed) => set((state) => ({
        progress: {
          ...state.progress,
          [courseId]: {
            ...state.progress[courseId],
            completedModules: completed ? [...new Set([...(state.progress[courseId]?.completedModules || []), moduleIndex])] : state.progress[courseId]?.completedModules || [],
            currentModule: moduleIndex,
            lastAccessed: Date.now()
          }
        }
      })),

      // UI State
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Lab
      labFullscreen: false,
      setLabFullscreen: (fullscreen) => set({ labFullscreen: fullscreen }),

      // Notifications
      notifications: [],
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, { id: Date.now(), ...notification }]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      }))
    }),
    {
      name: 'sysadmin-academy-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        progress: state.progress,
        sidebarOpen: state.sidebarOpen
      })
    }
  )
)