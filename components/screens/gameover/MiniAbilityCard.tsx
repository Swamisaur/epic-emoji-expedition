


/**
 * @file MiniAbilityCard.tsx
 * @description A small card to display a used ability on the game over screen.
 */
import React from 'react';
import { SpecialAbility, SpecialAbilityId } from '../../../types';

// Copied from AbilityButton.tsx to avoid dependency issues.
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
};

interface MiniAbilityCardProps {
    ability: SpecialAbility;
    useCount: number;
}

const MiniAbilityCard: React.FC<MiniAbilityCardProps> = ({ ability, useCount }) => {
    const backgroundClass = ABILITY_STYLE_MAP[ability.id] || 'bg-gray-700';

    return (
        <div
            className={`w-full p-1.5 rounded-lg text-white shadow-md flex flex-col justify-between transition-colors duration-200 animate-card-activation ${backgroundClass} border border-black/20 min-h-[5rem]`}
            style={{ animationIterationCount: 'infinite', animationDuration: '1.5s' }}
        >
            {/* Top Row: Name and Use Count */}
            <div className="flex justify-between items-start">
                <span className="text-xs uppercase font-bold text-white/80 tracking-wider">{ability.name}</span>
                <span className="text-xs px-1.5 py-0.5 bg-black/40 rounded-full font-bold flex items-center justify-center">x{useCount}</span>
            </div>
            
            {/* Center Content: Emoji */}
            <div className="flex flex-col items-center my-1 text-center">
                 <span className="text-3xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>{ability.emoji}</span>
            </div>

            {/* Bottom Row: Empty space for vertical balance */}
            <div className="h-2"></div>
        </div>
    );
};

export default MiniAbilityCard;