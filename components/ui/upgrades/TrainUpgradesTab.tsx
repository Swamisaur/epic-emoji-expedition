/**
 * @file TrainUpgradesTab.tsx
 * @description Renders the grid of all stat upgrades, categorized into Core and Advanced.
 */
import React, { useMemo } from 'react';
import { Upgrade, UpgradeId } from '../../../types';
import { isUnlocked } from '../../../utils/unlockLogic';
import UpgradeButton from '../UpgradeButton';

interface TrainUpgradesTabProps {
    upgrades: Upgrade[];
    coins: number;
    onBuy: (upgradeId: UpgradeId, emoji: string) => void;
    onMaxBuy: (upgradeId: UpgradeId, emoji: string) => void;
    totalUpgradeLevels: number;
    coreUpgradeVariety: number;
}

const TrainUpgradesTab: React.FC<TrainUpgradesTabProps> = ({ upgrades, coins, onBuy, onMaxBuy, totalUpgradeLevels, coreUpgradeVariety }) => {
    const playerProgress = { totalUpgradeLevels, coreUpgradeVariety };

    const { coreUpgrades, grindUpgrades } = useMemo(() => {
        const core = upgrades.filter(u => u.category === 'core');
        const grind = upgrades.filter(u => u.category === 'grind');
        // The default order from class definitions is intentional and looks good.
        return { coreUpgrades: core, grindUpgrades: grind };
    }, [upgrades]);

    return (
        <div className="flex flex-col gap-3 w-full" role="tabpanel">
            {/* Core Training Section */}
            <div className="grid grid-cols-2 gap-3 content-start items-stretch">
                {coreUpgrades.map(upgrade => (
                    <UpgradeButton 
                        key={upgrade.id}
                        upgrade={upgrade} 
                        coins={coins} 
                        onBuy={onBuy} 
                        onMaxBuy={onMaxBuy}
                        isLocked={!isUnlocked(upgrade, playerProgress)}
                    />
                ))}
            </div>

            {/* Advanced Training Section */}
            {grindUpgrades.length > 0 && (
                <>
                    <h4 className="font-title text-sm text-yellow-300 text-center tracking-widest py-1 my-1 border-t border-b border-gray-700/50">
                        ADVANCED
                    </h4>
                    <div className="grid grid-cols-2 gap-3 content-start items-stretch">
                        {grindUpgrades.map(upgrade => (
                            <UpgradeButton 
                                key={upgrade.id}
                                upgrade={upgrade} 
                                coins={coins} 
                                onBuy={onBuy} 
                                onMaxBuy={onMaxBuy}
                                isLocked={!isUnlocked(upgrade, playerProgress)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default TrainUpgradesTab;