import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  contrast: 'normal' | 'high';
  reducedMotion: boolean;
  screenReaderMode: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: (key: keyof AccessibilitySettings, value: any) => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 'medium',
  contrast: 'normal',
  reducedMotion: false,
  screenReaderMode: false,
  keyboardNavigation: true,
  focusIndicators: true,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch (error) {
        console.error('Error parsing accessibility settings:', error);
      }
    }
    return defaultSettings;
  });

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px',
    };
    root.style.fontSize = fontSizeMap[settings.fontSize];
    
    // Contrast
    if (settings.contrast === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Screen reader mode
    if (settings.screenReaderMode) {
      root.classList.add('screen-reader-mode');
    } else {
      root.classList.remove('screen-reader-mode');
    }
    
    // Focus indicators
    if (settings.focusIndicators) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }
    
    // Keyboard navigation
    if (settings.keyboardNavigation) {
      root.classList.add('keyboard-navigation');
    } else {
      root.classList.remove('keyboard-navigation');
    }
    
    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    
  }, [settings]);

  // Listen for system preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setSettings(prev => ({ ...prev, reducedMotion: true }));
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Check initial state
    if (mediaQuery.matches) {
      setSettings(prev => ({ ...prev, reducedMotion: true }));
    }
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Listen for high contrast preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setSettings(prev => ({ ...prev, contrast: 'high' }));
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Check initial state
    if (mediaQuery.matches) {
      setSettings(prev => ({ ...prev, contrast: 'high' }));
    }
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Keyboard navigation detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    };
    
    const handleMouseDown = () => {
      document.body.classList.remove('using-keyboard');
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('accessibility-settings');
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
