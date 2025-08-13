/**
 * @file MiniItemCard.tsx
 * @description A small component to render a single item on the GameOver screen,
 * with an animation determined by its rarity.
 */
import React from 'react';
import { Item } from '../../../types';

interface MiniItemCardProps {
    item: Item;
}

const MiniItemCard: React.FC<MiniItemCardProps> = ({ item }) => {
    
    /**
     * Determines the correct animation class based on the item's rarity.
     * These classes are defined in `GameAnimations.tsx`.
     * @returns A string containing the animation class name.
     */
    const getRarityAnimationClass = () => {
        switch (item.rarity) {
            case 'legendary':
                return 'animate-item-pop-legendary';
            case 'rare':
                return 'animate-item-pop-rare';
            default:
                return 'animate-item-pop-common';
        }
    };

    return (
        <div 
            className={`w-full p-1.5 rounded-lg text-white shadow-md flex items-center justify-center min-h-[4rem] opacity-0 ${getRarityAnimationClass()}`}
            title={`${item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)} ${item.name}`}
        >
            <span className="text-4xl">{item.emoji}</span>
        </div>
    );
};

export default MiniItemCard;
