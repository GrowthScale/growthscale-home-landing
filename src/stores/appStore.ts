import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Session } from '@/lib/auth';

// Tipos
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  createdAt: Date;
  read: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'business';
  settings: {
    timezone: string;
    workingHours: {
      start: string;
      end: string;
    };
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AppState {
  // Usuário e autenticação
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Tenant
  tenant: Tenant | null;
  
  // Notificações
  notifications: Notification[];
  
  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  
  // Modals
  modals: {
    login: boolean;
    register: boolean;
    twoFactor: boolean;
    settings: boolean;
    profile: boolean;
  };
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setTenant: (tenant: Tenant | null) => void;
  
  // Notificações
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  
  // UI Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  
  // Modal Actions
  openModal: (modal: keyof AppState['modals']) => void;
  closeModal: (modal: keyof AppState['modals']) => void;
  closeAllModals: () => void;
  
  // Reset
  reset: () => void;
}

// Estado inicial
const initialState = {
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
  tenant: null,
  notifications: [],
  sidebarOpen: false,
  theme: 'system' as const,
  language: 'pt-BR',
  modals: {
    login: false,
    register: false,
    twoFactor: false,
    settings: false,
    profile: false,
  },
};

// Store principal
export const useAppStore = create<AppState>()(
  immer(
    persist(
      (set, get) => ({
        ...initialState,
        
        // User Actions
        setUser: (user) =>
          set((state) => {
            state.user = user;
            state.isAuthenticated = !!user;
          }),
        
        setSession: (session) =>
          set((state) => {
            state.session = session;
          }),
        
        setAuthenticated: (isAuthenticated) =>
          set((state) => {
            state.isAuthenticated = isAuthenticated;
          }),
        
        setLoading: (isLoading) =>
          set((state) => {
            state.isLoading = isLoading;
          }),
        
        setTenant: (tenant) =>
          set((state) => {
            state.tenant = tenant;
          }),
        
        // Notification Actions
        addNotification: (notification) =>
          set((state) => {
            const newNotification: Notification = {
              ...notification,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              read: false,
            };
            state.notifications.unshift(newNotification);
            
            // Auto-remove after duration
            if (notification.duration) {
              setTimeout(() => {
                get().removeNotification(newNotification.id);
              }, notification.duration);
            }
          }),
        
        removeNotification: (id) =>
          set((state) => {
            state.notifications = state.notifications.filter(
              (notification) => notification.id !== id
            );
          }),
        
        markNotificationAsRead: (id) =>
          set((state) => {
            const notification = state.notifications.find((n) => n.id === id);
            if (notification) {
              notification.read = true;
            }
          }),
        
        clearAllNotifications: () =>
          set((state) => {
            state.notifications = [];
          }),
        
        // UI Actions
        toggleSidebar: () =>
          set((state) => {
            state.sidebarOpen = !state.sidebarOpen;
          }),
        
        setSidebarOpen: (open) =>
          set((state) => {
            state.sidebarOpen = open;
          }),
        
        setTheme: (theme) =>
          set((state) => {
            state.theme = theme;
            // Aplicar tema ao documento
            document.documentElement.setAttribute('data-theme', theme);
          }),
        
        setLanguage: (language) =>
          set((state) => {
            state.language = language;
          }),
        
        // Modal Actions
        openModal: (modal) =>
          set((state) => {
            state.modals[modal] = true;
          }),
        
        closeModal: (modal) =>
          set((state) => {
            state.modals[modal] = false;
          }),
        
        closeAllModals: () =>
          set((state) => {
            Object.keys(state.modals).forEach((key) => {
              state.modals[key as keyof AppState['modals']] = false;
            });
          }),
        
        // Reset
        reset: () =>
          set(() => ({
            ...initialState,
            theme: get().theme,
            language: get().language,
          })),
      }),
      {
        name: 'growthscale-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          theme: state.theme,
          language: state.language,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    )
  )
);

// Selectors para performance
export const useUser = () => useAppStore((state) => state.user);
export const useSession = () => useAppStore((state) => state.session);
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useTenant = () => useAppStore((state) => state.tenant);
export const useNotifications = () => useAppStore((state) => state.notifications);
export const useUnreadNotifications = () => 
  useAppStore((state) => state.notifications.filter((n) => !n.read));
export const useSidebarOpen = () => useAppStore((state) => state.sidebarOpen);
export const useTheme = () => useAppStore((state) => state.theme);
export const useLanguage = () => useAppStore((state) => state.language);
export const useModals = () => useAppStore((state) => state.modals);

// Actions
export const useAppActions = () => useAppStore((state) => ({
  setUser: state.setUser,
  setSession: state.setSession,
  setAuthenticated: state.setAuthenticated,
  setLoading: state.setLoading,
  setTenant: state.setTenant,
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  markNotificationAsRead: state.markNotificationAsRead,
  clearAllNotifications: state.clearAllNotifications,
  toggleSidebar: state.toggleSidebar,
  setSidebarOpen: state.setSidebarOpen,
  setTheme: state.setTheme,
  setLanguage: state.setLanguage,
  openModal: state.openModal,
  closeModal: state.closeModal,
  closeAllModals: state.closeAllModals,
  reset: state.reset,
}));
