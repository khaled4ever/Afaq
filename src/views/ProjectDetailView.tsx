/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Project, FloorPlan, Amenity } from '../types';
import {
  MapPin, Maximize, BedDouble, Bath, Clock, CheckCircle2, Phone, CalendarCheck, FileText, Compass, Volume2, School, Landmark, ShoppingBag, Droplet, Milestone, Eye, Play, Sparkles
} from 'lucide-react';
import MortgageCalculator from '../components/MortgageCalculator';

interface ProjectDetailViewProps {
  project: Project;
  onNavigate: (view: string) => void;
}

export default function ProjectDetailView({ project, onNavigate }: ProjectDetailViewProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<string | null>(
    project.floorPlans.length > 0 ? project.floorPlans[0].id : null
  );
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  // Find active floor plan details
  const activeFloorPlan = project.floorPlans.find((fp) => fp.id === selectedFloorPlan);

  const formatSAR = (num: number) => {
    return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(num);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingDate && bookingTime) {
      setBookingSubmitted(true);
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setBookingSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div id="project-detail-view" className="pt-24 pb-20 space-y-16 text-right">
      
      {/* Top Main Section: Image Slideshow & Summary Title */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-right">
        
        {/* Left Side: Photo slideshow with thumbs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="h-[300px] md:h-[450px] rounded-3xl overflow-hidden bg-slate-100 shadow-lg relative border border-slate-100">
            <img 
              src={project.images[activeImage]} 
              alt={`${project.title} - ${activeImage}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Dark contrast layout shadow */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-6 text-white flex justify-between items-end flex-row-reverse pointer-events-none">
              <span className="text-xxs bg-brand-primary/80 px-3 py-1 rounded-md font-extrabold shadow-sm">
                صورة {activeImage + 1} من {project.images.length}
              </span>
              <span className="text-xs font-black tracking-wide text-brand-accent">آفاق النشأة للتصميم المتميز</span>
            </div>
          </div>

          {/* Thumbnails rail selector */}
          <div className="flex gap-3 overflow-x-auto justify-start pb-2">
            {project.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-16 md:w-24 md:h-20 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 transition-all border-2 ${
                  activeImage === idx ? 'border-brand-accent scale-102 shadow-md' : 'border-transparent opacity-65 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Key Metadata Overview */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center flex-row-reverse">
              <span className="text-xxs font-black text-brand-light uppercase">{project.category}</span>
              <span className={`px-3 py-1 rounded-full text-xxs font-black text-white shadow-xs ${
                project.status === 'available' ? 'bg-green-600' :
                project.status === 'under-construction' ? 'bg-amber-600' :
                'bg-slate-600'
              }`}>
                {project.status === 'available' ? 'جاهز ومتاح للبيع' : 'قيد التطوير والتبليط'}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-brand-primary">{project.title}</h2>
            <p className="text-xxs font-extrabold text-slate-400 block tracking-wider mt-1">{project.titleEn}</p>

            <div className="flex gap-2 items-center text-xs font-bold text-slate-500 justify-start">
              <MapPin className="w-4 h-4 text-brand-accent" />
              <span>
                المملكة العربية السعودية • حي {project.district} • {project.city}
              </span>
            </div>

            <div className="text-xs md:text-sm text-slate-600 leading-relaxed font-semibold">
              <p>{project.description}</p>
            </div>
          </div>

          <div className="bg-brand-bg rounded-2xl p-5 border border-slate-100 space-y-4">
            <div>
              <span className="text-xxs text-slate-400 font-extrabold block">القيمة الإجمالية للعقار تبدأ من</span>
              <span className="text-brand-primary font-black text-2xl md:text-3xl tracking-tight block">
                {formatSAR(project.price)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-500">
              <div className="flex items-center gap-1.5 flex-row-reverse justify-end">
                <Maximize className="w-4 h-4 text-brand-light" />
                <span>المساحة: {project.area} متر²</span>
              </div>
              <div className="flex items-center gap-1.5 flex-row-reverse justify-end">
                <BedDouble className="w-4 h-4 text-brand-light" />
                <span>{project.rooms ? `${project.rooms} غرف نوم` : 'مساحة مكاتب'}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-row-reverse justify-end">
                <Bath className="w-4 h-4 text-brand-light" />
                <span>{project.bathrooms ? `${project.bathrooms} حمامات` : 'مرافق عامة'}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-row-reverse justify-end">
                <Clock className="w-4 h-4 text-brand-light" />
                <span>الاستلام المتوقع: {project.deliveryYear} م</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Embedded Virtual Video Tour Placeholder / Simulation */}
      <section className="bg-slate-900 py-16 text-white text-center relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" 
            alt="interior living room decoration video thumb" 
            className="w-full h-full object-cover blur-sm"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <span className="text-xxs font-black text-brand-accent tracking-widest flex items-center gap-2 justify-center">
            <Sparkles className="w-4 h-4" />
            جولة الواقع الافتراضي لمشروع تملك آفاق
          </span>
          <h3 className="text-xl md:text-2xl font-black text-white">شاهد جولة فيديو سينمائية وعرضاً تفصيلياً للمبنى</h3>
          
          <div className="max-w-2xl mx-auto h-64 md:h-96 rounded-3xl bg-black/60 border border-white/10 flex items-center justify-center relative overflow-hidden group shadow-2xl">
            <div className="text-center space-y-3 p-6">
              <button 
                type="button"
                onClick={() => window.open('https://vimeo.com/707012351', '_blank')}
                className="w-16 h-16 rounded-full bg-brand-accent text-brand-dark flex items-center justify-center mx-auto hover:bg-white hover:scale-110 shadow-lg justify-self-center cursor-pointer duration-300"
              >
                <Play className="w-6 h-6 fill-brand-dark " />
              </button>
              <h5 className="font-extrabold text-sm pt-2">معاينة فيديو العرض الفاخر ومسطحات البيئة المفتوحة</h5>
              <p className="text-xxs text-slate-400 font-semibold leading-relaxed">انقر لتفقد جمال المباني من الداخل والخارج على منصات العرض الموجه لمالكي النخبة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans & Detailed Proximity Amenities */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* FLOOR PLANS COMPONENT */}
        <div className="space-y-6">
          <div>
            <span className="text-brand-light font-extrabold text-xs block">توزيع المساحات الداخلية</span>
            <h3 className="text-xl md:text-2xl font-black text-brand-primary">مخططات وحدات تملّك آفاق المعتمدة</h3>
          </div>

          {project.floorPlans.length === 0 ? (
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center text-slate-400 font-bold text-xs h-64 flex flex-col justify-center items-center">
              المشروع يطرح مخططات صالات مخصصة للرواد والأعمال يتم تزويدها فوراً عند الطلب والاستشارة المباشرة.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Floor Plan selector tabs */}
              <div className="flex gap-2 border-b border-slate-100 pb-3 flex-wrap">
                {project.floorPlans.map((fp) => (
                  <button
                    key={fp.id}
                    onClick={() => setSelectedFloorPlan(fp.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedFloorPlan === fp.id
                        ? 'bg-brand-primary text-white shadow-md'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {fp.title.split('-')[0]}
                  </button>
                ))}
              </div>

              {/* Floor Plan display info details */}
              {activeFloorPlan && (
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
                  <div className="flex justify-between items-center flex-row-reverse">
                    <h4 className="font-extrabold text-sm text-slate-800">{activeFloorPlan.title}</h4>
                    <span className="text-xxs bg-brand-accent/20 text-brand-primary font-black px-2.5 py-1 rounded-md">
                      {activeFloorPlan.area} م² مساحة صافية
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-slate-600 bg-brand-bg p-3 rounded-lg border border-slate-50">
                    <div>
                      <span className="text-slate-400 block font-extrabold">عدد الأجنحة</span>
                      {activeFloorPlan.rooms} غرف
                    </div>
                    <div>
                      <span className="text-slate-400 block font-extrabold">دورات المياه</span>
                      {activeFloorPlan.bathrooms} حمامات
                    </div>
                    <div>
                      <span className="text-slate-400 block font-extrabold">المرافق المفتوحة</span>
                      مطبخ + صالة مفتوحة
                    </div>
                  </div>

                  {/* Elegant architectural mock grid drawing line details */}
                  <div className="h-44 bg-slate-50 border border-slate-200/60 rounded-xl relative overflow-hidden flex items-center justify-center p-4">
                    <div className="absolute inset-0 border border-slate-300 opacity-20 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:10px_10px]" />
                    <div className="relative border border-dashed border-slate-400 p-6 rounded-lg w-full max-w-xs text-center z-10 select-none">
                      <FileText className="w-5 h-5 mx-auto text-brand-primary mb-1 animate-bounce" />
                      <span className="text-xxs font-black text-slate-800 block">عرض المخطط التنفيذي للمهندسين</span>
                      <span className="text-[10px] text-slate-400 block pt-0.5">انقر للاستشارة وطلب كراسة الشروط والمواصفات الفنية المعتمدة</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* NEIGHBORING AMENITIES proximity indicators */}
        <div className="space-y-6">
          <div>
            <span className="text-brand-light font-extrabold text-xs block">مرافق النخبة المحيطة</span>
            <h3 className="text-xl md:text-2xl font-black text-brand-primary">القرب والأهمية للموقع الاستراتيجي</h3>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm divide-y divide-slate-100">
            {project.amenities.map((am, index) => {
              const amIcons = {
                school: School,
                hospital: Landmark, // Lucide nearest
                mall: ShoppingBag,
                mosque: Droplet, // Pure clean proxy
                park: Droplet,
                road: Milestone
              };
              const IconComp = amIcons[am.type] || Landmark;
              return (
                <div key={index} className="py-3.5 flex justify-between items-center flex-row-reverse text-xs">
                  <div className="flex items-center gap-3 flex-row-reverse font-bold text-slate-800">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                      <IconComp className="w-4 h-4 text-brand-light" />
                    </div>
                    <span>{am.name}</span>
                  </div>
                  <span className="text-brand-accent font-extrabold bg-brand-accent/5 px-3 py-1 rounded-full text-xxs">
                    {am.distance} فقط
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl flex items-center gap-3 flex-row-reverse text-xs">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary flex-shrink-0 animate-pulse">
              <Compass className="w-5 h-5 text-brand-accent" />
            </div>
            <div>
              <p className="font-extrabold text-brand-primary leading-tight">موقع موثق وخاضع لفحوصات البيئة والأمان</p>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">تقع مشاريع آفاق في تطلعات النمو في الرياض الكبرى لتمنح ممتلكيها كفاءة التمترس والقرب الإيجابي.</p>
            </div>
          </div>
        </div>

      </section>

      {/* DYNAMIC MORTGAGE CALCULATOR preloaded with exact property price! */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-brand-light font-extrabold text-xs block">التسهيلات البنكية والحلول المصرفية</span>
          <h3 className="text-xl md:text-2xl font-black text-brand-primary">احسب تكلفة قسطك التملكي في مشروع "{project.title}"</h3>
        </div>
        <MortgageCalculator initialPrice={project.price} projectName={project.title} />
      </section>

      {/* FIXED FOOTER CTA STATICS FOR HIGH USER CONVERSIONS */}
      <div className="fixed bottom-0 inset-x-0 bg-brand-primary text-white border-t border-brand-accent/30 py-3 px-4 z-30 shadow-2xl backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 flex-row-reverse">
          <div className="text-right hidden md:block">
            <h5 className="font-extrabold text-xs">{project.title}</h5>
            <p className="text-[10px] text-brand-light font-black mt-0.5">متاح للاستعلام التملكي • {formatSAR(project.price)}</p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="flex-1 sm:flex-initial bg-brand-accent text-brand-dark px-6 py-2.5 rounded-xl font-black text-xs hover:bg-amber-600 transition-all shadow-md cursor-pointer"
            >
              احجز حجز زيارة ومعاينة
            </button>
            <button
              onClick={() => {
                const text = `السلام عليكم، أرغب في حجز موعد ومعرفة أفضل تمويل عقاري بمشروع "${project.title}" بحي ${project.district}.`;
                window.open(`https://wa.me/966551412498?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>واتساب المبيعات</span>
              <Phone className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              قائمة المشاريع
            </button>
          </div>
        </div>
      </div>

      {/* MODAL BOOKING DIALOG FORM */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-6 relative text-right">
            <button 
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 left-4 p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-500 font-bold"
            >
              X
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 justify-start flex-row-reverse">
                <CalendarCheck className="w-6 h-6 text-brand-accent animate-pulse" />
                <h4 className="font-black text-sm md:text-base text-brand-primary">جدولة موعد زيارة ومعاينة المشروع</h4>
              </div>
              <p className="text-xxs text-slate-500 font-bold leading-normal">
                اختر اليوم والتوقيت المناسب لمعاين فلة العرض أو مجمع المكاتب بصحبة مهندس معتمد من شركة آفاق النشأة للتصميم المتميز.
              </p>

              {bookingSubmitted ? (
                <div className="p-5 bg-brand-primary text-white rounded-xl text-center space-y-2 animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-brand-accent mx-auto" />
                  <h5 className="font-extrabold text-xs">تم جدولة موعدك تملكاً باقتدار وحكمة!</h5>
                  <p className="text-[10px] text-brand-light font-bold">تم إرسال تذكرتك للمهندس وسيقوم بالاتصال بك فوراً لتأكيد الدليل.</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs font-semibold text-slate-600">
                  <div className="space-y-1">
                    <label className="block">اليوم المفضل للزيارة</label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-brand-primary rounded-xl outline-none text-right font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block">الوقت المفضل (صباحاً / مساءً)</label>
                    <input
                      type="time"
                      required
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-brand-primary rounded-xl outline-none text-right font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-dark text-white font-black py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    تأكيد حجز التذكرة والمعاينة
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
