import { ChevronRight, Check, Plus, Target } from 'lucide-react';
import { ViewState, Goal } from '../types';

interface GoalsViewProps {
  goals: Goal[];
  activeGoalId: string;
  customGoal: string;
  onSetView: (view: ViewState) => void;
  onSetActiveGoalId: (id: string) => void;
  onSetCustomGoal: (goal: string) => void;
  onAddCustomGoal: () => void;
}

export const GoalsView = ({ goals, activeGoalId, customGoal, onSetView, onSetActiveGoalId, onSetCustomGoal, onAddCustomGoal }: GoalsViewProps) => {
  return (
    <div className="h-full w-full bg-stone-950 flex flex-col p-6 pt-16 animate-in slide-in-from-right duration-300">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => onSetView('camera')} className="bg-white/10 p-3 rounded-full text-white hover:bg-white/20">
                <ChevronRight className="rotate-180" size={24} />
            </button>
            <h1 className="text-3xl font-black text-white tracking-tight">Your Protocol</h1>
        </div>

        <div className="mb-6">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 block">Set Custom Goal</label>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={customGoal}
                    onChange={(e) => onSetCustomGoal(e.target.value)}
                    placeholder="e.g. Low Sodium, Keto..." 
                    className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    onKeyDown={(e) => e.key === 'Enter' && onAddCustomGoal()}
                />
                <button 
                    onClick={onAddCustomGoal}
                    disabled={!customGoal.trim()}
                    className="bg-emerald-500 text-stone-950 p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-bold hover:bg-emerald-400 transition-colors"
                >
                    <Plus size={24} />
                </button>
            </div>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto pb-20 no-scrollbar">
            {goals.map((goal) => {
                const isActive = activeGoalId === goal.id;
                return (
                    <button 
                        key={goal.id}
                        onClick={() => { onSetActiveGoalId(goal.id); onSetView('camera'); }}
                        className={`w-full text-left p-5 rounded-[24px] border-2 transition-all relative overflow-hidden group ${isActive ? `${goal.bg} ${goal.border}` : 'bg-stone-900 border-stone-800 hover:border-stone-700'}`}
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-stone-800'} ${goal.color}`}>
                                    {goal.icon}
                                </div>
                                <div>
                                    <div className={`text-lg font-bold ${isActive ? 'text-white' : 'text-stone-300'}`}>{goal.label}</div>
                                    <div className={`text-xs font-medium uppercase tracking-wider ${isActive ? 'text-white/60' : 'text-stone-500'}`}>{goal.sub}</div>
                                </div>
                            </div>
                            {isActive && <div className="bg-white text-black rounded-full p-1"><Check size={16} strokeWidth={3}/></div>}
                        </div>
                    </button>
                )
            })}
        </div>
    </div>
  );
};
