/**
 * @file useCombatActions.ts
 * @description A hook for handling real-time combat actions like manual attacks and using special abilities.
 */
import { useCallback, useRef, useEffect } from 'react';
import { SpecialAbilityId, PlayerStats, Enemy, CombatLogMessage, FloatingText, EquippedItems, PlayerInfo, ActiveSkillEffect, GameState, SkillEffects } from '../../types';
import { ALL_CLASSES } from '../../constants';

interface UseCombatActionsProps {
    // State
    coins: number;
    stage: number;
    abilityCooldowns: Record<string, number>;
    gameState: GameState;
    isEnemySpawning: boolean;
    currentEnemy: Enemy | null;
    playerStats: PlayerStats;
    equippedItems: EquippedItems;
    showAttackHint: boolean;
    playerHealth: number;
    playerInfo: PlayerInfo | null;
    totalUpgradeLevels: number;
    activeEffects: SkillEffects;
    abilityUses: Record<string, number>;

    // Setters
    setCoins: React.Dispatch<React.SetStateAction<number>>;
    setCoinsSpentThisRun: React.Dispatch<React.SetStateAction<number>>;
    setTotalGoldEarnedThisRun: React.Dispatch<React.SetStateAction<number>>;
    setAbilityCooldowns: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    setCurrentEnemy: React.Dispatch<React.SetStateAction<Enemy | null>>;
    setHitAnimation: React.Dispatch<React.SetStateAction<'player' | 'enemy' | null>>;
    setAttackAnimation: React.Dispatch<React.SetStateAction<string | null>>;
    setShowAttackHint: React.Dispatch<React.SetStateAction<boolean>>;
    setPlayerHealth: React.Dispatch<React.SetStateAction<number>>;
    setIsPlayerHealing: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveEffects: React.Dispatch<React.SetStateAction<SkillEffects>>;
    setActiveSkillEffects: React.Dispatch<React.SetStateAction<ActiveSkillEffect[]>>;
    setPlayerBuffAnimation: React.Dispatch<React.SetStateAction<string | null>>;
    setIsComboActive: React.Dispatch<React.SetStateAction<boolean>>;
    setAbilityUses: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    setScreenShake: React.Dispatch<React.SetStateAction<'light' | 'strong' | null>>;
    setScreenTint: React.Dispatch<React.SetStateAction<'red' | null>>;


    // Callbacks
    addCombatLog: (message: string, type: CombatLogMessage['type']) => void;
    addFloatingText: (text: string, isCrit: boolean, x: number, y: number, type: FloatingText['type'], dx?: number, dy?: number, path?: { startX: number; startY: number; deltaX: number; deltaY: number; }) => void;
    
    // Refs
    lastManualAttackTime: React.MutableRefObject<number>;
    hintTimerIndex: React.MutableRefObject<number>;
    hintTimerIntervals: React.MutableRefObject<number[]>;
    effectTimers: React.MutableRefObject<Record<string, number>>;
    playerEmojiRef: React.RefObject<HTMLDivElement>;
    enemyEmojiRef: React.RefObject<HTMLDivElement>;
}

