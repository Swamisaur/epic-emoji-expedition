/**
 * @file useGameLoop.ts
 * @description A custom hook that encapsulates the main game loop logic,
 * handling player and enemy attacks at regular intervals.
 */

import { useEffect, useRef, useCallback } from 'react';
import { GameState, Enemy, PlayerStats, CombatLogMessage, SpecialAbilityId, FloatingText, EquippedItems, PlayerInfo, Upgrade, UpgradeId, SkillEffects } from '../types';
import { GAME_TICK_MS, PLAYER_ATTACK_INTERVAL_BASE } from '../constants';

// Props for the useGameLoop hook
interface UseGameLoopProps {
    gameState: GameState;
    currentEnemy: Enemy | null;
    playerInfo: PlayerInfo | null;
    playerHealth: number;
    playerStats: PlayerStats;
    equippedItems: EquippedItems;
    activeEffects: SkillEffects;
    totalUpgradeLevels: number;
    upgrades: Upgrade[];
    setPlayerHealth: React.Dispatch<React.SetStateAction<number>>;
    setCurrentEnemy: React.Dispatch<React.SetStateAction<Enemy | null>>;
    setActiveEffects: React.Dispatch<React.SetStateAction<SkillEffects>>;
    setCoins: React.Dispatch<React.SetStateAction<number>>;
    setTotalGoldEarnedThisRun: React.Dispatch<React.SetStateAction<number>>;
    addCombatLog: (message: string, type: CombatLogMessage['type']) => void;
    addFloatingText: (text: string, isCrit: boolean, x: number, y: number, type: FloatingText['type'], dx?: number, dy?: number, path?: { startX: number; startY: number; deltaX: number; deltaY: number; }) => void;
    setHitAnimation: React.Dispatch<React.SetStateAction<'player' | 'enemy' | null>>;
    setAttackAnimation: React.Dispatch<React.SetStateAction<string | null>>;
    setAbilityCooldowns: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    setIsEnemyCharging: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEnemyChargingSpecial: React.Dispatch<React.SetStateAction<boolean>>;
    setPlayerBuffAnimation: React.Dispatch<React.SetStateAction<string | null>>;
    isEnteringRealm: boolean;
    isEnemySpawning: boolean;
    // Timer refs
    playerAttackCooldown: React.MutableRefObject<number>;
    playerAttackCounter: React.MutableRefObject<number>;
    enemyAttackCooldown: React.MutableRefObject<number>;
    enemyChargeTimer: React.MutableRefObject<number>;
    // New element refs
    playerEmojiRef: React.RefObject<HTMLDivElement>;
    enemyEmojiRef: React.RefObject<HTMLDivElement>;
}

