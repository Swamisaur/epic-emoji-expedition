/**
 * @file useGameEvents.ts
 * @description A custom hook to manage game state transitions based on events like
 * an enemy being defeated or the player running out of health.
 */

import { useEffect, useCallback } from 'react';
import { GameState, Enemy, PlayerStats, CombatLogMessage, Item, RealmTheme, FloatingText, GameEvent, PlayerInfo, EquippedItems, PlayerClassId, Upgrade, UpgradeId, SkillEffects } from '../types';
import { ENEMIES_PER_STAGE, PROCESSED_EVENTS, ALL_CLASSES, ANIMATION_DURATIONS } from '../constants';
import { generateEnemy } from '../utils/enemyLogic';
import { handleEnemyDefeatLoot } from '../utils/lootLogic';
import { BossDefeatInfo } from './useUIState';

// Props for the useGameEvents hook
interface UseGameEventsProps {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    currentEnemy: Enemy | null;
    setCurrentEnemy: React.Dispatch<React.SetStateAction<Enemy | null>>;
    playerHealth: number;
    setPlayerHealth: React.Dispatch<React.SetStateAction<number>>;
    playerStats: PlayerStats;
    upgrades: Upgrade[];
    stage: number;
    subStage: number;
    setSubStage: React.Dispatch<React.SetStateAction<number>>;
    setCoins: React.Dispatch<React.SetStateAction<number>>;
    addCombatLog: (message: string, type: CombatLogMessage['type']) => void;
    addFloatingText: (text: string, isCrit: boolean, x: number, y: number, type: FloatingText['type'], dx?: number, dy?: number) => void;
    setDefeatedEnemies: React.Dispatch<React.SetStateAction<Enemy[]>>;
    setInventory: React.Dispatch<React.SetStateAction<Item[]>>;
    processedEnemyIds: React.MutableRefObject<Set<string>>;
    hasWonGame: boolean;
    ascensionCount: number;
    setIsEnemyDying: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPlayerDying: React.Dispatch<React.SetStateAction<boolean>>;
    setTotalGoldEarnedThisRun: React.Dispatch<React.SetStateAction<number>>;
    realmThemeOrder: RealmTheme[];
    // Event System Props
    setActiveEvent: React.Dispatch<React.SetStateAction<GameEvent | null>>;
    eventsThisRealm: number;
    setEventsThisRealm: React.Dispatch<React.SetStateAction<number>>;
    eventFlags: Set<string>;
    triggeredEventIds: Set<string>;
    setTriggeredEventIds: React.Dispatch<React.SetStateAction<Set<string>>>;
    eventTriggerSubstages: Set<number>;
    playerInfo: PlayerInfo | null; // Needed for celebrity event trigger
    equippedItems: EquippedItems;
    setEquippedItems: React.Dispatch<React.SetStateAction<EquippedItems>>;
    setBossDefeatInfo: React.Dispatch<React.SetStateAction<BossDefeatInfo | null>>;
    // New Unlock Props
    unlockedAdvancedClasses: Set<PlayerClassId>;
    setUnlockedAdvancedClasses: React.Dispatch<React.SetStateAction<Set<PlayerClassId>>>;
    setNewlyUnlockedClass: React.Dispatch<React.SetStateAction<PlayerClassId | null>>;
    // Skill effects for post-combat logic
    skillEffects: SkillEffects;
    setSkillEffects: React.Dispatch<React.SetStateAction<SkillEffects>>;
}

