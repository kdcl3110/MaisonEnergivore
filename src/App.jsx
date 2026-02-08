import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import LevelSelect from './components/Menu/LevelSelect';
import GameScreen from './components/GameScreen';
import DayRecapModal from './components/UI/DayRecapModal';

const GameFlow = () => {
  const { gameState, showRecap, dayRecapData, goToNextDay, goToMenu } = useGame();

  return (
    <>
      {gameState === 'menu' && <LevelSelect />}
      {gameState === 'playing' && <GameScreen />}

      {/* Modal de récap (overlay sur le jeu) */}
      <DayRecapModal
        isOpen={showRecap}
        dayResults={dayRecapData}
        onNextDay={goToNextDay}
        onBackToMenu={goToMenu}
      />
    </>
  );
};

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen">
        <GameFlow />
      </div>
    </GameProvider>
  );
}

export default App;
