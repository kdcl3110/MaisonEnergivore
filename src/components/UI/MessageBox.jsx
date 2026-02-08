import React, { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';

const MessageBox = () => {
  const { currentMessage } = useGame();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (currentMessage) {
      setShouldRender(true);
      // Petit délai pour l'animation d'entrée
      setTimeout(() => setIsVisible(true), 50);

      // Durée d'affichage : 8 secondes (avant c'était 5)
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Attendre la fin de l'animation avant de retirer du DOM
        setTimeout(() => setShouldRender(false), 500);
      }, 8000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 500);
    }
  }, [currentMessage]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 500);
  };

  if (!currentMessage || !shouldRender) return null;

  const getTypeStyles = () => {
    switch (currentMessage.type) {
      case 'error':
        return 'bg-gradient-to-r from-red-900 to-red-800 border-red-500 shadow-red-500/50';
      case 'success':
        return 'bg-gradient-to-r from-green-900 to-green-800 border-green-500 shadow-green-500/50';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-900 to-yellow-800 border-yellow-500 shadow-yellow-500/50';
      case 'tutorial':
      case 'info':
        return 'bg-gradient-to-r from-blue-900 to-blue-800 border-blue-500 shadow-blue-500/50';
      case 'celebration':
        return 'bg-gradient-to-r from-purple-900 to-purple-800 border-purple-500 shadow-purple-500/50';
      default:
        return 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-500 shadow-gray-500/50';
    }
  };

  const getIcon = () => {
    switch (currentMessage.type) {
      case 'error': return '❌';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'tutorial': return '📖';
      case 'info': return 'ℹ️';
      case 'celebration': return '🎉';
      default: return '💬';
    }
  };

  return (
    <div className={`
      fixed top-32 left-4 right-4 z-50 max-w-lg mx-auto
      transition-all duration-500 ease-out
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}
    `}>
      <div className={`
        border-2 rounded-2xl shadow-2xl p-4
        backdrop-blur-lg
        ${getTypeStyles()}
      `}>
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center text-2xl">
              {getIcon()}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-sm leading-tight mb-1">
              {currentMessage.text}
            </p>
            {currentMessage.tip && (
              <p className="text-xs text-gray-300 leading-tight mt-2 bg-black/20 rounded-lg p-2">
                💡 {currentMessage.tip}
              </p>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 w-8 h-8 rounded-lg bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors active:scale-90"
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-black/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/50 rounded-full animate-shrink"
            style={{ animation: 'shrink 8s linear forwards' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
