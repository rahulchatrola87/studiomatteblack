import { useState, useEffect, type ReactNode } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, MessageCircle, Menu, X, ChevronRight, MapPin, Phone } from 'lucide-react';

const PHONE_NUMBER = '+91-9328696221';
const PHONE_HREF = 'tel:+919328696221';
const WHATSAPP_URL = 'https://wa.me/919328696221';
const INSTAGRAM_URL = 'https://www.instagram.com/studiomatteblack.in/';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Studio%20Matte%20Black%204th%20Floor%20Capital%20Market%20F-51%20Ravapar%20Rd%20Morbi%20Gujarat%20363641';

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// --- Assets & Data ---
const PROJECTS = [
  {
    title: "The Monolith Office",
    category: "Commercial",
    description: "Compact office designed with maximum spatial efficiency and natural light.",
    image: "/assets/monolith-office.jpg"
  },
  {
    title: "Shadow & Light House",
    category: "Residential",
    description: "A private sanctuary playing with deep textures and rhythmic apertures.",
    image: "/assets/shadow-light-house.jpg"
  }
];

const SERVICES = [
  {
    title: "Residential Design",
    description: "Homes designed around how you live — planned for comfort, light, and longevity.",
    image: "/assets/residential-design.jpg"
  },
  {
    title: "Commercial & Office Spaces",
    description: "Workspaces that reflect brand identity while maximising efficiency and flow.",
    image: "/assets/commercial-office.jpg"
  },
  {
    title: "Landscape Design",
    description: "Outdoor environments shaped by context, climate, and natural movement.",
    image: "/assets/landscaping.jpeg"
  },
  {
    title: "Exhibition & Display Design",
    description: "Spatial experiences that communicate brand stories through form, material, and light.",
    image: "/assets/exhibition.jpeg"
  }
];

const PROCESS = [
  { 
    step: "01", 
    title: "Understanding", 
    desc: "Listening to your needs, constraints, budget, and vision.", 
    img: "/assets/understanding.jpeg" 
  },
  { step: "02", title: "Planning & Concept", desc: "Space planning and design direction that forms the project’s backbone.", img: "/assets/planning-concept.jpg" },
  { step: "03", title: "Design Development", desc: "Detailed design, materials, and visualisation.", img: "/assets/design-development.jpg" },
  { step: "04", title: "Technical Detailing", desc: "Execution-ready drawings aligned with site realities.", img: "/assets/technical-detailing.png" },
  { step: "05", title: "Site Coordination", desc: "Design support through execution for clarity and consistency.", img: "/assets/site-coordination.jpg" },
];

// --- Sub-Components ---

