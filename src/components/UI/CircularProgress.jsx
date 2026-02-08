import React from 'react';

const CircularProgress = ({
  value,
  maxValue,
  label,
  icon,
  color = 'cyan',
  size = 'normal', // 'small', 'normal', 'large'
  format = 'decimal', // 'decimal', 'percent'
  decimals = 2
}) => {
  // Calculer le pourcentage
  const percentage = maxValue ? Math.min((value / maxValue) * 100, 100) : 0;

  // Dimensions selon la taille
  const dimensions = {
    small: { radius: 28, stroke: 4, fontSize: 'text-xs', iconSize: '14px' },
    normal: { radius: 35, stroke: 5, fontSize: 'text-sm sm:text-base', iconSize: '16px' },
    large: { radius: 42, stroke: 6, fontSize: 'text-base sm:text-lg', iconSize: '18px' }
  };

  const { radius, stroke, fontSize, iconSize } = dimensions[size] || dimensions.normal;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Couleurs selon le type
  const colors = {
    cyan: {
      stroke: 'stroke-cyan-500',
      bg: 'stroke-cyan-900/30',
      text: 'text-cyan-400',
      glow: 'drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]'
    },
    green: {
      stroke: 'stroke-green-500',
      bg: 'stroke-green-900/30',
      text: 'text-green-400',
      glow: 'drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]'
    },
    yellow: {
      stroke: 'stroke-yellow-500',
      bg: 'stroke-yellow-900/30',
      text: 'text-yellow-400',
      glow: 'drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]'
    },
    orange: {
      stroke: 'stroke-orange-500',
      bg: 'stroke-orange-900/30',
      text: 'text-orange-400',
      glow: 'drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]'
    },
    red: {
      stroke: 'stroke-red-500',
      bg: 'stroke-red-900/30',
      text: 'text-red-400',
      glow: 'drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'
    }
  };

  const colorScheme = colors[color] || colors.cyan;

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Cercle de fond */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={colorScheme.bg}
          />
          {/* Cercle de progression */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={`${colorScheme.stroke} ${colorScheme.glow} transition-all duration-500`}
          />
        </svg>

        {/* Contenu au centre */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && (
            <div className={`${colorScheme.text} mb-0.5`} style={{ fontSize: iconSize }}>
              {icon}
            </div>
          )}
          <div className={`font-black ${fontSize} ${colorScheme.text} leading-none`}>
            {format === 'percent' ? `${Math.round(value)}%` : value.toFixed(decimals)}
          </div>
        </div>
      </div>

      {/* Label en dessous */}
      {label && (
        <div className="mt-1 sm:mt-1.5">
          <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase font-bold text-center">
            {label}
          </p>
          {maxValue && (
            <p className="text-[8px] sm:text-[9px] text-center text-gray-500">
              / {maxValue}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
