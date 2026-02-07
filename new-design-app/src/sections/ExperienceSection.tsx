import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: '2024 – NOW',
    title: 'Senior Web Developer',
    company: 'AI Tools & Chat',
    description: 'Development of web applications around AI tools/chat (GPT-4, Gemini, Claude).',
  },
  {
    period: '2023 – 2024',
    title: 'Fullstack Teacher',
    company: 'Wcoding',
    description: 'Teaching CSS, HTML, PHP, Javascript and MySQL to beginners and experienced developers.',
  },
  {
    period: '2021 – 2023',
    title: 'Team Lead Web Developer',
    company: 'Redspher',
    description: 'Led a team of developers, implemented new features, and optimized performance.',
  },
  {
    period: '2017 – 2021',
    title: 'Senior Web Developer',
    company: 'Flash Global',
    description: 'Migrated legacy PHP 5 applications to PHP 7. Implemented technical services.',
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;
    const bg = bgRef.current;
    const timeline = timelineRef.current;
    
    if (!section || !headline || !card || !bg || !timeline) return;

    const timelineItems = timeline.querySelectorAll('.timeline-entry');

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

      // Timeline items stagger
      scrollTl.fromTo(timelineItems,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out', stagger: 0.04 },
        0.12
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
    <section ref={sectionRef} className="section-pinned z-40">
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/experience_bg.jpg"
        alt="City skyline"
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
            <Briefcase size={16} className="text-gold" />
            <span className="font-mono text-xs text-gray-400 tracking-widest">CAREER</span>
          </div>
          <h1 className="headline-display text-display-md text-white mb-6">
            Work<br />
            <span className="text-gold">Experience</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            A journey through startups and established companies, 
            building products and leading teams.
          </p>
        </div>
        
        {/* Content Card - Bottom Right */}
        <div 
          ref={cardRef}
          className="absolute right-[6vw] bottom-[12vh] w-[min(420px,38vw)] glass-card p-6"
        >
          <span className="micro-label block mb-5">TIMELINE</span>
          
          {/* Timeline */}
          <div ref={timelineRef} className="space-y-0 max-h-[42vh] overflow-y-auto pr-2">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-entry timeline-item">
                <div className="text-gold text-xs font-mono mb-1">{exp.period}</div>
                <div className="text-white text-sm font-medium">{exp.title}</div>
                <div className="text-gray-500 text-xs mb-1">{exp.company}</div>
                <div className="text-gray-400 text-xs leading-relaxed">{exp.description}</div>
              </div>
            ))}
          </div>
          
          <a 
            href="#" 
            className="link-hover text-gold text-xs font-mono inline-flex items-center gap-2 mt-4"
          >
            Full résumé (PDF)
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
