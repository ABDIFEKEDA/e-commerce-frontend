import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Role = "user" | "admin" | null;

type AuthState = {
  role: Role;
  email: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const ADMIN_EMAIL = "admin@trends.com";
const ADMIN_PASSWORD = "admin123";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: null,
      email: null,

      login: (email, password) => {
        if (!email || !password) return false;
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          set({ role: "admin", email });
          return true;
        }
        // Any non-admin email with any password → regular user
        if (email !== ADMIN_EMAIL) {
          set({ role: "user", email });
          return true;
        }
        // Admin email with wrong password → reject
        return false;
      },

      logout: () => set({ role: null, email: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
