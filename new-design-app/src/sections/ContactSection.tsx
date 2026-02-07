import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Linkedin, Github, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;
    const bg = bgRef.current;
    const footer = footerRef.current;
    
    if (!section || !headline || !card || !bg || !footer) return;

    const ctx = gsap.context(() => {
      // Flowing section animations
      gsap.fromTo(headline.children,
        { x: '-15vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(card,
        { x: '15vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(bg,
        { y: 0 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      gsap.fromTo(footer,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen z-[60]">
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/contact_bg.jpg"
        alt="City at dusk"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'grayscale(60%) contrast(1.1)' }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-overlay" />
      
      {/* Content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex items-center relative">
          {/* Headline - Left Side */}
          <div 
            ref={headlineRef}
            className="absolute left-[8vw] top-[22vh] w-[45vw]"
          >
            <div className="flex items-center gap-2 mb-4">
              <Send size={16} className="text-gold" />
              <span className="font-mono text-xs text-gray-400 tracking-widest">CONTACT</span>
            </div>
            <h1 className="headline-display text-display-md text-white mb-6">
              Let's<br />
              <span className="text-gold">Connect</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              If you have a role, a project, or just want to talk shop—reach out. 
              I'm always happy to discuss new opportunities.
            </p>
          </div>
          
          {/* Content Card - Bottom Right */}
          <div 
            ref={cardRef}
            className="absolute right-[6vw] bottom-[12vh] w-[min(360px,32vw)] glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="status-dot"></div>
              <span className="font-mono text-xs text-gray-400">OPEN TO OPPORTUNITIES</span>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gold/10 flex items-center justify-center">
                  <Mail size={14} className="text-gold" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-mono">EMAIL</div>
                  <a href="mailto:jer.schaeffer@gmail.com" className="text-gray-300 text-sm link-hover">
                    jer.schaeffer@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gold/10 flex items-center justify-center">
                  <MapPin size={14} className="text-gold" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-mono">LOCATION</div>
                  <div className="text-gray-300 text-sm">Seoul, South Korea</div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <a 
                href="mailto:jer.schaeffer@gmail.com"
                className="btn-primary flex items-center gap-2 flex-1 justify-center"
              >
                <Mail size={14} />
                Email
              </a>
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 flex-1 justify-center"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div 
          ref={footerRef}
          className="relative py-5 px-[6vw] border-t border-gold/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-500 text-xs font-mono">
              © 2026 Jérôme Schaeffer
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gold transition-colors"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gold transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
            
            <div className="text-gray-500 text-xs font-mono">
              Built with React + GSAP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
