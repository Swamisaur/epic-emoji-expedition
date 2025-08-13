/**
 * @file lootLogic.ts
 * @description Contains utility functions for calculating and distributing loot.
 */
import React from 'react';
import { PlayerStats, Enemy, Rarity, Item, CombatLogMessage, FloatingText, EquippedItems, RealmTheme } from '../types';
import { COIN_EMOJI_TIERS, COIN_TIER_THRESHOLDS, RARITY_LUCK_FACTORS } from '../constants';
import { ALL_ITEMS } from '../data/items';

interface LootHandlerProps {
    enemy: Enemy;
    playerStats: PlayerStats;
    skillEffects: any;
    setCoins: React.Dispatch<React.SetStateAction<number>>;
    setTotalGoldEarnedThisRun: React.Dispatch<React.SetStateAction<number>>;
    setInventory: React.Dispatch<React.SetStateAction<Item[]>>;
    addCombatLog: (message: string, type: CombatLogMessage['type']) => void;
    addFloatingText: (text: string, isCrit: boolean, x: number, y: number, type: FloatingText['type'], dx?: number, dy?: number) => void;
    equippedItems: EquippedItems;
    setEquippedItems: React.Dispatch<React.SetStateAction<EquippedItems>>;
}

/**
 * Handles all loot distribution (gold and items) when an enemy is defeated.
 * @param props - The necessary state and setters for loot handling.
 */
export const handleEnemyDefeatLoot = (props: LootHandlerProps): void => {
    const { 
        enemy, 
        playerStats, 
        skillEffects,
        setCoins, 
        setTotalGoldEarnedThisRun, 
        setInventory, 
        addCombatLog, 
        addFloatingText,
        equippedItems,
        setEquippedItems,
    } = props;
    
    const finalLuck = playerStats.luck * (1 + (skillEffects.luckBuff || 0));

    // --- Gold Reward ---
    const coinsGained = Math.floor(enemy.coinReward * finalLuck);
    if (coinsGained > 0) {
        addCombatLog(`You plunder ${coinsGained} 💰 from the remains.`, 'reward');
        setCoins(prev => prev + coinsGained);
        setTotalGoldEarnedThisRun(prev => prev + coinsGained);

        // Determine which coin emoji to show for the floating text
        let coinEmoji = COIN_EMOJI_TIERS.small;
        if (coinsGained >= COIN_TIER_THRESHOLDS.large) {
            coinEmoji = COIN_EMOJI_TIERS.large;
        } else if (coinsGained >= COIN_TIER_THRESHOLDS.medium) {
            coinEmoji = COIN_EMOJI_TIERS.medium;
        }
        addFloatingText(`${coinEmoji} +${coinsGained}`, false, 75 + Math.random() * 10 - 5, 25, 'coin');
    }

    // --- Item Drops ---
    let itemDropChance = finalLuck - 1.0; // Every 1.0 of luck guarantees a drop attempt
    while (itemDropChance > 0) {
        if (Math.random() < itemDropChance) {
            const luckBonus = finalLuck - 1.0;
            let rarity: Rarity = 'common';
            
            // Rarity is determined by luck bonus. These can go > 1.
            const legendaryChance = luckBonus * RARITY_LUCK_FACTORS.legendary;
            const rareChance = luckBonus * RARITY_LUCK_FACTORS.rare;

            if (Math.random() < legendaryChance) {
                rarity = 'legendary';
            } else if (Math.random() < rareChance) {
                rarity = 'rare';
            }
            
            const droppedItemTemplate = ALL_ITEMS[Math.floor(Math.random() * ALL_ITEMS.length)];
            const newItemInstance: Item = { 
                ...droppedItemTemplate, 
                instanceId: `${Date.now()}-${Math.random()}`,
                rarity: rarity,
            };

            setInventory(prev => [...prev, newItemInstance]);

            // Auto-equip if slot is empty
            if (!equippedItems[newItemInstance.slot]) {
                setEquippedItems(prev => ({ ...prev, [newItemInstance.slot]: newItemInstance }));
                addCombatLog(`Auto-equipped ${newItemInstance.emoji} ${newItemInstance.name}!`, 'item');
            }

            let rarityColor = 'text-gray-300';
            if (rarity === 'legendary') rarityColor = 'text-purple-400 font-bold';
            else if (rarity === 'rare') rarityColor = 'text-blue-400 font-bold';

            addCombatLog(`Dropped <span class="${rarityColor}">${rarity.toUpperCase()}</span> ${newItemInstance.emoji} ${newItemInstance.name}!`, 'item');
            addFloatingText(`${newItemInstance.emoji}`, false, 70, 28, 'item');
        }
        itemDropChance -= 1.0;
    }
};