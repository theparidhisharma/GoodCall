import { Scan } from 'lucide-react';

interface MicroPromptBarProps {
  label: string;
  subLabel?: string;
  onClick?: () => void;
}

export const MicroPromptBar = ({ label, subLabel, onClick }: MicroPromptBarProps) => {
  return (
    <button 
      onClick={onClick}
      className="mt-6 w-full group relative overflow-hidden bg-stone-900 text-stone-50 px-5 py-4 rounded-2xl flex items-center justify-between shadow-xl active:scale-[0.98] transition-all"
    >
      <div className="flex flex-col items-start">
         <span className="font-bold text-sm tracking-wide text-white">{label}</span>
         {subLabel && <span className="text-[10px] text-stone-400 font-medium">{subLabel}</span>}
      </div>
      <div className="bg-white/10 p-2 rounded-full group-hover:translate-x-1 transition-transform border border-white/5">
        <Scan size={16} />
      </div>
    </button>
  );
};
