import React from 'react';
import Appliance from './Appliance';
import { ROOMS, APPLIANCES } from '../../data/appliances';

const Room = ({ roomId }) => {
  const room = ROOMS[roomId];

  if (!room) return null;

  // Trouver tous les appareils de cette pièce
  const roomAppliances = Object.entries(APPLIANCES)
    .filter(([id, appliance]) => appliance.room === roomId)
    .map(([id]) => id);

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-5 border-2 border-gray-700/50">
      {/* En-tête de la pièce */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2 border-b-2 border-cyan-500/20">
        <span className="text-xl sm:text-2xl md:text-3xl">{room.icon}</span>
        <h3 className="font-bold text-sm sm:text-base md:text-lg text-white">{room.name}</h3>
      </div>

      {/* Grille des appareils */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        {roomAppliances.map(applianceId => (
          <Appliance key={applianceId} applianceId={applianceId} />
        ))}
      </div>

      {roomAppliances.length === 0 && (
        <p className="text-xs sm:text-sm text-gray-400 text-center py-3 sm:py-4">
          Aucun appareil dans cette pièce
        </p>
      )}
    </div>
  );
};

export default Room;
