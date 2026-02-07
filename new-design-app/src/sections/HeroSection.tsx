import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Mail, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;
    const bg = bgRef.current;
    
    if (!section || !headline || !card || !bg) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline();
      
      loadTl.fromTo(bg, 
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' }
      );
      
      loadTl.fromTo(headline.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 },
        '-=0.5'
      );
      
      loadTl.fromTo(card,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(headline.children, { x: 0, opacity: 1 });
            gsap.set(card, { x: 0, opacity: 1 });
            gsap.set(bg, { scale: 1 });
          }
        }
      });
      
      scrollTl.fromTo(headline.children,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      scrollTl.fromTo(bg,
        { scale: 1 },
        { scale: 1.04, ease: 'none' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-10">
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/hero_bg.jpg"
        alt="City at night"
        className="bg-image"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-overlay" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        {/* Headline - Left Side - Better proportion */}
        <div 
          ref={headlineRef}
          className="absolute left-[8vw] top-[22vh] w-[50vw]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={16} className="text-gold" />
            <span className="font-mono text-xs text-gray-400 tracking-widest">SENIOR WEB DEVELOPER</span>
          </div>
          <h1 className="headline-display text-display-lg text-white mb-4">
            <span className="block">JÉRÔME</span>
            <span className="block text-gold">SCHAEFFER</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            Building fast, accessible web apps with modern tech. 
            Based in Seoul, open to remote & hybrid roles worldwide.
          </p>
        </div>
        
        {/* Content Card - Bottom Right - EXO Style */}
        <div 
          ref={cardRef}
          className="absolute right-[6vw] bottom-[12vh] w-[min(360px,32vw)] glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="status-dot"></div>
            <span className="font-mono text-xs text-gray-400">AVAILABLE FOR WORK</span>
          </div>
          
          <div className="space-y-3 mb-5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-mono text-xs">LOCATION</span>
              <span className="text-gray-300">Seoul, KR</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-mono text-xs">EXPERIENCE</span>
              <span className="text-gray-300">8+ years</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-mono text-xs">FOCUS</span>
              <span className="text-gray-300">Full Stack</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="btn-primary flex items-center gap-2 flex-1 justify-center">
              <Download size={14} />
              CV
            </button>
            <button className="btn-secondary flex items-center gap-2 flex-1 justify-center">
              <Mail size={14} />
              Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
