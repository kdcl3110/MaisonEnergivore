import React from 'react';
import { useGame } from '../../context/GameContext';
import { isOffPeakHour } from '../../data/appliances';

const BudgetMeter = () => {
  const { todayBudget, currentScenario, gameTime, ELECTRICITY_RATES, getPriceModifier } = useGame();

  const limit = currentScenario?.objectives?.budget;
  const percentage = limit ? (todayBudget / limit) * 100 : 0;
  const isOffPeak = isOffPeakHour(gameTime);
  const priceModifier = getPriceModifier();

  const getColor = () => {
    if (!limit) return 'text-blue-500';
    if (percentage >= 100) return 'text-red-500';
    if (percentage >= 80) return 'text-orange-500';
    return 'text-green-500';
  };

  const getBarColor = () => {
    if (!limit) return 'bg-blue-500';
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const currentRate = isOffPeak ? ELECTRICITY_RATES.offPeakHours : ELECTRICITY_RATES.peakHours;
  const adjustedRate = (currentRate * priceModifier).toFixed(3);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">💰 Budget</h3>
        <span className={`text-2xl font-bold ${getColor()}`}>
          €{todayBudget.toFixed(2)}
        </span>
      </div>

      {limit && (
        <>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className={`h-4 rounded-full transition-all duration-300 ${getBarColor()}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600">
            Objectif : €{limit.toFixed(2)} ({percentage.toFixed(0)}%)
          </p>
        </>
      )}

      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className={`text-xs ${isOffPeak ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
          {isOffPeak ? '🌙 Heures creuses' : '☀️ Heures pleines'} : €{adjustedRate}/kWh
        </div>
        {priceModifier > 1 && (
          <p className="text-xs text-red-500 mt-1">
            ⚠️ Pénalité : +{((priceModifier - 1) * 100).toFixed(0)}%
          </p>
        )}
      </div>
    </div>
  );
};

export default BudgetMeter;