const FadeInWhenVisible = ({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-zinc-950/95 backdrop-blur-md py-4' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-6 flex justify-between items-center">
        <a
          href="#"
          aria-label="Studio Matte Black home"
          className="block h-12 w-48 md:h-14 md:w-60"
        >
          <img
            src="/assets/logo2025-white-cropped.png"
            alt="Studio Matte Black"
            className="h-full w-full object-contain object-left"
          />
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-xs tracking-widest uppercase font-medium text-zinc-400">
          {['Work', 'Studio', 'Services', 'Process'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-300">
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-zinc-950 flex flex-col overflow-hidden md:hidden border-b border-zinc-800"
          >
            <div className="p-8 flex flex-col gap-6">
              {['Work', 'Studio', 'Services', 'Process', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="text-3xl font-light text-white tracking-tight">
                  {item}
                </a>
              ))}
              <div className="h-px w-full bg-zinc-800 my-4" />
              <a href={PHONE_HREF} className="flex gap-6 text-zinc-400 hover:text-white transition-colors">
                <Phone size={20} />
                <span className="text-sm tracking-widest">{PHONE_NUMBER}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.05]);

  return (
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center bg-zinc-950">
      <motion.div style={{ y: y1, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950/90 z-10" />
        <img 
          src="/assets/hero-architecture.jpg" 
          alt="Hero Architecture" 
          className="w-full h-full object-cover grayscale-[20%]"
        />
      </motion.div>

      <div className="relative z-20 max-w-7xl mx-auto px-5 md:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9] }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-light text-white tracking-tight leading-[1.1] mb-6 md:mb-8">
            Thoughtfully Designed <br />
            <span className="italic font-serif">Architecture & Interiors</span>
          </h1>
          <p className="text-base md:text-xl text-zinc-300 font-light max-w-xl leading-relaxed">
            Residential, Commercial, Landscape & Exhibition Design. <br className="hidden md:block" />
            Crafted with clarity, purpose, and timeless aesthetics.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const StudioIntro = () => {
  return (
    <section id="studio" className="py-24 md:py-48 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 md:px-6 text-center">
        <FadeInWhenVisible>
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold mb-6 md:mb-8 block">Studio Philosophy</span>
          <h2 className="text-3xl md:text-6xl font-light leading-tight mb-10 md:mb-14 max-w-4xl mx-auto">
            A design studio focused on creating spaces that are intelligent, refined, and built to last.
          </h2>
          <div className="space-y-6 md:space-y-8 text-zinc-400 font-light leading-relaxed text-lg md:text-xl max-w-3xl mx-auto">
            <p>
              Studio Matte Black is an architecture and design practice focused on high-conversion spatial storytelling. We believe that great design begins with listening, clarity, and a deep understanding of the environment.
            </p>
            <p>
              Our work spans architecture, interiors, landscapes, and exhibition environments — unified by strong planning and a modern design language.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-40 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <FadeInWhenVisible>
          <h2 className="text-3xl md:text-6xl font-light text-white mb-12 md:mb-20">Areas of Expertise</h2>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="group relative bg-zinc-950 overflow-hidden min-h-[400px] md:min-h-[500px] flex items-end p-8 md:p-10">
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover opacity-50 md:opacity-40 grayscale group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              </div>
              
              <div className="relative z-10 transition-transform duration-500 md:group-hover:-translate-y-4 w-full">
                <h3 className="text-xl md:text-3xl font-light text-white mb-3 md:mb-4">{service.title}</h3>
                <p className="text-zinc-400 max-w-sm text-sm md:text-base font-light leading-relaxed mb-6 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-white text-[10px] md:text-xs tracking-widest uppercase font-semibold">
                  View Detail <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkGallery = () => {
  return (
    <section id="work" className="py-20 md:py-40 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6">
          <FadeInWhenVisible>
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold mb-3 md:mb-4 block">Portfolio</span>
            <h2 className="text-3xl md:text-6xl font-light text-white">Signature Projects</h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <button className="text-white border-b border-white/30 pb-1 text-[10px] md:text-sm tracking-widest uppercase hover:border-white transition-all w-fit">
              Browse All Projects
            </button>
          </FadeInWhenVisible>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {PROJECTS.map((project, idx) => (
            <FadeInWhenVisible key={idx} delay={idx * 0.1}>
              <div className="group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden mb-5 md:mb-6 relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[9px] md:text-[10px] uppercase tracking-widest font-bold">
                    {project.category}
                  </div>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-light text-white mb-2 group-hover:text-zinc-400 transition-colors">{project.title}</h3>
                    <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="p-2 md:p-3 border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all flex-shrink-0">
                    <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform md:size-5" />
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

const DesignProcess = () => {
  return (
    <section id="process" className="py-20 md:py-40 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="max-w-3xl mb-16 md:mb-24 text-center md:text-left mx-auto md:mx-0">
          <FadeInWhenVisible>
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold mb-3 md:mb-4 block">Methodology</span>
            <h2 className="text-3xl md:text-6xl font-light text-white mb-6 md:mb-8">Our Process</h2>
            <p className="text-base md:text-xl text-zinc-400 font-light leading-relaxed">
              We focus on the human experience of space. Our workflow is designed to ensure technical precision without losing the creative soul.
            </p>
          </FadeInWhenVisible>
        </div>

        <div className="space-y-20 md:space-y-32">
          {PROCESS.map((p, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-24 items-center`}>
              <div className="w-full md:w-1/2">
                <FadeInWhenVisible>
                  <div className="relative aspect-video overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover grayscale md:hover:grayscale-0 transition-all duration-700" />
                  </div>
                </FadeInWhenVisible>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <FadeInWhenVisible delay={0.2}>
                  <div className="text-5xl md:text-7xl font-serif italic text-zinc-800 mb-4 md:mb-6">{p.step}</div>
                  <h3 className="text-2xl md:text-3xl text-white font-light mb-4 md:mb-6 tracking-tight">{p.title}</h3>
                  <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
                    {p.desc}
                  </p>
                </FadeInWhenVisible>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const points = [
    { title: "Planning-First Approach", content: "Strong emphasis on space planning before aesthetics." },
    { title: "Timeless Aesthetic", content: "Minimal, timeless architectural language that avoids trends." },
    { title: "Streamlined Workflow", content: "Clear communication and structured, professional workflow." },
    { title: "Execution Ready", content: "Designs that are practical to execute — not just visually appealing." }
  ];

  return (
    <section className="py-20 md:py-40 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <FadeInWhenVisible>
            <h2 className="text-3xl md:text-6xl font-light text-white leading-tight">
              Why Studio <br className="hidden md:block" /> Matte Black?
            </h2>
          </FadeInWhenVisible>
          <div className="grid gap-8 md:gap-12">
            {points.map((pt, idx) => (
              <FadeInWhenVisible key={idx} delay={idx * 0.1}>
                <div className="pb-6 md:pb-8 border-b border-zinc-800">
                  <h4 className="text-lg md:text-xl text-white font-light mb-2 md:mb-3">{pt.title}</h4>
                  <p className="text-sm md:text-base text-zinc-500 font-light leading-relaxed">{pt.content}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactCTA = () => {
  return (
    <section id="contact" className="relative py-24 md:py-40 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/cta-background.jpg" 
          alt="CTA Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-6 text-center">
        <FadeInWhenVisible>
          <h2 className="text-3xl md:text-7xl font-light text-white mb-8 md:mb-12 tracking-tight leading-tight">
            Let's build your <br className="hidden md:block" /> dream space together.
          </h2>
          <div className="flex justify-center">
            <a 
              href={WHATSAPP_URL} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white text-white font-semibold text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle size={18} /> Talk to Us on WhatsApp
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-950 pt-20 md:pt-24 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 md:mb-20">
          <div className="md:col-span-2">
            <div className="mb-6 h-20 w-72 md:h-24 md:w-80">
              <img
                src="/assets/logo2025-white-cropped.png"
                alt="Studio Matte Black"
                className="h-full w-full object-contain object-left"
              />
            </div>
            <p className="text-zinc-500 font-light max-w-sm leading-relaxed mb-8 text-sm md:text-base">
              Architecture | Interiors | Landscape | Exhibition Design. <br />
              Creating intelligent spaces that matter.
            </p>
            <div className="flex gap-4">
              {[
                { href: INSTAGRAM_URL, label: 'Instagram', icon: <InstagramIcon size={18} />, external: true },
                { href: 'mailto:info@studiomatteblack.com', label: 'Email', icon: <Mail size={18} /> },
                { href: WHATSAPP_URL, label: 'WhatsApp', icon: <MessageCircle size={18} />, external: true },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="p-3 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-white transition-all"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:col-span-1">
            <div>
              <h5 className="text-white text-[10px] md:text-xs tracking-widest uppercase mb-6 md:mb-8 font-bold">Links</h5>
              <ul className="space-y-3 md:space-y-4 text-zinc-500 font-light text-sm">
                {['Home', 'Work', 'Studio', 'Services', 'Process'].map(item => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h5 className="text-white text-[10px] md:text-xs tracking-widest uppercase mb-6 md:mb-8 font-bold">Inquiries</h5>
            <div className="space-y-6 text-zinc-500 font-light text-sm leading-relaxed">
              <div className="flex items-start gap-3">
                <Phone size={14} className="mt-1 text-zinc-300 flex-shrink-0" />
                <a href={PHONE_HREF} className="hover:text-white transition-colors">{PHONE_NUMBER}</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="mt-1 text-zinc-300 flex-shrink-0" />
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  4th Floor, Capital market, F-51,<br />
                  Ravapar Rd, Ravapar, Morbi,<br />
                  Gujarat 363641
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 md:pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between gap-6 text-[9px] md:text-[10px] text-zinc-600 tracking-widest uppercase font-medium">
          <p className="text-center md:text-left">© 2026 Studio Matte Black. All Rights Reserved.</p>
          <div className="flex justify-center md:justify-end gap-6 md:gap-8">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="bg-zinc-950 font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <StudioIntro />
        <Services />
        <WorkGallery />
        <DesignProcess />
        <WhyUs />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}