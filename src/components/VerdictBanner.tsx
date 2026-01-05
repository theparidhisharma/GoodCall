import { Zap, AlertTriangle, EyeOff, Activity, Flame, IndianRupee, ChevronRight } from 'lucide-react';
import { Sentiment, ProductData } from '../types';
import { MatchScoreRing } from './MatchScoreRing';

interface VerdictBannerProps {
  sentiment: Sentiment;
  title: string;
  reason: string;
  product: ProductData;
  onViewAnalysis: () => void;
}

export const VerdictBanner = ({ sentiment, title, reason, product, onViewAnalysis }: VerdictBannerProps) => {
  let icon = <Zap size={20} className="text-emerald-600" fill="currentColor" />;
  let bgClass = "bg-emerald-100";
  
  if (sentiment === 'negative') {
      icon = <AlertTriangle size={20} className="text-rose-600" />;
      bgClass = "bg-rose-100";
  } else if (sentiment === 'uncertain') {
      icon = <EyeOff size={20} className="text-amber-600" />;
      bgClass = "bg-amber-100";
  }

  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgClass}`}>
                  {icon}
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{product.brand}</span>
                 <span className="text-sm font-semibold text-stone-800">{product.name}</span>
              </div>
           </div>
           <MatchScoreRing score={product.matchScore} sentiment={sentiment} />
        </div>

        <div className="h-px w-full bg-stone-100" />

        <div>
          <h1 className="text-[32px] leading-[0.95] font-black tracking-tighter mb-2 text-stone-900">
              {title}
          </h1>
          <p className="text-[16px] leading-relaxed text-stone-500 font-medium">
              {reason}
          </p>
        </div>
        
        <div className="flex gap-2 mt-2">
            {sentiment === 'uncertain' ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-100 w-full">
                    <Activity size={14} className="text-amber-500" />
                    <span className="text-xs font-bold text-amber-700">Missing detailed breakdown</span>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 rounded-lg border border-stone-100">
                        <Flame size={14} className="text-orange-500" fill="currentColor" />
                        <span className="text-xs font-bold text-stone-600">{product.calories} kcal</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 rounded-lg border border-stone-100">
                        <IndianRupee size={14} className="text-green-600" />
                        <span className="text-xs font-bold text-stone-600">{product.price}</span>
                    </div>
                    <button onClick={onViewAnalysis} className="ml-auto flex items-center gap-1 px-3 py-1.5 bg-stone-900 rounded-lg text-white text-xs font-bold active:scale-95 transition-transform">
                        Analysis <ChevronRight size={12} />
                    </button>
                </>
            )}
        </div>
    </div>
  );
};
