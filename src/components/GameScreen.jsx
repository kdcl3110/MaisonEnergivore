import React from 'react';
import { useGame } from '../context/GameContext';
import HouseLayout from './House/HouseLayout';
import CompactHUD from './UI/CompactHUD';
import MissionPanel from './UI/MissionPanel';
import MetricsSidebar from './UI/MetricsSidebar';
import MessageBox from './UI/MessageBox';
import TutorialOverlay from './Tutorial/TutorialOverlay';
import TipNotification from './UI/TipNotification';
import ConfirmModal from './UI/ConfirmModal';
import ObjectivesModal from './UI/ObjectivesModal';
import SolutionModal from './UI/SolutionModal';
import { TUTORIAL_STEPS } from '../data/tutorialSteps';
import { SOLUTIONS } from '../data/solutions';
import { useSmartTips } from '../hooks/useSmartTips';
import { ReadOutlined, TrophyOutlined } from '@ant-design/icons';

const GameScreen = () => {
  const {
    showTutorial,
    completeTutorial,
    skipTutorial,
    gameTime,
    gameState,
    appliancesState,
    currentScenario,
    currentDay,
    toggleAppliance,
    showConfirmQuit,
    confirmGoToMenu,
    cancelGoToMenu,
    showObjectives,
    startGameAfterObjectives
  } = useGame();
  const [forceTutorial, setForceTutorial] = React.useState(false);
  const [showSolution, setShowSolution] = React.useState(false);
  const [showObjectivesReview, setShowObjectivesReview] = React.useState(false);

  // Système de conseils intelligent
  const { currentTip, dismissTip, acceptTip } = useSmartTips(
    gameTime,
    gameState,
    appliancesState,
    currentScenario
  );

  const handleAcceptTip = (tip) => {
    const acceptedTip = acceptTip(tip);

    // Activer automatiquement le premier appareil suggéré
    if (acceptedTip?.appliances && acceptedTip.appliances.length > 0) {
      const applianceId = acceptedTip.appliances[0];
      toggleAppliance(applianceId);
    }
  };

  const displayTutorial = showTutorial || forceTutorial;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Background effects */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Scanlines effect */}
      <div className="scanlines fixed inset-0 pointer-events-none"></div>

      {/* Compact HUD Top */}
      <CompactHUD onShowSolution={() => setShowSolution(true)} />

      {/* Messages */}
      <MessageBox />

      {/* Smart Tips Notification */}
      {currentTip && !displayTutorial && (
        <TipNotification
          tip={currentTip}
          onAccept={() => handleAcceptTip(currentTip)}
          onDismiss={dismissTip}
        />
      )}

      {/* Tutorial Overlay */}
      {displayTutorial && (
        <TutorialOverlay
          steps={TUTORIAL_STEPS}
          onComplete={() => {
            setForceTutorial(false);
            completeTutorial();
          }}
          onSkip={() => {
            setForceTutorial(false);
            skipTutorial();
          }}
        />
      )}

      {/* Objectives Modal (start of game) */}
      <ObjectivesModal
        isOpen={showObjectives}
        onStart={startGameAfterObjectives}
        scenario={currentScenario}
      />

      {/* Objectives Modal (review during game) */}
      <ObjectivesModal
        isOpen={showObjectivesReview}
        onClose={() => setShowObjectivesReview(false)}
        scenario={currentScenario}
        isReview={true}
      />

      {/* Confirm Quit Modal */}
      <ConfirmModal
        isOpen={showConfirmQuit}
        onConfirm={confirmGoToMenu}
        onCancel={cancelGoToMenu}
        title="Quitter la partie ?"
        message="Voulez-vous vraiment quitter la partie en cours ? Votre progression ne sera pas sauvegardée."
      />

      {/* Solution Modal */}
      <SolutionModal
        isOpen={showSolution}
        onClose={() => setShowSolution(false)}
        solution={SOLUTIONS[`day${currentDay}`]}
        dayNumber={currentDay}
      />

      {/* Main Content - scrollable with padding for fixed HUD */}
      <div className="pt-[140px] sm:pt-[150px] lg:pt-[90px] pb-4 sm:pb-6 px-3 sm:px-4 md:px-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Mobile: missions above house (unchanged) */}
          <div className="lg:hidden mb-3">
            <MissionPanel />
          </div>

          {/* 3-column layout on desktop */}
          <div className="flex gap-4">
            {/* Left: metrics sidebar (desktop only) */}
            <div className="hidden lg:block w-[220px] flex-shrink-0">
              <MetricsSidebar />
            </div>

            {/* Center: house */}
            <div className="flex-1 min-w-0">
              <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl sm:rounded-2xl border-2 border-cyan-500/20 p-3 sm:p-4 md:p-6 shadow-2xl">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-cyan-500/20">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg sm:text-xl md:text-2xl shadow-lg">
                    🏠
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base md:text-lg font-bold text-white">VOTRE MAISON</h2>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-400">Tapez sur les appareils</p>
                  </div>
                </div>

                {/* House Layout */}
                <HouseLayout />
              </div>
            </div>

            {/* Right: missions sidebar (desktop only) */}
            <div className="hidden lg:block w-[260px] flex-shrink-0">
              <div className="sticky top-[90px]">
                <MissionPanel />
              </div>
            </div>
          </div>

          {/* Spacer for safe scrolling */}
          <div className="h-3 sm:h-4 md:h-6"></div>
        </div>
      </div>

      {/* Floating buttons */}
      <div className="fixed top-[100px] sm:top-[110px] lg:top-[55px] right-3 sm:right-4 md:right-6 z-50 flex flex-col gap-2">
        {/* Objectives review button */}
        <button
          onClick={() => setShowObjectivesReview(true)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
          title="Revoir les objectifs"
        >
          <TrophyOutlined className="text-white" style={{ fontSize: '18px' }} />
        </button>

        {/* Tutorial button */}
        <button
          onClick={() => setForceTutorial(true)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-2xl neon-purple active:scale-90 transition-transform"
          title="Revoir le tutoriel"
        >
          <ReadOutlined className="text-white" style={{ fontSize: '18px' }} />
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
