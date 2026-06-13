/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import {
  Search, SlidersHorizontal, MapPin, Grid, Map, Maximize, BedDouble, Bath, ChevronDown, CheckCircle2, RefreshCw, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsViewProps {
  projects: Project[];
  onNavigate: (view: string, projectId?: string | null) => void;
  initialFilters?: {
    city?: string;
    type?: string;
    budget?: string;
  };
}

export default function ProjectsView({
  projects,
  onNavigate,
  initialFilters
}: ProjectsViewProps) {
  
  // States of filter
  const [city, setCity] = useState(initialFilters?.city || '');
  const [type, setType] = useState(initialFilters?.type || '');
  const [status, setStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [roomsFilter, setRoomsFilter] = useState('');
  const [priceRange, setPriceRange] = useState<number>(20000000); // Slider up to 20m
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedMapProject, setSelectedMapProject] = useState<Project | null>(projects[0]);

  const handleResetFilters = () => {
    setCity('');
    setType('');
    setStatus('');
    setSearchQuery('');
    setRoomsFilter('');
    setPriceRange(20000000);
  };

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // City check
      if (city && p.city !== city) return false;
      // Type/category check
      if (type && p.type !== type) return false;
      // Status check
      if (status && p.status !== status) return false;
      // Price range
      if (p.price > priceRange) return false;
      // Rooms check
      if (roomsFilter) {
        if (roomsFilter === '5+' && p.rooms < 5) return false;
        if (roomsFilter !== '5+' && p.rooms !== Number(roomsFilter)) return false;
      }
      // Query check (Title, district, category)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query) || p.titleEn.toLowerCase().includes(query);
        const matchesDistrict = p.district.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDistrict && !matchesCat) return false;
      }

      // Budget level check derived from initial search redirect
      if (initialFilters?.budget) {
        if (initialFilters.budget === 'under4' && p.price >= 4000000) return false;
        if (initialFilters.budget === 'above4' && p.price < 4000000) return false;
      }

      return true;
    });
  }, [projects, city, type, status, searchQuery, roomsFilter, priceRange, initialFilters]);

  const formatSAR = (num: number) => {
    return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div id="projects-view-stage" className="pt-24 pb-20 space-y-12">
      
      {/* Page Header banner */}
      <section id="projects-banner" className="bg-brand-primary text-white py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary via-brand-dark to-[#041021] z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl md:text-4xl font-black text-white">محفظة المشاريع والضواحي السكنية والتجارية</h2>
          <p className="text-xs md:text-sm text-slate-300 font-semibold max-w-xl mx-auto">
            تصفح عقارات ومشاريع آفاق النشأة المتميزة بالهندسة الفندقية والمواصفات المعززة. طبق الفلاتر الذكية لمقارنة الوحدات والعثور على بيتك القادم.
          </p>
        </div>
      </section>

      {/* Main Filter & Stage Grid wrapper */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-right">
        
        {/* SIDE BAR / FILTERS COMPONENT */}
        <aside id="filter-sidebar" className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6 h-fit sticky top-24">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 flex-row-reverse">
            <span className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5 flex-row-reverse">
              <SlidersHorizontal className="w-4 h-4 text-brand-accent animate-pulse" />
              تصفية وبحث ذكي
            </span>
            <button
              onClick={handleResetFilters}
              className="text-xxs text-brand-light hover:text-brand-primary transition-colors font-black flex items-center gap-1 flex-row-reverse cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-brand-light" />
              إعادة تعيين
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Search query input */}
            <div className="space-y-1">
              <label className="font-bold text-slate-600 block">بحث بالاسم أو الحي</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالنرجس، الياسمين..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none text-right font-semibold"
                />
              </div>
            </div>

            {/* City dropdown */}
            <div className="space-y-1">
              <label className="font-bold text-slate-600 block">المدن</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-primary outline-none font-bold"
              >
                <option value="">كل مدن المملكة</option>
                <option value="الرياض">الرياض</option>
                <option value="جدة">جدة</option>
              </select>
            </div>

            {/* Type/category dropdown */}
            <div className="space-y-1">
              <label className="font-bold text-slate-600 block">فئة الاستخدام</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-primary outline-none font-bold"
              >
                <option value="">جميع فئات العقار</option>
                <option value="residential">سكني فاخر</option>
                <option value="commercial">تجاري ومكاتب</option>
              </select>
            </div>

            {/* Status dropdown */}
            <div className="space-y-1">
              <label className="font-bold text-slate-600 block">حالة التطوير</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-primary outline-none font-bold"
              >
                <option value="">جميع حالات الإنشاء</option>
                <option value="available">جاهز ومتاح للبيع</option>
                <option value="under-construction">على هيكل العظم / قيد الإنشاء</option>
                <option value="launching-soon">إطلاق خاص مرتقب</option>
                <option value="sold-out">وحدات مباعة كلياً</option>
              </select>
            </div>

            {/* Rooms Selector */}
            <div className="space-y-1">
              <label className="font-bold text-slate-600 block">أجنحة المبيت / الغرف</label>
              <select
                value={roomsFilter}
                onChange={(e) => setRoomsFilter(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-primary outline-none font-bold"
              >
                <option value="">جميع المساحات والعدد</option>
                <option value="4">4 غرف وصالة</option>
                <option value="5">5 غرف وصالة</option>
                <option value="5+">بنتهاوس وقصر (+5)</option>
              </select>
            </div>

            {/* Price range filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-bold text-slate-600">
                <span>الحد الأقصى للسعر</span>
                <span className="text-brand-primary font-extrabold">{formatSAR(priceRange)}</span>
              </div>
              <input
                type="range"
                min={200000}
                max={20000000}
                step={250000}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="flex justify-between text-xxs text-slate-400 font-bold">
                <span>0.2 مليون ر.س</span>
                <span>20 مليون ر.س</span>
              </div>
            </div>

          </div>
        </aside>

        {/* PROJECTS RESULTS STAGE Area */}
        <main id="results-stage" className="lg:col-span-9 space-y-6">
          
          {/* List Toolbar controllers */}
          <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4 flex-row-reverse text-xs">
            <div className="font-bold text-slate-500">
              تم العثور على <span className="text-brand-primary font-black text-sm">{filteredProjects.length}</span> مشاريع ومخططات عقارية مطابقة
            </div>

            {/* Toggle view mode between cards list & simulated vector map */}
            <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-lg font-black transition-all flex items-center gap-1 flex-row-reverse cursor-pointer ${
                  viewMode === 'map' ? 'bg-brand-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Map className="w-4 h-4 text-brand-light" />
                <span>الرؤية على الخريطة التفاعلية</span>
              </button>
              
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-black transition-all flex items-center gap-1 flex-row-reverse cursor-pointer ${
                  viewMode === 'grid' ? 'bg-brand-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Grid className="w-4 h-4 text-brand-light" />
                <span>الشبكة العقارية</span>
              </button>
            </div>
          </div>

          {/* DYNAMIC VIEW CONTAINER MAP VS GRID */}
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              
              // GRID VIEW
              <motion.div
                key="grid-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {filteredProjects.length === 0 ? (
                  <div className="col-span-full bg-white border border-slate-100 rounded-3xl p-16 text-center text-slate-500 space-y-4">
                    <Layers className="w-12 h-12 text-slate-300 mx-auto" />
                    <div>
                      <p className="font-bold text-slate-700 text-base">عذراً، لا توجد تطابقات لخيارات البحث الحالية</p>
                      <p className="text-xs text-slate-400 mt-1">تفضل بمسح بعض شروط التصفية أو تقليل نطاق الفهرسة لإيجاد نتائج قريبة.</p>
                    </div>
                  </div>
                ) : (
                  filteredProjects.map((p) => {
                    return (
                      <motion.div
                        key={p.id}
                        layout
                        className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between"
                      >
                        <div className="relative h-56 bg-slate-100">
                          <img 
                            src={p.images[0]} 
                            alt={p.title} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                          
                          {/* status tag */}
                          <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xxs font-black text-white shadow-sm ${
                            p.status === 'available' ? 'bg-green-600' :
                            p.status === 'under-construction' ? 'bg-amber-600' :
                            p.status === 'launching-soon' ? 'bg-purple-600' : 'bg-slate-600'
                          }`}>
                            {p.status === 'available' ? 'جاهز للتسليم' :
                             p.status === 'under-construction' ? 'قيد الإنشاء' :
                             p.status === 'launching-soon' ? 'مرتقب قريباً' : 'مباع كود'}
                          </span>

                          <span className="absolute bottom-3 right-3 bg-white/95 text-brand-primary px-2.5 py-1 rounded-md text-[10px] font-black">
                            {p.category}
                          </span>
                        </div>

                        <div className="p-5 space-y-4 text-right flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-1 text-slate-400 font-extrabold text-xxs justify-start">
                              <MapPin className="w-3.5 h-3.5 text-brand-light" />
                              <span>حي {p.district}، {p.city}</span>
                            </div>
                            <h4 className="font-extrabold text-slate-800 text-sm line-clamp-1">{p.title}</h4>
                            <p className="text-slate-500 text-xs line-clamp-2 h-9 leading-relaxed font-semibold">
                              {p.briefDescription}
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-y border-slate-100 py-2.5 font-bold text-xxs text-slate-500 gap-1">
                            <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" />{p.area} م²</span>
                            <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{p.rooms ? `${p.rooms} غرف` : 'مكتبي'}</span>
                            <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{p.bathrooms ? `${p.bathrooms} حمامات` : 'مرافق'}</span>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div>
                              <span className="text-xxs font-extrabold text-slate-400 block pb-0.5">تبدأ الحصص من</span>
                              <span className="text-brand-primary font-bold text-sm block">{formatSAR(p.price)}</span>
                            </div>

                            <div className="flex gap-2 w-full">
                              <button
                                onClick={() => onNavigate('project-detail', p.id)}
                                className="bg-brand-primary hover:bg-brand-dark text-white rounded-xl px-4 py-1.5 font-bold text-xs shadow-md transition-all cursor-pointer w-full text-center"
                              >
                                المعاينة والخطط
                              </button>
                            </div>
                          </div>
                        </div>

                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            ) : (
              
              // SIMULATED INTERACTIVE MAP VIEW FOR SAUDI MARKETS
              <motion.div
                key="map-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-slate-100 p-4 rounded-3xl shadow-sm min-h-[500px]"
              >
                {/* Left side: simulated map canvas */}
                <div className="md:col-span-7 bg-slate-100 rounded-2xl relative overflow-hidden min-h-[350px] flex items-center justify-center border border-slate-200">
                  
                  {/* Decorative abstract grids to look like map topography */}
                  <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(#0D2E5E_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="absolute w-44 h-44 bg-green-500/10 rounded-full top-20 right-20 blur-xl pointer-events-none" />
                  <div className="absolute w-60 h-60 bg-blue-500/15 rounded-full bottom-10 left-10 blur-2xl pointer-events-none" />

                  {/* Vectors of highway indicators (Riyadh/Jeddah simulated road grid) */}
                  <div className="absolute h-1 bg-white/60 left-0 right-0 top-1/3 rotate-6" title="طريق الملك سلمان" />
                  <div className="absolute h-1 bg-white/60 left-0 right-0 top-1/2 -rotate-12" title="طريق أنس بن مالك" />
                  <div className="absolute w-1 bg-white/60 top-0 bottom-0 left-1/3 rotate-2" title="طريق الملك فهد" />
                  <div className="absolute w-1.5 bg-white/60 top-0 bottom-0 left-2/3 -rotate-3" title="طريق المطار الدائري" />

                  {/* Pin points of filtered projects */}
                  {filteredProjects.map((p) => {
                    const isSelected = selectedMapProject?.id === p.id;
                    // Mock offset/positions derived from coordinates
                    const topPos = `${((p.lat - 20) % 1) * 400 + 100}px`;
                    const leftPos = `${((p.lng - 35) % 1) * 350 + 100}px`;

                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedMapProject(p)}
                        style={{ top: topPos, left: leftPos }}
                        className="absolute z-10 p-1 group transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all"
                      >
                        <div className={`p-1.5 rounded-xl shadow-lg flex items-center gap-1.5 border transition-all ${
                          isSelected 
                            ? 'bg-brand-primary text-white border-brand-accent scale-110 z-20 shadow-brand-primary/30' 
                            : 'bg-white text-slate-800 border-slate-100 hover:scale-105 hover:bg-slate-50'
                        }`}>
                          <MapPin className={`w-4 h-4 ${isSelected ? 'text-brand-accent' : 'text-brand-primary'}`} />
                          <span className="font-extrabold text-[10px] hidden sm:inline">{p.title}</span>
                          <span className="font-extrabold text-[9px] block text-brand-accent">{formatSAR(p.price)}</span>
                        </div>
                        <div className={`w-2.5 h-2.5 rounded-full border-2 border-white mx-auto shadow-md ${
                          isSelected ? 'bg-brand-accent' : 'bg-brand-primary'
                        }`} />
                      </button>
                    );
                  })}

                  {/* General map floating watermark info */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-xxs font-black text-slate-600 border border-slate-100 select-none">
                    إحداثيات جغرافية محاكية لمشاريع النخبة بـ {city || 'الرياض وجدة'}
                  </div>
                </div>

                {/* Right side: quick selected item profile card */}
                <div className="md:col-span-5 flex flex-col justify-between py-2 text-right">
                  {selectedMapProject ? (
                    <div className="space-y-4">
                      <div className="h-44 rounded-xl overflow-hidden bg-slate-100 relative">
                        <img 
                          src={selectedMapProject.images[0]} 
                          alt={selectedMapProject.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-2 right-2 bg-brand-primary text-white text-xxs font-extrabold px-2 py-1 rounded-md shadow-sm">
                          {selectedMapProject.category}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xxs font-extrabold text-slate-400 block">
                          حي {selectedMapProject.district} • {selectedMapProject.city}
                        </span>
                        <h4 className="font-black text-sm text-slate-800">{selectedMapProject.title}</h4>
                        <p className="text-slate-500 text-xxs leading-relaxed font-bold h-10 overflow-hidden line-clamp-2">
                          {selectedMapProject.description}
                        </p>
                      </div>

                      {/* key statistics */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center font-bold text-xxs text-slate-600 border border-slate-100">
                        <div>
                          <span className="text-[10px] block text-slate-400 font-extrabold">المساحة</span>
                          {selectedMapProject.area} م²
                        </div>
                        <div>
                          <span className="text-[10px] block text-slate-400 font-extrabold">الغرف</span>
                          {selectedMapProject.rooms || 'مكتب'}
                        </div>
                        <div>
                          <span className="text-[10px] block text-slate-400 font-extrabold">الحمامات</span>
                          {selectedMapProject.bathrooms || 'مرافق'}
                        </div>
                      </div>

                      <div className="pt-2 flex justify-between items-center bg-slate-50/50 p-3 rounded-xl">
                        <div>
                          <span className="text-xxs text-slate-400 font-bold block">سعر التملك التقريبي</span>
                          <span className="text-brand-primary font-black text-xs block">{formatSAR(selectedMapProject.price)}</span>
                        </div>
                        <button
                          onClick={() => onNavigate('project-detail', selectedMapProject.id)}
                          className="bg-brand-primary hover:bg-brand-dark text-white text-xxs font-black px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                        >
                          تصفح كامل التفاصيل والمخططات
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 font-bold text-xxs">
                      الرجاء الضغط على أي دبوس في الخريطة لعرض تفاصيله العقارية المتكاملة.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </main>

      </div>

    </div>
  );
}
