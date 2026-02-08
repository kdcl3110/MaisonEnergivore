import React from 'react';
import {
  TrophyOutlined,
  ThunderboltOutlined,
  EuroOutlined,
  SmileOutlined,
  ClockCircleOutlined,
  RocketOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const ObjectivesModal = ({ isOpen, onStart, scenario }) => {
  if (!isOpen || !scenario) return null;

  const { objectives, name, title, description } = scenario;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className="relative w-full max-w-md my-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl border-2 border-cyan-500 shadow-2xl animate-slide-up">
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
            <h3 className="text-base sm:text-lg font-bold text-white">Objectifs à atteindre :</h3>
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
                    ≤ {objectives.consumption} kWh
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Ne pas dépasser cette consommation d'énergie
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
                    ≤ {objectives.budget.toFixed(2)} €
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Ne pas dépasser ce budget journalier
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
                    ≥ {objectives.comfort}%
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
                    ≥ {objectives.offPeakPercentage}%
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Consommation pendant les heures creuses (22h-6h)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tutoriel - Pas d'objectifs */}
          {scenario.isTutorial && (
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-3 flex items-start gap-2">
              <TrophyOutlined className="text-blue-300 text-lg mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-blue-300 leading-relaxed">
                <strong>Mode Tutoriel :</strong> Aucun objectif requis ! Profitez-en pour découvrir le jeu et tester les différents appareils.
              </p>
            </div>
          )}

          {/* Message d'encouragement */}
          {!scenario.isTutorial && (
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-3 flex items-start gap-2">
              <CheckCircleOutlined className="text-cyan-300 text-base mt-0.5 flex-shrink-0" />
              <p className="text-[10px] sm:text-xs text-cyan-300 leading-relaxed">
                <strong>Astuce :</strong> Atteignez au moins 2 objectifs sur 3 pour débloquer le jour suivant. Atteignez les 3 pour obtenir 3 étoiles !
              </p>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="p-4 border-t-2 border-cyan-500/20 bg-gray-900/50">
          <button
            onClick={onStart}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-base transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <RocketOutlined style={{ fontSize: '18px' }} />
            Commencer la partie
          </button>
        </div>
      </div>
    </div>
  );
};

export default ObjectivesModal;
