/**
 * @file useEquipmentActions.ts
 * @description A hook for handling player actions related to equipping and unequipping items.
 */
import { useCallback } from 'react';
import { Item, EquipmentSlot, EquippedItems } from '../../types';

interface UseEquipmentActionsProps {
    setEquippedItems: React.Dispatch<React.SetStateAction<EquippedItems>>;
}

export const useEquipmentActions = ({ setEquippedItems }: UseEquipmentActionsProps) => {
    /**
     * Equips an item to its designated slot, replacing any item that was there.
     */
    const handleEquipItem = useCallback((itemToEquip: Item) => {
        setEquippedItems(prev => ({ ...prev, [itemToEquip.slot]: itemToEquip }));
    }, [setEquippedItems]);

    /**
     * Removes an item from the specified equipment slot.
     */
    const handleUnequipItem = useCallback((slot: EquipmentSlot) => {
        setEquippedItems(prev => {
            const newEquipped = { ...prev };
            delete newEquipped[slot];
            return newEquipped;
        });
    }, [setEquippedItems]);

    return { handleEquipItem, handleUnequipItem };
};
