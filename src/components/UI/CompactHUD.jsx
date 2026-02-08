import React from 'react';
import { useGame } from '../../context/GameContext';
import { isOffPeakHour } from '../../data/appliances';
import CircularProgress from './CircularProgress';
import {
  ThunderboltOutlined,
  DollarOutlined,
  SmileOutlined,
  MoonOutlined,
  SunOutlined,
  HomeOutlined,
  PauseOutlined,
  CaretRightOutlined,
  TrophyOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

const CompactHUD = ({ onShowSolution }) => {
  const {
    gameTime,
    currentDay,
    todayConsumption,
    todayBudget,
    todayComfort,
    getConsumptionLimit,
    currentScenario,
    getCurrentPowerConsumption,
    isPlaying,
    togglePause,
    gameSpeed,
    setGameSpeed,
    advanceTime,
    goToMenu
  } = useGame();

  const consumptionLimit = getConsumptionLimit();
  const budgetLimit = currentScenario?.objectives?.budget;
  const comfortLimit = currentScenario?.objectives?.comfort;
  const currentPower = getCurrentPowerConsumption();

  const isOffPeak = isOffPeakHour(gameTime);
  const timeString = `${gameTime.toString().padStart(2, '0')}:00`;

  const getConsumptionColor = () => {
    if (!consumptionLimit) return 'text-cyan-400';
    const percentage = (todayConsumption / consumptionLimit) * 100;
    if (percentage >= 100) return 'text-red-400';
    if (percentage >= 80) return 'text-orange-400';
    return 'text-green-400';
  };

  const getBudgetColor = () => {
    if (!budgetLimit) return 'text-cyan-400';
    const percentage = (todayBudget / budgetLimit) * 100;
    if (percentage >= 100) return 'text-red-400';
    if (percentage >= 80) return 'text-orange-400';
    return 'text-green-400';
  };

  const getComfortColor = () => {
    if (todayComfort >= 80) return 'text-green-400';
    if (todayComfort >= 60) return 'text-yellow-400';
    if (todayComfort >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-gray-900 to-gray-900/95 backdrop-blur-lg border-b-2 border-cyan-500/30 shadow-2xl">
      {/* Top bar - Day, Controls, Power & Time */}
      <div className="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 border-b border-cyan-500/20">
        {/* Left: Day info + Help button */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] sm:text-xs font-black">
            {currentDay}
          </div>
          <div className="hidden sm:block">
            <p className="text-[8px] sm:text-[9px] text-gray-400 leading-tight">JOUR</p>
            <p className="text-[9px] sm:text-[10px] text-white font-bold leading-tight">{currentScenario?.name?.replace('Jour ' + currentDay + ' - ', '')}</p>
          </div>
          {/* Help button */}
          <button
            onClick={onShowSolution}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 flex items-center justify-center shadow-lg transition-all active:scale-95 ml-1"
            title="Voir la solution"
          >
            <QuestionCircleOutlined className="text-white" style={{ fontSize: '14px' }} />
          </button>
        </div>

        {/* Center: Game Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 mx-1 sm:mx-2">
          {/* Menu */}
          <button
            onClick={goToMenu}
            className="py-1 px-1.5 sm:py-1.5 sm:px-2 rounded bg-gray-700 hover:bg-gray-600 text-white font-bold text-[9px] sm:text-[10px] active:scale-95 transition-all flex items-center justify-center"
          >
            <HomeOutlined style={{ fontSize: '12px' }} />
          </button>

          {/* Pause/Play */}
          <button
            onClick={togglePause}
            className={`py-1 px-1.5 sm:py-1.5 sm:px-2 rounded font-bold text-[9px] sm:text-[10px] transition-all ${
              isPlaying
                ? 'bg-orange-500/70 hover:bg-orange-600/80 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            } active:scale-95 flex items-center justify-center`}
          >
            {isPlaying ? <PauseOutlined style={{ fontSize: '12px' }} /> : <CaretRightOutlined style={{ fontSize: '12px' }} />}
          </button>

          {/* Speed */}
          <button
            onClick={() => setGameSpeed(gameSpeed === 1 ? 2 : 1)}
            className="py-1 px-1.5 sm:py-1.5 sm:px-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-bold text-[9px] sm:text-[10px] active:scale-95 transition-all"
          >
            {gameSpeed === 1 ? '1x' : '2x'}
          </button>

          {/* Next Hour */}
          <button
            onClick={advanceTime}
            disabled={gameTime >= 24}
            className="py-1 px-1.5 sm:py-1.5 sm:px-2 rounded bg-cyan-600 hover:bg-cyan-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-[9px] sm:text-[10px] active:scale-95 transition-all"
          >
            +1h
          </button>
        </div>

        {/* Right: Power & Time */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          {/* Puissance Active */}
          <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center gap-0.5">
            <ThunderboltOutlined className="text-yellow-400" style={{ fontSize: '10px' }} />
            <span className="text-[9px] sm:text-[10px] font-bold text-yellow-400">
              {currentPower}W
            </span>
          </div>

          {/* Heure */}
          <div className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${isOffPeak ? 'bg-green-500/20 border border-green-500' : 'bg-cyan-500/20 border border-cyan-500/50'} flex items-center gap-0.5`}>
            {isOffPeak ? <MoonOutlined className="text-green-400" style={{ fontSize: '10px' }} /> : <SunOutlined className="text-cyan-400" style={{ fontSize: '10px' }} />}
            <span className={`text-[9px] sm:text-[10px] font-bold ${isOffPeak ? 'text-green-400' : 'text-cyan-400'}`}>
              {timeString}
            </span>
          </div>
        </div>
      </div>

      {/* Challenge Description Banner */}
      {currentScenario?.description && (
        <div className="px-2 sm:px-3 py-1.5 sm:py-2 border-b border-cyan-500/20 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <TrophyOutlined className="text-yellow-400 flex-shrink-0" style={{ fontSize: '14px' }} />
            <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-300 leading-tight flex-1">
              <span className="font-bold text-cyan-400">{currentScenario.title || 'Défi du jour'}</span>
              <span className="hidden sm:inline"> : {currentScenario.description}</span>
            </p>
          </div>
        </div>
      )}

      {/* Compact metrics */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-3">
        {/* Energy - Circular */}
        <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-cyan-500/20 flex items-center justify-center">
          <CircularProgress
            value={todayConsumption}
            maxValue={consumptionLimit}
            label="kWh"
            icon={<ThunderboltOutlined />}
            color={
              !consumptionLimit ? 'cyan' :
              (todayConsumption / consumptionLimit) >= 1 ? 'red' :
              (todayConsumption / consumptionLimit) >= 0.8 ? 'orange' :
              'green'
            }
            size="normal"
          />
        </div>

        {/* Budget - Style classique */}
        <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-1.5 sm:p-2 border border-green-500/20">
          <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
            <DollarOutlined className="text-green-400" style={{ fontSize: '14px' }} />
            <span className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-bold">EUR</span>
          </div>
          <div className={`text-center text-base sm:text-lg font-black ${getBudgetColor()}`}>
            {todayBudget.toFixed(2)}
          </div>
          {budgetLimit && (
            <div className="text-[8px] sm:text-[9px] text-center text-gray-500 mt-0.5">
              / {budgetLimit.toFixed(2)}
            </div>
          )}
        </div>

        {/* Comfort - Circular */}
        <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-yellow-500/20 flex items-center justify-center">
          <CircularProgress
            value={todayComfort}
            maxValue={100}
            label="Confort"
            icon={<SmileOutlined />}
            color={
              todayComfort >= 80 ? 'green' :
              todayComfort >= 60 ? 'yellow' :
              todayComfort >= 40 ? 'orange' :
              'red'
            }
            size="normal"
            format="percent"
          />
        </div>
      </div>
    </div>
  );
};

export default CompactHUD;
