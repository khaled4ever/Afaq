/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Project, Testimonial } from '../types';
import {
  Search, Shield, MapPin, Award, Star, Compass, Clock, Heart, ArrowLeft, ArrowRight, CheckCircle2, Waves, Sparkles, BedDouble, Bath, Maximize, Landmark, Leaf, Settings, ThumbsUp, Building2, HelpCircle, ChevronDown
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
  
  // Hero Search states
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchBudget, setSearchBudget] = useState('');

  // Testimonial slider states
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // CRM sales form states
  const [crmSubmitted, setCrmSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    project: '',
    budget: '',
    notes: ''
  });

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('projects', null, {
      city: searchCity,
      type: searchType,
      budget: searchBudget
    });
  };

  const handleCrmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.phone) {
      setCrmSubmitted(true);
      setTimeout(() => {
        // Reset after duration
        setFormData({ fullName: '', phone: '', project: '', budget: '', notes: '' });
      }, 5000);
    }
  };

  const formatSAR = (num: number) => {
    return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(num);
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const whyUsFeatures = [
    {
      title: 'جودة البناء الفائقة',
      description: 'نؤسس هياكل البناء وفق أكواد وخرسانات معتمدة ومقاومة لأقصى عوامل الضغط وبتطبيق أحدث كود عزل سعودي.',
      icon: Shield,
      badge: 'جودة مستدامة'
    },
    {
      title: 'مواقع بالغة الأهمية',
      description: 'نختار مواقع مشاريعنا بشق الأنفس في أرقى أحياء الرياض وجدة على شوارع فسيحة وبمحاذاة أهم الطرق والشرايين الرئيسة.',
      icon: Compass,
      badge: 'قيمة مضافة'
    },
    {
      title: 'تصاميم فندقية مذهلة',
      description: 'تصاميمنا صاغها كبار مصممي الديكور والهندسة للاستغلال الذكي للفراغات وخلق طفرة من الرفاهية والراحة بإنارة طبيعية كاملة.',
      icon: Sparkles,
      badge: 'مودرن راقي'
    },
    {
      title: 'التزام صارم بالتسليم',
      description: 'نحترم الأوقات كفلسفة عمل أساسية ونطبق أحدث برمجيات إدارة المهام الإنشائية لضمان تسليم وحدتكم في الموعد المضروب دقة.',
      icon: Clock,
      badge: 'مصداقية كاملة'
    },
    {
      title: 'عقود ضمان وصيانة شاملة',
      description: 'خدمة ضمان تصل لغاية 25 عاماً على الهياكل الإنشائية وعشر سنوات على السباكة والكهرباء والواجهات والتشطيب العام مع صيانة مرنة.',
      icon: Settings,
      badge: 'راحة البال'
    },
    {
      title: 'بناء استثماري موثوق',
      description: 'مشاريعنا مصممة لتواكب تطلعات الاستثمار بتقديمها لشرائح المستثمرين عوائد تشغيل سنوية ممتازة ونسبة إعادة استثمار فائقة السخاء.',
      icon: ThumbsUp,
      badge: 'عوائد ممتازة'
    }
  ];

  const journeySteps = [
    {
      step: '01',
      title: 'اختيار المشروع والوحدة',
      desc: 'استكشف مشاريعنا المميزة المتطابقة مع ميزانيتك وراحتك بمساعدة مستشارينا الماليين.'
    },
    {
      step: '02',
      title: 'زيارة خاصة لموقع العرض',
      desc: 'احجز موعداً وسيرافقك خبير هندسي لشرح تفاصيل الإنشاء وبنود التشطيب وجودة المواد المستخدمة.'
    },
    {
      step: '03',
      title: 'تحديد الهيكلة التمويلية',
      desc: 'من خلال البنوك الشريكة نسّق أفضل قسط شهري وخطة تمويل عقارية ملائمة لميزانيتك العائلية.'
    },
    {
      step: '04',
      title: 'التعاقد الفوري والتوثيق',
      desc: 'إجراءات تملك بالغة السلاسة والوضوح مطابقة لتعليمات وزارة الإسكان والهيئات التنظيمية.'
    },
    {
      step: '05',
      title: 'استلام المفاتيح وعقود الضمان',
      desc: 'نهنئك في تملك منزلك ونسلّمك دليلك الكامل للبيت الذكي وشهادات الفحص وضمانات الجودة الموثقة.'
    }
  ];

  return (
    <div id="home-view-wrapper" className="space-y-24 pb-20">
      
      {/* 1. Hero Splendour Panel */}
      <section id="hero-luxury-stage" className="relative min-h-[95vh] lg:h-[95vh] flex items-center justify-center py-24 lg:py-0 overflow-hidden">
        {/* HQ Architectural Render Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90" 
            alt="Afaq Al Nasha Luxury Residence dusk" 
            className="w-full h-full object-cover scale-102 brightness-65 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Royal Dark Blue overlay gradient for premium contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D2E5E]/40 via-[#071C3D]/60 to-[#071C3D]/95 mix-blend-multiply" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white space-y-8 mt-16 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-brand-accent/20 border border-brand-accent/40 rounded-full px-5 py-2 text-brand-accent font-extrabold text-xs tracking-wide"
          >
            <Sparkles className="w-4 h-4" />
            <span>شركة آفاق النشأة للتطوير العقاري - فخامة متوارثة</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight md:leading-snug text-white"
          >
            نبني آفاقاً جديدة <br className="hidden md:inline" />
            <span className="text-brand-accent">للحياة العصرية والفاخرة</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-sm md:text-lg text-slate-200 font-semibold max-w-2xl mx-auto leading-relaxed"
          >
            نطوّر مشاريع سكنية وتجارية حصرية وبمعايير عالمية تجمع بين أصالة الجودة والابتكار المستدام لإثراء أسلوب معيشتك.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <button
              onClick={() => onNavigate('projects')}
              className="px-8 py-3.5 bg-brand-accent hover:bg-amber-600 text-brand-dark font-black rounded-xl text-sm shadow-xl hover:shadow-brand-accent/20 transition-all shimmer-btn cursor-pointer"
            >
              استعرض المجمع السكني
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold border border-white/25 hover:border-white/50 rounded-xl text-sm transition-all backdrop-blur-sm cursor-pointer"
            >
              احجز استشارتك المجانية
            </button>
          </motion.div>

          {/* Smart Autocomplete Search Overlay Form */}
          <motion.form
            onSubmit={handleHeroSearchSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-full p-5 md:p-4 shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-4 text-slate-800 items-center justify-between text-right"
          >
            {/* City option */}
            <div className="w-full md:w-1/4 flex flex-col px-4 text-right border-b border-slate-100 pb-3 md:pb-0 md:border-b-0 md:border-l md:border-slate-200 relative group">
              <label className="text-xxs font-extrabold text-slate-400 mb-1.5">المدن</label>
              <div className="relative flex items-center">
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="bg-transparent font-bold text-sm text-brand-primary border-none outline-none focus:ring-0 w-full cursor-pointer hover:text-brand-accent transition-colors py-2 pl-7 pr-0 appearance-none leading-relaxed h-10"
                >
                  <option value="">جميع المدن</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute left-0 pointer-events-none group-hover:text-brand-accent transition-colors" />
              </div>
            </div>

            {/* Type option */}
            <div className="w-full md:w-1/4 flex flex-col px-4 text-right border-b border-slate-100 pb-3 md:pb-0 md:border-b-0 md:border-l md:border-slate-200 relative group">
              <label className="text-xxs font-extrabold text-slate-400 mb-1.5">نوع المشروع</label>
              <div className="relative flex items-center">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="bg-transparent font-bold text-sm text-brand-primary border-none outline-none focus:ring-0 w-full cursor-pointer hover:text-brand-accent transition-colors py-2 pl-7 pr-0 appearance-none leading-relaxed h-10"
                >
                  <option value="">جميع فئات العقار</option>
                  <option value="residential">سكني فاخر</option>
                  <option value="commercial">تجاري ومكاتب</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute left-0 pointer-events-none group-hover:text-brand-accent transition-colors" />
              </div>
            </div>

            {/* Budget option */}
            <div className="w-full md:w-1/4 flex flex-col px-4 text-right border-b border-slate-100 pb-3 md:pb-0 md:border-b-0 relative group">
              <label className="text-xxs font-extrabold text-slate-400 mb-1.5">الميزانية التقريبية</label>
              <div className="relative flex items-center">
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="bg-transparent font-bold text-sm text-brand-primary border-none outline-none focus:ring-0 w-full cursor-pointer hover:text-brand-accent transition-colors py-2 pl-7 pr-0 appearance-none leading-relaxed h-10"
                >
                  <option value="">جميع الميزانيات</option>
                  <option value="under4">أقل من 4 مليون ر.س</option>
                  <option value="above4">أكثر من 4 مليون ر.س</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute left-0 pointer-events-none group-hover:text-brand-accent transition-colors" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto bg-brand-primary text-white hover:bg-brand-dark px-8 py-3.5 rounded-xl md:rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:scale-[1.02] duration-300 active:scale-[0.98]"
            >
              <Search className="w-4 h-4 text-brand-light" />
              <span>بحث ذكي</span>
            </button>
          </motion.form>
        </div>
      </section>

      {/* 2. Stats Panel Section */}
      <section id="stats-dashboard" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-brand-primary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Graphic circles in the background */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-light/10 rounded-full -translate-y-24 translate-x-24 z-0 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full translate-y-24 -translate-x-24 z-0 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 divide-y sm:divide-y-0 sm:divide-x lg:divide-x-reverse divide-white/10 text-center">
            
            {/* Stat Item 1 */}
            <div className="pt-6 sm:pt-0">
              <span className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight block mb-2">+146,000 م²</span>
              <h5 className="text-xs md:text-sm font-bold text-slate-300">مسطحات ومساحات التطوير المنجزة</h5>
              <p className="text-xxs text-slate-500 mt-1 font-semibold">تطوير مستدام بمعايير بالغة الدقة</p>
            </div>

            {/* Stat Item 2 */}
            <div className="pt-6 sm:pt-0 sm:px-6">
              <span className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight block mb-2">+54 مشروعاً</span>
              <h5 className="text-xs md:text-sm font-bold text-slate-300">محفظة المشاريع العقارية الكبرى</h5>
              <p className="text-xxs text-slate-500 mt-1 font-semibold">بناء عمراني معتمد يحقق مصداقيتنا</p>
            </div>

            {/* Stat Item 3 */}
            <div className="pt-6 sm:pt-0 sm:px-6">
              <span className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight block mb-2">+810 وحدة</span>
              <h5 className="text-xs md:text-sm font-bold text-slate-300">وحدة سكنية وتجارية تم تسليمها بنجاح</h5>
              <p className="text-xxs text-slate-500 mt-1 font-semibold">ثقة تنبع من الرقي والاتقان المعماري</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Why Afaq Al-Nasha Section (Bento Grid) */}
      <section id="why-us" className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-brand-light font-extrabold text-xs tracking-wider uppercase block">خصائص النخبة المعمارية</span>
          <h3 className="text-2xl md:text-3.5xl font-black text-brand-primary">لماذا يُعدّ التطوير العقاري في آفاق النشأة استثماراً للأجيال؟</h3>
          <p className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed">
            نهتم بأدق تفاصيل الإنشاء، ونتعاون مع أفضل الكفاءات لتقديم صروح عقارية نموذجية تمنحك الأمان، الفخامة والقيمة الأعلى.
          </p>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUsFeatures.map((ft, index) => {
            const IconComponent = ft.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:border-brand-primary/10 transition-all text-right flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4 flex-row-reverse">
                    <div className="w-11 h-11 bg-brand-primary/5 rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xxs font-extrabold px-2.5 py-1 bg-brand-bg rounded-md text-slate-500">
                      {ft.badge}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-800 text-sm md:text-base group-hover:text-brand-primary transition-colors mb-2">
                    {ft.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                    {ft.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-1.5 justify-start text-[10px] font-black text-brand-accent hover:text-brand-primary transition-all cursor-pointer">
                  <span>تعرّف على شهادات الجودة الخاصة بنا</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Projects Section */}
      <section id="featured-portfolio" className="bg-brand-bg py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 flex-row-reverse">
            <div className="text-right space-y-2">
              <span className="text-brand-light font-extrabold text-xs tracking-wider uppercase block">بوابة المعالم السكنية</span>
              <h3 className="text-2xl md:text-3.5xl font-black text-brand-primary">المشاريع والمجتمعات المميزة</h3>
              <p className="text-xs font-bold text-slate-500 max-w-xl">فلل، قصور ومكاتب مبتكرة بأحدث بنود الهندسة وتسهيلات الدفع والتمويل المتنوعة بالرياض وجدة.</p>
            </div>
            
            <button
              onClick={() => onNavigate('projects')}
              className="px-6 py-3 bg-brand-primary hover:bg-brand-dark text-white rounded-xl font-bold text-xs transition-all flex items-center gap-2 flex-row-reverse shadow-md cursor-pointer"
            >
              <span>مشاهدة كافة المحفظة العقارية ({projects.length})</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Cards Portfolio Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((p) => {
              return (
                <motion.div
                  key={p.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-right flex flex-col h-full"
                >
                  {/* Image and Status Bar */}
                  <div className="relative h-60 bg-slate-100 overflow-hidden">
                    <img 
                      src={p.images[0]} 
                      alt={p.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient shadow inside image for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                    {/* Status badge */}
                    <span className={`absolute top-4 right-4 px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-wide text-white shadow-md ${
                      p.status === 'available' ? 'bg-green-600' :
                      p.status === 'under-construction' ? 'bg-amber-600' :
                      p.status === 'launching-soon' ? 'bg-purple-600 font-extrabold' : 'bg-slate-600'
                    }`}>
                      {p.status === 'available' ? 'متاح للبيـع' :
                       p.status === 'under-construction' ? 'على هيكل الإنشاء' :
                       p.status === 'launching-soon' ? 'إطلاق مرتقب' : 'بيعت بالكامل'}
                    </span>

                    {/* Project Category badge */}
                    <span className="absolute bottom-4 right-4 bg-white/95 text-brand-primary px-3 py-1 rounded-lg text-xxs font-black tracking-wider shadow-sm">
                      {p.category}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-slate-400 font-extrabold text-xxs justify-start">
                        <MapPin className="w-3.5 h-3.5 text-brand-light" />
                        <span>حي {p.district}، {p.city}</span>
                      </div>
                      
                      <h4 className="font-extrabold text-slate-800 text-sm md:text-base line-clamp-1">
                        {p.title}
                      </h4>
                      <p className="text-slate-500 text-xs line-clamp-2 h-10 leading-relaxed font-semibold">
                        {p.briefDescription}
                      </p>
                    </div>

                    {/* Specifications Metrics */}
                    <div className="flex items-center justify-between border-y border-slate-100 py-3 text-slate-500 font-bold text-xxs gap-2">
                      <div className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.area} م²</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.rooms ? `${p.rooms} غرف` : 'مساحة بضائع'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.bathrooms ? `${p.bathrooms} حمّام` : 'مرافق متكاملة'}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[10px] block font-extrabold text-slate-400">سعر يبدأ من</span>
                        <span className="text-brand-primary text-base font-extrabold">{formatSAR(p.price)}</span>
                      </div>

                      <button
                        onClick={() => onNavigate('project-detail', p.id)}
                        className="text-xs font-black text-brand-accent hover:text-brand-primary transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>طلب وحجز الوحدة</span>
                        <ArrowLeft className="w-4 h-4 animate-pulse" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Customer Journey Map */}
      <section id="customer-journey" className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-brand-light font-extrabold text-xs tracking-wider uppercase block">شراكة العمر الآمنة</span>
          <h3 className="text-2xl md:text-3.5xl font-black text-brand-primary">رحلة تميز عميل تملك آفاق وعقود جودة البناء</h3>
          <p className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed">
            من الاختيار البصري إلى الاستلام القانوني وضمانات المهندس، نلتزم بمرافقتك بكل وضوح وشفافية لراحة منزلك.
          </p>
        </div>

        {/* Steps flow component */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-right relative">
          
          {/* Background Connector Bar (desktop only) */}
          <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-slate-100 -z-10" />

          {journeySteps.map((j, index) => (
            <div key={index} className="space-y-4 bg-white border border-slate-100 rounded-2xl p-5 md:p-4 hover:border-brand-accent transition-colors relative">
              <div className="w-12 h-12 rounded-xl bg-brand-primary text-brand-accent font-black text-lg flex items-center justify-center shadow-md">
                {j.step}
              </div>
              <h4 className="font-extrabold text-sm text-slate-800 pt-1 leading-relaxed">
                {j.title}
              </h4>
              <p className="text-slate-500 text-xxs leading-relaxed font-semibold">
                {j.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. HQ Partner Logo and Banks Rail */}
      <section id="corporate-partners" className="bg-white py-12 border-y border-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-center text-slate-400 font-extrabold text-xxs tracking-wider uppercase mb-8">شراكاء النجاح وبنوك التمويل المعتمدة ومطور سكني</p>
          
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14 opacity-75">
            {partners.map((p, index) => (
              <div key={index} className="flex flex-col items-center justify-center space-y-1.5">
                <span className="font-black text-xs md:text-sm text-slate-700 hover:text-brand-primary transition-colors text-center block">
                  {p.name}
                </span>
                <span className="text-[10px] text-slate-400 font-bold text-center block">{p.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials Slider */}
      <section id="testimonials-hub" className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-brand-light font-extrabold text-xs tracking-wider block">شركاء الرخاء</span>
          <h3 className="text-2xl md:text-3.5xl font-black text-brand-primary">ماذا يقول ملاك تملك مشاريع آفاق العقارية؟</h3>
        </div>

        {/* Carousel slide card */}
        <div className="relative max-w-4xl mx-auto bg-brand-primary text-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
          {/* background embellishments */}
          <div className="absolute top-3 left-3 text-slate-100/10 font-bold text-8xl leading-none">“</div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 text-right"
            >
              {/* Rating stars */}
              <div className="flex items-center gap-1 justify-start flex-row-reverse">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-accent fill-brand-accent" />
                ))}
              </div>

              {/* content */}
              <p className="text-xs md:text-sm text-slate-200 leading-bold leading-relaxed font-semibold">
                "{testimonials[activeTestimonial].content}"
              </p>

              {/* Owner card info */}
              <div className="flex items-center gap-3.5 pt-4 justify-start flex-row-reverse border-t border-white/10">
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-accent bg-slate-800"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-extrabold text-xs md:text-sm text-white">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-xxs text-brand-light pt-0.5">
                    {testimonials[activeTestimonial].role} - مستملك في <span className="font-bold text-brand-accent">"{testimonials[activeTestimonial].projectBought}"</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex gap-3 justify-end pt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors font-bold text-white cursor-pointer"
              aria-label="المراجعة السابقة"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors font-bold text-white cursor-pointer"
              aria-label="المراجعة التالية"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. CRM Sales Direct Contact Form Section */}
      <section id="crm-quick-contact" className="max-w-4xl mx-auto px-4">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-2xl text-right relative overflow-hidden">
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2 justify-start flex-row-reverse">
              <Building2 className="w-5 h-5 text-brand-accent" />
              <h4 className="font-black text-lg md:text-xl text-brand-primary">استشارة عقارية فورية وطلب معاينة</h4>
            </div>
            <p className="text-xs text-slate-500 font-bold max-w-xl">
              سجل استفسارك المالي أو موعد المعاينة وسيقوم خبير مهندسين ومستشار المبيعات باتصال وتنسيق معك خلال 15 دقيقة فقط بدقة.
            </p>
          </div>

          {crmSubmitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-brand-primary text-white rounded-2xl text-center space-y-4"
            >
              <CheckCircle2 className="w-12 h-12 text-brand-accent mx-auto" />
              <div>
                <h5 className="font-extrabold text-sm md:text-base">تم إرسال طلب تملكك بنجاح لمجموعة آفاق</h5>
                <p className="text-xxs text-white/80 mt-1">
                  رقم طلبك الداخلي: #AFAQ-{Math.floor(Math.random() * 10000)}. سيتم الاتصال بك هاتفياً وعلى الواتساب فوراً.
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
                    placeholder="عبدالرحمن بن محمد"
                    className="w-full p-3 border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl outline-none text-right font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">رقم الجوال السعودي المباشر</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05xxxxxxx"
                    className="w-full p-3 border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl outline-none text-right placeholder:text-left font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">المجمع العقاري المهتم به</label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full p-3 border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl outline-none text-right font-bold"
                  >
                    <option value="">حدد مشروعاً...</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">الميزانية المرصودة</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full p-3 border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl outline-none text-right font-bold"
                  >
                    <option value="">حدد النطاق السعري لشراء العقار...</option>
                    <option value="1.5m - 3m">1.5 مليون - 3 مليون ر.س</option>
                    <option value="3m - 5m">3 مليون - 5 مليون ر.س</option>
                    <option value="5m+">فوق 5 ملايين ر.س</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 block">ما هي تفاصيل رغبتك أو أسئلتك؟</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="أرغب في زيارة فلة العرض ومعرفة تفاصيل التمويل من بنك الراجحي..."
                  className="w-full h-24 p-3 border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl outline-none text-right resize-none font-semibold text-slate-700"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-dark text-white font-black py-3.5 rounded-xl shadow-lg transition-all text-sm shimmer-btn cursor-pointer"
              >
                تقديم استشارة تملك ومعاينة فورية
              </button>
            </form>
          )}

        </div>
      </section>

    </div>
  );
}
