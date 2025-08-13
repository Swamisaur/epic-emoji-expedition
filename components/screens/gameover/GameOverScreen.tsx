import React, { useState, useMemo, useEffect, useRef } from 'react';
import { EVOLVE_BONUS_PER_LEVEL, getInitialUpgradesForClass, ALL_CLASSES, ANIMATION_DURATIONS } from '../../constants';
import { Enemy, FormattedPlayerStats, PlayerStats, Upgrade, RealmTheme, Item, PlayerInfo, PlayerClassId } from '../../types';

// Child Components
import GameAnimations from '../../game/GameAnimations';
import RunSummary from './RunSummary';
import GoldCounter from './GoldCounter';
import PrestigeOptions from './PrestigeOptions';
import RealmBackground from '../../ui/RealmBackground';
import WavyText from '../../ui/WavyText';
import UpgradesSummary from './UpgradesSummary';
import RealmProgression from './RealmProgression';
import EquipmentSummary from './EquipmentSummary';
import VolumeControl from '../../ui/VolumeControl';
import TransformationsSummary from './TransformationsSummary';


interface GameOverScreenProps {
    playerInfo: PlayerInfo;
    stats: FormattedPlayerStats;
    initialStats: PlayerStats;
    totalUpgradeLevels: number;
    onEvolve: (newClassId?: PlayerClassId) => void;
    onRetain: () => void;
    onRestart: () => void;
    defeatedEnemies: Enemy[];
    coinsSpent: number;
    totalGoldEarned: number;
    finalCoins: number;
    upgrades: Upgrade[];
    inventory: Item[];
    volume: number;
    setVolume: (volume: number) => void;
    stage: number;
    realmThemeOrder: RealmTheme[];
    ascensionCount: number;
    lineageCount: number;
    unlockedAdvancedClasses: Set<PlayerClassId>;
    newlyUnlockedClass: PlayerClassId | null;
    transformationHistory: string[];
}

const SummaryCard: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => (
    <div className={`liquid-glass-base p-4 rounded-xl shadow-md ${className}`}>
        {children}
    </div>
);

const gameOverTheme: RealmTheme = {
    name: 'Legacy',
    emojis: ['🏆', '🌟', '✨', '📜'],
    // A regal gold color for the emoji pattern to stand out against the dark background.
    color: '45, 80%, 60%',
    minions: [],
    boss: {
        name: 'Legend',
        epithet: 'The End of a Legacy:',
        emoji: '👑',
        attackEmoji: '✨',
        specialAttack: {
            emoji: '📜',
            damageMultiplier: 1,
            chargeTime: 1000,
        },
    },
};

interface SummaryCardData {
    id: string;
    title: string;
    stat?: number | string;
    content: React.ReactNode;
    duration: number;
}


