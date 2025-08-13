

/**
 * @file UpgradesSummary.tsx
 * @description Displays the stat upgrades purchased during the run with a sequential animation.
 */
import React, { useState, useEffect, useMemo } from 'react';
import MiniUpgradeCard, { PurchasedUpgrade } from './MiniUpgradeCard';

interface UpgradesSummaryProps {
    purchasedUpgrades: PurchasedUpgrade[];
    startAnimation: boolean;
}

const UpgradesSummary: React.FC<UpgradesSummaryProps> = ({ purchasedUpgrades, startAnimation }) => {
    const [revealedUpgrades, setRevealedUpgrades] = useState<PurchasedUpgrade[]>([]);

    useEffect(() => {
        if (!startAnimation || purchasedUpgrades.length === 0) return;

        const timeouts: number[] = [];
        purchasedUpgrades.forEach((upgrade, index) => {
            const timeout = window.setTimeout(() => {
                setRevealedUpgrades(prev => [...prev, upgrade]);
            }, index * 200); // 200ms delay between each card appearing
            timeouts.push(timeout);
        });
        
        return () => timeouts.forEach(clearTimeout);
    }, [purchasedUpgrades, startAnimation]);

    if (purchasedUpgrades.length === 0) {
        return <p className="text-gray-500 text-sm italic w-full text-center py-4">No upgrades were purchased.</p>;
    }

    return (
        <div className="grid grid-cols-3 gap-2 bg-black/20 p-2 rounded-lg">
            {revealedUpgrades.map(upgrade => (
                <div key={upgrade.id} className="animate-vanquished-enemy">
                    <MiniUpgradeCard upgrade={upgrade} />
                </div>
            ))}
        </div>
    );
};

export default UpgradesSummary;
