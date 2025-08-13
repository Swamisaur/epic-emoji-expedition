/**
 * @file EventOptionCard.tsx
 * @description Renders a single, animated, and interactive choice card for an event.
 */
import React, { useMemo } from 'react';
import { EventOption } from '../../../types';

interface EventOptionCardProps {
    option: EventOption;
    onSelect: () => void;
    index: number;
    flowState: 'announcing' | 'choosing' | 'revealing';
    coins: number;
    lockedReason?: string;
}

const backgroundClasses = [
    'event-option-bg-1',
    'event-option-bg-2',
    'event-option-bg-3',
    'event-option-bg-4',
    'event-option-bg-5',
];

const EventOptionCard: React.FC<EventOptionCardProps> = ({ option, onSelect, index, flowState, coins, lockedReason }) => {
    // The animation starts after the main panel and title have animated in.
    const animationDelay = `${1.2 + index * 0.15}s`;

    // Deterministically select a background class based on index
    const backgroundClass = useMemo(() => backgroundClasses[index % backgroundClasses.length], [index]);
    
    const textSizeClass = useMemo(() => {
        const wordCount = option.text.split(' ').length;
        if (wordCount === 1) return 'text-4xl sm:text-5xl'; // huge
        if (wordCount === 2) return 'text-3xl sm:text-4xl'; // very big
        if (wordCount === 3) return 'text-2xl sm:text-3xl'; // big
        if (wordCount === 4) return 'text-2xl sm:text-3xl'; // Bumped up desktop size to match 3 words
        return 'text-xl sm:text-2xl'; // normal
    }, [option.text]);

    const isLocked = !!lockedReason;
    const canAfford = option.cost ? coins >= option.cost : true;
    const isActionable = flowState === 'choosing' && canAfford && !isLocked;
    const isRevealing = flowState === 'revealing';

    const cardClasses = `
        p-3 rounded-lg border text-left
        transition-all duration-300 min-h-[6rem] flex flex-col
        relative
        ${isRevealing ? '' : 'transform opacity-0'}
        ${isActionable ? 'cursor-pointer hover:border-yellow-300 hover:scale-[1.03]' : isRevealing ? 'border-yellow-300/50' : 'filter grayscale cursor-not-allowed opacity-70'}
        border-black/20
        ${backgroundClass}
    `;

    const title = useMemo(() => {
        if (lockedReason) {
            return lockedReason;
        }
        if (!canAfford && option.cost) {
            return `Not enough gold. Needs ${option.cost.toLocaleString()}.`;
        }
        return option.text;
    }, [lockedReason, canAfford, option]);

    return (
        <button
            onClick={onSelect}
            disabled={!isActionable}
            className={cardClasses}
            style={!isRevealing ? { animation: `event-card-fade-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`, animationDelay } : {}}
            title={title}
        >
            <div className="flex items-center gap-3 flex-grow">
                <span className="text-4xl flex-shrink-0" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                    {option.emoji}
                </span>
                <p className={`font-title text-white leading-tight ${textSizeClass}`}>
                    {option.text}
                </p>
            </div>
            {option.cost != null && (
                <div className={`mt-2 px-2 py-0.5 rounded-full text-sm font-bold flex-shrink-0 self-end ${canAfford ? 'bg-black/40 text-yellow-300' : 'bg-red-900/80 text-red-300'}`}>
                    💰 {option.cost.toLocaleString()}
                </div>
            )}
        </button>
    );
};

export default EventOptionCard;
