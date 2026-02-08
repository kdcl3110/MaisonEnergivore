import React from 'react';
import { useGame } from '../../context/GameContext';

const ObjectivePanel = () => {
  const {
    currentScenario,
    todayConsumption,
    todayBudget,
    todayComfort,
    offPeakConsumption,
    getConsumptionLimit
  } = useGame();

  if (!currentScenario || currentScenario.isTutorial) {
    return (
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-bold text-blue-900 mb-2">📖 Mode Tutoriel</h3>
        <p className="text-sm text-blue-700">
          Explorez librement ! Aucun objectif aujourd'hui.
        </p>
      </div>
    );
  }

  const objectives = currentScenario.objectives;
  const consumptionLimit = getConsumptionLimit();
  const totalConsumption = todayConsumption || 1;
  const offPeakPercentage = ((offPeakConsumption / totalConsumption) * 100).toFixed(0);

  const ObjectiveItem = ({ label, current, target, unit, inverse = false }) => {
    if (target === null || target === undefined) return null;

    const isSuccess = inverse ? current >= target : current <= target;
    const percentage = (current / target) * 100;

    return (
      <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
        <div className="flex items-center gap-2">
          <span className={`text-xl ${isSuccess ? '✅' : '❌'}`}>
            {isSuccess ? '✅' : '❌'}
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-700">{label}</p>
            <p className="text-xs text-gray-500">
              {inverse ? '≥' : '<'} {target}{unit}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {current.toFixed(current >= 10 ? 1 : 2)}{unit}
          </p>
          <p className="text-xs text-gray-500">
            {percentage.toFixed(0)}%
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-3">🎯 Objectifs du Jour</h3>

      <div className="space-y-1">
        <ObjectiveItem
          label="Consommation"
          current={todayConsumption}
          target={consumptionLimit}
          unit=" kWh"
        />
        <ObjectiveItem
          label="Budget"
          current={todayBudget}
          target={objectives.budget}
          unit="€"
        />
        <ObjectiveItem
          label="Confort"
          current={todayComfort}
          target={objectives.comfort}
          unit="%"
          inverse={true}
        />
        <ObjectiveItem
          label="Heures Creuses"
          current={parseFloat(offPeakPercentage)}
          target={objectives.offPeakPercentage}
          unit="%"
          inverse={true}
        />
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 <span className="font-semibold">Astuce :</span> {currentScenario.description}
        </p>
      </div>
    </div>
  );
};

export default ObjectivePanel;
