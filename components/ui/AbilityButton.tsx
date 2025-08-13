/**
 * @file AbilityButton.tsx
 * @description A button component for a single special ability in the UpgradePanel.
 * It handles its own display logic for cost, cooldown, and unlock state.
 */
import React, { useState, useEffect } from 'react';
import { SpecialAbility, SpecialAbilityId } from '../../types';
import { COIN_EMOJI } from '../../constants';
import { formatUnlockCriteria } from '../../utils/formatters';

interface AbilityButtonProps {
    ability: SpecialAbility;
    stage: number;
    coins: number;
    cooldown: number;
    onUse: (id: SpecialAbilityId) => void;
    isLocked: boolean;
    abilityUses: Record<string, number>;
}

/**
 * A map that links each ability ID to its specific, patterned background class.
 * This keeps the styling logic separate and easy to manage in GameAnimations.tsx.
 */
const ABILITY_STYLE_MAP: Record<string, string> = {
    // Ninja
    [SpecialAbilityId.SwiftSlash]: 'upgrade-bg-attackPower',
    [SpecialAbilityId.SmokeScreen]: 'upgrade-bg-luck',
    [SpecialAbilityId.ShurikenStorm]: 'upgrade-bg-attackSpeed',
    [SpecialAbilityId.DragonStrike]: 'upgrade-bg-critDamage',
    // Rockstar
    [SpecialAbilityId.PowerRiff]: 'upgrade-bg-attackPowerPercent',
    [SpecialAbilityId.AmpShield]: 'upgrade-bg-maxHealth',
    [SpecialAbilityId.SonicBoom]: 'upgrade-bg-critChance',
    [SpecialAbilityId.Starfall]: 'upgrade-bg-critDamage',
    // Snacker
    [SpecialAbilityId.Munch]: 'upgrade-bg-heal',
    [SpecialAbilityId.StickyGlaze]: 'upgrade-bg-poison',
    [SpecialAbilityId.RollingPin]: 'upgrade-bg-attackPower',
    [SpecialAbilityId.FeastMode]: 'upgrade-bg-maxHealth',
    // Space Tank
    [SpecialAbilityId.RocketDash]: 'upgrade-bg-fireball',
    [SpecialAbilityId.ForceField]: 'upgrade-bg-maxHealth',
    [SpecialAbilityId.OrbitalStrike]: 'upgrade-bg-critDamage',
    [SpecialAbilityId.Singularity]: 'upgrade-bg-critChance',
    // Mage
    [SpecialAbilityId.SparkShot]: 'upgrade-bg-fireball',
    [SpecialAbilityId.MagicBarrier]: 'upgrade-bg-maxHealth',
    [SpecialAbilityId.ChainZap]: 'upgrade-bg-attackSpeed',
    [SpecialAbilityId.MeteorCall]: 'upgrade-bg-critDamage',
    // Night Fang
    [SpecialAbilityId.QuickBite]: 'upgrade-bg-heal',
    [SpecialAbilityId.BatForm]: 'upgrade-bg-luck',
    [SpecialAbilityId.ShadowRift]: 'upgrade-bg-critChance',
    [SpecialAbilityId.BloodMoon]: 'upgrade-bg-attackPower',
    // Con Artist
    [SpecialAbilityId.CoinFlip]: 'upgrade-bg-luck',
    [SpecialAbilityId.EscapeRope]: 'upgrade-bg-luck',
    [SpecialAbilityId.Pickpocket]: 'upgrade-bg-attackPower',
    [SpecialAbilityId.Jackpot]: 'upgrade-bg-critDamage',
    // Diva
    [SpecialAbilityId.FlashPose]: 'upgrade-bg-attackPower',
    [SpecialAbilityId.WardrobeShift]: 'upgrade-bg-luck',
    [SpecialAbilityId.SirenSong]: 'upgrade-bg-critChance',
    [SpecialAbilityId.EncoreFinale]: 'upgrade-bg-luck',
};


