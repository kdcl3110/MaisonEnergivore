import React from 'react';
import { MISSIONS } from '../../data/missions';
import {
  TrophyOutlined,
  ThunderboltOutlined,
  EuroOutlined,
  SmileOutlined,
  ClockCircleOutlined,
  RocketOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const ObjectivesModal = ({ isOpen, onStart, scenario, isReview = false, onClose }) => {
  if (!isOpen || !scenario) return null;

  const { objectives, name, title, description } = scenario;
  const dayMissions = MISSIONS[`day${scenario.id}`] || [];
  const solarEnabled = scenario.solar?.enabled;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className="relative w-full max-w-md my-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl border-2 border-cyan-500 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 text-center border-b-2 border-cyan-500/50 bg-gradient-to-r from-cyan-900/50 to-blue-900/50">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrophyOutlined className="text-3xl sm:text-4xl text-yellow-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
            {title || name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            {description}
          </p>
        </div>

        {/* Objectifs */}
        <div className="p-4 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircleOutlined className="text-cyan-400 text-lg" />
            <h3 className="text-base sm:text-lg font-bold text-white">Objectifs :</h3>
          </div>

          {/* Consommation */}
          {objectives?.consumption && (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-3 border border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <ThunderboltOutlined className="text-white text-lg sm:text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Consommation maximale</p>
                  <p className="text-base sm:text-lg font-bold text-cyan-400">
                    &le; {objectives.consumption} kWh
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Ne pas depasser cette consommation d'energie
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Budget */}
          {objectives?.budget && (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-3 border border-green-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <EuroOutlined className="text-white text-lg sm:text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Budget maximum</p>
                  <p className="text-base sm:text-lg font-bold text-green-400">
                    &le; {objectives.budget.toFixed(2)} &euro;
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Ne pas depasser ce budget journalier
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Confort */}
          {objectives?.comfort && (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-3 border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <SmileOutlined className="text-white text-lg sm:text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Confort minimum</p>
                  <p className="text-base sm:text-lg font-bold text-yellow-400">
                    &ge; {objectives.comfort}%
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Maintenir ce niveau de confort minimum
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Heures creuses */}
          {objectives?.offPeakPercentage && (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-3 border border-purple-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <ClockCircleOutlined className="text-white text-lg sm:text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Heures creuses</p>
                  <p className="text-base sm:text-lg font-bold text-purple-400">
                    &ge; {objectives.offPeakPercentage}%
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Consommation pendant les heures creuses (22h-6h)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Energie verte */}
          {objectives?.greenEnergyPercentage && (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-3 border border-amber-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg sm:text-xl">☀️</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Energie verte</p>
                  <p className="text-base sm:text-lg font-bold text-amber-400">
                    &ge; {objectives.greenEnergyPercentage}%
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Autoconsommation solaire. Lancez les appareils quand le soleil brille !
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Missions obligatoires */}
          {dayMissions.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">📋</span>
                <h3 className="text-sm sm:text-base font-bold text-amber-300">Missions obligatoires :</h3>
              </div>
              <div className="space-y-2">
                {dayMissions.map(mission => (
                  <div key={mission.id} className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-2.5 flex items-start gap-2.5">
                    <span className="text-lg flex-shrink-0">{mission.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-amber-200">{mission.label}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{mission.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] sm:text-[10px] text-amber-400 font-bold">
                          {mission.requiredHours}h requises
                        </span>
                        {mission.timeWindow && (
                          <span className="text-[9px] sm:text-[10px] text-gray-500">
                            ({mission.timeWindow.start}h-{mission.timeWindow.end}h)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-2 mt-2 flex items-start gap-2">
                <span className="text-xs mt-0.5">⚠️</span>
                <p className="text-[10px] sm:text-xs text-red-300">
                  <strong>Attention :</strong> Si toutes les missions ne sont pas completees, vous ne pourrez pas obtenir plus d'1 etoile !
                </p>
              </div>
            </div>
          )}

          {/* Solar info */}
          {solarEnabled && (
            <div className="bg-amber-900/15 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2">
              <span className="text-base mt-0.5 flex-shrink-0">☀️</span>
              <div>
                <p className="text-xs sm:text-sm text-amber-200 font-bold">Panneaux solaires actifs</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                  Meteo : {scenario.solar.weather === 'sunny' ? 'Ensoleille' : scenario.solar.weather === 'cloudy' ? 'Nuageux' : scenario.solar.weather} |
                  Puissance max : {scenario.solar.peakProductionW}W |
                  Production : 8h-18h (pic a 13h)
                </p>
              </div>
            </div>
          )}

          {/* Tutoriel - Pas d'objectifs */}
          {scenario.isTutorial && (
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-3 flex items-start gap-2">
              <TrophyOutlined className="text-blue-300 text-lg mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-blue-300 leading-relaxed">
                <strong>Mode Tutoriel :</strong> Aucun objectif requis ! Profitez-en pour decouvrir le jeu et tester les differents appareils.
              </p>
            </div>
          )}

          {/* Message d'encouragement */}
          {!scenario.isTutorial && (
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-3 flex items-start gap-2">
              <CheckCircleOutlined className="text-cyan-300 text-base mt-0.5 flex-shrink-0" />
              <p className="text-[10px] sm:text-xs text-cyan-300 leading-relaxed">
                <strong>Astuce :</strong> Atteignez au moins 2 objectifs sur 3 pour debloquer le jour suivant. Atteignez les 3 pour obtenir 3 etoiles !
              </p>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="p-4 border-t-2 border-cyan-500/20 bg-gray-900/50">
          <button
            onClick={isReview ? onClose : onStart}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-base transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            {isReview ? (
              <>
                <CheckCircleOutlined style={{ fontSize: '18px' }} />
                Compris !
              </>
            ) : (
              <>
                <RocketOutlined style={{ fontSize: '18px' }} />
                Commencer la partie
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ObjectivesModal;
