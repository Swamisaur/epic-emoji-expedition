/**
 * @file useUIState.ts
 * @description Manages all state related to the UI, feedback, and user interactions.
 */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { CombatLogMessage, FloatingText, GameState } from '../types';

export interface BossDefeatInfo {
    playerEmoji: string;
    weaponEmoji: string;
    defeatedBossEmoji: string;
    enemyName: string;
    playerName: string;
    healAmount: number;
    unlockedClassName?: string;
    realmName: string;
    bossTitle: string;
}

export const useUIState = (gameState: GameState, isEnemySpawning: boolean) => {
    // --- UI & FEEDBACK STATE ---
    const [combatLog, setCombatLog] = useState<CombatLogMessage[]>([]);
    const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
    const [hitAnimation, setHitAnimation] = useState<'player' | 'enemy' | null>(null);
    const [attackAnimation, setAttackAnimation] = useState<'player' | 'enemy' | null>(null);
    const [activeUpgradeTab, setActiveUpgradeTab] = useState<string>('train');
    const [showAttackHint, setShowAttackHint] = useState(false);
    const [isEnemyCharging, setIsEnemyCharging] = useState(false);
    const [isEnemyChargingSpecial, setIsEnemyChargingSpecial] = useState(false);
    const [playerBuffAnimation, setPlayerBuffAnimation] = useState<string | null>(null);
    const [isPlayerDying, setIsPlayerDying] = useState(false);
    const [isComboActive, setIsComboActive] = useState(false);
    const [bossDefeatInfo, setBossDefeatInfo] = useState<BossDefeatInfo | null>(null);
    const [screenShake, setScreenShake] = useState<'light' | 'strong' | null>(null);
    const [screenTint, setScreenTint] = useState<'red' | null>(null);


    // --- REFS FOR UI ELEMENTS ---
    const playerEmojiRef = useRef<HTMLDivElement>(null);
    const enemyEmojiRef = useRef<HTMLDivElement>(null);

    // --- REFS FOR UI TIMERS ---
    const lastManualAttackTime = useRef(Date.now());
    const hintTimerIntervals = useRef([10000, 20000, 60000, 120000]);
    const hintTimerIndex = useRef(0);
    const playerAttackCooldown = useRef(0);
    const playerAttackCounter = useRef(0);
    const enemyAttackCooldown = useRef(0);
    const enemyChargeTimer = useRef(0);

    // --- CALLBACKS FOR STATE UPDATES ---
    const addCombatLog = useCallback((message: string, type: CombatLogMessage['type']) => {
        setCombatLog(prevLog => [{ id: Date.now() + Math.random(), message, type }, ...prevLog.slice(0, 3)]);
    }, []);
    
    const addFloatingText = useCallback((
        text: string,
        isCrit: boolean,
        x: number,
        y: number,
        type: FloatingText['type'],
        dx?: number,
        dy?: number,
        path?: { startX: number; startY: number; deltaX: number; deltaY: number; }
    ) => {
        setFloatingTexts(prev => [...prev, {
            id: Date.now() + Math.random(),
            text,
            isCrit,
            x,
            y,
            type,
            dx,
            dy,
            ...path
        }]);
    }, []);

    // --- EFFECT FOR ATTACK HINT ---
    useEffect(() => {
        const timer = setInterval(() => {
            if (gameState !== 'playing' || showAttackHint || isEnemySpawning) return;
            const timeSinceClick = Date.now() - lastManualAttackTime.current;
            const currentInterval = hintTimerIntervals.current[hintTimerIndex.current];
            if (timeSinceClick > currentInterval) setShowAttackHint(true);
        }, 1000);
        return () => clearInterval(timer);
    }, [gameState, showAttackHint, isEnemySpawning]);

    return {
        combatLog, setCombatLog,
        floatingTexts, setFloatingTexts,
        hitAnimation, setHitAnimation,
        attackAnimation, setAttackAnimation,
        activeUpgradeTab, setActiveUpgradeTab,
        showAttackHint, setShowAttackHint,
        isEnemyCharging, setIsEnemyCharging,
        isEnemyChargingSpecial, setIsEnemyChargingSpecial,
        playerBuffAnimation, setPlayerBuffAnimation,
        isPlayerDying, setIsPlayerDying,
        isComboActive, setIsComboActive,
        bossDefeatInfo, setBossDefeatInfo,
        screenShake, setScreenShake,
        screenTint, setScreenTint,
        lastManualAttackTime,
        hintTimerIntervals,
        hintTimerIndex,
        playerAttackCooldown,
        playerAttackCounter,
        enemyAttackCooldown,
        enemyChargeTimer,
        addCombatLog,
        addFloatingText,
        playerEmojiRef,
        enemyEmojiRef,
    };
};
