import { ProductData, Sentiment } from '../types';
import { VerdictBanner } from '../components/VerdictBanner';
import { KeyTradeoff } from '../components/KeyTradeoff';
import { MicroPromptBar } from '../components/MicroPromptBar';

interface DecisionViewProps {
  activeProduct: ProductData;
  onSetView: (view: string) => void;
}

export const DecisionView = ({ activeProduct, onSetView }: DecisionViewProps) => {
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px] transition-opacity duration-500" />
      <div className="pointer-events-auto w-full max-w-md mx-auto animate-in slide-in-from-bottom duration-500 ease-out">
         <div className="bg-white/90 backdrop-blur-3xl rounded-t-[44px] p-8 pb-10 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] border-t border-white/40 relative overflow-hidden">
            <div className="w-12 h-1.5 bg-stone-300/60 rounded-full mx-auto mb-8" />
            
            <VerdictBanner 
              sentiment={activeProduct.sentiment} 
              title={activeProduct.verdict} 
              reason={activeProduct.reason} 
              product={activeProduct}
              onViewAnalysis={() => onSetView('analysis')}
            />
            
            <KeyTradeoff 
              upside={activeProduct.pros} 
              downside={activeProduct.cons} 
            />
            
            {activeProduct.sentiment !== 'uncertain' && (
                <MicroPromptBar 
                  label="Compare with cheaper option?" 
                  subLabel="Save approx ₹150 • 2 alternatives found"
                  onClick={() => onSetView('compare')} 
                />
            )}
         </div>
      </div>
    </div>
  );
};
