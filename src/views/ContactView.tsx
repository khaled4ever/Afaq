/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, ChevronRight, HelpCircle, Shield, Award, Landmark
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactView() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      setFormSubmitted(true);
      setTimeout(() => {
        setName('');
        setPhone('');
        setEmail('');
        setInterest('');
        setMessage('');
        setFormSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div id="contact-view-stage" className="pt-24 pb-20 space-y-20">
      
      {/* Page Header banner */}
      <section className="bg-brand-primary text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#071C3D] opacity-80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xxs font-black text-brand-accent tracking-widest uppercase">تواصل مباشر وسريع</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black">اتصل بإدارة المبيعات بمجموعة آفاق</h2>
          <p className="text-xs md:text-sm text-slate-300 font-semibold max-w-2xl mx-auto">
            مستشارونا العقاريون متواجدون لخدمتك وشرح تفاصيل التملك، خطط الدفع ومواعيد المعاينة في زيارة خاصة حصرية.
          </p>
        </div>
      </section>

      {/* Main Grid split */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 text-right">
        
        {/* RIGHT SIDE: COMPANY CONTACT INFO & MAPS */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-4">
            <h3 className="font-black text-lg md:text-xl text-brand-primary border-r-2 border-brand-accent pr-2 block">بيانات الاتصال وإدارة المبيعات</h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              تفضل بزيارة برجنا الإداري أو تواصل هاتفياً لحجز مستشار تملك شخصي ومسؤول تمويل لترتيب رحلة معاينتك ومطابقة احتياجات عائلتك.
            </p>
          </div>

          <div className="space-y-5 text-xs font-semibold text-slate-700">
            {/* Address */}
            <div className="flex gap-4 items-start flex-row-reverse">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary flex-shrink-0">
                <MapPin className="w-5 h-5 text-brand-light" />
              </div>
              <div className="space-y-1">
                <h5 className="font-extrabold text-slate-800 text-sm">العنوان والموقع الرئيسي</h5>
                <p className="text-slate-500 leading-relaxed text-xxs">
                  المملكة العربية السعودية، الرياض، حي الياسمين، برج آفاق العقاري الاستراتيجي، الطابق الخامس، تقاطع طريق الملك سلمان.
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 items-center flex-row-reverse">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary flex-shrink-0">
                <Phone className="w-5 h-5 text-brand-light" />
              </div>
              <div className="space-y-1">
                <h5 className="font-extrabold text-slate-800 text-sm">منصة الاتصال والاتصال الهاتفي</h5>
                <p className="text-brand-primary font-black text-xs leading-none direction-ltr text-right">
                  +966 55 141 2498
                </p>
                <p className="text-[10px] text-slate-400 font-bold leading-none">جوال المبيعات المباشر: 0551412498 (966+)</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 items-center flex-row-reverse">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary flex-shrink-0">
                <Mail className="w-5 h-5 text-brand-light" />
              </div>
              <div className="space-y-1">
                <h5 className="font-extrabold text-slate-800 text-sm">المراسلات البريدية والاتفاقات</h5>
                <p className="text-slate-600 hover:text-brand-primary transition-colors text-xs select-all lowercase leading-none">
                  sales@afaqalnasha.sa
                </p>
              </div>
            </div>

            {/* Desk Hours */}
            <div className="flex gap-4 items-center flex-row-reverse">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary flex-shrink-0">
                <Clock className="w-5 h-5 text-brand-light" />
              </div>
              <div className="space-y-1">
                <h5 className="font-extrabold text-slate-800 text-sm">ساعات العمل والزيارة المتاحة</h5>
                <p className="text-slate-500 text-xxs leading-relaxed">
                  من الأحد إلى الخميس: من الساعة 9:00 صباحاً وحتى الساعة 6:00 مساءً. السبت لزيارة مواقع فلة العرض بالتنسيق المسبق للعملاء.
                </p>
              </div>
            </div>
          </div>

          {/* SIMULATED HIGH END MAPS GRAPHICS AS REQUESTED */}
          <div className="h-64 rounded-3xl bg-slate-100 relative overflow-hidden flex items-center justify-center p-4 border border-slate-200">
            {/* abstract roads */}
            <div className="absolute inset-x-0 top-1/4 h-2 bg-white/80 select-none shadow-xs pointer-events-none" />
            <div className="absolute inset-x-0 top-2/3 h-2 bg-white/80 select-none shadow-xs pointer-events-none" />
            <div className="absolute left-1/4 inset-y-0 w-2 bg-white/80 select-none shadow-xs pointer-events-none" />
            <div className="absolute left-2/3 inset-y-0 w-2.5 bg-white/80 select-none shadow-xs pointer-events-none" />

            <div className="relative text-center space-y-3 z-10 max-w-sm">
              <div className="w-11 h-11 rounded-full bg-brand-primary text-brand-accent shadow-xl flex items-center justify-center mx-auto animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="bg-white/95 p-3 rounded-2xl shadow-xl border border-slate-100">
                <h5 className="font-extrabold text-xs text-brand-primary leading-tight">موقع برج آفاق العقاري بالياسمين</h5>
                <p className="text-[10px] text-slate-400 font-bold mt-1">شارع الملك سلمان • حي الياسمين • الرياض</p>
                <button
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  className="mt-2 text-xxs text-brand-accent font-black hover:text-brand-primary transition-colors flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  افتح عبر خرائط Google Maps
                  <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* LEFT SIDE: CRM SMART CONTACT MESSAGE FORM */}
        <div className="lg:col-span-7 bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-lg space-y-6">
          
          <div className="flex gap-2.5 items-center justify-start flex-row-reverse border-b border-slate-100 pb-3">
            <MessageSquare className="w-5 h-5 text-brand-accent" />
            <h4 className="font-black text-base md:text-lg text-brand-primary">بوابات إرسال الرسائل والمراسلة الفورية</h4>
          </div>

          {formSubmitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 bg-brand-primary text-white rounded-2xl text-center space-y-4 shadow-xl"
            >
              <CheckCircle2 className="w-12 h-12 text-brand-accent mx-auto animate-bounce" />
              <div>
                <h5 className="font-extrabold text-sm md:text-base">تم إرسال رسالتكم بنجاح لمستشاري آفاق</h5>
                <p className="text-xs text-white/80 mt-1">
                  لقد استلمنا أسئلتكم العقارية وسيقوم مسؤول المبيعات بالتجاوب معكم عبر الرقم والبريد المدخلين في أقل من 20 دقيقة بدقة.
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs text-slate-600 font-semibold text-right">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* name */}
                <div className="space-y-1">
                  <label className="block">اسم المرسل الكريم</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="عبدالرحمن العجمان"
                    className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl outline-none"
                  />
                </div>
                {/* phone */}
                <div className="space-y-1">
                  <label className="block">رقم الجوال النشط (الواتساب المفضل)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05xxxxxxx"
                    className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl outline-none placeholder:text-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1">
                  <label className="block">البريد الإلكتروني المفضل</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="username@domain.com"
                    className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl outline-none placeholder:text-left"
                  />
                </div>
                {/* Interest category choice */}
                <div className="space-y-1">
                  <label className="block">العقار أو الخدمة المستفسر عنها</label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-brand-primary rounded-xl outline-none font-bold"
                  >
                    <option value="">حدد قسم الاستفسار...</option>
                    <option value="buy-villa">شراء فلة سكنية ذكية</option>
                    <option value="invest">شراء قصر أو استثمار عقارات</option>
                    <option value="commercial">مكتب للأعمال ومساحة عرض</option>
                    <option value="maintenance">الضمانات وصيانة الوحدات</option>
                    <option value="partnership">المقاولات والفرص المشتركة</option>
                  </select>
                </div>
              </div>

              {/* Message text area */}
              <div className="space-y-1">
                <label className="block">محتوى رسالتك أو أسئلتك بالتفصيل</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="أرغب في التعرف على جدول تسليم مجمع نرجس العقاري وهل يتطابق تملكي له مع مبادرات سكني..."
                  className="w-full h-32 p-3 bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl outline-none resize-none font-semibold text-slate-700"
                />
              </div>

              <div className="flex gap-2.5 items-center bg-brand-bg p-3.5 rounded-xl border border-slate-100 flex-row-reverse">
                <Shield className="w-5 h-5 text-brand-light flex-shrink-0" />
                <span className="text-[10px] text-slate-500 font-semibold leading-normal">
                  نحن نلتزم بالسرية والخصوصية التامة لجميع بيانات عملائنا وصناديق الاتصال وفق أنظمة الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا).
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-dark text-white font-black py-3 rounded-xl transition-all shadow-md text-sm cursor-pointer"
              >
                إرسال السؤال وحفظ طلب المعاينة
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
