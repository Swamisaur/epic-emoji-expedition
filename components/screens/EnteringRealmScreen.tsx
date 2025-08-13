/**
 * @file EnteringRealmScreen.tsx
 * @description A full-screen overlay component that displays when the player is entering a new realm.
 * It provides a visual transition with a map and realm title.
 */
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { RealmTheme } from '../../types';
import WavyText from '../ui/WavyText';
import EventBackground from './event/EventBackground';
import AnimatedText from '../ui/AnimatedText';

interface EnteringRealmScreenProps {
    playerEmoji: string;
    realmTheme: RealmTheme;
    realmThemeOrder: RealmTheme[];
    stage: number;
    ascensionCount: number;
    onAnimationEnd: () => void;
}

// --- Map Components (Adapted from GameOverScreen) ---

const PathSegment: React.FC<{ style: React.CSSProperties, isCleared: boolean, ascensionCount: number, vertical?: boolean }> = ({ style, isCleared, ascensionCount, vertical = false }) => {
    const colorClass = isCleared && ascensionCount > 0 ? 'bg-green-500' : 'bg-amber-400';
    const shadowColor = isCleared && ascensionCount > 0 ? '#22c55e' : '#fbbf24';

    return (
        <div className="absolute bg-gray-700/50 rounded-full" style={style}>
            <div
                className={`h-full w-full rounded-full transition-transform duration-300 ease-in-out ${vertical ? 'origin-top' : 'origin-left'} ${colorClass}`}
                style={{
                    transform: `scale${vertical ? 'Y' : 'X'}(${isCleared ? 1 : 0})`,
                    boxShadow: isCleared ? `0 0 6px ${shadowColor}` : 'none',
                    transitionDelay: '0.4s'
                }}
            />
        </div>
    );
};


const Node: React.FC<{ realm: RealmTheme; style: React.CSSProperties; isCleared: boolean; isCurrent: boolean; ascensionCount: number; isFinalBoss?: boolean }> = ({ realm, style, isCleared, isCurrent, ascensionCount, isFinalBoss = false }) => {
    const isAscendedAndCleared = isCleared && ascensionCount > 0;
    const bgClass = isCurrent ? 'bg-blue-500' : isAscendedAndCleared ? 'bg-green-500' : isCleared ? 'bg-amber-400' : 'bg-gray-800 border-2 border-gray-600';
    const shadowColor = isFinalBoss ? '#fcd34d' : isCurrent ? '#3b82f6' : isAscendedAndCleared ? '#22c55e' : '#fbbf24';
    const shadowStyle = (isCurrent || isCleared) ? { boxShadow: `0 0 15px ${shadowColor}` } : { boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' };

    return (
        <div className="absolute flex flex-col items-center text-center z-10 transition-transform duration-500" style={style}>
            <div 
                className={`rounded-full flex items-center justify-center text-2xl transition-all duration-500 ${isFinalBoss ? 'w-9 h-9 text-2xl' : 'w-7 h-7'} ${bgClass}`}
                style={{ ...shadowStyle, animation: isCurrent ? 'pulse-dot-effect 1.5s infinite' : 'none' }}
            >
                {realm.boss.emoji}
            </div>
             {isFinalBoss && <span className="absolute -bottom-6 text-xs font-bold text-amber-300 whitespace-nowrap" style={{textShadow: '1px 1px 2px #000'}}>{realm.boss.name}</span>}
        </div>
    );
};

const StartNode: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="absolute flex flex-col items-center z-10" style={style}>
        <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-amber-300" style={{boxShadow: '0 0 8px #fbbf24'}}/>
        <span className="absolute -top-5 text-xs font-bold text-gray-400">Start</span>
    </div>
);

