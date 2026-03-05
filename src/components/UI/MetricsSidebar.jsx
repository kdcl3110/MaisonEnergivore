import React from 'react';
import { useGame } from '../../context/GameContext';
import { isOffPeakHour } from '../../data/appliances';
import CircularProgress from './CircularProgress';
import {
  ThunderboltOutlined,
  DollarOutlined,
  SmileOutlined,
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';

const MetricsSidebar = () => {
  const {
    gameTime,
    todayConsumption,
    todayBudget,
    todayComfort,
    getConsumptionLimit,
    currentScenario,
    getCurrentPowerConsumption,
    currentSolarProductionW,
    solarConsumptionTotal
  } = useGame();

  const consumptionLimit = getConsumptionLimit();
  const budgetLimit = currentScenario?.objectives?.budget;
  const currentPower = getCurrentPowerConsumption();
  const solarEnabled = currentScenario?.solar?.enabled;

  const isOffPeak = isOffPeakHour(gameTime);
  const timeString = `${gameTime.toString().padStart(2, '0')}:00`;

  const totalWithSolar = todayConsumption + solarConsumptionTotal;
  const greenPercent = totalWithSolar > 0 ? (solarConsumptionTotal / totalWithSolar) * 100 : 0;

  const getBudgetColor = () => {
    if (!budgetLimit) return 'text-cyan-400';
    const percentage = (todayBudget / budgetLimit) * 100;
    if (percentage >= 100) return 'text-red-400';
    if (percentage >= 80) return 'text-orange-400';
    return 'text-green-400';
  };

  return (
    <div className="sticky top-[90px] space-y-3">
      {/* Time badge */}
      <div className={`rounded-xl p-3 border ${isOffPeak ? 'bg-green-900/20 border-green-500/30' : 'bg-cyan-900/20 border-cyan-500/30'} flex items-center justify-center gap-2`}>
        {isOffPeak ? <MoonOutlined className="text-green-400" style={{ fontSize: '14px' }} /> : <SunOutlined className="text-cyan-400" style={{ fontSize: '14px' }} />}
        <span className={`text-sm font-bold ${isOffPeak ? 'text-green-400' : 'text-cyan-400'}`}>
          {timeString}
        </span>
        <span className="text-[9px] text-gray-500 uppercase">{isOffPeak ? 'Creuses' : 'Pleines'}</span>
      </div>

      {/* Power badge */}
      <div className="rounded-xl p-3 bg-yellow-900/20 border border-yellow-500/30 flex items-center justify-center gap-2">
        <ThunderboltOutlined className="text-yellow-400" style={{ fontSize: '14px' }} />
        <span className="text-sm font-bold text-yellow-400">{currentPower}W</span>
      </div>

      {/* Solar badge */}
      {solarEnabled && (
        <div className={`rounded-xl p-3 border flex items-center justify-center gap-2 ${
          currentSolarProductionW > 0
            ? 'bg-amber-900/20 border-amber-500/30'
            : 'bg-gray-800/50 border-gray-600/30'
        }`}>
          <span className="text-sm">{currentSolarProductionW > 0 ? '☀️' : '🌙'}</span>
          <span className={`text-sm font-bold ${currentSolarProductionW > 0 ? 'text-amber-400' : 'text-gray-500'}`}>
            {currentSolarProductionW}W
          </span>
        </div>
      )}

      {/* Energy gauge */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-cyan-500/20 flex justify-center">
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

      {/* Budget */}
      <div className="bg-gray-800/50 rounded-xl p-3 border border-green-500/20">
        <div className="flex items-center justify-center gap-1 mb-1">
          <DollarOutlined className="text-green-400" style={{ fontSize: '14px' }} />
          <span className="text-[10px] text-gray-400 uppercase font-bold">EUR</span>
        </div>
        <div className={`text-center text-lg font-black ${getBudgetColor()}`}>
          {todayBudget.toFixed(2)}
        </div>
        {budgetLimit && (
          <div className="text-[9px] text-center text-gray-500 mt-0.5">
            / {budgetLimit.toFixed(2)}
          </div>
        )}
      </div>

      {/* Comfort gauge */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-yellow-500/20 flex justify-center">
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

      {/* Solar gauge */}
      {solarEnabled && (
        <div className="bg-gray-800/50 rounded-xl p-4 border border-amber-500/20 flex justify-center">
          <CircularProgress
            value={greenPercent}
            maxValue={100}
            label="Solaire"
            icon={<span className="text-xs">☀️</span>}
            color={
              greenPercent >= 30 ? 'green' :
              greenPercent >= 15 ? 'yellow' :
              'orange'
            }
            size="normal"
            format="percent"
          />
        </div>
      )}
    </div>
  );
};

export default MetricsSidebar;
