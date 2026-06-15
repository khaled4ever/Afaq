/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MaintenanceTicket, Project } from '../types';
import {
  Wrench, ShieldAlert, Sparkles, CheckCircle2, History, FileText, UploadCloud, ChevronRight, Play, RefreshCw, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MaintenanceViewProps {
  projects: Project[];
}

export default function MaintenanceView({ projects }: MaintenanceViewProps) {
  
  // Simulated initial tickets
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([
    {
      id: 'AFAQ-MNT-4850',
      project: 'مجمع نرجس آفاق السكني',
      unit: 'فلة 102 - أ',
      category: 'التكييف والتهوية',
      description: 'تبريد مكيف الصالة الرئيسية يقل في ساعات الظهر القوية، ونشتبه بضرورة فحص الفريون الخارجي بمسطح السطح.',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '11 يونيو 2026'
    },
    {
      id: 'AFAQ-MNT-2311',
      project: 'قصور ياسمين آفاق النخبة',
      unit: 'قصر 05',
      category: 'أنظمة البيت الذكي',
      description: 'شاشة التحكم المركزية بالصوت لا تستجيب لإضاءات الحديقة المعلقة بشكل تلقائي بعد تحديث الإنترنت.',
      priority: 'high',
      status: 'completed',
      createdAt: '08 يونيو 2026'
    }
  ]);

  // Form states
  const [formProject, setFormProject] = useState('');
  const [formUnit, setFormUnit] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPriority, setFormPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formTicketId, setFormTicketId] = useState('');

  // Simulated uploaded file
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Search/Track Ticket states
  const [trackId, setTrackId] = useState('');
  const [trackedTicket, setTrackedTicket] = useState<MaintenanceTicket | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const categoriesList = [
    'الكهرباء والإنارة',
    'السباكة والمياه والمسابح',
    'التكييف والتهوية',
    'أنظمة البيت الذكي',
    'الأبواب والنوافذ والواجهات الحجرية',
    'أخرى'
  ];

  // Drag & drop file upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  // Submit ticket
  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formProject && formUnit && formCategory && formDescription) {
      const generatedId = `AFAQ-MNT-${Math.floor(1000 + Math.random() * 9000)}`;
      const newTicket: MaintenanceTicket = {
        id: generatedId,
        project: formProject,
        unit: formUnit,
        category: formCategory,
        description: formDescription,
        priority: formPriority,
        status: 'submitted',
        createdAt: 'اليوم (الآن)'
      };

      setTickets([newTicket, ...tickets]);
      setFormTicketId(generatedId);
      setFormSubmitted(true);

      // Reset form fields
      setFormProject('');
      setFormUnit('');
      setFormCategory('');
      setFormDescription('');
      setUploadedFileName(null);
    }
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const found = tickets.find(t => t.id.toLowerCase() === trackId.trim().toLowerCase());
    setTrackedTicket(found || null);
  };

  return (
    <div id="maintenance-view-stage" className="pt-24 pb-20 space-y-24">
      
      {/* 1. Page Header banner */}
      <section className="bg-brand-primary text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark opacity-90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 text-center">
          <span className="text-xxs font-black text-brand-accent tracking-widest uppercase">الضمان الحقيقي وبوابات الصيانة الشاملة</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black">بوابة تتبع الصيانة والضمان السكني</h2>
          <p className="text-xs md:text-sm text-slate-300 font-semibold max-w-2xl mx-auto leading-relaxed">
            لأن تملكك لمشاريع آفاق هو بداية لشراكتنا، نوفر لجميع مستخدمينا ومالكي وحداتنا بوابة صيانة تفاعلية لتقديم وتتبع طلبات الصيانة الدورية والفحص الفني.
          </p>
        </div>
      </section>

      {/* 2. Interactive grid: Create ticket vs Track ticket */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 text-right">
        
        {/* CREATE MAINTENANCE TICKET FORM */}
        <section className="lg:col-span-7 bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-lg space-y-6">
          <div className="flex items-center gap-2.5 justify-start flex-row-reverse border-b border-slate-100 pb-4">
            <Wrench className="w-5 h-5 text-brand-accent animate-pulse" />
            <h3 className="font-black text-base md:text-lg text-brand-primary">تقديم طلب صيانة فني معتمد</h3>
          </div>

          {formSubmitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-brand-primary text-white rounded-2xl text-center space-y-4"
            >
              <CheckCircle2 className="w-12 h-12 text-brand-accent mx-auto" />
              <div>
                <h4 className="font-extrabold text-sm md:text-base">تم رفع وحفظ تذكرة الصيانة بنجاح لمجموعة آفاق</h4>
                <p className="text-xs text-white/80 mt-1">
                  رقم تذكرتك الداخلي هو: <span className="text-brand-accent font-extrabold">{formTicketId}</span>
                </p>
                <p className="text-xxs text-white/50 leading-relaxed mt-2">
                  تم إدراج طلبكم للفحص وتعيين فني تخصصي. يرجى كتابة هذا الرقم في حرك التتبع المالي باليسار لتفقد الخطوات وتطوره فوراً.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormSubmitted(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-xs cursor-pointer"
              >
                تقديم طلب صيانة جديد
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs text-slate-600 font-semibold">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Project selector option */}
                <div className="space-y-1">
                  <label className="block">المجمع السكني المعين</label>
                  <select
                    required
                    value={formProject}
                    onChange={(e) => setFormProject(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-brand-primary rounded-xl outline-none"
                  >
                    <option value="">حدد مجمّعك السكني...</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>

                {/* Unit villa text input */}
                <div className="space-y-1">
                  <label className="block">رقم الوحدة العقارية (فلة / شقة / مكتب)</label>
                  <input
                    type="text"
                    required
                    placeholder="فلة رقم 102 - أ"
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-brand-primary rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Issue category list option */}
                <div className="space-y-1">
                  <label className="block">تصنيف العطل الفني</label>
                  <select
                    required
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-brand-primary rounded-xl outline-none"
                  >
                    <option value="">حدد قسم العطل الرئيسي...</option>
                    {categoriesList.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Priority switcher */}
                <div className="space-y-1">
                  <label className="block">درجة أهمية وأولولية العطل</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as 'low' | 'medium' | 'high')}
                    className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-brand-primary rounded-xl outline-none"
                  >
                    <option value="low">منخفضة (فحص عادي ودوري)</option>
                    <option value="medium">متوسطة (يستلزم المعالجة خلال 48 ساعة)</option>
                    <option value="high font-bold text-red-500">طارئة وعاجلة (طوارئ فورية)</option>
                  </select>
                </div>
              </div>

              {/* description text area */}
              <div className="space-y-1">
                <label className="block">وصف تفصيلي كامل للمشكلة أو النقص</label>
                <textarea
                  required
                  placeholder="أرجو ذكر التفاصيل بدقة مثل حدوث تسريب مياه طفيف أو عطل في مفتاح جداري..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full h-28 p-3 bg-slate-50 border border-slate-200 focus:border-brand-primary rounded-xl outline-none font-semibold text-slate-700 resize-none"
                />
              </div>

              {/* Simulated file upload drag & drop field */}
              <div className="space-y-1">
                <label className="block">رفع صور للمشكلة أو العجز (اختياري)</label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer relative ${
                    dragActive ? 'border-brand-accent bg-brand-primary/5' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="file"
                    id="file-upload-input"
                    multiple={false}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file-upload-input" className="cursor-pointer space-y-2 block">
                    <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="font-bold text-slate-600 block">قم بسحب وإفلات صورة العطل هنا أو تصفح ملفاتك</p>
                    <p className="text-[10px] text-slate-400 block font-semibold">يقبل كافة الصور والملحقات الفوتوغرافية حتى 10 ميغابايت</p>
                    {uploadedFileName && (
                      <span className="inline-block bg-brand-accent/20 text-brand-primary text-xxs font-black px-2 py-1 rounded-md animate-pulse">
                        الملف المختار: {uploadedFileName}
                      </span>
                    )}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-dark text-white font-black py-3 rounded-xl transition-all shadow-md text-sm cursor-pointer"
              >
                تقديم التذكرة وتسجيلها
              </button>
            </form>
          )}
        </section>

        {/* LIVE TICKET STATUS TRACKING PORTAL */}
        <section className="lg:col-span-5 bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-lg flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 justify-start flex-row-reverse border-b border-slate-100 pb-4">
              <History className="w-5 h-5 text-brand-accent" />
              <h3 className="font-black text-base md:text-lg text-brand-primary">تتبع واستعلام التذاكر المرفوعة</h3>
            </div>

            <p className="text-xxs text-slate-500 font-bold leading-normal">
              أدخل رقم التذكرة الخاص بك (مثل: <span className="font-semibold text-brand-primary">AFAQ-MNT-4850</span>) في صندوق البحث بالأسفل لتلقي تطورات الفحص والتعيين وتتبع حالة العمل والضمان الفني فورا وبدقة متناهية.
            </p>

            <form onSubmit={handleTrackSearch} className="flex gap-2 text-xs">
              <button
                type="submit"
                className="bg-brand-primary hover:bg-brand-dark text-white px-5 py-2.5 rounded-xl font-bold transition-all cursor-pointer"
              >
                استعلام
              </button>
              <input
                type="text"
                required
                placeholder="أدخل رقم التذكرة..."
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-primary outline-none text-right font-black"
              />
            </form>

            {/* Tracking output results container */}
            <div className="pt-4">
              <AnimatePresence mode="wait">
                {hasSearched ? (
                  trackedTicket ? (
                    <motion.div
                      key="tracked-info"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-slate-100 p-4 rounded-2xl bg-slate-50/50 space-y-4"
                    >
                      <div className="flex justify-between items-center flex-row-reverse border-b pb-2 text-xxs font-extrabold text-slate-400">
                        <span>{trackedTicket.createdAt}</span>
                        <span className="text-brand-primary">{trackedTicket.id}</span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div className="flex justify-between items-center flex-row-reverse">
                          <span className="text-slate-400 font-bold">العقار:</span>
                          <span className="font-black text-brand-primary">{trackedTicket.project}</span>
                        </div>
                        <div className="flex justify-between items-center flex-row-reverse">
                          <span className="text-slate-400 font-bold">الوحدة:</span>
                          <span className="font-black">{trackedTicket.unit}</span>
                        </div>
                        <div className="flex justify-between items-center flex-row-reverse">
                          <span className="text-slate-400 font-bold">القسم:</span>
                          <span className="font-bold">{trackedTicket.category}</span>
                        </div>
                      </div>

                      {/* Visual Flow indicator tracking */}
                      <div className="pt-4 border-t border-slate-100 space-y-3 font-bold text-xxs text-right">
                        <p className="text-slate-400 font-extrabold mb-1">مراحل وخطوات التطور والمعالجة:</p>
                        
                        {/* Step 1: Submited */}
                        <div className="flex items-center gap-2 justify-start flex-row-reverse">
                          <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center font-black">✓</div>
                          <span className="text-green-700">تم استلام طلب الصيانة وتسجيل التذكرة بنجاح</span>
                        </div>

                        {/* Step 2: Assigned */}
                        <div className="flex items-center gap-2 justify-start flex-row-reverse">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center font-black ${
                            ['in-progress', 'completed'].includes(trackedTicket.status)
                              ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'
                          }`}>{['in-progress', 'completed'].includes(trackedTicket.status) ? '✓' : '2'}</div>
                          <span className={['in-progress', 'completed'].includes(trackedTicket.status) ? 'text-green-700' : 'text-slate-400'}>
                            تم تعيين الفني المعماري المعتمد
                          </span>
                        </div>

                        {/* Step 3: In Progress */}
                        <div className="flex items-center gap-2 justify-start flex-row-reverse">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center font-black ${
                            trackedTicket.status === 'completed'
                              ? 'bg-green-500 text-white' : trackedTicket.status === 'in-progress'
                              ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-200 text-slate-400'
                          }`}>{trackedTicket.status === 'completed' ? '✓' : '3'}</div>
                          <span className={trackedTicket.status === 'completed' ? 'text-green-700' : trackedTicket.status === 'in-progress' ? 'text-amber-700 font-black' : 'text-slate-400'}>
                            جاري فحص العطل والعمل على التشطيب
                          </span>
                        </div>

                        {/* Step 4: Completed */}
                        <div className="flex items-center gap-2 justify-start flex-row-reverse">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center font-black ${
                            trackedTicket.status === 'completed'
                              ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'
                          }`}>{trackedTicket.status === 'completed' ? '✓' : '4'}</div>
                          <span className={trackedTicket.status === 'completed' ? 'text-green-700 font-black' : 'text-slate-400'}>
                            تم إصلاح العطل بنجاح وتسليم شهادة الجودة
                          </span>
                        </div>

                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no-ticket"
                      className="p-4 rounded-2xl bg-red-50 text-red-700 text-xs font-bold text-center flex items-center gap-2 justify-center"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span>عذراً، لم نجد أي تذاكر مطابقة للرقم المدخل. يرجى مراجعة التهجئة بدقة.</span>
                    </motion.div>
                  )
                ) : (
                  <div className="text-center py-10 text-slate-400 text-xs font-bold leading-normal">
                    لم تقم بالاستعلام عن تذكرة بعد. لإيجاد تذكرتك وقراءة حالتها، تفرغ بكتابة رقمها والضغط على زر الاستعلام.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center gap-3 bg-brand-primary/5 p-4 rounded-2xl flex-row-reverse">
            <span className="font-extrabold text-[#0D2E5E] text-xs">هل واجهت عطلاً يحتاج لتدخل فوري طارئ؟</span>
            <button
              onClick={() => window.open('https://wa.me/966551412498?text=طوارئ صيانة عاجلة بمشروع آفاق', '_blank')}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xxs font-black tracking-wide transition-colors cursor-pointer"
            >
              خط الصيانة الساخن
            </button>
          </div>
        </section>

      </div>

    </div>
  );
}
