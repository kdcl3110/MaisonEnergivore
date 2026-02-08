import React from 'react';
import Room from './Room';
import Appliance from './Appliance';

const HouseLayout = () => {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      {/* Chauffage / Climatisation (toute la maison) */}
      <div className="bg-gradient-to-r from-orange-900/30 to-blue-900/30 backdrop-blur-sm rounded-lg sm:rounded-xl border-2 border-cyan-500/30 p-3 sm:p-4 md:p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="text-xl sm:text-2xl md:text-3xl">🏠</span>
          <h3 className="font-bold text-sm sm:text-base md:text-lg text-white">Toute la Maison</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          <Appliance applianceId="heating" />
          <Appliance applianceId="heatingLow" />
          <Appliance applianceId="airConditioning" />
        </div>
      </div>

      {/* Grille des pièces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
        <Room roomId="kitchen" />
        <Room roomId="living" />
        <Room roomId="office" />
        <Room roomId="bedroom" />
        <Room roomId="bathroom" />
        <Room roomId="laundry" />
      </div>
    </div>
  );
};

export default HouseLayout;
