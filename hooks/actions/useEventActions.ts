/**
 * @file useEventActions.ts
 * @description A hook for handling the consequences of a player's choice during a narrative event.
 */
import { useCallback, useRef } from 'react';
import { 
    EventOption, EventConsequenceType, ActiveEffect, Item, EquippedItems, GameState, 
    Enemy, RealmTheme, CombatLogMessage, FloatingText, GameEvent, PlayerStats, PlayerInfo
} from '../../types';
import { ALL_ITEMS, ENEMIES_PER_STAGE, ANIMATION_DURATIONS } from '../../constants';
import { generateEnemy } from '../../utils/enemyLogic';
import { getPlayerGender } from '../../utils/playerVisuals';

interface UseEventActionsProps {
    playerInfo: PlayerInfo | null;
    // Setters for direct state modification
    coins: number;
    setCoins: React.Dispatch<React.SetStateAction<number>>;
    setTotalGoldEarnedThisRun: React.Dispatch<React.SetStateAction<number>>;
    setCoinsSpentThisRun: React.Dispatch<React.SetStateAction<number>>;
    setInventory: React.Dispatch<React.SetStateAction<Item[]>>;
    setEquippedItems: React.Dispatch<React.SetStateAction<EquippedItems>>;
    setActiveEffects: React.Dispatch<React.SetStateAction<ActiveEffect[]>>;
    setEventFlags: React.Dispatch<React.SetStateAction<Set<string>>>;
    setSubStage: React.Dispatch<React.SetStateAction<number>>;
    setCurrentEnemy: React.Dispatch<React.SetStateAction<Enemy | null>>;
    setActiveEvent: React.Dispatch<React.SetStateAction<GameEvent | null>>;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    setIsEventExiting: React.Dispatch<React.SetStateAction<boolean>>;
    
    // State values needed for calculations
    stage: number;
    subStage: number;
    realmThemeOrder: RealmTheme[];
    ascensionCount: number;
    equippedItems: EquippedItems;

    // Callbacks for UI feedback
    addCombatLog: (message: string, type: CombatLogMessage['type']) => void;
    addFloatingText: (text: string, isCrit: boolean, x: number, y: number, type: FloatingText['type'], dx?: number, dy?: number) => void;
    
    // New props for healing
    playerHealth: number;
    playerStats: PlayerStats;
    setPlayerHealth: React.Dispatch<React.SetStateAction<number>>;
    setIsPlayerHealing: React.Dispatch<React.SetStateAction<boolean>>;
    
    // New prop for post-game events
    activeEvent: GameEvent | null;
    handleWinAndContinue: () => void;
}

