/**
 * @file EquipmentTab.tsx
 * @description The main component for the equipment tab's content. It renders the
 * equipped item slots and the player's inventory.
 */
import React from 'react';
import { Item, EquippedItems, EquipmentSlot } from '../../../types';
import EquippedItemSlot from './EquippedItemSlot';
import InventoryItem from './InventoryItem';

interface EquipmentTabProps {
    inventory: Item[];
    equippedItems: EquippedItems;
    onEquip: (item: Item) => void;
    onUnequip: (slot: EquipmentSlot) => void;
    totalUpgradeLevels: number;
}

const EquipmentTab: React.FC<EquipmentTabProps> = ({ inventory, equippedItems, onEquip, onUnequip, totalUpgradeLevels }) => {
    
    const equipmentSlots: { slot: EquipmentSlot, name: string }[] = [
        { slot: 'head', name: 'Head' },
        { slot: 'topWear', name: 'Top Wear' },
        { slot: 'bottomWear', name: 'Bottom Wear' },
        { slot: 'mainHand', name: 'Main Hand' },
        { slot: 'offHand', name: 'Off Hand' },
        { slot: 'trinket', name: 'Trinket' }
    ];

    // The minimum number of slots to display in the inventory grid.
    // This ensures a stable layout and a clear scrollable area for new items.
    const MIN_VISIBLE_SLOTS = 4;

    // Calculate how many placeholder slots we need to render.
    const emptySlotsCount = Math.max(0, MIN_VISIBLE_SLOTS - inventory.length);


    return (
        // The entire tab is now the scrollable container. This ensures that even when the
        // inventory is empty, the placeholder slots are rendered within a scrollable view.
        <div className="flex flex-col text-white w-full" role="tabpanel">
            {/* Equipped Items Section - Shows what the player is currently wearing. */}
            <div className="p-1">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                    {equipmentSlots.map(({ slot, name }) => {
                        const item = equippedItems[slot];
                        return (
                            <EquippedItemSlot 
                                key={slot}
                                slotName={name}
                                item={item}
                                onUnequip={() => item && onUnequip(slot)}
                                totalUpgradeLevels={totalUpgradeLevels}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Inventory Title - Shows the number of items in the player's bag. */}
            <div className="px-1 pt-3">
                <h4 className="text-sm font-bold text-gray-400 mb-1">ITEMS ({inventory.length})</h4>
            </div>

            {/* 
              Inventory List Section
              - This container no longer needs flexbox properties to grow or scroll itself.
              - It will have a natural height based on its content (the grid of items).
              - The parent div will handle scrolling if this section makes the content overflow.
            */}
            <div className="bg-gray-900/50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
                    {/* Render the actual items from inventory */}
                    {inventory.map(item => {
                        const isEquipped = Object.values(equippedItems).some(equipped => equipped?.instanceId === item.instanceId);
                        return (
                            <InventoryItem
                                key={item.instanceId}
                                item={item}
                                isEquipped={isEquipped}
                                onEquip={onEquip}
                                totalUpgradeLevels={totalUpgradeLevels}
                            />
                        )
                    })}
                    
                    {/* 
                      Render empty placeholder slots to ensure the grid has a minimum size.
                      These placeholders have a minimum height, giving this section content
                      and making it visible even when the inventory array is empty.
                    */}
                    {Array.from({ length: emptySlotsCount }).map((_, index) => (
                         <div 
                            key={`empty-${index}`} 
                            className="bg-gray-800/50 border-2 border-dashed border-gray-600/50 rounded-lg min-h-[5rem] flex items-center justify-center p-1"
                            aria-hidden="true"
                        >
                            {/* Show a helpful tip in the first empty slot if the inventory is completely empty */}
                            {inventory.length === 0 && index === 0 && (
                                <span className="text-gray-500 text-xs italic text-center">
                                    Defeat enemies to find items!
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EquipmentTab;