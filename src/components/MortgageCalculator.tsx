/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Calendar, Percent, Landmark, ArrowLeftRight } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice?: number;
  projectName?: string;
  onClose?: () => void;
}

export default function MortgageCalculator({ initialPrice = 3000000, projectName, onClose }: MortgageCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [downpaymentPercent, setDownpaymentPercent] = useState(15); // standard Saudi downpayment percentage is usually 10-20%
  const [tenureYears, setTenureYears] = useState(20);
  const [profitRate, setProfitRate] = useState(4.55); // Standard Murabaha APR in Saudi Arabia

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [financeAmount, setFinanceAmount] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  const calculateMortgage = () => {
    const downpayment = (propertyPrice * downpaymentPercent) / 100;
    const loanAmount = propertyPrice - downpayment;
    setFinanceAmount(loanAmount);

    const monthlyRate = (profitRate / 100) / 12;
    const totalPayments = tenureYears * 12;

    if (monthlyRate === 0) {
      const pm = loanAmount / totalPayments;
      setMonthlyPayment(pm);
      setTotalPaid(loanAmount);
      setTotalProfit(0);
    } else {
      // Standard Formula for Amortization: P * r * (1 + r)^n / ((1 + r)^n - 1)
      const monthlyPay = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                         (Math.pow(1 + monthlyRate, totalPayments) - 1);
      
      setMonthlyPayment(monthlyPay);
      const paid = monthlyPay * totalPayments;
      setTotalPaid(paid);
      setTotalProfit(paid - loanAmount);
    }
  };

  useEffect(() => {
    calculateMortgage();
  }, [propertyPrice, downpaymentPercent, tenureYears, profitRate]);

  const formatSAR = (num: number) => {
    return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(num);
  };

  const downpaymentValue = (propertyPrice * downpaymentPercent) / 100;

  return (
    <div id="mortgage-calculator-card" className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-brand-primary p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-brand-light" />
          </div>
          <div>
            <h3 className="font-bold text-lg">حاسبة التمويل العقاري المتطورة</h3>
            <p className="text-xs text-white/80">
              {projectName ? `حساب التمويل التقريبي لمشروع ${projectName}` : 'احسب قيمة قسطك ومخطط تمويلك المتوافق مع الشريعة'}
            </p>
          </div>
        </div>
        {onClose && (
          <button 
            type="button" 
            onClick={onClose} 
            className="text-white hover:text-brand-light transition-colors text-sm font-semibold cursor-pointer"
          >
            إغلاق
          </button>
        )}
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sliders Area */}
        <div className="md:col-span-7 space-y-6">
          {/* Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700">قيمة العقار</span>
              <span className="text-brand-primary text-base font-bold">{formatSAR(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={1500000}
              max={25000000}
              step={100000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-xxs text-slate-400">
              <span>1.5 مليون ر.س</span>
              <span>25 مليون ر.س</span>
            </div>
          </div>

          {/* Downpayment % */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700">الدفعة الأولى ({downpaymentPercent}%)</span>
              <span className="text-brand-primary text-sm font-bold">{formatSAR(downpaymentValue)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={downpaymentPercent}
              onChange={(e) => setDownpaymentPercent(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-xxs text-slate-400">
              <span>10% (الحد الأدنى)</span>
              <span>80%</span>
            </div>
          </div>

          {/* Period */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700">مدة التمويل</span>
              <span className="text-brand-primary text-base font-bold">{tenureYears} سنة</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-xxs text-slate-400">
              <span>5 سنوات</span>
              <span>30 سنة</span>
            </div>
          </div>

          {/* Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 font-semibold text-sm">نسبة الربح السنوية (هامش المرابحة)</span>
              <span className="text-brand-primary text-base font-bold">{profitRate}%</span>
            </div>
            <input
              type="range"
              min={2.0}
              max={9.0}
              step={0.05}
              value={profitRate}
              onChange={(e) => setProfitRate(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-xxs text-slate-400">
              <span>2.0%</span>
              <span>9.0%</span>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="md:col-span-5 bg-brand-bg rounded-xl p-6 flex flex-col justify-between border border-slate-100">
          <div className="space-y-5">
            <div className="text-center pb-4 border-b border-slate-200">
              <p className="text-xs text-slate-500 font-bold mb-1">القسط الشهري المتوقع</p>
              <h4 className="text-2xl md:text-3xl font-extrabold text-brand-primary">
                {formatSAR(monthlyPayment)}
                <span className="text-xs font-normal text-slate-500 mr-1">/ شهر</span>
              </h4>
            </div>

            <div className="space-y-3.5">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>مبلغ التمويل الإجمالي:</span>
                <span className="text-brand-dark">{formatSAR(financeAmount)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>إجمالي الدفعة الأولى:</span>
                <span className="text-brand-dark">{formatSAR(downpaymentValue)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>إجمالي أرباح البنك التقريبية:</span>
                <span className="text-amber-700">{formatSAR(totalProfit)}</span>
              </div>
              <div className="flex justify-between text-xs font-extrabold text-slate-800 pt-3 border-t border-slate-200">
                <span>إجمالي ما سيتم سداده:</span>
                <span className="text-brand-primary">{formatSAR(totalPaid + downpaymentValue)}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-2 text-xxs text-slate-400 text-center leading-relaxed font-semibold">
              <Landmark className="w-4 h-4 text-brand-light flex-shrink-0" />
              <span>* الحسابات تقريبية واستباقية تختلف باختلاف الملاءة والراتب وجهات العمل وسكني.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const text = `السلام عليكم، أرغب في الاستفسار عن تمويل عقاري بقيمة ${formatSAR(propertyPrice)} بمشروع آفاق دفعة أولى ${downpaymentPercent}% وسنوات ${tenureYears}`;
                window.open(`https://wa.me/966551412498?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="w-full bg-brand-primary text-white py-2.5 rounded-xl font-bold shadow-lg hover:bg-brand-dark transition-all text-sm text-center block cursor-pointer"
            >
              تقديم طلب تمويل مباشر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
