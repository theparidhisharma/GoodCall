import { ChevronLeft, BrainCircuit } from 'lucide-react';
import { ViewState, ProductData, Goal } from '../types';

interface AnalysisViewProps {
  activeProduct: ProductData;
  activeGoal: Goal;
  onSetView: (view: ViewState) => void;
}

export const AnalysisView = ({ activeProduct, activeGoal, onSetView }: AnalysisViewProps) => {
  return (
    <div className="h-full w-full bg-stone-950 flex flex-col p-6 pt-16 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-4 mb-6">
            <button onClick={() => onSetView('decision')} className="bg-white/10 p-3 rounded-full text-white hover:bg-white/20">
                <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-black text-white tracking-tight">AI Reasoning</h1>
        </div>
        
        <div className="bg-stone-900 p-6 rounded-3xl border border-stone-800 flex-1 overflow-y-auto">
            <div className="flex items-start gap-4 mb-6">
                <BrainCircuit className="text-emerald-400 shrink-0" size={32} />
                <div>
                    <h3 className="text-white font-bold text-lg">Goal Alignment</h3>
                    <p className="text-stone-400 text-sm mt-1">Analyzing against: <span className="text-emerald-300 font-bold">{activeGoal.label}</span></p>
                </div>
            </div>

            <div className="space-y-8 relative">
                <div className="absolute top-2 left-[19px] w-[2px] h-full bg-stone-800 -z-10" />

                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center shrink-0 border border-stone-700 text-stone-400 font-bold text-sm">1</div>
                    <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Ingredients Detected</div>
                        <p className="text-stone-300 text-sm leading-relaxed">
                            {activeProduct.name} contains key ingredients relevant to your goal. The AI identified {activeProduct.pros.length > 0 ? "positive markers like " + activeProduct.pros[0] : "potential issues"}.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center shrink-0 border border-stone-700 text-stone-400 font-bold text-sm">2</div>
                    <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Reasoning Chain</div>
                        <p className="text-stone-300 text-sm leading-relaxed">
                            {activeProduct.reason}
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border text-white font-bold text-sm ${activeProduct.sentiment === 'positive' ? 'bg-emerald-500 border-emerald-400' : activeProduct.sentiment === 'negative' ? 'bg-rose-500 border-rose-400' : 'bg-amber-500 border-amber-400'}`}>
                        {activeProduct.matchScore}%
                    </div>
                    <div>
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Final Verdict</div>
                        <p className="text-white font-bold text-lg">{activeProduct.verdict}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
