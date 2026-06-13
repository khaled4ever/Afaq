/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Award, ShieldCheck, FileCheck, Send, Library } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="main-app-footer" className="bg-brand-dark text-slate-300 pt-16 pb-8 border-t border-brand-accent/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top/Primary Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 text-right">
          
          {/* Column 1: Company Profile Extraordinaire */}
          <div className="col-span-12 md:col-span-4 space-y-5">
            <div className="flex items-center gap-3 justify-start flex-row-reverse">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-white to-slate-100 p-0.5 shadow-lg flex items-center justify-center border border-brand-accent/30 overflow-hidden">
                <Logo size="custom" className="w-10 h-10" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">شركة آفاق النشأة للتطوير العقاري</h4>
                <p className="text-[10px] text-brand-light font-bold">AFAQ AL-NASHA REAL ESTATE DEVELOPMENT</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              نحن في شركة آفاق النشأة نطوّر البيئات السكنية والتجارية الأكثر فخامة وحداثة في المملكة العربية السعودية. نلتزم بأرقى معايير الهندسة وأجود مواد الإنشاء لتحقيق الرؤية العصرية للحياة الفندقية المستدامة.
            </p>

            {/* License Badging / Verification */}
            <div className="space-y-2 pt-3">
              <div className="flex items-center gap-2 justify-start flex-row-reverse text-xxs font-extrabold text-slate-500">
                <ShieldCheck className="w-4 h-4 text-brand-accent" />
                <span>رخصة فال العقارية المعتمدة: 120000451</span>
              </div>
              <div className="flex items-center gap-2 justify-start flex-row-reverse text-xxs font-extrabold text-slate-500">
                <FileCheck className="w-4 h-4 text-brand-accent" />
                <span>رقم تصنيف المطور العقاري الوطني: 10452</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Gates */}
          <div className="col-span-6 md:col-span-2 space-y-4">
            <h5 className="font-black text-sm text-white border-r-2 border-brand-accent pr-2.5">روابط سريعة</h5>
            <ul className="space-y-2.5 text-xs font-bold text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-brand-accent transition-colors block cursor-pointer">الرئيسية</button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-brand-accent transition-colors block cursor-pointer">المشاريع المميزة</button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-brand-accent transition-colors block cursor-pointer font-bold">من نحن ورؤيتنا</button>
              </li>

              <li>
                <button onClick={() => onNavigate('maintenance')} className="hover:text-brand-accent transition-colors block cursor-pointer text-brand-light">بوابة المستفيدين (الصيانة)</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details & Landmark */}
          <div className="col-span-6 md:col-span-3 space-y-4">
            <h5 className="font-black text-sm text-white border-r-2 border-brand-accent pr-2.5">إدارة المبيعات والاتصال</h5>
            <ul className="space-y-3.5 text-xs font-semibold text-slate-400">
              <li className="flex items-start gap-2.5 flex-row-reverse">
                <MapPin className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  الرياض، حي الياسمين، تقاطع طريق الملك سلمان وقرطبة المالي، برج آفاق الطابق الخامس.
                </span>
              </li>
              <li className="flex items-center gap-2.5 flex-row-reverse">
                <Phone className="w-4 h-4 text-brand-light flex-shrink-0" />
                <span className="direction-ltr">+966 55 141 2498</span>
              </li>
              <li className="flex items-center gap-2.5 flex-row-reverse">
                <Mail className="w-4 h-4 text-brand-light flex-shrink-0" />
                <span className="text-slate-400 hover:text-white transition-colors">sales@afaqalnasha.sa</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription for Private Launches */}
          <div className="col-span-12 md:col-span-3 space-y-4">
            <h5 className="font-black text-sm text-white border-r-2 border-brand-accent pr-2.5">الإطلاق الخاص والمميز</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              اشترك في قائمتنا البريدية الحصرية لاستلام دعوات المشاريع الجديدة وفرص الاستثمار الاستثنائية قبل الإطلاق للعامة.
            </p>

            {subscribed ? (
              <div className="p-3 bg-brand-accent/10 border border-brand-accent/20 rounded-xl text-brand-accent text-xs font-bold animate-pulse text-center">
                تم تسجيل بريدك بنجاح لتلقي دعوات الشراء الخاصة.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <button
                  type="submit"
                  className="bg-brand-accent hover:bg-amber-600 text-brand-dark px-4 py-2.5 rounded-xl font-extrabold text-xs transition-colors cursor-pointer"
                >
                  اشترك
                </button>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="البريد الإلكتروني"
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none text-right placeholder:text-slate-500 text-white"
                />
              </form>
            )}

            {/* Social Media Vectors */}
            <div className="flex gap-3 justify-start pt-2">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-accent transition-colors flex items-center justify-center text-slate-200 hover:text-brand-dark">
                <span className="font-black text-xs">X</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-accent transition-colors flex items-center justify-center text-slate-200 hover:text-brand-dark">
                <span className="font-black text-xs">In</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-accent transition-colors flex items-center justify-center text-slate-200 hover:text-brand-dark">
                <span className="font-black text-xs">Ig</span>
              </a>
            </div>
          </div>

        </div>

        {/* Corporate Legal & Copyrights details */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xxs text-slate-500 font-semibold gap-4">
          <div className="flex gap-4 flex-wrap justify-center text-slate-400">
            <span>الرقم الضريبي للمجموعة: 31055041200003</span>
            <span>•</span>
            <span className="hover:text-brand-accent cursor-pointer">سياسة الخصوصية وسرية المعلومات</span>
            <span>•</span>
            <span className="hover:text-brand-accent cursor-pointer">وثائق الضمان والمواصفات الفنية</span>
          </div>
          <div>
            <p className="text-center md:text-left">
              جميع الحقوق محفوظة © {new Date().getFullYear()} لشركة آفاق النشأة للتطوير العقاري.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
