import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  name?: string;
  phone?: string;
  role: 'user' | 'admin';
}

interface Appointment {
  id: number;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected';
  rejectionReason?: string;
  userEmail: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  appointments: Appointment[];
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'userEmail'>) => void;
  updateAppointmentStatus: (id: number, status: 'accepted' | 'rejected', rejectionReason?: string) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      appointments: [],
      login: async (email: string, password: string) => {
        // Simulate admin login for demo
        const isAdmin = email.includes('admin');
        set({
          isAuthenticated: true,
          user: { email, role: isAdmin ? 'admin' : 'user' }
        });
      },
      signup: async (email: string, password: string) => {
        set({
          isAuthenticated: true,
          user: { email, role: 'user' }
        });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null, appointments: [] });
      },
      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
      addAppointment: (appointment) => {
        set((state) => ({
          appointments: [
            ...state.appointments,
            {
              ...appointment,
              id: Date.now(),
              status: 'pending',
              userEmail: state.user?.email || '',
            },
          ],
        }));
      },
      updateAppointmentStatus: (id, status, rejectionReason) => {
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === id
              ? { ...apt, status, rejectionReason }
              : apt
          ),
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);