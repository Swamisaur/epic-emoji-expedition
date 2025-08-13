/**
 * @file UpgradePanel.tsx
 * @description A major UI component that contains all player upgrade options,
 * organized into tabs. It acts as a controller, rendering the appropriate
 * sub-component for the selected tab.
 */
import React, { useState } from 'react';
import { Upgrade, UpgradeId, SpecialAbilityId, Item, EquippedItems, EquipmentSlot, FormattedPlayerStats, ActiveEffect, GameState, PlayerClassId, ActiveSkillEffect } from '../../types';

// Child Components
import TrainUpgradesTab from './upgrades/TrainUpgradesTab';
import SpecialAbilitiesTab from './upgrades/SpecialAbilitiesTab';
import EquipmentTab from './equipment/EquipmentTab';
import PlayerStatsTab from './upgrades/PlayerStatsTab';

interface UpgradePanelProps {
    playerClassId: PlayerClassId;
    // New props for stats tab
    playerName: string;
    formattedPlayerStats: FormattedPlayerStats;
    hasWonGame: boolean;
    activeEffects: ActiveEffect[];
    activeSkillEffects: ActiveSkillEffect[];
    gameState: GameState;

    coins: number;
    upgrades: Upgrade[];
    onBuy: (upgradeId: UpgradeId, emoji: string) => void;
    onMaxBuy: (upgradeId: UpgradeId, emoji: string) => void;
    stage: number;
    cooldowns: Record<string, number>;
    abilityUses: Record<string, number>;
    onUseSpecialAbility: (id: SpecialAbilityId) => void;
    newUnlockCounts: { train: number; special: number; equipment: number };
    onTabActivated: (tab: TabType) => void;
    onTabChange: (tab: TabType) => void;

    // Equipment props
    inventory: Item[];
    equippedItems: EquippedItems;
    onEquip: (item: Item) => void;
    onUnequip: (slot: EquipmentSlot) => void;
    totalUpgradeLevels: number;
    coreUpgradeVariety: number;
}

// Defines the types of tabs available in the panel.
export type TabType = 'train' | 'special' | 'equipment' | 'info';

// A reusable button component for the bottom tab navigator.
const TabButton: React.FC<{
    label: string;
    emoji: string;
    type: TabType;
    count: number;
    isActive: boolean;
    onClick: (type: TabType) => void;
}> = ({ label, emoji, type, count, isActive, onClick }) => (
    <button
        onClick={() => onClick(type)}
        className={`flex-1 flex flex-col items-center justify-center p-0.5 transition-colors duration-200 focus:outline-none relative h-full ${
            isActive 
            ? 'text-yellow-300' 
            : 'text-gray-400 hover:text-white'
        }`}
        aria-selected={isActive}
        role="tab"
    >
        <div className={`w-full h-full flex flex-col items-center justify-center rounded-md transition-colors duration-300 ${isActive ? 'bg-yellow-500/20' : 'hover:bg-white/10'}`}>
            <span className={`text-2xl transition-transform duration-200 ${count > 0 ? 'animate-icon-flash' : ''}`}>{emoji}</span>
            <span className="text-[10px] font-bold tracking-wider uppercase">{label}</span>
        </div>
        {count > 0 && (
             <span className="absolute top-0 right-1/4 flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-red-500 text-white text-[10px] leading-none transform translate-x-1/2" title={`${count} new item${count > 1 ? 's' : ''}!`}>
                {count}
            </span>
        )}
    </button>
);


const UpgradePanel: React.FC<UpgradePanelProps> = (props) => {
    const { 
        playerClassId, playerName, formattedPlayerStats, hasWonGame, activeEffects, activeSkillEffects, gameState,
        coins, upgrades, onBuy, onMaxBuy, stage, cooldowns, abilityUses, onUseSpecialAbility, newUnlockCounts, onTabActivated, onTabChange,
        inventory, equippedItems, onEquip, onUnequip, totalUpgradeLevels, coreUpgradeVariety
    } = props;

    const [activeTab, setActiveTab] = useState<TabType>('train');

    const handleTabClick = (type: TabType) => {
        setActiveTab(type);
        onTabActivated(type); // Notify parent that the tab was viewed
        onTabChange(type); // Notify parent of tab change for layout purposes
    }

    // Renders the content based on the currently active tab.
    const renderContent = () => {
        switch(activeTab) {
            case 'info':
                return <PlayerStatsTab playerClassId={playerClassId} playerName={playerName} stats={formattedPlayerStats} hasWonGame={hasWonGame} activeEffects={activeEffects} activeSkillEffects={activeSkillEffects} gameState={gameState} upgrades={upgrades} />;
            case 'train':
                return <TrainUpgradesTab upgrades={upgrades} coins={coins} onBuy={onBuy} onMaxBuy={onMaxBuy} totalUpgradeLevels={totalUpgradeLevels} coreUpgradeVariety={coreUpgradeVariety} />;
            case 'special':
                return <SpecialAbilitiesTab playerClassId={playerClassId} stage={stage} coins={coins} cooldowns={cooldowns} onUseSpecialAbility={onUseSpecialAbility} totalUpgradeLevels={totalUpgradeLevels} coreUpgradeVariety={coreUpgradeVariety} abilityUses={abilityUses} />;
            case 'equipment':
                return <EquipmentTab {...{inventory, equippedItems, onEquip, onUnequip, totalUpgradeLevels}} />;
            default:
                return null;
        }
    }

    return (
        <div className="relative liquid-glass-base rounded-b-lg rounded-t-lg shadow-inner h-full flex flex-col-reverse">
            {/* Tab Bar at the bottom */}
            <div className="flex justify-around flex-shrink-0 p-1 bg-gray-900/40 border-t-2 border-black/20" role="tablist" style={{height: '60px'}}>
                <TabButton label="Train" emoji="🏋️" type="train" count={newUnlockCounts.train} isActive={activeTab === 'train'} onClick={handleTabClick} />
                <TabButton label="Skills" emoji="☄️" type="special" count={newUnlockCounts.special} isActive={activeTab === 'special'} onClick={handleTabClick} />
                <TabButton label="Gear" emoji="👘" type="equipment" count={newUnlockCounts.equipment} isActive={activeTab === 'equipment'} onClick={handleTabClick} />
                <TabButton label="Info" emoji="👤" type="info" count={0} isActive={activeTab === 'info'} onClick={handleTabClick} />
            </div>
            {/* Tab Content on top */}
            <div className="p-2 flex-grow min-h-0 overflow-y-auto no-scrollbar">
                {renderContent()}
            </div>
            {/* Simple CSS for the card flip animation based on a class */}
            <style>{`
                .card-inner.is-unlocked {
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    );
};

export default React.memo(UpgradePanel);