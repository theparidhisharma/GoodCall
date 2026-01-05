import { AlertTriangle } from 'lucide-react';

interface WarningViewProps {
  onReset: () => void;
}

export const WarningView = ({ onReset }: WarningViewProps) => {
  return (
    <div className="h-full w-full bg-stone-950 flex flex-col relative animate-in zoom-in-95 duration-300 overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-red-900/40 to-transparent pointer-events-none" />
       
       <div className="relative z-10 flex flex-col h-full p-8 pt-32">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="relative mb-10">
                   <div className="absolute inset-0 bg-red-500 blur-2xl opacity-40 animate-pulse"></div>
                   <div className="bg-gradient-to-br from-red-500 to-rose-700 w-24 h-24 rounded-[32px] flex items-center justify-center shadow-2xl relative z-10 ring-4 ring-red-900/50">
                      <AlertTriangle size={48} className="text-white" strokeWidth={2.5} />
                   </div>
                </div>
                
                <h1 className="text-white text-[48px] leading-[0.9] font-black mb-6 tracking-tighter">
                    Critical<br/><span className="text-red-500">Conflict</span>
                </h1>
                
                <div className="bg-red-950/50 border border-red-500/20 rounded-2xl p-4 w-full backdrop-blur-sm">
                   <div className="text-red-200 text-xs font-bold uppercase tracking-widest mb-1">Detected Ingredient</div>
                   <div className="text-white text-xl font-bold">Peanut Derivatives</div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button onClick={onReset} className="w-full bg-white hover:bg-stone-200 text-black font-black text-lg py-5 rounded-[24px] shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all">
                    PUT IT BACK
                </button>
                <button className="w-full bg-red-950/30 hover:bg-red-900/50 border border-red-500/20 text-red-200 font-bold text-sm py-4 rounded-[24px] transition-colors">
                    IGNORE WARNING
                </button>
            </div>
       </div>
    </div>
  );
};
