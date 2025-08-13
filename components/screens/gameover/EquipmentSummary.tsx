/**
 * @file EquipmentSummary.tsx
 * @description Displays the equipment gained during the run with a sequential, rarity-based animation.
 */
import React, { useState, useEffect } from 'react';
import { Item } from '../../../types';
import MiniItemCard from './MiniItemCard';

interface EquipmentSummaryProps {
    foundItems: Item[];
    startAnimation: boolean;
}

const EquipmentSummary: React.FC<EquipmentSummaryProps> = ({ foundItems, startAnimation }) => {
    const [revealedItems, setRevealedItems] = useState<Item[]>([]);

    useEffect(() => {
        if (!startAnimation || foundItems.length === 0) return;

        const timeouts: number[] = [];
        // Sort items by rarity to show the best ones last for more drama
        const sortedItems = [...foundItems].sort((a, b) => {
            const rarityOrder = { common: 0, rare: 1, legendary: 2 };
            return rarityOrder[a.rarity] - rarityOrder[b.rarity];
        });

        sortedItems.forEach((item, index) => {
            const timeout = window.setTimeout(() => {
                setRevealedItems(prev => [...prev, item]);
            }, index * 250); // Stagger animation for each item
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [foundItems, startAnimation]);

    if (foundItems.length === 0) {
        return <p className="text-gray-500 text-sm italic w-full text-center py-4">No new equipment was found.</p>;
    }

    // Use a denser grid for a "treasure pile" look
    return (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-2 bg-black/20 p-2 rounded-lg min-h-[5rem]">
            {revealedItems.map(item => (
                <MiniItemCard key={item.instanceId} item={item} />
            ))}
        </div>
    );
};

export default EquipmentSummary;
