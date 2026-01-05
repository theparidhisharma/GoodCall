import { X, Activity } from 'lucide-react';
import { MOCK_COMPARISON_GOOD, MOCK_COMPARISON_BAD } from '../config';

interface CompareViewProps {
  onReset: () => void;
}

export const CompareView = ({ onReset }: CompareViewProps) => {
  return (
    <div className="h-full w-full flex flex-col bg-stone-950 animate-in fade-in duration-500">
      <div className="relative flex-[1.4] z-10 rounded-b-[48px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border-b border-white/10">
          <img src={MOCK_COMPARISON_GOOD.image} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
          
          <div className="absolute bottom-0 w-full p-8 pb-10">
              <div className="flex items-center gap-2 mb-3">
                  <span className="bg-emerald-500 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/30">Protocol Match</span>
                  <span className="bg-white/10 backdrop-blur text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-white/10">94% Fit</span>
              </div>
              <h2 className="text-4xl font-black text-white leading-none mb-4">{MOCK_COMPARISON_GOOD.name}</h2>
              
              <div className="bg-stone-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-2">
                 <div className="flex items-start gap-3">
                    <Activity size={18} className="text-emerald-400 mt-1" />
                    <div>
                       <div className="text-xs font-bold text-stone-300 uppercase mb-1">Why pay ₹150 more?</div>
                       <div className="text-white text-sm font-medium leading-snug">
                         This option uses <span className="text-emerald-300">Enzymatic Hydrolysis</span> instead of added sugar. Better for your insulin response goal.
                       </div>
                    </div>
                 </div>
              </div>
          </div>
      </div>

      <div className="h-0 relative z-20 flex items-center justify-center">
          <div className="bg-stone-900 text-white font-black text-xs p-3 rounded-full border-4 border-stone-800 shadow-2xl relative -top-6">
              VS
          </div>
      </div>

      <div className="relative flex-1 group overflow-hidden bg-stone-900">
        <img src={MOCK_COMPARISON_BAD.image} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale transition-opacity duration-500 group-hover:opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 w-full p-8">
             <h2 className="text-xl font-bold text-stone-400 mb-1">{MOCK_COMPARISON_BAD.name}</h2>
             <p className="text-sm text-stone-500 font-medium">Lower protein, higher sugar content.</p>
        </div>
      </div>

      <button onClick={onReset} className="absolute top-12 left-6 z-50 bg-white/10 backdrop-blur-md border border-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-colors">
        <X size={20} />
      </button>
    </div>
  );
};
