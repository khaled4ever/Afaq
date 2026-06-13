/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sparkles, Calculator, Eye, HelpCircle } from 'lucide-react';
import { Project } from '../types';
import Logo from './Logo';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, projectId?: string | null) => void;
  onOpenCalculator: () => void;
  allProjects: Project[];
}

export default function Navbar({
  currentView,
  onNavigate,
  onOpenCalculator,
  allProjects
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (view: string) => {
    onNavigate(view);
    setIsOpen(false);
    setMegaMenuOpen(false);
  };

  const navItems = [
    { label: 'الرئيسية', view: 'home' },
    { label: 'المشاريع', view: 'projects' },
    { label: 'من نحن', view: 'about' },
    { label: 'بوابة الصيانة', view: 'maintenance' },
    { label: 'اتصل بنا', view: 'contact' },
  ];

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-primary/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between flex-row-reverse">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none flex-row-reverse"
          >
            {/* Elegant Calligraphic Logo Brand Asset */}
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-white to-slate-100 p-0.5 shadow-md flex items-center justify-center border border-brand-accent/30 overflow-hidden hover:scale-105 transition-transform duration-300">
              <Logo size="custom" className="w-10 h-10" />
            </div>

            <div className="text-right">
              <h1 className={`font-black text-sm md:text-base leading-none tracking-tight transition-colors ${
                scrolled || currentView !== 'home' ? 'text-white' : 'text-brand-primary md:text-white'
              }`}>
                آفاق النشأة
              </h1>
              <span className={`text-[10px] block font-bold tracking-wider leading-none mt-1 ${
                scrolled || currentView !== 'home' ? 'text-brand-light' : 'text-slate-500 md:text-brand-light/95'
              }`}>
                AFAF AL-NASHA
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 space-x-reverse flex-row-reverse">
            {/* Standard Nav Items */}
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleLinkClick(item.view)}
                className={`px-4 py-2 text-sm font-bold transition-all relative rounded-xl cursor-pointer ${
                  currentView === item.view
                    ? 'text-white bg-white/10 shadow-sm'
                    : scrolled || currentView !== 'home'
                    ? 'text-slate-100 hover:text-white hover:bg-white/5'
                    : 'text-slate-200 hover:text-white hover:bg-slate-900/15'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Mega Menu Toggle */}
            <div className="relative">
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className={`px-4 py-2 text-sm font-bold transition-all rounded-xl cursor-pointer flex items-center gap-1.5 flex-row-reverse ${
                  megaMenuOpen
                    ? 'text-white bg-white/20'
                    : scrolled || currentView !== 'home'
                    ? 'text-slate-100 hover:text-white hover:bg-white/5'
                    : 'text-slate-200 hover:text-white hover:bg-slate-900/15'
                }`}
              >
                المخططات الكبرى
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dynamic Mega Menu Panel */}
              {megaMenuOpen && (
                <div 
                  id="mega-menu-panel"
                  className="absolute right-0 top-12 w-[600px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 grid grid-cols-12 gap-6 text-right animate-in fade-in slide-in-from-top-3 duration-200"
                >
                  {/* Right Half: Commercial & Highlights */}
                  <div className="col-span-6 border-l border-slate-100 pl-4">
                    <p className="text-xs font-black text-brand-primary/60 mb-3 border-b pb-1">مشاريع في الرياض</p>
                    <div className="space-y-3">
                      {allProjects.filter(p => p.city === 'الرياض').slice(0, 3).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            onNavigate('project-detail', p.id);
                            setMegaMenuOpen(false);
                          }}
                          className="group flex gap-3 text-right cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all"
                        >
                          <img 
                            src={p.images[0]} 
                            alt={p.title} 
                            className="w-12 h-12 object-cover rounded-lg bg-slate-100"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1">
                            <h5 className="text-xs font-bold text-slate-800 group-hover:text-brand-primary transition-colors">{p.title}</h5>
                            <span className="text-[10px] text-slate-400 font-semibold">{p.district} • {p.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Left Half: Premium Portfolios */}
                  <div className="col-span-6">
                    <p className="text-xs font-black text-brand-primary/60 mb-3 border-b pb-1">باقاتنا الساحلية والتجارية</p>
                    <div className="space-y-3">
                      {allProjects.filter(p => p.city !== 'الرياض' || p.type === 'commercial').slice(0, 2).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            onNavigate('project-detail', p.id);
                            setMegaMenuOpen(false);
                          }}
                          className="group flex gap-3 text-right cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all"
                        >
                          <img 
                            src={p.images[0]} 
                            alt={p.title} 
                            className="w-12 h-12 object-cover rounded-lg bg-slate-100"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1">
                            <h5 className="text-xs font-bold text-slate-800 group-hover:text-brand-primary transition-colors">{p.title}</h5>
                            <span className="text-[10px] text-slate-400 font-semibold">{p.city} • {p.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                      <button
                        onClick={() => {
                          onNavigate('projects');
                          setMegaMenuOpen(false);
                        }}
                        className="text-xs font-extrabold text-brand-accent hover:text-brand-primary transition-colors flex items-center justify-center gap-1 mx-auto cursor-pointer"
                      >
                        عرض جميع المشاريع (فلترة متقدّمة)
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Special Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Mortgage Calculator Shortcut */}
            <button
              onClick={onOpenCalculator}
              className={`p-2 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center relative cursor-pointer ${
                scrolled || currentView !== 'home' ? 'text-white' : 'text-brand-primary lg:text-white'
              }`}
              title="حاسبة التمويل العقاري"
            >
              <Calculator className="w-5 h-5" />
            </button>

            {/* Comparison Widget Button Removed */}

            {/* Primary Action */}
            <button
              onClick={() => handleLinkClick('contact')}
              className="bg-brand-accent hover:bg-amber-600 text-brand-dark px-5 py-2 rounded-xl font-black text-xs transition-all shadow-md hover:shadow-brand-accent/20 shimmer-btn cursor-pointer"
            >
              حجز موعد واستشارة
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-xl transition-all cursor-pointer ${
              scrolled || currentView !== 'home' ? 'text-white' : 'text-brand-primary'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Sidebar Back Drop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`fixed top-0 bottom-0 right-0 w-72 bg-brand-primary text-white z-40 transform transition-transform duration-300 lg:hidden flex flex-col justify-between p-6 overflow-y-auto ${
          isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/10 flex-row-reverse">
            <h4 className="font-extrabold text-sm text-brand-accent">بوابات آفاق النشأة</h4>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-1.5">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleLinkClick(item.view)}
                className={`w-full text-right px-4 py-3 rounded-xl font-bold text-sm block cursor-pointer ${
                  currentView === item.view
                    ? 'bg-brand-accent text-brand-dark'
                    : 'hover:bg-white/10 text-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Highlight Actions in Mobile */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                onOpenCalculator();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-200 cursor-pointer"
            >
              <span>مستشار حاسبة التمويل</span>
              <Calculator className="w-4 h-4 text-brand-accent" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <button
            onClick={() => handleLinkClick('contact')}
            className="w-full bg-brand-accent text-brand-dark py-3 rounded-xl font-black text-sm text-center shadow-md cursor-pointer"
          >
            اتصل بمستشار المبيعات
          </button>
        </div>
      </div>

    </header>
  );
}
