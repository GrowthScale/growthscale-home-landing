import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { useAnalytics } from '@/hooks/useAnalytics';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
  data?: Record<string, unknown>;
}

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

class NotificationService {
  private notifications: Notification[] = [];
  private isSupported: boolean = false;
  private permission: NotificationPermission = 'default';

  constructor() {
    this.isSupported = 'Notification' in window && 'serviceWorker' in navigator;
    this.permission = this.isSupported ? Notification.permission : 'denied';
    this.loadNotifications();
  }

  private loadNotifications() {
    try {
      const saved = localStorage.getItem('notifications');
      if (saved) {
        this.notifications = JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Failed to load notifications:', error);
    }
  }

  private saveNotifications() {
    try {
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.warn('Failed to save notifications:', error);
    }
  }

  async requestPermission(): Promise<boolean> {
    if (!this.isSupported) {
      console.warn('Notifications not supported');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }

  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.isSupported || this.permission !== 'granted') {
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY || ''
        ),
      });

      return {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: btoa(String.fromCharCode.apply(null, 
            new Uint8Array(subscription.getKey('p256dh') || [])
          )),
          auth: btoa(String.fromCharCode.apply(null, 
            new Uint8Array(subscription.getKey('auth') || [])
          )),
        },
      };
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  }

  async unsubscribeFromPush(): Promise<boolean> {
    if (!this.isSupported) {return false;}

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error);
      return false;
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): string {
    const id = crypto.randomUUID();
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: Date.now(),
      read: false,
    };

    this.notifications.unshift(newNotification);
    
    // Keep only last 100 notifications
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100);
    }

    this.saveNotifications();
    this.showPushNotification(newNotification);
    
    return id;
  }

  private showPushNotification(notification: Notification) {
    if (!this.isSupported || this.permission !== 'granted') {return;}

    const pushNotification = new Notification(notification.title, {
      body: notification.message,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: notification.id,
      data: notification.data,
      requireInteraction: notification.type === 'error',
      actions: notification.action ? [
        {
          action: 'open',
          title: notification.action.label,
        },
        {
          action: 'dismiss',
          title: 'Fechar',
        },
      ] : undefined,
    });

    pushNotification.onclick = () => {
      if (notification.action?.url) {
        window.open(notification.action.url, '_blank');
      }
      pushNotification.close();
    };

    // Auto-close after 5 seconds (except for errors)
    if (notification.type !== 'error') {
      setTimeout(() => {
        pushNotification.close();
      }, 5000);
    }
  }

  markAsRead(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.saveNotifications();
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.saveNotifications();
  }

  deleteNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.saveNotifications();
  }

  clearAllNotifications(): void {
    this.notifications = [];
    this.saveNotifications();
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getPermission(): NotificationPermission {
    return this.permission;
  }
}

// Global notification service instance
const notificationService = new NotificationService();

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const { user } = useAuth();
  const { currentTenant } = useTenant();
  const { trackEvent } = useAnalytics();

  // Load notifications on mount
  useEffect(() => {
    setNotifications(notificationService.getNotifications());
    setUnreadCount(notificationService.getUnreadCount());
    setPermission(notificationService.getPermission());
    setIsSupported(notificationService.getPermission() !== 'denied');
  }, []);

  // Update state when notifications change
  const updateNotifications = useCallback(() => {
    setNotifications(notificationService.getNotifications());
    setUnreadCount(notificationService.getUnreadCount());
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    const granted = await notificationService.requestPermission();
    setPermission(notificationService.getPermission());
    
    if (granted) {
      trackEvent('notification_permission_granted');
    } else {
      trackEvent('notification_permission_denied');
    }
    
    return granted;
  }, [trackEvent]);

  const subscribeToPush = useCallback(async (): Promise<PushSubscription | null> => {
    const subscription = await notificationService.subscribeToPush();
    
    if (subscription) {
      trackEvent('push_notification_subscribed');
      
      // Send subscription to server
      try {
        await fetch('/api/notifications/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscription,
            userId: user?.id,
            tenantId: currentTenant?.id,
          }),
        });
      } catch (error) {
        console.warn('Failed to send subscription to server:', error);
      }
    }
    
    return subscription;
  }, [trackEvent, user?.id, currentTenant?.id]);

  const unsubscribeFromPush = useCallback(async (): Promise<boolean> => {
    const unsubscribed = await notificationService.unsubscribeFromPush();
    
    if (unsubscribed) {
      trackEvent('push_notification_unsubscribed');
      
      // Notify server
      try {
        await fetch('/api/notifications/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user?.id,
            tenantId: currentTenant?.id,
          }),
        });
      } catch (error) {
        console.warn('Failed to notify server of unsubscription:', error);
      }
    }
    
    return unsubscribed;
  }, [trackEvent, user?.id, currentTenant?.id]);

  const addNotification = useCallback((
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
  ): string => {
    const id = notificationService.addNotification(notification);
    updateNotifications();
    
    trackEvent('notification_created', {
      notification_type: notification.type,
      has_action: !!notification.action,
    });
    
    return id;
  }, [updateNotifications, trackEvent]);

  const markAsRead = useCallback((id: string): void => {
    notificationService.markAsRead(id);
    updateNotifications();
    trackEvent('notification_read', { notification_id: id });
  }, [updateNotifications, trackEvent]);

  const markAllAsRead = useCallback((): void => {
    notificationService.markAllAsRead();
    updateNotifications();
    trackEvent('notifications_all_read');
  }, [updateNotifications, trackEvent]);

  const deleteNotification = useCallback((id: string): void => {
    notificationService.deleteNotification(id);
    updateNotifications();
    trackEvent('notification_deleted', { notification_id: id });
  }, [updateNotifications, trackEvent]);

  const clearAllNotifications = useCallback((): void => {
    notificationService.clearAllNotifications();
    updateNotifications();
    trackEvent('notifications_cleared');
  }, [updateNotifications, trackEvent]);

  // Predefined notification helpers
  const showInfo = useCallback((title: string, message: string, action?: Notification['action']) => {
    return addNotification({ title, message, type: 'info', action });
  }, [addNotification]);

  const showSuccess = useCallback((title: string, message: string, action?: Notification['action']) => {
    return addNotification({ title, message, type: 'success', action });
  }, [addNotification]);

  const showWarning = useCallback((title: string, message: string, action?: Notification['action']) => {
    return addNotification({ title, message, type: 'warning', action });
  }, [addNotification]);

  const showError = useCallback((title: string, message: string, action?: Notification['action']) => {
    return addNotification({ title, message, type: 'error', action });
  }, [addNotification]);

  return {
    // State
    notifications,
    unreadCount,
    permission,
    isSupported,
    
    // Actions
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    
    // Convenience methods
    showInfo,
    showSuccess,
    showWarning,
    showError,
  };
};

export default useNotifications; 