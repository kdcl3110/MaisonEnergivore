import React from 'react';
import { useGame } from '../../context/GameContext';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  TrophyOutlined,
  StarFilled,
  ThunderboltOutlined,
  EuroOutlined,
  SmileOutlined,
  BulbOutlined,
  WarningOutlined,
  ArrowRightOutlined,
  RedoOutlined,
  HomeOutlined
} from '@ant-design/icons';

const DayRecapModal = ({ isOpen, onClose, dayResults, onNextDay, onBackToMenu }) => {
  console.log('📊 DayRecapModal - isOpen:', isOpen, 'dayResults:', dayResults);

  if (!isOpen || !dayResults) {
    console.log('❌ Modal fermé ou pas de données');
    return null;
  }

  const { currentScenario, BELGIUM_AVERAGE } = useGame();
  console.log('✅ Modal ouvert avec données:', { currentScenario, dayResults });

  // Calculer si les objectifs sont atteints
  const consumptionObjective = currentScenario?.objectives?.consumption || BELGIUM_AVERAGE.dailyConsumption || 9.6;
  const budgetObjective = currentScenario?.objectives?.budget || 5;
  const comfortObjective = currentScenario?.objectives?.comfort || 60;

  const consumptionSuccess = dayResults.consumption <= consumptionObjective;
  const budgetSuccess = dayResults.budget <= budgetObjective;
  const comfortSuccess = dayResults.comfort >= comfortObjective;

  const allSuccess = consumptionSuccess && budgetSuccess && comfortSuccess;
  const partialSuccess = [consumptionSuccess, budgetSuccess, comfortSuccess].filter(Boolean).length >= 2;

  // Calculer les étoiles (0-3 selon le nombre d'objectifs atteints)
  const objectivesCount = [consumptionSuccess, budgetSuccess, comfortSuccess].filter(Boolean).length;
  const stars = objectivesCount; // 0, 1, 2, ou 3 étoiles

  const getStatusIcon = (success) => success ? <CheckCircleOutlined className="text-green-400" /> : <CloseCircleOutlined className="text-red-400" />;
  const getStatusColor = (success) => success ? 'text-green-400' : 'text-red-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4 animate-fade-in overflow-y-auto">
      {/* Modal Content */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg my-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl border-2 border-cyan-500/50 shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className={`p-3 sm:p-4 text-center border-b-2 ${
          allSuccess
            ? 'bg-gradient-to-r from-green-900/50 to-green-800/50 border-green-500/50'
            : partialSuccess
            ? 'bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 border-yellow-500/50'
            : 'bg-gradient-to-r from-red-900/50 to-red-800/50 border-red-500/50'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
            <TrophyOutlined className={`text-2xl sm:text-3xl ${allSuccess ? 'text-yellow-400' : partialSuccess ? 'text-yellow-500' : 'text-gray-400'}`} />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              {allSuccess ? 'PARFAIT !' : partialSuccess ? 'BIEN JOUÉ !' : 'RÉESSAYEZ !'}
            </h2>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-300">
            Jour {currentScenario?.day || dayResults.day} - {currentScenario?.name || 'Récapitulatif'}
          </p>

          {/* Stars */}
          <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-3">
            {[1, 2, 3].map(star => (
              <StarFilled
                key={star}
                className={`text-xl sm:text-2xl md:text-3xl transition-all duration-300 ${
                  star <= stars
                    ? 'text-yellow-400 scale-110 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                    : 'text-gray-600 opacity-20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          {/* Consumption */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg sm:rounded-xl p-2 sm:p-3 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ThunderboltOutlined className="text-cyan-400 text-lg sm:text-xl" />
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-400">Consommation</p>
                  <p className={`text-sm sm:text-base font-bold ${getStatusColor(consumptionSuccess)}`}>
                    {dayResults.consumption.toFixed(2)} / {consumptionObjective.toFixed(2)} kWh
                  </p>
                </div>
              </div>
              <div className="text-lg sm:text-xl">{getStatusIcon(consumptionSuccess)}</div>
            </div>
            {/* Progress bar */}
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  consumptionSuccess ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((dayResults.consumption / consumptionObjective) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Budget */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg sm:rounded-xl p-2 sm:p-3 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <EuroOutlined className="text-green-400 text-lg sm:text-xl" />
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-400">Budget</p>
                  <p className={`text-sm sm:text-base font-bold ${getStatusColor(budgetSuccess)}`}>
                    {dayResults.budget.toFixed(2)} / {budgetObjective.toFixed(2)} €
                  </p>
                </div>
              </div>
              <div className="text-lg sm:text-xl">{getStatusIcon(budgetSuccess)}</div>
            </div>
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  budgetSuccess ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((dayResults.budget / budgetObjective) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Comfort */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg sm:rounded-xl p-2 sm:p-3 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <SmileOutlined className="text-yellow-400 text-lg sm:text-xl" />
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-400">Confort</p>
                  <p className={`text-sm sm:text-base font-bold ${getStatusColor(comfortSuccess)}`}>
                    {Math.round(dayResults.comfort)} / {comfortObjective}%
                  </p>
                </div>
              </div>
              <div className="text-lg sm:text-xl">{getStatusIcon(comfortSuccess)}</div>
            </div>
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  comfortSuccess ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${dayResults.comfort}%` }}
              ></div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-2 mt-2 sm:mt-3">
            <div className="bg-blue-900/20 rounded-lg p-1.5 sm:p-2 border border-blue-500/30">
              <p className="text-[9px] sm:text-[10px] text-blue-300">Heures Creuses</p>
              <p className="text-xs sm:text-sm font-bold text-white">{dayResults.offPeak.toFixed(2)} kWh</p>
            </div>
            <div className="bg-orange-900/20 rounded-lg p-1.5 sm:p-2 border border-orange-500/30">
              <p className="text-[9px] sm:text-[10px] text-orange-300">Heures Pleines</p>
              <p className="text-xs sm:text-sm font-bold text-white">{dayResults.peak.toFixed(2)} kWh</p>
            </div>
          </div>

          {/* Message */}
          {allSuccess ? (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 mt-2 sm:mt-3 flex items-center justify-center gap-2">
              <StarFilled className="text-green-300 text-sm" />
              <p className="text-[10px] sm:text-xs text-green-300 text-center leading-tight">
                Excellent ! Vous maîtrisez parfaitement votre consommation d'énergie !
              </p>
            </div>
          ) : partialSuccess ? (
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 mt-2 sm:mt-3 flex items-center justify-center gap-2">
              <BulbOutlined className="text-yellow-300 text-sm" />
              <p className="text-[10px] sm:text-xs text-yellow-300 text-center leading-tight">
                Bon travail ! Essayez de profiter davantage des heures creuses.
              </p>
            </div>
          ) : (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 mt-2 sm:mt-3 flex items-center justify-center gap-2">
              <WarningOutlined className="text-red-300 text-sm" />
              <p className="text-[10px] sm:text-xs text-red-300 text-center leading-tight">
                Réessayez ! Pensez à éteindre les appareils inutiles et à utiliser les heures creuses.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-2 sm:p-3 border-t-2 border-cyan-500/20 bg-gray-900/50 flex flex-col sm:flex-row gap-1.5 sm:gap-2">
          <button
            onClick={onBackToMenu}
            className="flex-1 py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-bold text-[10px] sm:text-xs transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <HomeOutlined /> Menu Principal
          </button>
          {dayResults.hasNextDay ? (
            // Jour 1 (tutoriel) : toujours permettre de continuer
            (dayResults.day === 1 || allSuccess) ? (
              <button
                onClick={onNextDay}
                className="flex-1 py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-[10px] sm:text-xs transition-all active:scale-95 shadow-lg neon-blue flex items-center justify-center gap-2"
              >
                Jour Suivant <ArrowRightOutlined />
              </button>
            ) : (
              <button
                onClick={onBackToMenu}
                className="flex-1 py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-[10px] sm:text-xs transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                <RedoOutlined /> Réessayer
              </button>
            )
          ) : (
            <button
              onClick={onBackToMenu}
              className="flex-1 py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-[10px] sm:text-xs transition-all active:scale-95 shadow-lg neon-purple flex items-center justify-center gap-2"
            >
              <RedoOutlined /> Rejouer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayRecapModal;
