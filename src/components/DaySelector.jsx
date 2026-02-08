import React from 'react';
import { SCENARIOS } from '../data/scenarios';

const DaySelector = ({ onSelectDay }) => {
  const days = Object.values(SCENARIOS);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Scanlines effect */}
      <div className="scanlines absolute inset-0"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-7xl w-full">
          {/* Titre principal */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-block mb-6">
              <div className="text-8xl mb-4 animate-bounce-slow">⚡</div>
            </div>
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4 text-gaming">
              MAISON ÉNERGIVORE
            </h1>
            <p className="text-2xl text-cyan-400 font-bold mb-2 text-glow-green">
              ⚡ CHALLENGE ÉNERGÉTIQUE ⚡
            </p>
            <p className="text-lg text-gray-400">
              Gérez votre consommation • Économisez • Gagnez 🇧🇪
            </p>
          </div>

          {/* Sélection des jours - Grid gaming */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {days.map((day, index) => (
              <button
                key={day.id}
                onClick={() => onSelectDay(day.id)}
                className="group relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up glass-dark border-2 border-cyan-500/30 hover:border-cyan-400"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Numéro du jour - Style gaming */}
                <div className="relative mb-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-black text-white shadow-lg neon-blue group-hover:scale-110 transition-transform">
                    {day.id}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {day.name}
                    </h3>
                    <p className="text-sm text-cyan-400 font-semibold">{day.title}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {day.description}
                </p>

                {/* Objectifs - Pills gaming */}
                {day.objectives && (
                  <div className="flex flex-wrap gap-2">
                    {day.objectives.consumption && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 text-yellow-400 text-xs font-bold">
                        ⚡ {day.objectives.consumption} kWh
                      </span>
                    )}
                    {day.objectives.budget && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 text-green-400 text-xs font-bold">
                        💰 €{day.objectives.budget}
                      </span>
                    )}
                    {day.objectives.comfort && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/50 text-pink-400 text-xs font-bold">
                        😊 {day.objectives.comfort}%
                      </span>
                    )}
                    {day.isTutorial && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/50 text-purple-400 text-xs font-bold animate-pulse">
                        📖 TUTORIEL
                      </span>
                    )}
                  </div>
                )}

                {/* Play indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-2xl animate-pulse">
                    ▶️
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Info bottom - Style HUD */}
          <div className="glass-dark rounded-2xl p-6 border-2 border-cyan-500/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2">💡</div>
                <p className="text-cyan-400 font-bold text-sm">COMMENCEZ PAR LE JOUR 1</p>
                <p className="text-gray-400 text-xs">Apprenez les bases du jeu</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🇧🇪</div>
                <p className="text-yellow-400 font-bold text-sm">MOYENNE BELGE</p>
                <p className="text-gray-400 text-xs">9.6 kWh/jour • Pouvez-vous faire mieux ?</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🏆</div>
                <p className="text-green-400 font-bold text-sm">7 JOURS DE CHALLENGE</p>
                <p className="text-gray-400 text-xs">Devenez un expert de l'énergie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaySelector;
