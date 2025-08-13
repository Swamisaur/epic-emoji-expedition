/**
 * @file PrestigeOptions.tsx
 * @description A component that holds the different prestige options ("Rebirth", "Vengeance")
 * available to the player on the game over screen.
 */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PlayerStats, PlayerClassId } from '../../../types';
import { ALL_CLASSES } from '../../../constants';

// Child Components
import PrestigeCard from './PrestigeCard';
import AnimatedStatLine from './AnimatedStatLine';
import UpgradesSummary from './UpgradesSummary';
import { PurchasedUpgrade } from './MiniUpgradeCard';
import { numberToRoman } from '../../../utils/formatters';
import ClassCard from '../../ui/ClassCard';


interface PrestigeOptionsProps {
    baseAddedBonus: number;
    goldBonusAmount: number;
    initialStats: PlayerStats;
    newTotalBonus: number;
    coinsSpent: number;
    onEvolve: (newClassId?: PlayerClassId) => void;
    onRetain: () => void;
    purchasedUpgrades: PurchasedUpgrade[];
    playerName: string; // This should be the player's baseName
    lineageCount: number;
    playerSkinTone: string;
    playerClassId: PlayerClassId;
    unlockedAdvancedClasses: Set<PlayerClassId>;
    newlyUnlockedClass: PlayerClassId | null;
}

