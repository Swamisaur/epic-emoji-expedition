/**
 * @file useGameState.ts
 * @description A master custom hook that centralizes the entire game state,
 * logic, and event handling for the application. It makes the main App component
 * a much cleaner view layer by composing other specialized hooks.
 */
import { useMemo, useCallback, useState, useEffect } from 'react';

// Core Types
import { FormattedPlayerStats, RealmTheme, EventOption, PlayerClassId, EquippedItems } from '../types';

// Utility Functions
import { formatPlayerStats } from '../utils/formatters';
import { isIOS } from '../utils/device';
import { getInitialUpgradesForClass } from '../constants';

// Constants
import { REALM_THEMES, ALL_EVENTS } from '../constants';
import { legendEvents } from '../data/events/legends';

// Custom Hooks
import { useGameLoop } from './useGameLoop';
import { useGameEvents } from './useGameEvents';
import { useUnlockManager } from './useUnlockManager';
import { useAudio } from './useAudio';
import { useRunLifecycle } from './useRunLifecycle';
import { usePlayerCoreState } from './usePlayerCoreState';
import { useUIState, BossDefeatInfo } from './useUIState';
import { useAbilityState } from './useAbilityState';
import { useRunState } from './useRunState';
import { useUpgradeActions } from './actions/useUpgradeActions';
import { useEquipmentActions } from './actions/useEquipmentActions';
import { useCombatActions } from './actions/useCombatActions';
import { useEventActions } from './actions/useEventActions';
import { useEnemyState } from './useEnemyState';
import { useFullscreen } from './ui/useFullscreen';

