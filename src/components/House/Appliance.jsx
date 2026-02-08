import React from 'react';
import { useGame } from '../../context/GameContext';

const Appliance = ({ applianceId }) => {
  const { APPLIANCES, appliancesState, toggleAppliance, isPlaying } = useGame();

  const appliance = APPLIANCES[applianceId];
  const isOn = appliancesState[applianceId];

  if (!appliance) return null;

  const handleClick = () => {
    if (appliance.canToggle && isPlaying) {
      toggleAppliance(applianceId);
    }
  };

  const getApplianceIcon = () => {
    switch (applianceId) {
      case 'refrigerator': return '🧊';
      case 'coffeeMaker': return '☕';
      case 'dishwasher': return '🍽️';
      case 'oven': return '🔥';
      case 'microwave': return '📦';
      case 'tv': return '📺';
      case 'console': return '🎮';
      case 'computer': return '💻';
      case 'washingMachine': return '🧺';
      case 'dryer': return '👕';
      case 'heating': return '🔥';
      case 'heatingLow': return '🔥';
      case 'airConditioning': return '❄️';
      case 'waterHeater': return '🚿';
      case 'lightsKitchen':
      case 'lightsLiving':
      case 'lightsOffice':
      case 'lightsBedroom':
      case 'lightsBathroom':
        return '💡';
      default: return '⚡';
    }
  };

  const getPowerLevel = () => {
    if (appliance.powerW >= 2000) return 'HIGH';
    if (appliance.powerW >= 1000) return 'MEDIUM';
    return 'LOW';
  };

  const getPowerColor = () => {
    if (appliance.powerW >= 2000) return 'from-red-500 to-orange-600';
    if (appliance.powerW >= 1000) return 'from-orange-500 to-yellow-600';
    return 'from-green-500 to-emerald-600';
  };

  return (
    <button
      onClick={handleClick}
      disabled={!appliance.canToggle || !isPlaying}
      className={`
        group relative p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl transition-all duration-300
        ${isOn
          ? 'bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-2 border-cyan-500 shadow-xl'
          : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-gray-700'
        }
        ${!appliance.canToggle || !isPlaying
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer active:scale-95 sm:hover:scale-105 sm:hover:shadow-2xl'
        }
        ${isOn && 'neon-blue'}
      `}
    >
      {/* Status LED */}
      <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2">
        <div className={`
          w-2 h-2 sm:w-3 sm:h-3 rounded-full
          ${isOn ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' : 'bg-gray-600'}
        `}></div>
      </div>

      {/* Power level indicator */}
      {isOn && (
        <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2">
          <div className={`
            px-1.5 sm:px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-wider
            bg-gradient-to-r ${getPowerColor()} text-white
          `}>
            {getPowerLevel()}
          </div>
        </div>
      )}

      {/* Icône de l'appareil */}
      <div className={`
        text-3xl sm:text-4xl md:text-5xl mb-1 sm:mb-2 text-center transition-all duration-300
        ${isOn ? 'scale-110 animate-bounce-slow' : 'grayscale opacity-60'}
      `}>
        {getApplianceIcon()}
      </div>

      {/* Nom de l'appareil */}
      <p className={`
        text-[10px] sm:text-xs md:text-sm font-bold text-center mb-1 sm:mb-2 transition-colors line-clamp-1
        ${isOn ? 'text-cyan-400' : 'text-gray-500'}
      `}>
        {appliance.name}
      </p>

      {/* Consommation - Style HUD */}
      <div className={`
        inline-flex items-center gap-1 sm:gap-2 w-full justify-center
        px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold
        ${isOn
          ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 text-yellow-400'
          : 'bg-gray-900/50 text-gray-500'
        }
      `}>
        <span className="text-xs sm:text-sm">⚡</span>
        <span>{appliance.powerW}W</span>
      </div>

      {/* Badges spéciaux */}
      <div className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 flex flex-col gap-1">
        {appliance.offPeakRecommended && (
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center text-[10px] sm:text-xs shadow-lg neon-purple">
            🌙
          </div>
        )}
        {appliance.alwaysOn && (
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-red-600 to-rose-700 rounded-full flex items-center justify-center text-[7px] sm:text-[8px] font-bold text-white shadow-lg">
            24h
          </div>
        )}
      </div>

      {/* ON/OFF label */}
      <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2">
        <div className={`
          px-1.5 sm:px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-wider
          ${isOn
            ? 'bg-green-500 text-white'
            : 'bg-gray-700 text-gray-400'
          }
        `}>
          {isOn ? 'ON' : 'OFF'}
        </div>
      </div>

      {/* Hover effect */}
      {appliance.canToggle && (
        <div className={`
          absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity
          bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0
        `}></div>
      )}
    </button>
  );
};

export default Appliance;
