import React from 'react';
import { BELGIUM_AVERAGE } from '../data/scenarios';

const DayResults = ({ results, onContinue, onRetry }) => {
  const { consumption, budget, comfort, offPeakPercentage, objectives, objectivesFailed, objectivesCompleted } = results;

  const totalObjectives = Object.keys(objectives).filter(key => objectives[key] !== null && objectives[key] !== undefined).length;
  const successRate = (objectivesCompleted / totalObjectives) * 100;

  const getTitleAndEmoji = () => {
    if (objectivesFailed === 0) return { title: 'PARFAIT !', emoji: '🏆🏆🏆' };
    if (objectivesFailed === 1) return { title: 'Bien joué !', emoji: '👍' };
    if (objectivesFailed === 2) return { title: 'Peut mieux faire', emoji: '🤔' };
    return { title: 'Journée difficile...', emoji: '😰' };
  };

  const { title, emoji } = getTitleAndEmoji();

  const ResultItem = ({ label, value, target, isSuccess, unit = '' }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <span className="text-gray-700 font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <span className={`font-bold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {value}{unit}
        </span>
        {target && <span className="text-gray-400 text-sm">/ {target}{unit}</span>}
        <span className="text-2xl">{isSuccess ? '✅' : '❌'}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Titre */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{emoji}</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-xl text-gray-600">
            Jour {results.day} terminé
          </p>
        </div>

        {/* Résultats */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Résultats</h2>

          <div className="space-y-2">
            <ResultItem
              label="⚡ Consommation"
              value={consumption.toFixed(2)}
              target={objectives.consumption}
              isSuccess={objectives.consumption ? consumption <= objectives.consumption : true}
              unit=" kWh"
            />
            <ResultItem
              label="💰 Budget"
              value={budget.toFixed(2)}
              target={objectives.budget}
              isSuccess={objectives.budget ? budget <= objectives.budget : true}
              unit="€"
            />
            {objectives.comfort !== null && (
              <ResultItem
                label="😊 Confort"
                value={Math.round(comfort)}
                target={objectives.comfort}
                isSuccess={comfort >= objectives.comfort}
                unit="%"
              />
            )}
            {objectives.offPeakPercentage !== null && (
              <ResultItem
                label="🌙 Heures Creuses"
                value={offPeakPercentage}
                target={objectives.offPeakPercentage}
                isSuccess={offPeakPercentage >= objectives.offPeakPercentage}
                unit="%"
              />
            )}
          </div>

          {/* Score */}
          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-gray-700">Score</span>
              <span className="text-3xl font-bold text-purple-600">{successRate.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all ${
                  successRate >= 80 ? 'bg-green-500' : successRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Comparaison Belgique */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-blue-900 mb-3">🇧🇪 Comparaison Belgique</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-800">Votre consommation :</span>
              <span className="font-bold text-blue-900">{consumption.toFixed(2)} kWh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-800">Moyenne belge :</span>
              <span className="font-bold text-blue-900">{BELGIUM_AVERAGE.dailyConsumption} kWh</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-blue-300">
              <span className="text-blue-800">Différence :</span>
              <span className={`font-bold ${consumption < BELGIUM_AVERAGE.dailyConsumption ? 'text-green-600' : 'text-red-600'}`}>
                {consumption < BELGIUM_AVERAGE.dailyConsumption ? '🌟 ' : ''}
                {((consumption - BELGIUM_AVERAGE.dailyConsumption) / BELGIUM_AVERAGE.dailyConsumption * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {objectivesFailed >= 3 ? (
            <button
              onClick={onRetry}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-bold text-lg transition"
            >
              🔄 Recommencer ce jour
            </button>
          ) : (
            <>
              <button
                onClick={onRetry}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-4 px-6 rounded-lg font-bold text-lg transition"
              >
                🔄 Recommencer
              </button>
              <button
                onClick={onContinue}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-lg font-bold text-lg transition"
              >
                ▶️ Jour suivant
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayResults;
