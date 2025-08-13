/**
 * @file useRunState.ts
 * @description Manages the state related to a single game run, including progression and stats.
 */
import { useState } from 'react';
import { GameState, Enemy, RealmTheme, GameEvent } from '../types';
import { REALM_THEMES } from '../constants';

export const useRunState = () => {
    const [gameState, setGameState] = useState<GameState>('playing');
    const [coins, setCoins] = useState<number>(0);
    const [stage, setStage] = useState<number>(1);
    const [subStage, setSubStage] = useState<number>(1);
    const [defeatedEnemies, setDefeatedEnemies] = useState<Enemy[]>([]);
    const [coinsSpentThisRun, setCoinsSpentThisRun] = useState<number>(0);
    const [totalGoldEarnedThisRun, setTotalGoldEarnedThisRun] = useState<number>(0);
    const [realmThemeOrder, setRealmThemeOrder] = useState<RealmTheme[]>(REALM_THEMES);
    const [isEnteringRealm, setIsEnteringRealm] = useState<boolean>(false);
    const [transformationHistory, setTransformationHistory] = useState<string[]>([]);
    
    // --- EVENT STATE ---
    const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);
    const [eventsThisRealm, setEventsThisRealm] = useState<number>(0);
    const [triggeredEventIds, setTriggeredEventIds] = useState<Set<string>>(new Set());
    const [eventTriggerSubstages, setEventTriggerSubstages] = useState<Set<number>>(new Set());
    const [isEventExiting, setIsEventExiting] = useState<boolean>(false);


    return {
        gameState, setGameState,
        coins, setCoins,
        stage, setStage,
        subStage, setSubStage,
        defeatedEnemies, setDefeatedEnemies,
        coinsSpentThisRun, setCoinsSpentThisRun,
        totalGoldEarnedThisRun, setTotalGoldEarnedThisRun,
        realmThemeOrder, setRealmThemeOrder,
        isEnteringRealm, setIsEnteringRealm,
        transformationHistory, setTransformationHistory,
        activeEvent, setActiveEvent,
        eventsThisRealm, setEventsThisRealm,
        triggeredEventIds, setTriggeredEventIds,
        eventTriggerSubstages, setEventTriggerSubstages,
        isEventExiting, setIsEventExiting,
    };
};