export const useGameLoop = (props: UseGameLoopProps) => {
    const {
        gameState, currentEnemy, playerInfo, playerHealth, playerStats, equippedItems, activeEffects, totalUpgradeLevels, upgrades,
        setPlayerHealth, setCurrentEnemy, setActiveEffects, setCoins, setTotalGoldEarnedThisRun, addCombatLog, addFloatingText,
        setHitAnimation, setAttackAnimation, setAbilityCooldowns, setIsEnemyCharging, setIsEnemyChargingSpecial, setPlayerBuffAnimation,
        isEnteringRealm, isEnemySpawning, playerAttackCooldown, playerAttackCounter, enemyAttackCooldown, enemyChargeTimer,
        playerEmojiRef, enemyEmojiRef,
    } = props;
    
    // Refs to track state within the loop without causing re-renders
    const isEnemyCharging = useRef(false);
    const attacksSinceSpecial = useRef(0);
    const dotTickCounter = useRef(0);

    useEffect(() => {
        if (currentEnemy?.isBoss) {
            attacksSinceSpecial.current = 0;
        }
    }, [currentEnemy?.id]);

    const handlePlayerAttack = useCallback(() => {
        const baseAttackSpeed = playerStats.attackSpeed * (1 + (activeEffects.critBuff ? 0 : 0));
        const currentAttackSpeed = baseAttackSpeed * (activeEffects.frenzy ? 2 : 1) * (1 + activeEffects.attackSpeedBuff);
        playerAttackCooldown.current += GAME_TICK_MS;

        if (playerAttackCooldown.current >= PLAYER_ATTACK_INTERVAL_BASE / currentAttackSpeed) {
            playerAttackCooldown.current = 0;
            playerAttackCounter.current++;
            
            if (Math.random() > playerStats.accuracy) {
                addCombatLog(`Your strike misses!`, 'info');
                addFloatingText('Miss', false, 75 + Math.random() * 5, 30 + Math.random() * 5, 'miss');
                return;
            }
            
            const handEmojis = ['👊', '🤛', '👋', '🤚', '🫳', '✊'];
            let attackEmoji = handEmojis[Math.floor(Math.random() * handEmojis.length)];
            if (equippedItems.offHand && Math.random() < 0.25) attackEmoji = equippedItems.offHand.emoji;
            else if (equippedItems.mainHand) attackEmoji = equippedItems.mainHand.emoji;
            else if (playerInfo?.skinTone) attackEmoji += playerInfo.skinTone;
            
            setAttackAnimation('player-lunge');
            setTimeout(() => setAttackAnimation(null), 300);

            let path;
            const playerEl = playerEmojiRef.current;
            const enemyEl = enemyEmojiRef.current;
            if (playerEl && enemyEl) {
                const playerRect = playerEl.getBoundingClientRect();
                const enemyRect = enemyEl.getBoundingClientRect();
                const startX = playerRect.left + playerRect.width / 2;
                const startY = playerRect.top + playerRect.height / 2;
                const enemyCenterX = enemyRect.left + enemyRect.width / 2;
                const enemyCenterY = enemyRect.top + enemyRect.height / 2;
                const radius = enemyRect.width / 4;
                const angle = Math.random() * 2 * Math.PI;
                const offsetX = Math.cos(angle) * radius;
                const offsetY = Math.sin(angle) * radius;
                const endX = enemyCenterX + offsetX;
                const endY = enemyCenterY + offsetY;
                path = { startX, startY, deltaX: endX - startX, deltaY: endY - startY };
            }
            addFloatingText(attackEmoji, false, -1, -1, 'player_attack_emoji', undefined, undefined, path);

            let damage = playerStats.attackPower * (1 + (activeEffects.attackPowerBuff || 0));
            let critChance = playerStats.critChance + (activeEffects.critBuff?.chance || 0);
            let critDamage = playerStats.critDamage + (activeEffects.critBuff?.damage || 0) + activeEffects.critDamageBuff;
            
            const calorieConvertUpgrade = upgrades.find(u => u.id === UpgradeId.CalorieConvert);
            if (calorieConvertUpgrade && calorieConvertUpgrade.level > 1 && playerHealth / playerStats.maxHealth > 0.9) {
                critChance += 0.05 * (calorieConvertUpgrade.level - 1);
            }

            let isCrit = Math.random() < critChance;
            let usedGuaranteedCrit = false;
            if (!isCrit && activeEffects.guaranteedCrits > 0) {
                isCrit = true;
                usedGuaranteedCrit = true;
                setActiveEffects(p => ({...p, guaranteedCrits: Math.max(0, p.guaranteedCrits - 1)}));
            }
            if (isCrit) damage = Math.floor(damage * critDamage);
            
            addFloatingText(damage.toString(), isCrit, 72, 28, 'player');
            setHitAnimation('enemy');
            setTimeout(() => setHitAnimation(null), 300);
            addCombatLog(`${attackEmoji} Your strike deals ${damage} damage.${isCrit ? ' A CRITICAL HIT!' : ''}`, isCrit ? 'crit' : 'player');
            setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);

            // Class Passive Triggers
            if (isCrit) {
                const bleedingHitsUpgrade = upgrades.find(u => u.id === UpgradeId.BleedingHits);
                if (bleedingHitsUpgrade && bleedingHitsUpgrade.level > 1 && Math.random() < (0.30 + (bleedingHitsUpgrade.level - 1) * 0.10)) {
                    setActiveEffects(p => ({ ...p, bleedDoT: { damage: playerStats.attackPower, duration: (p.bleedDoT?.duration || 0) + 3000 }}));
                    addCombatLog(`🩸 Bleeding Hits causes a deep wound!`, 'special');
                    addFloatingText('🩸', false, 72, 22, 'debuff');
                }
            }
            const poisonTipsUpgrade = upgrades.find(u => u.id === UpgradeId.PoisonTips);
            if (poisonTipsUpgrade && poisonTipsUpgrade.level > 1 && Math.random() < (0.10 * (poisonTipsUpgrade.level - 1))) {
                setActiveEffects(p => ({ ...p, poisonDoT: { damage: playerStats.attackPower * 0.6, duration: (p.poisonDoT?.duration || 0) + 3000 }}));
                addCombatLog(`☠️ Poison Tips afflicts the enemy!`, 'special');
                addFloatingText('☠️', false, 75, 20, 'debuff');
            }
            const pyroShowUpgrade = upgrades.find(u => u.id === UpgradeId.PyroShow);
            if (pyroShowUpgrade && pyroShowUpgrade.level > 1 && Math.random() < (0.10 * (pyroShowUpgrade.level - 1))) {
                setActiveEffects(p => ({ ...p, burnDoT: { damage: playerStats.attackPower * 0.6, duration: (p.burnDoT?.duration || 0) + 3000 }}));
                addCombatLog(`🎆 Pyro Show ignites the enemy!`, 'special');
                addFloatingText('🔥', false, 78, 24, 'debuff');
            }
        }
    }, [playerStats, activeEffects, equippedItems, playerInfo, upgrades, playerHealth, addFloatingText, setHitAnimation, addCombatLog, setCurrentEnemy, setAttackAnimation, setActiveEffects, playerEmojiRef, enemyEmojiRef, playerAttackCooldown, playerAttackCounter]);

    const handleDoTApplications = useCallback(() => {
        const applyDoT = (dotType: 'poisonDoT' | 'burnDoT' | 'bleedDoT', emoji: string, name: 'poison' | 'burn' | 'bleed') => {
            if(activeEffects[dotType] && activeEffects[dotType].duration > 0) {
                const tickInterval = GAME_TICK_MS * 5; // The interval we are now using (500ms)
                const damagePerTick = activeEffects[dotType].damage / (3000 / tickInterval);
                const finalDamage = Math.ceil(damagePerTick);

                if (finalDamage > 0) {
                    setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - finalDamage) } : null);
                    // Use new specific types for distinct visuals
                    addFloatingText(finalDamage.toString(), false, 75 + Math.random() * 4, 20 + Math.random() * 4, `${name}_dot`);
                    addCombatLog(`${emoji} ${name.charAt(0).toUpperCase() + name.slice(1)} deals ${finalDamage} damage.`, 'special');
                    setActiveEffects(prev => {
                        const newDot = { ...prev[dotType], duration: prev[dotType].duration - tickInterval };
                        return { ...prev, [dotType]: newDot };
                    });
                } else {
                     // Still need to decrease duration even if damage rounds to 0
                     setActiveEffects(prev => {
                        const newDot = { ...prev[dotType], duration: prev[dotType].duration - tickInterval };
                        return { ...prev, [dotType]: newDot };
                    });
                }
            }
        };
        applyDoT('poisonDoT', '☠️', 'poison');
        applyDoT('burnDoT', '🔥', 'burn');
        applyDoT('bleedDoT', '🩸', 'bleed');
    }, [activeEffects, setCurrentEnemy, addFloatingText, setActiveEffects, addCombatLog]);

    const handleEnemyAttack = useCallback(() => {
        if (activeEffects.freeze) {
            enemyAttackCooldown.current = 0;
            isEnemyCharging.current = false;
            setIsEnemyCharging(false);
            setIsEnemyChargingSpecial(false);
            return;
        }

        const useSpecialAttack = currentEnemy!.isBoss && currentEnemy!.specialAttack && attacksSinceSpecial.current >= 3;
        const chargeTime = (useSpecialAttack ? currentEnemy!.specialAttack!.chargeTime : currentEnemy!.chargeTime) * (1 + activeEffects.enemySpeedDebuff);

        if (isEnemyCharging.current) {
            enemyChargeTimer.current += GAME_TICK_MS;
            if (enemyChargeTimer.current >= chargeTime) {
                isEnemyCharging.current = false;
                setIsEnemyCharging(false);
                setIsEnemyChargingSpecial(false);
                enemyChargeTimer.current = 0;

                if (currentEnemy!.currentHealth > 0 && playerHealth > 0) {
                    if (activeEffects.enemyWillMiss > 0) {
                        setActiveEffects(prev => ({ ...prev, enemyWillMiss: prev.enemyWillMiss - 1 }));
                        addCombatLog('The enemy strikes, but you vanish in a puff of smoke!', 'info');
                        return;
                    }

                    let damage = useSpecialAttack ? Math.floor(currentEnemy!.attackPower * currentEnemy!.specialAttack!.damageMultiplier) : currentEnemy!.attackPower;
                    damage *= (1 - activeEffects.enemyPowerDebuff);
                    
                    if (activeEffects.damageShield > 0) {
                        const absorbed = Math.min(activeEffects.damageShield, damage);
                        damage -= absorbed;
                        setActiveEffects(p => ({ ...p, damageShield: p.damageShield - absorbed }));
                        addFloatingText(`-${absorbed}`, false, 24, 24, 'shield');
                        addCombatLog(`🛡️ Shield absorbed ${absorbed} damage!`, 'info');
                    }
                    
                    const finalDamage = Math.floor(damage * (1 - playerStats.damageReduction)); // Use playerStats for DR
                    if (activeEffects.reflectDamage > 0) {
                        const reflectDmg = Math.floor(finalDamage * activeEffects.reflectDamage);
                        if (reflectDmg > 0) {
                            setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - reflectDmg) } : null);
                            addFloatingText(reflectDmg.toString(), false, 80, 40, 'player');
                            addCombatLog(`🛡️ Your barrier reflects ${reflectDmg} damage!`, 'special');
                        }
                    }
                    setPlayerHealth(prev => Math.max(0, prev - finalDamage));
                    if (finalDamage > 0) addFloatingText(finalDamage.toString(), false, 22, 28, 'enemy');
                    
                    setAttackAnimation('enemy');
                    setTimeout(() => setAttackAnimation(null), 300);
                    let path;
                    const playerEl = playerEmojiRef.current;
                    const enemyEl = enemyEmojiRef.current;
                    if (playerEl && enemyEl) {
                        const playerRect = playerEl.getBoundingClientRect();
                        const enemyRect = enemyEl.getBoundingClientRect();
                        path = { startX: enemyRect.left + enemyRect.width / 2, startY: enemyRect.top + enemyRect.height / 2, deltaX: playerRect.left - enemyRect.left, deltaY: playerRect.top - enemyRect.top };
                    }
                    const attackEmoji = useSpecialAttack ? currentEnemy!.specialAttack!.emoji : currentEnemy!.attackEmoji;
                    addFloatingText(attackEmoji, false, -1, -1, 'enemy_attack_emoji', undefined, undefined, path);
                    setHitAnimation('player');
                    setTimeout(() => setHitAnimation(null), 300);

                    let logMessage = `${attackEmoji} ${currentEnemy!.name} strikes you for ${finalDamage} damage.`;
                    if (useSpecialAttack) {
                        attacksSinceSpecial.current = 0;
                        logMessage = `${attackEmoji} ${currentEnemy!.name} uses a powerful attack for ${finalDamage} damage.`;
                    } else if(currentEnemy!.isBoss) {
                        attacksSinceSpecial.current++;
                    }

                    if (currentEnemy!.archetype === 'vampiric' && finalDamage > 0) {
                        const healAmount = Math.floor(finalDamage * (currentEnemy!.lifesteal || 0.25));
                        if (healAmount > 0) {
                            setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.min(prev.maxHealth, prev.currentHealth + healAmount) } : null);
                            addFloatingText(`+${healAmount}`, false, 72, 20, 'heal');
                            logMessage += ` It drains ${healAmount} health.`;
                        }
                    }
                    addCombatLog(logMessage, useSpecialAttack ? 'special' : 'enemy');
                }
            }
        } else {
            enemyAttackCooldown.current += GAME_TICK_MS;
            const finalAttackInterval = currentEnemy!.attackInterval * (1 + activeEffects.enemySpeedDebuff);
            if (enemyAttackCooldown.current >= finalAttackInterval) {
                enemyAttackCooldown.current = 0;
                if(currentEnemy!.currentHealth > 0 && playerHealth > 0) {
                    isEnemyCharging.current = true;
                    if (useSpecialAttack) setIsEnemyChargingSpecial(true);
                    else setIsEnemyCharging(true);
                }
            }
        }
    }, [activeEffects, currentEnemy, playerHealth, playerStats.damageReduction, addCombatLog, addFloatingText, setHitAnimation, setAttackAnimation, setPlayerHealth, setActiveEffects, setCurrentEnemy, setIsEnemyCharging, setIsEnemyChargingSpecial, playerEmojiRef, enemyEmojiRef, enemyAttackCooldown, enemyChargeTimer]);

    useEffect(() => {
        if (gameState !== 'playing' || isEnteringRealm) {
            isEnemyCharging.current = false;
            setIsEnemyCharging(false);
            setIsEnemyChargingSpecial(false);
            return;
        }

        const gameLoop = setInterval(() => {
            setAbilityCooldowns(prev => {
                const newCooldowns = { ...prev };
                let changed = false;
                for (const key in newCooldowns) {
                    if (newCooldowns[key] > 0) {
                        newCooldowns[key] = Math.max(0, newCooldowns[key] - GAME_TICK_MS);
                        changed = true;
                    }
                }
                return changed ? newCooldowns : prev;
            });
            
            if (!currentEnemy || currentEnemy.currentHealth <= 0 || playerHealth <= 0 || isEnemySpawning) {
                isEnemyCharging.current = false;
                setIsEnemyCharging(false);
                setIsEnemyChargingSpecial(false);
                return;
            }

            handlePlayerAttack();
            
            dotTickCounter.current++;
            if (dotTickCounter.current >= 5) { // every 500ms
                handleDoTApplications();
                dotTickCounter.current = 0;
            }

            handleEnemyAttack();

        }, GAME_TICK_MS);

        return () => clearInterval(gameLoop);
    }, [
        gameState, isEnteringRealm, isEnemySpawning, currentEnemy, playerHealth, setAbilityCooldowns,
        handlePlayerAttack, handleDoTApplications, handleEnemyAttack
    ]);
};