/**
 * @file EnemyCharacter.tsx
 * @description Renders the enemy character's avatar, name, health, and status effects.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Enemy, RealmTheme } from '../../types';
import HealthBar from '../common/HealthBar';
import { SPAWN_ANIMATION_MAP } from './spawn-animations';

const PROCEDURAL_SPAWN_ANIMATIONS = [
    'animate-spawn-shake',
    'animate-spawn-stomp',
    'animate-spawn-shimmer',
    'animate-spawn-glitch',
    'animate-spawn-pop',
    'animate-spawn-drop',
];

interface EnemyCharacterProps {
    enemy: Enemy | null;
    hitAnimation: boolean;
    isAttacking: boolean;
    isEnemyDying: boolean;
    isEnemyFrozen: boolean;
    isSpawning: boolean;
    setIsSpawning: (isSpawning: boolean) => void;
    isCharging: boolean;
    isChargingSpecial: boolean;
    onManualAttack: (e: React.MouseEvent) => void;
    showAttackHint: boolean;
    isComboActive: boolean;
    realmTheme: RealmTheme;
    isEnteringRealm: boolean;
    enemyEmojiRef: React.RefObject<HTMLDivElement>;
}

const getChargeClass = (enemy: Enemy | null, isCharging: boolean, isChargingSpecial: boolean): string => {
    if (!isCharging && !isChargingSpecial) return '';
    if (isChargingSpecial) return 'animate-charge-special-attack';
    
    switch (enemy?.archetype) {
        case 'heavy': return 'animate-charge-heavy-attack';
        case 'arcane': return 'animate-charge-arcane-attack';
        case 'vampiric': return 'animate-charge-vampiric-attack';
        case 'juggernaut': return 'animate-charge-juggernaut-attack';
        default: return 'animate-charge-attack';
    }
};

/** Helper to get the Tailwind CSS classes for a modifier pill based on archetype. */
const getModifierStyles = (archetype: Enemy['archetype'] | undefined): string => {
    switch (archetype) {
        case 'swift': return 'bg-cyan-500/20 text-cyan-300 border-cyan-400';
        case 'heavy': return 'bg-gray-500/20 text-gray-300 border-gray-400';
        case 'arcane': return 'bg-purple-500/20 text-purple-300 border-purple-400';
        case 'vampiric': return 'bg-red-600/20 text-red-400 border-red-500';
        case 'juggernaut': return 'bg-orange-700/20 text-orange-400 border-orange-500';
        default: return '';
    }
};

/** Helper to get the CSS animation class for an archetype's glow effect. */
const getGlowClass = (archetype: Enemy['archetype'] | undefined): string => {
    if (!archetype || archetype === 'standard') return '';
    switch (archetype) {
        case 'swift': return 'animate-glow-swift';
        case 'heavy': return 'animate-glow-heavy';
        case 'arcane': return 'animate-glow-arcane';
        case 'vampiric': return 'animate-glow-vampiric';
        case 'juggernaut': return 'animate-glow-juggernaut';
        default: return '';
    }
};