const RealmProgressionMap: React.FC<{ stage: number, realmThemeOrder: RealmTheme[], playerEmoji: string, startAnimation: boolean, ascensionCount: number }> = ({ stage, realmThemeOrder, playerEmoji, startAnimation, ascensionCount }) => {
    const initialPlayerIndex = Math.max(0, stage - 1);
    const [playerPosIndex, setPlayerPosIndex] = useState(initialPlayerIndex);
    const [clearedPathSegments, setClearedPathSegments] = useState(initialPlayerIndex);
    
    const realmsForPath = useMemo(() => realmThemeOrder.slice(0, 10), [realmThemeOrder]);

    const gridNodeCoords = useMemo(() => [
        // row 1
        { top: '0%', left: '0%' }, { top: '0%', left: '50%' }, { top: '0%', left: '100%' },
        // row 2 (reversed for S-path)
        { top: '50%', left: '100%' }, { top: '50%', left: '50%' }, { top: '50%', left: '0%' },
        // row 3
        { top: '100%', left: '0%' }, { top: '100%', left: '50%' }, { top: '100%', left: '100%' },
    ], []);

    const startNodeCoords = { top: '-25%', left: '0%' };
    const finalBossCoords = { top: '125%', left: '100%' };


    const playerPath = useMemo(() => [
        startNodeCoords, ...gridNodeCoords, finalBossCoords
    ], [gridNodeCoords, startNodeCoords, finalBossCoords]);

    useEffect(() => {
        if (startAnimation) {
            const finalPlayerPos = stage;
            const playerTimer = setTimeout(() => setPlayerPosIndex(finalPlayerPos), 500);
            const pathTimer = setTimeout(() => setClearedPathSegments(finalPlayerPos), 500);
            return () => { clearTimeout(playerTimer); clearTimeout(pathTimer); };
        }
    }, [startAnimation, stage]);
    
    const playerStyle: React.CSSProperties = {
        top: playerPath[playerPosIndex].top,
        left: playerPath[playerPosIndex].left,
        transform: 'translate(-50%, -75%)',
        transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: '0.4s',
        animation: startAnimation ? 'head-bob 1.5s ease-in-out infinite' : 'none'
    };
    
    const gridRealms = realmsForPath.slice(0, 9);
    const finalRealm = realmsForPath[9];
    
    return (
        <div className="w-full h-60 flex justify-center items-center">
            <div className="relative w-36 h-36 transform scale-[0.85] sm:scale-[1] transition-transform duration-300">
                {/* Path Segments */}
                <PathSegment style={{ top: '-25%', left: '0%', width: '4px', height: '25%', transform: 'translateX(-2px)' }} isCleared={clearedPathSegments >= 1} ascensionCount={ascensionCount} vertical />
                <PathSegment style={{ top: '0%', left: '0%', width: '50%', height: '4px', transform: 'translateY(-2px)' }} isCleared={clearedPathSegments >= 2} ascensionCount={ascensionCount} />
                <PathSegment style={{ top: '0%', left: '50%', width: '50%', height: '4px', transform: 'translateY(-2px)' }} isCleared={clearedPathSegments >= 3} ascensionCount={ascensionCount} />
                <PathSegment style={{ top: '0%', left: '100%', width: '4px', height: '50%', transform: 'translateX(-2px)' }} isCleared={clearedPathSegments >= 4} ascensionCount={ascensionCount} vertical />
                <PathSegment style={{ top: '50%', left: '50%', width: '50%', height: '4px', transform: 'translateY(-2px)' }} isCleared={clearedPathSegments >= 5} ascensionCount={ascensionCount} />
                <PathSegment style={{ top: '50%', left: '0%', width: '50%', height: '4px', transform: 'translateY(-2px)' }} isCleared={clearedPathSegments >= 6} ascensionCount={ascensionCount} />
                <PathSegment style={{ top: '50%', left: '0%', width: '4px', height: '50%', transform: 'translateX(-2px)' }} isCleared={clearedPathSegments >= 7} ascensionCount={ascensionCount} vertical />
                <PathSegment style={{ top: '100%', left: '0%', width: '50%', height: '4px', transform: 'translateY(-2px)' }} isCleared={clearedPathSegments >= 8} ascensionCount={ascensionCount} />
                <PathSegment style={{ top: '100%', left: '50%', width: '50%', height: '4px', transform: 'translateY(-2px)' }} isCleared={clearedPathSegments >= 9} ascensionCount={ascensionCount} />
                <PathSegment style={{ top: '100%', left: '100%', width: '4px', height: '25%', transform: 'translateX(-2px)' }} isCleared={clearedPathSegments >= 10} ascensionCount={ascensionCount} vertical />

                {/* Player Emoji */}
                <div className="absolute text-4xl z-20" style={playerStyle}>
                    <span className="inline-block" style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.5))' }}>
                        {playerEmoji}
                    </span>
                </div>

                {/* Nodes */}
                <StartNode style={{ ...startNodeCoords, transform: 'translate(-50%, -50%)' }} />
                {gridRealms.map((realm, index) => (
                    <Node key={realm.name + index} realm={realm} style={{ ...gridNodeCoords[index], transform: 'translate(-50%, -50%)' }} isCleared={index < stage - 1} isCurrent={index === stage - 1} ascensionCount={ascensionCount} />
                ))}
                {finalRealm && (
                    <Node realm={finalRealm} style={{ ...finalBossCoords, transform: 'translate(-50%, -50%)' }} isCleared={9 < stage - 1} isCurrent={9 === stage - 1} isFinalBoss ascensionCount={ascensionCount}/>
                )}
            </div>
        </div>
    );
};


