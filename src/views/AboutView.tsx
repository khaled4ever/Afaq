/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Lightbulb, ShieldCheck, Compass, Heart, Users2 } from 'lucide-react';

export default function AboutView() {
  
  const coreValues = [
    {
      title: 'رؤيتنـا',
      content: 'أن نكون المطور العقاري الوطني الرائد والأول في صياغة أنماط الحياة الفندقية الفاخرة والمجتمعات الذكية المستدامة بما يتناغم مع رؤية المملكة 2030.',
      icon: Target,
      color: 'bg-brand-primary text-white'
    },
    {
      title: 'رسالتنـا',
      content: 'توفير منتجات عقارية بالغة المتانة والجمال تلبي تطلعات ساكنيها بفضل الابتكار الهندسي، الالتزام بالدقة المطلقة، والنزاهة الكاملة في عقود جودة البناء.',
      icon: Lightbulb,
      color: 'bg-brand-accent text-brand-dark'
    },
    {
      title: 'قيمنـا الإنشائية',
      content: 'نؤمن بالشفافية المطلقة، الجودة المعيارية، الابتكار في كفاءة الطاقة، والمسؤولية الكاملة عن خدمة عملائنا وصيانة أصولهم لأجيال قادمة.',
      icon: ShieldCheck,
      color: 'bg-slate-50 text-slate-800'
    }
  ];

  const milestones = [
    {
      year: '2018 م',
      title: 'البداية والتأسيس بالرياض',
      desc: 'انطلقت مسيرة شركة آفاق النشأة للتطوير العقاري بسجل تجاري معتمد وبتعاقدات كفاءات فنية لتقديم حلول تطويرية مبتكرة بالرياض.'
    },
    {
      year: '2020 م',
      title: 'سلسلة مجمعات النرجس السكنية',
      desc: 'تم البدء الفعلي وإطلاق أوائل مجمعاتنا السكنية الفاخرة بحي النرجس شمال العاصمة الرياض، وحازت بيعاً بالكامل في وقت قياسي لإحكام جودة التشطيب.'
    },
    {
      year: '2022 م',
      title: 'عقد شراكات بنوك تملك آفاق',
      desc: 'تحقيق شراكة واعتمادات استحقاق مع وزارة الإسكان - سكني، وكافة المصارف السعودية الكبرى كراجحي والأهلي وسكني لتسهيل تملك العملاء.'
    },
    {
      year: '2024 م',
      title: 'التوسع الإقليمي بمدينة جدة',
      desc: 'امتداد الطاقات الإنشائية للشركة لعروس البحر الأحمر جدة لإنشاء أبراج سكنية وإطلالات بحرية بانورامية بمعايير المباني الخضراء.'
    },
    {
      year: '2026 م',
      title: 'ريادة البيوت الذكية المستدامة',
      desc: 'تطبيق أنظمة التحكم بالذكاء الاصطناعي، وأجهزة كفاءة الطاقة كقاعدة أصيلة بجميع وحدات آفاق تطلعاً للاستدامة والتوفير وحفظ الأصول.'
    }
  ];

  return (
    <div id="about-view-stage" className="pt-24 pb-20 space-y-24">
      
      {/* 1. Page Title section */}
      <section className="bg-brand-primary text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#071C3D] opacity-80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xxs font-black text-brand-accent tracking-widest uppercase">تاريخ من الريادة المعمارية</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black">شركة آفاق النشأة للتطوير العقاري</h2>
          <p className="text-xs md:text-sm text-slate-300 font-semibold max-w-2xl mx-auto">
            منذ انطلاقتنا ونحن نضع جودة البناء، وجمال التفاصيل المعمارية، وراحة السكان كأهم مرتكزات التطوير العقاري المعاصر بالمملكة.
          </p>
        </div>
      </section>

      {/* 2. Brand identity vision details */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
        {coreValues.map((val, idx) => {
          const IconComp = val.icon;
          return (
            <div key={idx} className={`rounded-3xl p-8 border border-slate-100 shadow-md space-y-4 transition-all hover:shadow-lg flex flex-col justify-between ${val.color}`}>
              <div>
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-current mb-4">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black">{val.title}</h3>
                <p className="text-xs leading-relaxed opacity-90 font-semibold pt-2">{val.content}</p>
              </div>

              <div className="pt-6 border-t border-current/10 text-xxs font-extrabold flex items-center gap-1">
                <span>تطبيق معايير الكود السعودي للبناء</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Detailed executive block about Afaq Al Nasha */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-right">
        {/* Left text description */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-brand-light font-extrabold text-xs block">موطن الريادة والتملك</span>
            <h3 className="text-xl md:text-2.5xl font-black text-brand-primary">نبني لمستقبل واعد ومستدام</h3>
          </div>

          <div className="text-xs md:text-sm text-slate-600 leading-relaxed font-semibold space-y-4">
            <p>
              تأسست شركة **آفاق النشأة للتطوير العقاري** برؤية وطنية طموحة تسعى لإحداث نقلة نوعية حقيقية في مفهوم السكن والاستثمار المعماري بالمملكة العربية السعودية. نحن لسنا مجرد شركة بناء، بل صُنّاع بيئات سكنية وحضرية تضمن رفاهية العيش وهدوء البال لجميع أفراد الأسرة.
            </p>
            <p>
              نرتكز في مسيرتنا الرائدة على التزامنا الصارم بأعلى مستويات الجودة الفنية وعقود الضمان الممتدة. نتولى الإشراف المباشر والدقيق على كافة مراحل المقاولة والتشطيب من خلال كوادر هندسية وطنية ومستشارين دوليين معتمدين، مما يرسخ الثقة والاطمئنان بيننا وبين عائلتنا الكبرى من مستملكي وحدات آفاق.
            </p>
            <p>
              مشاريعنا السكنية المتميزة - في شمال الرياض وعلى ساحل جدة الخلاب - تُعد قصص نجاح حية تجمع بين الفخامة المعاصرة، وبنود كفاءة الطاقة والبيوت الذكية سهلة التحكم، وتوفر بيئة حضرية راقية تدعم الصحة النفسية والجسدية لأجيالنا القادمة باقتدار.
            </p>
          </div>

          <div className="flex gap-6 pt-4 border-t border-slate-100 flex-row-reverse text-right">
            <div>
              <span className="text-lg md:text-xl font-black text-brand-primary block">+8 سنوات</span>
              <span className="text-[10px] text-slate-400 font-bold block">التزام لا يتزحزح</span>
            </div>
            <div className="border-l border-slate-200" />
            <div>
              <span className="text-lg md:text-xl font-black text-brand-primary block">100% جهوزية</span>
              <span className="text-[10px] text-slate-400 font-bold block">مطابقة تامة للكود والضمانات</span>
            </div>
          </div>
        </div>

        {/* Right side background image decorator */}
        <div className="lg:col-span-5 h-80 md:h-[450px] rounded-3xl overflow-hidden relative shadow-2xl border border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
            alt="deluxe smart luxury property building structure" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply pointer-events-none" />
          <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-100/40 text-right space-y-1">
            <h4 className="font-extrabold text-xs text-brand-primary leading-tight">شعارنا في آفاق النشأة:</h4>
            <p className="text-xxs text-slate-500 font-bold">"الجودة هي الإرث الحقيقي للتطوير العقاري"</p>
          </div>
        </div>
      </section>

      {/* 4. Timeline development history */}
      <section className="bg-brand-bg py-20 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-right space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-brand-light font-extrabold text-xs block">خطوات المجد المعماري</span>
            <h3 className="text-xl md:text-2.5xl font-black text-brand-primary">محطات مسيرتنا ونمو مشاريعنا بالخط الزمني</h3>
          </div>

          <div className="relative border-r-2 border-brand-primary/15 mr-4 md:mr-8 space-y-12 py-2">
            {milestones.map((mil, index) => (
              <div key={index} className="relative pr-8">
                
                {/* Visual pin on timeline line */}
                <div className="absolute top-1.5 -right-[9px] w-4 h-4 rounded-full bg-brand-accent border-4 border-white shadow-md z-10 animate-pulse" />

                <div className="space-y-1">
                  <span className="inline-block bg-brand-primary text-brand-accent text-[10px] font-black px-3 py-1 rounded-md mb-2">
                    {mil.year}
                  </span>
                  <h4 className="font-extrabold text-sm md:text-base text-slate-800">
                    {mil.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-xl font-semibold">
                    {mil.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Executive Board speech */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 text-center">
        <div className="space-y-2">
          <span className="text-brand-light font-extrabold text-xs block">مجلس الإدارة والنهج الرشيد</span>
          <h3 className="text-xl md:text-2xl font-black text-brand-primary">خبراء الإشراف وهندسة الفخامة بمجموعة آفاق</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Member 1 */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 text-center space-y-4 shadow-xs">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 mx-auto border-2 border-brand-accent shadow-md">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Chairman" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-800">المهندس خالد بن عبدالعزيز بن نشأة</h4>
              <p className="text-[10px] text-brand-light font-bold">الرئيس التنفيذي ومؤسس المجموعة</p>
            </div>
            <p className="text-xxs text-slate-400 leading-relaxed font-bold">
              "نهدف من آفاق النشأة إلى بناء مجتمعات تمخر عباب التميز، وشهادتنا الحقيقية هي رضا قاطني فللنا على المدى الطويل."
            </p>
          </div>

          {/* Member 2 */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 text-center space-y-4 shadow-xs">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 mx-auto border-2 border-brand-accent shadow-md">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" alt="Executive Director" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-800">الأستاذة عواطف السويلم</h4>
              <p className="text-[10px] text-brand-light font-bold">مديرة التخطيط والتحالفات الاستراتيجية</p>
            </div>
            <p className="text-xxs text-slate-400 leading-relaxed font-bold">
              "نحن نضمن الهيكلة والحلول التمويلية الأفضل للرواد والمستثمرين لنمزج السكن المريح بأفخم عوائد الاستثمار."
            </p>
          </div>

          {/* Member 3 */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 text-center space-y-4 shadow-xs">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 mx-auto border-2 border-brand-accent shadow-md">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" alt="Technical Advisor" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-800">الخبير الهندسي ماجد العنزي</h4>
              <p className="text-[10px] text-brand-light font-bold">مدير الرقابة الفنية وضمان الجودة</p>
            </div>
            <p className="text-xxs text-slate-400 leading-relaxed font-bold">
              "نطبق فحوصات جودة شديدة الصرامة على كافة خرسانات، حديد، وتمديدات المباني لخلق أمان يفوق المتوقع."
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
