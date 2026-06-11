import React, { useState, useEffect, useRef } from "react";
import { 
  Download, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Smile, 
  MapPin, 
  Clock, 
  Mail, 
  ArrowRight, 
  Check, 
  Activity
} from "lucide-react";

// Inline Icons in SVG format for the generated HTML download so it has ZERO dependencies but works beautifully!
const SVG_ICONS = {
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5 5 3Z"></path><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z"></path></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6v7z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
  layers: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-10 5 10 5 10-5-10-5Z"></path><path d="m2 17 10 5 10-5"></path><path d="m2 12 10 5 10-5"></path></svg>`,
  smile: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" x2="9.01" y1="9" y2="9"></line><line x1="15" x2="15.01" y1="9" y2="9"></line></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>`
};

interface Appointment {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  status: string;
}

export default function App() {
  const [downloadProgress, setDownloadProgress] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Before-After Sliders Positions (0% to 100%)
  const [sliderPos1, setSliderPos1] = useState(50);
  const [sliderPos2, setSliderPos2] = useState(50);
  
  const sliderRef1 = useRef<HTMLDivElement>(null);
  const sliderRef2 = useRef<HTMLDivElement>(null);
  
  const isDragging1 = useRef(false);
  const isDragging2 = useRef(false);

  // Load existing demo appointments from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("luxe_dental_booked");
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default placeholder data for dental demo
      const mockAppts: Appointment[] = [
        {
          id: "appt-1",
          name: "Carlos Mendoza",
          phone: "+34 612 345 678",
          service: "Estética Dental Pro",
          date: new Date().toLocaleDateString("es-ES"),
          status: "Confirmada"
        }
      ];
      setAppointments(mockAppts);
      localStorage.setItem("luxe_dental_booked", JSON.stringify(mockAppts));
    }
  }, []);

  // Before & After Sliders movement helpers
  const handleSliderMove = (clientX: number, sliderRef: React.RefObject<HTMLDivElement | null>, setPos: (val: number) => void) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setPos(percentage);
  };

  // Slider #1 Events
  const onMouseDown1 = () => { isDragging1.current = true; };
  // Slider #2 Events
  const onMouseDown2 = () => { isDragging2.current = true; };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      if (isDragging1.current) {
        handleSliderMove(e.clientX, sliderRef1, setSliderPos1);
      }
      if (isDragging2.current) {
        handleSliderMove(e.clientX, sliderRef2, setSliderPos2);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      if (isDragging1.current) {
        handleSliderMove(e.touches[0].clientX, sliderRef1, setSliderPos1);
      }
      if (isDragging2.current) {
        handleSliderMove(e.touches[0].clientX, sliderRef2, setSliderPos2);
      }
    };

    const handleGlobalUp = () => {
      isDragging1.current = false;
      isDragging2.current = false;
    };

    window.addEventListener("mousemove", handleGlobalMove);
    window.addEventListener("mouseup", handleGlobalUp);
    window.addEventListener("touchmove", handleGlobalTouchMove);
    window.addEventListener("touchend", handleGlobalUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const newAppt: Appointment = {
      id: "appt-" + Date.now(),
      name: formData.name,
      phone: formData.phone,
      service: formData.service || "Consulta General",
      date: new Date().toLocaleDateString("es-ES"),
      status: "Pendiente de Confirmar"
    };

    const updated = [newAppt, ...appointments];
    setAppointments(updated);
    localStorage.setItem("luxe_dental_booked", JSON.stringify(updated));
    setIsSubmitted(true);
    setFormData({ name: "", phone: "", service: "" });

    // Auto reset submission indicator after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4500);
  };

  const deleteAppointment = (id: string) => {
    const updated = appointments.filter(a => a.id !== id);
    setAppointments(updated);
    localStorage.setItem("luxe_dental_booked", JSON.stringify(updated));
  };

  // HTML Downloader Generator!
  // Compiles the template into a beautifully responsive, single file index.html that is downloadable.
  const handleDownloadDemo = () => {
    setDownloadProgress(true);

    const generatedHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Luxe Dental Clinic - Demo Premium</title>
  
  <!-- Premium Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#0A2540',
            turquoise: '#00D4FF',
            'soft-gray': '#F6F9FC',
            'dark-blue': '#051424',
          },
          fontFamily: {
            sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            display: ['Montserrat', 'sans-serif'],
          }
        }
      }
    }
  </script>
  
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #f9f9f9;
      color: #1a1c1c;
      scroll-behavior: smooth;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Montserrat', sans-serif;
    }
    .text-outline-glow {
      text-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
    }
  </style>
