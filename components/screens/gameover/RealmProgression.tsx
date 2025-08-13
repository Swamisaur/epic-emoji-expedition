/**
 * @file RealmProgression.tsx
 * @description A component to display the player's journey through the realms on the GameOver screen.
 * This has been significantly refactored to show an animated S-shaped path on a grid.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { RealmTheme } from '../../../types';

interface RealmProgressionProps {
    playerEmoji: string;
    realmsVisitedCount: number; // The number of bosses defeated (e.g., 0 for dying in realm 1, up to 10 for beating the final boss).
    fullRealmOrder: RealmTheme[];
    startAnimation: boolean;
    ascensionCount: number; // To determine if it's a "New Game+" run for different styling.
}

// --- Path & Node Components ---

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
                }}
            />
        </div>
    );
};


const Node: React.FC<{ realm: RealmTheme; style: React.CSSProperties; isCleared: boolean; ascensionCount: number; isFinalBoss?: boolean }> = ({ realm, style, isCleared, isFinalBoss = false, ascensionCount }) => {
    // A cleared node on an ascension run (ascension > 0) will be green.
    const isAscendedAndCleared = isCleared && ascensionCount > 0;
    
    // Determine background and shadow based on the node's state.
    const bgClass = isCleared 
        ? (isAscendedAndCleared ? 'bg-green-500' : 'bg-amber-400')
        : 'bg-gray-800 border-2 border-gray-600';
    
    // Use green or yellow shadow color for cleared nodes.
    const shadowColor = isFinalBoss 
        ? '#fcd34d' 
        : (isAscendedAndCleared ? '#22c55e' : '#fbbf24');

    const shadowStyle = isCleared 
        ? { boxShadow: `0 0 15px ${shadowColor}` }
        : { boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' };

    return (
        <div className="absolute flex flex-col items-center text-center z-10 transition-transform duration-500" style={style}>
            <div 
                className={`
                    rounded-full flex items-center justify-center text-2xl transition-all duration-500
                    ${isFinalBoss ? 'w-9 h-9 text-2xl' : 'w-7 h-7'}
                    ${bgClass}
                `}
                style={shadowStyle}
            >
                {realm.boss.emoji}
            </div>
            {isFinalBoss && <span className="absolute -bottom-6 text-xs font-bold text-amber-300 whitespace-nowrap" style={{textShadow: '1px 1px 2px #000'}}>{realm.boss.name}</span>}
        </div>
    );
};


const StartNode: React.FC<{ style: React.CSSProperties, startAnimation: boolean }> = ({ style, startAnimation }) => (
    <div className="absolute flex flex-col items-center z-10" style={style}>
        <div className={`w-4 h-4 rounded-full bg-amber-400 border-2 border-amber-300 ${startAnimation ? 'animate-pulse-dot' : ''}`} style={{boxShadow: '0 0 8px #fbbf24'}}/>
        <span className="absolute -top-5 text-xs font-bold text-gray-400">Start</span>
    </div>
);


// --- Main Component ---

const RealmProgression: React.FC<RealmProgressionProps> = ({ playerEmoji, realmsVisitedCount, fullRealmOrder, startAnimation, ascensionCount }) => {
    // State to track the player's animated position on the map.
    const [playerPosIndex, setPlayerPosIndex] = useState(0);
    // State to track which path segments have been highlighted.
    const [clearedPathSegments, setClearedPathSegments] = useState(0);
    // State to animate the "Bosses Defeated" counter.
    const [animatedBossesDefeated, setAnimatedBossesDefeated] = useState(0);
    // State to control the final text reveal.
    const [showRealmName, setShowRealmName] = useState(false);

    const realmsForPath = useMemo(() => fullRealmOrder.slice(0, 10), [fullRealmOrder]);

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

    // The full path the player emoji will travel, from Start to Final Boss.
    const playerPath = useMemo(() => [
        startNodeCoords,
        ...gridNodeCoords,
        finalBossCoords,
    ], [gridNodeCoords, startNodeCoords, finalBossCoords]);

    useEffect(() => {
        if (!startAnimation) return;
        
        const finalPlayerPos = realmsVisitedCount + 1;
        const finalClearedSegments = realmsVisitedCount;
        const timeouts: number[] = [];

        // Animate each step of the journey one by one.
        for (let i = 1; i <= finalPlayerPos; i++) {
            timeouts.push(window.setTimeout(() => {
                if (i <= finalClearedSegments) {
                    setClearedPathSegments(prev => prev + 1);
                    setAnimatedBossesDefeated(i);
                }
                setPlayerPosIndex(i);
            }, 600 + i * 400));
        }
        
        // After the player stops moving, reveal the final realm name text.
        timeouts.push(window.setTimeout(() => {
            setShowRealmName(true);
        }, 600 + (finalPlayerPos + 1) * 400));

        return () => timeouts.forEach(clearTimeout);
    }, [startAnimation, realmsVisitedCount]);

    const playerStyle = {
        top: playerPath[playerPosIndex].top,
        left: playerPath[playerPosIndex].left,
        opacity: startAnimation ? 1 : 0,
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in-out',
    };
    
    // The animated counter is now the source of truth for the defeated boss count display.
    const bossesDefeatedCount = animatedBossesDefeated;
    const gridRealms = realmsForPath.slice(0, 9);
    const finalRealm = realmsForPath[9];
    const realmOfDemise = realmsForPath[realmsVisitedCount]?.name || 'The First Step';

    return (
        <div 
            className="flex flex-col items-center justify-between transition-opacity duration-500 py-4 overflow-hidden rounded-lg relative bg-stone-900/50"
            style={{ 
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(199, 159, 109, 0.15) 1px, transparent 0)',
                backgroundSize: '15px 15px',
                animation: 'scroll-dots 5s linear infinite',
            }}
        >
            <div className="h-10 font-bold text-xl mb-12 text-gray-300" style={{textShadow: '2px 2px 3px rgba(0,0,0,0.5)'}}>
                Bosses Defeated: <span className="text-amber-300 text-3xl transition-transform duration-300 inline-block" key={bossesDefeatedCount}>{bossesDefeatedCount}</span> / {realmsForPath.length}
            </div>
            
            <div className="w-full flex justify-center items-center px-4 h-48">
                <div className="relative w-40 h-32">
                    {/* --- Path Segments (now with vertical connections) --- */}
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
                    
                    {/* --- Player Emoji --- */}
                    <div className="absolute text-4xl z-20" style={{...playerStyle, animation: startAnimation ? 'head-bob 1.5s ease-in-out infinite' : 'none' }}>
                        <span className="inline-block" style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.5))' }}>
                            {playerEmoji}
                        </span>
                    </div>

                    {/* --- Nodes (now with conditional coloring) --- */}
                    <StartNode style={{ ...startNodeCoords, transform: 'translate(-50%, -50%)' }} startAnimation={startAnimation} />
                    {gridRealms.map((realm, index) => (
                        <Node 
                            key={realm.name + index}
                            realm={realm}
                            style={{ ...gridNodeCoords[index], transform: 'translate(-50%, -50%)' }}
                            // A node is cleared if its index (0-8) is less than the number of defeated bosses.
                            isCleared={index < bossesDefeatedCount}
                            ascensionCount={ascensionCount}
                        />
                    ))}
                    {finalRealm && (
                        <Node 
                            realm={finalRealm}
                            style={{ ...finalBossCoords, transform: 'translate(-50%, -50%)' }}
                            // The final boss is cleared if we have defeated 10 or more bosses.
                            isCleared={realmsForPath.length <= bossesDefeatedCount}
                            isFinalBoss
                            ascensionCount={ascensionCount}
                        />
                    )}
                </div>
            </div>

            <div className="h-10 mt-20 flex items-center justify-center text-center">
                <div className={`font-semibold text-base transition-all duration-500 delay-200 ${showRealmName ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-gray-400">Final Stand: </span>
                    <span className="text-red-400 font-bold">{realmOfDemise}</span>
                </div>
            </div>
            
            <style>{`
                @keyframes scroll-dots {
                    0% { background-position: 0 0; }
                    100% { background-position: 30px 30px; }
                }
                @keyframes head-bob { 
                    0%, 100% { transform: translate(-50%, -50%) rotate(-3deg); } 
                    50% { transform: translate(-50%, -55%) rotate(3deg); } 
                }
            `}</style>
        </div>
    );
};

export default RealmProgression;