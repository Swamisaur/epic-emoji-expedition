/**
 * @file usePlayerCoreState.ts
 * @description Manages all state related to the player's identity, stats, and equipment.
 */
import { useState, useEffect, useMemo } from 'react';
import { PlayerInfo, Upgrade, PlayerStats, Item, EquippedItems, ActiveEffect, PlayerClassId } from '../types';
import { ALL_CLASSES, getInitialUpgradesForClass, ANIMATION_DURATIONS } from '../constants';
import { calculatePlayerStats } from '../utils/playerStatCalculations';
import { determinePlayerTransformation } from '../utils/playerVisuals';

export const usePlayerCoreState = () => {
    // --- PLAYER IDENTITY & PROGRESSION ---
    const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasWonGame, setHasWonGame] = useState(false);
    const [lineageCount, setLineageCount] = useState(0); // For Roman numerals in player name
    const [ascensionCount, setAscensionCount] = useState(0); // For world difficulty scaling (A, B, C...)
    const [unlockedAdvancedClasses, setUnlockedAdvancedClasses] = useState<Set<PlayerClassId>>(new Set());
    const [newlyUnlockedClass, setNewlyUnlockedClass] = useState<PlayerClassId | null>(null);


    // --- PLAYER STATS & STATE ---
    const [upgrades, setUpgrades] = useState<Upgrade[]>([]);
    const [evolveBonus, setEvolveBonus] = useState<number>(0);
    const [playerStats, setPlayerStats] = useState<PlayerStats>({ attackPower: 0, attackSpeed: 0, critChance: 0, critDamage: 0, maxHealth: 0, luck: 0, evolveBonus: 0, accuracy: 0, damageReduction: 0 });
    const [playerHealth, setPlayerHealth] = useState<number>(0);
    const [playerTransformAnimation, setPlayerTransformAnimation] = useState<'evolve' | 'devolve' | null>(null);
    const [isPlayerHealing, setIsPlayerHealing] = useState<boolean>(false);
    
    // --- EQUIPMENT & INVENTORY ---
    const [inventory, setInventory] = useState<Item[]>([]);
    const [equippedItems, setEquippedItems] = useState<EquippedItems>({});
    
    // --- EVENT-RELATED STATE ---
    const [activeEffects, setActiveEffects] = useState<ActiveEffect[]>([]);
    const [eventFlags, setEventFlags] = useState<Set<string>>(new Set());

    // --- ONBOARDING & DATA PERSISTENCE ---
    useEffect(() => {
        // On initial load, just set loading to false. This removes game state persistence.
        setIsLoading(false);
    }, []);

    // --- MEMOIZED & DERIVED STATE ---
    const totalUpgradeLevels = useMemo(() => {
        if (!playerInfo || upgrades.length === 0) return 0;
        const initialLevels = getInitialUpgradesForClass(playerInfo.playerClassId).length;
        return upgrades.reduce((sum, u) => sum + u.level, 0) - initialLevels;
    }, [upgrades, playerInfo]);


    // --- CORE EFFECT HOOKS ---
    // Recalculate player stats when dependencies change
    useEffect(() => {
        if (!playerInfo) return; // Guard against running when player is not yet loaded
        const newStats = calculatePlayerStats(upgrades, evolveBonus, equippedItems, totalUpgradeLevels, hasWonGame, activeEffects, playerInfo.playerClassId);
        const healthChange = newStats.maxHealth - playerStats.maxHealth;
        setPlayerStats(newStats);
        if (healthChange > 0) setPlayerHealth(h => Math.min(newStats.maxHealth, h + healthChange));
        else setPlayerHealth(h => Math.min(newStats.maxHealth, h));
    }, [upgrades, evolveBonus, equippedItems, totalUpgradeLevels, hasWonGame, activeEffects, playerInfo, eventFlags]);

    // Update player emoji based on transformations
    useEffect(() => {
        if (!playerInfo) return;
        
        const oldEmoji = playerInfo.displayEmoji;
        const newEmoji = determinePlayerTransformation(upgrades, playerInfo);
        
        if (newEmoji !== oldEmoji) {
            const isBaseEmoji = (emoji: string) => emoji === (playerInfo.baseEmoji + playerInfo.skinTone);
            
            const wasTransformed = !isBaseEmoji(oldEmoji);
            const isNowBase = isBaseEmoji(newEmoji);
            
            if (isNowBase && wasTransformed) {
                setPlayerTransformAnimation('devolve');
            } else {
                setPlayerTransformAnimation('evolve');
            }
            
            setPlayerInfo(p => p ? { ...p, displayEmoji: newEmoji } : null);
            setTimeout(() => setPlayerTransformAnimation(null), ANIMATION_DURATIONS.TRANSFORMATION); // Animation duration
        }
    }, [upgrades, playerInfo]);


    return {
        playerInfo, setPlayerInfo,
        isLoading, setIsLoading,
        hasWonGame, setHasWonGame,
        lineageCount, setLineageCount,
        ascensionCount, setAscensionCount,
        unlockedAdvancedClasses, setUnlockedAdvancedClasses,
        newlyUnlockedClass, setNewlyUnlockedClass,
        upgrades, setUpgrades,
        evolveBonus, setEvolveBonus,
        playerStats, setPlayerStats,
        playerHealth, setPlayerHealth,
        playerTransformAnimation,
        isPlayerHealing, setIsPlayerHealing,
        inventory, setInventory,
        equippedItems, setEquippedItems,
        totalUpgradeLevels,
        activeEffects, setActiveEffects,
        eventFlags, setEventFlags,
    };
};