/**
 * @file PlayerCharacter.tsx
 * @description Renders the player character's avatar, name, health, and status effects.
 */
import React, { useState, useEffect, useMemo } from 'react';
import HealthBar from '../common/HealthBar';
import { LOW_HEALTH_THRESHOLD } from '../../constants';
import { PlayerClassId } from '../../types';

interface PlayerCharacterProps {
    playerClassId: PlayerClassId;
    playerName: string;
    playerEmoji: string;
    playerHealth: number;
    playerMaxHealth: number;
    damageShield: number;
    hitAnimation: boolean;
    attackAnimation: string | null;
    isPlayerHealing: boolean;
    isPlayerDying: boolean;
    isPlayerInFrenzy: boolean;
    isPlayerFeasting: boolean;
    enemyWillMissCount: number;
    playerTransformAnimation: 'evolve' | 'devolve' | null;
    playerBuffAnimation: string | null;
    playerEmojiRef: React.RefObject<HTMLDivElement>;
}

const PlayerCharacter: React.FC<PlayerCharacterProps> = ({
    playerClassId,
    playerName,
    playerEmoji,
    playerHealth,
    playerMaxHealth,
    damageShield,
    hitAnimation,
    attackAnimation,
    isPlayerHealing,
    isPlayerDying,
    isPlayerInFrenzy,
    isPlayerFeasting,
    enemyWillMissCount,
    playerTransformAnimation,
    playerBuffAnimation,
    playerEmojiRef,
}) => {
    const playerHealthPercentage = (playerHealth / playerMaxHealth) * 100;
    const shieldPercentage = (damageShield / playerMaxHealth) * 100;
    const [isFlashingRed, setIsFlashingRed] = useState(false);
    const isLowHealth = playerHealth / playerMaxHealth < LOW_HEALTH_THRESHOLD;

    useEffect(() => {
        if (hitAnimation && isLowHealth) {
            setIsFlashingRed(true);
            const timer = setTimeout(() => setIsFlashingRed(false), 400); // Match animation duration
            return () => clearTimeout(timer);
        }
    }, [hitAnimation, isLowHealth]);
    
    const getBuffAnimationClass = () => {
        if (!playerBuffAnimation) return '';
        switch (playerBuffAnimation) {
            case 'shield': return 'animate-buff-shield';
            case 'intellect': return 'animate-buff-intellect';
            case 'poison': return 'animate-buff-poison';
            case 'force-field': return 'animate-buff-force-field';
            case 'prismatic-ward': return 'animate-buff-prismatic-ward';
            case 'supercharge': return 'animate-buff-supercharge';
            case 'bloodlust': return 'animate-buff-bloodlust';
            case 'bat-form': return 'animate-buff-bat-form';
            case 'shadow-rift': return 'animate-buff-shadow-rift';
            case 'blood-moon': return 'animate-buff-blood-moon';
            case 'jackpot': return 'animate-buff-jackpot';
            case 'flash-pose': return 'animate-buff-flash-pose';
            case 'wardrobe-shift': return 'animate-buff-wardrobe-shift';
            case 'encore-finale': return 'animate-buff-encore-finale';
            default: return '';
        }
    };
    
    const getAttackAnimationClass = () => {
        if (!attackAnimation) return '';
        switch (attackAnimation) {
            case 'player-lunge': return 'animate-attack-lunge';
            case 'rocket-dash': return 'animate-rocket-dash-lunge';
            default: return '';
        }
    }

    const transformClass =
        playerTransformAnimation === 'evolve' ? 'animate-evolve' :
        playerTransformAnimation === 'devolve' ? 'animate-devolve' : '';

    const isDoingAction = hitAnimation || attackAnimation || isPlayerHealing || playerTransformAnimation || isPlayerInFrenzy || playerBuffAnimation || isFlashingRed || isPlayerDying;
    const idleClass = !isDoingAction ? 'animate-idle-bob' : '';
    
    const animationClasses = [
        idleClass,
        hitAnimation ? 'animate-hit' : '',
        getAttackAnimationClass(),
        isPlayerHealing ? 'animate-heal' : '',
        isPlayerInFrenzy ? 'animate-frenzy' : '',
        transformClass,
        isFlashingRed ? 'animate-flash-red' : '',
        isPlayerDying ? 'animate-[player-death-main_1.5s_ease-out_forwards]' : '',
    ].filter(Boolean).join(' ');

    const shieldEmoji = useMemo(() => {
        switch(playerClassId) {
            case 'rockstar': return '🔊';
            case 'spaceTank': return '💠';
            case 'mage': return '💠';
            default: return '🛡️';
        }
    }, [playerClassId]);

    const emojiSpanClass = playerBuffAnimation === 'bat-form' ? 'animate-hide-for-bat-form' : '';

    return (
        <div className="flex flex-col items-center gap-2 w-32 md:w-48">
            <div 
                ref={playerEmojiRef}
                className={`relative text-6xl md:text-8xl transition-all duration-200 ${animationClasses}`}
                aria-label="Player Character"
            >
                {/* Ghost effect on death */}
                {isPlayerDying && (
                    <span 
                        className="absolute inset-0 flex items-center justify-center text-7xl md:text-9xl opacity-0" 
                        style={{ animation: 'player-death-ghost 1.5s ease-out forwards 0.3s' }}
                        aria-hidden="true"
                    >
                        👻
                    </span>
                )}

                {/* Aura/Buff effect layer */}
                {playerBuffAnimation && (
                    <div className={`absolute inset-[-20%] rounded-full ${getBuffAnimationClass()}`} />
                )}

                {/* Emoji layer (relative to position correctly above the aura) */}
                <span className={`relative z-10 ${emojiSpanClass}`}>{playerEmoji}</span>
                
                {/* Persistent effect icons */}
                {damageShield > 0 && (
                     <div className="absolute -bottom-2 -left-2 text-4xl animate-pulse-dot" title={`Shield: ${damageShield.toLocaleString()}`}>
                         {shieldEmoji}
                     </div>
                )}
                 {isPlayerFeasting && (
                     <div className="absolute -bottom-2 -right-2 text-4xl animate-pulse" title="Feast Mode is active!">
                         🍗
                     </div>
                )}
                
                {/* Status effect for dodges */}
                {enemyWillMissCount > 0 && (
                     <div className="absolute -top-2 -right-2 bg-black/70 rounded-full h-8 w-8 flex items-center justify-center text-lg border-2 border-blue-400 z-20" title={`Next ${enemyWillMissCount} enemy attack${enemyWillMissCount > 1 ? 's' : ''} will miss.`}>
                         💨
                         <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                             {enemyWillMissCount}
                         </span>
                     </div>
                )}
            </div>
            <div className={`w-full text-center transition-opacity duration-500 ${isPlayerDying ? 'opacity-0' : 'opacity-100'}`}>
                <span className="text-lg font-bold truncate" title={playerName}>{playerName}</span>
                <HealthBar percentage={playerHealthPercentage} colorClass="bg-green-500" shieldPercentage={shieldPercentage} />
                <div className="text-xs h-4" aria-label={`Player health: ${playerHealth} of ${playerMaxHealth}`}>
                    <span>{`${playerHealth.toLocaleString()} / ${playerMaxHealth.toLocaleString()}`}</span>
                    {damageShield > 0 && (
                        <span className="text-cyan-400 font-bold ml-2 animate-pulse">
                            +{damageShield.toLocaleString()} {shieldEmoji}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlayerCharacter;