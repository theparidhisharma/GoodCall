import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface KeyTradeoffProps {
  upside?: string[];
  downside?: string[];
}

export const KeyTradeoff = ({ upside, downside }: KeyTradeoffProps) => {
  if ((!upside || upside.length === 0) && (!downside || downside.length === 0)) return null;
  return (
    <div className="flex flex-col gap-3 mt-6">
      {upside && upside.length > 0 && (
        <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl flex items-start gap-3">
            <ThumbsUp size={18} className="text-emerald-600 mt-0.5 shrink-0" />
            <div>
               <span className="block text-xs font-bold text-emerald-800 uppercase mb-1">Why it fits</span>
               <div className="flex flex-wrap gap-2">
                 {upside.map((tag, i) => (
                   <span key={i} className="text-sm font-medium text-emerald-900 bg-emerald-100/50 px-2 py-0.5 rounded">{tag}</span>
                 ))}
               </div>
            </div>
        </div>
      )}
      
      {downside && downside.length > 0 && (
        <div className="bg-rose-50/50 border border-rose-100 p-4 rounded-2xl flex items-start gap-3">
            <ThumbsDown size={18} className="text-rose-600 mt-0.5 shrink-0" />
            <div>
               <span className="block text-xs font-bold text-rose-800 uppercase mb-1">Issues Detected</span>
               <div className="flex flex-wrap gap-2">
                 {downside.map((tag, i) => (
                   <span key={i} className="text-sm font-medium text-rose-900 bg-rose-100/50 px-2 py-0.5 rounded">{tag}</span>
                 ))}
               </div>
            </div>
        </div>
      )}
    </div>
  );
};