const AbilityButton: React.FC<AbilityButtonProps> = ({ ability, stage, coins, cooldown, onUse, isLocked, abilityUses }) => {
    const castCount = abilityUses[ability.id] ?? 0;
    const cost = ability.cost(stage, castCount);
    const canAfford = coins >= cost;
    const isOnCooldown = cooldown > 0;
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    
    // For abilities like LiquidateAssets that spend gold dynamically
    const isInternallyAffordable = ability.id === SpecialAbilityId.LiquidateAssets ? coins > 0 : canAfford;
    // An ability is actionable if it's not locked, not on cooldown, and affordable.
    const isActionable = isInternallyAffordable && !isOnCooldown && !isLocked;
    
    // Trigger the "flip" animation once when the player can afford it and it's unlocked.
    useEffect(() => {
        // Flip the card as soon as unlock requirements are met, regardless of cost.
        // The back of the card will handle the "affordable" vs "unaffordable" state.
        if (!isLocked && !isFlipped) {
            setIsFlipped(true);
        }
    }, [isLocked, isFlipped]);

    // This function handles the ability usage and triggers the visual feedback animation.
    const handleUse = () => {
        if (isActionable && !isAnimating) {
            onUse(ability.id);
            setIsAnimating(true);
            // The timeout duration should match the animation duration in GameAnimations.tsx
            setTimeout(() => setIsAnimating(false), 700);
        }
    };

    const secondsLeft = Math.ceil(cooldown / 1000);
    
    const backgroundClass = ABILITY_STYLE_MAP[ability.id] || 'bg-gray-700';

    // Format unlock requirements for the title attribute and display
    const unlockReqs = formatUnlockCriteria(ability.unlockCriteria);
    const getTitleText = () => {
        if (isLocked) {
            return `Locked. ${unlockReqs.join('. ')}`;
        }
        if (ability.id !== SpecialAbilityId.LiquidateAssets && !canAfford) {
            return `Need ${cost.toLocaleString()} coins`;
        }
        if (isOnCooldown) {
            return 'On cooldown';
        }
        return ability.description;
    };

    // Logic to determine the back card's class string based on its state
    const getBackCardClass = () => {
        const base = 'card-back absolute w-full h-full p-2 rounded-lg text-white shadow-md flex items-center gap-2 relative overflow-hidden transition-colors duration-200';
        
        let stateClass = '';
        if (isActionable) {
            stateClass = `${backgroundClass} border border-yellow-400/50 hover:border-yellow-300 transform hover:-translate-y-0.5 animate-pulse-ready`;
        } else {
            stateClass = `${backgroundClass} border border-black/20 filter grayscale opacity-70`;
        }
        
        const animationClass = isAnimating ? 'animate-card-activation' : '';

        return `${base} ${stateClass} ${animationClass}`;
    };

    return (
        <div 
            className={`card w-full h-22 ${isActionable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={handleUse}
            style={{ perspective: '1000px' }}
            title={getTitleText()}
        >
            <div 
                className={`card-inner w-full h-full relative ${isFlipped ? 'is-unlocked' : ''}`}
                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s' }}
            >
                {/* Front of card (Locked state) */}
                <div 
                    className="card-front absolute w-full h-full flex flex-col justify-between p-2 rounded-lg text-left shadow-md bg-gray-800 border border-gray-700" 
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                    <div className="flex justify-between items-center">
                        <span className="font-title text-sm text-gray-400">{ability.name}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center flex-grow text-center">
                         <span className="text-5xl opacity-70">⛓️</span>
                         <div className="text-xs text-gray-400 font-semibold mt-1">
                            {unlockReqs.map((req, i) => <div key={i}>{req}</div>)}
                         </div>
                    </div>
                    <div className="flex justify-end items-center gap-1">
                        <span className="text-base leading-none text-red-400 flex-shrink-0">{COIN_EMOJI}</span>
                        <span className="font-bold text-sm text-red-400">
                            {cost.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Back of card (Unlocked and active state) */}
                <div
                    className={getBackCardClass()}
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    {/* Cooldown overlay */}
                    {isOnCooldown && (
                        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center text-3xl text-white z-10">
                            {secondsLeft}s
                        </div>
                    )}

                    {/* Left: Emoji */}
                    <div className="flex-shrink-0 text-5xl w-14 h-14 flex items-center justify-center" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                        {ability.emoji}
                    </div>

                    {/* Right: Text Content */}
                    <div className="flex-grow flex flex-col text-left overflow-hidden">
                        <span className="font-title text-base leading-tight">{ability.name}</span>
                        <p className="text-[11px] leading-tight mt-1 text-white/90">{ability.description}</p>
                    </div>


                    {/* Absolutely Positioned Cost */}
                    <div className="absolute bottom-1.5 right-2 flex items-center gap-1">
                         <span className={`text-base leading-none flex-shrink-0 ${canAfford ? 'text-yellow-300' : 'text-red-400'}`}>{COIN_EMOJI}</span>
                         <span className={`text-sm min-w-0 ${canAfford ? 'text-yellow-300' : 'text-red-400'}`}>
                           {cost > 0 ? cost.toLocaleString() : 'VAR'}
                       </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AbilityButton;
