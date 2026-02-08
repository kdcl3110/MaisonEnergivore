import React from 'react';
import { useGame } from '../../context/GameContext';

const BottomControls = () => {
  const { isPlaying, togglePause, gameSpeed, setGameSpeed, advanceTime, gameTime } = useGame();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-gray-900 to-gray-900/95 backdrop-blur-lg border-t-2 border-cyan-500/30 shadow-2xl safe-area-inset-bottom">
      <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 md:gap-3">
          {/* Pause/Play */}
          <button
            onClick={togglePause}
            className={`flex-1 py-2 sm:py-3 md:py-3.5 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm md:text-base transition-all ${
              isPlaying
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            } shadow-lg active:scale-95`}
          >
            {isPlaying ? '⏸️ PAUSE' : '▶️ PLAY'}
          </button>

          {/* Speed */}
          <button
            onClick={() => setGameSpeed(gameSpeed === 1 ? 2 : 1)}
            className="py-2 sm:py-3 md:py-3.5 px-4 sm:px-6 md:px-8 rounded-lg sm:rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm md:text-base shadow-lg active:scale-95 transition-all"
          >
            {gameSpeed === 1 ? '1x' : '2x ⚡'}
          </button>

          {/* Next Hour */}
          <button
            onClick={advanceTime}
            disabled={gameTime >= 24}
            className="py-2 sm:py-3 md:py-3.5 px-4 sm:px-6 md:px-8 rounded-lg sm:rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm md:text-base shadow-lg active:scale-95 transition-all"
          >
            ⏭️ +1h
          </button>
        </div>

        {/* Help text */}
        <p className="text-center text-[9px] sm:text-[10px] md:text-xs text-gray-400 mt-1.5 sm:mt-2">
          {isPlaying ? '⚡ Temps accéléré : 10s = 1h' : '⏸️ Jeu en pause'}
        </p>
      </div>
    </div>
  );
};

export default BottomControls;