const EnteringRealmScreen: React.FC<EnteringRealmScreenProps> = ({ playerEmoji, realmTheme, realmThemeOrder, stage, ascensionCount, onAnimationEnd }) => {
    const [animationStep, setAnimationStep] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const lastTap = useRef(0);
    const animationTimeoutRef = useRef<number | null>(null);

    const minions = useMemo(() => [...realmTheme.minions].sort(() => 0.5 - Math.random()).slice(0, 5), [realmTheme]);

    const enemyCardStyle = useMemo(() => {
        const [h, s, l] = realmTheme.color.split(',').map(c => c.trim().replace('%', ''));
        const bgColor = `hsla(${h}, ${s}%, ${l}%, 0.15)`;
        const borderColor = `hsla(${h}, ${s}%, ${l}%, 0.4)`;
        const glowColor = `hsla(${h}, ${s}%, ${l}%, 0.3)`;
        return {
            backgroundColor: bgColor,
            borderColor: borderColor,
            boxShadow: `0 0 25px ${glowColor}, inset 0 0 15px ${glowColor}`,
        };
    }, [realmTheme.color]);


    const borderEmojis = useMemo(() => {
        const count = Math.floor(Math.random() * 10) + 24; // 24 to 33
        const emojis = [];
        if (realmTheme.emojis.length > 0) {
            for (let i = 0; i < count; i++) {
                const side = Math.floor(Math.random() * 4); // 0: top, 1: bottom, 2: left, 3: right
                let style: React.CSSProperties = {};
                const offset = `${Math.random() * 90 + 5}%`; // 5% to 95%
                const padding = `${Math.random() * 12 + 6}px`; // 6px to 18px
                switch (side) {
                    case 0: style = { top: padding, left: offset, transform: 'translateX(-50%)' }; break;
                    case 1: style = { bottom: padding, left: offset, transform: 'translateX(-50%)' }; break;
                    case 2: style = { left: padding, top: offset, transform: 'translateY(-50%)' }; break;
                    case 3: style = { right: padding, top: offset, transform: 'translateY(-50%)' }; break;
                }
                emojis.push({
                    emoji: realmTheme.emojis[Math.floor(Math.random() * realmTheme.emojis.length)],
                    style: style,
                    id: i,
                });
            }
        }
        return emojis;
    }, [realmTheme.emojis]);


    useEffect(() => {
        const timings = {
            step1_title: 200,
            step2_minionsAppear: 1000,
            step3_minionsFlee: 3000,
            step4_bossStomp: 3800,
            step5_nameplate: 4800,
            step6_startFade: 6900, // Start fade out 0.5s before end
            step7_end: 7400,
        };

        const timers = [
            setTimeout(() => setAnimationStep(1), timings.step1_title),
            setTimeout(() => setAnimationStep(2), timings.step2_minionsAppear),
            setTimeout(() => setAnimationStep(3), timings.step3_minionsFlee),
            setTimeout(() => setAnimationStep(4), timings.step4_bossStomp),
            setTimeout(() => setAnimationStep(5), timings.step5_nameplate),
            setTimeout(() => setIsFadingOut(true), timings.step6_startFade),
        ];

        animationTimeoutRef.current = window.setTimeout(onAnimationEnd, timings.step7_end);

        return () => {
            timers.forEach(clearTimeout);
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, [onAnimationEnd]);

    const handleSkip = () => {
        const now = Date.now();
        if (now - lastTap.current < 300) { // Double tap
            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
            setIsFadingOut(true);
            setTimeout(onAnimationEnd, 500);
        }
        lastTap.current = now;
    };
    
    const isShaking = animationStep === 3;
    const isFinalBoss = realmTheme.name === "The Mad King's Vault";

    const minionPositions = [
        { top: '30%', left: '20%' }, 
        { top: '20%', left: '45%' }, 
        { top: '30%', left: '70%' },
        { top: '65%', left: '35%' }, 
        { top: '65%', left: '55%' }
    ];

    return (
        <div onClick={handleSkip} className={`fixed inset-0 bg-gray-900/90 z-[100] flex flex-col items-center justify-center p-4 overflow-hidden ${isFadingOut ? 'animate-fade-out' : 'animate-fade-in'}`} style={{ backdropFilter: 'blur(8px)' }}>
            <EventBackground emojis={realmTheme.emojis} />
            
             <div className="relative z-10 liquid-glass-base rounded-2xl shadow-2xl p-4 sm:p-6 text-center transform animate-slide-up flex flex-col gap-4 justify-center max-h-[95vh] w-full max-w-2xl">
                 {/* Top: Title */}
                <div className={`transition-all duration-500 ease-out ${animationStep >= 1 ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}>
                    <div className="text-lg sm:text-xl text-gray-300 tracking-widest">now entering...</div>
                    <WavyText 
                        text={realmTheme.name}
                        className="text-5xl sm:text-6xl font-extrabold text-yellow-300 text-center leading-tight mt-1"
                        style={{ textShadow: '2px 2px 0 #92400e, 3px 3px 0 #78350f' }}
                    />
                 </div>
                 
                 {/* Player Journey Card (First) */}
                 <div className={`relative liquid-glass-gold p-2 rounded-xl border-2 border-yellow-300 shadow-lg transition-all duration-500 ease-out ${animationStep >= 1 ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}>
                     <RealmProgressionMap stage={stage} realmThemeOrder={realmThemeOrder} playerEmoji={playerEmoji} startAnimation={animationStep >= 1} ascensionCount={ascensionCount}/>
                 </div>
                 
                 {/* Enemies Card (Second) */}
                 <div className={`relative h-72 backdrop-blur-md p-2 rounded-xl border shadow-lg overflow-hidden transition-all duration-500 ease-out ${animationStep >= 2 ? 'opacity-100' : 'opacity-0 -translate-y-4'}`} style={{transitionDelay: '200ms', ...enemyCardStyle}}>
                     <div className={`absolute inset-0 transition-transform duration-300 ${isShaking ? 'animate-screen-shake' : ''}`}>
                        {/* Border Emojis */}
                        {borderEmojis.map(({ emoji, style, id }) => (
                            <div key={id} className="absolute text-2xl opacity-50" style={style}>{emoji}</div>
                        ))}
                        
                        {/* Boss */}
                        <div className={`absolute top-1/2 left-1/2 text-8xl z-10 opacity-0 ${animationStep >= 4 ? (isFinalBoss ? 'animate-final-boss-stomp' : 'animate-boss-stomp') : ''}`} style={{ filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.5))' }}>
                            {realmTheme.boss.emoji}
                        </div>
                        
                        {/* Minions */}
                        {animationStep >= 2 && minions.map((minion, i) => {
                            const flyToX = (Math.random() - 0.5) * 400;
                            const flyToY = -200 + (Math.random() * -100);
                            const flyRot = (Math.random() - 0.5) * 360;
                            const isFleeing = animationStep >= 3;
                            const animationClass = isFleeing ? 'animate-minion-scare-away' : 'animate-minion-slide-in';
                            const delay = isFleeing ? i * 0.05 : 0.2 + i * 0.2;
                            return (
                                <div 
                                    key={i} 
                                    className={`absolute text-5xl opacity-0 ${animationClass}`}
                                    style={{
                                        ...minionPositions[i],
                                        // @ts-ignore
                                        '--fly-to-x': `${flyToX}px`,
                                        '--fly-to-y': `${flyToY}px`,
                                        '--fly-rot': `${flyRot}deg`,
                                        animationDelay: `${delay}s`,
                                        filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.4))'
                                    }}
                                >{minion.emoji}</div>
                            );
                        })}
                     </div>
                     <div 
                         className={`absolute bottom-0 left-0 w-full p-2 text-center opacity-0 ${animationStep >= 5 ? 'animate-nameplate-reveal' : ''}`}
                     >
                         <div className="inline-block liquid-glass-base px-4 py-1 rounded-lg">
                             <div className="text-lg text-red-300 font-bold">{realmTheme.boss.epithet}</div>
                             <AnimatedText text={realmTheme.boss.name} className="font-title text-3xl text-white" onComplete={() => {}} />
                         </div>
                     </div>
                 </div>
            </div>
            
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xl text-gray-200 tracking-widest animate-pulse font-bold" style={{ textShadow: '0 0 15px black, 0 0 20px black' }}>
                Double tap to skip
            </div>
        </div>
    );
};

export default EnteringRealmScreen;