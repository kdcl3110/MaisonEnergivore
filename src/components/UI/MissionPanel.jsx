import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { DownOutlined, UpOutlined, CheckCircleOutlined } from '@ant-design/icons';

const MissionPanel = () => {
  const { currentMissions, missionProgress } = useGame();
  const [collapsed, setCollapsed] = useState(false);

  if (!currentMissions || currentMissions.length === 0) return null;

  const completedCount = currentMissions.filter(
    m => missionProgress[m.id]?.completed
  ).length;

  return (
    <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl border border-amber-500/30 shadow-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setCollapsed(prev => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gradient-to-r from-amber-900/40 to-orange-900/40 border-b border-amber-500/20 hover:from-amber-900/60 hover:to-orange-900/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">📋</span>
          <span className="text-xs sm:text-sm font-bold text-amber-300">
            Missions ({completedCount}/{currentMissions.length})
          </span>
        </div>
        <div className="text-amber-400 text-xs">
          {collapsed ? <DownOutlined /> : <UpOutlined />}
        </div>
      </button>

      {/* Mission list */}
      {!collapsed && (
        <div className="p-2 space-y-1.5">
          {currentMissions.map(mission => {
            const progress = missionProgress[mission.id] || { hoursCompleted: 0, completed: false };
            const isComplete = progress.completed;
            const progressPercent = Math.min((progress.hoursCompleted / mission.requiredHours) * 100, 100);

            const isActive = !isComplete;

            return (
              <div
                key={mission.id}
                className={`rounded-lg p-2 border transition-colors ${
                  isComplete
                    ? 'bg-green-900/20 border-green-500/30'
                    : isActive
                    ? 'bg-amber-900/20 border-amber-500/30'
                    : 'bg-gray-800/30 border-gray-700/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  {/* Icon */}
                  <span className="text-base flex-shrink-0">{mission.icon}</span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[10px] sm:text-xs font-bold truncate ${
                        isComplete ? 'text-green-400' : isActive ? 'text-amber-300' : 'text-gray-400'
                      }`}>
                        {mission.label}
                      </span>
                      {isComplete && (
                        <CheckCircleOutlined className="text-green-400 text-xs flex-shrink-0" />
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          isComplete ? 'bg-green-500' : isActive ? 'bg-amber-500' : 'bg-gray-600'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    {/* Time info */}
                    <div className="mt-0.5">
                      <span className="text-[8px] sm:text-[9px] text-gray-500">
                        {progress.hoursCompleted}h / {mission.requiredHours}h
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MissionPanel;
