import { useState, useEffect } from 'react';
import { Github, Linkedin, Terminal } from 'lucide-react';

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function NavRail() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav rail after scrolling past 100px
      setIsVisible(window.scrollY > 100);

      // Determine active section
      const sectionElements = sections.map(sec => ({
        id: sec.id,
        element: document.getElementById(sec.id),
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const sec = sectionElements[i];
        if (sec.element) {
          const offsetTop = sec.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed left-0 top-0 h-full nav-rail z-[100] transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}
      style={{ width: '72px' }}
    >
      <div className="h-full flex flex-col items-center py-6">
        {/* Logo */}
        <div className="mb-10">
          <div className="w-9 h-9 rounded bg-gold/10 border border-gold/30 flex items-center justify-center">
            <Terminal size={16} className="text-gold" />
          </div>
        </div>

        {/* Section Dots */}
        <div className="flex-1 flex flex-col items-center gap-5">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center justify-center"
              aria-label={`Go to ${section.label}`}
            >
              <div 
                className={`nav-dot ${activeSection === section.id ? 'active' : ''}`}
              />
              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-2 py-1 rounded bg-dark-lighter border border-gold/20 text-gold text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {section.label}
              </span>
            </button>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gold transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gold transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}
