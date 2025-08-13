/**
 * @file InventoryItem.tsx
 * @description Renders a single, clickable item in the inventory list, showing its
 * emoji, name, rarity, and scaled stats.
 */
import React from 'react';
import { Item, Rarity } from '../../../types';
import { RARITY_BORDER_COLORS } from '../../../constants';
import { getScaledItemStatsForItem } from '../../../utils/itemStatCalculations';
import { formatItemStatsForDisplay, formatSlotName } from '../../../utils/formatters';

interface InventoryItemProps {
    item: Item;
    isEquipped: boolean;
    onEquip: (item: Item) => void;
    totalUpgradeLevels: number;
}

/** Helper to get the text color for an item's rarity. */
const getRarityColor = (rarity: Rarity) => {
    switch (rarity) {
        case 'legendary': return 'text-purple-400';
        case 'rare': return 'text-blue-400';
        default: return 'text-gray-400';
    }
};

const InventoryItem: React.FC<InventoryItemProps> = ({ item, isEquipped, onEquip, totalUpgradeLevels }) => {
    const scaledStats = getScaledItemStatsForItem(item, totalUpgradeLevels);
    const formattedStats = formatItemStatsForDisplay(scaledStats);
    const borderColor = isEquipped ? 'border-green-500/60' : RARITY_BORDER_COLORS[item.rarity];
    const rarityText = item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1);

    return (
        <div
            onClick={() => onEquip(item)}
            className={`flex items-center gap-2 p-1.5 rounded-lg cursor-pointer transition-all bg-gray-700 hover:bg-blue-500/20 border ${borderColor} ${isEquipped ? 'opacity-60' : 'hover:border-blue-400'}`}
        >
             <div className="flex-shrink-0 h-10 w-10 rounded-md flex items-center justify-center text-3xl bg-gray-900/50">
                {item.emoji}
             </div>
            <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-bold truncate">{item.name}</span>
                 <span className={`text-[10px] -mt-0.5 font-bold ${getRarityColor(item.rarity)}`}>
                    {rarityText} {formatSlotName(item.slot)}
                 </span>
                <div className="text-[10px] text-green-400 leading-tight mt-1">
                    {formattedStats.map((stat, i) => <div key={i}>{stat}</div>)}
                </div>
            </div>
        </div>
    );
};

export default InventoryItem;