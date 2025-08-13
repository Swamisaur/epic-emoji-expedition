/**
 * @file EquippedItemSlot.tsx
 * @description Renders a single slot in the "Equipped" section, displaying either
 * the item's details or an empty placeholder.
 */
import React from 'react';
import { Item } from '../../../types';
import { getScaledItemStatsForItem } from '../../../utils/itemStatCalculations';
import { formatItemStatsForDisplay } from '../../../utils/formatters';

interface EquippedItemSlotProps {
    slotName: string;
    item?: Item;
    onUnequip: () => void;
    totalUpgradeLevels: number;
}

const EquippedItemSlot: React.FC<EquippedItemSlotProps> = ({ slotName, item, onUnequip, totalUpgradeLevels }) => {
    const scaledStats = item ? getScaledItemStatsForItem(item, totalUpgradeLevels) : {};
    const formattedStats = formatItemStatsForDisplay(scaledStats);

    return (
        <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase text-gray-400 font-bold">{slotName}</span>
            <div
                onClick={onUnequip}
                className={`flex items-center gap-2 p-1.5 rounded-lg min-h-[4rem] transition-all border ${item ? 'bg-gray-700/80 border-green-500/60 cursor-pointer hover:bg-red-500/20' : 'bg-gray-900/50 border-dashed border-gray-600'}`}
            >
                {item ? (
                    <>
                        <div className="flex-shrink-0 h-10 w-10 rounded-md flex items-center justify-center text-3xl bg-gray-900/50">
                            {item.emoji}
                        </div>
                        <div className="flex flex-col text-left overflow-hidden">
                            <span className="text-xs font-bold truncate">{item.name}</span>
                            <div className="text-[10px] text-green-400 leading-tight">
                                {formattedStats.map((stat, i) => <div key={i}>{stat}</div>)}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full"></div>
                )}
            </div>
        </div>
    );
};

export default EquippedItemSlot;
