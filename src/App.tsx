import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Calendar, 
  Coffee, 
  Code2, 
  Smartphone, 
  Database, 
  Globe, 
  Rocket, 
  Zap, 
  TrendingUp, 
  Mic2,
  ArrowRight,
  Github,
  Instagram,
  Twitter,
  Plus,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";

// @ts-ignore
import Player from "@vimeo/player";

const VimeoStory = ({ videoId }: { videoId: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    player.on('loaded', () => {
      setIsLoaded(true);
    });

    return () => {
      player.destroy();
    };
  }, [videoId]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current) return;

    const newMutedState = !isMuted;
    playerRef.current.setVolume(newMutedState ? 0 : 1);
    setIsMuted(newMutedState);
  };

  // background=1 hides ALL controls, badge, etc. Autoplay and loop are implied or explicitly set.
  const videoUrl = `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1`;

  return (
    <div className="relative w-full h-full bg-black group">
      <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
        <iframe
          ref={iframeRef}
          src={videoUrl}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%' 
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          title="edax"
        />
      </div>
      
      {/* Circle Mute/Unmute Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center z-30 transition-colors border border-white/20"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </motion.button>
      
      {/* Fallback spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-edax-surface flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-edax-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

const SectionHeader = ({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) => (
  <div className="border-b border-edax-primary pb-8 mb-12">
    <div className="flex items-baseline gap-4 mb-4">
      <span className="font-mono text-sm font-bold opacity-40">{number}</span>
      <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter uppercase">
        {title}
      </h2>
    </div>
    {subtitle && (
      <p className="text-xl text-gray-600 max-w-2xl font-medium leading-tight">
        {subtitle}
      </p>
    )}
  </div>
);

const GridCard = ({ icon: Icon, title, description, border = true }: any) => (
  <div className={`p-8 ${border ? 'border-r border-b' : 'border-b'} border-edax-border hover:bg-edax-surface transition-colors group`}>
    <div className="mb-12">
      <Icon className="w-8 h-8 text-edax-primary group-hover:text-edax-accent transition-colors" strokeWidth={1.5} />
    </div>
    <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-tight">{title}</h3>
    <p className="text-gray-600 leading-relaxed font-medium">{description}</p>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-edax-accent selection:text-white custom-scrollbar bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-edax-primary">
        <div className="max-w-[1360px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="EDAX Logo" className="h-8 w-auto object-contain" />
            <div className="h-4 w-[1px] bg-edax-border hidden sm:block" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400 hidden sm:block">
              Comunidad Vibecoder / Lima PE
            </span>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
              <a href="#comunidad" className="hover:text-edax-accent transition-colors">Comunidad</a>
              <a href="#talleres" className="hover:text-edax-accent transition-colors">Talleres</a>
              <a href="#stack" className="hover:text-edax-accent transition-colors">Stack</a>
            </div>
            <a 
              href="https://chat.whatsapp.com/K0gTWpN3hcMLcxZk7BPE2f"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-edax-primary text-white text-[11px] font-bold uppercase tracking-widest hover:bg-edax-accent transition-all"
            >
              Unirse
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-24 pb-16 border-b border-edax-primary relative overflow-hidden flex min-h-[calc(100vh-64px)] items-center">
        {/* Subtle grid background for technical feel */}
        <div className="absolute inset-0 -z-10 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-[1360px] mx-auto px-6 w-full relative">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-8 lg:pr-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 flex items-center gap-4"
              >
                <span className="w-12 h-[1px] bg-edax-accent" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-edax-accent">
                  Comunidad Vibecoder / Lima 2026
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[11vw] lg:text-[6.5vw] font-display font-bold leading-[0.85] tracking-tighter uppercase mb-10"
              >
                ¿POR QUÉ <br />
                UNIRTE <span className="text-edax-accent italic font-light lowercase tracking-normal">a</span> <br />
                <span className="text-edax-accent">EDAX?</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-8 mb-10"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="pr-4">
                    <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-edax-accent mb-3">// 01. Acceso Total</h3>
                    <p className="text-base font-medium leading-relaxed text-gray-900">
                      Talleres gratuitos todos los domingos. Sin barreras, solo conocimiento real.
                    </p>
                  </div>
                  <div className="pr-4">
                    <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-edax-accent mb-3">// 02. Red Real</h3>
                    <p className="text-base font-medium leading-relaxed text-gray-900">
                      Networking presencial en Lima. Conecta con quienes están construyendo el futuro.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <a 
                  href="https://chat.whatsapp.com/K0gTWpN3hcMLcxZk7BPE2f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center gap-4 group text-sm tracking-widest py-4 px-8"
                >
                  UNIRME AHORA <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <button className="btn-secondary text-sm tracking-widest py-4 px-8">
                  VER TALLERES
                </button>
              </motion.div>
            </div>

            {/* Right Column: Video (Desktop) */}
            <div className="hidden lg:flex lg:col-span-4 justify-end relative h-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="w-full max-w-[280px] aspect-[9/16] bg-edax-surface border border-edax-primary p-2 group overflow-visible shadow-2xl relative"
              >
                <div className="w-full h-full bg-black overflow-hidden relative">
                  <VimeoStory videoId="1180608921" />
                </div>
                {/* Visual Highlights */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-edax-accent rounded-full flex items-center justify-center text-white shadow-xl z-30">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-edax-primary rounded-full flex items-center justify-center z-[-1] opacity-10"></div>
              </motion.div>
            </div>

          </div>
        </div>
        
        {/* Decorative vertical line */}
        <div className="absolute right-1/4 top-0 h-full w-[1px] bg-edax-border -z-10 hidden lg:block" />
      </header>

      {/* Stats / Marquee Style */}
      <div className="border-b border-edax-primary py-2 overflow-hidden bg-edax-primary text-white">
        <div className="flex whitespace-nowrap animate-marquee font-mono text-[10px] font-bold uppercase tracking-[0.4em]">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 flex items-center gap-4">
              <Plus size={10} /> TALLERES VIRTUALES DOMINGOS 7PM <Plus size={10} /> NETWORKING SÁBADOS <Plus size={10} /> LIMA PERÚ
            </span>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <section id="comunidad" className="max-w-[1360px] mx-auto border-x border-edax-border">
        <div className="p-3 md:p-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <SectionHeader 
                number="01" 
                title="La Comunidad" 
                subtitle="Acceso gratuito a talleres virtuales y espacios de aprendizaje colaborativo." 
              />
            </div>
            
            {/* Community Video (Hidden on Desktop, shown on Mobile as requested) */}
            <div className="lg:col-span-4 lg:hidden flex flex-col justify-center items-center mb-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[280px] aspect-[9/16] bg-edax-surface border border-edax-primary p-2 group overflow-visible"
              >
                <div className="w-full h-full bg-gray-100 overflow-hidden relative">
                  <VimeoStory videoId="1180608921" />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-edax-accent rounded-full flex items-center justify-center text-white shadow-xl z-30">
                  <Zap size={20} fill="currentColor" />
                </div>
              </motion.div>
              <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-edax-accent opacity-60">
                // Ver video comunidad
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 border-l border-t border-edax-border">
            <GridCard 
              icon={Calendar}
              title="Virtuales"
              description="Talleres todos los domingos a las 7:00 PM. Sin costo, aprendizaje remoto de alto nivel."
            />
            <GridCard 
              icon={Users}
              title="Colaboración"
              description="Espacios para compartir conocimiento y aprender en grupo. Crecemos juntos."
            />
            <GridCard 
              icon={Rocket}
              title="Proyectos"
              description="Apoyo en el desarrollo de tus proyectos personales y crecimiento profesional."
              border={false}
            />
          </div>
        </div>
      </section>

      {/* In-person Workshops */}
      <section id="talleres" className="max-w-[1360px] mx-auto border-x border-edax-border border-t border-edax-primary">
        <div className="grid lg:grid-cols-2">
          <div className="p-3 md:p-6 border-r border-edax-border">
            <SectionHeader 
              number="02" 
              title="Presencial" 
              subtitle="Nos reunimos todos los sábados en cafeterías y espacios colaborativos de Lima." 
            />
            <div className="space-y-12 mt-12">
              {[
                { title: "Networking", desc: "Conecta con otros desarrolladores en un ambiente relajado." },
                { title: "Dudas Técnicas", desc: "Resolvemos problemas de código en vivo, cara a cara." },
                { title: "Crecimiento", desc: "Construye una red de contactos sólida en la industria local." }
              ].map((item, i) => (
                <div key={i} className="group">
                  <h4 className="font-display font-bold text-2xl uppercase tracking-tight mb-2 group-hover:text-edax-accent transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <a 
                href="https://chat.whatsapp.com/K0gTWpN3hcMLcxZk7BPE2f"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-4 group text-sm tracking-widest px-8 py-4 w-full sm:w-auto"
              >
                UNIRSE A LA COMUNIDAD <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="bg-edax-surface p-3 md:p-6 flex items-center justify-center">
            <div className="relative w-full aspect-square border border-edax-primary p-4">
              <img 
                src="/images/img1.png" 
                alt="Workshop" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-4 -right-4 bg-edax-primary text-white p-6 font-mono text-[10px] font-bold uppercase tracking-widest">
                Lima / Sábados / 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section id="stack" className="max-w-[1360px] mx-auto border-x border-edax-border border-t border-edax-primary">
        <div className="p-3 md:p-6">
          <SectionHeader 
            number="03" 
            title="El Stack" 
            subtitle="Dominamos las herramientas que están definiendo la próxima era del desarrollo." 
          />
          <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-edax-border">
            {[
              { icon: Smartphone, title: "Mobile IA", desc: "Flutter & React Native." },
              { icon: Database, title: "Backend", desc: "Supabase & MongoDB." },
              { icon: Globe, title: "Nube", desc: "Despliegue en AWS & Vercel." },
              { icon: Code2, title: "Herramientas IA", desc: "Cursor & Claude." },
              { icon: Rocket, title: "Tiendas", desc: "Publicación en Play Store." },
              { icon: TrendingUp, title: "Marketing", desc: "Estrategia Meta Ads." },
              { icon: Mic2, title: "Habilidades", desc: "Oratoria & Pitching." },
              { icon: Zap, title: "Negocios", desc: "Monetización Real." }
            ].map((item, i) => (
              <div key={i} className="p-8 border-r border-b border-edax-border hover:bg-edax-primary hover:text-white transition-all group">
                <item.icon className="mb-8 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <h5 className="font-display font-bold uppercase text-sm tracking-widest mb-2">{item.title}</h5>
                <p className="text-[11px] font-medium opacity-60 uppercase tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Bento Grid */}
      <section id="galeria" className="max-w-[1360px] mx-auto border-x border-edax-border border-t border-edax-primary">
        <div className="p-3 md:p-6">
          <SectionHeader 
            number="04" 
            title="Comunidad" 
            subtitle="Momentos reales de nuestros talleres y encuentros presenciales en Lima." 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {/* Large Main Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative overflow-hidden group border border-edax-border"
            >
              <img 
                src="/images/img2.png" 
                alt="Taller EDAX" 
                className="w-full h-full object-cover grayscale-0 transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">
                Taller Mensual / Aula
              </div>
            </motion.div>

            {/* Vertical Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:row-span-2 relative overflow-hidden group border border-edax-border"
            >
              <img 
                src="/images/img6.png" 
                alt="Networking" 
                className="w-full h-full object-cover grayscale-0 transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">
                Networking / Cafetería
              </div>
            </motion.div>

            {/* Small Top Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden group border border-edax-border"
            >
              <img 
                src="/images/img4.png" 
                alt="Colaboración" 
                className="w-full h-full object-cover grayscale-0 transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Small Bottom Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden group border border-edax-border"
            >
              <img 
                src="/images/img5.png" 
                alt="Aprendizaje" 
                className="w-full h-full object-cover grayscale-0 transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 bg-edax-accent text-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">
                +50 Miembros
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-edax-primary text-white py-16">
  <div className="max-w-[1360px] mx-auto px-6 text-center">
          <h2 className="text-[10vw] font-display font-bold leading-none tracking-tighter uppercase mb-12">
            Únete al<br />
            Movimiento
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://chat.whatsapp.com/K0gTWpN3hcMLcxZk7BPE2f"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-6 bg-white text-edax-primary font-bold text-xl uppercase tracking-tighter hover:bg-edax-accent hover:text-white transition-all flex items-center justify-center"
            >
              Unirse Gratis
            </a>
            <button className="px-12 py-6 border border-white text-white font-bold text-xl uppercase tracking-tighter hover:bg-white hover:text-edax-primary transition-all">
              Contactar
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-[1360px] mx-auto border-x border-edax-border py-12 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <span className="font-display font-bold text-4xl tracking-tighter uppercase mb-4 block">EDAX</span>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Comunidad Vibecoder / Lima Perú / 2026
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Redes</span>
              <div className="flex gap-6">
                <Github size={18} className="hover:text-edax-accent cursor-pointer" />
                <Instagram size={18} className="hover:text-edax-accent cursor-pointer" />
                <Twitter size={18} className="hover:text-edax-accent cursor-pointer" />
              </div>
            </div>
            <div className="space-y-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Legal</span>
              <span className="text-[11px] font-bold uppercase tracking-widest block cursor-pointer hover:text-edax-accent">Privacidad</span>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </div>
  );
}
