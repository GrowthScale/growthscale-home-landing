import { useCallback, useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationSection {
  id: string;
  label: string;
  path?: string;
}

export const useNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('');

  // Define main navigation sections
  const sections = useMemo<NavigationSection[]>(() => [
    { id: 'recursos', label: 'Recursos' },
    { id: 'precos', label: 'Preços' },
    { id: 'contato', label: 'Contato' }
  ], []);

  // Protected routes that require authentication
  const protectedRoutes = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/dashboard/employees', label: 'Funcionários' },
    { path: '/dashboard/schedules', label: 'Escalas' },
    { path: '/dashboard/compliance', label: 'Compliance' },
    { path: '/dashboard/billing', label: 'Faturamento' },
    { path: '/dashboard/settings', label: 'Configurações' }
  ];

  // Legal pages
  const legalPages = [
    { path: '/legal', label: 'Política de Privacidade' },
    { path: '/legal', label: 'Termos de Uso' },
    { path: '/legal', label: 'Política de Cookies' }
  ];

  const scrollToSection = useCallback((sectionId: string) => {
    // If we're not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [location.pathname, navigate]);

  const navigateToRoute = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') {return;}

      const headerOffset = 100;
      const scrollPosition = window.scrollY + headerOffset;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial position
    } else {
      setActiveSection('');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, sections]);

  return {
    activeSection,
    sections,
    protectedRoutes,
    legalPages,
    scrollToSection,
    navigateToRoute,
    isHomePage: location.pathname === '/',
    currentPath: location.pathname
  };
};

export default useNavigation;