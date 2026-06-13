/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppButtonProps {
  currentProjectName?: string;
  currentProjectUrl?: string;
}

export default function WhatsAppButton({ currentProjectName, currentProjectUrl }: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const templates = [
    {
      label: 'استفسار عام',
      text: 'السلام عليكم ورحمة الله، أريد الاستفسار عن مشاريع شركة آفاق النشأة للتطوير العقاري المتوفرة حالياً بالرياض.'
    },
    {
      label: 'حجز موعد زيارة',
      text: currentProjectName 
        ? `السلام عليكم، أرغب في حجز موعد لزيارة موقع مشروع "${currentProjectName}".`
        : 'السلام عليكم، أرغب في حجز موعد لزيارة فلل العرض والمشاريع المتوفرة لديكم.'
    },
    {
      label: 'طلب عرض سعر',
      text: currentProjectName 
        ? `السلام عليكم، أرجو تزويدي بكافة تفاصيل ومخططات الأسعار والتمويل لمشروع "${currentProjectName}".`
        : 'السلام عليكم، أرجو تزويدي بالأسعار التفصيلية وأفضل خطط الدفع المتاحة بمشاريعكم.'
    }
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = message || templates[selectedTemplate].text;
    const whatsappNum = '966551412498'; // Updated to 0551412498
    const encoded = encodeURIComponent(finalMsg);
    window.open(`https://wa.me/${whatsappNum}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div id="whatsapp-widget-container" className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="whatsapp-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.7 }}
            className="w-80 md:w-96 rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden text-right"
          >
            {/* Header */}
            <div className="bg-brand-primary p-4 text-white flex justify-between items-center flex-row-reverse">
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-brand-light" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">مستشار مبيعات آفاق النشأة</h4>
                  <p className="text-xs text-white/80">متصل الآن - جاهز لخدمتك</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Templates */}
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <p className="text-xs text-slate-500 mb-2 font-medium">اختر رسالة جاهزة للرد السريع:</p>
              <div className="flex flex-wrap gap-1.5 justify-start">
                {templates.map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedTemplate(idx);
                      setMessage(t.text);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedTemplate === idx
                        ? 'bg-brand-primary text-white scale-102 shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Body / Form */}
            <form onSubmit={handleSend} className="p-4">
              <textarea
                value={message || templates[selectedTemplate].text}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="أكتب استفسارك هنا..."
                className="w-full h-24 p-3 border border-slate-200 rounded-xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors text-sm resize-none text-slate-800"
                required
              />
              <button
                type="submit"
                className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl shadow-lg hover:shadow-green-100 flex items-center justify-center gap-2 transition-all shimmer-btn cursor-pointer"
              >
                <Send className="w-4 h-4 rotate-180" />
                <span>إرسال عبر واتساب</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="whatsapp-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-xl cursor-pointer hover:shadow-green-200 focus:outline-none transition-all relative"
        aria-label="تواصل واتساب"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-30 animate-ping -z-10"></span>
        <MessageCircle className="w-7 h-7" />
      </motion.button>
    </div>
  );
}
