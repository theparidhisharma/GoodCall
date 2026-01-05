import { useState, MouseEvent, TouchEvent } from 'react';
import { Check, X, History } from 'lucide-react';
import { WRAPPED_ITEMS } from '../config';

interface WrappedViewProps {
  onReset: () => void;
}

export const WrappedView = ({ onReset }: WrappedViewProps) => {
  const [wrappedIndex, setWrappedIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [currentDrag, setCurrentDrag] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const handleDragStart = (e: TouchEvent | MouseEvent) => {
    if (exitDirection) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    setDragStart(clientX);
  };

  const handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (dragStart === null || exitDirection) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    setCurrentDrag(clientX - dragStart);
  };

  const handleDragEnd = () => {
    if (dragStart === null || exitDirection) return;
    const threshold = 100;
    if (currentDrag > threshold) {
      triggerSwipe('right');
    } else if (currentDrag < -threshold) {
      triggerSwipe('left');
    } else {
      setCurrentDrag(0);
    }
    setDragStart(null);
  };

  const triggerSwipe = (direction: 'left' | 'right') => {
    setExitDirection(direction);
    setTimeout(() => {
        setWrappedIndex(prev => prev + 1);
        setCurrentDrag(0);
        setExitDirection(null);
    }, 300);
  };

  const item = WRAPPED_ITEMS[wrappedIndex];
  if (!item) {
     return (
       <div className="h-full w-full bg-stone-100 flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
              <Check size={48} className="text-white" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-black text-stone-900 mb-2 tracking-tight">All Caught Up</h2>
          <p className="text-stone-500 mb-10 font-medium text-lg">Your recurring list is updated.</p>
          <button onClick={() => {setWrappedIndex(0); onReset();}} className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform">Start New Scan</button>
       </div>
     )
  }

  const cardStyle = {
    transform: exitDirection 
      ? `translateX(${exitDirection === 'right' ? 500 : -500}px) rotate(${exitDirection === 'right' ? 25 : -25}deg)` 
      : `translateX(${currentDrag}px) rotate(${currentDrag * 0.08}deg)`,
    transition: exitDirection ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : dragStart !== null ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
    cursor: dragStart !== null ? 'grabbing' : 'grab'
  };
  const likeOpacity = Math.max(0, Math.min(currentDrag / 100, 1));
  const nopeOpacity = Math.max(0, Math.min(-currentDrag / 100, 1));

  return (
    <div className="h-full w-full bg-[#E8E8E6] relative overflow-hidden flex flex-col touch-none">
      <div className="pt-20 px-8 pb-4 z-10">
        <h1 className="text-4xl font-black text-stone-800 tracking-tighter mb-1">Monthly Check</h1>
        <p className="text-stone-500 font-medium">Reviewing {WRAPPED_ITEMS.length} recurring items</p>
      </div>

      <div className="flex-1 relative flex items-center justify-center p-4 perspective-[1000px]">
         <div className="absolute w-[82%] h-[60%] bg-[#D4D4D0] rounded-[44px] translate-y-10 scale-90 opacity-100"></div>
         <div className="absolute w-[88%] h-[60%] bg-[#DDDDDA] rounded-[44px] translate-y-5 scale-95 opacity-100 shadow-xl"></div>
         
         <div 
           className="relative w-full max-w-sm aspect-[3/4.4] bg-white rounded-[44px] shadow-[0_40px_80px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col border border-white/60 touch-none select-none z-10"
           style={cardStyle}
           onMouseDown={handleDragStart}
           onMouseMove={handleDragMove}
           onMouseUp={handleDragEnd}
           onMouseLeave={handleDragEnd}
           onTouchStart={handleDragStart}
           onTouchMove={handleDragMove}
           onTouchEnd={handleDragEnd}
         >
            <div className="absolute inset-0 bg-emerald-500/10 z-20 pointer-events-none flex items-center justify-center transition-opacity" style={{ opacity: likeOpacity }}>
                <div className="border-8 border-emerald-500/50 text-emerald-600 text-5xl font-black uppercase tracking-widest px-6 py-2 rounded-2xl rotate-[-15deg] backdrop-blur-sm">Keep</div>
            </div>
            <div className="absolute inset-0 bg-rose-500/10 z-20 pointer-events-none flex items-center justify-center transition-opacity" style={{ opacity: nopeOpacity }}>
                <div className="border-8 border-rose-500/50 text-rose-600 text-5xl font-black uppercase tracking-widest px-6 py-2 rounded-2xl rotate-[15deg] backdrop-blur-sm">Drop</div>
            </div>

            <div className="h-[60%] w-full relative group p-4">
              <div className="w-full h-full rounded-[32px] overflow-hidden relative shadow-inner">
                  <img src={item.image} className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4">
                      <span className="bg-black/30 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">{item.subtitle}</span>
                  </div>
              </div>
            </div>

            <div className="p-8 pt-2 flex-1 flex flex-col justify-between">
              <div>
                 <h2 className="text-4xl font-black text-stone-900 leading-[0.9] tracking-tighter mb-4">{item.name}</h2>
                 <div className="flex gap-4">
                    <div>
                        <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Price</div>
                        <div className="text-xl font-bold text-stone-800">{item.price}</div>
                    </div>
                    <div className="w-px h-8 bg-stone-200"></div>
                    <div>
                        <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Monthly</div>
                        <div className="text-xl font-bold text-stone-800">{item.spent}</div>
                    </div>
                 </div>
              </div>
            </div>
         </div>
      </div>

      <div className="pb-12 px-10 flex justify-center items-center gap-6 z-20">
         <button onClick={() => triggerSwipe('left')} className="w-16 h-16 rounded-full bg-white border border-stone-200 text-stone-400 flex items-center justify-center shadow-lg hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all active:scale-90"><X size={28} strokeWidth={3} /></button>
         <button className="w-12 h-12 rounded-full bg-white border border-stone-200 text-stone-400 flex items-center justify-center shadow-md active:scale-90"><History size={20} /></button>
         <button onClick={() => triggerSwipe('right')} className="w-20 h-20 rounded-[32px] bg-stone-900 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"><Check size={36} strokeWidth={4} /></button>
      </div>
    </div>
  );
};
