import React from 'react';
import { useGame } from '../../context/GameContext';
import { SCENARIOS } from '../../data/scenarios';

const LevelSelect = () => {
  const { unlockedDays, startNewDay, daysHistory, bestScores } = useGame();

  const getDayStars = (dayNumber) => {
    // Utiliser le meilleur score sauvegardé
    return bestScores[`day${dayNumber}`] || 0;
  };

  const handleDayClick = (dayNumber) => {
    if (!unlockedDays.includes(dayNumber)) {
      return; // Niveau verrouillé
    }
    startNewDay(dayNumber);
  };

  const levels = [
    { day: 1, icon: '📖', color: 'from-purple-600 to-purple-800' },
    { day: 2, icon: '⚡', color: 'from-cyan-600 to-blue-800' },
    { day: 3, icon: '❄️', color: 'from-blue-600 to-indigo-800' },
    { day: 4, icon: '🌙', color: 'from-indigo-600 to-purple-800' },
    { day: 5, icon: '🎲', color: 'from-orange-600 to-red-800' },
    { day: 6, icon: '🔥', color: 'from-red-600 to-pink-800' },
    { day: 7, icon: '🏆', color: 'from-yellow-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Scanlines effect */}
      <div className="scanlines fixed inset-0 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 text-gaming animate-fade-in">
            🏠 MA MAISON ÉNERGIVORE
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            Gérez votre consommation d'énergie sur 7 jours
          </p>
        </div>

        {/* Progress bar */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 bg-gray-800/50 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-cyan-500/30">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm text-gray-300">Progression</p>
            <p className="text-xs sm:text-sm font-bold text-cyan-400">{unlockedDays.length}/7 jours</p>
          </div>
          <div className="h-2 sm:h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
              style={{ width: `${(unlockedDays.length / 7) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {levels.map(({ day, icon, color }) => {
            const scenario = SCENARIOS[`day${day}`];
            const isUnlocked = unlockedDays.includes(day);
            const stars = getDayStars(day);
            const isCompleted = daysHistory.some(d => d.day === day) || stars > 0;

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                disabled={!isUnlocked}
                className={`
                  relative group
                  ${isUnlocked ? 'cursor-pointer active:scale-95' : 'cursor-not-allowed opacity-40'}
                  transition-all duration-300
                `}
              >
                <div className={`
                  relative overflow-hidden
                  bg-gradient-to-br ${color}
                  rounded-xl sm:rounded-2xl
                  border-2 ${isUnlocked ? 'border-cyan-400/50' : 'border-gray-600/30'}
                  p-4 sm:p-6
                  shadow-xl
                  ${isUnlocked ? 'hover:shadow-2xl hover:border-cyan-400' : ''}
                  ${isUnlocked ? 'hover:scale-105' : ''}
                `}>
                  {/* Lock overlay */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="text-4xl sm:text-6xl">🔒</div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3">{icon}</div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2">
                    {scenario?.name || `Jour ${day}`}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] sm:text-xs text-gray-200 mb-3 sm:mb-4 line-clamp-2">
                    {scenario?.description || 'Description à venir'}
                  </p>

                  {/* Stars (if completed) */}
                  {isCompleted && isUnlocked && (
                    <div className="flex justify-center gap-1 mb-2">
                      {[1, 2, 3].map(star => (
                        <div
                          key={star}
                          className={`text-base sm:text-xl ${
                            star <= stars
                              ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                              : 'opacity-20'
                          }`}
                        >
                          ⭐
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Badge */}
                  <div className={`
                    inline-block px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold
                    ${isCompleted
                      ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                      : isUnlocked
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                    }
                  `}>
                    {isCompleted ? '✓ Terminé' : isUnlocked ? '▶ Jouer' : '🔒 Verrouillé'}
                  </div>

                  {/* Glow effect on hover (only if unlocked) */}
                  {isUnlocked && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"
                         style={{
                           background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.3) 0%, transparent 70%)'
                         }}
                    ></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Tips */}
        <div className="max-w-2xl mx-auto mt-6 sm:mt-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-cyan-500/30 p-3 sm:p-4 md:p-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl sm:text-3xl flex-shrink-0">💡</div>
            <div>
              <h4 className="text-xs sm:text-sm md:text-base font-bold text-white mb-1 sm:mb-2">Comment jouer ?</h4>
              <ul className="text-[10px] sm:text-xs md:text-sm text-gray-300 space-y-1">
                <li>• Commencez par le <strong>Tutoriel (Jour 1)</strong> pour apprendre les bases</li>
                <li>• Réussissez au moins <strong>2 objectifs sur 3</strong> pour débloquer le jour suivant</li>
                <li>• Collectez des <strong>⭐ étoiles</strong> en atteignant tous les objectifs</li>
                <li>• Rejouez les niveaux débloqués pour améliorer votre score !</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