export const useGameState = () => {
    // --- STATE MANAGEMENT HOOKS ---
    const {
        playerInfo, setPlayerInfo, isLoading, hasWonGame, setHasWonGame,
        lineageCount, setLineageCount, ascensionCount, setAscensionCount,
        unlockedAdvancedClasses, setUnlockedAdvancedClasses,
        newlyUnlockedClass, setNewlyUnlockedClass,
        upgrades, setUpgrades, evolveBonus, setEvolveBonus,
        playerStats, setPlayerStats, playerHealth, setPlayerHealth,
        playerTransformAnimation, isPlayerHealing, setIsPlayerHealing, inventory,
        setInventory, equippedItems, setEquippedItems, totalUpgradeLevels,
        activeEffects: eventEffects, setActiveEffects: setEventEffects, eventFlags, setEventFlags,
    } = usePlayerCoreState();

    const {
        gameState, setGameState, coins, setCoins, stage, setStage, subStage, setSubStage,
        defeatedEnemies, setDefeatedEnemies, coinsSpentThisRun, setCoinsSpentThisRun,
        totalGoldEarnedThisRun, setTotalGoldEarnedThisRun, realmThemeOrder, setRealmThemeOrder,
        activeEvent, setActiveEvent, eventsThisRealm, setEventsThisRealm, triggeredEventIds, setTriggeredEventIds,
        eventTriggerSubstages, setEventTriggerSubstages, isEnteringRealm, setIsEnteringRealm,
        isEventExiting, setIsEventExiting,
        transformationHistory, setTransformationHistory,
    } = useRunState();

    const {
        currentEnemy, setCurrentEnemy, isEnemyDying, setIsEnemyDying, processedEnemyIds,
        isEnemySpawning, setIsEnemySpawning,
    } = useEnemyState({ isLoading, ascensionCount, stage, realmThemeOrder });

    const {
        combatLog, setCombatLog, floatingTexts, setFloatingTexts, hitAnimation, setHitAnimation,
        attackAnimation, setAttackAnimation,
        activeUpgradeTab, setActiveUpgradeTab, showAttackHint, setShowAttackHint,
        lastManualAttackTime, hintTimerIntervals, hintTimerIndex,
        isEnemyCharging, setIsEnemyCharging, isEnemyChargingSpecial, setIsEnemyChargingSpecial,
        playerBuffAnimation, setPlayerBuffAnimation,
        isPlayerDying, setIsPlayerDying,
        addCombatLog, addFloatingText,
        isComboActive, setIsComboActive,
        playerAttackCooldown, playerAttackCounter, enemyAttackCooldown, enemyChargeTimer,
        bossDefeatInfo, setBossDefeatInfo,
        screenShake, setScreenShake,
        screenTint, setScreenTint,
        playerEmojiRef, enemyEmojiRef,
    } = useUIState(gameState, isEnemySpawning);

    const {
        abilityCooldowns, setAbilityCooldowns, abilityUses, setAbilityUses, 
        skillEffects, setSkillEffects,
        activeSkillEffects, setActiveSkillEffects, effectTimers,
    } = useAbilityState();
    
    // --- AUDIO, INTERACTION & FULLSCREEN ---
    const [volume, setVolume] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);
    const { isFullscreen, toggleFullscreen } = useFullscreen();
    
    // The CSS class method for fullscreen is an iOS-specific fallback.
    const applyCssFullscreen = isFullscreen && isIOS();

    const handleUserInteraction = useCallback(() => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    }, [hasInteracted]);
    
    const handleVolumeChange = useCallback((newVolume: number) => {
        handleUserInteraction();
        setVolume(newVolume);
    }, [handleUserInteraction]);

    const handleToggleFullscreen = useCallback(() => {
        handleUserInteraction();
        toggleFullscreen();
    }, [handleUserInteraction, toggleFullscreen]);

    const handleTogglePause = () => {
        if (gameState === 'playing') {
            setGameState('paused');
        } else if (gameState === 'paused') {
            setGameState('playing');
        }
    };


    // --- MEMOIZED & DERIVED STATE ---
    const formattedPlayerStats: FormattedPlayerStats = useMemo(() => formatPlayerStats(playerStats), [playerStats]);
    const realmTheme: RealmTheme | undefined = useMemo(() => realmThemeOrder[(stage - 1) % realmThemeOrder.length] || REALM_THEMES[0], [realmThemeOrder, stage]);
    
    /** The number of different Core upgrades the player has purchased at least one level of. */
    const coreUpgradeVariety = useMemo(() => {
        if (!playerInfo) return 0;
        const initialUpgrades = getInitialUpgradesForClass(playerInfo.playerClassId);
        return upgrades.filter(u => u.category === 'core' && u.level > (initialUpgrades.find(iu => iu.id === u.id)?.level ?? 1)).length;
    }, [upgrades, playerInfo]);


    // --- LOGIC HOOKS ---
    const { newUnlockCounts, onTabActivated, resetUnlockManager } = useUnlockManager({ 
        coins, 
        upgrades, 
        stage, 
        inventory,
        playerClassId: playerInfo?.playerClassId ?? 'ninja',
        totalUpgradeLevels,
        coreUpgradeVariety,
        abilityUses,
    });

    const { 
        handleGameStart, handleEvolve, handleRetain, handleWinAndContinue, handleRestartGame, handleChangeClass, handleBossDefeatEnd
    } = useRunLifecycle({
        playerInfo,
        upgrades, evolveBonus, equippedItems, totalUpgradeLevels, hasWonGame, 
        lineageCount, ascensionCount, eventFlags, stage,
        coins,
        activeEffects: eventEffects,
        realmThemeOrder,
        unlockedAdvancedClasses,
        setPlayerInfo,
        setStage, setSubStage, setCoins, setCoinsSpentThisRun, setUpgrades, setEvolveBonus,
        setDefeatedEnemies, setPlayerStats, setPlayerHealth, setCombatLog, setFloatingTexts,
        setCurrentEnemy, setInventory, setEquippedItems, setShowAttackHint, setGameState,
        setHasWonGame, setLineageCount, setAscensionCount, setTotalGoldEarnedThisRun,
        setRealmThemeOrder,
        setIsEnteringRealm,
        setIsPlayerHealing,
        setTransformationHistory,
        setNewlyUnlockedClass,
        // Event Setters
        setActiveEffects: setEventEffects, setEventFlags, setActiveEvent, setEventsThisRealm, setTriggeredEventIds,
        setEventTriggerSubstages,
        // Ability Setters
        setAbilityCooldowns,
        setAbilityUses,
        setAbilityActiveEffects: setSkillEffects,
        effectTimers,
        // Refs
        processedEnemyIds, lastManualAttackTime, hintTimerIndex,
        playerAttackCooldown, playerAttackCounter, enemyAttackCooldown, enemyChargeTimer,
        addCombatLog, handleUserInteraction,
        resetUnlockManager,
    });

    useAudio({ gameState, playerInfo, volume, hasInteracted });
    
    useGameLoop({ 
        gameState, currentEnemy, playerInfo, playerHealth, playerStats, equippedItems, activeEffects: skillEffects, totalUpgradeLevels, upgrades, setPlayerHealth, 
        setCurrentEnemy, setActiveEffects: setSkillEffects, setCoins, setTotalGoldEarnedThisRun, addCombatLog, addFloatingText, setHitAnimation, setAttackAnimation, setAbilityCooldowns,
        setIsEnemyCharging, setIsEnemyChargingSpecial, setPlayerBuffAnimation, isEnteringRealm, isEnemySpawning,
        playerAttackCooldown, playerAttackCounter, enemyAttackCooldown, enemyChargeTimer,
        playerEmojiRef, enemyEmojiRef,
    });
    
    useGameEvents({ 
        gameState, setGameState, currentEnemy, setCurrentEnemy, playerHealth, setPlayerHealth, playerStats, upgrades,
        stage, subStage, setSubStage, setCoins, addCombatLog, addFloatingText, 
        setDefeatedEnemies, setInventory, setEquippedItems,
        processedEnemyIds, hasWonGame, ascensionCount, setIsEnemyDying, setIsPlayerDying, setTotalGoldEarnedThisRun,
        realmThemeOrder, playerInfo, equippedItems, setBossDefeatInfo,
        unlockedAdvancedClasses, setUnlockedAdvancedClasses, setNewlyUnlockedClass,
        skillEffects, setSkillEffects,
        // Event props
        setActiveEvent, eventsThisRealm, setEventsThisRealm, eventFlags, triggeredEventIds, setTriggeredEventIds,
        eventTriggerSubstages,
    });
    
    const { handleBuyUpgrade, handleMaxBuyUpgrade } = useUpgradeActions({
        coins, upgrades,
        setCoins, setCoinsSpentThisRun, setUpgrades,
        addCombatLog, addFloatingText,
    });

    const { handleEquipItem, handleUnequipItem } = useEquipmentActions({
        setEquippedItems,
    });

    const { handlePlayerManualAttack, handleUseSpecialAbility } = useCombatActions({
        coins, stage, abilityCooldowns, gameState, currentEnemy, playerStats, equippedItems, showAttackHint, playerHealth, playerInfo, totalUpgradeLevels,
        activeEffects: skillEffects,
        abilityUses,
        isEnemySpawning,
        setCoins, setCoinsSpentThisRun, setTotalGoldEarnedThisRun, setAbilityCooldowns, setCurrentEnemy, setHitAnimation, setAttackAnimation,
        setShowAttackHint, setPlayerHealth, setIsPlayerHealing, setActiveEffects: setSkillEffects, setActiveSkillEffects, setPlayerBuffAnimation,
        setIsComboActive,
        setAbilityUses,
        setScreenShake,
        setScreenTint,
        addCombatLog, 
        addFloatingText,
        lastManualAttackTime, 
        hintTimerIndex, 
        hintTimerIntervals, 
        effectTimers,
        playerEmojiRef,
        enemyEmojiRef,
    });
    
    const { handleEventChoice, handleEventEnd } = useEventActions({
        playerInfo,
        coins,
        setCoins,
        setTotalGoldEarnedThisRun,
        setCoinsSpentThisRun,
        setInventory,
        setEquippedItems,
        setActiveEffects: setEventEffects,
        setEventFlags,
        stage,
        subStage,
        setSubStage,
        realmThemeOrder,
        ascensionCount,
        setCurrentEnemy,
        setActiveEvent,
        setGameState,
        setIsEventExiting,
        addCombatLog,
        addFloatingText,
        playerHealth,
        playerStats,
        setPlayerHealth,
        setIsPlayerHealing,
        activeEvent,
        equippedItems,
        handleWinAndContinue, // Pass down the lifecycle handler
    });
    
    // EFFECT TO RESUME GAME AFTER REALM TRANSITION
    useEffect(() => {
        // When the "Entering Realm" screen finishes, it sets isEnteringRealm to false.
        // If the game was paused for the victory sequence, this effect will resume it.
        // This ensures the game loop doesn't start until all transitions are complete.
        if (!isEnteringRealm && gameState === 'victoryPaused') {
            setGameState('playing');
        }
    }, [isEnteringRealm, gameState, setGameState]);
    
    const onBossDefeatCinematicEnd = useCallback(() => {
        setBossDefeatInfo(null);
        handleBossDefeatEnd();
    }, [setBossDefeatInfo, handleBossDefeatEnd]);

    // EFFECT TO TRACK TRANSFORMATION HISTORY
    useEffect(() => {
        if (!playerInfo) return;
        
        const currentEmoji = playerInfo.displayEmoji;
        const baseEmoji = playerInfo.baseEmoji + playerInfo.skinTone;

        // Only add non-base emojis to the history
        if (currentEmoji !== baseEmoji) {
            setTransformationHistory(prevHistory => {
                // Add only if it's a new transformation not already at the end of the list
                if (prevHistory.length === 0 || prevHistory[prevHistory.length - 1] !== currentEmoji) {
                    return [...prevHistory, currentEmoji];
                }
                return prevHistory;
            });
        }
    }, [playerInfo?.displayEmoji, playerInfo?.baseEmoji, playerInfo?.skinTone, setTransformationHistory]);

    return {
        // From usePlayerCoreState
        playerInfo, isLoading, hasWonGame, lineageCount, ascensionCount, unlockedAdvancedClasses, upgrades, playerStats, playerHealth,
        playerTransformAnimation, isPlayerHealing, inventory, equippedItems, totalUpgradeLevels,
        coreUpgradeVariety, // Add new state
        newlyUnlockedClass,
        
        // From useRunState
        gameState, coins, stage, subStage, defeatedEnemies, coinsSpentThisRun, totalGoldEarnedThisRun, realmThemeOrder,
        activeEvent, // Expose activeEvent for the UI
        isEnteringRealm, setIsEnteringRealm,
        isEventExiting,
        transformationHistory,
        
        // From useUIState
        combatLog, floatingTexts, setFloatingTexts, hitAnimation, activeUpgradeTab, setActiveUpgradeTab,
        attackAnimation,
        showAttackHint, isEnemyCharging, isEnemyChargingSpecial, playerBuffAnimation,
        isPlayerDying,
        isComboActive, bossDefeatInfo,
        screenShake, screenTint,
        playerEmojiRef,
        enemyEmojiRef,
        
        // From useAbilityState & PlayerCoreState (Events)
        abilityUses,
        abilityCooldowns,
        skillEffects,
        activeSkillEffects,
        eventEffects,
        
        // From useEnemyState
        currentEnemy, isEnemyDying,
        isEnemySpawning,
        setIsEnemySpawning,
        
        // Local state & callbacks
        volume,
        setVolume: handleVolumeChange,
        isFullscreen, 
        handleToggleFullscreen, 
        handleUserInteraction, 
        handleTogglePause, 
        handleRestartGame, 
        handleChangeClass,
        applyCssFullscreen,
        
        // Memoized values
        formattedPlayerStats, realmTheme,
        
        // From logic hooks
        newUnlockCounts, onTabActivated, handleBuyUpgrade, handleMaxBuyUpgrade, handleEquipItem, handleUnequipItem,
        handlePlayerManualAttack, handleUseSpecialAbility, handleGameStart, handleEvolve,
        handleRetain, handleEventChoice, handleEventEnd,
        onBossDefeatCinematicEnd,
    };
};
