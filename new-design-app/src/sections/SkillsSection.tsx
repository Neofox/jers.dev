import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['Next.js', 'React', 'Svelte', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Symfony', 'Laravel', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'DevOps',
    skills: ['Docker', 'Git', 'CI/CD', 'AWS', 'Linux'],
  },
  {
    title: 'Testing',
    skills: ['Jest', 'PHPUnit', 'Cypress', 'Playwright'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;
    const bg = bgRef.current;
    const skillsContainer = skillsRef.current;
    
    if (!section || !headline || !card || !bg || !skillsContainer) return;

    const skillItems = skillsContainer.querySelectorAll('.skill-category');

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

      // Skill items stagger
      scrollTl.fromTo(skillItems,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out', stagger: 0.03 },
        0.1
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
    <section ref={sectionRef} className="section-pinned z-30">
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/skills_bg.jpg"
        alt="Modern building"
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
            <Code2 size={16} className="text-gold" />
            <span className="font-mono text-xs text-gray-400 tracking-widest">TECH STACK</span>
          </div>
          <h1 className="headline-display text-display-md text-white mb-6">
            Skills &<br />
            <span className="text-gold">Expertise</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            Full-stack development with a focus on modern JavaScript ecosystems 
            and scalable backend architectures.
          </p>
        </div>
        
        {/* Content Card - Bottom Right */}
        <div 
          ref={cardRef}
          className="absolute right-[6vw] bottom-[12vh] w-[min(400px,36vw)] glass-card p-6"
        >
          <span className="micro-label block mb-5">TECHNOLOGIES</span>
          
          {/* Skills Grid */}
          <div ref={skillsRef} className="space-y-4">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-category">
                <div className="text-gray-500 text-xs font-mono mb-2">{category.title}</div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