export const useCombatActions = (props: UseCombatActionsProps) => {
    const {
        coins, stage, abilityCooldowns, gameState, isEnemySpawning, currentEnemy, playerStats, equippedItems, showAttackHint, playerHealth, playerInfo, totalUpgradeLevels, activeEffects,
        abilityUses,
        setCoins, setCoinsSpentThisRun, setTotalGoldEarnedThisRun, setAbilityCooldowns, setCurrentEnemy, setHitAnimation, setAttackAnimation, setShowAttackHint,
        setPlayerHealth, setIsPlayerHealing, setActiveEffects, setActiveSkillEffects, setPlayerBuffAnimation, setIsComboActive,
        setAbilityUses,
        setScreenShake,
        setScreenTint,
        addCombatLog, addFloatingText,
        lastManualAttackTime, hintTimerIndex, hintTimerIntervals, effectTimers,
        playerEmojiRef, enemyEmojiRef
    } = props;
    
    const clickTimestampsRef = useRef<number[]>([]);

    /**
     * Handles the player's manual attack, dealing damage to the current enemy.
     * This also serves to hide the "Tap to attack!" hint.
     */
    const handlePlayerManualAttack = useCallback((position: { x: number; y: number; }) => {
        if (gameState !== 'playing' || !currentEnemy || currentEnemy.currentHealth <= 0 || isEnemySpawning) return;
        
        lastManualAttackTime.current = Date.now();
        if (showAttackHint) {
            setShowAttackHint(false);
            hintTimerIndex.current = Math.min(hintTimerIndex.current + 1, hintTimerIntervals.current.length - 1);
        }

        // Combo particle logic
        const now = Date.now();
        clickTimestampsRef.current.push(now);
        // Keep only clicks from the last second
        clickTimestampsRef.current = clickTimestampsRef.current.filter(ts => now - ts <= 1000);

        if (clickTimestampsRef.current.length > 3) {
            setIsComboActive(true);
        } else {
            setIsComboActive(false);
        }

        // --- Accuracy Check ---
        // A check to see if the player's attack will hit, based on their accuracy stat.
        if (Math.random() > playerStats.accuracy) {
            addCombatLog(`Your quick strike misses!`, 'info');
            // Add a "Miss!" floating text at the click position for visual feedback
            addFloatingText('Miss', false, position.x, position.y, 'miss');
            return; // Attack misses, do no damage.
        }

        const handEmojis = ['👊', '🤛', '👋', '🤚', '🫳', '✊'];
        let attackEmoji = handEmojis[Math.floor(Math.random() * handEmojis.length)];
        
        if (equippedItems.offHand && Math.random() < 0.25) {
            attackEmoji = equippedItems.offHand.emoji;
        } else if (equippedItems.mainHand) {
            attackEmoji = equippedItems.mainHand.emoji;
        } else if (playerInfo?.skinTone) {
            attackEmoji += playerInfo.skinTone;
        }
        
        setAttackAnimation('player-lunge');
        setTimeout(() => setAttackAnimation(null), 300);

        let path;
        const playerEl = playerEmojiRef.current;
        if (playerEl) {
            const playerRect = playerEl.getBoundingClientRect();

            const startX = playerRect.left + playerRect.width / 2;
            const startY = playerRect.top + playerRect.height / 2;

            const endX = (position.x / 100) * window.innerWidth;
            const endY = (position.y / 100) * window.innerHeight;

            const deltaX = endX - startX;
            const deltaY = endY - startY;

            path = { startX, startY, deltaX, deltaY };
        }
        addFloatingText(attackEmoji, false, -1, -1, 'player_attack_emoji', undefined, undefined, path);

        let damage = playerStats.attackPower;
        let critChance = playerStats.critChance + (activeEffects.critBuff?.chance || 0);
        let critDamage = playerStats.critDamage + (activeEffects.critBuff?.damage || 0) + activeEffects.critDamageBuff;
        let isCrit = Math.random() < critChance;
        let usedGuaranteedCrit = false;

        if (!isCrit && activeEffects.guaranteedCrits > 0) {
            isCrit = true;
            usedGuaranteedCrit = true;
        }
    
        if (isCrit) {
            damage = Math.floor(damage * critDamage);
        }

        if (usedGuaranteedCrit) {
            setActiveEffects(p => ({...p, guaranteedCrits: Math.max(0, p.guaranteedCrits - 1)}));
        }
    
        addFloatingText(damage.toString(), isCrit, position.x, position.y, 'player');
        setHitAnimation('enemy');
        setTimeout(() => setHitAnimation(null), 300);
        addCombatLog(`${attackEmoji} Your quick strike deals ${damage} damage.${isCrit ? ' A CRITICAL HIT!' : ''}`, isCrit ? 'crit' : 'player');
    
        setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
    }, [
        gameState, isEnemySpawning, currentEnemy, playerStats, equippedItems, showAttackHint, playerInfo, activeEffects, lastManualAttackTime, hintTimerIndex, 
        hintTimerIntervals, addFloatingText, setHitAnimation, setAttackAnimation, addCombatLog, setCurrentEnemy, setShowAttackHint, setIsComboActive, playerEmojiRef
    ]);

    // Cleanup effect to reset combo state if the game state changes
    useEffect(() => {
        if (gameState !== 'playing') {
            setIsComboActive(false);
            clickTimestampsRef.current = [];
        }
    }, [gameState, setIsComboActive]);
    
    /**
     * Activates a special ability, applying its cost, cooldown, and effect.
     */
    const handleUseSpecialAbility = useCallback((abilityId: SpecialAbilityId) => {
        if (!playerInfo || !currentEnemy) return;
        
        const playerClass = ALL_CLASSES.find(c => c.id === playerInfo.playerClassId);
        if (!playerClass) return;

        const ability = playerClass.skills.find(a => a.id === abilityId);
        if (!ability) return;
    
        const castCount = abilityUses[abilityId] ?? 0;
        const currentCost = ability.cost(stage, castCount);
        if (coins < currentCost || (abilityCooldowns[abilityId] ?? 0) > 0) {
             if (abilityId === SpecialAbilityId.LiquidateAssets && coins <= 0) return;
             if (abilityId !== SpecialAbilityId.LiquidateAssets) return;
        };
    
        setCoins(c => c - currentCost);
        setCoinsSpentThisRun(prev => prev + currentCost);
        setAbilityCooldowns(prev => ({ ...prev, [abilityId]: ability.cooldown }));
        setAbilityUses(prev => ({...prev, [abilityId]: castCount + 1 }));
        addCombatLog(`Unleashed ${ability.name}!`, 'special');
    
        if (effectTimers.current[abilityId]) clearTimeout(effectTimers.current[abilityId]);

        const addSkillBuffToUI = (duration: number) => {
             const newSkillEffect: ActiveSkillEffect = {
                id: ability.id,
                name: ability.name,
                emoji: ability.emoji,
                description: ability.description,
                durationMs: duration,
                startTime: Date.now(),
            };
            setActiveSkillEffects(prev => [...prev.filter(e => e.id !== ability.id), newSkillEffect]);
            effectTimers.current[ability.id + '_ui'] = window.setTimeout(() => {
                setActiveSkillEffects(prev => prev.filter(e => e.id !== ability.id));
            }, duration);
        }
    
        // Handle ability-specific logic
        switch (abilityId) {
            // DIVA
            case SpecialAbilityId.FlashPose: {
                addFloatingText('📸', false, 75, 30, 'flash_pose');
                setScreenShake('light');
                setTimeout(() => setScreenShake(null), 400);
                const damage = playerStats.attackPower * 1.5;
                setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
                addFloatingText(damage.toString(), false, 72, 28, 'player');
                
                const duration = 10000;
                setActiveEffects(p => ({ ...p, guaranteedCrits: p.guaranteedCrits + 2 }));
                setPlayerBuffAnimation('flash-pose');
                addSkillBuffToUI(duration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setPlayerBuffAnimation(null);
                }, duration);
                break;
            }
            case SpecialAbilityId.WardrobeShift: {
                for (let i = 0; i < 10; i++) {
                    const angle = Math.random() * 2 * Math.PI;
                    addFloatingText(['✨','👗'][i%2], false, 25, 28, 'burst', Math.cos(angle) * 60, Math.sin(angle) * 60);
                }
                setAttackAnimation('player-spin');
                setTimeout(() => setAttackAnimation(null), 500);

                const duration = 10000;
                setActiveEffects(p => ({ ...p, damageReduction: p.damageReduction + 0.50 }));
                setPlayerBuffAnimation('wardrobe-shift');
                addSkillBuffToUI(duration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setActiveEffects(p => ({ ...p, damageReduction: Math.max(0, p.damageReduction - 0.50) }));
                    setPlayerBuffAnimation(null);
                }, duration);
                break;
            }
            case SpecialAbilityId.SirenSong: {
                 for (let i = 0; i < 8; i++) {
                    setTimeout(() => {
                        let path;
                        const playerEl = playerEmojiRef.current;
                        const enemyEl = enemyEmojiRef.current;
                        if (playerEl && enemyEl) {
                            const pR = playerEl.getBoundingClientRect();
                            const eR = enemyEl.getBoundingClientRect();
                            const startX = pR.left + pR.width / 2 + (Math.random() - 0.5) * 40;
                            const startY = pR.top + pR.height / 2 + (Math.random() - 0.5) * 40;
                            const endX = eR.left + eR.width / 2;
                            const endY = eR.top + eR.height / 2;
                            path = { startX, startY, deltaX: endX - startX, deltaY: endY - startY };
                        }
                        addFloatingText(['🎶', '🎵'][i % 2], false, -1, -1, 'siren_song_notes', undefined, undefined, path);
                    }, i * 100);
                }
                const stunDuration = 4000;
                setTimeout(() => {
                    const damage = playerStats.attackPower * 4;
                    setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
                    addFloatingText(damage.toString(), false, 72, 28, 'player');
                    setActiveEffects(p => ({...p, freeze: true }));
                     for(let i=0; i<3; i++) {
                        addFloatingText(['😵','💖'][i%2], false, 75, 25, 'debuff');
                    }
                    addSkillBuffToUI(stunDuration);
                }, 1400);

                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setActiveEffects(prev => ({ ...prev, freeze: false }));
                }, stunDuration + 1400);
                break;
            }
            case SpecialAbilityId.EncoreFinale: {
                 for (let i = 0; i < 80; i++) {
                    addFloatingText(['🌟', '💖', '💎', '🎶'][i%4], false, Math.random() * 100, Math.random() * 100, 'bonus');
                }
                setScreenShake('strong');
                setTimeout(() => setScreenShake(null), 500);

                const damage = playerStats.attackPower * 15;
                setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
                addFloatingText(damage.toString(), true, 75, 30, 'player');
                
                const duration = 15000;
                setActiveEffects(p => ({ ...p, luckBuff: 1.0 }));
                setPlayerBuffAnimation('encore-finale');
                addSkillBuffToUI(duration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setPlayerBuffAnimation(null);
                    setActiveEffects(p => ({ ...p, luckBuff: 0 }));
                }, duration);
                break;
            }

            // CON ARTIST
            case SpecialAbilityId.CoinFlip: {
                addFloatingText('🪙', false, 25, 25, 'coin_flip');
                const win = Math.random() < 0.5;
                setTimeout(() => {
                    if (win) {
                        addFloatingText('✨', false, 25, 25, 'burst');
                        const damage = Math.floor(playerStats.attackPower * 30);
                        setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
                        setCoins(c => c + damage);
                        setTotalGoldEarnedThisRun(t => t + damage);
                        addFloatingText(damage.toString(), true, 75, 25, 'player');
                        addFloatingText(`+${damage}`, true, 78, 35, 'coin');
                        addCombatLog('Heads! A spectacular hit and a massive payout!', 'crit');
                    } else {
                        addFloatingText('💀', false, 25, 25, 'burst');
                        const goldLost = Math.floor(coins * 0.5);
                        setCoins(c => c - goldLost);
                        addFloatingText(`-${goldLost.toLocaleString()}`, false, 25, 35, 'enemy');
                        addCombatLog('Tails! You lose half your gold!', 'enemy');
                    }
                }, 800);
                break;
            }
            case SpecialAbilityId.EscapeRope: {
                const duration = 10000;
                const goldFound = 50 + stage * 5;
                setActiveEffects(prev => ({ ...prev, enemyWillMiss: 3 }));
                setCoins(c => c + goldFound);
                setTotalGoldEarnedThisRun(t => t + goldFound);
                addFloatingText('💨', false, 25, 28, 'burst');
                addFloatingText(`+${goldFound}`, false, 28, 35, 'coin');
                addSkillBuffToUI(duration);
                break;
            }
            case SpecialAbilityId.Pickpocket: {
                setAttackAnimation('player-lunge');
                setTimeout(() => setAttackAnimation(null), 300);
                const damage = Math.floor(playerStats.attackPower * 4);
                const goldStolenFromReward = Math.floor(currentEnemy.coinReward * 0.5);
                const bonusGold = 25 + stage * 3;
                const totalGold = goldStolenFromReward + bonusGold;
                setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
                setCoins(c => c + totalGold);
                setTotalGoldEarnedThisRun(t => t + totalGold);
                addFloatingText(damage.toString(), false, 72, 28, 'player');
                addFloatingText(`+${totalGold}`, false, 75, 25, 'coin');
                break;
            }
            case SpecialAbilityId.Jackpot: {
                setScreenShake('strong');
                setTimeout(() => setScreenShake(null), 1500);
                addFloatingText('🎰', false, 50, 40, 'jackpot_effect');
                
                setTimeout(() => {
                    const goldGained = Math.floor(10 * currentCost);
                    setCoins(c => c + goldGained);
                    setTotalGoldEarnedThisRun(t => t + goldGained);
                    addFloatingText(`+${goldGained.toLocaleString()}`, true, 50, 50, 'coin');
                     for (let i = 0; i < 50; i++) {
                        addFloatingText(['💰','💎','✨','🍀'][i%4], false, Math.random() * 100, Math.random() * 100, 'bonus');
                    }
                    
                    const duration = 15000;
                    const critBuff = { chance: 0.5, damage: 0 };
                    setActiveEffects(prev => ({...prev, critBuff, luckBuff: 1.0}));
                    setPlayerBuffAnimation('jackpot');
                    addSkillBuffToUI(duration);
                    effectTimers.current[abilityId] = window.setTimeout(() => {
                        setActiveEffects(prev => ({ ...prev, critBuff: null, luckBuff: 0 }));
                        setPlayerBuffAnimation(null);
                    }, duration);
                }, 1800);
                break;
            }

            // NIGHT FANG
            case SpecialAbilityId.QuickBite: {
                setAttackAnimation('player-lunge');
                setTimeout(() => setAttackAnimation(null), 300);
                addFloatingText('獠', false, 75, 30, 'fang_bite');
                addFloatingText('🩸', false, 75, 30, 'burst', (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50);

                const damage = playerStats.attackPower * 2;
                setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
                addFloatingText(damage.toString(), false, 72, 28, 'player');
                
                const healAmount = Math.floor(damage * 1.5);
                setPlayerHealth(h => Math.min(playerStats.maxHealth, h + healAmount));
                addFloatingText(`+${healAmount}`, false, 25, 30, 'heal');

                const duration = 10000;
                setPlayerBuffAnimation('bloodlust');
                addSkillBuffToUI(duration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setPlayerBuffAnimation(null);
                }, duration);
                break;
            }
            case SpecialAbilityId.BatForm: {
                const duration = 10000;
                setPlayerBuffAnimation('bat-form');
                setActiveEffects(p => ({ ...p, damageReduction: p.damageReduction + 0.75, attackSpeedBuff: p.attackSpeedBuff + 0.60 }));
                addSkillBuffToUI(duration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setPlayerBuffAnimation(null);
                    setActiveEffects(p => ({ ...p, damageReduction: Math.max(0, p.damageReduction - 0.75), attackSpeedBuff: Math.max(0, p.attackSpeedBuff - 0.60) }));
                }, duration);
                break;
            }
            case SpecialAbilityId.ShadowRift: {
                addFloatingText('🌀', false, 25, 30, 'debuff');
                for (let i = 0; i < 5; i++) {
                    const angle = (i/5) * Math.PI * 2;
                    addFloatingText('〰️', false, 25, 30, 'shadow_tendril', Math.cos(angle) * 80, Math.sin(angle) * 80);
                }
                const duration = 10000;
                setActiveEffects(p => ({ ...p, guaranteedCrits: p.guaranteedCrits + 10 }));
                setPlayerBuffAnimation('shadow-rift');
                addSkillBuffToUI(duration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setPlayerBuffAnimation(null);
                }, duration);
                break;
            }
            case SpecialAbilityId.BloodMoon: {
                const duration = 8000;
                setScreenTint('red');
                setScreenShake('strong');
                addFloatingText('🔴', false, 50, 10, 'blood_moon');
                setTimeout(() => setScreenShake(null), 500);
                setTimeout(() => setScreenTint(null), duration);
                
                const damage = playerStats.attackPower * 10; // Massive damage
                setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
                addFloatingText(damage.toString(), true, 75, 30, 'player');

                setActiveEffects(p => ({ ...p, frenzy: true, critDamageBuff: p.critDamageBuff + 1.0 }));
                setPlayerBuffAnimation('blood-moon');
                addSkillBuffToUI(duration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setActiveEffects(p => ({ ...p, frenzy: false, critDamageBuff: Math.max(0, p.critDamageBuff - 1.0) }));
                    setPlayerBuffAnimation(null);
                }, duration);
                break;
            }
            // NINJA
            case SpecialAbilityId.SwiftSlash: { // Shadow Rend
                const targetEnemyId = currentEnemy.id;
                for(let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        setCurrentEnemy(prevEnemy => {
                            if (prevEnemy && prevEnemy.id === targetEnemyId && prevEnemy.currentHealth > 0) {
                                const isCrit = Math.random() < playerStats.critChance;
                                let damage = playerStats.attackPower * 2.5;
                                if (isCrit) {
                                    damage = Math.floor(damage * playerStats.critDamage);
                                    const duration = 5000;
                                    setActiveEffects(p => ({ ...p, enemyPowerDebuff: p.enemyPowerDebuff + 0.1}));
                                    setTimeout(() => setActiveEffects(p => ({ ...p, enemyPowerDebuff: p.enemyPowerDebuff - 0.1})), duration);
                                }
                                addFloatingText(damage.toString(), isCrit, 72 + Math.random() * 6, 28 + Math.random() * 10, 'player');
                                setHitAnimation('enemy');
                                setTimeout(() => setHitAnimation(null), 150);
                                return { ...prevEnemy, currentHealth: Math.max(0, prevEnemy.currentHealth - damage) };
                            }
                            return prevEnemy;
                        });
                    }, i * 100);
                }
                break;
            }
            case SpecialAbilityId.SmokeScreen: { // Misty Veil
                const duration = 10000;
                setActiveEffects(prev => ({ ...prev, enemyWillMiss: 3, guaranteedCrits: prev.guaranteedCrits + 1 }));
                addFloatingText('💨', false, 25, 28, 'burst');
                addSkillBuffToUI(duration);
                break;
            }
            case SpecialAbilityId.ShurikenStorm: { // Blade Cyclone
                const targetEnemyId = currentEnemy.id;
                const shurikenCount = 8;
                for (let i = 0; i < shurikenCount; i++) {
                    setTimeout(() => {
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
    
                            const deltaX = endX - startX;
                            const deltaY = endY - startY;
    
                            path = { startX, startY, deltaX, deltaY };
                        }
                        addFloatingText('⭐', false, -1, -1, 'shuriken', undefined, undefined, path);
                        setCurrentEnemy(prevEnemy => {
                            if (prevEnemy && prevEnemy.id === targetEnemyId && prevEnemy.currentHealth > 0) {
                                const damage = Math.floor(playerStats.attackPower * 1.2);
                                addFloatingText(damage.toString(), false, 72 + Math.random() * 6, 28 + Math.random() * 10, 'player');
                                setHitAnimation('enemy');
                                setTimeout(() => setHitAnimation(null), 150);
                                if (Math.random() < 0.5) { // High bleed chance
                                    const bleedDamage = playerStats.attackPower * 0.5;
                                    setActiveEffects(p => ({ ...p, bleedDoT: { damage: bleedDamage, duration: p.bleedDoT?.duration ? p.bleedDoT.duration + 2000 : 2000 }}));
                                }
                                return { ...prevEnemy, currentHealth: Math.max(0, prevEnemy.currentHealth - damage) };
                            }
                            return prevEnemy;
                        });
                    }, i * 80);
                }
                break;
            }
            case SpecialAbilityId.DragonStrike: { // Dragon's Fury
                const damage = Math.floor(playerStats.attackPower * 15);
                addFloatingText('🐉', false, 15, 30, 'dragon_strike');

                setTimeout(() => {
                    setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage)} : null);
                    addFloatingText(damage.toString(), true, 75, 25, 'player');
                    setHitAnimation('enemy');
                    setTimeout(() => setHitAnimation(null), 400);
                    setScreenShake('strong');
                    setTimeout(() => setScreenShake(null), 400);
                }, 600);
                
                const burnDamage = playerStats.attackPower * 5;
                setActiveEffects(p => ({ ...p, burnDoT: { damage: burnDamage, duration: p.burnDoT.duration + 5000 }}));

                const stunDuration = 3000;
                setActiveEffects(prev => ({...prev, freeze: true}));
                addSkillBuffToUI(stunDuration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setActiveEffects(prev => ({ ...prev, freeze: false }));
                }, stunDuration);
                break;
            }
            // SPACE TANK
            case SpecialAbilityId.RocketDash: {
                const damage = Math.floor(playerStats.attackPower * 6);
                setAttackAnimation('rocket-dash');
                setTimeout(() => setAttackAnimation(null), 400);

                setTimeout(() => {
                    setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
                    addFloatingText(damage.toString(), false, 75, 30, 'player');
                    addFloatingText('💠', false, 75, 30, 'rocket_dash_impact');
                    setHitAnimation('enemy');
                    setTimeout(() => setHitAnimation(null), 300);
                    setScreenShake('strong');
                    setTimeout(() => setScreenShake(null), 400);
                }, 150);
                break;
            }
            case SpecialAbilityId.ForceField: {
                const duration = 10000;
                const shieldAmount = playerStats.maxHealth;
                setActiveEffects(p => ({ ...p, damageShield: p.damageShield + shieldAmount }));
                addFloatingText(`+${Math.floor(shieldAmount)}🛡️`, false, 28, 35, 'shield');
                setPlayerBuffAnimation('force-field');
                setTimeout(() => setPlayerBuffAnimation(null), 800);
                addSkillBuffToUI(duration);
                break;
            }
            case SpecialAbilityId.OrbitalStrike: {
                addFloatingText('🛰️', false, 75, 50, 'orbital_strike');
                const damage = Math.floor(playerStats.attackPower * 20);
                const stunDuration = 4000;

                setTimeout(() => {
                    setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
                    addFloatingText(damage.toString(), true, 75, 25, 'player');
                    setHitAnimation('enemy');
                    setTimeout(() => setHitAnimation(null), 400);
                    setScreenShake('strong');
                    setTimeout(() => setScreenShake(null), 400);

                    setActiveEffects(prev => ({ ...prev, freeze: true }));
                    addSkillBuffToUI(stunDuration);
                    effectTimers.current[abilityId] = window.setTimeout(() => {
                        setActiveEffects(prev => ({ ...prev, freeze: false }));
                    }, stunDuration);
                }, 1300);
                break;
            }
            case SpecialAbilityId.Singularity: {
                addFloatingText('🌌', false, 75, 30, 'singularity');
                const damage = Math.floor(playerStats.attackPower * 25);
                const duration = 10000;

                setTimeout(() => {
                     setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
                    addFloatingText(damage.toString(), true, 75, 25, 'player');
                    setHitAnimation('enemy');
                    setTimeout(() => setHitAnimation(null), 400);
                    setScreenShake('strong');
                    setTimeout(() => setScreenShake(null), 400);

                    setActiveEffects(p => ({ ...p, enemyPowerDebuff: 0.5 }));
                    addSkillBuffToUI(duration);
                    effectTimers.current[abilityId] = window.setTimeout(() => {
                        setActiveEffects(p => ({ ...p, enemyPowerDebuff: 0 }));
                    }, duration);
                }, 1500);
                break;
            }
            // SNACKER
            case SpecialAbilityId.Munch: { // Gourmet Bite
                const damage = Math.floor(playerStats.attackPower * 3);
                const healAmount = Math.floor(playerStats.maxHealth * 0.40);
                const shieldAmount = Math.floor(playerStats.maxHealth * 0.30);
                setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
                setPlayerHealth(h => Math.min(playerStats.maxHealth, h + healAmount));
                setActiveEffects(p => ({ ...p, damageShield: p.damageShield + shieldAmount}));
                
                addFloatingText(damage.toString(), false, 72, 28, 'player');
                addFloatingText(`+${healAmount}`, false, 25, 30, 'heal');
                addFloatingText(`+${shieldAmount}🛡️`, false, 28, 35, 'shield');
                
                const duration = 10000;
                addSkillBuffToUI(duration);
                 effectTimers.current[abilityId] = window.setTimeout(() => {
                    setActiveEffects(p => ({ ...p, damageShield: Math.max(0, p.damageShield - shieldAmount)}));
                }, duration);
                break;
            }
            case SpecialAbilityId.StickyGlaze: { // Caramelize
                const duration = 10000;
                setActiveEffects(prev => ({...prev, enemySpeedDebuff: 0.75}));
                const burnDamage = playerStats.attackPower * 3;
                setActiveEffects(p => ({ ...p, burnDoT: { damage: burnDamage, duration: 10000 }}));
                addFloatingText('🍯', false, 75, 20, 'debuff');
                addSkillBuffToUI(duration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setActiveEffects(prev => ({ ...prev, enemySpeedDebuff: 0 }));
                }, duration);
                break;
            }
            case SpecialAbilityId.RollingPin: { // Tenderize
                const damage = Math.floor(playerStats.attackPower * 15);
                setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage) } : null);
                addFloatingText(damage.toString(), true, 75, 25, 'player');
                setHitAnimation('enemy');
                setTimeout(() => setHitAnimation(null), 400);
                setScreenShake('strong');
                setTimeout(() => setScreenShake(null), 400);
                
                const stunDuration = 2000;
                setActiveEffects(prev => ({...prev, freeze: true}));
                addSkillBuffToUI(stunDuration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setActiveEffects(prev => ({ ...prev, freeze: false }));
                }, stunDuration);
                break;
            }
            case SpecialAbilityId.FeastMode: { // Food Coma
                const duration = 15000;
                const shieldAmount = playerStats.maxHealth * 1.0;
                setPlayerHealth(playerStats.maxHealth);
                setActiveEffects(prev => ({ ...prev, damageShield: prev.damageShield + shieldAmount, damageReduction: prev.damageReduction + 0.75, reflectDamage: prev.reflectDamage + 0.25 }));
                addFloatingText('FULL HP!', false, 25, 30, 'heal');
                addSkillBuffToUI(duration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setActiveEffects(prev => ({...prev, damageReduction: prev.damageReduction - 0.75, reflectDamage: prev.reflectDamage - 0.25}));
                }, duration);
                break;
            }

            // MAGE
            case SpecialAbilityId.SparkShot: { // Arcane Barrage
                const targetEnemyId = currentEnemy.id;
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        let path;
                        const playerEl = playerEmojiRef.current;
                        const enemyEl = enemyEmojiRef.current;
                         if (playerEl && enemyEl) {
                            const playerRect = playerEl.getBoundingClientRect();
                            const enemyRect = enemyEl.getBoundingClientRect();
                            const startX = playerRect.left + playerRect.width / 2;
                            const startY = playerRect.top + playerRect.height / 2;
                            const endX = enemyRect.left + enemyRect.width / 2 + (Math.random() - 0.5) * enemyRect.width * 0.5;
                            const endY = enemyRect.top + enemyRect.height / 2 + (Math.random() - 0.5) * enemyRect.height * 0.5;
                            path = { startX, startY, deltaX: endX - startX, deltaY: endY - startY };
                        }
                        addFloatingText('✨', false, -1, -1, 'spark_bolt', undefined, undefined, path);

                        setCurrentEnemy(prevEnemy => {
                            if (prevEnemy && prevEnemy.id === targetEnemyId && prevEnemy.currentHealth > 0) {
                                const damage = Math.floor(playerStats.attackPower * 1.2);
                                addFloatingText(damage.toString(), false, 70 + i*2, 25 + i*3, 'player');
                                setHitAnimation('enemy');
                                setTimeout(() => setHitAnimation(null), 150);
                                if(Math.random() < 0.2) {
                                    const gold = 5 + Math.floor(stage * 0.5);
                                    setCoins(c => c + gold);
                                    setTotalGoldEarnedThisRun(t => t + gold);
                                    addFloatingText(`+${gold}`, false, 75, 25, 'coin');
                                }
                                return { ...prevEnemy, currentHealth: Math.max(0, prevEnemy.currentHealth - damage) };
                            }
                            return prevEnemy;
                        });
                    }, i * 80);
                }
                break;
            }
            case SpecialAbilityId.MagicBarrier: { // Prismatic Ward
                const duration = 8000;
                const shieldAmount = playerStats.maxHealth * 0.75;
                const critBuff = { chance: 0.20, damage: 0 };
                setActiveEffects(prev => ({...prev, damageShield: prev.damageShield + shieldAmount, reflectDamage: 0.75, critBuff }));
                setPlayerBuffAnimation('prismatic-ward');
                setTimeout(() => setPlayerBuffAnimation(null), duration);
                addSkillBuffToUI(duration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setActiveEffects(prev => ({ ...prev, reflectDamage: 0, critBuff: null }));
                }, duration);
                break;
            }
            case SpecialAbilityId.ChainZap: { // Arc Lightning
                const damage = Math.floor(playerStats.attackPower * 8);
                let path;
                const playerEl = playerEmojiRef.current;
                const enemyEl = enemyEmojiRef.current;
                if (playerEl && enemyEl) {
                    const pR = playerEl.getBoundingClientRect();
                    const eR = enemyEl.getBoundingClientRect();
                    path = { startX: pR.left + pR.width/2, startY: pR.top + pR.height/2, deltaX: eR.left - pR.left, deltaY: eR.top - pR.top };
                }
                addFloatingText('⚡️', false, -1, -1, 'chain_zap_bolt', undefined, undefined, path);
                setScreenShake('strong');
                setTimeout(() => setScreenShake(null), 400);

                setCurrentEnemy(prev => prev ? { ...prev, currentHealth: Math.max(0, prev.currentHealth - damage)} : null);
                addFloatingText(damage.toString(), true, 72, 28, 'player');
                
                const stunDuration = 3000;
                setActiveEffects(prev => ({...prev, freeze: true, guaranteedCrits: prev.guaranteedCrits + 3}));
                setPlayerBuffAnimation('supercharge');
                setTimeout(() => setPlayerBuffAnimation(null), stunDuration);
                addSkillBuffToUI(stunDuration);
                effectTimers.current[abilityId] = window.setTimeout(() => {
                    setActiveEffects(prev => ({ ...prev, freeze: false }));
                }, stunDuration);
                break;
            }
            case SpecialAbilityId.MeteorCall: { // Apocalypse
                const targetEnemyId = currentEnemy.id;
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        const enemyEl = enemyEmojiRef.current;
                        let impactX = 75, impactY = 30;
                        if(enemyEl) {
                            const eR = enemyEl.getBoundingClientRect();
                            impactX = (eR.left + eR.width / 2) / window.innerWidth * 100;
                            impactY = (eR.top + eR.height / 2) / window.innerHeight * 100;
                        }

                        addFloatingText('☄️', false, Math.random() * 100, 0, 'meteor_fall', impactX - Math.random() * 100, impactY);

                        setTimeout(() => {
                             setCurrentEnemy(prevEnemy => {
                                if (prevEnemy && prevEnemy.id === targetEnemyId && prevEnemy.currentHealth > 0) {
                                    const damage = Math.floor(playerStats.attackPower * 8);
                                    addFloatingText('💥', false, impactX, impactY, 'meteor_impact');
                                    addFloatingText(damage.toString(), true, impactX, impactY, 'player');
                                    setHitAnimation('enemy');
                                    setTimeout(() => setHitAnimation(null), 150);
                                    setScreenShake('strong');
                                    setTimeout(() => setScreenShake(null), 400);
                                    return { ...prevEnemy, currentHealth: Math.max(0, prevEnemy.currentHealth - damage) };
                                }
                                return prevEnemy;
                            });
                        }, 600);
                    }, i * 300);
                }
                const burnDamage = playerStats.attackPower * 10;
                setActiveEffects(p => ({ ...p, burnDoT: { damage: burnDamage, duration: 10000 }}));
                break;
            }
        }
    }, [
        playerInfo, stage, coins, abilityCooldowns, currentEnemy, playerStats, playerHealth, totalUpgradeLevels, activeEffects, addCombatLog, 
        addFloatingText, setCoins, setCoinsSpentThisRun, setTotalGoldEarnedThisRun, setAbilityCooldowns, effectTimers, 
        setCurrentEnemy, setHitAnimation, setPlayerHealth, setIsPlayerHealing, setActiveEffects,
        setActiveSkillEffects, setPlayerBuffAnimation, abilityUses, setAbilityUses, setAttackAnimation, setScreenShake, setScreenTint,
        playerEmojiRef, enemyEmojiRef
    ]);

    return {
        handlePlayerManualAttack,
        handleUseSpecialAbility,
    };
};