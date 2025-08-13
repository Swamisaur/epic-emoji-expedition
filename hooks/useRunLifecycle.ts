/**
 * @file useRunLifecycle.ts
 * @description Manages the lifecycle of a game run: starting, resetting, and ending.
 */
import { useCallback } from 'react';
import { Upgrade, EquippedItems, GameState, PlayerInfo, CombatLogMessage, RealmTheme, ActiveEffect, GameEvent, PlayerClassId, Item } from '../types';
import { EVOLVE_BONUS_PER_LEVEL, REALM_THEMES, ALL_CLASSES, getInitialUpgradesForClass, ALL_ITEMS, WIN_REALM } from '../constants';
import { calculatePlayerStats } from '../utils/playerStatCalculations';
import { generateEnemy } from '../utils/enemyLogic';
import { numberToRoman } from '../utils/formatters';
import { legendEvents } from '../data/events/legends';

interface UseRunLifecycleProps {
    // State values
    playerInfo: PlayerInfo | null;
    upgrades: Upgrade[];
    evolveBonus: number;
    equippedItems: EquippedItems;
    totalUpgradeLevels: number;
    hasWonGame: boolean;
    lineageCount: number;
    ascensionCount: number;
    eventFlags: Set<string>;
    stage: number;
    coins: number;
    activeEffects: ActiveEffect[];
    realmThemeOrder: RealmTheme[];
    unlockedAdvancedClasses: Set<PlayerClassId>;

    // Setters
    setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerInfo | null>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    setSubStage: React.Dispatch<React.SetStateAction<number>>;
    setCoins: React.Dispatch<React.SetStateAction<number>>;
    setCoinsSpentThisRun: React.Dispatch<React.SetStateAction<number>>;
    setTotalGoldEarnedThisRun: React.Dispatch<React.SetStateAction<number>>;
    setUpgrades: React.Dispatch<React.SetStateAction<Upgrade[]>>;
    setEvolveBonus: React.Dispatch<React.SetStateAction<number>>;
    setDefeatedEnemies: React.Dispatch<React.SetStateAction<any[]>>;
    setPlayerStats: React.Dispatch<React.SetStateAction<any>>;
    setPlayerHealth: React.Dispatch<React.SetStateAction<number>>;
    setCombatLog: React.Dispatch<React.SetStateAction<any[]>>;
    setFloatingTexts: React.Dispatch<React.SetStateAction<any[]>>;
    setCurrentEnemy: React.Dispatch<React.SetStateAction<any | null>>;
    setInventory: React.Dispatch<React.SetStateAction<any[]>>;
    setEquippedItems: React.Dispatch<React.SetStateAction<EquippedItems>>;
    setShowAttackHint: React.Dispatch<React.SetStateAction<boolean>>;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    setHasWonGame: React.Dispatch<React.SetStateAction<boolean>>;
    setLineageCount: React.Dispatch<React.SetStateAction<number>>;
    setAscensionCount: React.Dispatch<React.SetStateAction<number>>;
    setRealmThemeOrder: React.Dispatch<React.SetStateAction<RealmTheme[]>>;
    setIsEnteringRealm: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPlayerHealing: React.Dispatch<React.SetStateAction<boolean>>;
    setTransformationHistory: React.Dispatch<React.SetStateAction<string[]>>;
    setNewlyUnlockedClass: React.Dispatch<React.SetStateAction<PlayerClassId | null>>;
    // Event setters
    setActiveEffects: React.Dispatch<React.SetStateAction<ActiveEffect[]>>;
    setEventFlags: React.Dispatch<React.SetStateAction<Set<string>>>;
    setActiveEvent: React.Dispatch<React.SetStateAction<GameEvent | null>>;
    setEventsThisRealm: React.Dispatch<React.SetStateAction<number>>;
    setTriggeredEventIds: React.Dispatch<React.SetStateAction<Set<string>>>;
    setEventTriggerSubstages: React.Dispatch<React.SetStateAction<Set<number>>>;
    // Ability setters
    setAbilityCooldowns: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    setAbilityUses: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    setAbilityActiveEffects: React.Dispatch<React.SetStateAction<any>>;
    effectTimers: React.MutableRefObject<Record<string, number>>;
    
    // Refs
    processedEnemyIds: React.MutableRefObject<Set<string>>;
    lastManualAttackTime: React.MutableRefObject<number>;
    hintTimerIndex: React.MutableRefObject<number>;
    playerAttackCooldown: React.MutableRefObject<number>;
    playerAttackCounter: React.MutableRefObject<number>;
    enemyAttackCooldown: React.MutableRefObject<number>;
    enemyChargeTimer: React.MutableRefObject<number>;

    // Callbacks
    addCombatLog: (message: string, type: CombatLogMessage['type']) => void;
    handleUserInteraction: () => void;
    resetUnlockManager: () => void;
}

/**
 * Generates the realm order for a run. It shuffles the first 10 realms and sets the
 * 11th realm ("The Mad King's Vault") as the fixed 10th and final destination.
 * @returns A 10-element array of RealmTheme objects.
 */
const generateRealmOrder = (): RealmTheme[] => {
    // The final realm is always The Mad King's Vault.
    const finalRealm = REALM_THEMES[REALM_THEMES.length - 1];
    // Get all other realms to shuffle.
    const otherRealms = REALM_THEMES.slice(0, -1);
    
    // Shuffle the other realms using the Fisher-Yates algorithm.
    for (let i = otherRealms.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [otherRealms[i], otherRealms[j]] = [otherRealms[j], otherRealms[i]];
    }

    // Take the first 9 shuffled realms and add the final boss realm as the 10th.
    const newOrder = [...otherRealms.slice(0, 9), finalRealm];
    return newOrder;
};