export const useEventActions = (props: UseEventActionsProps) => {
    const {
        playerInfo, coins, setCoins, setTotalGoldEarnedThisRun, setCoinsSpentThisRun, setInventory, setEquippedItems,
        setActiveEffects, setEventFlags,
        stage, subStage, setSubStage, realmThemeOrder, ascensionCount, setCurrentEnemy,
        setActiveEvent, setGameState, setIsEventExiting,
        addCombatLog, addFloatingText,
        playerHealth, playerStats, setPlayerHealth, setIsPlayerHealing,
        equippedItems,
        handleWinAndContinue
    } = props;

    // Use a ref to track the active event, avoiding stale closures in the setTimeout.
    const activeEventRef = useRef<GameEvent | null>(props.activeEvent);
    activeEventRef.current = props.activeEvent;

    const handleEventChoice = useCallback((option: EventOption) => {
        const { consequence, cost, genderedConsequence } = option;

        if (!playerInfo) return; // Guard against no player info
        
        if (cost && coins < cost) {
            addCombatLog("You can't afford that.", 'info');
            return; // Safeguard in case the button wasn't disabled
        }

        if (cost) {
            setCoins(prev => prev - cost);
            setCoinsSpentThisRun(prev => prev + cost);
        }
        
        let finalConsequence = consequence;
        
        if (genderedConsequence) {
            const playerGender = getPlayerGender(playerInfo.baseEmoji);
            if (playerGender === 'male' && genderedConsequence.male) {
                finalConsequence = genderedConsequence.male;
            } else if (playerGender === 'female' && genderedConsequence.female) {
                finalConsequence = genderedConsequence.female;
            } else if (genderedConsequence.neutral) {
                finalConsequence = genderedConsequence.neutral;
            }
        }

        if (!finalConsequence) {
            console.error("handleEventChoice received an option with no consequence.", option);
            setActiveEvent(null);
            setGameState('playing');
            return;
        }

        addCombatLog(finalConsequence.resultText, 'info');

        switch (finalConsequence.type) {
            case EventConsequenceType.RESOURCE: {
                let amount = finalConsequence.payload.amount;
                // Special case for percentage-based tax (sentinel value of -1)
                if (amount === -1) {
                    const taxAmount = Math.floor(coins * 0.15);
                    amount = -taxAmount;
                }

                setCoins(prev => Math.max(0, prev + amount));
                if (amount > 0) {
                    setTotalGoldEarnedThisRun(prev => prev + amount);
                }
                break;
            }

            case EventConsequenceType.ITEM_REWARD: {
                const itemTemplate = ALL_ITEMS.find(item => item.id === finalConsequence!.payload.itemId);
                if (itemTemplate) {
                    const newItem: Item = {
                        ...itemTemplate,
                        instanceId: `${Date.now()}-${Math.random()}`,
                        rarity: finalConsequence.payload.rarity,
                    };
                    setInventory(prev => [...prev, newItem]);
                    addFloatingText(newItem.emoji, false, 50, 40, 'item');

                    // Auto-equip if slot is empty
                    if (!equippedItems[newItem.slot]) {
                        setEquippedItems(prev => ({ ...prev, [newItem.slot]: newItem }));
                        addCombatLog(`Auto-equipped ${newItem.emoji} ${newItem.name}!`, 'special');
                    }
                }
                break;
            }

            case EventConsequenceType.STAT_MODIFIER:
                finalConsequence.payload.effects.forEach(effectTemplate => {
                    const newEffect: ActiveEffect = {
                        ...effectTemplate,
                        id: `${Date.now()}-${Math.random()}`,
                        duration_ms: finalConsequence!.payload.duration_ms,
                    };
                    setActiveEffects(prev => [...prev, newEffect]);
                    
                    if (newEffect.duration_ms !== Infinity) {
                        setTimeout(() => {
                            setActiveEffects(prev => prev.filter(e => e.id !== newEffect.id));
                        }, newEffect.duration_ms);
                    }
                });
                break;
            
            case EventConsequenceType.TELEPORT:
                const currentRealmTheme = realmThemeOrder[(stage - 1) % realmThemeOrder.length];
                // Clamp substage to be within the current realm's bounds (1 to boss fight)
                const newSubStage = Math.max(1, Math.min(subStage + finalConsequence.payload.substages, ENEMIES_PER_STAGE + 1));
                
                if (newSubStage !== subStage) {
                    setSubStage(newSubStage);
                    // Generate a new enemy for the new location
                    setCurrentEnemy(generateEnemy(stage, newSubStage, currentRealmTheme, ascensionCount));
                }
                break;

            case EventConsequenceType.SET_FLAG:
                setEventFlags(prev => new Set(prev).add(finalConsequence!.payload.flag));
                break;
                
            case EventConsequenceType.HEAL: {
                const { healType, amount } = finalConsequence.payload;
                let healthToHeal = 0;
                if (healType === 'full') {
                    healthToHeal = playerStats.maxHealth - playerHealth;
                } else if (healType === 'percent_max') {
                    healthToHeal = Math.floor(playerStats.maxHealth * amount);
                } else if (healType === 'percent_missing') {
                    const missingHealth = playerStats.maxHealth - playerHealth;
                    healthToHeal = Math.floor(missingHealth * amount);
                }

                if (healthToHeal > 0) {
                    setPlayerHealth(h => Math.min(playerStats.maxHealth, h + healthToHeal));
                    setIsPlayerHealing(true);
                    setTimeout(() => setIsPlayerHealing(false), 500);
                    addFloatingText(`+${healthToHeal.toLocaleString()}`, false, 25, 30, 'heal');
                } else if (healthToHeal < 0) {
                    setPlayerHealth(h => Math.max(0, h + healthToHeal));
                    addFloatingText(`${healthToHeal.toLocaleString()}`, false, 25, 30, 'enemy');
                }
                break;
            }

            case EventConsequenceType.NOTHING:
                // No mechanical effect, the log message is enough.
                break;
        }
    }, [
        playerInfo, coins, setCoins, setTotalGoldEarnedThisRun, setCoinsSpentThisRun, addFloatingText, setInventory, setEquippedItems, setActiveEffects, setEventFlags,
        stage, subStage, setSubStage, realmThemeOrder, ascensionCount, setCurrentEnemy,
        setActiveEvent, setGameState, addCombatLog,
        playerHealth, playerStats, setPlayerHealth, setIsPlayerHealing,
        equippedItems
    ]);
    
    const handleEventEnd = useCallback(() => {
        setIsEventExiting(true);
        setTimeout(() => {
            const activeEvent = activeEventRef.current;
            if (activeEvent?.isPostGameEvent) {
                handleWinAndContinue();
            } else {
                // Now that the event is over, generate the enemy for the current sub-stage.
                // This ensures the spawn animation plays after the event screen closes.
                const currentRealmTheme = realmThemeOrder[(stage - 1) % realmThemeOrder.length];
                setCurrentEnemy(generateEnemy(stage, subStage, currentRealmTheme, ascensionCount));
                setActiveEvent(null);
                setGameState('playing');
            }
            setIsEventExiting(false);
        }, ANIMATION_DURATIONS.SCREEN_FADE_OUT);
    }, [handleWinAndContinue, setIsEventExiting, setActiveEvent, setGameState, stage, subStage, realmThemeOrder, ascensionCount, setCurrentEnemy]);

    return { handleEventChoice, handleEventEnd };
};