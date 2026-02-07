import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FolderGit2, ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Jeromesphotographie',
    description: 'Personal Photography portfolio using SvelteKit',
    tech: ['SvelteKit', 'TypeScript'],
    link: '#',
  },
  {
    name: 'FFTA Events API',
    description: 'API for French Archery Federation events',
    tech: ['Symfony', 'PostgreSQL'],
    link: '#',
  },
  {
    name: 'neocah',
    description: 'Cards Against Humanity web game adaptation',
    tech: ['React', 'Firebase'],
    link: '#',
  },
  {
    name: 'Camie',
    description: 'Management application for nurseries',
    tech: ['Symfony', 'React'],
    link: '#',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;
    const bg = bgRef.current;
    const projectsContainer = projectsRef.current;
    
    if (!section || !headline || !card || !bg || !projectsContainer) return;

    const projectItems = projectsContainer.querySelectorAll('.project-item');

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

      // Project items stagger
      scrollTl.fromTo(projectItems,
        { y: 12, opacity: 0 },
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
    <section ref={sectionRef} className="section-pinned z-50">
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/projects_bg.jpg"
        alt="Futuristic building"
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
            <FolderGit2 size={16} className="text-gold" />
            <span className="font-mono text-xs text-gray-400 tracking-widest">PORTFOLIO</span>
          </div>
          <h1 className="headline-display text-display-md text-white mb-6">
            Selected<br />
            <span className="text-gold">Projects</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            Personal projects and experiments. Building things that 
            solve problems or explore new technologies.
          </p>
        </div>
        
        {/* Content Card - Bottom Right */}
        <div 
          ref={cardRef}
          className="absolute right-[6vw] bottom-[12vh] w-[min(420px,38vw)] glass-card p-6"
        >
          <span className="micro-label block mb-5">PERSONAL WORK</span>
          
          {/* Projects List */}
          <div ref={projectsRef} className="space-y-3 max-h-[38vh] overflow-y-auto pr-2">
            {projects.map((project, index) => (
              <div key={index} className="project-item group p-3 rounded bg-white/[0.02] border border-white/5 hover:border-gold/30 transition-colors">
                <a href={project.link} className="block">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-white text-sm font-medium group-hover:text-gold transition-colors font-mono">
                      {project.name}
                    </h3>
                    <ExternalLink size={12} className="text-gray-500 group-hover:text-gold transition-colors" />
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-gray-400 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              </div>
            ))}
          </div>
          
          <a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center justify-center gap-2 mt-4 w-full"
          >
            <Github size={14} />
            View GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
