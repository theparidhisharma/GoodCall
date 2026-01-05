import { useState } from 'react';
import { MapPin, Clock, User, History, BrainCircuit, Check, X, EyeOff, ArrowRight, ChevronRight, Barcode } from 'lucide-react';
import { ViewState, Goal, ProductData } from '../types';
import { SCENARIO_IMAGES } from '../config';

interface CameraViewProps {
  scanning: boolean;
  scanStep: number;
  activeGoal: Goal;
  location: string;
  time: string;
  bgImage: string;
  onSetView: (view: ViewState) => void;
  onSimulateScan: (scenario: 'good' | 'bad' | 'uncertain') => void;
}

export const CameraView = ({ scanning, scanStep, activeGoal, location, time, bgImage, onSetView, onSimulateScan }: CameraViewProps) => {
  const scanLabels = ["Ready", "Scanning Barcode...", "Analyzing Ingredients...", `Checking '${activeGoal.label}' Protocol...`];
  const scanColor = ["text-white", "text-emerald-400", "text-blue-400", activeGoal.color.replace('text-', 'text-')]; 

  return (
    <div className="relative h-full w-full bg-black">
      {/* Contextual HUD Header */}
      <div className="absolute top-0 w-full z-20 pt-16 pb-6 px-6 bg-gradient-to-b from-black/90 to-transparent flex flex-col items-center">
          {/* Location Pill */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-3 mb-4 shadow-lg">
             <div className="flex items-center gap-1.5">
                <MapPin size={10} className="text-stone-400" />
                <span className="text-[10px] font-bold text-stone-200 uppercase tracking-widest">{location}</span>
             </div>
             <div className="w-px h-3 bg-white/20"></div>
             <div className="flex items-center gap-1.5">
                <Clock size={10} className="text-stone-400" />
                <span className="text-[10px] font-bold text-stone-200">{time}</span>
             </div>
          </div>

          <div className="w-full flex justify-between items-start">
            {/* Profile / Goal Button */}
            <button onClick={() => onSetView('goals')} className="flex items-center gap-3 group">
                <div className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors ${activeGoal.bg}`}>
                    <User size={18} className="text-white" />
                </div>
                <div className="text-left">
                    <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest group-hover:text-white transition-colors">Active Protocol</div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      {activeGoal.label} 
                      <div className={`w-2 h-2 rounded-full animate-pulse bg-emerald-500`}/>
                    </div>
                </div>
            </button>
            
            <button onClick={() => onSetView('history')} className="w-10 h-10 rounded-full bg-stone-900/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-stone-800 transition-colors">
                <History size={18} className="text-white" />
            </button>
          </div>
      </div>

      {/* Realistic Camera Background (Aisle POV) with Fallback */}
      <div className="w-full h-full bg-stone-800 relative">
          <img 
          src={bgImage} 
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          className={`w-full h-full object-cover transition-all duration-700 ${scanning ? 'opacity-40 scale-105 blur-sm' : 'opacity-80 scale-100'}`}
          alt="Grocery Aisle Camera Feed"
          />
          <div className="absolute inset-0 bg-stone-800 -z-10 flex items-center justify-center">
              <span className="text-stone-600 font-bold">Camera Feed</span>
          </div>
      </div>
      
      {/* Realistic HUD Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className={`relative transition-all duration-500 ease-out ${scanning ? 'w-64 h-64' : 'w-72 h-72'}`}>
            
            {/* Grid Overlay inside Reticle */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${scanning ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-full h-full border border-emerald-500/30 rounded-[32px] overflow-hidden grid grid-cols-3 grid-rows-3">
                    {[...Array(9)].map((_, i) => <div key={i} className="border border-emerald-500/10"></div>)}
                </div>
            </div>

            {/* Corner Brackets */}
            <div className={`absolute inset-0 rounded-[40px] transition-all duration-300 ${scanning ? 'scale-100 opacity-100' : 'scale-105 opacity-60'}`}>
                <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-white rounded-tl-[32px] -mt-1 -ml-1"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-[3px] border-r-[3px] border-white rounded-tr-[32px] -mt-1 -mr-1"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[3px] border-l-[3px] border-white rounded-bl-[32px] -mb-1 -ml-1"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-white rounded-br-[32px] -mb-1 -mr-1"></div>
            </div>

            {/* Simulated Barcode Scanning Line */}
            <div className={`absolute inset-0 rounded-[36px] overflow-hidden transition-all duration-300 ${scanning ? 'opacity-100' : 'opacity-0'}`}>
                 <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500/50"></div>
                 <div className="absolute top-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,1)] animate-[scan_1.5s_infinite_linear]"></div>
            </div>
            
            {/* "Scanning" Barcode Graphic */}
             {scanning && (
               <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <Barcode size={120} className="text-white animate-pulse" />
               </div>
             )}
        </div>

        {/* Dynamic Labels - The "AI Brain" part */}
        <div className="absolute bottom-32 flex flex-col items-center gap-4">
            {scanning && (
                <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 bg-stone-900/60 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full shadow-2xl">
                         <BrainCircuit size={16} className={`${scanColor[scanStep]} animate-pulse`} />
                         <span className={`${scanColor[scanStep]} text-xs font-bold tracking-widest uppercase transition-colors duration-300`}>
                           {scanLabels[scanStep]}
                         </span>
                    </div>
                </div>
            )}
        </div>

        {/* Bottom Simulation Menu (Only when NOT scanning) */}
        <div className="absolute bottom-6 left-0 w-full z-30 pointer-events-auto flex justify-center px-6">
          {!scanning && (
              <div className="group w-full max-w-md bg-black/40 hover:bg-black/90 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-[32px] p-4 hover:p-6 transition-all duration-300 ease-out shadow-lg overflow-hidden h-[60px] hover:h-auto">
                  {/* Header (Always Visible) */}
                  <div className="flex items-center justify-between mb-0 group-hover:mb-6 transition-all">
                      <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-white/90 font-bold text-sm tracking-wide">Simulation Ready</span>
                      </div>
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest group-hover:opacity-100 opacity-0 transition-opacity">Select Scenario</span>
                      <ChevronRight className="text-white/40 rotate-[-90deg] group-hover:rotate-90 transition-transform duration-300" size={20} />
                  </div>

                  {/* Grid Content (Visible on Hover) */}
                  <div className="grid grid-cols-2 gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      <button onClick={() => onSimulateScan('good')} className="group/btn bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/50 p-4 rounded-2xl flex flex-col gap-3 transition-all">
                         <div className="flex justify-between items-start">
                             <span className="text-emerald-400 group-hover/btn:scale-110 transition-transform"><Check size={20} /></span>
                         </div>
                         <div className="text-left">
                             <div className="text-white font-bold text-sm">Healthy Scan</div>
                             <div className="text-white/40 text-[10px] font-medium mt-0.5">Oatly Barista</div>
                         </div>
                      </button>
                      
                      <button onClick={() => onSimulateScan('bad')} className="group/btn bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/50 p-4 rounded-2xl flex flex-col gap-3 transition-all">
                         <div className="flex justify-between items-start">
                             <span className="text-rose-400 group-hover/btn:scale-110 transition-transform"><X size={20} /></span>
                         </div>
                         <div className="text-left">
                             <div className="text-white font-bold text-sm">Unhealthy Scan</div>
                             <div className="text-white/40 text-[10px] font-medium mt-0.5">Sugary Puffs</div>
                         </div>
                      </button>

                      <button onClick={() => onSimulateScan('uncertain')} className="group/btn bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/50 p-4 rounded-2xl flex flex-col gap-3 transition-all">
                         <div className="flex justify-between items-start">
                             <span className="text-amber-400 group-hover/btn:scale-110 transition-transform"><EyeOff size={20} /></span>
                         </div>
                         <div className="text-left">
                             <div className="text-white font-bold text-sm">Unclear Label</div>
                             <div className="text-white/40 text-[10px] font-medium mt-0.5">Ambiguous Ingredients</div>
                         </div>
                      </button>

                      <button onClick={() => onSetView('compare')} className="group/btn bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 p-4 rounded-2xl flex flex-col justify-between transition-all">
                         <div className="flex justify-between items-start">
                             <span className="text-blue-400 group-hover/btn:scale-110 transition-transform"><ArrowRight size={20} /></span>
                         </div>
                         <div className="text-left">
                             <div className="text-white font-bold text-sm">Compare</div>
                             <div className="text-white/40 text-[10px] font-medium mt-0.5">Trade-offs</div>
                         </div>
                      </button>
                  </div>
                   
                   <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                       <button onClick={() => onSetView('warning')} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/5 hover:border-amber-500/30 text-stone-400 hover:text-amber-200 text-[10px] font-bold uppercase tracking-widest transition-all">
                          Allergen Alert
                       </button>
                       <button onClick={() => onSetView('wrapped')} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-purple-500/20 border border-white/5 hover:border-purple-500/30 text-stone-400 hover:text-purple-200 text-[10px] font-bold uppercase tracking-widest transition-all">
                          Monthly Wrap
                       </button>
                   </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};
