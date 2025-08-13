/**
 * @file useUpgradeActions.ts
 * @description A hook for handling player actions related to purchasing upgrades.
 */
import { useCallback } from 'react';
import { Upgrade, UpgradeId, CombatLogMessage, FloatingText } from '../../types';

interface UseUpgradeActionsProps {
    coins: number;
    upgrades: Upgrade[];
    setCoins: React.Dispatch<React.SetStateAction<number>>;
    setCoinsSpentThisRun: React.Dispatch<React.SetStateAction<number>>;
    setUpgrades: React.Dispatch<React.SetStateAction<Upgrade[]>>;
    addCombatLog: (message: string, type: CombatLogMessage['type']) => void;
    addFloatingText: (text: string, isCrit: boolean, x: number, y: number, type: FloatingText['type'], dx?: number, dy?: number) => void;
}

export const useUpgradeActions = ({
    coins,
    upgrades,
    setCoins,
    setCoinsSpentThisRun,
    setUpgrades,
    addCombatLog,
    addFloatingText,
}: UseUpgradeActionsProps) => {
    const handleBuyUpgrade = useCallback((upgradeId: UpgradeId, upgradeEmoji: string) => {
        const upgradeToBuy = upgrades.find(u => u.id === upgradeId);
        if (!upgradeToBuy || coins < upgradeToBuy.cost) return;

        setCoins(c => c - upgradeToBuy.cost);
        setCoinsSpentThisRun(prev => prev + upgradeToBuy.cost);

        const newLevel = upgradeToBuy.level + 1;
        setUpgrades(upgrades.map(u =>
            u.id === upgradeId ? { ...u, level: newLevel, cost: Math.floor(u.baseCost * Math.pow(u.costIncreaseFactor, u.level)) } : u
        ));

        // Emoji burst on player character for every purchase
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * 50 + 20;
            const dx = Math.cos(angle) * radius;
            const dy = Math.sin(angle) * radius;
            addFloatingText(upgradeEmoji, false, 25, 28, 'burst', dx, dy);
        }

        // Add a special log for every 10 levels purchased.
        if (newLevel > 1 && newLevel % 10 === 0) {
            addCombatLog(`Power-Up! ${upgradeToBuy.name} reached level ${newLevel}!`, 'special');
        }
    }, [coins, upgrades, addCombatLog, addFloatingText, setCoins, setCoinsSpentThisRun, setUpgrades]);

    const handleMaxBuyUpgrade = useCallback((upgradeId: UpgradeId, upgradeEmoji: string) => {
        const upgradeToBuy = upgrades.find(u => u.id === upgradeId);
        if (!upgradeToBuy || coins < upgradeToBuy.cost) return;

        let availableCoins = coins;
        let levelsBought = 0;
        let totalCost = 0;
        let currentLevel = upgradeToBuy.level;
        let costForNextLevel = upgradeToBuy.cost;

        while (availableCoins >= costForNextLevel) {
            availableCoins -= costForNextLevel;
            totalCost += costForNextLevel;
            levelsBought++;
            currentLevel++;
            
            // The cost to buy level (currentLevel) is baseCost * factor^((currentLevel)-1)
            costForNextLevel = Math.floor(upgradeToBuy.baseCost * Math.pow(upgradeToBuy.costIncreaseFactor, currentLevel - 1));
        }

        if (levelsBought > 0) {
            setCoins(c => c - totalCost);
            setCoinsSpentThisRun(prev => prev + totalCost);
            
            setUpgrades(currentUpgrades => currentUpgrades.map(u => 
                u.id === upgradeId 
                    ? { ...u, level: u.level + levelsBought, cost: costForNextLevel } 
                    : u
            ));

            addFloatingText(`+${levelsBought} Lvl!`, true, 25, 28, 'bonus');
            addCombatLog(`Maxed out ${upgradeToBuy.name}! Purchased ${levelsBought} levels.`, 'special');
        }
    }, [coins, upgrades, setCoins, setCoinsSpentThisRun, setUpgrades, addFloatingText, addCombatLog]);

    return { handleBuyUpgrade, handleMaxBuyUpgrade };
};