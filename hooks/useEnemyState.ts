/**
 * @file useEnemyState.ts
 * @description Manages the state for the current enemy.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Enemy, RealmTheme } from '../types';
import { generateEnemy } from '../utils/enemyLogic';

interface UseEnemyStateProps {
    isLoading: boolean;
    ascensionCount: number;
    stage: number;
    realmThemeOrder: RealmTheme[];
}

export const useEnemyState = ({ isLoading, ascensionCount, stage, realmThemeOrder }: UseEnemyStateProps) => {
    const [currentEnemy, setCurrentEnemyInternal] = useState<Enemy | null>(null);
    const [isEnemyDying, setIsEnemyDying] = useState(false);
    const [isEnemySpawning, setIsEnemySpawning] = useState(true);
    const processedEnemyIds = useRef(new Set<string>());

    // Wrap the setter to automatically manage the spawning state
    const setCurrentEnemy = useCallback((enemyUpdater: React.SetStateAction<Enemy | null>) => {
        setCurrentEnemyInternal(prevEnemy => {
            const newEnemy = typeof enemyUpdater === 'function' ? (enemyUpdater as (prevState: Enemy | null) => Enemy | null)(prevEnemy) : enemyUpdater;
            
            // This is the key logic: only trigger spawn animation for a NEW enemy.
            if (newEnemy?.id !== prevEnemy?.id) {
                setIsEnemySpawning(true);
            }

            return newEnemy;
        });
    }, []);

    // Initial enemy generation
    useEffect(() => {
        if (!isLoading && !currentEnemy) {
            const theme = realmThemeOrder[(stage - 1) % realmThemeOrder.length];
            // Use internal setter here to avoid an infinite loop and unnecessary spawn state flip
            setCurrentEnemyInternal(() => generateEnemy(stage, 1, theme, ascensionCount));
        }
    }, [isLoading, currentEnemy, stage, realmThemeOrder, ascensionCount]);

    return {
        currentEnemy, setCurrentEnemy,
        isEnemyDying, setIsEnemyDying,
        isEnemySpawning, setIsEnemySpawning,
        processedEnemyIds,
    };
};