import React from 'react';
import { useGame } from '../../context/GameContext';

const EnergyMeter = () => {
  const { todayConsumption, getConsumptionLimit, getCurrentPowerConsumption, BELGIUM_AVERAGE } = useGame();

  const limit = getConsumptionLimit();
  const currentPower = getCurrentPowerConsumption();
  const percentage = limit ? (todayConsumption / limit) * 100 : 0;

  const getColor = () => {
    if (!limit) return 'from-blue-500 to-cyan-500';
    if (percentage >= 100) return 'from-red-500 to-rose-600';
    if (percentage >= 80) return 'from-orange-500 to-amber-600';
    return 'from-green-500 to-emerald-600';
  };

  const getGlow = () => {
    if (!limit) return 'neon-blue';
    if (percentage >= 100) return 'neon-red';
    if (percentage >= 80) return 'neon-yellow';
    return 'neon-green';
  };

  return (
    <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-cyan-500/30 ${getGlow()} glass-dark`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg">
            ⚡
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Consommation</h3>
            <p className="text-sm text-cyan-400 font-semibold">Énergie totale</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-4xl font-black bg-gradient-to-r ${getColor()} bg-clip-text text-transparent`}>
            {todayConsumption.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 font-bold">kWh</div>
        </div>
      </div>

      {/* Progress bar */}
      {limit && (
        <div className="space-y-2 mb-4">
          <div className="relative h-6 bg-gray-900/50 rounded-full overflow-hidden border border-gray-700">
            <div
              className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-500 relative`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-lg">
              {percentage.toFixed(0)}%
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">0 kWh</span>
            <span className={`font-bold ${percentage >= 100 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
              Objectif: {limit} kWh
            </span>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-700/50">
        <div className="bg-gray-900/50 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">⚡ Puissance actuelle</div>
          <div className="text-lg font-bold text-yellow-400">{currentPower}W</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">🇧🇪 Moyenne BE</div>
          <div className="text-lg font-bold text-blue-400">{BELGIUM_AVERAGE.dailyConsumption} kWh</div>
        </div>
      </div>

      {/* Warning indicator */}
      {percentage >= 90 && limit && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
          <span className="text-white font-bold text-sm">!</span>
        </div>
      )}
    </div>
  );
};

export default EnergyMeter;
