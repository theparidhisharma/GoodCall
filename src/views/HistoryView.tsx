import { ChevronLeft, History, ChevronRight } from 'lucide-react';
import { ViewState, ProductData } from '../types';

interface HistoryViewProps {
  scanHistory: ProductData[];
  onSetView: (view: ViewState) => void;
  onSetActiveProduct: (product: ProductData) => void;
}

export const HistoryView = ({ scanHistory, onSetView, onSetActiveProduct }: HistoryViewProps) => {
  return (
    <div className="h-full w-full bg-stone-950 flex flex-col p-6 pt-16 animate-in slide-in-from-right duration-300">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => onSetView('camera')} className="bg-white/10 p-3 rounded-full text-white hover:bg-white/20">
                <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl font-black text-white tracking-tight">Session History</h1>
        </div>

        {scanHistory.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <History size={48} className="text-stone-600 mb-4" />
                <p className="text-stone-400">No items scanned yet.</p>
            </div>
        ) : (
            <div className="flex flex-col gap-4 overflow-y-auto pb-10">
                {scanHistory.map((item, idx) => (
                    <button key={idx} onClick={() => { onSetActiveProduct(item); onSetView('decision'); }} className="bg-stone-900 rounded-2xl p-4 flex items-center gap-4 border border-stone-800 text-left hover:bg-stone-800 transition-colors">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div className="flex-1">
                            <div className="text-white font-bold">{item.name}</div>
                            <div className={`text-xs font-bold uppercase tracking-wider mt-1 ${item.sentiment === 'positive' ? 'text-emerald-400' : item.sentiment === 'negative' ? 'text-rose-400' : 'text-amber-400'}`}>
                                {item.verdict}
                            </div>
                        </div>
                        <ChevronRight className="text-stone-600" size={16} />
                    </button>
                ))}
            </div>
        )}
    </div>
  );
};
