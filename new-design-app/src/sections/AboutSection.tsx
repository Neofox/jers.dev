import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Monitor, Award, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const facts = [
  { icon: Calendar, label: '8+ years', sublabel: 'experience' },
  { icon: Monitor, label: 'Remote', sublabel: '/ Hybrid' },
  { icon: MapPin, label: 'Seoul', sublabel: 'South Korea' },
  { icon: Award, label: 'Zend', sublabel: 'Certified PHP' },
];

export default function AboutSection() {
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
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(headline.children,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );
      
      scrollTl.fromTo(card,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );
      
      scrollTl.fromTo(bg,
        { scale: 1.05 },
        { scale: 1, ease: 'power2.out' },
        0
      );

      // EXIT (70-100%)
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
    <section ref={sectionRef} className="section-pinned z-20">
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/about_bg.jpg"
        alt="Abstract architecture"
        className="bg-image"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-overlay" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        {/* Headline - Left Side */}
        <div 
          ref={headlineRef}
          className="absolute left-[8vw] top-[22vh] w-[45vw]"
        >
          <div className="flex items-center gap-2 mb-4">
            <User size={16} className="text-gold" />
            <span className="font-mono text-xs text-gray-400 tracking-widest">ABOUT ME</span>
          </div>
          <h1 className="headline-display text-display-md text-white mb-6">
            Developer &<br />
            <span className="text-gold">Educator</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            I've spent years shipping products and mentoring teams. I care about 
            clean architecture, performance, and UI clarity. Always eager to learn 
            new technologies and tackle challenging problems.
          </p>
        </div>
        
        {/* Content Card - Bottom Right */}
        <div 
          ref={cardRef}
          className="absolute right-[6vw] bottom-[12vh] w-[min(360px,32vw)] glass-card p-6"
        >
          <span className="micro-label block mb-5">QUICK FACTS</span>
          
          {/* Facts Grid */}
          <div className="grid grid-cols-2 gap-4">
            {facts.map((fact, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded bg-white/[0.02] border border-white/5">
                <fact.icon size={16} className="text-gold" />
                <div>
                  <div className="text-white text-sm font-medium font-mono">{fact.label}</div>
                  <div className="text-gray-500 text-xs">{fact.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
