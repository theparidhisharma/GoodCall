import { HelpCircle } from 'lucide-react';
import { Sentiment } from '../types';

interface MatchScoreRingProps {
  score: number;
  sentiment: Sentiment;
}

export const MatchScoreRing = ({ score, sentiment }: MatchScoreRingProps) => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  let color = "stroke-emerald-500";
  if (sentiment === 'negative') color = "stroke-rose-500";
  if (sentiment === 'uncertain') color = "stroke-amber-400";

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="32" cy="32" r={radius} className="stroke-stone-200" strokeWidth="4" fill="transparent" />
        {sentiment !== 'uncertain' && (
            <circle 
            cx="32" cy="32" r={radius} 
            className={`${color} transition-all duration-1000 ease-out`}
            strokeWidth="4" 
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {sentiment === 'uncertain' ? (
             <HelpCircle size={20} className="text-stone-400" />
        ) : (
             <span className="text-sm font-bold text-stone-900">{score}</span>
        )}
      </div>
    </div>
  );
};
