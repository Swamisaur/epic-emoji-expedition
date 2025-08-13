

/**
 * @file MiniUpgradeCard.tsx
 * @description A small card to display a purchased upgrade on the game over screen.
 */
import React from 'react';

export interface PurchasedUpgrade {
    id: string;
    name: string;
    emoji: string;
    levels: number;
}

interface MiniUpgradeCardProps {
    upgrade: PurchasedUpgrade;
}

const MiniUpgradeCard: React.FC<MiniUpgradeCardProps> = ({ upgrade }) => {
    return (
        <div
            className={`w-full p-1.5 rounded-lg text-white shadow-md flex flex-col justify-between transition-colors duration-200 animate-card-pulse bg-amber-500 border border-black/20 min-h-[5rem]`}
        >
            {/* Top Row: Name and Level Count */}
            <div className="flex justify-between items-start">
                <span className="text-xs uppercase font-bold text-white/80 tracking-wider truncate">{upgrade.name}</span>
                <span className="text-xs bg-black/40 rounded-full font-bold flex items-center justify-center w-6 h-6">x{upgrade.levels}</span>
            </div>
            
            {/* Center Content: Emoji */}
            <div className="flex flex-col items-center my-1 text-center">
                 <span className="text-3xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>{upgrade.emoji}</span>
            </div>

            {/* Bottom Row: Empty space for vertical balance */}
            <div className="h-2"></div>
        </div>
    );
};

export default MiniUpgradeCard;