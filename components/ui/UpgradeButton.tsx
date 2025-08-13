/**
 * @file UpgradeButton.tsx
 * @description A button component for a single player upgrade in the UpgradePanel.
 * It features a "card flip" animation when it becomes affordable for the first time.
 */
import React, { useState, useEffect, useRef } from 'react';
import { Upgrade, UpgradeId } from '../../types';
import { COIN_EMOJI, PLAYER_ATTACK_INTERVAL_BASE } from '../../constants';
import { formatUnlockCriteria } from '../../utils/formatters';

interface UpgradeButtonProps {
    upgrade: Upgrade;
    coins: number;
    onBuy: (id: UpgradeId, emoji: string) => void;
    onMaxBuy: (id: UpgradeId, emoji: string) => void;
    isLocked: boolean;
}

/**
 * A map that links each upgrade ID to its specific, patterned background class.
 * This keeps the styling logic separate and easy to manage in GameAnimations.tsx.
 */
const UPGRADE_STYLE_MAP: Record<string, string> = {
    // Ninja Core
    [UpgradeId.EdgeUp]: 'upgrade-bg-attackPower',
    [UpgradeId.QuickHands]: 'upgrade-bg-attackSpeed',
    [UpgradeId.IronLungs]: 'upgrade-bg-maxHealth',
    [UpgradeId.KeenEye]: 'upgrade-bg-critChance',
    // Ninja Grind
    [UpgradeId.Footwork]: 'upgrade-bg-attackSpeed',
    [UpgradeId.PoisonTips]: 'upgrade-bg-poison',
    [UpgradeId.CloakedBlade]: 'upgrade-bg-critDamage',
    [UpgradeId.AssassinsCode]: 'upgrade-bg-attackPowerPercent',
    // Rockstar Core
    [UpgradeId.PowerChord]: 'upgrade-bg-attackPower',
    [UpgradeId.Encore]: 'upgrade-bg-attackSpeed',
    [UpgradeId.StageStamina]: 'upgrade-bg-maxHealth',
    [UpgradeId.CrowdSurf]: 'upgrade-bg-critChance',
    // Rockstar Grind
    [UpgradeId.AmpFeedback]: 'upgrade-bg-attackPowerPercent',
    [UpgradeId.PyroShow]: 'upgrade-bg-fireball',
    [UpgradeId.StageFlair]: 'upgrade-bg-critDamage',
    [UpgradeId.FanFrenzy]: 'upgrade-bg-luck',
    // Snacker Core
    [UpgradeId.SnackStack]: 'upgrade-bg-maxHealth',
    [UpgradeId.ThickSkin]: 'upgrade-bg-damageReduction',
    [UpgradeId.BulkUp]: 'upgrade-bg-attackPower',
    [UpgradeId.ComfortFood]: 'upgrade-bg-luck',
    // Snacker Grind
    [UpgradeId.SnackHeal]: 'upgrade-bg-heal',
    [UpgradeId.GreaseShield]: 'upgrade-bg-damageReduction',
    [UpgradeId.SugarRush]: 'upgrade-bg-attackSpeed',
    [UpgradeId.CalorieConvert]: 'upgrade-bg-critChance',
    // Space Tank Core
    [UpgradeId.PlasteelPlate]: 'upgrade-bg-maxHealth',
    [UpgradeId.GForceGrit]: 'upgrade-bg-damageReduction',
    [UpgradeId.RocketPunch]: 'upgrade-bg-attackPower',
    [UpgradeId.StarFortune]: 'upgrade-bg-luck',
    // Space Tank Grind
    [UpgradeId.AutoMed]: 'upgrade-bg-heal',
    [UpgradeId.DeflectorNet]: 'upgrade-bg-damageReduction',
    [UpgradeId.ZeroGFlow]: 'upgrade-bg-attackSpeed',
    [UpgradeId.IonThrusters]: 'upgrade-bg-critChance',
    // Mage Core
    [UpgradeId.ArcaneFocus]: 'upgrade-bg-critChance',
    [UpgradeId.WandSpeed]: 'upgrade-bg-attackSpeed',
    [UpgradeId.VitalSpark]: 'upgrade-bg-maxHealth',
    [UpgradeId.ManaSurge]: 'upgrade-bg-critDamage',
    // Mage Grind
    [UpgradeId.RuneFire]: 'upgrade-bg-luck',
    [UpgradeId.EchoBolt]: 'upgrade-bg-attackPower',
    [UpgradeId.ArcaneArmor]: 'upgrade-bg-damageReduction',
    [UpgradeId.SpellLuck]: 'upgrade-bg-luck',
    // Night Fang Core
    [UpgradeId.BloodEdge]: 'upgrade-bg-critChance',
    [UpgradeId.SharpenFang]: 'upgrade-bg-attackSpeed',
    [UpgradeId.DarkVitality]: 'upgrade-bg-maxHealth',
    [UpgradeId.ClawFury]: 'upgrade-bg-critDamage',
    // Night Fang Grind
    [UpgradeId.TheMoon]: 'upgrade-bg-luck',
    [UpgradeId.NightHunger]: 'upgrade-bg-attackPower',
    [UpgradeId.BleedingHits]: 'upgrade-bg-poison',
    [UpgradeId.Awoooo]: 'upgrade-bg-attackPowerPercent',
    // Con Artist Core
    [UpgradeId.LoadedDice]: 'upgrade-bg-luck',
    [UpgradeId.QuickFingers]: 'upgrade-bg-attackSpeed',
    [UpgradeId.PocketSnacks]: 'upgrade-bg-maxHealth',
    [UpgradeId.LuckyStrike]: 'upgrade-bg-critChance',
    // Con Artist Grind
    [UpgradeId.SlickMoves]: 'upgrade-bg-luck',
    [UpgradeId.GoldenTongue]: 'upgrade-bg-luck',
    [UpgradeId.MarkedCards]: 'upgrade-bg-critDamage',
    [UpgradeId.GreasePalm]: 'upgrade-bg-attackPower',
    // Diva Core
    [UpgradeId.StarPower]: 'upgrade-bg-luck',
    [UpgradeId.RhythmFlow]: 'upgrade-bg-attackSpeed',
    [UpgradeId.EncoreHealth]: 'upgrade-bg-maxHealth',
    [UpgradeId.SpotlightCrit]: 'upgrade-bg-critChance',
    // Diva Grind
    [UpgradeId.GlamGuard]: 'upgrade-bg-damageReduction',
    [UpgradeId.FanFlair]: 'upgrade-bg-attackPower',
    [UpgradeId.MermaidsGift]: 'upgrade-bg-luck',
    [UpgradeId.RoyaltyBonus]: 'upgrade-bg-luck',
};

