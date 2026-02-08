import React from 'react';
import {
  BulbOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';

const SolutionModal = ({ isOpen, onClose, solution, dayNumber }) => {
  if (!isOpen || !solution) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-3 sm:p-4 animate-fade-in overflow-y-auto">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl my-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl border-2 border-yellow-500 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 p-4 sm:p-5 text-center border-b-2 border-yellow-500/50 bg-gradient-to-r from-yellow-900/50 to-orange-900/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <BulbOutlined className="text-white text-xl sm:text-2xl" />
              </div>
              <div className="text-left">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Solution - Jour {dayNumber}
                </h2>
                <p className="text-xs text-gray-300">Guide stratégique</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-2 w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition flex items-center justify-center flex-shrink-0"
            >
              <CloseOutlined style={{ fontSize: '14px' }} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Stratégie */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-3 sm:p-4">
            <div className="flex items-start gap-2 mb-2">
              <CheckCircleOutlined className="text-yellow-400 text-lg flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-yellow-400 mb-1">Stratégie globale</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {solution.strategy}
                </p>
              </div>
            </div>
          </div>

          {/* Étapes par tranche horaire */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ClockCircleOutlined className="text-cyan-400 text-lg" />
              <h3 className="text-sm sm:text-base font-bold text-white">Plan horaire</h3>
            </div>
            <div className="space-y-2">
              {solution.steps.map((step, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-3 border border-cyan-500/20">
                  <div className="flex items-start gap-2">
                    <div className="min-w-[60px] sm:min-w-[80px] px-2 py-1 bg-cyan-600/30 rounded text-[10px] sm:text-xs font-bold text-cyan-300 text-center flex-shrink-0">
                      {step.time}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed flex-1">
                      {step.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appareils recommandés/évités */}
          {solution.appliances && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ThunderboltOutlined className="text-purple-400 text-lg" />
                <h3 className="text-sm sm:text-base font-bold text-white">Guide des appareils</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {Object.entries(solution.appliances).map(([category, items]) => {
                  const categoryConfig = {
                    essential: { label: "Essentiels", color: "green", icon: "✓" },
                    always: { label: "Toujours ON", color: "green", icon: "✓" },
                    critical: { label: "Critiques", color: "green", icon: "✓" },
                    moderate: { label: "Modérés", color: "yellow", icon: "●" },
                    day: { label: "Journée", color: "yellow", icon: "☀" },
                    dayTime: { label: "Journée", color: "yellow", icon: "☀" },
                    evening: { label: "Soirée", color: "yellow", icon: "🌙" },
                    minimal: { label: "Minimum", color: "yellow", icon: "●" },
                    avoid: { label: "À éviter", color: "red", icon: "✗" },
                    forbidden: { label: "Interdits", color: "red", icon: "✗" },
                    never: { label: "Jamais", color: "red", icon: "✗" },
                    offPeak: { label: "Heures creuses", color: "cyan", icon: "⚡" },
                    offPeakOnly: { label: "HC uniquement", color: "cyan", icon: "⚡" },
                    offPeakBonus: { label: "HC bonus", color: "cyan", icon: "⚡" },
                    offPeakMassive: { label: "HC massif", color: "cyan", icon: "⚡" }
                  };

                  const config = categoryConfig[category] || { label: category, color: "gray", icon: "●" };
                  const colorClasses = {
                    green: "bg-green-900/20 border-green-500/30 text-green-300",
                    yellow: "bg-yellow-900/20 border-yellow-500/30 text-yellow-300",
                    red: "bg-red-900/20 border-red-500/30 text-red-300",
                    cyan: "bg-cyan-900/20 border-cyan-500/30 text-cyan-300",
                    purple: "bg-purple-900/20 border-purple-500/30 text-purple-300"
                  };

                  return (
                    <div
                      key={category}
                      className={`${colorClasses[config.color]} border rounded-lg p-2 sm:p-3`}
                    >
                      <p className="text-[10px] sm:text-xs font-bold mb-1.5">
                        {config.icon} {config.label}
                      </p>
                      <ul className="space-y-0.5">
                        {items.map((item, i) => (
                          <li key={i} className="text-[9px] sm:text-[10px] text-gray-300 leading-snug">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Conseils supplémentaires */}
          {solution.tips && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <WarningOutlined className="text-orange-400 text-lg" />
                <h3 className="text-sm sm:text-base font-bold text-white">Conseils importants</h3>
              </div>
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-3 sm:p-4 space-y-2">
                {solution.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 flex-shrink-0">💡</span>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Avertissement */}
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-3">
            <p className="text-[10px] sm:text-xs text-gray-400 text-center italic">
              ⚠️ Ceci est une solution optimale. Plusieurs stratégies peuvent fonctionner !
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-3 sm:p-4 border-t-2 border-yellow-500/20 bg-gray-900/90 backdrop-blur-sm">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold text-sm transition-all active:scale-95 shadow-lg"
          >
            Compris ! Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionModal;