</head>
<body class="antialiased">

  <!-- TOP DECORATIVE LOGO RIBBON -->
  <div class="bg-primary text-white text-xs text-center py-2 px-4 flex justify-between items-center sm:px-8 border-b border-white/10">
    <span class="flex items-center gap-1.5 font-medium">
      <span class="w-2 h-2 rounded-full bg-turquoise animate-pulse inline-block"></span> 
      CLÍNICA DENTAL PREMIUM — MADRID
    </span>
    <span class="hidden md:inline text-white/70">Atención Exclusiva en Castellana 15</span>
    <a href="tel:+34900000000" class="hover:text-turquoise transition-colors flex items-center gap-1">
      ${SVG_ICONS.phone}
      <span class="font-semibold">+34 900 000 000</span>
    </a>
  </div>

  <!-- NAVIGATION BAR (Glassmorphism) -->
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
      <!-- Logo -->
      <a href="#" class="flex flex-col">
        <span class="font-display font-bold text-xl sm:text-2xl tracking-wider text-primary">LUXE DENTAL</span>
        <span class="text-[9px] tracking-[0.25em] text-turquoise uppercase font-bold -mt-1">Arte & Odontología</span>
      </a>

      <!-- Menu (Desktop) -->
      <nav class="hidden md:flex space-x-8 items-center">
        <a href="#servicios" class="text-sm font-semibold text-primary/80 hover:text-primary transition-colors">Servicios</a>
        <a href="#tecnologia" class="text-sm font-semibold text-primary/80 hover:text-primary transition-colors">Tecnología</a>
        <a href="#casos" class="text-sm font-semibold text-primary/80 hover:text-primary transition-colors">Casos</a>
        <a href="#testimonios" class="text-sm font-semibold text-primary/80 hover:text-primary transition-colors">Testimonios</a>
        <a href="#contacto" class="text-xs tracking-wider uppercase font-bold text-primary/90 bg-soft-gray hover:bg-gray-200 py-2.5 px-4 rounded transition-all">Saber Más</a>
      </nav>

      <!-- CTA and Phone -->
      <div class="flex items-center gap-4">
        <a href="#contacto" class="border border-primary text-primary hover:bg-primary hover:text-white transition-all text-sm font-bold py-2.5 px-5 rounded-md hidden sm:block shadow-sm">
          Reservar Cita
        </a>
        <button id="mobile-menu-btn" class="md:hidden p-2 text-primary focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- MOBILE MENU DRAWER -->
  <div id="mobile-drawer" class="fixed inset-0 z-40 bg-primary/90 backdrop-blur-md translate-x-full transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-center items-center text-center space-y-8 p-6 text-white text-lg">
    <button id="close-drawer-btn" class="absolute top-6 right-6 p-2 text-white">
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
    <a href="#servicios" class="font-display text-2xl font-medium tracking-wide hover:text-turquoise transition-colors">Servicios</a>
    <a href="#tecnologia" class="font-display text-2xl font-medium tracking-wide hover:text-turquoise transition-colors">Tecnología</a>
    <a href="#casos" class="font-display text-2xl font-medium tracking-wide hover:text-turquoise transition-colors">Casos</a>
    <a href="#testimonios" class="font-display text-2xl font-medium tracking-wide hover:text-turquoise transition-colors">Testimonios</a>
    <a href="#contacto" class="bg-turquoise text-primary font-bold py-3 px-8 rounded-full shadow-lg">Reservar Cita Ahora</a>
  </div>

  <!-- HERO SECTION -->
  <section class="relative overflow-hidden bg-[#f9f9f9] pt-12 pb-20 md:py-28 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <!-- Left text info -->
      <div class="lg:col-span-7 space-y-6">
        <div class="inline-flex items-center gap-2 bg-turquoise/10 border border-turquoise/20 text-primary text-[11px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-turquoise animate-ping"></span>
          CLÍNICA DENTAL PREMIUM
        </div>
        
        <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-[1.1] tracking-tight">
          Tu mejor sonrisa comienza <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-turquoise select-none">aquí.</span>
        </h1>
        
        <p class="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
          Odontología de vanguardia con un trato personalizado y exclusivo. Descubre una experiencia única donde la tecnología 3D y el bienestar se encuentran para diseñar tu bienestar.
        </p>

        <div class="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a href="#contacto" class="bg-primary hover:bg-primary/95 text-white font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
            Reserva tu cita hoy
            ${SVG_ICONS.arrowRight}
          </a>
          <a href="#servicios" class="border border-gray-300 hover:border-primary text-primary font-bold px-8 py-4 rounded-lg transition-all text-center">
            Descubrir tratamientos
          </a>
        </div>
      </div>

      <!-- Right image block -->
      <div class="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
        <!-- Main Image Container -->
        <div class="relative w-full max-w-md bg-white p-3 rounded-2xl shadow-xl border border-gray-100">
          <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800" alt="Sonrisa Radiante Luxe Dental" rounded-xl class="rounded-xl w-full object-cover aspect-[4/5] object-center" referrerPolicy="no-referrer" />
          
          <!-- Floating Status Card -->
          <div class="absolute bottom-8 -left-6 bg-white p-4 rounded-xl shadow-2xl border border-gray-50 flex items-center gap-3 animate-bounce shadow-primary/5">
            <div class="p-2.5 bg-turquoise/15 rounded-lg text-turquoise">
              ${SVG_ICONS.smile}
            </div>
            <div>
              <p class="text-[10px] text-gray-500 font-bold tracking-wider uppercase">PACIENTES FELICES</p>
              <p class="font-display font-extrabold text-lg text-primary">+10,000 Sonrisas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- QUALITY PILLARS -->
  <section class="bg-white border-y border-gray-100 py-10 px-4">
    <div class="max-w-7xl mx-auto">
      <p class="text-center text-[10px] sm:text-xs tracking-[0.25em] font-bold text-gray-400 uppercase mb-8">NUESTROS PILARES DE EXCELENCIA</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        <!-- Pillar 1 -->
        <div class="flex items-center gap-4 text-left max-w-xs">
          <div class="p-3 bg-[#f2fafd] text-primary rounded-xl border border-[#e2eff2]">
            ${SVG_ICONS.layers}
          </div>
          <div>
            <h4 class="font-display font-bold text-[#0A2540] text-sm">Tecnología 3D</h4>
            <p class="text-[#43474d] text-xs">Simulación digital exacta de tu sonrisa</p>
          </div>
        </div>
        <!-- Pillar 2 -->
        <div class="flex items-center gap-4 text-left max-w-xs">
          <div class="p-3 bg-[#f2fafd] text-[#0A2540] rounded-xl border border-[#e2eff2]">
            ${SVG_ICONS.sparkles}
          </div>
          <div>
            <h4 class="font-display font-bold text-[#0A2540] text-sm">Especialistas Certificados</h4>
            <p class="text-[#43474d] text-xs">Odontólogos formados a nivel internacional</p>
          </div>
        </div>
        <!-- Pillar 3 -->
        <div class="flex items-center gap-4 text-left max-w-xs">
          <div class="p-3 bg-[#f2fafd] text-[#0A2540] rounded-xl border border-[#e2eff2]">
            ${SVG_ICONS.phone}
          </div>
          <div>
            <h4 class="font-display font-bold text-[#0A2540] text-sm">Atención VIP</h4>
            <p class="text-[#43474d] text-xs">Instalaciones relajantes libres de estrés</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVICES SECTION -->
  <section id="servicios" class="py-24 px-4 bg-gray-50/50">
    <div class="max-w-7xl mx-auto text-center space-y-4 mb-16">
      <h2 class="font-display text-3xl md:text-4xl font-bold text-primary">Arte y Ciencia para tu Sonrisa</h2>
      <div class="w-16 h-1 bg-turquoise mx-auto rounded"></div>
      <p class="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
        Nuestros tratamientos de autor están diseñados para ofrecer resultados estéticos impecables con la máxima preservación de tu salud dental.
      </p>
    </div>

    <!-- Treatment cards grid -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Card 1 -->
      <div class="bg-white rounded-2xl p-8 border border-gray-100 hover:border-turquoise/30 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
        <div class="space-y-4">
          <div class="p-3 bg-gray-50 rounded-xl w-fit group-hover:bg-[#f2fafd] group-hover:text-turquoise transition-colors text-primary">
            ${SVG_ICONS.layers}
          </div>
          <h3 class="font-display text-xl font-bold text-primary">Implantología Avanzada</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            Soluciones definitivas con materiales biocompatibles de alta simulación para recuperar la funcionalidad y estética total de tu boca. Recobra la seguridad.
          </p>
        </div>
        <a href="#contacto" class="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-turquoise transition-colors uppercase tracking-wider mt-8">
          Saber más
          ${SVG_ICONS.arrowRight}
        </a>
      </div>

      <!-- Card 2 (Special Featured Card - Dark Midnight Blue) -->
      <div class="bg-[#0A2540] text-white rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between border-2 border-turquoise/30">
        <div class="absolute -top-10 -right-10 w-24 h-24 bg-turquoise/10 rounded-full blur-2xl"></div>
        <div class="space-y-4 relative z-10">
          <div class="p-3 bg-white/10 text-turquoise rounded-xl w-fit">
            ${SVG_ICONS.sparkles}
          </div>
          <div class="inline-block bg-turquoise/20 text-turquoise text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded">
            El más solicitado
          </div>
          <h3 class="font-display text-xl font-bold">Estética Dental Pro</h3>
          <p class="text-gray-300 text-sm leading-relaxed">
            Diseño de sonrisa digital, carillas cerámicas ultrafinas y blanqueamiento clínico sin sensibilidad para un resultado deslumbrante, natural y de alta costura.
          </p>
        </div>
        <a href="#contacto" class="inline-flex items-center gap-2 text-xs font-bold text-turquoise transition-colors uppercase tracking-wider mt-8 relative z-10">
          Saber más
          ${SVG_ICONS.arrowRight}
        </a>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-2xl p-8 border border-gray-100 hover:border-turquoise/30 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
        <div class="space-y-4">
          <div class="p-3 bg-gray-50 rounded-xl w-fit group-hover:bg-[#f2fafd] group-hover:text-turquoise transition-colors text-primary">
            ${SVG_ICONS.shield}
          </div>
          <h3 class="font-display text-xl font-bold text-primary">Ortodoncia Invisible</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            Alineadores transparentes personalizados (Invisalign®). La forma inalámbrica, ultra discreta y cómoda de conseguir la alineación perfecta de tus dientes.
          </p>
        </div>
        <a href="#contacto" class="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-turquoise transition-colors uppercase tracking-wider mt-8">
          Saber más
          ${SVG_ICONS.arrowRight}
        </a>
      </div>
    </div>
  </section>

  <!-- TECHNOLOGY & PRECISION SECTION -->
  <section id="tecnologia" class="py-24 px-4 bg-white border-b border-gray-100">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <!-- Left side image with custom technical floating notes -->
      <div class="relative flex justify-center order-2 lg:order-1">
        <div class="relative w-full max-w-md bg-soft-gray p-4 rounded-3xl border border-gray-200">
          <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" alt="Gabinete de Tecnología Dental" class="rounded-2xl w-full object-cover aspect-[4/3]" referrerPolicy="no-referrer" />
          
          <!-- Micro metric tags -->
          <div class="absolute -top-4 -right-4 bg-primary text-white py-3 px-5 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center">
            <span class="font-display text-xl font-extrabold text-turquoise">100%</span>
            <span class="text-[9px] text-gray-300 font-bold uppercase tracking-widest">Flujo Digital</span>
          </div>

          <div class="absolute -bottom-4 -left-4 bg-white text-primary py-3 px-5 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center">
            <span class="font-display text-lg font-extrabold">3D Escáner</span>
            <span class="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Intraoral de Alta Gama</span>
          </div>
        </div>
      </div>

      <!-- Right side texts and custom bullet lists -->
      <div class="space-y-6 order-1 lg:order-2">
        <div class="inline-flex items-center gap-1.5 text-xs text-turquoise tracking-widest uppercase font-bold">
          ${SVG_ICONS.sparkles} INNOVACIÓN PERMANENTE
        </div>
        <h2 class="font-display text-3xl md:text-4xl font-bold text-primary leading-tight">
          Precisión suiza en cada diagnóstico
        </h2>
        <p class="text-gray-600 leading-relaxed">
          En Luxe Dental hemos eliminado la incertidumbre dental tradicional. Nuestras instalaciones del centro de Madrid están ideadas con la última tecnología de imagen 3D y flujos de trabajo completamente digitales.
        </p>

        <!-- Technical checklist -->
        <ul class="space-y-4 pt-2">
          <li class="flex items-start gap-3">
            <div class="p-1 bg-turquoise/20 text-primary rounded-full mt-1">
              ${SVG_ICONS.check}
            </div>
            <div>
              <p class="font-bold text-sm text-primary">Diagnóstico de ultra baja dosis</p>
              <p class="text-xs text-gray-500">CBCT de última generación que reduce la exposición cuidando tu salud.</p>
            </div>
          </li>
          <li class="flex items-start gap-3">
            <div class="p-1 bg-turquoise/20 text-primary rounded-full mt-1">
              ${SVG_ICONS.check}
            </div>
            <div>
              <p class="font-bold text-sm text-primary">Impresiones digitales sin pastas</p>
              <p class="text-xs text-gray-500 font-medium">Escáner intraoral 3D de alta velocidad, cómodo e inmediato.</p>
            </div>
          </li>
          <li class="flex items-start gap-3">
            <div class="p-1 bg-turquoise/20 text-primary rounded-full mt-1">
              ${SVG_ICONS.check}
            </div>
            <div>
              <p class="font-bold text-sm text-primary">Simulación virtual previa al tratamiento</p>
              <p class="text-xs text-gray-500">Visualiza en tres dimensiones el resultado final de tu sonrisa antes de comenzar.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- BEFORE / AFTER INTERACTIVE COMPARISON SLIDERS -->
  <section id="casos" class="py-24 px-4 bg-gray-50/50">
    <div class="max-w-7xl mx-auto text-center space-y-4 mb-16">
      <p class="text-xs font-bold tracking-widest uppercase text-turquoise">CASOS REALES</p>
      <h2 class="font-display text-3xl md:text-4xl font-bold text-primary">Nuestras Transformaciones</h2>
      <div class="w-16 h-1 bg-turquoise mx-auto rounded"></div>
      <p class="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
        Pasa el ratón o arrastra la barra de en medio para ver el asombroso cambio interactivo del "Antes" y "Después".
      </p>
    </div>

    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Case 1: Estética Dental -->
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <h3 class="font-display font-bold text-lg text-primary mb-2">Estética Dental (Carillas)</h3>
        <p class="text-xs text-gray-500 mb-4">Diseño de sonrisa individual de porcelana ultrafina de Luxe.</p>
        
        <!-- Interactive before after container (Case 1) -->
        <div id="slider-container-1" class="relative overflow-hidden aspect-[4/3] rounded-xl cursor-ew-resize select-none border border-gray-200">
          <!-- Before (Background behind mask) -->
          <div class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600" alt="Teeth Antes" class="w-full h-full object-cover filter sepia grayscale contrast-125 saturate-50" referrerPolicy="no-referrer">
            <span class="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] uppercase tracking-wider font-extrabold z-10">Antes</span>
          </div>
          <!-- After (Overlaid with sliding width mask) -->
          <div id="slider-after-1" class="absolute inset-y-0 left-0 right-0 overflow-hidden w-1/2">
            <div class="absolute inset-y-0 left-0" style="width: 504px; max-width: 440px;">
              <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600" alt="Teeth Después" class="w-full h-full object-cover" referrerPolicy="no-referrer">
              <span class="absolute bottom-3 right-3 bg-turquoise/90 backdrop-blur-sm text-primary px-2 py-1 rounded text-[10px] uppercase tracking-wider font-extrabold z-10">Después</span>
            </div>
          </div>
          <!-- Sliding Divider Bar -->
          <div id="slider-divider-1" class="absolute inset-y-0 left-1/2 -ml-0.5 bg-turquoise w-1 flex items-center justify-center cursor-ew-resize">
            <div class="w-7 h-7 bg-primary text-turquoise border border-turquoise shadow-lg rounded-full flex items-center justify-center text-xs font-black">↔</div>
          </div>
        </div>
        
        <p class="text-xs text-gray-500 mt-4 leading-relaxed italic">"Simetría, blancura y vitalidad recuperadas en solo dos sesiones de Luxe Dental."</p>
      </div>

      <!-- Case 2: Implantología Avanzada -->
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <h3 class="font-display font-bold text-lg text-primary mb-2">Implantología (Implante de titanio)</h3>
        <p class="text-xs text-gray-500 mb-4">Reposición estética de pieza ausente con corona dental de circonio.</p>
        
        <!-- Interactive before after container (Case 2) -->
        <div id="slider-container-2" class="relative overflow-hidden aspect-[4/3] rounded-xl cursor-ew-resize select-none border border-gray-200">
          <!-- Before (Background with missing placeholder mask representation) -->
          <div class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1513415277900-a62401e50853?auto=format&fit=crop&q=80&w=600" alt="Implant Antes" class="w-full h-full object-cover filter saturate-50 blur-sm contrast-75 brightness-75" referrerPolicy="no-referrer">
            <span class="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] uppercase tracking-wider font-extrabold z-10">Antes</span>
          </div>
          <!-- After -->
          <div id="slider-after-2" class="absolute inset-y-0 left-0 right-0 overflow-hidden w-1/2">
            <div class="absolute inset-y-0 left-0" style="width: 504px; max-width: 440px;">
              <img src="https://images.unsplash.com/photo-1513415277900-a62401e50853?auto=format&fit=crop&q=80&w=600" alt="Implant Después" class="w-full h-full object-cover" referrerPolicy="no-referrer">
              <span class="absolute bottom-3 right-3 bg-turquoise/90 backdrop-blur-sm text-primary px-2 py-1 rounded text-[10px] uppercase tracking-wider font-extrabold z-10">Después</span>
            </div>
          </div>
          <!-- Sliding Divider Bar -->
          <div id="slider-divider-2" class="absolute inset-y-0 left-1/2 -ml-0.5 bg-turquoise w-1 flex items-center justify-center cursor-ew-resize">
            <div class="w-7 h-7 bg-primary text-turquoise border border-turquoise shadow-lg rounded-full flex items-center justify-center text-xs font-black">↔</div>
          </div>
        </div>
        
        <p class="text-xs text-gray-500 mt-4 leading-relaxed italic">"Estabilidad ósea perfecta y look idéntico al diente original."</p>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS SECTION -->
  <section id="testimonios" class="py-24 px-4 bg-white">
    <div class="max-w-7xl mx-auto text-center space-y-4 mb-20">
      <h2 class="font-display text-3xl md:text-4xl font-bold text-primary">Experiencias Reales</h2>
      <div class="w-16 h-1 bg-turquoise mx-auto rounded"></div>
      <p class="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
        Nuestros pacientes son nuestros mejores embajadores. Descubre cómo hemos transformado sus vidas a través de su sonrisa.
      </p>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Testimonial 1 -->
      <div class="bg-soft-gray p-8 rounded-2xl relative border border-gray-100 flex flex-col justify-between">
        <span class="absolute top-4 right-6 text-turquoise/20 font-serif text-8xl leading-none select-none">“</span>
        <div class="space-y-4">
          <!-- Star reviews -->
          <div class="flex text-yellow-400 gap-1">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p class="text-sm font-medium text-primary mt-2">María L.</p>
          <p class="text-[#43474d] text-sm leading-relaxed italic">
            "Nunca pensé que ir al dentista podría ser una experiencia relajante. El trato es impecable y el diseño de mi nueva sonrisa superó todas mis expectativas."
          </p>
        </div>
        <div class="flex items-center gap-3 pt-6 mt-6 border-t border-gray-200">
          <div class="w-10 h-10 rounded-full bg-turquoise/20 flex items-center justify-center text-sm font-bold text-primary uppercase">ML</div>
          <div>
            <p class="text-xs font-bold text-primary">Madrid</p>
            <p class="text-[10px] text-gray-400">Tratamiento: Estética Dental Pro</p>
          </div>
        </div>
      </div>

      <!-- Testimonial 2 -->
      <div class="bg-soft-gray p-8 rounded-2xl relative border border-gray-100 flex flex-col justify-between">
        <span class="absolute top-4 right-6 text-turquoise/20 font-serif text-8xl leading-none select-none">“</span>
        <div class="space-y-4">
          <div class="flex text-yellow-400 gap-1">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p class="text-sm font-medium text-primary mt-2">Carlos G.</p>
          <p class="text-[#43474d] text-sm leading-relaxed italic">
            "La ortodoncia invisible fue un proceso súper sencillo y pautado en todo momento. Valoro mucho la puntualidad y la tecnología que utilizan para mostrarte los avances."
          </p>
        </div>
        <div class="flex items-center gap-3 pt-6 mt-6 border-t border-gray-200">
          <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary uppercase">CG</div>
          <div>
            <p class="text-xs font-bold text-primary">Madrid</p>
            <p class="text-[10px] text-gray-400">Tratamiento: Ortodoncia Invisible</p>
          </div>
        </div>
      </div>

      <!-- Testimonial 3 -->
      <div class="bg-soft-gray p-8 rounded-2xl relative border border-gray-100 flex flex-col justify-between">
        <span class="absolute top-4 right-6 text-turquoise/20 font-serif text-8xl leading-none select-none">“</span>
        <div class="space-y-4">
          <div class="flex text-yellow-400 gap-1">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p class="text-sm font-medium text-primary mt-2">Ana V.</p>
          <p class="text-[#43474d] text-sm leading-relaxed italic">
            "Buscaba estética dental de alto nivel en Madrid y en Luxe la encontré. Las carillas son tan naturales que nadie nota que las llevo. Una inversión totalmente recomendable."
          </p>
        </div>
        <div class="flex items-center gap-3 pt-6 mt-6 border-t border-gray-200">
          <div class="w-10 h-10 rounded-full bg-turquoise/25 flex items-center justify-center text-sm font-bold text-primary uppercase">AV</div>
          <div>
            <p class="text-xs font-bold text-primary">Pozuelo</p>
            <p class="text-[10px] text-gray-400">Tratamiento: Carillas Porcelana</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BOOKING LEAD CAPTURE & CLINICAL INFO -->
  <section id="contacto" class="py-24 px-4 bg-[#0A2540] text-white">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      
      <!-- Left side Form Card -->
      <div class="lg:col-span-7 bg-white text-primary p-8 rounded-3xl border border-gray-100 shadow-2xl relative overflow-hidden">
        <div id="form-header" class="mb-6">
          <h3 class="font-display font-black text-2xl mb-1 text-[#0A2540]">Da el primer paso</h3>
          <p class="text-[#43474d] text-sm leading-relaxed">
            Déjanos tus datos de contacto y un especialista de Luxe se pondrá en contacto para pautar tu primera consulta de valoración sin compromiso.
          </p>
        </div>

        <!-- Success Message Block (Hidden initially) -->
        <div id="success-message" class="hidden my-8 p-6 bg-[#f2fafd] text-[#0A2540] border border-turquoise/30 rounded-2xl text-center space-y-4">
          <div class="w-12 h-12 bg-turquoise text-primary rounded-full flex items-center justify-center mx-auto text-xl font-bold">✔</div>
          <h4 class="font-display font-extrabold text-xl">¡Cita Solicitada con Éxito!</h4>
          <p class="text-sm text-gray-600">Hemos recibido tus datos de forma confidencial. Un asesor de Luxe Premium te agendará en la menor brevedad para comenzar con tu sonrisa ideal.</p>
        </div>

        <form id="booking-form" class="space-y-5">
          <div>
            <label class="block text-xs font-bold tracking-wider text-[#0A2540] uppercase mb-2">Nombre Completo</label>
            <input type="text" id="input-name" required placeholder="Ej. Javier Torres" class="w-full bg-[#F6F9FC] border-b-2 border-transparent focus:border-turquoise focus:outline-none p-3.5 rounded text-sm transition-all" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-bold tracking-wider text-[#0A2540] uppercase mb-2">Teléfono</label>
              <input type="tel" id="input-phone" required placeholder="+34 600 000 000" class="w-full bg-[#F6F9FC] border-b-2 border-transparent focus:border-turquoise focus:outline-none p-3.5 rounded text-sm transition-all" />
            </div>
            <div>
              <label class="block text-xs font-bold tracking-wider text-[#0A2540] uppercase mb-2">Servicio de Interés</label>
              <select id="input-service" class="w-full bg-[#F6F9FC] border-b-2 border-transparent focus:border-turquoise focus:outline-none p-3.5 rounded text-sm transition-all text-gray-500">
                <option value="">Selecciona un tratamiento...</option>
                <option value="Estética Dental Pro">Estética Dental Pro</option>
                <option value="Ortodoncia Invisible">Ortodoncia Invisible (Invisalign®)</option>
                <option value="Implantología Avanzada">Implantología Avanzada</option>
                <option value="Consulta Dental General">Consulta General / Limpieza</option>
              </select>
            </div>
          </div>

          <div class="pt-2">
            <button type="submit" class="w-full bg-primary hover:bg-[#051424] text-white font-bold py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest text-xs">
              Solicitar Cita Ahora
            </button>
          </div>
          <p class="text-[10px] text-gray-400 text-center leading-normal">
            Tus datos están protegidos en base a la RGPD. No compartimos información comercial con terceros.
          </p>
        </form>
      </div>

      <!-- Right Clinic Info & Custom Styled Map -->
      <div class="lg:col-span-5 space-y-8 flex flex-col justify-between">
        <div>
          <h3 class="font-display font-extrabold text-2xl border-b border-white/10 pb-4 mb-6">Encuéntranos</h3>
          
          <ul class="space-y-6">
            <li class="flex items-start gap-4">
              <div class="p-3 bg-white/5 rounded-xl border border-white/10 text-turquoise">
                ${SVG_ICONS.mapPin}
              </div>
              <div>
                <p class="text-xs text-gray-400 tracking-wider font-extrabold uppercase mb-1">DIRECCIÓN</p>
                <p class="text-sm font-semibold max-w-sm">Paseo de la Castellana, 15 - 28046 Madrid, España</p>
              </div>
            </li>
            
            <li class="flex items-start gap-4">
              <div class="p-3 bg-white/5 rounded-xl border border-white/10 text-turquoise">
                ${SVG_ICONS.clock}
              </div>
              <div>
                <p class="text-xs text-gray-400 tracking-wider font-extrabold uppercase mb-1">HORARIO DE ATENCIÓN</p>
                <p class="text-sm font-semibold">Lunes a Viernes: 09:00 - 20:00 (Con cita previa)</p>
              </div>
            </li>

            <li class="flex items-start gap-4">
              <div class="p-3 bg-white/5 rounded-xl border border-white/10 text-turquoise">
                ${SVG_ICONS.mail}
              </div>
              <div>
                <p class="text-xs text-gray-400 tracking-wider font-extrabold uppercase mb-1">EMAIL DE CONTACTO</p>
                <p class="text-sm font-semibold text-turquoise hover:underline">recepcion@luxedental.com</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Styled Simulated Map Component -->
        <div class="bg-[#0c2f51] p-4 rounded-2xl border border-white/10 flex flex-col space-y-4">
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-300">📍 Vista del Plano de Acceso</span>
            <span class="bg-turquoise/20 text-turquoise text-[9px] uppercase font-black px-2 py-0.5 rounded">Zona Castellana</span>
          </div>
          <!-- Styled abstract SVG street outline representing Madrid city block with a target pin -->
          <div class="h-44 bg-[#051424] rounded-xl relative overflow-hidden flex items-center justify-center border border-white/5 shadow-inner">
            <svg class="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffff" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              <path d="M-50,70 L250,70 L400,250 M120,-10 L120,300 M50,-10 L300,300" stroke="#00D4FF" stroke-width="2.5" fill="none"/>
              <path d="M-10,130 L450,130" stroke="#00D4FF" stroke-width="1" fill="none" />
              <circle cx="120" cy="130" r="45" fill="#00D4FF" fill-opacity="0.08" stroke="#00D4FF" stroke-width="0.5" stroke-dasharray="2,2"/>
            </svg>
            
            <!-- Pulse Marker for clinic location -->
            <div class="absolute" style="left: 120px; top: 130px; transform: translate(-50%, -50%);">
              <span class="absolute inline-flex h-12 w-12 rounded-full bg-turquoise opacity-40 animate-ping"></span>
              <div class="relative bg-primary text-turquoise p-2 rounded-lg border-2 border-turquoise shadow-2xl flex items-center gap-1 text-[11px] font-black tracking-wide">
                ${SVG_ICONS.mapPin}
                Luxe Dental
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LUXURY STYLE FOOTER -->
  <footer class="bg-dark-blue text-white py-16 px-4 border-t border-white/5">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <!-- Info Column -->
      <div class="space-y-4">
        <a href="#" class="flex flex-col">
          <span class="font-display font-medium text-2xl tracking-widest text-[#00D4FF]">LUXE DENTAL</span>
          <span class="text-[10px] tracking-[0.25em] text-gray-400 font-bold uppercase mt-1">Clínica de Especialistas</span>
        </a>
        <p class="text-xs text-gray-400 leading-relaxed max-w-xs">
          Redefiniendo la experiencia del cuidado bucal a través del diseño de vanguardia, tecnología de última generación suiza y atención ultra personalizada para tu bienestar.
        </p>
      </div>

      <!-- Quick links -->
      <div>
        <h4 class="font-display font-extrabold text-xs tracking-wider uppercase mb-4 text-turquoise">Clínica</h4>
        <ul class="space-y-2 text-xs text-gray-400">
          <li><a href="#servicios" class="hover:text-white transition-colors">Servicios</a></li>
          <li><a href="#tecnologia" class="hover:text-white transition-colors">Tecnología Especializada</a></li>
          <li><a href="#casos" class="hover:text-white transition-colors">Casos Reales</a></li>
          <li><a href="#testimonios" class="hover:text-white transition-colors">Experiencias</a></li>
        </ul>
      </div>

      <!-- Legal links -->
      <div>
        <h4 class="font-display font-extrabold text-xs tracking-wider uppercase mb-4 text-turquoise">Leyes & Privacidad</h4>
        <ul class="space-y-2 text-xs text-gray-400">
          <li><a href="#" class="hover:text-white transition-colors">Aviso de Privacidad</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Nota Legal</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Uso de Cookies</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Condiciones Generales</a></li>
        </ul>
      </div>

      <!-- Sede Central -->
      <div>
        <h4 class="font-display font-extrabold text-xs tracking-wider uppercase mb-4 text-turquoise">Soporte</h4>
        <p class="text-xs text-gray-400 leading-relaxed mb-4">
          ¿Deseas una consulta inmediata o una segunda opinión experta? Escríbenos o visítanos. Teléfono con soporte 24/7 de urgencias Luxe VIP.
        </p>
        <span class="text-xs font-bold text-white block">Tlf urgencias: +34 900 000 000</span>
      </div>
    </div>

    <div class="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 text-center text-xs text-gray-500">
      <p>&copy; 2026 Luxe Dental Clinic Premium. Todos los derechos reservados.</p>
    </div>
  </footer>

  <!-- DYNAMIC INTERACTION JAVASCRIPT FOR DEPLOYMENT -->
  <script>
    // Before & after slider interaction #1
    const sContainer1 = document.getElementById('slider-container-1');
    const sAfter1 = document.getElementById('slider-after-1');
    const sDivider1 = document.getElementById('slider-divider-1');
    
    // Joint movement calculations helper
    function getPercent(clientX, container) {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      let percent = (x / rect.width) * 100;
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      return percent;
    }

    function updateSlider1(clientX) {
      const pct = getPercent(clientX, sContainer1);
      sAfter1.style.width = pct + '%';
      sDivider1.style.left = pct + '%';
    }

    let active1 = false;
    sContainer1.addEventListener('mousedown', (e) => { active1 = true; updateSlider1(e.clientX); });
    window.addEventListener('mouseup', () => active1 = false);
    sContainer1.addEventListener('mousemove', (e) => { if (active1) updateSlider1(e.clientX); });

    sContainer1.addEventListener('touchstart', (e) => { active1 = true; updateSlider1(e.touches[0].clientX); });
    window.addEventListener('touchend', () => active1 = false);
    sContainer1.addEventListener('touchmove', (e) => { if (active1) updateSlider1(e.touches[0].clientX); });

    // Slider #2
    const sContainer2 = document.getElementById('slider-container-2');
    const sAfter2 = document.getElementById('slider-after-2');
    const sDivider2 = document.getElementById('slider-divider-2');

    function updateSlider2(clientX) {
      const pct = getPercent(clientX, sContainer2);
      sAfter2.style.width = pct + '%';
      sDivider2.style.left = pct + '%';
    }

    let active2 = false;
    sContainer2.addEventListener('mousedown', (e) => { active2 = true; updateSlider2(e.clientX); });
    window.addEventListener('mouseup', () => active2 = false);
    sContainer2.addEventListener('mousemove', (e) => { if (active2) updateSlider2(e.clientX); });

    sContainer2.addEventListener('touchstart', (e) => { active2 = true; updateSlider2(e.touches[0].clientX); });
    window.addEventListener('touchend', () => active2 = false);
    sContainer2.addEventListener('touchmove', (e) => { if (active2) updateSlider2(e.touches[0].clientX); });


    // Mobile navigation drawer toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');

    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('translate-x-full');
    });

    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('translate-x-full');
    });

    // Close drawer on link click
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('translate-x-full');
      });
    });

    // Handle interactive form submission
    const bookingForm = document.getElementById('booking-form');
    const successMsg = document.getElementById('success-message');
    const formHeader = document.getElementById('form-header');

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameVal = document.getElementById('input-name').value;
      const phoneVal = document.getElementById('input-phone').value;
      const serviceVal = document.getElementById('input-service').value;

      // Save appointment in LocalStorage for demo purposes
      const appts = JSON.parse(localStorage.getItem('luxe_dental_booked') || '[]');
      const newAppt = {
        id: 'appt-' + Date.now(),
        name: nameVal,
        phone: phoneVal,
        service: serviceVal || 'Consulta de Valoración',
        date: new Date().toLocaleDateString('es-ES'),
        status: 'Pendiente de Confirmar'
      };
      
      appts.unshift(newAppt);
      localStorage.setItem('luxe_dental_booked', JSON.stringify(appts));

      // Show success, hide form fields
      bookingForm.classList.add('hidden');
      formHeader.classList.add('hidden');
      successMsg.classList.remove('hidden');

      setTimeout(() => {
        bookingForm.reset();
        bookingForm.classList.remove('hidden');
        formHeader.classList.remove('hidden');
        successMsg.classList.add('hidden');
      }, 5000);
    });
  </script>

