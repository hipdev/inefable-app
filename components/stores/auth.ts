import { create } from 'zustand'

type AuthStore = {
  user: null | {}
  setUser: (user: {}) => void
  session: null | {}
  setSession: (user: {}) => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  session: null,
  setSession: (session) => set({ session }),
}))