export const useRunLifecycle = (props: UseRunLifecycleProps) => {
    const {
        playerInfo, upgrades, evolveBonus, equippedItems, totalUpgradeLevels, hasWonGame, lineageCount, ascensionCount, eventFlags, stage, coins,
        activeEffects, realmThemeOrder, unlockedAdvancedClasses,
        setPlayerInfo, setStage, setSubStage, setCoins, setCoinsSpentThisRun, setUpgrades, setEvolveBonus,
        setDefeatedEnemies, setPlayerStats, setPlayerHealth, setCombatLog, setFloatingTexts,
        setCurrentEnemy, setInventory, setEquippedItems, setShowAttackHint, setGameState,
        setHasWonGame, setLineageCount, setAscensionCount, setTotalGoldEarnedThisRun,
        setRealmThemeOrder, setIsEnteringRealm, setActiveEffects, setEventFlags, setActiveEvent, setEventsThisRealm, setTriggeredEventIds,
        setEventTriggerSubstages, setAbilityCooldowns, setAbilityUses, setAbilityActiveEffects, effectTimers,
        processedEnemyIds, lastManualAttackTime, hintTimerIndex,
        playerAttackCooldown, playerAttackCounter, enemyAttackCooldown, enemyChargeTimer,
        addCombatLog, handleUserInteraction, resetUnlockManager, setIsPlayerHealing,
        setTransformationHistory, setNewlyUnlockedClass,
    } = props;
    
    /** Resets all state related to the player's stats and equipment. */
    const resetPlayerState = useCallback((retainedUpgrades: Upgrade[], newEvolveBonus: number, retainEquipment: boolean, playerClassId: PlayerClassId, startingItems: Item[] = [], permanentEffects: ActiveEffect[] = []) => {
        const initialUpgrades = retainedUpgrades;
        const totalLevels = initialUpgrades.reduce((sum, u) => sum + u.level, 0) - initialUpgrades.length;
        const items = retainEquipment ? equippedItems : {};
        const newStats = calculatePlayerStats(initialUpgrades, newEvolveBonus, items, totalLevels, hasWonGame, permanentEffects, playerClassId);

        setUpgrades(initialUpgrades);
        setEvolveBonus(newEvolveBonus);
        setPlayerStats(newStats);
        setPlayerHealth(newStats.maxHealth);
        if (!retainEquipment) {
            setInventory(startingItems);
            setEquippedItems({});
        }
        // Set event-related player state, keeping permanent effects from boons
        setActiveEffects(permanentEffects);
        // Clear flags for the new run
        setEventFlags(new Set());
        setTransformationHistory([]);

    }, [
        setUpgrades, setEvolveBonus, setPlayerStats, setPlayerHealth, setInventory, setEquippedItems,
        equippedItems, hasWonGame, setActiveEffects, setEventFlags, setTransformationHistory,
    ]);

    /** Resets all state related to the run's progression (stage, enemies, etc.). */
    const resetProgressionState = useCallback((startingStage: number, newRealmOrder: RealmTheme[], startingGold: number = 0) => {
        setStage(startingStage);
        setSubStage(1);
        setCoins(startingGold);
        setCoinsSpentThisRun(0);
        setTotalGoldEarnedThisRun(startingGold);
        setDefeatedEnemies([]);
        processedEnemyIds.current.clear();
        
        // Reset event-related progression state
        setActiveEvent(null);
        setEventsThisRealm(0);
        setTriggeredEventIds(new Set());

        // Guarantees one event, with a 40% chance for a second, and a subsequent 5% chance for a third.
        const triggerPoints = new Set<number>();
        const possibleSubstages = [1, 2, 3, 4, 5];

        // Shuffle substages to ensure random, unique event triggers
        for (let i = possibleSubstages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [possibleSubstages[i], possibleSubstages[j]] = [possibleSubstages[j], possibleSubstages[i]];
        }
        
        // First event is guaranteed.
        triggerPoints.add(possibleSubstages.pop()!);

        // Second event has a 40% chance.
        if (Math.random() < 0.40) {
            triggerPoints.add(possibleSubstages.pop()!);
            
            // Third event has a 5% chance *if* the second one triggered.
            if (Math.random() < 0.05) {
                // Ensure there's a slot left
                if (possibleSubstages.length > 0) {
                    triggerPoints.add(possibleSubstages.pop()!);
                }
            }
        }
        
        setEventTriggerSubstages(triggerPoints);

        const initialTheme = newRealmOrder[(startingStage - 1) % newRealmOrder.length];
        setCurrentEnemy(generateEnemy(startingStage, 1, initialTheme, ascensionCount));
        
        setGameState('playing');
        setRealmThemeOrder(newRealmOrder);
    }, [
        setStage, setSubStage, setCoins, setCoinsSpentThisRun, setTotalGoldEarnedThisRun,
        setDefeatedEnemies, processedEnemyIds, setCurrentEnemy, setGameState, setRealmThemeOrder, 
        ascensionCount, setActiveEvent, setEventsThisRealm, setTriggeredEventIds, setEventTriggerSubstages
    ]);

    /** Resets all state related to the UI feedback and timers. */
    const resetUIState = useCallback(() => {
        setCombatLog([]);
        setFloatingTexts([]);
        lastManualAttackTime.current = Date.now();
        hintTimerIndex.current = 0;
        setShowAttackHint(false);
        // Reset game loop timers
        playerAttackCooldown.current = 0;
        playerAttackCounter.current = 0;
        enemyAttackCooldown.current = 0;
        enemyChargeTimer.current = 0;
    }, [setCombatLog, setFloatingTexts, lastManualAttackTime, hintTimerIndex, setShowAttackHint, playerAttackCooldown, playerAttackCounter, enemyAttackCooldown, enemyChargeTimer]);

    /** Resets all state related to abilities. */
    const resetAbilityState = useCallback((permanentEffects: ActiveEffect[]) => {
        // Critical Bug Fix: Clear any lingering timers from the previous run.
        Object.values(effectTimers.current).forEach(clearTimeout);
        effectTimers.current = {};
        
        setAbilityCooldowns({});
        setAbilityUses({});
        
        let initialDamageShield = 0;
        const shieldEffect = permanentEffects.find(e => e.id === 'legend_shield_buff');
        if (shieldEffect) {
            initialDamageShield = 100;
        }

        setAbilityActiveEffects({
            freeze: false,
            frenzy: false,
            isFeasting: false,
            damageReduction: 0,
            enemyPowerDebuff: 0,
            damageShield: initialDamageShield,
            poisonAttacks: 0,
            poisonDoT: { damage: 0, duration: 0 },
            venomDoT: { damage: 0, duration: 0 },
            enemyWillMiss: false,
            guaranteedCrits: 0,
            critBuff: null,
            burnDoT: { damage: 0, duration: 0 },
            enemySpeedDebuff: 0,
            reflectDamage: 0,
            critDamageBuff: 0,
            bleedDoT: { damage: 0, duration: 0 },
            attackSpeedBuff: 0,
        });
    }, [setAbilityCooldowns, setAbilityUses, setAbilityActiveEffects, effectTimers]);

    /** Orchestrates the full reset of the game state for a new run. */
    const resetRun = useCallback((retainedUpgrades: Upgrade[], newEvolveBonus: number, retainEquipment: boolean, startingStage: number, newRealmOrder: RealmTheme[], playerClassId: PlayerClassId, startingGold: number = 0, startingItems: Item[] = [], permanentEffects: ActiveEffect[] = []) => {
        resetUnlockManager();
        resetPlayerState(retainedUpgrades, newEvolveBonus, retainEquipment, playerClassId, startingItems, permanentEffects);
        resetProgressionState(startingStage, newRealmOrder, startingGold);
        resetUIState();
        resetAbilityState(permanentEffects);
    }, [
        resetUnlockManager,
        resetPlayerState,
        resetProgressionState,
        resetUIState,
        resetAbilityState
    ]);

    const handleGameStart = useCallback((info: Omit<PlayerInfo, 'displayEmoji' | 'baseName'> & { finalEmoji: string; playerClassId: PlayerClassId }) => {
        handleUserInteraction();
        setNewlyUnlockedClass(null);
        const newPlayerInfo: PlayerInfo = { 
            ...info, 
            baseName: info.name,
            displayEmoji: info.finalEmoji 
        };
        setPlayerInfo(newPlayerInfo);
        
        const newRealmOrder = generateRealmOrder();
        const initialUpgrades = getInitialUpgradesForClass(info.playerClassId);
        resetRun(initialUpgrades, 0, false, 1, newRealmOrder, info.playerClassId);
        setIsEnteringRealm(true);
    }, [handleUserInteraction, setPlayerInfo, resetRun, setIsEnteringRealm, setNewlyUnlockedClass]);
    
    const handleEvolve = useCallback((newClassId?: PlayerClassId) => {
        if (!playerInfo) return;
        setNewlyUnlockedClass(null);
        const newLineageCount = lineageCount + 1;
        setLineageCount(newLineageCount);

        const classToUse = newClassId || playerInfo.playerClassId;
        const oldClass = ALL_CLASSES.find(c => c.id === playerInfo.playerClassId);
        const newClass = ALL_CLASSES.find(c => c.id === classToUse);
        
        // If switching to a new base class, reset lineage.
        const isNewBaseClass = newClass?.tier === 'base' && newClass.id !== oldClass?.id;
        const finalLineageCount = isNewBaseClass ? 0 : newLineageCount;
        if (isNewBaseClass) {
             setLineageCount(0);
        }

        // Start the lineage from II
        const newName = isNewBaseClass ? playerInfo.baseName : `${playerInfo.baseName} ${numberToRoman(finalLineageCount + 1)}`;
        const newPlayerInfo = { ...playerInfo, name: newName, playerClassId: classToUse };
        setPlayerInfo(newPlayerInfo);
        

        const startingStage = 1;
        const baseBonus = totalUpgradeLevels * EVOLVE_BONUS_PER_LEVEL;
        const goldBonus = Math.floor(coins / 100) * 0.002;
        const newBonus = baseBonus + goldBonus;

        const newRealmOrder = generateRealmOrder();
        
        if (baseBonus > 0) {
            addCombatLog(`Reborn as a new legend! Your upgrades grant a permanent ${(baseBonus * 100).toFixed(2)}% boost.`, 'info');
        } else {
            addCombatLog(`Reborn as a new legend!`, 'info');
        }

        if (goldBonus > 0) {
            addCombatLog(`Your treasure hoard grants an additional ${(goldBonus * 100).toFixed(2)}% permanent bonus!`, 'reward');
        }
        
        const initialUpgrades = getInitialUpgradesForClass(classToUse);
        if (newClassId && newClassId !== playerInfo.playerClassId) {
            const newClassName = ALL_CLASSES.find(c => c.id === newClassId)?.name || 'Unknown';
            addCombatLog(`You have embraced the path of the ${newClassName}!`, 'special');
        }
        
        resetRun(initialUpgrades, evolveBonus + newBonus, false, startingStage, newRealmOrder, classToUse);
        setIsEnteringRealm(true);
    }, [
        lineageCount, playerInfo, totalUpgradeLevels, evolveBonus, addCombatLog, coins,
        setLineageCount, setPlayerInfo, resetRun, setIsEnteringRealm, setNewlyUnlockedClass
    ]);
    
    const handleRetain = useCallback(() => {
        if (!playerInfo) return;
        setNewlyUnlockedClass(null);
        const startingStage = 1;
        const newRealmOrder = generateRealmOrder();
        addCombatLog('Returning to the fight with renewed vigor.', 'info');

        const goldBonus = Math.floor(coins / 100) * 0.002;
        const newEvolveBonus = evolveBonus + goldBonus;

        if (goldBonus > 0) {
            addCombatLog(`Your treasure hoard grants an additional ${(goldBonus * 100).toFixed(2)}% permanent bonus!`, 'reward');
        }

        resetRun(upgrades, newEvolveBonus, true, startingStage, newRealmOrder, playerInfo.playerClassId);
        setIsEnteringRealm(true);
    }, [upgrades, evolveBonus, playerInfo, addCombatLog, resetRun, setIsEnteringRealm, coins, setNewlyUnlockedClass]);

    const handleChangeClass = useCallback(() => {
        addCombatLog('Choosing a new path...', 'info');
        setPlayerInfo(null);
        setGameState('playing');
        setNewlyUnlockedClass(null);
    }, [addCombatLog, setPlayerInfo, setGameState, setNewlyUnlockedClass]);
    
    const handleWinAndContinue = useCallback(() => {
        if (!playerInfo) return;
        
        let startingGold = 0;
        let startingItems: Item[] = [];
        let startingStage = 1;
        let permanentEffects: ActiveEffect[] = [];

        // Check for flags set by the legend event
        if (eventFlags.has('legend_crown_buff')) {
            if (!hasWonGame) {
                setHasWonGame(true);
                addCombatLog('The 📿 Magic Necklace of Wishes is yours! Stats permanently doubled!', 'special');
            }
        }
        if (eventFlags.has('legend_change_class')) {
            handleChangeClass();
            return;
        }
        // Generic Event 1
        if (eventFlags.has('legend_gold_start')) {
            startingGold = 2500;
            addCombatLog(`You begin your next journey with a cache of ${startingGold.toLocaleString()} gold!`, 'reward');
        }
        if (eventFlags.has('legend_item_start')) {
            const legendaryItemTemplate = ALL_ITEMS.find(item => item.id === 't9') || ALL_ITEMS[0];
            const newItem: Item = { ...legendaryItemTemplate, instanceId: `legend-start-${Date.now()}`, rarity: 'legendary' };
            startingItems.push(newItem);
            addCombatLog(`You begin your journey with a legendary gift: ${newItem.emoji} ${newItem.name}!`, 'item');
        }
        // Cosmic Forge Event
        if (eventFlags.has('legend_permanent_hp')) {
            permanentEffects.push({ id: 'legend_hp_buff', name: 'Cosmic Temperament', description: 'Permanently gain +100 Max Health.', type: 'buff', duration_ms: Infinity, modifiers: { flat: { maxHealth: 100 } } });
            addCombatLog(`The Cosmic Forge has tempered your soul, granting a permanent +100 Health!`, 'special');
        }
        if (eventFlags.has('legend_double_gold_start')) {
            startingGold = 5000;
            addCombatLog(`The Forge's Bounty grants you a starting treasury of 5000 gold!`, 'reward');
        }
        // Weaver of Fates Event
        if (eventFlags.has('legend_skip_realm_1')) {
            startingStage = 2;
            addCombatLog(`The Weaver of Fates has advanced your thread, allowing you to start in Realm 2!`, 'special');
        }
        // Archivist of Heroes Event
        if (eventFlags.has('legend_two_items_start')) {
            const item1 = ALL_ITEMS.find(item => item.id === 'm10') || ALL_ITEMS[0];
            const item2 = ALL_ITEMS.find(item => item.id === 'o10') || ALL_ITEMS[1];
            startingItems.push({ ...item1, instanceId: `legend-start-1-${Date.now()}`, rarity: 'legendary' });
            startingItems.push({ ...item2, instanceId: `legend-start-2-${Date.now()}`, rarity: 'legendary' });
            addCombatLog(`The Archives have recorded your legend, granting you two powerful items to begin your journey!`, 'item');
        }
        if (eventFlags.has('legend_start_with_shield')) {
             permanentEffects.push({ id: 'legend_shield_buff', name: 'Indomitable Will', description: 'Start with a permanent 100-point damage absorbing shield.', type: 'buff', duration_ms: Infinity, modifiers: {} });
             addCombatLog(`Your indomitable will is remembered, granting you a permanent 100-point damage-absorbing shield!`, 'special');
        }
        // Gambler's Paradise Event
        if (eventFlags.has('legend_wager_gold')) {
            if (Math.random() > 0.5) {
                startingGold = 7777;
                addCombatLog(`The wager pays off! You start with a massive 7777 gold!`, 'reward');
            } else {
                startingGold = 1;
                addCombatLog(`The wager fails! You start with but a single coin.`, 'enemy');
            }
        }
        if (eventFlags.has('legend_wager_item')) {
            if (Math.random() > 0.5) {
                const item = ALL_ITEMS.find(i => i.id === 't10'); // Golden Fleece
                if(item) startingItems.push({ ...item, instanceId: `legend-wager-${Date.now()}`, rarity: 'legendary' });
                addCombatLog(`Lady Luck smiles! You start with The Golden Fleece!`, 'item');
            } else {
                const item = ALL_ITEMS.find(i => i.id === 'h1'); // Baseball Cap
                if(item) startingItems.push({ ...item, instanceId: `legend-wager-${Date.now()}`, rarity: 'common' });
                addCombatLog(`Lady Luck frowns... You start with a simple baseball cap.`, 'info');
            }
        }
        
        // --- ALL CELEBRITY LEGEND FLAGS ---
        const addPermEffect = (id: string, name: string, description: string, type: 'buff' | 'debuff', modifiers: any, log: string, logType: 'special' | 'enemy') => {
            permanentEffects.push({ id, name, description, type, duration_ms: Infinity, modifiers });
            addCombatLog(log, logType);
        };
        
        // The Rock
        if (eventFlags.has('legend_rock_peoples_champion')) { addPermEffect('legend_rock_peoples_champion', "The People's Champion", 'Permanently +15% ATK & +10% HP.', 'buff', { percent: { attackPower: 0.15, maxHealth: 0.10 } }, 'Your devotion to the people grants you their strength!', 'special'); }
        if (eventFlags.has('legend_rock_final_boss')) { addPermEffect('legend_rock_final_boss', "The Final Boss", 'Permanently +30% ATK, -10% HP.', 'buff', { percent: { attackPower: 0.30, maxHealth: -0.10 } }, 'You have become the ultimate challenge.', 'special'); }
        if (eventFlags.has('legend_rock_hollywood_star')) { addPermEffect('legend_rock_hollywood_star', "Hollywood A-Lister", 'Permanently +30% Fortune.', 'buff', { percent: { luck: 0.30 } }, 'Your star power attracts immense fortune!', 'special'); }
        if (eventFlags.has('legend_rock_jabroni')) { addPermEffect('legend_rock_jabroni', "Jabroni Fever", 'Permanently -10% ATK.', 'debuff', { percent: { attackPower: -0.10 } }, 'Your arrogance has made you weak.', 'enemy'); }

        // Elon Musk
        if (eventFlags.has('legend_elon_humanity')) { addPermEffect('legend_elon_humanity', 'Benefactor of Humanity', 'Permanently +10% to all core stats.', 'buff', { percent: { attackPower: 0.10, maxHealth: 0.10, attackSpeed: 0.10 } }, 'Your vision for humanity has empowered you!', 'special'); }
        if (eventFlags.has('legend_elon_occupy')) { addPermEffect('legend_elon_occupy', 'Mars Colonist', 'Permanently +30% ATK, -10% HP.', 'buff', { percent: { attackPower: 0.30, maxHealth: -0.10 } }, 'The ambition to conquer requires sacrifice.', 'special'); }
        if (eventFlags.has('legend_elon_doge')) { addPermEffect('legend_elon_doge', 'Meme Lord', 'Permanently +50% Fortune, -10% ATK.', 'buff', { percent: { luck: 0.50, attackPower: -0.10 } }, 'To the moon! At what cost?', 'special'); }
        if (eventFlags.has('legend_elon_timeline')) { addPermEffect('legend_elon_timeline', 'Timeline Correction', 'Permanently -10% ATK Speed.', 'debuff', { percent: { attackSpeed: -0.10 } }, 'Hubris has slowed your progress.', 'enemy'); }

        // Taylor Swift
        if (eventFlags.has('legend_swift_fans')) { addPermEffect('legend_swift_fans', 'For The Fans', 'Permanently +15% HP & +15% Fortune.', 'buff', { percent: { maxHealth: 0.15, luck: 0.15 } }, 'Your connection with your fans makes you stronger and luckier.', 'special'); }
        if (eventFlags.has('legend_swift_reputation')) { addPermEffect('legend_swift_reputation', 'Reputation', 'Permanently +25% ATK, -10% HP.', 'buff', { percent: { attackPower: 0.25, maxHealth: -0.10 } }, 'Maintaining your reputation requires sacrifice.', 'special'); }
        if (eventFlags.has('legend_swift_song')) { addPermEffect('legend_swift_song', 'Tortured Poet', 'Permanently +20% Crit Dmg & +20% Fortune.', 'buff', { percent: { critDamage: 0.20, luck: 0.20 } }, 'You turn your pain into art... and profit.', 'special'); }
        if (eventFlags.has('legend_swift_lwymmd')) { addPermEffect('legend_swift_lwymmd', 'Look What You Made Me Do', 'Permanently -10% ATK Speed.', 'debuff', { percent: { attackSpeed: -0.10 } }, 'The drama has slowed you down.', 'enemy'); }
        
        // Rihanna
        if (eventFlags.has('legend_rihanna_empire')) { addPermEffect('legend_rihanna_empire', 'Fenty Empire', 'Permanently +20% HP & +10% Dmg Reduction.', 'buff', { percent: { maxHealth: 0.20, damageReduction: 0.10 } }, 'Your empire protects you.', 'special'); }
        if (eventFlags.has('legend_rihanna_party')) { addPermEffect('legend_rihanna_party', 'Unapologetic', 'Permanently +50% Luck, -10% ATK.', 'buff', { percent: { luck: 0.50, attackPower: -0.10 } }, 'Work hard, play hard.', 'special'); }
        if (eventFlags.has('legend_rihanna_work')) { addPermEffect('legend_rihanna_work', 'Work, Work, Work', 'Permanently +20% ATK & +10% ATK Speed.', 'buff', { percent: { attackPower: 0.20, attackSpeed: 0.10 } }, 'The grind never stops.', 'special'); }
        if (eventFlags.has('legend_rihanna_money')) { addPermEffect('legend_rihanna_money', "BBHMM", 'Permanently -15% Crit Chance.', 'debuff', { percent: { critChance: -0.15 } }, 'Your focus on money has dulled your edge.', 'enemy'); }
        
        // Messi
        if (eventFlags.has('legend_messi_game')) { addPermEffect('legend_messi_game', 'For The Game', 'Permanently +15% ATK Speed & +15% Accuracy.', 'buff', { percent: { attackSpeed: 0.15, accuracy: 0.15 } }, 'Your purity of skill makes you a legend.', 'special'); }
        if (eventFlags.has('legend_messi_trophy')) { addPermEffect('legend_messi_trophy', 'Another One', 'Permanently +30% Luck & +10% Crit Dmg.', 'buff', { percent: { luck: 0.30, critDamage: 0.10 } }, 'The hunt for glory brings its own rewards.', 'special'); }
        if (eventFlags.has('legend_messi_legacy')) { addPermEffect('legend_messi_legacy', 'The Legacy', 'Permanently +10% to all core stats, but -10% HP.', 'buff', { percent: { attackPower: 0.10, maxHealth: 0.10, attackSpeed: 0.10, luck: 0.10 } }, 'You are a living legend, but the pressure takes a toll.', 'special'); }
        if (eventFlags.has('legend_messi_system')) { addPermEffect('legend_messi_system', 'The System', 'Permanently -10% Max Health.', 'debuff', { percent: { maxHealth: -0.10 } }, 'Becoming the system has made you a target.', 'enemy'); }
        
        // Oprah
        if (eventFlags.has('legend_oprah_inspire')) { addPermEffect('legend_oprah_inspire', 'Inspiration', 'Permanently +15% HP & +15% Luck.', 'buff', { percent: { maxHealth: 0.15, luck: 0.15 } }, 'You choose to lift others up, and are lifted in return.', 'special'); }
        if (eventFlags.has('legend_oprah_buffs')) { addPermEffect('legend_oprah_buffs', 'YOU GET A BUFF!', 'Permanently +15% to all core stats.', 'buff', { percent: { attackPower: 0.15, maxHealth: 0.15, attackSpeed: 0.15 } }, 'Your generosity empowers everyone, including yourself!', 'special'); }
        if (eventFlags.has('legend_oprah_empire')) { addPermEffect('legend_oprah_empire', 'Media Empire', 'Permanently +30% Luck, -10% ATK.', 'buff', { percent: { luck: 0.30, attackPower: -0.10 } }, 'Managing your empire leaves less time for training.', 'special'); }
        if (eventFlags.has('legend_oprah_own')) { addPermEffect('legend_oprah_own', 'OWN', 'Permanently -10% ATK.', 'debuff', { percent: { attackPower: -0.10 } }, 'Your absolute control has made you complacent.', 'enemy'); }

        // SRK
        if (eventFlags.has('legend_srk_love')) { addPermEffect('legend_srk_love', 'For Love', 'Permanently +20% HP & +10% Luck.', 'buff', { percent: { maxHealth: 0.20, luck: 0.10 } }, 'You are the King of Hearts, resilient and loved.', 'special'); }
        if (eventFlags.has('legend_srk_king')) { addPermEffect('legend_srk_king', 'King of the World', 'Permanently +25% ATK, -10% HP.', 'buff', { percent: { attackPower: 0.25, maxHealth: -0.10 } }, 'Heavy is the head that wears the crown.', 'special'); }
        if (eventFlags.has('legend_srk_sequel')) { addPermEffect('legend_srk_sequel', 'Blockbuster Sequel', 'Permanently +25% Luck & +15% Crit Dmg.', 'buff', { percent: { luck: 0.25, critDamage: 0.15 } }, 'The sequel is even more spectacular!', 'special'); }
        if (eventFlags.has('legend_srk_common')) { addPermEffect('legend_srk_common', 'Common Man', 'Permanently -5% to all core stats.', 'debuff', { percent: { attackPower: -0.05, maxHealth: -0.05, attackSpeed: -0.05 } }, 'Your humility was misinterpreted as weakness.', 'enemy'); }

        // MrBeast
        if (eventFlags.has('legend_mrbeast_subs')) { addPermEffect('legend_mrbeast_subs', 'Subscriber Goal', 'Permanently +25% Fortune.', 'buff', { percent: { luck: 0.25 } }, 'You do it all for them!', 'special'); }
        if (eventFlags.has('legend_mrbeast_challenge')) { addPermEffect('legend_mrbeast_challenge', 'INSANE CHALLENGE', 'Permanently +25% ATK, +15% SPD, -15% HP.', 'buff', { percent: { attackPower: 0.25, attackSpeed: 0.15, maxHealth: -0.15 } }, 'The content is extreme, and so are you!', 'special'); }
        if (eventFlags.has('legend_mrbeast_giveaway')) { addPermEffect('legend_mrbeast_giveaway', 'The Giveaway', 'Permanently +10% to all core stats.', 'buff', { percent: { attackPower: 0.10, maxHealth: 0.10, attackSpeed: 0.10 } }, 'Your generosity is rewarded by the algorithm.', 'special'); }
        if (eventFlags.has('legend_mrbeast_prank')) { addPermEffect('legend_mrbeast_prank', 'It\'s Just a Prank', 'Permanently -10% Max Health.', 'debuff', { percent: { maxHealth: -0.10 } }, 'The prank went too far.', 'enemy'); }
        
        // Ronaldo
        if (eventFlags.has('legend_ronaldo_craft')) { addPermEffect('legend_ronaldo_craft', 'The Craft', 'Permanently +10% ATK & +10% Accuracy.', 'buff', { percent: { attackPower: 0.10, accuracy: 0.10 } }, 'Your unmatched discipline rewards you.', 'special'); }
        if (eventFlags.has('legend_ronaldo_brand')) { addPermEffect('legend_ronaldo_brand', 'The Brand', 'Permanently +30% Luck, -10% ATK Speed.', 'buff', { percent: { luck: 0.30, attackSpeed: -0.10 } }, 'Your focus on image pays off, but your performance suffers.', 'special'); }
        if (eventFlags.has('legend_ronaldo_ego')) { addPermEffect('legend_ronaldo_ego', 'The Ego', 'Permanently +25% ATK, -10% HP.', 'buff', { percent: { attackPower: 0.25, maxHealth: -0.10 } }, 'Your ego is colossal, granting power at a cost.', 'special'); }
        if (eventFlags.has('legend_ronaldo_siu')) { addPermEffect('legend_ronaldo_siu', 'Siuuu!', 'Permanently -10% Dmg Reduction.', 'debuff', { percent: { damageReduction: -0.10 } }, 'Your iconic celebration makes you a predictable target.', 'enemy'); }
        
        // All other celebrities...
        if (eventFlags.has('legend_bachchan_angry')) { addPermEffect('legend_bachchan_angry', "Angry Young Man", 'Permanently +15% ATK, -5% HP.', 'buff', { percent: { attackPower: 0.15, maxHealth: -0.05 } }, 'Your righteous anger makes you a fearsome, if reckless, fighter.', 'special'); }
        if (eventFlags.has('legend_bachchan_star')) { addPermEffect('legend_bachchan_star', "Star of the Millennium", 'Permanently +10% to all core stats.', 'buff', { percent: { attackPower: 0.10, maxHealth: 0.10, attackSpeed: 0.10 } }, 'Your unmatched legacy grants you balanced, lasting power.', 'special'); }
        if (eventFlags.has('legend_bachchan_legacy')) { addPermEffect('legend_bachchan_legacy', "The Family Legacy", 'Permanently +15% HP & +10% Fortune.', 'buff', { percent: { maxHealth: 0.15, luck: 0.10 } }, 'Building a dynasty has made you resilient and wealthy.', 'special'); }
        if (eventFlags.has('legend_bachchan_eternal')) { addPermEffect('legend_bachchan_eternal', "Eternal Ego", 'Permanently -10% ATK Speed.', 'debuff', { percent: { attackSpeed: -0.10 } }, 'Your belief in your own immortality has made you complacent and slow.', 'enemy'); }
        if (eventFlags.has('legend_rekha_enigma')) { addPermEffect('legend_rekha_enigma', "The Enigma", 'Permanently +20% Fortune & +10% Crit Chance.', 'buff', { percent: { luck: 0.20, critChance: 0.10 } }, 'Your mysterious allure makes you both lucky and precise.', 'special'); }
        if (eventFlags.has('legend_rekha_icon')) { addPermEffect('legend_rekha_icon', "Timeless Icon", 'Permanently +15% HP & +5% Dmg Reduction.', 'buff', { percent: { maxHealth: 0.15, damageReduction: 0.05 } }, 'Your iconic status makes you incredibly resilient.', 'special'); }
        if (eventFlags.has('legend_rekha_versatile')) { addPermEffect('legend_rekha_versatile', "Versatile Actress", 'Permanently +10% to all core stats.', 'buff', { percent: { attackPower: 0.10, maxHealth: 0.10, attackSpeed: 0.10 } }, 'Your ability to adapt to any role grants you balanced power.', 'special'); }
        if (eventFlags.has('legend_rekha_alone')) { addPermEffect('legend_rekha_alone', "The Price of Fame", 'Permanently -10% Max Health.', 'debuff', { percent: { maxHealth: -0.10 } }, 'The isolation of stardom takes its toll, making you more fragile.', 'enemy'); }
        if (eventFlags.has('legend_tendulkar_love')) { addPermEffect('legend_tendulkar_love', "For the Love of the Game", 'Permanently +10% to all core stats.', 'buff', { percent: { attackPower: 0.10, maxHealth: 0.10, attackSpeed: 0.10 } }, 'Your pure passion grants you balanced, all-around excellence.', 'special'); }
        if (eventFlags.has('legend_tendulkar_hopes')) { addPermEffect('legend_tendulkar_hopes', "Hopes of a Billion", 'Permanently +15% HP & +10% ATK.', 'buff', { percent: { maxHealth: 0.15, attackPower: 0.10 } }, 'Carrying a nation on your shoulders has made you incredibly strong and resilient.', 'special'); }
        if (eventFlags.has('legend_tendulkar_technique')) { addPermEffect('legend_tendulkar_technique', "Flawless Technique", 'Permanently +15% Crit Chance & +15% Accuracy.', 'buff', { percent: { critChance: 0.15, accuracy: 0.15 } }, 'Your perfect form makes your strikes unerringly precise.', 'special'); }
        if (eventFlags.has('legend_tendulkar_pressure')) { addPermEffect('legend_tendulkar_pressure', "Weight of Expectation", 'Permanently -10% ATK Speed.', 'debuff', { percent: { attackSpeed: -0.10 } }, 'The immense pressure to succeed has made your movements more deliberate and slow.', 'enemy'); }
        if (eventFlags.has('legend_chopra_conquer')) { addPermEffect('legend_chopra_conquer', "Global Conquest", 'Permanently +15% ATK & +15% Fortune.', 'buff', { percent: { attackPower: 0.15, luck: 0.15 } }, 'Your ambition makes you both powerful and incredibly lucky.', 'special'); }
        if (eventFlags.has('legend_chopra_unstoppable')) { addPermEffect('legend_chopra_unstoppable', "Unstoppable Force", 'Permanently +20% ATK, -5% HP.', 'buff', { percent: { attackPower: 0.20, maxHealth: -0.05 } }, 'Your relentless drive makes you a powerhouse, but the hustle is draining.', 'special'); }
        if (eventFlags.has('legend_chopra_roots')) { addPermEffect('legend_chopra_roots', "Strong Roots", 'Permanently +15% HP & +5% Dmg Reduction.', 'buff', { percent: { maxHealth: 0.15, damageReduction: 0.05 } }, 'Remembering where you came from has made you tough and resilient.', 'special'); }
        if (eventFlags.has('legend_chopra_exhausted')) { addPermEffect('legend_chopra_exhausted', "Jet-Lagged", 'Permanently -10% ATK Speed.', 'debuff', { percent: { attackSpeed: -0.10 } }, 'The constant travel has taken a toll, making you sluggish.', 'enemy'); }
        if (eventFlags.has('legend_bhatt_work')) { addPermEffect('legend_bhatt_work', "The Craft", 'Permanently +15% Crit Chance & +15% Crit Damage.', 'buff', { percent: { critChance: 0.15, critDamage: 0.15 } }, 'Your dedication to your craft makes your attacks devastatingly precise.', 'special'); }
        if (eventFlags.has('legend_bhatt_student')) { addPermEffect('legend_bhatt_student', "Student of the Year", 'Permanently +10% to all core stats.', 'buff', { percent: { attackPower: 0.10, maxHealth: 0.10, attackSpeed: 0.10 } }, 'Your versatility and willingness to learn grant you balanced, all-around power.', 'special'); }
        if (eventFlags.has('legend_bhatt_dynasty')) { addPermEffect('legend_bhatt_dynasty', "New Dynasty", 'Permanently +20% Fortune.', 'buff', { percent: { luck: 0.20 } }, 'Your ambition to forge your own path brings you immense fortune.', 'special'); }
        if (eventFlags.has('legend_bhatt_criticism')) { addPermEffect('legend_bhatt_criticism', "Deafening Criticism", 'Permanently -10% Accuracy.', 'debuff', { percent: { accuracy: -0.10 } }, 'The constant noise has shaken your confidence, making your attacks less accurate.', 'enemy'); }

        const currentClass = ALL_CLASSES.find(c => c.id === playerInfo.playerClassId);
        let nextClassId = playerInfo.playerClassId;
        if (currentClass && currentClass.tier === 'base') {
            const advancedClass = ALL_CLASSES.find(c => c.baseClassId === currentClass.id);
            if (advancedClass && unlockedAdvancedClasses.has(advancedClass.id)) {
                nextClassId = advancedClass.id;
                addCombatLog(`Your mastery has unlocked a new path! You are now a ${advancedClass.name}!`, 'special');
            }
        }

        const newLineageCount = lineageCount + 1;
        setLineageCount(newLineageCount);

        const newAscensionCount = ascensionCount + 1;
        setAscensionCount(newAscensionCount);

        const newName = `${playerInfo.baseName} ${numberToRoman(newLineageCount + 1)}`;
        const newPlayerInfo = { ...playerInfo, name: newName, playerClassId: nextClassId };
        setPlayerInfo(newPlayerInfo);
        
        const newRealmOrder = generateRealmOrder();
        addCombatLog(`A new challenge begins! Ascension ${newAscensionCount}...`, 'info');
        const initialUpgrades = getInitialUpgradesForClass(nextClassId);
        resetRun(initialUpgrades, evolveBonus, false, startingStage, newRealmOrder, nextClassId, startingGold, startingItems, permanentEffects);
        setIsEnteringRealm(true);
    }, [
        lineageCount, ascensionCount, playerInfo, hasWonGame, evolveBonus, addCombatLog, 
        setLineageCount, setAscensionCount, setPlayerInfo, setHasWonGame, resetRun, eventFlags, handleChangeClass, setIsEnteringRealm, unlockedAdvancedClasses
    ]);

    const handleRestartGame = useCallback(() => {
        addCombatLog('Starting a new legend from scratch.', 'info');
        setPlayerInfo(null);
        setGameState('playing');
    }, [addCombatLog, setPlayerInfo, setGameState]);

    const handleBossDefeatEnd = useCallback(() => {
        const currentStats = calculatePlayerStats(upgrades, evolveBonus, equippedItems, totalUpgradeLevels, hasWonGame, activeEffects, playerInfo!.playerClassId);

        if (stage === WIN_REALM) {
            const celebrityEventMap: Record<string, string> = { "Dwayne Johnson": "legend_the_rock_01", "Elon Musk": "legend_elon_musk_01", "Taylor Swift": "legend_taylor_swift_01", "Rihanna": "legend_rihanna_01", "Lionel Messi": "legend_messi_01", "Oprah Winfrey": "legend_oprah_01", "Shah Rukh Khan": "legend_srk_01", "MrBeast": "legend_mrbeast_01", "Cristiano Ronaldo": "legend_ronaldo_01", "Beyoncé": "legend_beyonce_01", "Keanu Reeves": "legend_keanu_01", "Donald Trump": "legend_trump_01", "Vladimir Putin": "legend_putin_01", "Jackie Chan": "legend_chan_01", "Shakira": "legend_shakira_01", "Jane Goodall": "legend_jane_goodall_01", "Adele": "legend_adele_01", "Narendra Modi": "legend_modi_01", "Dalai Lama": "legend_dalai_lama_01", "Paul McCartney": "legend_mccartney_01", "David Attenborough": "legend_attenborough_01", "Anthony Hopkins": "legend_hopkins_01", "Morgan Freeman": "legend_freeman_01", "Queen Elizabeth": "legend_queen_elizabeth_01", "Maggie Smith": "legend_maggie_smith_01", "Angela Merkel": "legend_merkel_01", "Greta Thunberg": "legend_thunberg_01", "Kylian Mbappé": "legend_mbappe_01", "Zendaya": "legend_zendaya_01", "Jungkook": "legend_jungkook_01", "Xi Jinping": "legend_xi_jinping_01", "Joe Biden": "legend_biden_01", "Pope Francis": "legend_pope_francis_01", "Justin Trudeau": "legend_trudeau_01", "Tom Hanks": "legend_hanks_01", "Will Smith": "legend_will_smith_01", "Leonardo DiCaprio": "legend_dicaprio_01", "Amitabh Bachchan": "legend_bachchan_01", "Rekha": "legend_rekha_01", "Sachin Tendulkar": "legend_tendulkar_01", "Priyanka Chopra": "legend_chopra_01", "Alia Bhatt": "legend_bhatt_01" };
            const genericEvents = legendEvents.filter(e => e.id.startsWith('legend_generic_') || e.id.startsWith('legend_cosmic_') || e.id.startsWith('legend_weaver_') || e.id.startsWith('legend_archivist_') || e.id.startsWith('legend_gambler_') );
            const celebrityEventId = celebrityEventMap[playerInfo!.baseName];
            
            let eventToShow: GameEvent | undefined;

            if (celebrityEventId) {
                // Player's name matches a celebrity. Always trigger their specific event.
                eventToShow = legendEvents.find(e => e.id === celebrityEventId);
            } else {
                // Player's name is custom, so always show a generic event.
                eventToShow = genericEvents[Math.floor(Math.random() * genericEvents.length)];
            }

            if (eventToShow) {
                setActiveEvent(eventToShow);
                setGameState('event');
            } else {
                // Fallback in case something goes wrong, though it shouldn't.
                console.error("No valid post-game event could be found.");
                setGameState('gameOver');
            }
        } else {
            const newStage = stage + 1;
            const nextTheme = realmThemeOrder[(newStage - 1) % realmThemeOrder.length];
            setStage(newStage);
            setSubStage(1);
            setEventsThisRealm(0);
            const triggerPoints = new Set<number>();
            triggerPoints.add(Math.floor(Math.random() * 2) + 1);
            triggerPoints.add(Math.floor(Math.random() * 2) + 3);
            setEventTriggerSubstages(triggerPoints);
            const healAmount = Math.floor(currentStats.maxHealth * 0.25);
            if (healAmount > 0) {
                setPlayerHealth(h => Math.min(currentStats.maxHealth, h + healAmount));
                setIsPlayerHealing(true);
                setTimeout(() => setIsPlayerHealing(false), 500);
                addCombatLog(`Victory's respite heals you for ${healAmount.toLocaleString()} health!`, 'info');
            }
            setCurrentEnemy(generateEnemy(newStage, 1, nextTheme, ascensionCount));
            addCombatLog(`Venturing into ${nextTheme.name}...`, 'info');
            setIsEnteringRealm(true);
        }
    }, [stage, playerInfo, addCombatLog, ascensionCount, setGameState, setActiveEvent, setStage, setSubStage, setEventsThisRealm, setEventTriggerSubstages, setPlayerHealth, setIsPlayerHealing, setCurrentEnemy, setIsEnteringRealm, realmThemeOrder, upgrades, evolveBonus, equippedItems, totalUpgradeLevels, hasWonGame, activeEffects]);

    return {
        handleGameStart,
        handleEvolve,
        handleRetain,
        handleWinAndContinue,
        handleRestartGame,
        handleChangeClass,
        handleBossDefeatEnd,
    };
};