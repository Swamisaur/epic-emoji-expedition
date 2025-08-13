/**
 * @file useUnlockManager.ts
 * @description A custom hook to manage the state and logic for displaying
 * "new unlock" notifications on the upgrade panel tabs. This hook is optimized
 * to separate unlock criteria checks from affordability checks for better performance.
 */
import { useState, useEffect, useCallback } from 'react';
import { Upgrade, SpecialAbility, Item, PlayerClassId } from '../types';
import { ALL_CLASSES } from '../constants';
import { isUnlocked } from '../utils/unlockLogic';

type TabKey = 'train' | 'special' | 'equipment';

interface UseUnlockManagerProps {
    coins: number;
    upgrades: Upgrade[];
    stage: number;
    inventory: Item[];
    playerClassId: PlayerClassId;
    totalUpgradeLevels: number;
    coreUpgradeVariety: number;
    abilityUses: Record<string, number>;
}

export const useUnlockManager = ({ coins, upgrades, stage, inventory, playerClassId, totalUpgradeLevels, coreUpgradeVariety, abilityUses }: UseUnlockManagerProps) => {
    const [newUnlockCounts, setNewUnlockCounts] = useState({ train: 0, special: 0, equipment: 0 });
    const [seenUnlocks, setSeenUnlocks] = useState<Set<string>>(new Set());
    
    // State to track items that are unlocked by criteria but not yet affordable.
    const [pendingAffordability, setPendingAffordability] = useState<Set<string>>(new Set());

    // Effect 1: Checks for newly unlocked items by player progress (levels/variety).
    // This effect identifies items that meet their non-cost requirements and adds them
    // to a pending list to be checked for affordability later.
    useEffect(() => {
        const playerProgress = { totalUpgradeLevels, coreUpgradeVariety };
        const newlyUnlockedButUnaffordable = new Set<string>();

        const checkItem = (item: Upgrade | SpecialAbility) => {
            if (seenUnlocks.has(item.id) || pendingAffordability.has(item.id)) {
                return;
            }
            if (isUnlocked(item, playerProgress)) {
                newlyUnlockedButUnaffordable.add(item.id);
            }
        };
        
        const playerClass = ALL_CLASSES.find(c => c.id === playerClassId);
        upgrades.forEach(checkItem);
        playerClass?.skills.forEach(checkItem);

        if (newlyUnlockedButUnaffordable.size > 0) {
            setPendingAffordability(prev => new Set([...prev, ...newlyUnlockedButUnaffordable]));
        }
    }, [totalUpgradeLevels, coreUpgradeVariety, playerClassId, upgrades, seenUnlocks, pendingAffordability]);


    // Effect 2: Checks for newly affordable items from the pending list.
    // This effect runs when coins or stage change, but only iterates over the smaller
    // set of items that are already unlocked by other criteria.
    useEffect(() => {
        if (pendingAffordability.size === 0) return;

        const newlyAffordable = new Set<string>();
        const stillPending = new Set<string>();
        const counts: Record<TabKey, number> = { train: 0, special: 0, equipment: 0 };
        
        const playerClass = ALL_CLASSES.find(c => c.id === playerClassId);

        pendingAffordability.forEach(id => {
            const upgrade = upgrades.find(u => u.id === id);
            const ability = playerClass?.skills.find(a => a.id === id);
            const item = upgrade || ability;

            if (item) {
                const cost = 'costIncreaseFactor' in item
                    ? item.cost
                    : item.cost(stage, abilityUses[item.id] ?? 0);

                if (coins >= cost) {
                    newlyAffordable.add(id);
                    if (upgrade) counts.train++;
                    if (ability) counts.special++;
                } else {
                    stillPending.add(id);
                }
            }
        });

        if (newlyAffordable.size > 0) {
            setNewUnlockCounts(prev => ({
                ...prev,
                train: prev.train + counts.train,
                special: prev.special + counts.special
            }));
            setSeenUnlocks(prev => new Set([...prev, ...newlyAffordable]));
            setPendingAffordability(stillPending);
        }
    }, [coins, stage, playerClassId, upgrades, abilityUses, pendingAffordability, seenUnlocks]);


    // Effect 3: Check for new inventory items. This is independent of other logic.
    useEffect(() => {
        const newlySeen = new Set<string>();
        let newCount = 0;

        inventory.forEach(item => {
            if (item.instanceId && !seenUnlocks.has(item.instanceId)) {
                newCount++;
                newlySeen.add(item.instanceId);
            }
        });
        
        if (newlySeen.size > 0) {
            setNewUnlockCounts(prev => ({ ...prev, equipment: prev.equipment + newCount }));
            setSeenUnlocks(prev => new Set([...prev, ...newlySeen]));
        }
    }, [inventory, seenUnlocks]);


    // Callback to clear notifications when a tab is clicked
    const onTabActivated = useCallback((tab: TabKey) => {
        if (newUnlockCounts[tab] > 0) {
           setNewUnlockCounts(prev => ({ ...prev, [tab]: 0 }));
        }
    }, [newUnlockCounts]);

    /**
     * Resets the entire state of the unlock manager, clearing notifications and seen items.
     * This should be called at the start of every new run (Evolve or Retain).
     */
    const resetUnlockManager = useCallback(() => {
        setNewUnlockCounts({ train: 0, special: 0, equipment: 0 });
        setSeenUnlocks(new Set());
        setPendingAffordability(new Set());
    }, []);

    return { newUnlockCounts, onTabActivated, resetUnlockManager };
};
