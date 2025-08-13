/**
 * @file PlayerStatsTab.tsx
 * @description Renders the tab that displays detailed information about player stats.
 */
import React, { useState, useEffect } from 'react';
import { FormattedPlayerStats, ActiveEffect, GameState, ActiveSkillEffect, PlayerClassId, Upgrade, PlayerClass } from '../../../types';
import { ALL_CLASSES, NOVICE_TRANSFORMATION_THRESHOLD, EXPERT_TRANSFORMATION_THRESHOLD } from '../../../constants';

interface PlayerStatsTabProps {
    playerClassId: PlayerClassId;
    playerName: string;
    stats: FormattedPlayerStats;
    hasWonGame: boolean;
    activeEffects: ActiveEffect[];
    activeSkillEffects: ActiveSkillEffect[];
    gameState: GameState;
    upgrades: Upgrade[];
}

const STAT_INFO = {
    maxHealth: { emoji: "❤️", label: "Health", description: "Your total hit points. If this reaches zero, your run is over!" },
    attackPower: { emoji: "🔥", label: "Attack", description: " You automatically attack for this damage." },
    attackSpeed: { emoji: "⚡️", label: "Atk Speed", description: "How many times you attack per second. Faster is better!" },
    critChance: { emoji: "🎯", label: "Crit %", description: " How often your attacks can be a Massive lucky critical hit!" },
    critDamage: { emoji: "💥", label: "Crit Dmg", description: "The damage multiplier for your critical hits. A higher value means bigger crits!" },
    luck: { emoji: "🍀", label: "Fortune", description: "Increases the amount of gold you find and your chances of discovering rare equipment." },
    accuracy: { emoji: "🏹", label: "Accuracy", description: "Your chance to hit an enemy with an attack. Missed attacks deal no damage." },
    damageReduction: { emoji: "🛡️", label: "Dmg Reduction", description: "Reduces all incoming damage by a percentage. Capped at 90%." },
    evolveBonus: { emoji: "🔄", label: "Rebirth Bonus", description: "A permanent bonus to core stats earned from beginning a new lineage after a previous run." },
};

const StatCard: React.FC<{ emoji: string, label: string, value: string | number, description: string }> = ({ emoji, label, value, description }) => (
    <div className="bg-gray-900/50 p-1.5 rounded-lg flex flex-col gap-1 h-full">
        <div className="flex items-center gap-2">
            <span className="text-2xl flex-shrink-0 w-8 h-8 flex items-center justify-center">{emoji}</span>
            <div className="flex flex-col text-left">
                <span className="text-xs text-gray-400 leading-tight tracking-wide uppercase">{label}</span>
                <span className="font-bold text-white text-base whitespace-nowrap leading-tight">{value}</span>
            </div>
        </div>
        <p className="text-[11px] text-gray-300 leading-tight tracking-normal flex-grow">{description}</p>
    </div>
);

