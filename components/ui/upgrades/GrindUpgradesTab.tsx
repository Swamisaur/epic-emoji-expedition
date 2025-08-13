/**
 * @file GrindUpgradesTab.tsx
 * @description Renders the grid of "Grind" (percent/passive) upgrades.
 */
import React from 'react';
import { Upgrade, UpgradeId } from '../../../types';
import { isUnlocked } from '../../../utils/unlockLogic';
import UpgradeButton from '../UpgradeButton';

interface GrindUpgradesTabProps {
    upgrades: Upgrade[];
    coins: number;
    onBuy: (upgradeId: UpgradeId, emoji: string) => void;
    onMaxBuy: (upgradeId: UpgradeId, emoji: string) => void;
    totalUpgradeLevels: number;
    coreUpgradeVariety: number;
}

const GrindUpgradesTab: React.FC<GrindUpgradesTabProps> = ({ upgrades, coins, onBuy, onMaxBuy, totalUpgradeLevels, coreUpgradeVariety }) => {
    const playerProgress = { totalUpgradeLevels, coreUpgradeVariety };
    
    return (
        <div className="w-full h-full overflow-y-auto no-scrollbar grid grid-cols-2 gap-3 items-start" role="tabpanel">
            {upgrades.map(upgrade => (
                <div key={upgrade.id}>
                    <UpgradeButton 
                        upgrade={upgrade} 
                        coins={coins} 
                        onBuy={onBuy} 
                        onMaxBuy={onMaxBuy}
                        isLocked={!isUnlocked(upgrade, playerProgress)}
                    />
                </div>
            ))}
        </div>
    );
};

export default GrindUpgradesTab;