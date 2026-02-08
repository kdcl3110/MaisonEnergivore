import React from 'react';
import { useGame } from '../../context/GameContext';
import { isOffPeakHour } from '../../data/appliances';

const TimeClock = () => {
  const { gameTime, currentDay, isPlaying, togglePause, gameSpeed, setGameSpeed, advanceTime } = useGame();

  const isOffPeak = isOffPeakHour(gameTime);
  const timeString = `${gameTime.toString().padStart(2, '0')}:00`;

  const getTimeOfDay = () => {
    if (gameTime >= 6 && gameTime < 12) return '🌅 Matin';
    if (gameTime >= 12 && gameTime < 18) return '☀️ Après-midi';
    if (gameTime >= 18 && gameTime < 22) return '🌆 Soirée';
    return '🌙 Nuit';
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg p-4 text-white">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold opacity-90">Jour {currentDay}/7</h3>
          <div className="text-3xl font-bold">{timeString}</div>
          <p className="text-sm opacity-90">{getTimeOfDay()}</p>
        </div>

        <div className="text-right">
          {isOffPeak && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
              ⚡ Heures Creuses
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mt-3">
        {/* Boutons de contrôle */}
        <div className="flex gap-2">
          <button
            onClick={togglePause}
            className="flex-1 bg-white text-purple-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Auto'}
          </button>

          <button
            onClick={() => setGameSpeed(gameSpeed === 1 ? 2 : 1)}
            className="bg-white text-purple-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            {gameSpeed === 1 ? '1x' : '2x'}
          </button>
        </div>

        {/* Bouton avancer manuellement */}
        <button
          onClick={advanceTime}
          disabled={gameTime >= 24}
          className="w-full bg-yellow-400 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⏭️ Avancer +1h
        </button>

        <p className="text-xs text-center opacity-75">
          {isPlaying ? '⚡ Auto : 10 sec = 1h' : '⏸️ Manuel : Cliquez pour avancer'}
        </p>
      </div>

      {/* Barre de progression de la journée */}
      <div className="mt-3 w-full bg-white bg-opacity-30 rounded-full h-2">
        <div
          className="bg-white h-2 rounded-full transition-all duration-300"
          style={{ width: `${(gameTime / 24) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TimeClock;