</body>
</html>`;

    // Trigger downloading of the single self-contained HTML document
    setTimeout(() => {
      const blob = new Blob([generatedHtml], { type: "text/html;charset=utf-8" });
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = "luxe-dental-demo.html";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadProgress(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-stretch">
      
      {/* 🎁 FLOATING DEVELOPER DEMO DOWNLOAD RIBBON (Strictly styled, helpful preview and export tool) */}
      <div className="bg-gradient-to-r from-primary via-dark-blue to-primary text-white border-b border-turquoise/20 sticky top-0 z-[100] px-4 py-3 flex flex-col md:flex-row justify-between items-center shadow-lg text-xs gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-turquoise rounded-full animate-ping"></div>
          <div>
            <span className="font-extrabold text-turquoise uppercase tracking-wider">HERRAMIENTA DEMO COPiABLE:</span>
            <span className="text-gray-300 ml-1.5 font-medium">Luxe Dental Clinic. Descarga el archivo HTML y úsalo en cualquier PC sin hosting.</span>
          </div>
        </div>

        <button 
          onClick={handleDownloadDemo}
          disabled={downloadProgress}
          className="bg-turquoise hover:bg-turquoise/90 text-primary font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-md active:scale-95 transition-all text-[11px] uppercase tracking-wide cursor-pointer disabled:opacity-50"
        >
          {downloadProgress ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
              Exportando HTML...
            </>
          ) : (
            <>
              <Download size={14} className="stroke-[3]" />
              Descargar Demo HTML
            </>
          )}
        </button>
      </div>

      {/* TOP DECORATIVE CONTACT RIBBON */}
      <div className="bg-primary text-white text-[11px] text-center py-2 px-4 flex justify-between items-center sm:px-8 border-b border-white/10 select-none">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-turquoise inline-block"></span> 
          CLÍNICA DENTAL PREMIUM — MADRID
        </span>
        <span className="hidden md:inline text-white/70">Atención Exclusiva en Castellana 15</span>
        <a href="tel:+34900000000" className="hover:text-turquoise transition-colors flex items-center gap-1 font-semibold text-xs text-turquoise">
          <Phone size={12} />
          <span>+34 900 000 000</span>
        </a>
      </div>

      {/* MAIN NAVIGATION BAR */}
      <header className="bg-white/80 sticky top-[49.5px] z-50 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex flex-col">
            <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-primary">LUXE DENTAL</span>
            <span className="text-[9px] tracking-[0.25em] text-turquoise uppercase font-extrabold -mt-1">Arte & Odontología</span>
          </a>

          {/* Menu items (Desktop) */}
          <nav className="hidden md:flex space-x-8 items-center font-medium">
            <a href="#servicios" className="text-xs uppercase tracking-wider text-primary/80 hover:text-primary transition-colors font-bold">Servicios</a>
            <a href="#tecnologia" className="text-xs uppercase tracking-wider text-primary/80 hover:text-primary transition-colors font-bold">Tecnología</a>
            <a href="#casos" className="text-xs uppercase tracking-wider text-primary/80 hover:text-primary transition-colors font-bold">Casos</a>
            <a href="#testimonios" class="text-xs uppercase tracking-wider text-primary/80 hover:text-primary transition-colors font-bold">Testimonios</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contacto" className="border border-primary text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold py-2.5 px-5 rounded-md shadow-sm uppercase tracking-wider">
              Reservar Cita
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#f9f9f9] pt-12 pb-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div id="hero-layout" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-turquoise/10 border border-turquoise/20 text-primary text-[11px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-turquoise animate-pulse"></span>
              CLÍNICA DENTAL PREMIUM
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-[1.1] tracking-tight">
              Tu mejor sonrisa comienza <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-turquoise select-none">aquí.</span>
            </h1>
            
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
              Odontología de vanguardia con un trato personalizado y exclusivo. Descubre una experiencia única donde la tecnología 3D y el bienestar se encuentran para diseñar tu bienestar. Usamos los mejores equipamientos suizos.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a href="#contacto" className="bg-primary hover:bg-primary/95 text-white font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
                Reserva tu cita hoy
                <ArrowRight size={16} />
              </a>
              <a href="#servicios" className="border border-gray-300 hover:border-primary text-primary font-bold px-8 py-4 rounded-lg transition-all text-center text-sm uppercase tracking-wider">
                Descubrir tratamientos
              </a>
            </div>
          </div>

          {/* Right Image Feature with custom floating elements */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
            <div className="relative w-full max-w-md bg-white p-3 rounded-2xl shadow-xl border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800" 
                alt="Sonrisa Perfecta Luxe Dental" 
                className="rounded-xl w-full object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 -left-6 bg-white p-4 rounded-xl shadow-2xl border border-gray-50 flex items-center gap-3 animate-bounce shadow-primary/5 select-none">
                <div className="p-2.5 bg-turquoise/15 rounded-lg text-turquoise">
                  <Smile size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">PACIENTES FELICES</p>
                  <p className="font-display font-extrabold text-lg text-primary">+10,000 Sonrisas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE QUALITY PILLARS */}
      <section className="bg-white border-b border-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] sm:text-xs tracking-[0.25em] font-bold text-gray-400 uppercase mb-8 select-none">NUESTROS PILARES DE EXCELENCIA</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {/* Pillar 1 */}
            <div className="flex items-center gap-4 text-left max-w-xs">
              <div className="p-3 bg-soft-gray text-primary rounded-xl border border-gray-200">
                <Layers size={22} className="text-primary" />
              </div>
              <div>
                <h4 className="font-display font-bold text-primary text-sm">Tecnología 3D</h4>
                <p className="text-gray-500 text-xs font-medium">Simulación digital exacta de tu sonrisa</p>
              </div>
            </div>
            {/* Pillar 2 */}
            <div className="flex items-center gap-4 text-left max-w-xs">
              <div className="p-3 bg-[#f2fafd] text-primary rounded-xl border border-blue-100">
                <Sparkles size={22} className="text-primary" />
              </div>
              <div>
                <h4 className="font-display font-bold text-primary text-sm">Especialistas Certificados</h4>
                <p className="text-gray-500 text-xs font-medium">Odontólogos del circuito internacional</p>
              </div>
            </div>
            {/* Pillar 3 */}
            <div className="flex items-center gap-4 text-left max-w-xs">
              <div className="p-3 bg-soft-gray text-primary rounded-xl border border-gray-200">
                <Phone size={22} className="text-primary" />
              </div>
              <div>
                <h4 className="font-display font-bold text-primary text-sm">Atención VIP</h4>
                <p className="text-gray-500 text-xs font-medium">Instalaciones relajantes sin dolor ni ruidos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (Arte y Ciencia) */}
      <section id="servicios" className="py-24 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto text-center space-y-4 mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">Arte y Ciencia para tu Sonrisa</h2>
          <div className="w-16 h-1 bg-turquoise mx-auto rounded"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Nuestros tratamientos de autor están diseñados para ofrecer resultados estéticos impecables con la máxima preservación de tu salud e inmunología oral.
          </p>
        </div>

        {/* Treatment cards list */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-turquoise/30 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-xl w-fit group-hover:bg-[#f2fafd] group-hover:text-turquoise transition-all">
                <Layers size={22} />
              </div>
              <h3 className="font-display text-xl font-bold text-primary">Implantología Avanzada</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Soluciones definitivas con materiales biocompatibles de alta simulación para recuperar la funcionalidad y estética total de tu boca. Recobra la seguridad al masticar.
              </p>
            </div>
            <a href="#contacto" className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-turquoise transition-all uppercase tracking-wider mt-8">
              Saber más
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Card 2 (Special Featured Card - Dark Midnight Blue) */}
          <div className="bg-[#0A2540] text-white rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between border-2 border-turquoise/30">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-turquoise/10 rounded-full blur-2xl"></div>
            <div className="space-y-4 relative z-10">
              <div className="p-3 bg-white/10 text-turquoise rounded-xl w-fit">
                <Sparkles size={22} />
              </div>
              <div className="inline-block bg-turquoise/20 text-turquoise text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded select-none">
                El más solicitado
              </div>
              <h3 className="font-display text-xl font-bold">Estética Dental Pro</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Diseño de sonrisa digital, carillas cerámicas ultrafinas de silicato y blanqueamiento clínico sin sensibilidad para un resultado deslumbrante, natural y de alta costura.
              </p>
            </div>
            <a href="#contacto" className="inline-flex items-center gap-2 text-xs font-bold text-turquoise transition-all uppercase tracking-wider mt-8 relative z-10">
              Saber más
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-turquoise/30 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-xl w-fit group-hover:bg-[#f2fafd] group-hover:text-turquoise transition-all">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-display text-xl font-bold text-primary">Ortodoncia Invisible</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Alineadores transparentes personalizados (Invisalign®). La forma inalámbrica, ultra discreta y cómoda de conseguir la alineación perfecta de tus dientes de forma imperceptible.
              </p>
            </div>
            <a href="#contacto" className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-turquoise transition-all uppercase tracking-wider mt-8">
              Saber más
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* SWISS TECHNOLOGY & CABINET LAB */}
      <section id="tecnologia" className="py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left image block */}
          <div className="relative flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md bg-soft-gray p-4 rounded-3xl border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" 
                alt="Gabinete de Tecnología Dental" 
                className="rounded-2xl w-full object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              
              {/* Stats overlays */}
              <div className="absolute -top-4 -right-4 bg-primary text-white py-3 px-5 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center">
                <span className="font-display text-xl font-extrabold text-turquoise">100%</span>
                <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">Flujo Digital</span>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white text-primary py-3 px-5 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center">
                <span className="font-display text-base font-extrabold text-[#0a2540]">3D Escáner</span>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Intraoral de Alta Gama</span>
              </div>
            </div>
          </div>

          {/* Right texts info */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-turquoise tracking-widest uppercase font-bold">
              <Sparkles size={14} /> INNOVACIÓN PERMANENTE
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary leading-tight">
              Precisión suiza en cada diagnóstico
            </h2>
            <p className="text-gray-600 leading-relaxed">
              En Luxe Dental hemos eliminado la incertidumbre dental tradicional. Nuestras instalaciones del centro de Madrid están equipadas con la última tecnología de imagen 3D y flujos de trabajo completamente digitales que simulan tu modelado facial.
            </p>

            <ul className="space-y-4 pt-2">
              <li className="flex items-start gap-3">
                <div className="p-1 bg-turquoise/20 text-primary rounded-full mt-1">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div>
                  <p className="font-bold text-sm text-primary">Diagnóstico de ultra baja dosis</p>
                  <p className="text-xs text-gray-500 font-medium">CBCT de última generación que reduce la exposición cuidando tu salud celular.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-turquoise/20 text-primary rounded-full mt-1">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div>
                  <p className="font-bold text-sm text-primary">Impresiones digitales sin dolor ni pastas</p>
                  <p className="text-xs text-gray-500 font-medium font-medium">Escáner intraoral 3D de alta velocidad, cómodo, inmediato y limpio.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-turquoise/20 text-primary rounded-full mt-1">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div>
                  <p className="font-bold text-sm text-primary">Simulación virtual previa al tratamiento</p>
                  <p className="text-xs text-gray-500 font-medium">Visualiza en tres dimensiones el resultado final de tu sonrisa antes de comenzar.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CASOS REALES: BEFORE & AFTER CARDS SLIDERS */}
      <section id="casos" className="py-24 px-4 bg-[#f3f3f4]/70">
        <div className="max-w-7xl mx-auto text-center space-y-4 mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-primary/70">CASOS REALES</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">Nuestras Transformaciones</h2>
          <div className="w-16 h-1 bg-turquoise mx-auto rounded"></div>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Pasa el ratón o desliza la línea del control interactivo para ver los cambios logrados en nuestra consulta de Madrid.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Case 1: Estética carillas */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-primary mb-1">Estética Dental (Carillas)</h3>
              <p className="text-xs text-gray-500 mb-4 font-medium">Diseño de sonrisa individual de porcelana ultrafina de Luxe.</p>
            </div>
            
            {/* Interactive Slider React #1 */}
            <div 
              ref={sliderRef1}
              onMouseDown={onMouseDown1}
              onTouchStart={onMouseDown1}
              className="relative overflow-hidden aspect-[4/3] rounded-xl cursor-ew-resize select-none border border-gray-200"
            >
              {/* Before side (Background / Full view with sepia effect) */}
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600" 
                  alt="Tratamiento carillas antes" 
                  className="w-full h-full object-cover filter sepia grayscale contrast-125 saturate-50"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] uppercase tracking-wider font-extrabold z-10">Antes</span>
              </div>
              
              {/* After side (masked width container) */}
              <div 
                className="absolute inset-y-0 left-0 right-0 overflow-hidden"
                style={{ width: `${sliderPos1}%` }}
              >
                <div className="absolute inset-y-0 left-0" style={{ width: sliderRef1.current ? sliderRef1.current.getBoundingClientRect().width : "440px" }}>
                  <img 
                    src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600" 
                    alt="Tratamiento carillas después" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 right-3 bg-turquoise/90 backdrop-blur-sm text-primary px-2 py-1 rounded text-[10px] uppercase tracking-wider font-extrabold z-10">Después</span>
                </div>
              </div>

              {/* Slider boundary bar */}
              <div 
                className="absolute inset-y-0 -ml-0.5 bg-turquoise w-1 flex items-center justify-center cursor-ew-resize"
                style={{ left: `${sliderPos1}%` }}
              >
                <div className="w-7 h-7 bg-primary text-turquoise border border-turquoise shadow-lg rounded-full flex items-center justify-center text-xs font-black">↔</div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 leading-relaxed italic font-medium">"Simetría, blancura y vitalidad recuperadas en solo dos sesiones de Luxe Dental."</p>
          </div>

          {/* Case 2: Implantología zirconio */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-primary mb-1">Implantología (Implante titanio)</h3>
              <p className="text-xs text-gray-500 mb-4 font-medium">Reposición estética de pieza ausente con corona dental de circonio.</p>
            </div>
            
            {/* Interactive Slider React #2 */}
            <div 
              ref={sliderRef2}
              onMouseDown={onMouseDown2}
              onTouchStart={onMouseDown2}
              className="relative overflow-hidden aspect-[4/3] rounded-xl cursor-ew-resize select-none border border-gray-200"
            >
              {/* Before */}
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1513415277900-a62401e50853?auto=format&fit=crop&q=80&w=600" 
                  alt="Implante antes" 
                  className="w-full h-full object-cover filter saturate-50 blur-sm contrast-75 brightness-75"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] uppercase tracking-wider font-extrabold z-10">Antes</span>
              </div>
              
              {/* After */}
              <div 
                className="absolute inset-y-0 left-0 right-0 overflow-hidden"
                style={{ width: `${sliderPos2}%` }}
              >
                <div className="absolute inset-y-0 left-0" style={{ width: sliderRef2.current ? sliderRef2.current.getBoundingClientRect().width : "440px" }}>
                  <img 
                    src="https://images.unsplash.com/photo-1513415277900-a62401e50853?auto=format&fit=crop&q=80&w=600" 
                    alt="Implante después" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 right-3 bg-turquoise/90 backdrop-blur-sm text-primary px-2 py-1 rounded text-[10px] uppercase tracking-wider font-extrabold z-10">Después</span>
                </div>
              </div>

              {/* Slider control line */}
              <div 
                className="absolute inset-y-0 -ml-0.5 bg-turquoise w-1 flex items-center justify-center cursor-ew-resize"
                style={{ left: `${sliderPos2}%` }}
              >
                <div className="w-7 h-7 bg-primary text-turquoise border border-turquoise shadow-lg rounded-full flex items-center justify-center text-xs font-black">↔</div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 leading-relaxed italic font-medium">"Estabilidad ósea perfecta y look natural idéntico al diente biológico."</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (Experiencias Reales) */}
      <section id="testimonios" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-4 mb-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">Experiencias Reales</h2>
          <div className="w-16 h-1 bg-turquoise mx-auto rounded"></div>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Nuestros pacientes son nuestros mejores embajadores de marca. Descubre cómo hemos transformado su bienestar.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="bg-[#f3f3f4]/50 p-8 rounded-2xl relative border border-gray-100 flex flex-col justify-between">
            <span className="absolute top-4 right-6 text-turquoise/10 font-serif text-8xl leading-none select-none">“</span>
            <div className="space-y-4">
              <div className="flex text-yellow-400 gap-1 text-xs">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-sm font-semibold text-primary mt-2">María L.</p>
              <p className="text-[#43474d] text-sm leading-relaxed italic">
                "Nunca pensé que ir al dentista podría ser una experiencia relajante. El trato es impecable y el diseño de mi nueva sonrisa superó todas mis expectativas."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-200">
              <div className="w-10 h-10 rounded-full bg-turquoise/15 flex items-center justify-center text-xs font-black text-primary select-none">ML</div>
              <div>
                <p className="text-xs font-bold text-primary">Madrid Central</p>
                <p className="text-[10px] text-gray-400">Tratamiento: Estética Dental Pro</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-[#f3f3f4]/50 p-8 rounded-2xl relative border border-gray-100 flex flex-col justify-between">
            <span className="absolute top-4 right-6 text-turquoise/10 font-serif text-8xl leading-none select-none">“</span>
            <div className="space-y-4">
              <div className="flex text-yellow-400 gap-1 text-xs">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-sm font-semibold text-primary mt-2">Carlos G.</p>
              <p className="text-[#43474d] text-sm leading-relaxed italic">
                "La ortodoncia invisible fue un proceso súper sencillo y pautado en todo momento. Valoro mucho la puntualidad y la tecnología que utilizan para mostrarte los avances."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-200">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-black text-primary select-none">CG</div>
              <div>
                <p className="text-xs font-bold text-primary">Pozuelo</p>
                <p className="text-[10px] text-gray-400">Tratamiento: Ortodoncia Invisible</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-[#f3f3f4]/50 p-8 rounded-2xl relative border border-gray-100 flex flex-col justify-between">
            <span className="absolute top-4 right-6 text-turquoise/10 font-serif text-8xl leading-none select-none">“</span>
            <div className="space-y-4">
              <div className="flex text-yellow-400 gap-1 text-xs">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-sm font-semibold text-primary mt-2">Ana V.</p>
              <p className="text-[#43474d] text-sm leading-relaxed italic">
                "Buscaba estética dental de alto nivel en Madrid y en Luxe la encontré. Las carillas son tan naturales que nadie nota que las llevo. Una inversión totalmente recomendable."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-200">
              <div className="w-10 h-10 rounded-full bg-turquoise/20 flex items-center justify-center text-xs font-black text-primary select-none">AV</div>
              <div>
                <p className="text-xs font-bold text-primary">Madrid Centro</p>
                <p className="text-[10px] text-gray-400">Tratamiento: Carillas Porcelana</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE APPOINTMENT & CONTACT INFO */}
      <section id="contacto" className="py-24 px-4 bg-[#0A2540] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Form Card with live state indicator */}
          <div className="lg:col-span-7 bg-white text-primary p-8 rounded-3xl border border-gray-100 shadow-2xl relative overflow-hidden">
            
            {/* Header Form */}
            <div className="mb-6">
              <h3 className="font-display font-black text-2xl mb-1 text-[#0A2540]">Da el primer paso</h3>
              <p className="text-[#43474d] text-sm leading-relaxed">
                Déjanos tus datos de contacto y un especialista de Luxe se pondrá en contacto para planificar tu primera consulta premium de valoración sin compromiso.
              </p>
            </div>

            {/* Live Success Banner */}
            {isSubmitted && (
              <div className="my-6 p-5 bg-[#f2fafd] text-[#0A2540] border border-turquoise/20 rounded-2xl text-center space-y-3 relative z-10 transition-all duration-300">
                <div className="w-10 h-10 bg-turquoise text-primary rounded-full flex items-center justify-center mx-auto font-bold">✔</div>
                <h4 className="font-display font-extrabold text-base">¡Cita Solicitada con Éxito!</h4>
                <p className="text-xs text-gray-600">Hemos guardado tu solicitud en la memoria del navegador. Nos comunicaremos contigo de inmediato.</p>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
              <div>
                <label className="block text-[10px] font-bold tracking-wider text-[#0A2540] uppercase mb-1.5">Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. Javier Torres" 
                  className="w-full bg-[#F6F9FC] border-b-2 border-transparent focus:border-turquoise focus:outline-none p-3.5 rounded text-sm transition-all text-[#1a1c1c] font-medium" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-[#0A2540] uppercase mb-1.5">Teléfono</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+34 600 000 000" 
                    className="w-full bg-[#F6F9FC] border-b-2 border-transparent focus:border-turquoise focus:outline-none p-3.5 rounded text-sm transition-all text-[#1a1c1c] font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-[#0A2540] uppercase mb-1.5">Servicio de Interés</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#F6F9FC] border-b-2 border-transparent focus:border-turquoise focus:outline-none p-3.5 rounded text-sm transition-all text-[#1a1c1c] font-medium"
                  >
                    <option value="">Selecciona un tratamiento...</option>
                    <option value="Estética Dental Pro">Estética Dental Pro</option>
                    <option value="Ortodoncia Invisible">Ortodoncia Invisible (Invisalign®)</option>
                    <option value="Implantología Avanzada">Implantología Avanzada</option>
                    <option value="Consulta Dental General">Consulta General / Limpieza</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full cursor-pointer bg-primary hover:bg-[#051424] text-white font-bold py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest text-[11px]">
                  Solicitar Cita Ahora
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center leading-normal select-none">
                Tus datos están protegidos en base a la ley de privacidad RGPD. No compartimos tus datos.
              </p>
            </form>

            <div className="w-full h-px bg-gray-100 my-6"></div>

            {/* LIVE DATA PREVIEW BOX FOR DENTIST AGENT */}
            <div>
              <p className="text-xs font-bold text-primary mb-3 flex items-center gap-1">
                <Activity size={14} className="text-turquoise animate-pulse" />
                Control de Consultas Solicitadas (Simulación Local):
              </p>
              {appointments.length === 0 ? (
                <p className="text-[11px] text-gray-400 italic">No hay citas registradas en el navegador.</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {appointments.map((appt) => (
                    <div key={appt.id} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs">
                      <div>
                        <p className="font-bold text-[#0a2540]">{appt.name}</p>
                        <p className="text-[10px] text-gray-450">{appt.service} • {appt.phone}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          {appt.status}
                        </span>
                        <button 
                          onClick={() => deleteAppointment(appt.id)}
                          className="text-red-500 hover:text-red-700 font-bold transition-colors cursor-pointer text-[10px]"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Clinic Info with Styled street Map block */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-extrabold text-2xl border-b border-white/10 pb-4 mb-6">Encuéntranos</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-turquoise">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 tracking-wider font-extrabold uppercase mb-1">DIRECCIÓN</p>
                    <p className="text-sm font-semibold max-w-sm">Paseo de la Castellana, 15 - 28046 Madrid, España</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-turquoise">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 tracking-wider font-extrabold uppercase mb-1">HORARIO DE ATENCIÓN</p>
                    <p className="text-sm font-semibold">Lunes a Viernes: 09:00 - 20:00 (Con cita previa)</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-turquoise">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 tracking-wider font-extrabold uppercase mb-1">EMAIL DE CONTACTO</p>
                    <p className="text-sm font-semibold text-turquoise hover:underline">recepcion@luxedental.com</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Illustration vector */}
            <div className="bg-[#0c2f51] p-4 rounded-2xl border border-white/10 flex flex-col space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300 font-medium">📍 Plano de Acceso Clínico</span>
                <span className="bg-turquoise/20 text-turquoise text-[9px] uppercase font-bold px-2 py-0.5 rounded">Barrio de Salamanca</span>
              </div>
              <div className="h-44 bg-[#051424] rounded-xl relative overflow-hidden flex items-center justify-center border border-white/5 shadow-inner">
                <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <defs>
                    <pattern id="react-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#react-grid-pattern)" />
                  <path d="M-50,70 L250,70 L400,250 M120,-10 L120,300 M50,-10 L300,300" stroke="#00D4FF" strokeWidth="2.5" fill="none"/>
                  <path d="M-10,130 L450,130" stroke="#00D4FF" strokeWidth="1" fill="none" />
                  <circle cx="120" cy="130" r="45" fill="#00D4FF" fillOpacity="0.08" stroke="#00D4FF" strokeWidth="0.5" strokeDasharray="2,2"/>
                </svg>
                
                <div className="absolute" style={{ left: "120px", top: "130px", transform: "translate(-50%, -50%)" }}>
                  <span className="absolute inline-flex h-12 w-12 rounded-full bg-turquoise opacity-40 animate-ping"></span>
                  <div className="relative bg-[#0A2540] text-turquoise p-2 rounded-lg border-2 border-turquoise shadow-2xl flex items-center gap-1 text-[11px] font-black tracking-wide">
                    <MapPin size={12} />
                    Luxe Dental
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LUXURY FOOTER */}
      <footer className="bg-dark-blue text-white py-16 px-4 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Info */}
          <div className="space-y-4">
            <a href="#" className="flex flex-col">
              <span className="font-display font-bold text-2xl tracking-widest text-[#00D4FF]">LUXE DENTAL</span>
              <span className="text-[10px] tracking-[0.25em] text-gray-400 font-bold uppercase mt-1">Clínica de Especialistas</span>
            </a>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              Redefiniendo la experiencia del cuidado bucal a través del diseño de vanguardia, tecnología de última generación suiza y atención VIP premium para tu bienestar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-extrabold text-xs tracking-wider uppercase mb-4 text-turquoise">Clínica</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios Exclusivos</a></li>
              <li><a href="#tecnologia" className="hover:text-white transition-colors">Tecnología Diagnóstica</a></li>
              <li><a href="#casos" className="hover:text-white transition-colors">Casos de Éxito</a></li>
              <li><a href="#testimonios" className="hover:text-white transition-colors">Testimonios</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-extrabold text-xs tracking-wider uppercase mb-4 text-turquoise">Leyes & Privacidad</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nota Legal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Uso de Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">RGPD Normativa</a></li>
            </ul>
          </div>

          {/* Sede */}
          <div>
            <h4 className="font-display font-extrabold text-xs tracking-wider uppercase mb-4 text-turquoise">Soporte</h4>
            <p class="text-xs text-gray-400 leading-relaxed mb-4">
              ¿Deseas una consulta inmediata o una segunda opinión experta? Visítanos. Teléfono con soporte 24/7 de urgencias Luxe VIP.
            </p>
            <span class="text-xs font-bold text-white block">Tlf urgencias: +34 900 000 000</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 text-center text-xs text-gray-500">
          <p>&copy; 2026 Luxe Dental Clinic Premium. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