const EnemyCharacter: React.FC<EnemyCharacterProps> = ({
    enemy,
    hitAnimation,
    isAttacking,
    isEnemyDying,
    isEnemyFrozen,
    isSpawning,
    setIsSpawning,
    isCharging,
    isChargingSpecial,
    onManualAttack,
    showAttackHint,
    isComboActive,
    realmTheme,
    isEnteringRealm,
    enemyEmojiRef,
}) => {
    const shouldPlaySpawnAnimation = isSpawning && !isEnteringRealm;
    const [spawnHealthPercent, setSpawnHealthPercent] = useState(0);
    const [proceduralSpawnAnimation, setProceduralSpawnAnimation] = useState('');
    
    useEffect(() => {
        if (enemy && !isEnemyDying && !isEnteringRealm) {
            const duration = 2800; // Total duration for all spawn animations
            const timer = setTimeout(() => setIsSpawning(false), duration);
            return () => clearTimeout(timer);
        }
    }, [enemy?.id, isEnemyDying, setIsSpawning, isEnteringRealm]);
    
    useEffect(() => {
        if (shouldPlaySpawnAnimation) {
            setSpawnHealthPercent(0);
            const timer = setTimeout(() => {
                setSpawnHealthPercent(100);
            }, 100);
            setProceduralSpawnAnimation(PROCEDURAL_SPAWN_ANIMATIONS[Math.floor(Math.random() * PROCEDURAL_SPAWN_ANIMATIONS.length)]);
            return () => clearTimeout(timer);
        }
    }, [shouldPlaySpawnAnimation]);

    const enemyHealthPercentage = shouldPlaySpawnAnimation
        ? spawnHealthPercent
        : enemy ? (enemy.currentHealth / enemy.maxHealth) * 100 : 0;
    
    const nameLength = enemy?.name?.length || 0;
    const nameSizeClass = nameLength > 20 ? 'text-sm' : nameLength > 14 ? 'text-base' : 'text-lg';
    
    const SpawnAnimationComponent = SPAWN_ANIMATION_MAP[realmTheme.name] || null;

    const { baseName, modifier } = useMemo(() => {
        if (!enemy || enemy.archetype === 'standard') {
            return { baseName: enemy?.name || '...', modifier: null };
        }
        const nameParts = enemy.name.split(' ');
        return {
            modifier: nameParts[0],
            baseName: nameParts.slice(1).join(' '),
        };
    }, [enemy]);

    const modifierStyle = getModifierStyles(enemy?.archetype);

    if (isEnemyDying) {
        const particleCount = 20;
        const particles = Array.from({ length: particleCount }).map((_, i) => {
            const angle = (i / particleCount) * Math.PI * 2;
            const radius = Math.random() * 50 + 40; // Emitter radius
            return {
                id: i,
                style: {
                    // @ts-ignore
                    '--dx': `${Math.cos(angle) * radius}px`,
                    '--dy': `${Math.sin(angle) * radius}px`,
                    animationDelay: `${Math.random() * 0.2}s`,
                },
            };
        });

        return (
            <div className="flex flex-col items-center gap-2 w-32 md:w-48">
                <div className="relative text-7xl md:text-9xl flex items-center justify-center flex-grow">
                    {/* The main emoji that will be animated */}
                    <span
                        className="inline-block"
                        style={{
                            animation: 'enemy-death-main-v2 1.2s ease-out forwards, enemy-death-wipe 0.8s ease-in forwards 0.2s',
                            transformOrigin: 'center'
                        }}
                    >
                        {enemy?.emoji || '❔'}
                    </span>
                    
                    {/* Particle container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {particles.map(p => (
                            <div
                                key={p.id}
                                className="absolute w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full pointer-events-none"
                                style={{
                                    boxShadow: '0 0 5px #ef4444, 0 0 8px #f87171',
                                    animation: 'enemy-death-particle 0.6s ease-out forwards',
                                    ...p.style,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full text-center invisible">
                    <span className={`${nameSizeClass} font-bold`}>{enemy?.name || '...'}</span>
                    <HealthBar key={`${enemy?.id}-dead`} percentage={0} colorClass="bg-red-500" />
                    <div className="text-xs">
                        0 / {enemy?.maxHealth.toLocaleString()}
                    </div>
                </div>
            </div>
        );
    }
    
    // --- Animation Class Logic ---
    const isBoss = !!enemy?.isBoss;
    const isDoingAction = hitAnimation || isAttacking || isCharging || isChargingSpecial || isEnemyDying || isEnemyFrozen || shouldPlaySpawnAnimation;
    
    const hitClass = hitAnimation ? (isBoss ? 'animate-boss-hit' : 'animate-hit') : '';
    const attackClass = isAttacking ? 'animate-enemy-attack-lunge' : '';
    const chargeClass = getChargeClass(enemy, isCharging, isChargingSpecial);
    const idleClass = !isDoingAction ? (isBoss ? 'animate-boss' : 'animate-idle-bob') : '';
    const glowClass = getGlowClass(enemy?.archetype);
    
    const spawnClass = shouldPlaySpawnAnimation ? proceduralSpawnAnimation : '';
    const finalSpawnAnimationDelay = '2.0s';
    
    const animationClasses = [ idleClass, hitClass, attackClass, chargeClass, isEnemyFrozen ? 'animate-frozen' : '' ].filter(Boolean).join(' ');
    
    const shouldShowPersistentGlow = !shouldPlaySpawnAnimation && !isEnemyDying && (realmTheme.name === "The Mad King's Vault" || realmTheme.name === "Whispering Woods");

    return (
        <div 
            className={`flex flex-col items-center gap-2 w-32 md:w-48 ${shouldPlaySpawnAnimation ? 'cursor-wait' : 'cursor-default group'}`}
            onClick={shouldPlaySpawnAnimation ? undefined : onManualAttack}
            title={shouldPlaySpawnAnimation ? "Enemy is spawning..." : "Tap to attack!"}
            aria-label={shouldPlaySpawnAnimation ? "Enemy is spawning" : "Enemy Character, tap to attack"}
        >
            <div className="relative text-7xl md:text-9xl flex items-center justify-center flex-grow">
                {shouldPlaySpawnAnimation && SpawnAnimationComponent && <SpawnAnimationComponent />}
                
                <div 
                    ref={enemyEmojiRef}
                    className="invisible"
                    style={isBoss ? { transform: 'scale(1.5)', transformOrigin: 'center' } : {}}
                    aria-hidden="true"
                >
                    {enemy?.emoji || '❔'}
                </div>
                
                <span
                    className={`absolute inset-0 flex items-center justify-center transition-transform duration-200 ${shouldPlaySpawnAnimation ? '' : 'group-hover:scale-110'} ${animationClasses}`}
                    style={{ animationDelay: shouldPlaySpawnAnimation ? finalSpawnAnimationDelay : '0s' }}
                    aria-label="Enemy Avatar"
                >
                    {shouldShowPersistentGlow && (
                        <div
                            className="absolute inset-[-10%] rounded-full opacity-0"
                            style={{
                                background: `radial-gradient(circle, hsla(${realmTheme.color.replace(/%/g, '')}, 0.8) 0%, transparent 70%)`,
                                animation: 'persistent-realm-glow 2.5s ease-in-out infinite',
                            }}
                        />
                    )}
                    <span className={`relative z-10 ${spawnClass} ${shouldPlaySpawnAnimation ? 'opacity-0' : ''} ${glowClass}`} style={{ animationDelay: finalSpawnAnimationDelay }}>
                        {enemy?.emoji || '❔'}
                    </span>
                </span>
                
                {showAttackHint && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="bg-gray-900 text-yellow-300 text-xs font-bold px-2 py-1 rounded-lg shadow-lg animate-pulse-dot whitespace-nowrap">
                           Tap to attack!
                        </div>
                    </div>
                )}
            </div>
            
            <div className="w-full text-center">
                 <div 
                    className={`flex items-baseline justify-center gap-1.5 flex-wrap ${nameSizeClass} font-bold ${shouldPlaySpawnAnimation ? 'opacity-0 animate-enemy-name-reveal' : ''}`} 
                    style={shouldPlaySpawnAnimation ? { animationDelay: '2s' } : {}}
                >
                    <span>{baseName}</span>
                    {modifier && (
                        <span className={`inline-block px-1.5 py-0.5 text-xs font-semibold leading-none rounded border ${modifierStyle}`}>
                            {modifier}
                        </span>
                    )}
                </div>
                <HealthBar
                    key={enemy?.id}
                    percentage={enemyHealthPercentage}
                    colorClass="bg-red-500"
                    showComboParticles={isComboActive}
                    isSpawning={shouldPlaySpawnAnimation}
                />
                <div className="text-xs" aria-label={`Enemy health: ${enemy?.currentHealth ?? 'unknown'} of ${enemy?.maxHealth ?? 'unknown'}`}>
                    {enemy ? `${enemy.currentHealth.toLocaleString()} / ${enemy.maxHealth.toLocaleString()}` : '...'}
                </div>
            </div>
        </div>
    );
};

export default EnemyCharacter;