export const useGameEvents = (props: UseGameEventsProps) => {
    const {
        gameState, setGameState, currentEnemy, setCurrentEnemy, playerHealth, setPlayerHealth, playerStats, upgrades,
        stage, subStage, setSubStage, setCoins, addCombatLog, addFloatingText,
        setDefeatedEnemies, setInventory,
        processedEnemyIds, hasWonGame, ascensionCount, setIsEnemyDying, setIsPlayerDying, setTotalGoldEarnedThisRun,
        realmThemeOrder,
        // Event System Props
        setActiveEvent, eventsThisRealm, setEventsThisRealm, eventFlags, triggeredEventIds, setTriggeredEventIds, eventTriggerSubstages,
        playerInfo, equippedItems, setEquippedItems, setBossDefeatInfo,
        // Unlock props
        unlockedAdvancedClasses, setUnlockedAdvancedClasses, setNewlyUnlockedClass,
        // Skill effects
        skillEffects, setSkillEffects
    } = props;

    /**
     * Handles post-combat healing and shielding effects from player upgrades.
     */
    const handlePostCombatHealing = useCallback(() => {
        const snackHeal = upgrades.find(u => u.id === UpgradeId.SnackHeal);
        if (snackHeal && snackHeal.level > 1) {
            const healAmount = (snackHeal.level - 1) * 20;
            setPlayerHealth(h => Math.min(playerStats.maxHealth, h + healAmount));
            addFloatingText(`+${healAmount}`, false, 25, 30, 'heal');
        }

        const autoMed = upgrades.find(u => u.id === UpgradeId.AutoMed);
        if (autoMed && autoMed.level > 1) {
            const healAmount = playerStats.maxHealth * 0.03 * (autoMed.level - 1);
            setPlayerHealth(h => Math.min(playerStats.maxHealth, h + healAmount));
            addFloatingText(`+${Math.floor(healAmount)}`, false, 25, 30, 'heal');
        }

        const greaseShield = upgrades.find(u => u.id === UpgradeId.GreaseShield);
        if (greaseShield && greaseShield.level > 1) {
            const shieldAmount = (greaseShield.level - 1) * 30;
            setSkillEffects(p => ({ ...p, damageShield: (p.damageShield || 0) + shieldAmount }));
            addFloatingText(`+${shieldAmount}🛡️`, false, 28, 35, 'shield');
        }

        const deflectorNet = upgrades.find(u => u.id === UpgradeId.DeflectorNet);
        if (deflectorNet && deflectorNet.level > 1) {
            const shieldAmount = (deflectorNet.level - 1) * 50;
            setSkillEffects(p => ({ ...p, damageShield: (p.damageShield || 0) + shieldAmount }));
            addFloatingText(`+${shieldAmount}🛡️`, false, 22, 35, 'shield');
        }
    }, [upgrades, playerStats.maxHealth, setPlayerHealth, addFloatingText, setSkillEffects]);

    /**
     * Determines the next step after an enemy is defeated, handling event triggers,
     * substage progression, and boss defeat cinematics.
     */
    const handleProgressionAndEvents = useCallback((defeatedEnemy: Enemy) => {
        const realmTheme = realmThemeOrder[(stage - 1) % realmThemeOrder.length];
        const isBossDefeated = defeatedEnemy.isBoss;
        
        let eventToTrigger: GameEvent | null = null;

        // Event Trigger Logic (only for non-bosses)
        if (!isBossDefeated && eventTriggerSubstages.has(subStage)) {
            const availableFlaggedEvents = PROCESSED_EVENTS.flagged.filter(event =>
                event.requiredFlag && eventFlags.has(event.requiredFlag) && !triggeredEventIds.has(event.id)
            );
            const realmEvents = (realmTheme && PROCESSED_EVENTS.realmSpecific.get(realmTheme.name)) || [];
            const availableRealmEvents = realmEvents.filter(event => !triggeredEventIds.has(event.id));
            const availableCommonEvents = PROCESSED_EVENTS.common.filter(event => !triggeredEventIds.has(event.id));

            if (availableFlaggedEvents.length > 0 && Math.random() < 0.30) {
                eventToTrigger = availableFlaggedEvents[Math.floor(Math.random() * availableFlaggedEvents.length)];
            } else {
                let eventPool: GameEvent[] = (availableRealmEvents.length > 0 && Math.random() < 0.75)
                    ? availableRealmEvents
                    : availableCommonEvents;
                if (eventPool.length === 0) {
                    eventPool = availableRealmEvents.length > 0 ? availableRealmEvents : availableCommonEvents;
                }
                if (eventPool.length > 0) {
                    eventToTrigger = eventPool[Math.floor(Math.random() * eventPool.length)];
                } else if (availableFlaggedEvents.length > 0) {
                    eventToTrigger = availableFlaggedEvents[Math.floor(Math.random() * availableFlaggedEvents.length)];
                }
            }
        }

        // Progression Logic
        setTimeout(() => {
            setIsEnemyDying(false);
            
            if (isBossDefeated) {
                const weaponEmoji = equippedItems.mainHand?.emoji || (playerInfo!.skinTone ? `👊${playerInfo!.skinTone}` : '👊');
                const healAmount = Math.floor(playerStats.maxHealth * 0.25);

                let newUnlockName: string | undefined = undefined;
                if (stage === 1) {
                    const playerClass = ALL_CLASSES.find(c => c.id === playerInfo!.playerClassId);
                    if (playerClass && playerClass.tier === 'base') {
                        const advancedClass = ALL_CLASSES.find(c => c.baseClassId === playerClass.id);
                        if (advancedClass && !unlockedAdvancedClasses.has(advancedClass.id)) {
                            setUnlockedAdvancedClasses(prev => new Set(prev).add(advancedClass.id));
                            setNewlyUnlockedClass(advancedClass.id);
                            newUnlockName = advancedClass.name;
                        }
                    }
                }

                setBossDefeatInfo({
                    playerEmoji: playerInfo!.displayEmoji,
                    weaponEmoji: weaponEmoji,
                    defeatedBossEmoji: defeatedEnemy.emoji,
                    enemyName: defeatedEnemy.name,
                    playerName: playerInfo!.name,
                    healAmount: healAmount,
                    unlockedClassName: newUnlockName,
                    realmName: realmTheme.name,
                    bossTitle: realmTheme.boss.epithet,
                });
            } else {
                const newSubStage = subStage + 1;
                setSubStage(newSubStage);
                if (eventToTrigger) {
                    setActiveEvent(eventToTrigger);
                    setEventsThisRealm(e => e + 1);
                    setTriggeredEventIds(prev => new Set(prev).add(eventToTrigger!.id));
                    setGameState('event');
                } else {
                    setCurrentEnemy(generateEnemy(stage, newSubStage, realmTheme, ascensionCount));
                    setGameState('playing');
                }
            }
        }, ANIMATION_DURATIONS.ENEMY_DEATH);
    }, [
        stage, subStage, realmThemeOrder, eventTriggerSubstages, eventFlags, triggeredEventIds,
        playerInfo, playerStats.maxHealth, equippedItems, unlockedAdvancedClasses,
        ascensionCount, setIsEnemyDying, setBossDefeatInfo, setSubStage, setActiveEvent,
        setEventsThisRealm, setTriggeredEventIds, setGameState, setCurrentEnemy,
        setUnlockedAdvancedClasses, setNewlyUnlockedClass,
    ]);

    // Effect to handle enemy defeat (victory)
    useEffect(() => {
        if (!currentEnemy || currentEnemy.currentHealth > 0 || gameState !== 'playing' || processedEnemyIds.current.has(currentEnemy.id) || !playerInfo) {
            return;
        }
        
        processedEnemyIds.current.add(currentEnemy.id);
        const defeatedEnemy = currentEnemy; // Capture enemy instance for use in callbacks
        
        setGameState('victoryPaused');
        setDefeatedEnemies(prev => [...prev, defeatedEnemy]);
        setIsEnemyDying(true);

        addCombatLog(`${defeatedEnemy.name} vanquished!`, 'reward');
        
        handleEnemyDefeatLoot({
            enemy: defeatedEnemy, playerStats, skillEffects, setCoins, setTotalGoldEarnedThisRun,
            setInventory, addCombatLog, addFloatingText, equippedItems, setEquippedItems,
        });

        handlePostCombatHealing();
        
        handleProgressionAndEvents(defeatedEnemy);

    }, [
        currentEnemy, gameState, playerInfo, playerStats, skillEffects, setCoins, setTotalGoldEarnedThisRun,
        setInventory, addCombatLog, addFloatingText, equippedItems, setEquippedItems, setGameState,
        setDefeatedEnemies, setIsEnemyDying, processedEnemyIds, handlePostCombatHealing, handleProgressionAndEvents
    ]);

    // Effect to handle player defeat (game over)
    useEffect(() => {
        if (playerHealth <= 0 && gameState === 'playing') {
            setIsPlayerDying(true);
            addCombatLog(`The hero has fallen...`, 'enemy');
            
            const timer = setTimeout(() => {
                setGameState('gameOver');
                setIsPlayerDying(false); 
            }, ANIMATION_DURATIONS.PLAYER_DEATH); // Duration of the death animation

            return () => clearTimeout(timer);
        }
    }, [playerHealth, gameState, addCombatLog, setGameState, setIsPlayerDying]);
};