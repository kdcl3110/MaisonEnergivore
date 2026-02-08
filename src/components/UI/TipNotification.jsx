import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { BulbOutlined } from '@ant-design/icons';

const TipNotification = ({ tip, onAccept, onDismiss }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleAccept = () => {
    setIsClosing(true);
    setTimeout(() => onAccept(), 300);
  };

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => onDismiss(), 300);
  };

  if (!tip) return null;

  return (
    <div
      className={`fixed top-32 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto max-w-md transition-all duration-300 ${
        isClosing ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 border-2 border-cyan-400 rounded-xl shadow-2xl p-3 sm:p-4 neon-blue">
        {/* Icon + Title */}
        <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
            <BulbOutlined className="text-cyan-300" style={{ fontSize: '18px' }} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-cyan-300 mb-1">Conseil Intelligent</h4>
            <p className="text-[10px] sm:text-xs text-white leading-tight">
              {tip.message}
            </p>
          </div>
        </div>

        {/* Reason */}
        {tip.reason && (
          <div className="bg-black/30 rounded-lg p-2 mb-2 sm:mb-3">
            <p className="text-[9px] sm:text-[10px] text-cyan-200 leading-tight">
              <span className="font-bold">Raison :</span> {tip.reason}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleDismiss}
            className="flex-1 py-1.5 sm:py-2 px-3 rounded-lg bg-gray-700/80 hover:bg-gray-600 text-white font-bold text-[10px] sm:text-xs transition-all active:scale-95"
          >
            Plus tard
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 py-1.5 sm:py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-[10px] sm:text-xs shadow-lg neon-blue transition-all active:scale-95"
          >
            {tip.action || 'Activer'} ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipNotification;
