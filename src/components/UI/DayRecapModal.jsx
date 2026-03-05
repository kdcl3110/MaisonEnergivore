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
  if (!isOpen || !dayResults) return null;

  const { currentScenario } = useGame();

  // Utiliser les valeurs pré-calculées dans endDay() (source unique de vérité)
  const consumptionObjective = dayResults.consumptionObjective;
  const budgetObjective = dayResults.budgetObjective;
  const comfortObjective = dayResults.comfortObjective;

  const consumptionSuccess = dayResults.consumptionSuccess;
  const budgetSuccess = dayResults.budgetSuccess;
  const comfortSuccess = dayResults.comfortSuccess;

  // Étoiles calculées une seule fois dans endDay()
  const stars = dayResults.stars;
  const hasMissions = dayResults.missions && dayResults.missions.length > 0;

  const allSuccess = stars === 3;
  const partialSuccess = stars >= 2;

  const getStatusIcon = (success) => success ? <CheckCircleOutlined className="text-green-400" /> : <CloseCircleOutlined className="text-red-400" />;
  const getStatusColor = (success) => success ? 'text-green-400' : 'text-red-400';

  const solarEnabled = currentScenario?.solar?.enabled;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4 animate-fade-in overflow-y-auto">
      {/* Modal Content */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg my-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl border-2 border-cyan-500/50 shadow-2xl overflow-hidden animate-slide-up max-h-[95vh] overflow-y-auto">
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
              {allSuccess ? 'PARFAIT !' : partialSuccess ? 'BIEN JOUE !' : 'REESSAYEZ !'}
            </h2>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-300">
            Jour {currentScenario?.day || dayResults.day} - {currentScenario?.name || 'Recapitulatif'}
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
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${consumptionSuccess ? 'bg-green-500' : 'bg-red-500'}`}
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
                    {dayResults.budget.toFixed(2)} / {budgetObjective.toFixed(2)} &euro;
                  </p>
                </div>
              </div>
              <div className="text-lg sm:text-xl">{getStatusIcon(budgetSuccess)}</div>
            </div>
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${budgetSuccess ? 'bg-green-500' : 'bg-red-500'}`}
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
                className={`h-full transition-all duration-500 ${comfortSuccess ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${dayResults.comfort}%` }}
              ></div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className={`grid ${solarEnabled ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'} gap-2 mt-2 sm:mt-3`}>
            <div className="bg-blue-900/20 rounded-lg p-1.5 sm:p-2 border border-blue-500/30">
              <p className="text-[9px] sm:text-[10px] text-blue-300">Heures Creuses</p>
              <p className="text-xs sm:text-sm font-bold text-white">{dayResults.offPeak.toFixed(2)} kWh</p>
            </div>
            <div className="bg-orange-900/20 rounded-lg p-1.5 sm:p-2 border border-orange-500/30">
              <p className="text-[9px] sm:text-[10px] text-orange-300">Heures Pleines</p>
              <p className="text-xs sm:text-sm font-bold text-white">{dayResults.peak.toFixed(2)} kWh</p>
            </div>
            {solarEnabled && (
              <>
                <div className="bg-amber-900/20 rounded-lg p-1.5 sm:p-2 border border-amber-500/30">
                  <p className="text-[9px] sm:text-[10px] text-amber-300">Production Solaire</p>
                  <p className="text-xs sm:text-sm font-bold text-white">{(dayResults.solarProduction || 0).toFixed(2)} kWh</p>
                </div>
                <div className="bg-yellow-900/20 rounded-lg p-1.5 sm:p-2 border border-yellow-500/30">
                  <p className="text-[9px] sm:text-[10px] text-yellow-300">Energie Verte</p>
                  <p className="text-xs sm:text-sm font-bold text-white">{Math.round(dayResults.greenEnergyPercentage || 0)}%</p>
                </div>
              </>
            )}
          </div>

          {/* Missions section */}
          {hasMissions && (
            <div className="mt-2 sm:mt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">📋</span>
                <h3 className="text-xs sm:text-sm font-bold text-amber-300">
                  Missions {dayResults.allMissionsCompleted ? '- Toutes completees !' : '- Incompletes'}
                </h3>
              </div>
              <div className="space-y-1.5">
                {dayResults.missions.map(mission => {
                  const isComplete = mission.progress.completed;
                  const progressPercent = Math.min(
                    (mission.progress.hoursCompleted / mission.requiredHours) * 100,
                    100
                  );

                  return (
                    <div
                      key={mission.id}
                      className={`rounded-lg p-2 border flex items-center gap-2 ${
                        isComplete
                          ? 'bg-green-900/20 border-green-500/30'
                          : 'bg-red-900/20 border-red-500/30'
                      }`}
                    >
                      <span className="text-base flex-shrink-0">{mission.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] sm:text-xs font-bold truncate ${
                            isComplete ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {mission.label}
                          </span>
                          <span className="text-xs flex-shrink-0 ml-1">
                            {isComplete
                              ? <CheckCircleOutlined className="text-green-400" />
                              : <CloseCircleOutlined className="text-red-400" />
                            }
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isComplete ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                        <span className="text-[8px] sm:text-[9px] text-gray-500">
                          {mission.progress.hoursCompleted}h / {mission.requiredHours}h
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!dayResults.allMissionsCompleted && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-2 mt-2 flex items-start gap-2">
                  <WarningOutlined className="text-red-300 text-xs mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] sm:text-xs text-red-300">
                    Missions incompletes : maximum 1 etoile !
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Message */}
          {allSuccess ? (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 mt-2 sm:mt-3 flex items-center justify-center gap-2">
              <StarFilled className="text-green-300 text-sm" />
              <p className="text-[10px] sm:text-xs text-green-300 text-center leading-tight">
                Excellent ! Vous maitrisez parfaitement votre consommation d'energie !
              </p>
            </div>
          ) : partialSuccess ? (
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 mt-2 sm:mt-3 flex items-center justify-center gap-2">
              <BulbOutlined className="text-yellow-300 text-sm" />
              <p className="text-[10px] sm:text-xs text-yellow-300 text-center leading-tight">
                Bon travail ! Essayez de profiter davantage des heures creuses{solarEnabled ? ' et du solaire' : ''}.
              </p>
            </div>
          ) : (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 mt-2 sm:mt-3 flex items-center justify-center gap-2">
              <WarningOutlined className="text-red-300 text-sm" />
              <p className="text-[10px] sm:text-xs text-red-300 text-center leading-tight">
                Reessayez ! Pensez a eteindre les appareils inutiles{solarEnabled ? ', a lancer les gros appareils pendant les pics solaires' : ''} et a utiliser les heures creuses.
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
                <RedoOutlined /> Reessayer
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
