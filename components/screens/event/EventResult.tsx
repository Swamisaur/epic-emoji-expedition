/**
 * @file EventResult.tsx
 * @description Renders the animated result panel after a player makes a choice in an event.
 */
import React, { useState, useCallback, useMemo } from 'react';
import { EventConsequence, EventConsequenceType, Item, Rarity } from '../../../types';
import { formatEffectModifiers, FormattedEffectModifier, formatItemStatsForDisplay } from '../../../utils/formatters';
import { ALL_ITEMS, RARITY_BORDER_COLORS } from '../../../constants';
import { getScaledItemStatsForItem } from '../../../utils/itemStatCalculations';
import AnimatedText from '../../ui/AnimatedText';

interface EventResultProps {
    consequence: EventConsequence;
    totalUpgradeLevels: number;
}

const getRarityColor = (rarity: Rarity) => {
    switch (rarity) {
        case 'legendary': return 'text-purple-400';
        case 'rare': return 'text-blue-400';
        default: return 'text-gray-400';
    }
};

const EventResult: React.FC<EventResultProps> = ({ consequence, totalUpgradeLevels }) => {
    const [isTextComplete, setIsTextComplete] = useState(false);

    const handleTextComplete = useCallback(() => {
        setIsTextComplete(true);
    }, []);

    const allFormattedEffects = useMemo(() => {
        let effects: FormattedEffectModifier[] = [];
        
        if (consequence.type === EventConsequenceType.STAT_MODIFIER && consequence.payload.effects.length > 0) {
            consequence.payload.effects.forEach(effect => {
                effects.push(...formatEffectModifiers(effect.modifiers));
            });
        }
        
        if (consequence.type === EventConsequenceType.RESOURCE && consequence.payload.amount !== 0) {
             effects.push({
                emoji: consequence.payload.amount > 0 ? '💰' : '💸',
                line: `${consequence.payload.amount > 0 ? '+' : ''}${consequence.payload.amount.toLocaleString()} Gold`,
                type: consequence.payload.amount > 0 ? 'buff' : 'debuff'
             });
        }

        if (consequence.type === EventConsequenceType.HEAL) {
            let line = 'Healed';
            if (consequence.payload.healType === 'full') line = 'Healed to full health';
            else if (consequence.payload.healType === 'percent_max') line = `Heal ${consequence.payload.amount * 100}% of max HP`;
            else if (consequence.payload.healType === 'percent_missing') line = `Heal ${consequence.payload.amount * 100}% of missing HP`;

            if (consequence.payload.amount !== 0) {
                effects.push({
                    emoji: '❤️‍🩹',
                    line,
                    type: 'buff'
                });
            }
        }

        if (consequence.type === EventConsequenceType.TELEPORT) {
            const { substages } = consequence.payload;
            if (substages !== 0) {
                effects.push({
                    emoji: substages > 0 ? '➡️' : '⬅️',
                    line: `Teleport ${Math.abs(substages)} space${Math.abs(substages) > 1 ? 's' : ''} ${substages > 0 ? 'forward' : 'backward'}`,
                    type: 'info'
                });
            }
        }

        return effects;
    }, [consequence]);

    const itemReward = useMemo(() => {
        if (consequence.type === EventConsequenceType.ITEM_REWARD) {
            const itemTemplate = ALL_ITEMS.find(item => item.id === consequence.payload.itemId);
            if (!itemTemplate) return null;
            
            const itemInstance: Item = {
                ...itemTemplate,
                instanceId: 'event-preview', // Temporary ID for display
                rarity: consequence.payload.rarity,
            };

            const scaledStats = getScaledItemStatsForItem(itemInstance, totalUpgradeLevels);
            const formattedStats = formatItemStatsForDisplay(scaledStats);

            return {
                item: itemInstance,
                stats: formattedStats,
            };
        }
        return null;
    }, [consequence, totalUpgradeLevels]);
    
    const getCardClasses = (type: FormattedEffectModifier['type']) => {
        switch (type) {
            case 'buff': return 'animate-event-result-card-good';
            case 'debuff': return 'animate-event-result-card-bad';
            case 'info': return 'animate-event-result-card-info';
            default: return '';
        }
    };

    return (
        <div className="flex items-center justify-center z-20 w-full">
            <div className="liquid-glass-gold p-4 sm:p-6 rounded-lg w-full flex flex-col items-center gap-6 text-center">
                <AnimatedText 
                    text={consequence.resultText} 
                    onComplete={handleTextComplete}
                    className="text-amber-100 font-semibold text-xl sm:text-2xl leading-snug"
                />

                {isTextComplete && itemReward && (
                     <div
                        className={`opacity-0 p-2 rounded-lg border flex items-center gap-3 animate-event-result-card-good w-full max-w-sm`}
                        style={{ animationDelay: '0.15s', backdropFilter: 'blur(4px)' }}
                    >
                        <div className={`flex-shrink-0 text-4xl w-12 h-12 flex items-center justify-center rounded-lg bg-black/30 border-2 ${RARITY_BORDER_COLORS[itemReward.item.rarity]}`}>
                            <span className="opacity-0" style={{ animation: 'emoji-pop-in 0.4s ease-out forwards 0.3s' }}>{itemReward.item.emoji}</span>
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-white">{itemReward.item.name}</p>
                            <p className={`text-sm font-bold ${getRarityColor(itemReward.item.rarity)}`}>{itemReward.item.rarity.charAt(0).toUpperCase() + itemReward.item.rarity.slice(1)}</p>
                            <div className="text-xs text-green-400 leading-tight">
                                {itemReward.stats.map((stat, i) => <div key={i}>{stat}</div>)}
                            </div>
                        </div>
                    </div>
                )}
                
                {isTextComplete && allFormattedEffects.length > 0 && (
                    <div className="mt-2 flex flex-col gap-3 w-full max-w-sm">
                        {allFormattedEffects.map((effect, index) => (
                            <div 
                                key={index}
                                className={`opacity-0 p-2 rounded-lg border flex items-center gap-3 ${getCardClasses(effect.type)}`}
                                style={{ animationDelay: `${index * 0.15}s`, backdropFilter: 'blur(4px)' }}
                            >
                                <div className={`flex-shrink-0 text-3xl w-10 h-10 flex items-center justify-center rounded-lg bg-black/30`}>
                                    <span className="opacity-0" style={{animation: 'emoji-pop-in 0.4s ease-out forwards 0.3s'}}>{effect.emoji}</span>
                                </div>
                                <p className={`text-base font-bold text-left ${effect.type === 'buff' ? 'text-green-300' : effect.type === 'debuff' ? 'text-red-300' : 'text-blue-300'}`}>
                                    {effect.line}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventResult;