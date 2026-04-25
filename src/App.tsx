import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

declare global {
  interface Window {
    MercadoPago: any;
  }
}
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
  VolumeX,
  Menu,
  X,
  ShoppingCart
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

function Home() {
  return (
    <>
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
    </>
  );
}



function Tienda({ cart, setCart, formData, setFormData }: any) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  
  // Product Selections
  const [poloSize, setPoloSize] = useState('M');
  const [poloColor, setPoloColor] = useState('Negro');
  
  const [gorraColor, setGorraColor] = useState('Negro');

  useEffect(() => {
    // Detectar éxito al retornar de Mercado Pago
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('status') === 'success') {
      alert("¡Pago realizado con éxito! Tu orden ha sido confirmada.");
      setCart([]);
      setIsCartOpen(false);
      setIsCheckout(false);
      // Limpiar parámetros de la URL sin recargar
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const handleProcederAlPago = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="pt-24 pb-16 min-h-screen flex flex-col justify-center relative">
      {/* Cart Floating Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 bg-edax-primary text-white p-4 rounded-full shadow-2xl z-40 hover:bg-edax-accent transition-all"
      >
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-edax-accent w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">
            {cart.length}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end"
          >
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-edax-primary flex justify-between items-center bg-edax-primary text-white">
                <h3 className="font-display font-bold text-xl uppercase tracking-widest">Tu Carrito</h3>
                <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform"><X size={24} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <ShoppingCart size={48} className="text-gray-200" />
                    <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em]">El carrito está vacío</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-start border-b border-gray-100 pb-6 group">
                        <div className="space-y-1">
                          <p className="font-bold uppercase tracking-tight text-sm group-hover:text-edax-accent transition-colors">{item.name}</p>
                          <p className="text-gray-400 font-mono text-[9px] uppercase tracking-widest">Talla: {item.size} | Color: {item.color}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-sm">S/ {item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-gray-100 bg-white">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Total Estimado</span>
                  <span className="font-display font-bold text-2xl text-edax-primary">S/ {total.toFixed(2)}</span>
                </div>
                {cart.length > 0 && (
                  <button onClick={handleProcederAlPago} className="w-full btn-primary py-5 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3">
                    PROCEDER AL PAGO <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Merch Section */}
      <section id="tienda" className="max-w-[1360px] w-full mx-auto border-x border-edax-border border-t border-edax-primary relative z-10">
        <div className="p-3 md:p-6">
          <SectionHeader 
            number="05" 
            title="Tienda" 
            subtitle="Viste el código. Expresa tu vibe." 
          />
          <div className="grid md:grid-cols-2 border-l border-t border-edax-border">
            {/* Producto 1 */}
            <div className="p-6 border-r border-b border-edax-border group">
              <div className="aspect-square bg-edax-surface overflow-hidden relative mb-6 border border-edax-border">
                <img src="/images/polo.png" alt="Polo EDAX" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-edax-primary text-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">
                  Nuevo
                </div>
              </div>
              <div className="mb-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display font-bold text-2xl uppercase tracking-tight">Polo Vibecoder</h3>
                    <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mt-1">Algodón Premium / Oversize</p>
                  </div>
                  <span className="font-display font-bold text-2xl text-edax-accent">S/ 45.00</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Talla</label>
                    <select className="w-full border border-gray-300 p-2 text-xs uppercase focus:border-edax-accent outline-none" value={poloSize} onChange={(e) => setPoloSize(e.target.value)}>
                      {['S', 'M', 'L', 'XL'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Color</label>
                    <select className="w-full border border-gray-300 p-2 text-xs uppercase focus:border-edax-accent outline-none" value={poloColor} onChange={(e) => setPoloColor(e.target.value)}>
                      {['Blanco', 'Negro'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => addToCart({id: 'polo', name: 'Polo Vibecoder', price: 45, size: poloSize, color: poloColor})}
                className="w-full btn-primary py-4 text-sm tracking-widest flex items-center justify-center gap-3 uppercase font-bold group-hover:bg-edax-accent"
              >
                AÑADIR AL CARRITO <ShoppingCart size={16} />
              </button>
            </div>

            {/* Producto 2 */}
            <div className="p-6 border-r border-b border-edax-border group">
              <div className="aspect-square bg-edax-surface overflow-hidden relative mb-6 border border-edax-border">
                <img src="/images/gorro.png" alt="Gorra EDAX" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="mb-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display font-bold text-2xl uppercase tracking-tight">Gorra Edax</h3>
                    <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mt-1">Snapback / Bordado 3D</p>
                  </div>
                  <span className="font-display font-bold text-2xl text-edax-accent">S/ 35.00</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Talla</label>
                    <select className="w-full border border-gray-300 p-2 text-xs uppercase bg-gray-100 cursor-not-allowed text-gray-400" disabled value="Estándar">
                      <option value="Estándar">Estándar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Color</label>
                    <select className="w-full border border-gray-300 p-2 text-xs uppercase focus:border-edax-accent outline-none" value={gorraColor} onChange={(e) => setGorraColor(e.target.value)}>
                      {['Blanco', 'Negro'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => addToCart({id: 'gorra', name: 'Gorra Edax', price: 35, size: 'Estándar', color: gorraColor})}
                className="w-full btn-primary py-4 text-sm tracking-widest flex items-center justify-center gap-3 uppercase font-bold group-hover:bg-edax-accent"
              >
                AÑADIR AL CARRITO <ShoppingCart size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<{id: string, name: string, price: number, size: string, color: string}[]>([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen selection:bg-edax-accent selection:text-white custom-scrollbar bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-edax-primary">
        <div className="max-w-[1360px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src="/images/logo.png" alt="EDAX Logo" className="h-8 w-auto object-contain" />
            </Link>
            <div className="h-4 w-[1px] bg-edax-border hidden sm:block" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400 hidden sm:block">
              Comunidad Vibecoder / Lima PE
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
              <a href="/#comunidad" className="hover:text-edax-accent transition-colors">Comunidad</a>
              <a href="/#talleres" className="hover:text-edax-accent transition-colors">Talleres</a>
              <a href="/#stack" className="hover:text-edax-accent transition-colors">Stack</a>
              <Link to="/tienda" className="hover:text-edax-accent transition-colors">Tienda</Link>
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

          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden text-edax-primary hover:text-edax-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-edax-primary bg-white overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col p-6 gap-6 font-display font-bold uppercase tracking-widest text-sm">
                <a href="/#comunidad" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-edax-accent transition-colors">Comunidad</a>
                <a href="/#talleres" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-edax-accent transition-colors">Talleres</a>
                <a href="/#stack" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-edax-accent transition-colors">Stack</a>
                <Link to="/tienda" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-edax-accent transition-colors">Tienda</Link>
                <a 
                  href="https://chat.whatsapp.com/K0gTWpN3hcMLcxZk7BPE2f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-edax-primary text-white py-4 text-center mt-4 text-[11px]"
                >
                  UNIRSE A LA COMUNIDAD
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Tienda cart={cart} setCart={setCart} formData={formData} setFormData={setFormData} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} formData={formData} setFormData={setFormData} />} />
      </Routes>

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

// ==========================================
// COMPONENTE DE PANTALLA COMPLETA: CHECKOUT
// ==========================================
function Checkout({ cart, setCart, formData, setFormData }: any) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const total = cart.reduce((sum: number, item: any) => sum + item.price, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cart.length === 0) navigate('/tienda');
  }, [cart, navigate]);

  return (
    <div className="min-h-screen bg-edax-surface pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Columna Izquierda: Formularios */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-12 border border-edax-border"
            >
              <button 
                onClick={() => navigate('/tienda')}
                className="mb-10 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-edax-accent flex items-center gap-2 transition-colors"
              >
                <ArrowRight size={12} className="rotate-180" /> Volver a la Tienda
              </button>

              <h2 className="text-4xl font-display font-bold uppercase tracking-tighter mb-12">Finalizar Compra</h2>

              <div className="space-y-12">
                {/* 01. DATOS DE ENVÍO */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-edax-primary text-white flex items-center justify-center text-xs font-bold font-mono">01</span>
                    <h3 className="font-display font-bold uppercase tracking-widest text-sm">Datos de Envío</h3>
                  </div>
                  
                  <div className="grid gap-6">
                    <div className="group border-b border-gray-100 focus-within:border-edax-accent transition-colors">
                      <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Nombre Completo</label>
                      <input required className="w-full py-3 text-sm font-display bg-transparent outline-none uppercase" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group border-b border-gray-100 focus-within:border-edax-accent transition-colors">
                        <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Email</label>
                        <input required className="w-full py-3 text-sm font-mono bg-transparent outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="group border-b border-gray-200 focus-within:border-edax-accent transition-colors">
                        <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Celular</label>
                        <input required className="w-full py-3 text-sm font-mono bg-transparent outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 02. MÉTODO DE PAGO */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-edax-primary text-white flex items-center justify-center text-xs font-bold font-mono">02</span>
                    <h3 className="font-display font-bold uppercase tracking-widest text-sm">Método de Pago NATIVO</h3>
                  </div>
                  
                  <NativePaymentForm 
                    total={total} 
                    formData={formData} 
                    setFormData={setFormData}
                    cart={cart}
                    onSuccess={() => {
                      setCart([]);
                      navigate('/tienda?status=success');
                    }}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Columna Derecha: Resumen */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-32 space-y-6"
            >
              <div className="bg-edax-primary text-white p-8">
                <h3 className="font-display font-bold uppercase tracking-widest text-sm mb-8 border-b border-white/10 pb-4">Resumen de Orden</h3>
                <div className="space-y-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2 mb-8">
                  {cart.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-bold uppercase tracking-tight">{item.name}</p>
                        <p className="text-[9px] font-mono opacity-50 uppercase">{item.size} / {item.color}</p>
                      </div>
                      <span className="text-xs font-bold">S/ {item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-end border-t border-white/20 pt-6">
                   <div className="space-y-1">
                      <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Total Final</p>
                      <p className="text-3xl font-display font-bold tracking-tighter text-edax-accent">S/ {total.toFixed(2)}</p>
                   </div>
                   <div className="text-[10px] font-mono opacity-40 uppercase text-right">
                      Incl. IGV
                   </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-edax-border flex items-center gap-4">
                 <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                    <Zap size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest">Garantía EDAX</p>
                    <p className="text-[9px] text-gray-500 uppercase font-mono mt-1">Soporte directo vía comunidad WhatsApp.</p>
                 </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE DE PAGO NATIVO (CUSTOM UI)
// ==========================================
function NativePaymentForm({ total, formData, setFormData, cart, onSuccess, isProcessing, setIsProcessing }: any) {
  const [method, setMethod] = useState('card'); // 'card', 'yape', 'ticket'
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    dni: ''
  });
  const [yapeData, setYapeData] = useState({
    phone: '',
    otp: ''
  });

  const handleNativePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (!window.MercadoPago) throw new Error("MercadoPago SDK no cargado.");
      
      const mp = new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
        locale: 'es-PE'
      });
      
      let payload: any = {
        amount: total,
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
        description: `EDAX Merch - ${cart.map((i:any) => i.name).join(', ')}`,
        cart: cart
      };

      if (method === 'card') {
        const [month, year] = cardData.expiry.split('/');
        const tokenResponse = await mp.createCardToken({
          cardNumber: cardData.number.replace(/\s/g, ''),
          cardholderName: cardData.name,
          cardExpirationMonth: month,
          cardExpirationYear: '20' + year,
          securityCode: cardData.cvv,
          identificationType: 'DNI',
          identificationNumber: cardData.dni
        });

        if (!tokenResponse.id) {
          console.error("Token error:", tokenResponse);
          throw new Error("Datos de tarjeta inválidos.");
        }
        
        payload.token = tokenResponse.id;
        payload.payment_method_id = 'visa';
        payload.identificationType = 'DNI';
        payload.identificationNumber = cardData.dni;
      } else if (method === 'yape') {
        payload.payment_method_id = 'yape';
        payload.phone = yapeData.phone;
        payload.otp = yapeData.otp;
      } else {
        payload.payment_method_id = 'pagoefectivo';
      }

      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === 'approved' || (result.transaction_details && result.transaction_details.external_resource_url)) {
        if (result.transaction_details?.external_resource_url) {
          window.open(result.transaction_details.external_resource_url, '_blank');
          alert("CIP Generado. Paga en tu app bancaria.");
        } else {
          alert("¡Pago aprobado! Tu orden está en camino.");
        }
        onSuccess();
      } else {
        alert("Pago rechazado: " + (result.error || result.message || result.status_detail || "Error desconocido"));
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error al procesar el pago");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex bg-gray-100 p-1 rounded-none">
        {['card', 'yape', 'ticket'].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMethod(m)}
            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${
              method === m ? 'bg-white text-edax-primary shadow-sm' : 'bg-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {m === 'card' ? 'Tarjeta' : m === 'yape' ? 'Yape' : 'CIP'}
          </button>
        ))}
      </div>

      <form onSubmit={handleNativePay} className="space-y-6">
        {method === 'card' && (
          <div className="space-y-4">
            <div className="group border-b border-gray-200 focus-within:border-edax-accent transition-colors">
              <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Número de Tarjeta</label>
              <input required placeholder="0000 0000 0000 0000" className="w-full py-2 text-sm font-mono bg-transparent outline-none" value={cardData.number} onChange={e => setCardData({...cardData, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)})} />
            </div>
            <div className="group border-b border-gray-200 focus-within:border-edax-accent transition-colors">
              <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Titular</label>
              <input required placeholder="NOMBRE COMO FIGURA EN TARJETA" className="w-full py-2 text-sm font-display bg-transparent outline-none uppercase" value={cardData.name} onChange={e => setCardData({...cardData, name: e.target.value})} />
            </div>
            <div className="flex gap-6">
              <div className="flex-1 group border-b border-gray-200 focus-within:border-edax-accent transition-colors">
                <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Vencimiento</label>
                <input required placeholder="MM/YY" className="w-full py-2 text-sm font-mono bg-transparent outline-none" value={cardData.expiry} onChange={e => setCardData({...cardData, expiry: e.target.value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5)})} />
              </div>
              <div className="flex-1 group border-b border-gray-200 focus-within:border-edax-accent transition-colors">
                <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">CVV</label>
                <input required placeholder="000" className="w-full py-2 text-sm font-mono bg-transparent outline-none" value={cardData.cvv} onChange={e => setCardData({...cardData, cvv: e.target.value.slice(0, 4)})} />
              </div>
            </div>
            <div className="group border-b border-gray-200 focus-within:border-edax-accent transition-colors">
              <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">DNI / Documento</label>
              <input required placeholder="NÚMERO DE DOCUMENTO" className="w-full py-2 text-sm font-mono bg-transparent outline-none" value={cardData.dni} onChange={e => setCardData({...cardData, dni: e.target.value})} />
            </div>
          </div>
        )}

        {method === 'yape' && (
          <div className="space-y-4">
             <div className="aspect-[16/6] bg-[#742284] flex flex-col items-center justify-center text-white relative overflow-hidden group">
                <p className="text-[12px] font-bold tracking-[0.3em] uppercase relative z-10">Yape Nativo</p>
                <p className="text-[8px] font-mono opacity-60 relative z-10">Integration Direct API</p>
             </div>
             <div className="space-y-4 px-2">
                <div className="border-b border-gray-200 focus-within:border-[#742284] transition-colors">
                  <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Celular Yape</label>
                  <input required placeholder="900 000 000" className="w-full py-2 text-sm font-mono bg-transparent outline-none" value={yapeData.phone} onChange={e => setYapeData({...yapeData, phone: e.target.value})} />
                </div>
                <div className="border-b border-gray-200 focus-within:border-[#742284] transition-colors">
                  <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Código de Aprobación</label>
                  <input required placeholder="000 000" className="w-full py-2 text-sm font-mono bg-transparent outline-none" value={yapeData.otp} onChange={e => setYapeData({...yapeData, otp: e.target.value.slice(0, 6)})} />
                </div>
                <p className="text-[7px] text-gray-400 font-mono uppercase leading-tight italic">* Obtén tu código en el menú "Yape con código" de tu app.</p>
             </div>
          </div>
        )}

        {method === 'ticket' && (
          <div className="p-6 bg-edax-surface border border-dashed border-gray-200 space-y-3">
             <p className="text-[10px] font-bold uppercase tracking-widest">PagoEfectivo / CIP</p>
             <p className="text-[9px] text-gray-500 font-mono leading-relaxed uppercase">Generaremos un código CIP único para esta compra.</p>
          </div>
        )}

        <button 
          type="submit" 
          disabled={isProcessing}
          className="w-full bg-edax-primary text-white py-4 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-edax-accent transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isProcessing ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <>FINALIZAR ORDEN <ArrowRight size={14} /></>}
        </button>
      </form>
    </div>
  );
}