const GameOverScreen: React.FC<GameOverScreenProps> = (props) => {
    const { 
        playerInfo, stats, initialStats, totalUpgradeLevels, onEvolve, onRetain, onRestart,
        defeatedEnemies, coinsSpent, totalGoldEarned, finalCoins, upgrades, inventory, volume, setVolume,
        stage, realmThemeOrder, ascensionCount, lineageCount, unlockedAdvancedClasses, newlyUnlockedClass, transformationHistory
    } = props;
    
    const [view, setView] = useState(1); // 1: Summary, 2: Prestige
    const [summaryStep, setSummaryStep] = useState(0); // For sequential card animation
    const [confirmRestart, setConfirmRestart] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    
    // Refs for auto-scrolling functionality
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleExit = (callback: () => void) => {
        setIsExiting(true);
        setTimeout(callback, ANIMATION_DURATIONS.SCREEN_FADE_OUT); // Match animation duration
    };

    const handleRestartClick = () => {
        if (confirmRestart) {
            handleExit(onRestart);
        } else {
            setConfirmRestart(true);
            setTimeout(() => setConfirmRestart(false), 3000);
        }
    };
    
    const handleRetainClick = () => handleExit(onRetain);
    const handleEvolveClick = (newClassId?: PlayerClassId) => {
        handleExit(() => onEvolve(newClassId));
    };


    // Derived state for upgrades, calculated once.
    const purchasedUpgrades = useMemo(() => {
        const initialUpgradesForClass = getInitialUpgradesForClass(playerInfo.playerClassId);
        return upgrades
        .map(runUpgrade => {
            const initialUpgrade = initialUpgradesForClass.find(u => u.id === runUpgrade.id);
            if (!initialUpgrade) return null;
            const levelsBought = runUpgrade.level - initialUpgrade.level;
            if (levelsBought <= 0) return null;
            
            return {
                id: runUpgrade.id,
                name: runUpgrade.name,
                emoji: runUpgrade.emoji,
                levels: levelsBought,
            };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)
    }, [upgrades, playerInfo.playerClassId]);
    
    const hasUpgrades = purchasedUpgrades.length > 0;

    const realmsVisitedCount = useMemo(() => Math.max(0, stage - 1), [stage]);
    
    const summaryCards = useMemo(() => {
        const cards: SummaryCardData[] = [];
        
        cards.push({
            id: 'progression',
            title: `${playerInfo.name}'s Journey`,
            content: <RealmProgression playerEmoji={playerInfo.displayEmoji} realmsVisitedCount={realmsVisitedCount} fullRealmOrder={realmThemeOrder} startAnimation={summaryStep > cards.length} ascensionCount={ascensionCount} />,
            // Animation time includes player travel and a final pause.
            duration: 800 + (realmsVisitedCount + 1) * 400 + 1000,
        });
        
        // Use a string for gold so it doesn't show the side-counter
        cards.push({ id: 'gold', title: 'Gold Plundered', stat: '', content: <GoldCounter totalGoldEarned={totalGoldEarned} startAnimation={summaryStep > cards.length} />, duration: Math.max(1500, Math.min(3000, 200 + totalGoldEarned * 5)) });

        if (defeatedEnemies.length > 0) {
            cards.push({ id: 'monsters', title: 'Monsters Slain', stat: defeatedEnemies.length, content: <RunSummary defeatedEnemies={defeatedEnemies} startAnimation={summaryStep > cards.length} />, duration: defeatedEnemies.length * 80 + 1200 });
        }

        if (transformationHistory.length > 0) {
            cards.push({
                id: 'transformations',
                title: 'Transformations',
                stat: transformationHistory.length,
                content: <TransformationsSummary 
                            transformations={transformationHistory} 
                            startAnimation={summaryStep > cards.length}
                            playerClassId={playerInfo.playerClassId}
                         />,
                duration: transformationHistory.length * 250 + 800,
            });
        }

        if (hasUpgrades) {
            cards.push({ id: 'upgrades', title: 'Upgrades Gained', stat: purchasedUpgrades.length, content: <UpgradesSummary purchasedUpgrades={purchasedUpgrades} startAnimation={summaryStep > cards.length} />, duration: purchasedUpgrades.length * 150 + 800 });
        }
        
        if (inventory.length > 0) {
            cards.push({
                id: 'equipment',
                title: 'Equipment Gained',
                stat: inventory.length,
                content: <EquipmentSummary foundItems={inventory} startAnimation={summaryStep > cards.length} />,
                duration: inventory.length * 250 + 1200,
            });
        }

        return cards;
    }, [playerInfo.name, playerInfo.playerClassId, playerInfo.displayEmoji, realmsVisitedCount, realmThemeOrder, totalGoldEarned, defeatedEnemies, hasUpgrades, purchasedUpgrades, inventory, summaryStep, ascensionCount, transformationHistory]);

    // This effect controls the sequential revealing of the summary cards.
    useEffect(() => {
        if (view !== 1 || summaryStep >= summaryCards.length) return;

        const currentCard = summaryCards[summaryStep];
        if (!currentCard) return;

        // Set a timer to advance to the next step after the current card's animation duration.
        const advanceTimer = setTimeout(() => {
            setSummaryStep(s => s + 1);
        }, currentCard.duration);

        return () => {
            clearTimeout(advanceTimer);
        };
    }, [view, summaryStep, summaryCards]);

    // Effect to auto-scroll to the latest revealed card, adjusting for dynamic height changes.
    useEffect(() => {
        const cardIndex = summaryStep -1;
        if (cardIndex < 0 || view !== 1) return;

        const cardToScrollTo = cardRefs.current[cardIndex];
        
        if (cardToScrollTo && scrollContainerRef.current) {
            // Use ResizeObserver to keep scrolling to the bottom of the card as it grows.
            const observer = new ResizeObserver(() => {
                cardToScrollTo.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                });
            });

            observer.observe(cardToScrollTo);

            // Initial scroll, with a small delay for fade-in
            const timeoutId = setTimeout(() => {
                cardToScrollTo.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                });
            }, 150);

            // Cleanup: stop observing when the component unmounts or summaryStep changes
            return () => {
                clearTimeout(timeoutId);
                observer.disconnect();
            };
        }
    }, [summaryStep, view]);


    // Derived state for prestige options
    const currentBonus = stats.evolveBonus ? parseFloat(stats.evolveBonus.replace(/[+%]/g, '')) / 100 : 0;
    const baseAddedBonus = totalUpgradeLevels * EVOLVE_BONUS_PER_LEVEL;
    const goldBonusAmount = Math.floor(finalCoins / 100) * 0.002; // +0.2% per 100 gold
    const totalAddedBonus = baseAddedBonus + goldBonusAmount;
    const newTotalBonus = currentBonus + totalAddedBonus;

    const goldBonusForRetain = Math.floor(finalCoins / 100) * 0.002;


    const renderContent = () => {
        if (view === 1) {
            return (
                <div className="flex flex-col h-full text-center text-white">
                    {/* Fixed Header */}
                    <div className="flex-shrink-0 pt-8 pb-4 z-20 px-4">
                         <div className="max-w-md mx-auto">
                            <div className="relative z-10 text-yellow-400 text-center" style={{ textShadow: '2px 2px 0 #92400e, 4px 4px 0 #78350f, 6px 6px 0 #451a03, 8px 8px 10px rgba(0,0,0,0.5)' }}>
                                <div className="inline-block text-left">
                                    <WavyText text="Your Legend" className="text-6xl sm:text-7xl" style={{ lineHeight: 1.2 }} staggerMs={60} />
                                    <WavyText text="Grows..." className="text-7xl sm:text-8xl" style={{ lineHeight: 1 }} staggerMs={60} delayOffset={"Your Legend".length} />
                                </div>
                            </div>
                            <p className="text-sm mt-2 text-gray-300">📜 Every end is a new beginning on the path of power. ✨</p>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div ref={scrollContainerRef} className="flex-grow overflow-y-auto no-scrollbar px-4">
                       <div className="flex flex-col gap-4 max-w-md mx-auto">
                           {summaryCards.map((card, index) => (
                               <div 
                                    key={card.id}
                                    ref={el => { if (el) cardRefs.current[index] = el; }}
                                    className={`transition-all duration-500 ease-out ${summaryStep > index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                >
                                   <SummaryCard>
                                       <div className="flex justify-between items-center mb-2">
                                           <h3 className="font-title text-xl text-amber-200">{card.title}</h3>
                                           {card.stat !== undefined && card.stat !== '' && <div className="text-xl font-bold text-white">{card.stat.toLocaleString()}</div>}
                                       </div>
                                       {card.content}
                                   </SummaryCard>
                               </div>
                           ))}
                       </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className={`mt-auto p-4 transition-opacity duration-500 flex-shrink-0 z-20 ${summaryStep >= summaryCards.length ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        {totalUpgradeLevels > 0 ? (
                             <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
                                <button
                                    onClick={() => setView(2)}
                                    className="font-title w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg shadow-lg flex items-center justify-center gap-2"
                                >
                                    <span className="text-2xl">{playerInfo.displayEmoji}</span> Make {playerInfo.baseName} Stronger
                                </button>
                                <button
                                    onClick={handleRestartClick}
                                    className={`font-title w-full py-2 px-3 rounded-lg transition-all duration-200 text-sm shadow-lg flex items-center justify-center gap-2 ${
                                        confirmRestart 
                                        ? 'bg-red-700 hover:bg-red-600 focus:ring-red-500 text-white' 
                                        : 'bg-gray-400 text-black hover:bg-gray-300 focus:ring-gray-600'
                                    }`}
                                >
                                    {confirmRestart ? 'Are you sure?' : '👤 Start a New Game'}
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 w-full max-w-sm mx-auto">
                                <button
                                    onClick={handleRetainClick}
                                    className="font-title w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-lg flex items-center justify-center gap-2"
                                >
                                    <span className="text-xl">{playerInfo.displayEmoji}</span> {playerInfo.name} heads out again
                                </button>
                                 {goldBonusForRetain > 0 && (
                                    <p className="text-sm text-green-300 -mt-1 animate-pulse">
                                        You'll also gain a permanent +{(goldBonusForRetain * 100).toFixed(2)}% bonus from your treasure!
                                    </p>
                                )}
                                <button
                                    onClick={() => handleExit(onRestart)}
                                    className="font-title w-full bg-gray-700 text-white py-2 px-3 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm flex items-center justify-center gap-2 shadow-lg"
                                >
                                    👤 New Hero
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (view === 2 && totalUpgradeLevels > 0) {
             return (
                <div className="flex flex-col h-full animate-fade-in p-3 md:p-4 text-center">
                    <div className="flex flex-col items-center flex-shrink-0">
                        <WavyText 
                            text="You Rise Stronger" 
                            className="text-4xl text-green-300"
                            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                            staggerMs={50}
                        />
                        <p className="text-gray-300 text-sm mt-1 mb-4">Embrace the cycle. Your power grows with every lifetime.</p>
                    </div>

                    <PrestigeOptions
                        baseAddedBonus={baseAddedBonus}
                        goldBonusAmount={goldBonusAmount}
                        initialStats={initialStats}
                        newTotalBonus={newTotalBonus}
                        coinsSpent={coinsSpent}
                        onEvolve={handleEvolveClick}
                        onRetain={handleRetainClick}
                        purchasedUpgrades={purchasedUpgrades}
                        playerName={playerInfo.baseName}
                        lineageCount={lineageCount}
                        playerSkinTone={playerInfo.skinTone}
                        playerClassId={playerInfo.playerClassId}
                        unlockedAdvancedClasses={unlockedAdvancedClasses}
                        newlyUnlockedClass={newlyUnlockedClass}
                    />
                </div>
             );
        }
        return null;
    }

    return (
        <div 
            className={`fixed inset-0 bg-gray-900 flex items-center justify-center z-50 p-2 max-h-screen overflow-hidden ${isExiting ? 'animate-fade-out' : 'animate-fade-in'}`}
        >
            <GameAnimations />
            <RealmBackground themeOverride={gameOverTheme} direction="vertical-down" />

            <div className="absolute top-4 left-4 z-30">
                <VolumeControl volume={volume} setVolume={setVolume} layout="icon-only" />
            </div>

            <div className="relative z-10 w-full max-w-lg text-center transform animate-slide-up h-full max-h-[95vh] flex flex-col">
                 <div className="liquid-glass-base rounded-2xl shadow-2xl w-full h-full flex flex-col relative overflow-hidden">
                    {/* Hexagonal Borders */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                        <div className="absolute inset-[10px] border-2 border-amber-200" style={{ 
                            clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                            animation: 'hex-border-spin 120s linear infinite'
                        }}></div>
                        <div className="absolute inset-[14px] border border-amber-200" style={{ 
                            clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                            animation: 'hex-border-spin 120s linear infinite reverse'
                        }}></div>
                    </div>
                    {/* Content Wrapper */}
                    <div className="relative z-10 flex flex-col flex-grow min-h-0">
                        {renderContent()}
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default React.memo(GameOverScreen);