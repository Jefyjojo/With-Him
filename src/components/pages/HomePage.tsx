// HPI 1.6-V
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { MoodBasedScriptures } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Download, Sparkles, Quote } from 'lucide-react';

// --- Utility Components for Motion & Layout ---

const RevealOnScroll = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ParallaxSection = ({ children, className = "", speed = 0.5 }: { children: React.ReactNode, className?: string, speed?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.scrollY;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = (scrolled - (ref.current.offsetTop - window.innerHeight)) * speed;
        ref.current.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return <div ref={ref} className={className}>{children}</div>;
};

// --- Main Component ---

export default function HomePage() {
  // --- Data Fidelity: Canonical State ---
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [scripture, setScripture] = useState<MoodBasedScriptures | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Data Fidelity: Canonical Data Source ---
  const moods = [
    'Anxious', 'Grateful', 'Lonely', 'Hopeful', 
    'Overwhelmed', 'Peaceful', 'Confused', 'Joyful'
  ];

  // --- Data Fidelity: Logic Preservation ---
  const handleMoodSelect = async (mood: string) => {
    setSelectedMood(mood);
    setIsLoading(true);
    
    try {
      const { items } = await BaseCrudService.getAll<MoodBasedScriptures>('moodbasedscriptures');
      const matchingScriptures = items.filter(s => s.mood?.toLowerCase() === mood.toLowerCase());
      
      if (matchingScriptures.length > 0) {
        const randomScripture = matchingScriptures[Math.floor(Math.random() * matchingScriptures.length)];
        setScripture(randomScripture);
      } else {
        setScripture(null); // Handle case with no matches
      }
    } catch (error) {
      console.error("Failed to fetch scriptures", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-secondary-foreground overflow-clip font-paragraph selection:bg-primary selection:text-white">
      <Header />

      {/* --- HERO SECTION --- */}
      {/* Layout inspired by 'Mafestic' - Massive Typography + Split Visuals */}
      <main className="w-full pt-24 lg:pt-32">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-12">
          <RevealOnScroll>
            <h1 className="font-heading text-[18vw] lg:text-[14rem] leading-[0.8] text-primary text-center tracking-tighter mix-blend-multiply">
              Grace
            </h1>
          </RevealOnScroll>
          
          <div className="flex justify-between items-center mt-4 border-t border-primary/20 pt-4">
            <span className="font-heading text-primary text-lg lg:text-xl italic">Est. 2024</span>
            <div className="flex gap-8 font-heading text-primary text-lg lg:text-xl">
              <span>Faith</span>
              <span>Hope</span>
              <span>Love</span>
            </div>
            <span className="font-heading text-primary text-lg lg:text-xl italic">Ver. 1.0</span>
          </div>
        </div>

        {/* Split Hero Content */}
        <div className="w-full max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[80vh]">
          {/* Left: Solid Color Block with Content */}
          <div className="lg:col-span-5 bg-primary text-primary-foreground p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden group">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <svg width="100%" height="100%">
                 <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                   <circle cx="2" cy="2" r="1" fill="currentColor" />
                 </pattern>
                 <rect width="100%" height="100%" fill="url(#hero-pattern)" />
               </svg>
            </div>

            <div className="relative z-10 mt-12 lg:mt-24">
              <RevealOnScroll delay={200}>
                <h2 className="font-heading text-4xl lg:text-6xl mb-8 leading-tight">
                  A spiritual companion for your daily walk.
                </h2>
                <p className="text-lg lg:text-xl opacity-90 max-w-md leading-relaxed mb-12">
                  Find comfort in scripture, connect with a community of believers, and build a warm, personal relationship with Jesus.
                </p>
              </RevealOnScroll>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4">
              <a 
                href="#download" 
                className="inline-flex items-center justify-center px-8 py-4 bg-badgebackground text-primary font-heading text-lg hover:bg-white transition-colors duration-300 rounded-full"
              >
                Download App
              </a>
              <a 
                href="#mood-scripture" 
                className="inline-flex items-center justify-center px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-heading text-lg hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full"
              >
                Find Peace
              </a>
            </div>
          </div>

          {/* Right: Image Composition */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-0 relative">
            <div className="relative h-[60vh] lg:h-auto overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-multiply pointer-events-none" />
              <Image 
                src="https://static.wixstatic.com/media/3e9bb1_badd10da988e475e9b7fa15dcaa4a10e~mv2.png?originWidth=768&originHeight=576"
                alt="Woman in quiet reflection"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                width={800}
              />
            </div>
            <div className="relative h-[60vh] lg:h-auto overflow-hidden mt-12 lg:mt-24 border-l border-white/20">
               <div className="absolute inset-0 bg-badgebackground/20 z-10 mix-blend-multiply pointer-events-none" />
               <Image 
                src="https://static.wixstatic.com/media/3e9bb1_4f97ff1b0aa54277851f82760eeae228~mv2.png?originWidth=768&originHeight=576"
                alt="Friends sharing a moment of joy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                width={800}
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 bg-badgebackground rounded-full flex items-center justify-center border border-primary text-primary font-heading text-sm uppercase tracking-widest"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 animate-spin-slow">
                  <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                  <text>
                    <textPath href="#curve" className="fill-current text-[10px] font-bold tracking-[0.2em]">
                      • DAILY • GRACE • DAILY • GRACE
                    </textPath>
                  </text>
                </svg>
                <Heart className="w-8 h-8 fill-current" />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* --- MISSION SCROLL SECTION --- */}
      <section className="w-full py-24 lg:py-40 bg-background relative">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sticky Title */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <span className="text-primary font-heading text-xl mb-4 block">Our Mission</span>
                <h2 className="font-heading text-5xl lg:text-7xl text-primary leading-[0.9] mb-8">
                  Faith that<br/>feels like<br/><span className="italic text-accentgreen">home.</span>
                </h2>
                <p className="text-lg text-secondary-foreground/80 max-w-xs">
                  We believe in a relationship with God that is personal, comforting, and free from fear.
                </p>
                <div className="mt-12 w-full h-px bg-primary/20" />
              </div>
            </div>

            {/* Scrollable Content Cards */}
            <div className="lg:col-span-8 flex flex-col gap-24 lg:gap-40">
              {[
                {
                  num: "01",
                  title: "Personal Connection",
                  desc: "Experience scripture that speaks directly to your heart. No judgment, just grace and understanding for wherever you are in your journey.",
                  img: "https://static.wixstatic.com/media/3e9bb1_94c3602794064034aaa3b4a8d13ebb37~mv2.png?originWidth=576&originHeight=704"
                },
                {
                  num: "02",
                  title: "Mood-Based Comfort",
                  desc: "Share how you're feeling and receive scripture chosen to bring peace, hope, and encouragement exactly when you need it most.",
                  img: "https://static.wixstatic.com/media/3e9bb1_69e48e090249434da0603239fa078b4a~mv2.png?originWidth=576&originHeight=704"
                },
                {
                  num: "03",
                  title: "Community Stories",
                  desc: "Read testimonies and reflections from others walking their faith journey. Be inspired, encouraged, and reminded you're never alone.",
                  img: "https://static.wixstatic.com/media/3e9bb1_27cbe841f8bc4ba1b5af2c7549a171ef~mv2.png?originWidth=576&originHeight=704"
                }
              ].map((item, idx) => (
                <RevealOnScroll key={idx} className="group">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className={`order-2 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      <div className="w-16 h-16 rounded-full bg-badgebackground flex items-center justify-center mb-6 border border-primary">
                        <span className="font-heading text-2xl text-primary">{item.num}</span>
                      </div>
                      <h3 className="font-heading text-4xl lg:text-5xl text-primary mb-6">{item.title}</h3>
                      <p className="text-lg leading-relaxed text-secondary-foreground/80">{item.desc}</p>
                    </div>
                    <div className={`order-1 ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                      <div className="aspect-[4/5] overflow-hidden rounded-t-[10rem] border-2 border-primary relative">
                        <Image 
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          width={600}
                        />
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE MOOD SECTION --- */}
      <section id="mood-scripture" className="w-full py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
           <svg width="100%" height="100%">
             <filter id="noise">
               <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
             </filter>
             <rect width="100%" height="100%" filter="url(#noise)" />
           </svg>
        </div>

        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16 lg:mb-24">
            <RevealOnScroll>
              <span className="inline-block py-2 px-6 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-sm mb-6 font-heading text-sm tracking-widest uppercase">
                Daily Encouragement
              </span>
              <h2 className="font-heading text-5xl lg:text-8xl mb-8">
                How is your <span className="italic text-badgebackground">heart</span> today?
              </h2>
              <p className="text-xl lg:text-2xl max-w-2xl mx-auto opacity-90 font-light">
                Select a feeling below to receive a scripture tailored to your moment.
              </p>
            </RevealOnScroll>
          </div>

          {/* Mood Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto mb-16">
            {moods.map((mood, index) => (
              <RevealOnScroll key={mood} delay={index * 50}>
                <button
                  onClick={() => handleMoodSelect(mood)}
                  className={`w-full aspect-[3/2] flex items-center justify-center text-xl lg:text-2xl font-heading transition-all duration-300 border-2 relative overflow-hidden group ${
                    selectedMood === mood 
                      ? 'bg-badgebackground text-primary border-badgebackground' 
                      : 'bg-transparent border-primary-foreground/30 text-primary-foreground hover:border-badgebackground hover:text-badgebackground'
                  }`}
                >
                  <span className="relative z-10">{mood}</span>
                  {selectedMood === mood && (
                    <motion.div 
                      layoutId="activeMood"
                      className="absolute inset-0 bg-badgebackground z-0"
                    />
                  )}
                </button>
              </RevealOnScroll>
            ))}
          </div>

          {/* Result Display Area */}
          <div className="min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-12 h-12 border-4 border-badgebackground border-t-transparent rounded-full animate-spin" />
                  <p className="font-heading text-xl text-badgebackground animate-pulse">Seeking wisdom...</p>
                </motion.div>
              ) : scripture ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full max-w-4xl bg-background text-primary p-8 lg:p-16 relative"
                >
                  {/* Decorative Corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary" />

                  <div className="text-center">
                    <Quote className="w-12 h-12 mx-auto mb-6 text-primary/20" />
                    <h3 className="font-heading text-3xl lg:text-5xl leading-tight mb-8">
                      "{scripture.scriptureText}"
                    </h3>
                    <div className="flex items-center justify-center gap-4">
                      <div className="h-px w-12 bg-primary/30" />
                      <p className="font-paragraph text-xl font-bold tracking-wide uppercase">
                        {scripture.scriptureReference}
                      </p>
                      <div className="h-px w-12 bg-primary/30" />
                    </div>
                    <div className="mt-8 flex justify-center gap-2">
                      {scripture.keywords?.split(',').map((tag, i) => (
                        <span key={i} className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-primary/5 text-primary/60 rounded-full">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center opacity-50"
                >
                  <Sparkles className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg">Select a mood to begin</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- MAGAZINE STYLE CONTENT PREVIEWS --- */}
      <section className="w-full py-24 lg:py-40 bg-background overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 border-b border-primary/20 pb-8">
            <RevealOnScroll>
              <h2 className="font-heading text-6xl lg:text-9xl text-primary leading-[0.8]">
                Stories<br/><span className="ml-12 lg:ml-24 italic text-accentgreen">of Grace</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-lg lg:text-xl max-w-md text-right mt-8 lg:mt-0">
                Real stories from real people finding their way back to the heart of God.
              </p>
            </RevealOnScroll>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
            
            {/* Testimonies Card */}
            <div className="group relative border-r-0 lg:border-r border-primary/20 pr-0 lg:pr-12">
              <RevealOnScroll>
                <div className="aspect-[4/3] overflow-hidden mb-8 relative">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-10" />
                  <Image 
                    src="https://static.wixstatic.com/media/3e9bb1_6b3f2e450b594cd4ac2afbf835e79bd0~mv2.png?originWidth=768&originHeight=576"
                    alt="Community gathering"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    width={800}
                  />
                  <div className="absolute top-4 left-4 bg-white px-4 py-2 font-heading text-sm uppercase tracking-widest z-20">
                    Testimonies
                  </div>
                </div>
                <h3 className="font-heading text-4xl lg:text-5xl text-primary mb-4 group-hover:translate-x-4 transition-transform duration-300">
                  Walking in Light
                </h3>
                <p className="text-lg text-secondary-foreground/70 mb-8 max-w-md">
                  Discover powerful testimonies from our community sharing their journey of faith, hope, and transformation.
                </p>
                <Link 
                  to="/testimonies" 
                  className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:gap-4 transition-all duration-300"
                >
                  Read Stories <ArrowRight className="w-5 h-5" />
                </Link>
              </RevealOnScroll>
            </div>

            {/* Reflections Card */}
            <div className="group relative pl-0 lg:pl-12 pt-12 lg:pt-32">
              <RevealOnScroll delay={200}>
                <div className="aspect-[4/3] overflow-hidden mb-8 relative">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-10" />
                  <Image 
                    src="https://static.wixstatic.com/media/3e9bb1_10c7db23149e4b90be6838357e386986~mv2.png?originWidth=768&originHeight=576"
                    alt="Quiet journaling"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    width={800}
                  />
                  <div className="absolute top-4 left-4 bg-white px-4 py-2 font-heading text-sm uppercase tracking-widest z-20">
                    Reflections
                  </div>
                </div>
                <h3 className="font-heading text-4xl lg:text-5xl text-primary mb-4 group-hover:translate-x-4 transition-transform duration-300">
                  Daily Wisdom
                </h3>
                <p className="text-lg text-secondary-foreground/70 mb-8 max-w-md">
                  Find inspiration in personal reflections that explore faith, grace, and the beauty of walking with Jesus.
                </p>
                <Link 
                  to="/reflections" 
                  className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:gap-4 transition-all duration-300"
                >
                  Explore Reflections <ArrowRight className="w-5 h-5" />
                </Link>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* --- DOWNLOAD CTA --- */}
      <section id="download" className="w-full bg-primary text-primary-foreground py-24 lg:py-40 relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-badgebackground/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-black/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <RevealOnScroll>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-badgebackground rounded-full mb-8 text-primary">
              <Download className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-6xl lg:text-9xl mb-8 leading-[0.9]">
              Carry Grace<br/><span className="italic text-badgebackground">Everywhere.</span>
            </h2>
            <p className="text-xl lg:text-2xl max-w-2xl mx-auto mb-12 opacity-90">
              Your daily companion for peace, scripture, and spiritual growth. Available now for iOS and Android.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="#" 
                className="w-full sm:w-auto px-10 py-5 bg-white text-primary font-heading text-lg hover:bg-badgebackground transition-colors duration-300 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Download for iOS
              </a>
              <a 
                href="#" 
                className="w-full sm:w-auto px-10 py-5 border-2 border-white text-white font-heading text-lg hover:bg-white hover:text-primary transition-all duration-300 rounded-full"
              >
                Download for Android
              </a>
            </div>
            
            <div className="mt-16 flex justify-center gap-8 opacity-60">
              <div className="flex flex-col items-center">
                <span className="font-heading text-3xl">4.9</span>
                <span className="text-sm uppercase tracking-widest">App Store</span>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="flex flex-col items-center">
                <span className="font-heading text-3xl">10k+</span>
                <span className="text-sm uppercase tracking-widest">Downloads</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}