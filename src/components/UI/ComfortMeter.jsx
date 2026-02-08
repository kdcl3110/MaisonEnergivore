import React from 'react';
import { useGame } from '../../context/GameContext';

const ComfortMeter = () => {
  const { todayComfort, currentScenario } = useGame();

  const limit = currentScenario?.objectives?.comfort;
  const comfort = Math.round(todayComfort);

  const getColor = () => {
    if (comfort >= 80) return 'text-green-500';
    if (comfort >= 60) return 'text-yellow-500';
    if (comfort >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getBarColor = () => {
    if (comfort >= 80) return 'bg-green-500';
    if (comfort >= 60) return 'bg-yellow-500';
    if (comfort >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getEmoji = () => {
    if (comfort >= 80) return '😊';
    if (comfort >= 60) return '😐';
    if (comfort >= 40) return '😕';
    return '😰';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">😊 Confort</h3>
        <span className={`text-2xl font-bold ${getColor()}`}>
          {getEmoji()} {comfort}%
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div
          className={`h-4 rounded-full transition-all duration-300 ${getBarColor()}`}
          style={{ width: `${comfort}%` }}
        ></div>
      </div>

      {limit && (
        <p className="text-xs text-gray-600">
          Objectif : ≥ {limit}% {comfort >= limit ? '✅' : '❌'}
        </p>
      )}

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          {comfort >= 80 && 'Excellent confort !'}
          {comfort >= 60 && comfort < 80 && 'Confort acceptable'}
          {comfort >= 40 && comfort < 60 && 'Confort dégradé'}
          {comfort < 40 && 'Confort critique !'}
        </p>
      </div>
    </div>
  );
};

export default ComfortMeter;
