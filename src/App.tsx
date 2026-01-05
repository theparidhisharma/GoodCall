import { useState } from 'react';
import { ViewState, ProductData, Goal } from './types';
import { SCENARIO_IMAGES } from './config';
import { DEFAULT_GOALS } from './constants';
import { GeminiService } from './services/GeminiService';
import { CameraView } from './views/CameraView';
import { DecisionView } from './views/DecisionView';
import { CompareView } from './views/CompareView';
import { WarningView } from './views/WarningView';
import { WrappedView } from './views/WrappedView';
import { GoalsView } from './views/GoalsView';
import { HistoryView } from './views/HistoryView';
import { AnalysisView } from './views/AnalysisView';
import { Target } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>('camera');
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0); 
  const [activeProduct, setActiveProduct] = useState<ProductData | null>(null);
  const [scanHistory, setScanHistory] = useState<ProductData[]>([]);
  
  // --- Goals Context ---
  const [customGoal, setCustomGoal] = useState('');
  const [goals, setGoals] = useState<Goal[]>(DEFAULT_GOALS);
  const [activeGoalId, setActiveGoalId] = useState('gut');
  
  const activeGoal = goals.find(g => g.id === activeGoalId) || goals[0];

  // --- Context State ---
  const [location, setLocation] = useState("Nature's Basket, Defense Colony");
  const [time, setTime] = useState("5:38 PM");
  const [bgImage, setBgImage] = useState(SCENARIO_IMAGES[0]);

  // --- Real AI Simulation ---
  const simulateScan = async (scenario: 'good' | 'bad' | 'uncertain') => {
    setView('camera');
    setBgImage(SCENARIO_IMAGES[Math.floor(Math.random() * SCENARIO_IMAGES.length)]);
    setScanning(true);
    setScanStep(1);
    
    // Simulate steps visually while we fetch real data
    const stepInterval = setInterval(() => {
        setScanStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 800);

    // Prepare Prompt Context based on button clicked
    let productPrompt = "";
    if (scenario === 'good') {
        productPrompt = "Oatly Barista Edition. Ingredients: Oat base (water, oats 10%), rapeseed oil, acidity regulator (dipotassium phosphate), calcium carbonate, calcium phosphates, iodised salt, vitamins (D2, riboflavin, B12).";
    } else if (scenario === 'bad') {
        productPrompt = "Sugary Puffs Cereal. Ingredients: Wheat, Sugar (14g), Glucose Syrup, Palm Oil, Artificial Flavoring, Red 40.";
    } else {
        productPrompt = "A jar of mixed seasoning. The label is blurry and simply says 'Spices' and 'Natural Flavoring'. It is unclear if it contains paprika or garlic.";
    }

    // Call Real Backend (Gemini)
    try {
        const result = await GeminiService.analyzeProduct(productPrompt, activeGoal.label);
        
        // Add image for UI continuity (AI doesn't return image URL)
        result.image = scenario === 'good' 
            ? "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&q=80&w=600"
            : scenario === 'bad' 
            ? "https://images.unsplash.com/photo-1528750596323-952a233306ae?auto=format&fit=crop&q=80&w=600"
            : "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600";

        clearInterval(stepInterval);
        setScanning(false);
        setScanStep(0);
        
        setActiveProduct(result);
        setScanHistory(prev => [result, ...prev]);
        setView('decision');
    } catch (e) {
        clearInterval(stepInterval);
        setScanning(false);
        alert("Simulation failed. Check API Key.");
    }
  };

  const handleAddCustomGoal = () => {
    if (!customGoal.trim()) return;
    const newId = `custom-${Date.now()}`;
    const newGoal: Goal = {
        id: newId,
        label: customGoal,
        sub: 'Custom Protocol',
        icon: <Target size={20}/>,
        color: 'text-purple-400',
        bg: 'bg-purple-500/20',
        border: 'border-purple-500/50'
    };
    setGoals([newGoal, ...goals]); 
    setActiveGoalId(newId);
    setCustomGoal('');
    setView('camera');
  };

  const reset = () => {
    setView('camera');
    setActiveProduct(null);
    setBgImage(SCENARIO_IMAGES[Math.floor(Math.random() * SCENARIO_IMAGES.length)]);
  };

  return (
    <div className="w-full h-screen bg-stone-950 overflow-hidden font-sans select-none sm:max-w-md sm:mx-auto sm:border-x sm:border-stone-800 relative shadow-2xl">
      <div className="h-full w-full relative">
        {(view === 'camera' || view === 'decision') && (
          <>
            <CameraView 
              scanning={scanning}
              scanStep={scanStep}
              activeGoal={activeGoal}
              location={location}
              time={time}
              bgImage={bgImage}
              onSetView={setView}
              onSimulateScan={simulateScan}
            />
            {view === 'decision' && activeProduct && (
              <DecisionView 
                activeProduct={activeProduct}
                onSetView={setView}
              />
            )}
          </>
        )}
        
        {view === 'compare' && <CompareView onReset={reset} />}
        {view === 'warning' && <WarningView onReset={reset} />}
        {view === 'wrapped' && <WrappedView onReset={reset} />}
        {view === 'goals' && (
          <GoalsView 
            goals={goals}
            activeGoalId={activeGoalId}
            customGoal={customGoal}
            onSetView={setView}
            onSetActiveGoalId={setActiveGoalId}
            onSetCustomGoal={setCustomGoal}
            onAddCustomGoal={handleAddCustomGoal}
          />
        )}
        {view === 'history' && (
          <HistoryView 
            scanHistory={scanHistory}
            onSetView={setView}
            onSetActiveProduct={setActiveProduct}
          />
        )}
        {view === 'analysis' && activeProduct && (
          <AnalysisView 
            activeProduct={activeProduct}
            activeGoal={activeGoal}
            onSetView={setView}
          />
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes bounce-slight {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