const EffectDuration: React.FC<{ durationMs: number; startTime: number, gameState: GameState }> = ({ durationMs, startTime, gameState }) => {
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        if (gameState !== 'playing') return;
        
        const timer = setInterval(() => {
            setNow(Date.now());
        }, 1000);
        return () => clearInterval(timer);
    }, [gameState]);

    const elapsed = now - startTime;
    const timeLeft = Math.max(0, durationMs - elapsed);
    
    const totalSeconds = Math.ceil(timeLeft / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    
    if (totalSeconds <= 0) {
        return <span className="text-sm font-bold text-gray-500">Expired</span>;
    }

    return (
        <span className="text-sm font-bold text-yellow-300 tabular-nums">
            {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
    );
};

const SpecializationInfo: React.FC<{ playerClass: PlayerClass; upgrades: Upgrade[] }> = ({ playerClass, upgrades }) => {
    const classStatUpgrade = upgrades.find(u => u.id === playerClass.classStatId);
    const classStatLevels = classStatUpgrade ? classStatUpgrade.level - 1 : 0;

    const coreUpgradeTemplates = playerClass.upgrades.filter(u => u.category === 'core');
    
    let nextHighestStatLevels = 0;
    coreUpgradeTemplates.forEach(coreUpgradeTpl => {
        if (coreUpgradeTpl.id !== playerClass.classStatId) {
            const upgradeInstance = upgrades.find(u => u.id === coreUpgradeTpl.id);
            const levelsPurchased = upgradeInstance ? upgradeInstance.level - 1 : 0;
            if (levelsPurchased > nextHighestStatLevels) {
                nextHighestStatLevels = levelsPurchased;
            }
        }
    });

    const levelDifference = classStatLevels - nextHighestStatLevels;
    
    let activeState: 'none' | 'novice' | 'expert' = 'none';
    if (levelDifference >= EXPERT_TRANSFORMATION_THRESHOLD) {
        activeState = 'expert';
    } else if (levelDifference >= NOVICE_TRANSFORMATION_THRESHOLD) {
        activeState = 'novice';
    }
    
    const specializationTransformation = playerClass.transformations.find(t => t.upgradeId === playerClass.classStatId);
    
    const noviceEmoji = specializationTransformation?.novice.neutral || '❔';
    const expertEmoji = specializationTransformation?.expert.neutral || '❔';

    const noviceIsActive = activeState === 'novice' || activeState === 'expert';
    const expertIsActive = activeState === 'expert';
    
    return (
        <div className="flex flex-col gap-2">
            <div className={`p-2 rounded-lg border transition-all duration-300 ${noviceIsActive ? 'bg-blue-900/60 border-blue-400/80' : 'bg-gray-800/50 border-gray-600/50'}`}>
                <div className="flex justify-between items-start gap-2">
                    <span className={`font-bold ${noviceIsActive ? 'text-blue-300' : 'text-gray-400'}`}>{noviceEmoji} Novice</span>
                    <span className={`text-sm font-bold ${noviceIsActive ? 'text-green-400 animate-pulse' : 'text-gray-500'}`}>{noviceIsActive ? 'ACTIVE' : 'INACTIVE'}</span>
                </div>
                <p className="text-xs text-gray-300">{playerClass.noviceEffectDescription}</p>
                <p className="text-xs text-gray-400 mt-1">Requires main stat to be {NOVICE_TRANSFORMATION_THRESHOLD} levels higher than others.</p>
            </div>
             <div className={`p-2 rounded-lg border transition-all duration-300 ${expertIsActive ? 'bg-purple-900/60 border-purple-400/80' : 'bg-gray-800/50 border-gray-600/50'}`}>
                <div className="flex justify-between items-start gap-2">
                    <span className={`font-bold ${expertIsActive ? 'text-purple-300' : 'text-gray-400'}`}>{expertEmoji} Expert</span>
                    <span className={`text-sm font-bold ${expertIsActive ? 'text-green-400 animate-pulse' : 'text-gray-500'}`}>{expertIsActive ? 'ACTIVE' : 'INACTIVE'}</span>
                </div>
                <p className="text-xs text-gray-300">{playerClass.expertEffectDescription}</p>
                <p className="text-xs text-gray-400 mt-1">Requires main stat to be {EXPERT_TRANSFORMATION_THRESHOLD} levels higher than others.</p>
            </div>
        </div>
    );
};


const PlayerStatsTab: React.FC<PlayerStatsTabProps> = (props) => {
    const { playerClassId, playerName, stats, hasWonGame, activeEffects, activeSkillEffects, gameState, upgrades } = props;
    const playerClass = ALL_CLASSES.find(c => c.id === playerClassId);
    
    const permanentBoons = activeEffects.filter(effect => effect.duration_ms === Infinity);
    const temporaryEventEffects = activeEffects.filter(effect => effect.duration_ms !== Infinity);

    const allTemporaryEffects = [
        ...temporaryEventEffects.map(e => ({
            ...e,
            emoji: '✨', // Add a default emoji for event effects
            startTime: parseInt(e.id.split('-')[0], 10), // Synthesize startTime from ID
            duration_ms: e.duration_ms
        })),
        ...activeSkillEffects.map(se => ({
            id: se.id,
            name: se.name,
            emoji: se.emoji,
            description: se.description,
            duration_ms: se.durationMs,
            startTime: se.startTime,
            type: 'buff' as const,
        }))
    ];

    return (
        <div className="w-full p-1" role="tabpanel">
            {playerClass && (
                <div className="bg-gray-900/50 p-2 rounded-lg mb-2 flex items-center gap-3">
                    <span className="text-4xl">{playerClass.emoji}</span>
                    <div className="text-left">
                        <h3 className="font-title text-lg text-white leading-tight">{playerClass.name}</h3>
                        <p className="text-xs text-gray-300 leading-tight">{playerClass.description}</p>
                    </div>
                </div>
            )}
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                 <StatCard emoji={STAT_INFO.maxHealth.emoji} label={STAT_INFO.maxHealth.label} value={stats.maxHealth.toLocaleString()} description={STAT_INFO.maxHealth.description} />
                 <StatCard emoji={STAT_INFO.attackPower.emoji} label={STAT_INFO.attackPower.label} value={stats.attackPower.toLocaleString()} description={STAT_INFO.attackPower.description} />
                 <StatCard emoji={STAT_INFO.attackSpeed.emoji} label={STAT_INFO.attackSpeed.label} value={`${stats.attackSpeed}/s`} description={STAT_INFO.attackSpeed.description} />
                 <StatCard emoji={STAT_INFO.critChance.emoji} label={STAT_INFO.critChance.label} value={stats.critChance} description={STAT_INFO.critChance.description} />
                 <StatCard emoji={STAT_INFO.critDamage.emoji} label={STAT_INFO.critDamage.label} value={stats.critDamage} description={STAT_INFO.critDamage.description} />
                 <StatCard emoji={STAT_INFO.luck.emoji} label={STAT_INFO.luck.label} value={stats.luck} description={STAT_INFO.luck.description} />
                 <StatCard emoji={STAT_INFO.accuracy.emoji} label={STAT_INFO.accuracy.label} value={stats.accuracy} description={STAT_INFO.accuracy.description} />
                 <StatCard emoji={STAT_INFO.damageReduction.emoji} label={STAT_INFO.damageReduction.label} value={stats.damageReduction} description={STAT_INFO.damageReduction.description} />
                 {parseFloat(stats.evolveBonus) > 0 && (
                    <div className="col-span-2 lg:col-span-3">
                        <StatCard emoji={STAT_INFO.evolveBonus.emoji} label={STAT_INFO.evolveBonus.label} value={stats.evolveBonus} description={STAT_INFO.evolveBonus.description} />
                    </div>
                 )}
            </div>
            
             {playerClass && (
                <div className="mt-4">
                    <h4 className="font-title text-sm text-yellow-300 mb-2 px-1">CLASS SPECIALIZATION</h4>
                    <SpecializationInfo playerClass={playerClass} upgrades={upgrades} />
                </div>
             )}


             {(hasWonGame || permanentBoons.length > 0) && (
                <div className="mt-4">
                    <h4 className="font-title text-sm text-yellow-300 mb-2 px-1">PERMANENT BOONS</h4>
                    <div className="flex flex-col gap-2">
                        {hasWonGame && (
                            <div className="p-2 rounded-lg border bg-purple-900/40 border-purple-500/50">
                                <div className="flex justify-between items-start mb-1 gap-2">
                                    <span className="font-bold text-purple-300">📿 Magic Necklace of Wishes</span>
                                </div>
                                <p className="text-xs text-gray-300">Permanently doubles all of your stats.</p>
                            </div>
                        )}
                        {permanentBoons.map(effect => (
                            <div key={effect.id} className={`p-2 rounded-lg border ${effect.type === 'buff' ? 'bg-green-900/40 border-green-500/50' : 'bg-red-900/40 border-red-500/50'}`}>
                                <div className="flex justify-between items-start mb-1 gap-2">
                                    <span className={`font-bold ${effect.type === 'buff' ? 'text-green-300' : 'text-red-300'}`}>{effect.name}</span>
                                    <span className="text-sm font-bold text-gray-400">Permanent</span>
                                </div>
                                <p className="text-xs text-gray-300">{effect.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
             )}
            
            {allTemporaryEffects.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-title text-sm text-yellow-300 mb-2 px-1">TEMPORARY EFFECTS</h4>
                    <div className="flex flex-col gap-2">
                        {allTemporaryEffects.map(effect => (
                            <div key={effect.id} className={`p-2 rounded-lg border ${effect.type === 'buff' ? 'bg-green-900/40 border-green-500/50' : 'bg-red-900/40 border-red-500/50'}`}>
                                <div className="flex justify-between items-start mb-1 gap-2">
                                    <span className={`font-bold ${effect.type === 'buff' ? 'text-green-300' : 'text-red-300'}`}>{effect.emoji || '✨'} {effect.name}</span>
                                    {effect.startTime && <EffectDuration durationMs={effect.duration_ms} startTime={effect.startTime} gameState={gameState} />}
                                </div>
                                <p className="text-xs text-gray-300">{effect.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayerStatsTab;