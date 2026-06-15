/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="main-app-footer" className="bg-[#051124] text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top/Primary Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 text-right">
          
          {/* Column 1: Company Profile */}
          <div className="col-span-12 md:col-span-4 space-y-5">
            <div className="flex items-center gap-3 justify-start flex-row-reverse">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-white to-slate-100 p-0.5 shadow-lg flex items-center justify-center border border-brand-accent/30 overflow-hidden">
                <Logo size="custom" className="w-10 h-10" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">آفاق النشأة</h4>
                <p className="text-[10px] text-brand-light font-bold">للتطوير العقاري</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              نبني الثقة قبل أن نبني المنازل
            </p>

            {/* Social Media Vectors */}
            <div className="flex gap-3 justify-start pt-2 flex-row-reverse">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-accent transition-all flex items-center justify-center text-slate-200 hover:text-brand-dark hover:scale-105" aria-label="LinkedIn">
                <span className="font-bold text-xs">in</span>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-accent transition-all flex items-center justify-center text-slate-200 hover:text-brand-dark hover:scale-105" aria-label="X">
                <span className="font-bold text-xs">𝕏</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-accent transition-all flex items-center justify-center text-slate-200 hover:text-brand-dark hover:scale-105" aria-label="Instagram">
                <span className="font-bold text-xs">ig</span>
              </a>
              <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-accent transition-all flex items-center justify-center text-slate-200 hover:text-brand-dark hover:scale-105" aria-label="Snapchat">
                <span className="font-bold text-xs">👻</span>
              </a>
            </div>
          </div>
 
          {/* Column 2: Quick Links */}
          <div className="col-span-6 md:col-span-2 space-y-4">
            <h5 className="font-black text-sm text-white border-r-2 border-brand-accent pr-2.5">روابط سريعة</h5>
            <ul className="space-y-2.5 text-xs font-bold text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-brand-accent transition-colors block cursor-pointer">الرئيسية</button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-brand-accent transition-colors block cursor-pointer font-bold">عن الشركة</button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-brand-accent transition-colors block cursor-pointer">مشاريعنا</button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-brand-accent transition-colors block cursor-pointer">خدماتنا</button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-brand-accent transition-colors block cursor-pointer">الجودة</button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-brand-accent transition-colors block cursor-pointer font-bold">تواصل معنا</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="col-span-6 md:col-span-3 space-y-4">
            <h5 className="font-black text-sm text-white border-r-2 border-brand-accent pr-2.5">خدماتنا</h5>
            <ul className="space-y-2.5 text-xs font-bold text-slate-400">
              <li className="hover:text-brand-accent cursor-pointer transition-colors">تطوير المشاريع</li>
              <li className="hover:text-brand-accent cursor-pointer transition-colors">إدارة المشاريع</li>
              <li className="hover:text-brand-accent cursor-pointer transition-colors">الاستشارات العقارية</li>
              <li className="hover:text-brand-accent cursor-pointer transition-colors">التسويق العقاري</li>
            </ul>
          </div>
 
          {/* Column 4: Contact Us */}
          <div className="col-span-12 md:col-span-3 space-y-4">
            <h5 className="font-black text-sm text-white border-r-2 border-brand-accent pr-2.5">تواصل معنا</h5>
            <ul className="space-y-3.5 text-xs font-semibold text-slate-400">
              <li className="flex items-center gap-2.5 flex-row-reverse justify-start">
                <Phone className="w-4 h-4 text-brand-light flex-shrink-0" />
                <span className="direction-ltr">9200 15358</span>
              </li>
              <li className="flex items-center gap-2.5 flex-row-reverse justify-start">
                <Mail className="w-4 h-4 text-brand-light flex-shrink-0" />
                <span className="text-slate-400 hover:text-white transition-colors">info@afaq-nasha.com</span>
              </li>
              <li className="flex items-start gap-2.5 flex-row-reverse justify-start">
                <MapPin className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">الرياض - المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
 
        </div>
 
        {/* Corporate Legal & Copyrights details */}
        <div className="pt-8 flex flex-col md:flex-row-reverse justify-between items-center text-xs text-slate-500 font-semibold gap-4">
          <div className="text-right">
            <p className="text-slate-400">
              جميع الحقوق محفوظة © 2024 لشركة آفاق النشأة للتطوير العقاري
            </p>
          </div>
          <div className="flex gap-4 flex-wrap justify-center text-slate-400">
            <span className="hover:text-brand-accent cursor-pointer transition-colors">سياسة الخصوصية</span>
            <span>|</span>
            <span className="hover:text-brand-accent cursor-pointer transition-colors">الشروط والأحكام</span>
          </div>
        </div>
 
      </div>
    </footer>
  );
}
