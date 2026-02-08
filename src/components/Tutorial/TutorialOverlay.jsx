import React, { useState } from 'react';
import { LeftOutlined, RightOutlined, RocketOutlined, CloseOutlined } from '@ant-design/icons';

const TutorialOverlay = ({ steps, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!steps || steps.length === 0) return null;

  const step = steps[currentStep];
  if (!step) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/90 animate-fade-in" onClick={(e) => e.stopPropagation()}></div>

      {/* Modal tutoriel */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg animate-slide-up my-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-cyan-500 p-4 sm:p-6 shadow-2xl neon-blue">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
                {step.icon || '📖'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-black text-white mb-1 leading-tight">{step.title}</h3>
                <p className="text-xs text-cyan-400">
                  Étape {currentStep + 1} / {steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={onSkip}
              className="ml-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1 flex-shrink-0"
            >
              <CloseOutlined style={{ fontSize: '10px' }} />
              <span className="hidden sm:inline">Passer</span>
            </button>
          </div>

          {/* Progress dots - en haut maintenant */}
          <div className="flex justify-center gap-2 mb-4 sm:mb-5">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-cyan-400 w-8'
                    : index < currentStep
                    ? 'bg-green-500 w-2'
                    : 'bg-gray-600 w-2'
                }`}
              ></div>
            ))}
          </div>

          {/* Content */}
          <div className="mb-5 sm:mb-6 min-h-[120px] sm:min-h-[140px]">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3">
              {step.content}
            </p>
            {step.details && (
              <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-lg p-3">
                <p className="text-xs sm:text-sm text-cyan-200 leading-relaxed">{step.details}</p>
              </div>
            )}
          </div>

          {/* Actions - boutons côte à côte toujours */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <LeftOutlined style={{ fontSize: '12px' }} />
              <span className="hidden sm:inline">Précédent</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-bold text-sm shadow-lg neon-blue transition flex items-center justify-center gap-2"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <span>Commencer</span>
                  <RocketOutlined style={{ fontSize: '14px' }} />
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Suivant</span>
                  <RightOutlined style={{ fontSize: '12px' }} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