const UpgradeButton: React.FC<UpgradeButtonProps> = ({ upgrade, coins, onBuy, onMaxBuy, isLocked }) => {
    const canAfford = coins >= upgrade.cost;
    const [isFlipped, setIsFlipped] = useState(false);
    const [isBuyAnimating, setIsBuyAnimating] = useState(false);
    
    // An upgrade is actionable if it's not locked and the player can afford it.
    const isActionable = canAfford && !isLocked;

    // State for press-and-hold max buy
    const [isHolding, setIsHolding] = useState(false);
    const holdTimerRef = useRef<number | null>(null);
    const holdDuration = 1500; // 1.5 seconds

    // The "card flip" animation triggers once when the card becomes actionable.
    useEffect(() => {
        // Flip the card as soon as unlock requirements are met, regardless of cost.
        // The back of the card will handle the "affordable" vs "unaffordable" state.
        if (!isLocked && !isFlipped) {
            setIsFlipped(true);
        }
    }, [isLocked, isFlipped]);

    const handleBuy = () => {
        if (isActionable && !isBuyAnimating) {
            onBuy(upgrade.id, upgrade.emoji);
            setIsBuyAnimating(true);
            setTimeout(() => setIsBuyAnimating(false), 700);
        }
    };

    const handlePressStart = () => {
        if (!isActionable) return;
        setIsHolding(true);
        holdTimerRef.current = window.setTimeout(() => {
            onMaxBuy(upgrade.id, upgrade.emoji);
            setIsHolding(false);
            holdTimerRef.current = null; // Mark as completed
        }, holdDuration);
    };

    const handlePressEnd = () => {
        if (holdTimerRef.current) {
            // If the timer is still active, it means the hold was short -> a click
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
            handleBuy();
        }
        // If timer is null, it means the hold action already completed
        setIsHolding(false);
    };
    
    const handlePressCancel = () => {
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }
        setIsHolding(false);
    }

    const backgroundClass = UPGRADE_STYLE_MAP[upgrade.id] || 'bg-gray-700';
    const statChangeText = upgrade.statChangeText;

    // Format unlock requirements for the title attribute and display
    const unlockReqs = formatUnlockCriteria(upgrade.unlockCriteria);
    const getTitleText = () => {
        if (isLocked) {
            return `Locked. ${unlockReqs.join('. ')}`;
        }
        if (canAfford) {
            return `${upgrade.name}: ${upgrade.description} (Hold to max buy)`;
        }
        return `Need ${upgrade.cost.toLocaleString()} coins`;
    };

    return (
        <div 
            className={`card w-full h-20 relative ${isActionable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressCancel}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            title={getTitleText()}
            style={{ perspective: '1000px' }}
        >
            {isHolding && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="bg-white/50 rounded-full animate-hold-progress"></div>
                </div>
            )}
            <div 
                className={`card-inner w-full h-full relative ${isFlipped ? 'is-unlocked' : ''}`}
                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s' }}
            >
                {/* Front of card (Locked state) */}
                <div 
                    className="card-front absolute w-full h-full p-1 rounded-lg text-left shadow-md bg-gray-800 flex items-center gap-1 border border-gray-700" 
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                    {/* Lock icon instead of emoji */}
                    <div className="flex-shrink-0 text-3xl w-11 h-11 flex items-center justify-center text-gray-500">
                        ⛓️
                    </div>

                    {/* Text content with unlock requirements */}
                    <div className="flex-grow flex flex-col text-left overflow-hidden">
                        <span className="font-title text-sm leading-tight text-gray-400">{upgrade.name}</span>
                        <div className="text-[9px] text-gray-400 font-semibold mt-0.5">
                            {unlockReqs.map((req, i) => <div key={i}>{req}</div>)}
                        </div>
                    </div>

                    {/* Cost, always visible */}
                    <div className="absolute bottom-1 right-1.5 flex items-center gap-0.5">
                        <span className="text-sm leading-none text-red-400 flex-shrink-0">{COIN_EMOJI}</span>
                        <span className="text-xs text-red-400 min-w-0">
                            {upgrade.cost.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Back of card (Unlocked and active state) */}
                <div
                    className={`card-back absolute w-full h-full p-1 rounded-lg text-white shadow-md flex items-center gap-1 transition-colors duration-200 
                        ${!canAfford ? 'bg-gray-600/80 border border-gray-500/50 filter grayscale' : `${backgroundClass} border border-black/20 transform hover:-translate-y-0.5`} 
                        ${isBuyAnimating ? 'animate-card-activation' : ''}`}
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                     {/* Left: Emoji */}
                    <div className="flex-shrink-0 text-3xl w-11 h-11 flex items-center justify-center" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                        {upgrade.emoji}
                    </div>

                    {/* Right: Text Content */}
                    <div className="flex-grow flex flex-col text-left overflow-hidden">
                        <span className="font-title text-base leading-tight">{upgrade.name}</span>
                        <span className="text-xs text-white mt-0.5" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>
                            {statChangeText}
                        </span>
                    </div>

                    {/* Absolutely Positioned Level */}
                    <span className="absolute top-1 right-1 bg-black/20 backdrop-blur-[5px] rounded-full font-bold flex items-center justify-center w-5 h-5">
                        <div className="flex flex-col items-center justify-center leading-none -mt-0.5">
                            <span className="text-[8px] -mb-0.5">Lvl</span>
                            <span className="text-[10px]">{upgrade.level}</span>
                        </div>
                    </span>
                    
                    {/* Absolutely Positioned Cost */}
                    <div className="absolute bottom-1 right-1.5 flex items-center gap-0.5">
                        <span className="text-sm leading-none text-yellow-300 flex-shrink-0">{COIN_EMOJI}</span>
                        <span className="text-xs text-yellow-300 min-w-0">
                            {upgrade.cost.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpgradeButton;