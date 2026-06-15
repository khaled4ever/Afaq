/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Project, Testimonial } from '../types';
import {
  Search, Shield, MapPin, Award, Star, Compass, Clock, Heart, ArrowLeft, ArrowRight, CheckCircle2, Sparkles, BedDouble, Bath, Maximize, Landmark, Leaf, Settings, ThumbsUp, Building2, HelpCircle, ChevronDown, Eye, CheckSquare, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  projects: Project[];
  testimonials: Testimonial[];
  partners: { name: string; description: string }[];
  onNavigate: (view: string, projectId?: string | null, searchParams?: any) => void;
}

export default function HomeView({
  projects,
  testimonials,
  partners,
  onNavigate
}: HomeViewProps) {
  
  // Hero Search states (kept for compatibility & modal fallbacks)
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchBudget, setSearchBudget] = useState('');

  // Active testimonial index
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // CRM quick lead data
  const [crmSubmitted, setCrmSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    project: '',
    budget: '',
    notes: ''
  });

  const handleCrmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.phone) {
      setCrmSubmitted(true);
      setTimeout(() => {
        setCrmSubmitted(false);
        setFormData({ fullName: '', phone: '', project: '', budget: '', notes: '' });
      }, 5000);
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Keep specific project items matching the four visible on the screenshot
  const specificProjects = [
    projects.find(p => p.id === 'afaq-residence-03') || projects[2], // فلل آفاق الرحاب
    projects.find(p => p.id === 'afaq-residence-01') || projects[0], // فلل آفاق النرجس
    projects.find(p => p.id === 'afaq-center-04') || projects[3],    // فلل آفاق الملقا
    projects.find(p => p.id === 'afaq-residence-02') || projects[1]  // فلل آفاق الياسمين
  ].filter(Boolean);

  return (
    <div id="home-view-wrapper" className="space-y-24 pb-20 bg-white">
      
      {/* 1. Hero Splendour Panel */}
      <section id="hero-luxury-stage" className="relative min-h-[92vh] flex items-center justify-center py-20 overflow-hidden">
        {/* HQ Architectural Render Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=95" 
            alt="Afaq Al Nasha Luxury Residence dusk" 
            className="w-full h-full object-cover scale-102 brightness-50 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Royal Dark Blue overlay gradient for premium contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#051124]/50 via-[#051124]/75 to-[#051124]/95 mix-blend-multiply" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white space-y-8 mt-16 md:mt-24">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight md:leading-snug text-white"
          >
            نبني الثقة <br />
            <span className="text-[#C5A880] mt-2 block">قبل أن نبني المنازل</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm md:text-lg text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            في آفاق النشأة للتطوير العقاري، نمتلك ونطور مشاريعنا بمعايير عالية لجودة تصنع الفرق وتبني قيمة تدوم.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 pt-4 flex-row-reverse"
          >
            <button
              onClick={() => onNavigate('projects')}
              className="px-8 py-3.5 bg-[#C5A880] hover:bg-[#b59870] text-slate-900 font-extrabold rounded-lg text-xs md:text-sm shadow-xl transition-all cursor-pointer active:scale-95"
            >
              استكشف مشاريعنا
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white font-bold border border-white/20 rounded-lg text-xs md:text-sm transition-all backdrop-blur-xs cursor-pointer active:scale-95"
            >
              عن الشركة
            </button>
          </motion.div>
        </div>

        {/* Slider Controls in bottom-left corner */}
        <div className="absolute bottom-10 left-6 md:left-12 lg:left-24 z-10 flex items-center gap-4 text-white select-none">
          <span className="text-2xl font-black tracking-widest text-[#C5A880]">01</span>
          <div className="w-12 h-[1px] bg-white/20" />
          <div className="flex gap-2">
            <button type="button" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all cursor-pointer">
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button type="button" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all cursor-pointer">
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. About Us Section (من نحن) */}
      <section id="about-brief-panel" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Beautiful Overlapping Image Block */}
          <div className="lg:col-span-6 relative group">
            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                alt="Afaq modern architecture villa" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051124]/40 to-transparent pointer-events-none" />
            </div>

            {/* Overlapping Box matching the photo details */}
            <div className="absolute bottom-6 right-6 left-6 md:left-auto md:w-80 bg-[#051124] text-white p-6 rounded-2xl shadow-2xl border-r-4 border-[#C5A880] z-20">
              <h4 className="font-extrabold text-[#C5A880] text-sm md:text-base leading-relaxed">نحن مطور ومالك</h4>
              <p className="text-[10px] text-slate-300 font-medium tracking-wide mt-1">(Owner & Developer)</p>
              
              <div className="mt-4 space-y-2 text-xs text-slate-200 font-medium">
                <p className="flex items-center gap-1.5 flex-row-reverse text-right">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span>نمتلك الأرض...</span>
                </p>
                <p className="flex items-center gap-1.5 flex-row-reverse text-right">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span>ونشرف على التطوير...</span>
                </p>
                <p className="flex items-center gap-1.5 flex-row-reverse text-right">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span>لنقدم قيمة حقيقية.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Text Description & Features */}
          <div className="lg:col-span-6 text-right space-y-6">
            <span className="text-[#C5A880] font-black text-xs uppercase tracking-wider block">من نحن</span>
            <h3 className="text-3xl md:text-4.5xl font-black text-[#051124] leading-tight">آفاق النشأة للتطوير العقاري</h3>
            
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              شركة سعودية متخصصة في تطوير المشاريع السكنية والاستثمارية التي نمتلكها، ونشرف على جميع مراحلها من التخطيط والتصميم إلى التنفيذ والتسليم بجودة عالية ومعايير دقيقة.
            </p>
            <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
              نؤمن أن امتلاك المشروع وتطويره يمنحنا القدرة على التحكم الكامل في الجودة والتفاصيل، وتقديم قيمة حقيقية ومستدامة لعملائنا.
            </p>

            {/* Row of 4 items side-by-side */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="bg-slate-50 p-4 rounded-xl text-center space-y-2 border border-slate-100 hover:border-[#C5A880]/30 transition-colors">
                <div className="w-9 h-9 mx-auto rounded-full bg-[#051124]/5 flex items-center justify-center text-[#051124]">
                  <Building2 className="w-4 h-4" />
                </div>
                <h5 className="font-extrabold text-[11px] text-[#051124]">نمتلك مشاريعنا</h5>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl text-center space-y-2 border border-slate-100 hover:border-[#C5A880]/30 transition-colors">
                <div className="w-9 h-9 mx-auto rounded-full bg-[#051124]/5 flex items-center justify-center text-[#051124]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h5 className="font-extrabold text-[11px] text-[#051124]">نلتزم بالجودة</h5>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl text-center space-y-2 border border-slate-100 hover:border-[#C5A880]/30 transition-colors">
                <div className="w-9 h-9 mx-auto rounded-full bg-[#051124]/5 flex items-center justify-center text-[#051124]">
                  <Compass className="w-4 h-4" />
                </div>
                <h5 className="font-extrabold text-[11px] text-[#051124]">نطوّر بمعاييرنا</h5>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl text-center space-y-2 border border-slate-100 hover:border-[#C5A880]/30 transition-colors">
                <div className="w-9 h-9 mx-auto rounded-full bg-[#051124]/5 flex items-center justify-center text-[#051124]">
                  <Leaf className="w-4 h-4" />
                </div>
                <h5 className="font-extrabold text-[11px] text-[#051124]">نقدم قيمة مستدامة</h5>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('about')}
                className="px-8 py-3 bg-[#051124] text-white hover:bg-[#C5A880] hover:text-[#051124] rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95"
              >
                المزيد عن الشركة
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Vision & Mission Section (رؤيتنا ورسالتنا) */}
      <section id="vision-mission-panel" className="bg-[#051124] py-16 text-white text-right relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:divide-x md:divide-x-reverse md:divide-white/10">
            
            {/* Right: Vision */}
            <div className="space-y-4 md:pl-8">
              <div className="w-12 h-12 rounded-full border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] mb-2 mr-auto md:mr-0 ml-auto md:ml-0">
                <Sparkles className="w-5 h-5 bg-transparent" />
              </div>
              <h4 className="font-black text-[#C5A880] text-xl md:text-2xl">رؤيتنا</h4>
              <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed max-w-xl">
                أن نصنع وجهات سكنية واستثمارية متميزة من خلال تطوير مشاريع نمتلكها ونؤمن بقيمتها، لتكون علامة فارقة في قطاع التطوير العقاري وجودة الحياة.
              </p>
            </div>

            {/* Left: Mission */}
            <div className="space-y-4 md:pr-12 pt-8 md:pt-0">
              <div className="w-12 h-12 rounded-full border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] mb-2 mr-auto md:mr-0 ml-auto md:ml-0">
                <Compass className="w-5 h-5 bg-transparent" />
              </div>
              <h4 className="font-black text-[#C5A880] text-xl md:text-2xl">رسالتنا</h4>
              <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed max-w-xl">
                في آفاق النشأة، نبدأ من امتلاك الفرصة قبل تطويرها، ونشرف على جميع مراحل المشروع بدءاً من اختيار الموقع والتخطيط والتصميم وحتى التنفيذ والتسليم، لنقدم مشاريع تعكس رؤيتنا للجودة والثقة والاستدامة.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Projects Section (مشاريعنا) */}
      <section id="featured-portfolio" className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[#C5A880] font-black text-xs uppercase tracking-wider block">مشاريعنا</span>
          <h3 className="text-3xl md:text-4xl lg:text-4.5xl font-black text-[#051124]">مشاريع نمتلكها... ونطورها بمعاييرنا</h3>
        </div>

        {/* Real Estate Grid (4 Projects side by side matching image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specificProjects.map((p) => {
            const displayImg = p.id === 'afaq-residence-03' 
              ? 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
              : p.id === 'afaq-residence-01'
              ? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
              : p.id === 'afaq-center-04'
              ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
              : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80';

            return (
              <motion.div
                key={p.id}
                onClick={() => onNavigate('project-detail', p.id)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-right flex flex-col h-full cursor-pointer group"
              >
                {/* Image panel */}
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  <img 
                    src={displayImg} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* District / City overlay directly on image as seen in clean mockups */}
                  <div className="absolute bottom-4 right-4 text-white space-y-1">
                    <p className="text-[10px] font-bold text-[#C5A880]">{p.city} - {p.district}</p>
                    <h4 className="font-extrabold text-sm md:text-base text-white">
                      {p.title}
                    </h4>
                  </div>
                </div>

                {/* Body actions */}
                <div className="p-4 bg-white border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400">عقار فاخر</span>
                  <div className="flex items-center gap-1.5 text-xs font-black text-[#C5A880] group-hover:text-[#051124] transition-colors flex-row-reverse">
                    <span>استعراض المشروع</span>
                    <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel buttons & main archive trigger */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-6">
          <div className="flex gap-2">
            <button type="button" className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center transition-all cursor-pointer">
              <ArrowRight className="w-4 h-4 text-[#051124]" />
            </button>
            <button type="button" className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center transition-all cursor-pointer">
              <ArrowLeft className="w-4 h-4 text-[#051124]" />
            </button>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="px-10 py-3.5 bg-[#C5A880] text-slate-900 hover:bg-[#b59870] font-extrabold rounded-lg text-xs md:text-sm shadow-md transition-all cursor-pointer active:scale-95"
          >
            عرض جميع المشاريع
          </button>
        </div>
      </section>

      {/* 5. Advantages section (ما يميزنا) */}
      <section id="why-us" className="bg-[#F8F9FA]/60 py-20 border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#C5A880] font-black text-xs uppercase block">ما يميزنا</span>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto" />
          </div>

          {/* Clean 6 White Cards Grid matching perfectly visual mockup styling */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all text-center space-y-4 flex flex-col justify-center items-center">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#C5A880]">
                <Building2 className="w-5 h-5 bg-transparent" />
              </div>
              <h5 className="font-extrabold text-[12px] text-[#051124] leading-relaxed">نمتلك ونطور مشاريعنا</h5>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all text-center space-y-4 flex flex-col justify-center items-center">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#C5A880]">
                <MapPin className="w-5 h-5 bg-transparent" />
              </div>
              <h5 className="font-extrabold text-[12px] text-[#051124] leading-relaxed">مواقع استراتيجية متميزة</h5>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all text-center space-y-4 flex flex-col justify-center items-center">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#C5A880]">
                <Compass className="w-5 h-5 bg-transparent" />
              </div>
              <h5 className="font-extrabold text-[12px] text-[#051124] leading-relaxed">تصميم مدروس</h5>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all text-center space-y-4 flex flex-col justify-center items-center">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#C5A880]">
                <CheckCircle2 className="w-5 h-5 bg-transparent" />
              </div>
              <h5 className="font-extrabold text-[12px] text-[#051124] leading-relaxed">إشراف على جميع المراحل</h5>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all text-center space-y-4 flex flex-col justify-center items-center">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#C5A880]">
                <ThumbsUp className="w-5 h-5 bg-transparent" />
              </div>
              <h5 className="font-extrabold text-[12px] text-[#051124] leading-relaxed">شركاء نجاح موثوقون</h5>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all text-center space-y-4 flex flex-col justify-center items-center">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#C5A880]">
                <Award className="w-5 h-5 bg-transparent" />
              </div>
              <h5 className="font-extrabold text-[12px] text-[#051124] leading-relaxed">جودة في كل تفصيلة</h5>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Real Estate Statistics Block */}
      <section id="stats-dashboard" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#051124] rounded-2xl p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 lg:divide-x lg:divide-x-reverse divide-[#C5A880]/15">
            
            {/* Stat 1 */}
            <div className="pt-6 sm:pt-0">
              <span className="text-3xl md:text-5xl font-black text-[#C5A880] tracking-tight block mb-2">+1</span>
              <p className="text-xs md:text-sm font-extrabold text-slate-100">مليون م²</p>
              <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">أراضي تحت التطوير</p>
            </div>

            {/* Stat 2 */}
            <div className="pt-6 sm:pt-0 sm:px-4">
              <span className="text-3xl md:text-5xl font-black text-[#C5A880] tracking-tight block mb-2">+10</span>
              <p className="text-xs md:text-sm font-extrabold text-slate-100">مشاريع سكنية</p>
              <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">سكنية واستثمارية</p>
            </div>

            {/* Stat 3 */}
            <div className="pt-6 sm:pt-0 sm:px-4">
              <span className="text-3xl md:text-5xl font-black text-[#C5A880] tracking-tight block mb-2">+500</span>
              <p className="text-xs md:text-sm font-extrabold text-slate-100">وحدة سكنية</p>
              <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">تحت التطوير والتسليم</p>
            </div>

            {/* Stat 4 */}
            <div className="pt-6 sm:pt-0 sm:px-4">
              <span className="text-3xl md:text-5xl font-black text-[#C5A880] tracking-tight block mb-2">100%</span>
              <p className="text-xs md:text-sm font-extrabold text-slate-100">التزام بالجودة</p>
              <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">في كل مرحلة</p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Contact Banner (هل تبحث عن الجودة والثقة؟) */}
      <section id="contact-promo-banner" className="max-w-7xl mx-auto px-4 md:px-8">
        <div id="cta-contact-box" className="relative rounded-2xl p-8 md:p-14 text-white overflow-hidden shadow-2xl" 
             style={{ 
               backgroundColor: '#051124', 
               backgroundImage: `linear-gradient(to right, rgba(5,17,36,0.92), rgba(5,17,36,0.65)), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80')`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundBlendMode: 'multiply'
             }}>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 flex-row-reverse">
            
            {/* Right text content */}
            <div className="text-right space-y-3 lg:max-w-2xl">
              <h4 className="text-xl md:text-3xl font-black text-white">هل تبحث عن الجودة والثقة؟</h4>
              <p className="text-xs md:text-sm text-slate-300 font-medium">دعنا نساعدك في إختيار منزل أو فرصة استثمارية تدوم.</p>
            </div>

            {/* Left direct contact buttons and info */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-slate-200">
              
              {/* WhatsApp direct dial */}
              <a 
                href="https://wa.me/966551531050" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-6 py-2.5 rounded-xl border border-white/10 transition-colors flex-row-reverse"
              >
                <div className="text-right">
                  <span className="text-[9px] block text-slate-400 font-bold">واتساب</span>
                  <p className="text-xs font-extrabold text-white">055 153 1050</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                  <span className="font-extrabold text-lg">💬</span>
                </div>
              </a>

              {/* Central Direct Phone */}
              <a 
                href="tel:920015358" 
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-6 py-2.5 rounded-xl border border-white/10 transition-colors flex-row-reverse"
              >
                <div className="text-right">
                  <span className="text-[9px] block text-slate-400 font-bold">اتصل بنا</span>
                  <p className="text-xs font-extrabold text-white">9200 15358</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                  <span className="font-extrabold text-md">📞</span>
                </div>
              </a>

              {/* Gold Button */}
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] text-slate-900 hover:bg-[#b59870] font-black rounded-lg text-xs md:text-sm transition-all shadow-md cursor-pointer active:scale-95"
              >
                تواصل معنا الآن
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* 8. CRM Quick Consult / Contact form (moved to background or integrated cleanly) */}
      <section id="consultation-stage" className="max-w-4xl mx-auto px-4">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-2xl text-right relative overflow-hidden">
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2 justify-start flex-row-reverse">
              <Building2 className="w-5 h-5 text-[#C5A880]" />
              <h4 className="font-black text-lg md:text-xl text-[#051124]">طلب معاينة واستشارة عقارية</h4>
            </div>
            <p className="text-xs text-slate-500 font-extrabold">
              نسعد بخدمتكم وتنسيق زيارة خاصة لمواقع عرض مشاريع آفاق العقارية.
            </p>
          </div>

          {crmSubmitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-[#051124] text-white rounded-2xl text-center space-y-4"
            >
              <CheckCircle2 className="w-12 h-12 text-[#C5A880] mx-auto" />
              <div>
                <h5 className="font-extrabold text-sm md:text-base">تم إرسال طلب تملكك بنجاح لمجموعة آفاق</h5>
                <p className="text-[10px] text-white/80 mt-1">
                  سيقوم خبير مستشاري المبيعات بالتواصل معكم هاتفياً لترتيب الزيارة في أقرب وقت.
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleCrmSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">الاسم الكريم بالكامل</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="الاسم الثلاثي أو الثنائي"
                    className="w-full p-3 border border-slate-200 focus:border-[#051124] focus:ring-1 focus:ring-[#051124] rounded-xl outline-none text-right font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">رقم الجوال مباشر</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05xxxxxxx"
                    className="w-full p-3 border border-slate-200 focus:border-[#051124] focus:ring-1 focus:ring-[#051124] rounded-xl outline-none text-right placeholder:text-left font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">المجمع العقاري</label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full p-3 border border-slate-200 focus:border-[#051124] focus:ring-1 focus:ring-[#051124] rounded-xl outline-none text-right font-bold"
                  >
                    <option value="">حدد مشروعاً...</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">الميزانية التقريبية</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full p-3 border border-slate-200 focus:border-[#051124] focus:ring-1 focus:ring-[#051124] rounded-xl outline-none text-right font-bold"
                  >
                    <option value="">حدد النطاق السعري...</option>
                    <option value="1.5m - 3m">1.5 مليون - 3 مليون ر.س</option>
                    <option value="3m - 5m">3 مليون - 5 مليون ر.س</option>
                    <option value="5m+">فوق 5 ملايين ر.س</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 block">تفاصيل رغبتكم</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="أرغب في الاستفسار عن كفاءة العزل وتسهيلات تملك الدفع..."
                  className="w-full h-24 p-3 border border-slate-200 focus:border-[#051124] focus:ring-1 focus:ring-[#051124] rounded-xl outline-none text-right resize-none font-semibold text-slate-700"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#051124] hover:bg-[#071C3D] text-white font-black py-3.5 rounded-xl shadow-lg transition-all text-sm cursor-pointer"
              >
                ارسل طلب الاتصال وموعد المعاينة
              </button>
            </form>
          )}

        </div>
      </section>

    </div>
  );
}
