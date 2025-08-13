/**
 * @file EventScreen.tsx
 * @description A full-screen component that displays a narrative event,
 * presenting the player with choices and their consequences.
 */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GameEvent, EventOption, RealmTheme, EventConsequenceType, PlayerInfo, Upgrade } from '../../types';
import { getPlayerStatFocus, getPlayerGender } from '../../utils/playerVisuals';
import EventOptionCard from './event/EventOptionCard';
import EventResult from './event/EventResult';
import EventBackground from './event/EventBackground';
import EventScene from './event/EventScene';
import { getRandomItem } from '../../utils/random';
import VolumeControl from '../ui/VolumeControl';
import WavyText from '../ui/WavyText';

interface EventScreenProps {
    playerInfo: PlayerInfo;
    event: GameEvent;
    onChoice: (option: EventOption) => void;
    onEnd: () => void; // New prop to signal completion
    realmTheme: RealmTheme;
    volume: number;
    setVolume: (volume: number) => void;
    coins: number;
    isExiting: boolean;
    totalUpgradeLevels: number;
    upgrades: Upgrade[];
}

type EventFlowState = 'announcing' | 'choosing' | 'revealing';

const EventScreen: React.FC<EventScreenProps> = ({ playerInfo, event, onChoice, onEnd, realmTheme, volume, setVolume, coins, isExiting, totalUpgradeLevels, upgrades }) => {
    const [flowState, setFlowState] = useState<EventFlowState>('announcing');
    const [selectedOption, setSelectedOption] = useState<(EventOption & { index: number }) | null>(null);
    const endTimerRef = useRef<number | null>(null);
    const lastTapRef = useRef(0);

    const playerStatFocus = useMemo(() => getPlayerStatFocus(upgrades, playerInfo.playerClassId), [upgrades, playerInfo.playerClassId]);

    // Effect to automatically transition from announcing to choosing
    useEffect(() => {
        const timer = setTimeout(() => {
            setFlowState('choosing');
        }, 1200);
        return () => clearTimeout(timer);
    }, []);
    
    // Effect to start the exit timer once the result is being revealed
    useEffect(() => {
        if (flowState === 'revealing' && selectedOption?.consequence) {
            const textAnimationDuration = selectedOption.consequence.resultText.length * 8; // Match faster speed
            const resultPanelAnimation = 600;
            const userWaitTime = 3000;
            const totalTimeout = resultPanelAnimation + textAnimationDuration + userWaitTime;

            endTimerRef.current = window.setTimeout(onEnd, totalTimeout);
        }
        return () => {
            if (endTimerRef.current) {
                clearTimeout(endTimerRef.current);
            }
        };
    }, [flowState, selectedOption, onEnd]);


    const handleSelectOption = (option: EventOption, index: number) => {
        if (flowState !== 'choosing') return;
        
        let resolvedOption = { ...option };
        if (option.randomConsequences && option.randomConsequences.length > 0) {
            const weightedItems = option.randomConsequences.map(rc => ({
                item: rc.consequence,
                weight: rc.weight,
            }));
            const chosenConsequence = getRandomItem(weightedItems);
            
            if (chosenConsequence) {
                resolvedOption.consequence = chosenConsequence;
            } else {
                console.error("Failed to resolve a random consequence for option:", option);
                resolvedOption.consequence = {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Nothing happened.",
                    outcomeEmoji: '🤷'
                };
            }
        }

        setSelectedOption({ ...resolvedOption, index });
        setFlowState('revealing');
        onChoice(resolvedOption);
    };
    
    const handleSkip = () => {
        if (flowState !== 'revealing') return;
        const now = Date.now();
        if (now - lastTapRef.current < 300) { // Double tap
            if (endTimerRef.current) {
                clearTimeout(endTimerRef.current);
            }
            onEnd();
        }
        lastTapRef.current = now;
    };

    const glowColor = `hsla(${realmTheme.color.replace(/%/g, '')}, 0.7)`;
    const realmThemeColor = `hsl(${realmTheme.color})`;
    const realmEmoji = realmTheme.minions[0]?.emoji || '❓';
    const realmNameWithEmojis = `${realmEmoji} ${realmTheme.name} ${realmEmoji}`;

    return (
        <div onClick={handleSkip} className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 ${isExiting ? 'animate-fade-out' : 'animate-fade-in'}`} style={{backdropFilter: 'blur(8px)'}}>
            
            <EventBackground emojis={event.emojis} />
            
            <div className="absolute top-4 left-4 z-[60]">
                <VolumeControl volume={volume} setVolume={setVolume} layout="icon-only" />
            </div>

            <div className="relative z-10 liquid-glass rounded-2xl shadow-2xl p-2 sm:p-4 w-full max-w-2xl text-center transform animate-slide-up h-full max-h-[90vh] flex flex-col overflow-y-auto no-scrollbar">
                
                 {/* New inner container to manage spacing and layout order */}
                <div className="flex flex-col flex-grow min-h-full">

                    {flowState !== 'revealing' ? (
                        <>
                            {/* Title */}
                            <div className="flex-shrink-0 animate-fade-in pt-4" style={{ animationDelay: '0.5s'}}>
                                 <WavyText
                                    text={realmNameWithEmojis}
                                    className="font-title text-xl text-center"
                                    style={{ color: realmThemeColor, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                                    staggerMs={50}
                                    animationName="wave-flag"
                                    animationDuration={1.4}
                                 />
                                 <WavyText 
                                    text={event.title}
                                    className="text-5xl sm:text-6xl md:text-7xl text-yellow-400 text-center"
                                    style={{ textShadow: '2px 2px 0 #92400e, 4px 4px 0 #78350f, 6px 6px 0 #451a03, 8px 8px 10px rgba(0,0,0,0.5)' }}
                                    staggerMs={50}
                                    animationName="wave-flag"
                                    animationDuration={1.4}
                                 />
                            </div>
                            
                            {/* Emoji Scene */}
                            <div className="my-2 flex items-center justify-center opacity-0 animate-event-scene-reveal" style={{ animationDelay: '0.3s' }}>
                                <div className="relative w-full" style={{ filter: `drop-shadow(0 0 30px ${glowColor})` }}>
                                    <EventScene emojis={event.emojis} glowColor={glowColor} />
                                </div>
                            </div>
                            
                            {/* Description */}
                            <div className="flex-shrink-0 animate-fade-in" style={{ animationDelay: '0.5s'}}>
                                <div className="max-w-md mx-auto px-4">
                                     <div className="border-b-2 border-double border-white/20 w-1/2 mx-auto"></div>
                                     <p 
                                        className="text-gray-100 text-2xl sm:text-3xl leading-snug tracking-normal py-2"
                                        style={{ textShadow: '0px 2px 15px rgba(0, 0, 0, 0.7)' }}
                                    >
                                        {event.description}
                                    </p>
                                    <div className="border-b-2 border-double border-white/20 w-1/2 mx-auto"></div>
                                </div>
                            </div>
                            {/* Options */}
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                {event.options.map((option, index) => {
                                    let lockedReason: string | undefined = undefined;
                                    if (option.requirement?.focus && playerStatFocus !== option.requirement.focus) {
                                        const focusName = option.requirement.focus.charAt(0).toUpperCase() + option.requirement.focus.slice(1);
                                        lockedReason = `Requires a ${focusName}-focused build.`;
                                    }
                                    if (!lockedReason && option.requirement?.gender) {
                                        const playerGender = getPlayerGender(playerInfo.baseEmoji);
                                        if (playerGender !== option.requirement.gender) {
                                             const requiredGender = option.requirement.gender.charAt(0).toUpperCase() + option.requirement.gender.slice(1);
                                             lockedReason = `Requires a ${requiredGender} character.`;
                                        }
                                    }

                                    return (
                                        <EventOptionCard
                                            key={index}
                                            option={option}
                                            onSelect={() => handleSelectOption(option, index)}
                                            index={index}
                                            flowState={flowState}
                                            coins={coins}
                                            lockedReason={lockedReason}
                                        />
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        selectedOption && selectedOption.consequence && (
                            <div className="flex flex-col items-center justify-center gap-8 h-full animate-fade-in w-full">
                                {/* Top part: Title */}
                                <div className="flex-shrink-0 pt-4">
                                     <WavyText
                                        text={realmNameWithEmojis}
                                        className="font-title text-xl text-center"
                                        style={{ color: realmThemeColor, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                                        staggerMs={50}
                                        animationName="wave-flag"
                                        animationDuration={1.4}
                                     />
                                     <WavyText 
                                        text={event.title}
                                        className="text-5xl sm:text-6xl md:text-7xl text-yellow-400 text-center"
                                        style={{ textShadow: '2px 2px 0 #92400e, 4px 4px 0 #78350f, 6px 6px 0 #451a03, 8px 8px 10px rgba(0,0,0,0.5)' }}
                                        staggerMs={50}
                                        animationName="wave-flag"
                                        animationDuration={1.4}
                                     />
                                </div>
                                <div className="flex items-center justify-center gap-4 w-full px-4 py-8">
                                    <div className="text-7xl sm:text-8xl animate-slide-in-left opacity-0" style={{ animationDelay: '0.2s', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>
                                        {playerInfo.displayEmoji}
                                    </div>
                                    <div className="text-5xl sm:text-6xl text-gray-400 animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>→</div>
                                    <div className="w-48 sm:w-56 animate-slide-in-right opacity-0" style={{ animationDelay: '0.2s' }}>
                                        <EventOptionCard
                                            option={selectedOption}
                                            onSelect={() => {}}
                                            index={selectedOption.index}
                                            flowState='revealing'
                                            coins={coins}
                                        />
                                    </div>
                                </div>
                                <EventResult 
                                    consequence={selectedOption.consequence} 
                                    totalUpgradeLevels={totalUpgradeLevels}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
            
            {flowState === 'revealing' && (
                <div className="absolute bottom-4 text-lg text-gray-200 tracking-widest animate-pulse font-bold" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                    Tap twice to skip
                </div>
            )}
        </div>
    );
};

export default EventScreen;