const PrestigeOptions: React.FC<PrestigeOptionsProps> = (props) => {
    const {
        baseAddedBonus, goldBonusAmount, initialStats, newTotalBonus,
        onEvolve, onRetain, purchasedUpgrades, coinsSpent,
        playerName, lineageCount, playerSkinTone, playerClassId, unlockedAdvancedClasses,
        newlyUnlockedClass
    } = props;
    
    const [animationStep, setAnimationStep] = useState(0);
    const [isChangingClass, setIsChangingClass] = useState(false);
    
    const [selectedClassId, setSelectedClassId] = useState<PlayerClassId>(() => {
        if (newlyUnlockedClass) {
            return newlyUnlockedClass;
        }
        const currentClass = ALL_CLASSES.find(c => c.id === playerClassId);
        if (!currentClass) {
            return playerClassId;
        }
        if (currentClass.tier === 'advanced') {
            return playerClassId;
        }
        const advancedClass = ALL_CLASSES.find(c => c.baseClassId === currentClass.id);
        if (advancedClass && unlockedAdvancedClasses.has(advancedClass.id)) {
            return advancedClass.id;
        }
        return playerClassId;
    });

    // Refs and logic for the class selection carousel
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const dragInfo = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

    useEffect(() => {
        const timeouts: number[] = [];
        // Animation sequence for the prestige screen
        timeouts.push(window.setTimeout(() => setAnimationStep(1), 300)); // Rebirth card appears
        timeouts.push(window.setTimeout(() => setAnimationStep(2), 800)); // Rebirth content animates
        timeouts.push(window.setTimeout(() => setAnimationStep(3), 1200)); // Vengeance card appears
        timeouts.push(window.setTimeout(() => setAnimationStep(4), 1700)); // Vengeance content animates

        return () => timeouts.forEach(clearTimeout);
    }, []);

    const handleConfirmClassChange = () => {
        setIsChangingClass(false);
    };

    const handleCancelClassChange = () => {
        setIsChangingClass(false);
        setSelectedClassId(playerClassId); // Revert selection to original class
    };

    const selectedClassDetails = ALL_CLASSES.find(c => c.id === selectedClassId) || ALL_CLASSES[0];
    const animationDuration = 1500;
    const totalAddedBonus = baseAddedBonus + goldBonusAmount;

    const allClassOptions = useMemo(() => {
        return [...ALL_CLASSES].sort((a, b) => {
            const isALocked = a.tier === 'advanced' && !unlockedAdvancedClasses.has(a.id);
            const isBLocked = b.tier === 'advanced' && !unlockedAdvancedClasses.has(b.id);
            if (isALocked === isBLocked) return 0;
            return isALocked ? 1 : -1;
        });
    }, [unlockedAdvancedClasses]);

    const handleClassSelect = (classId: PlayerClassId, index: number) => {
        setSelectedClassId(classId);
        cardRefs.current[index]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
        });
    };

    const selectedClassIndex = allClassOptions.findIndex(c => c.id === selectedClassId);

    const handlePrevClass = () => {
        let newIndex = selectedClassIndex - 1;
        while (newIndex >= 0) {
            const isLocked = allClassOptions[newIndex].tier === 'advanced' && !unlockedAdvancedClasses.has(allClassOptions[newIndex].id);
            if (!isLocked) {
                handleClassSelect(allClassOptions[newIndex].id, newIndex);
                return;
            }
            newIndex--;
        }
    };

    const handleNextClass = () => {
        let newIndex = selectedClassIndex + 1;
        while (newIndex < allClassOptions.length) {
            const isLocked = allClassOptions[newIndex].tier === 'advanced' && !unlockedAdvancedClasses.has(allClassOptions[newIndex].id);
            if (!isLocked) {
                handleClassSelect(allClassOptions[newIndex].id, newIndex);
                return;
            }
            newIndex++;
        }
    };

    const isPrevDisabled = useMemo(() => {
        const prevSelectableIndex = allClassOptions.slice(0, selectedClassIndex).reverse().findIndex(c => c.tier !== 'advanced' || unlockedAdvancedClasses.has(c.id));
        return prevSelectableIndex === -1;
    }, [selectedClassIndex, allClassOptions, unlockedAdvancedClasses]);

    const isNextDisabled = useMemo(() => {
        const nextSelectableIndex = allClassOptions.findIndex((c, i) => i > selectedClassIndex && (c.tier !== 'advanced' || unlockedAdvancedClasses.has(c.id)));
        return nextSelectableIndex === -1;
    }, [selectedClassIndex, allClassOptions, unlockedAdvancedClasses]);

    // Drag-to-scroll Logic
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const carousel = scrollContainerRef.current;
        if (!carousel) return;
        dragInfo.current = { isDragging: true, startX: e.pageX - carousel.offsetLeft, scrollLeft: carousel.scrollLeft };
        carousel.style.cursor = 'grabbing';
        carousel.style.scrollSnapType = 'none';
        document.body.style.userSelect = 'none';
    };
    const handleMouseLeaveOrUp = () => {
        const carousel = scrollContainerRef.current;
        if (!dragInfo.current.isDragging) return;
        dragInfo.current.isDragging = false;
        if (carousel) {
            carousel.style.cursor = 'grab';
            carousel.style.scrollSnapType = 'x mandatory';
        }
        document.body.style.userSelect = '';
    };
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!dragInfo.current.isDragging) return;
        e.preventDefault();
        const carousel = scrollContainerRef.current;
        if (!carousel) return;
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - dragInfo.current.startX);
        carousel.scrollLeft = dragInfo.current.scrollLeft - walk;
    };

    const rebirthDescription = (
        <div className="text-sm text-gray-300 mb-2 text-left">
             <p>Emerge with a permanent <AnimatedStatLine startAnimation={animationStep >= 2} start={0} end={totalAddedBonus * 100} duration={animationDuration} decimals={2} suffix="%" highlightClass="text-green-300" /> boost to find rare loot.</p>
             <div className="text-xs text-gray-400 mt-1 pl-4">
                <p>From Upgrades 💪: <span className="text-green-400 font-semibold">+{(baseAddedBonus * 100).toFixed(2)}%</span></p>
                {goldBonusAmount > 0 && (
                    <p>From Treasure 💰: <AnimatedStatLine startAnimation={animationStep >= 2} start={0} end={goldBonusAmount * 100} duration={animationDuration} decimals={2} prefix="+" suffix="%" highlightClass="text-yellow-300 font-semibold" /></p>
                )}
            </div>
            <p className="mt-2">Your new starting might:</p>
            <ul className="list-disc list-inside text-gray-400 text-sm leading-tight mt-1">
                <AnimatedStatLine startAnimation={animationStep >= 2} delay={200} label="❤️ Vitality:" start={initialStats.maxHealth} end={Math.ceil(initialStats.maxHealth * (1 + newTotalBonus))} duration={animationDuration} />
                <AnimatedStatLine startAnimation={animationStep >= 2} delay={300} label="🔥 Strength:" start={initialStats.attackPower} end={Math.ceil(initialStats.attackPower * (1 + newTotalBonus))} duration={animationDuration} />
                <AnimatedStatLine startAnimation={animationStep >= 2} delay={400} label="⚡️ Atk Speed:" start={initialStats.attackSpeed} end={initialStats.attackSpeed * (1 + newTotalBonus)} duration={animationDuration} decimals={2} />
                <AnimatedStatLine startAnimation={animationStep >= 2} delay={500} label="🎯 Crit Chance:" start={initialStats.critChance * 100} end={(initialStats.critChance + newTotalBonus) * 100} duration={animationDuration} decimals={0} suffix="%" />
                <AnimatedStatLine startAnimation={animationStep >= 2} delay={600} label="💥 Crit Damage:" start={initialStats.critDamage * 100} end={(initialStats.critDamage + newTotalBonus) * 100} duration={animationDuration} decimals={0} suffix="%" />
                <AnimatedStatLine startAnimation={animationStep >= 2} delay={700} label="🍀 Fortune:" start={(initialStats.luck - 1) * 100} end={((initialStats.luck - 1) + newTotalBonus) * 100} duration={animationDuration} decimals={0} prefix="+" suffix="%" />
            </ul>
            <div className="mt-3 bg-black/20 p-2 rounded-md border border-gray-600/50">
                <div className="text-xs text-gray-400">CLASS FOR NEXT RUN</div>
                <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white truncate">{selectedClassDetails.name} {selectedClassDetails.emoji}</span>
                    <button 
                        onClick={() => setIsChangingClass(true)}
                        className="text-xs bg-purple-600 hover:bg-purple-500 text-white font-bold py-1 px-2 rounded transition-colors duration-200"
                    >
                        Change
                    </button>
                </div>
            </div>
        </div>
    );

    const vengeanceDescription = (
        <div className="text-sm text-gray-300 mb-2 text-left">
            <p>Return to the fight with your current power. No ascension bonus will be gained.</p>
            <p className="mt-2 mb-1">Your investment this run: <span className="font-bold text-yellow-300">💰 {coinsSpent.toLocaleString()}</span></p>
            
            {/* Wrapper for upgrades list with fade-out effect. Increased height and made scrollable. */}
            <div className="relative max-h-60 overflow-y-auto no-scrollbar">
                <UpgradesSummary purchasedUpgrades={purchasedUpgrades} startAnimation={animationStep >= 4} />
                
                {/* 
                  Fade-out overlay to blend with the card background.
                  Using `sticky` positioning ensures it stays at the bottom of the scrollable container.
                */}
                <div 
                    className="sticky bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-800 to-transparent pointer-events-none"
                    aria-hidden="true"
                />
            </div>
        </div>
    );

    const babyAngelEmoji = `👼${playerSkinTone}`;
    // The next numeral will be the current count + 2 (e.g., count 0 -> II, count 1 -> III)
    const nextRomanNumeral = numberToRoman(lineageCount + 2);
    const rebirthButtonText = (
        <>
            {babyAngelEmoji} Reborn as {playerName}{' '}
            <span className="font-black text-yellow-300" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>{nextRomanNumeral}</span>
        </>
    );

    return (
        <div className="w-full flex flex-col items-center gap-6 flex-grow overflow-y-auto no-scrollbar py-2 relative">
            <div className={`w-full max-w-md transition-all duration-500 ease-out ${animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <PrestigeCard
                    title="Rebirth"
                    icon="✨"
                    description={rebirthDescription}
                    buttonText={rebirthButtonText}
                    onSelect={() => onEvolve(selectedClassId)}
                    colorScheme="green"
                    startContentAnimation={animationStep >= 2}
                />
            </div>
             <div className={`w-full max-w-md transition-all duration-500 ease-out delay-200 ${animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <PrestigeCard
                    title="Vengeance"
                    icon="⚔️"
                    description={vengeanceDescription}
                    buttonText="⚔️ Return & keep upgrades"
                    onSelect={onRetain}
                    colorScheme="blue"
                    startContentAnimation={animationStep >= 4}
                />
            </div>

            {isChangingClass && (
                 <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in p-4" style={{ backdropFilter: 'blur(4px)' }}>
                    <div className="liquid-glass p-4 rounded-xl shadow-2xl flex flex-col gap-4 w-full max-w-4xl transform animate-slide-up">
                        <h2 className="text-2xl font-bold text-yellow-300 text-center">Choose a New Path</h2>
                        
                        <div className="relative">
                            <div className="-mx-4 sm:-mx-6 carousel-faded-edges">
                                <div
                                    ref={scrollContainerRef}
                                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 px-4 sm:px-6 no-scrollbar"
                                    onMouseDown={handleMouseDown}
                                    onMouseLeave={handleMouseLeaveOrUp}
                                    onMouseUp={handleMouseLeaveOrUp}
                                    onMouseMove={handleMouseMove}
                                    style={{ cursor: 'grab' }}
                                >
                                    {allClassOptions.map((pc, index) => {
                                        const isLocked = pc.tier === 'advanced' && !unlockedAdvancedClasses.has(pc.id);
                                        return (
                                            <div
                                                key={pc.id}
                                                ref={el => { if (el) cardRefs.current[index] = el; }}
                                                className="flex-shrink-0 w-1/2 sm:w-2/5 md:w-1/3 lg:w-1/4 snap-center"
                                            >
                                                <ClassCard
                                                    playerClass={pc}
                                                    isSelected={!isLocked && selectedClassId === pc.id}
                                                    onSelect={() => !isLocked && handleClassSelect(pc.id, index)}
                                                    isLocked={isLocked}
                                                    unlockDescription={pc.unlockDescription}
                                                    isNew={pc.id === newlyUnlockedClass}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                             <button
                                onClick={handlePrevClass}
                                disabled={isPrevDisabled}
                                className="absolute top-1/2 left-0 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-700/90 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-0 transition-opacity z-10 text-white text-2xl"
                                aria-label="Previous class"
                            >
                                ⬅️
                            </button>
                            <button
                                onClick={handleNextClass}
                                disabled={isNextDisabled}
                                className="absolute top-1/2 right-0 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-700/90 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-0 transition-opacity z-10 text-white text-2xl"
                                aria-label="Next class"
                            >
                                ➡️
                            </button>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 mt-2">
                            <button onClick={handleCancelClassChange} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded-lg transition-colors">Cancel</button>
                            <button onClick={handleConfirmClassChange} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-3 rounded-lg transition-colors">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrestigeOptions;
