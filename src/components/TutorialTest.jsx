import React, { useState } from 'react';
import TutorialOverlay from './Tutorial/TutorialOverlay';
import { TUTORIAL_STEPS } from '../data/tutorialSteps';

const TutorialTest = () => {
  const [show, setShow] = useState(true);

  if (!show) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <button
          onClick={() => setShow(true)}
          className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-bold"
        >
          Relancer le tutoriel
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-2xl">Test du tutoriel</div>

      <TutorialOverlay
        steps={TUTORIAL_STEPS}
        onComplete={() => {
          console.log('Tutoriel complété !');
          setShow(false);
        }}
        onSkip={() => {
          console.log('Tutoriel skippé !');
          setShow(false);
        }}
      />
    </div>
  );
};

export default TutorialTest;
