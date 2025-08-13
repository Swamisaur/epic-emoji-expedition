/**
 * @file BossDefeatCinematic.tsx
 * @description A full-screen overlay that plays a cinematic animation of the player defeating a boss.
 */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import WavyText from '../ui/WavyText';
import GameAnimations from '../game/GameAnimations';
import { ALL_CLASSES } from '../../constants';

interface BossDefeatCinematicProps {
    realmName: string;
    bossTitle: string;
    enemyName: string;
    playerName: string;
    healAmount: number;
    onAnimationEnd: () => void;
    playerEmoji: string;
    weaponEmoji: string;
    defeatedBossEmoji: string;
    unlockedClassName?: string;
}

const HEALING_PARTICLES = ['❤️‍🩹', '✨', '💚', '💖', '🌟'];

const REALM_HEALING_TRINKETS: Record<string, string> = {
    "Pirate's Cove": '🐚',
    "Whispering Woods": '🍄',
    "Scorched Sands": '💧',
    "Inferno Peak": '❤️‍🔥',
    "Fallen Citadel": '🙏',
    "Haunted Catacombs": '🩸',
    "Scrapheap Metropolis": '🔋',
    "Glacial Peak": '🧊',
    "Tangled Jungle": '🌿',
    "Contaminated Sewers": '💉',
    "The Mad King's Vault": '💎',
};

const REALM_HEALING_TEXT: Record<string, string> = {
    "Pirate's Cove": "Mermaid's Kiss!",
    "Whispering Woods": "Forest Dew!",
    "Scorched Sands": "Oasis Water!",
    "Inferno Peak": "Heartstone Ember!",
    "Fallen Citadel": "King's Grace!",
    "Haunted Catacombs": "Vampire's Draught!",
    "Scrapheap Metropolis": "Battery Charged!",
    "Glacial Peak": "Glacier Melt!",
    "Tangled Jungle": "Jungle Nectar!",
    "Contaminated Sewers": "Mutagenic Serum!",
    "The Mad King's Vault": "Royal Jelly!",
};


type AnimationPhase = 'start' | 'lunge' | 'impact' | 'vanquish';
type HealPhase = 'idle' | 'fly' | 'burst';

const BossDefeatCinematic: React.FC<BossDefeatCinematicProps> = ({ realmName, bossTitle, enemyName, playerName, healAmount, onAnimationEnd, playerEmoji, weaponEmoji, defeatedBossEmoji, unlockedClassName }) => {
    
    const CINEMATIC_DURATION_MS = 5500;
    const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('start');
    const [healPhase, setHealPhase] = useState<HealPhase>('idle');
    const [showVanquished, setShowVanquished] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const lastTap = useRef(0);
    const animationTimeoutRef = useRef<number | null>(null);

    const unlockedClassEmoji = useMemo(() => {
        if (!unlockedClassName) return null;
        const playerClass = ALL_CLASSES.find(c => c.name === unlockedClassName);
        return playerClass?.emoji || '✨';
    }, [unlockedClassName]);
    
    const healTrinketEmoji = useMemo(() => REALM_HEALING_TRINKETS[realmName] || '❤️‍🩹', [realmName]);
    const realmHealText = useMemo(() => REALM_HEALING_TEXT[realmName] || 'Healing!', [realmName]);


    const handleSkip = () => {
        const now = Date.now();
        if (now - lastTap.current < 300) { // Double tap
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
            setIsFadingOut(true);
            setTimeout(onAnimationEnd, 500);
        }
        lastTap.current = now;
    };


    useEffect(() => {
        const timers = [
            setTimeout(() => setAnimationPhase('lunge'), 1200),
            setTimeout(() => setAnimationPhase('impact'), 1700),
            setTimeout(() => setAnimationPhase('vanquish'), 2500),
            setTimeout(() => setShowVanquished(true), 2800), // Vanquished text appears after the fade out of the name starts
            setTimeout(() => setHealPhase('fly'), 3000), // Trinket starts flying
            setTimeout(() => setHealPhase('burst'), 3500), // Trinket hits, particles burst
        ];
        animationTimeoutRef.current = setTimeout(onAnimationEnd, CINEMATIC_DURATION_MS);
        
        return () => {
            timers.forEach(clearTimeout);
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, [onAnimationEnd]);

    // Generate random healing particles
    const particles = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 80 + 20; // 20px to 100px radius
            return {
                id: i,
                emoji: HEALING_PARTICLES[i % HEALING_PARTICLES.length],
                dx: Math.cos(angle) * radius,
                dy: Math.sin(angle) * radius,
                delay: Math.random() * 0.2,
            };
        });
    }, []);
    
    const playerClasses = useMemo(() => {
        const base = "absolute left-0 top-1/2 text-8xl";

        if (animationPhase === 'start') {
            // Initial state before and during emerge
            return `${base} opacity-0 boss-defeat-hero-emerging`;
        }
        
        // State for lunge and subsequent phases
        return `${base} boss-defeat-hero-lunging`;

    }, [animationPhase]);

    return (
        <div 
            onClick={handleSkip}
            className={`fixed inset-0 bg-black/80 z-[99] flex flex-col items-center justify-center p-4 ${isFadingOut ? 'animate-fade-out' : 'animate-fade-in'}`}
            style={{ backdropFilter: 'blur(4px)' }}
        >
            <GameAnimations />
            
            {/* Background Pattern */}
            <div className="absolute inset-0 text-5xl opacity-10 leading-none text-gray-400">
                {Array(20).fill('⚔️💥🏆'.repeat(30)).map((line, i) => <div key={i}>{line}</div>)}
            </div>
            
            {/* Icebox Container */}
            <div className={`liquid-glass-base rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-2xl text-center transform animate-slide-up max-h-[90vh] flex flex-col justify-center items-center gap-4`}>
                
                {/* Top section: Boss Info */}
                 <div className="relative z-10 text-center opacity-0" style={{ animation: 'fade-in 0.5s forwards 0.2s' }}>
                    <p className="text-xl sm:text-2xl text-gray-400">{realmName}</p>

                    {/* Container for the title/vanquished text */}
                    <div className="relative h-24 sm:h-28 flex items-center justify-center">
                        {/* Boss Title */}
                        <div className={`absolute transition-opacity duration-500 ${animationPhase === 'vanquish' ? 'opacity-0' : 'opacity-100'}`}>
                            <WavyText
                                text={bossTitle}
                                className="text-4xl sm:text-6xl font-bold text-red-500"
                                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                                staggerMs={30}
                            />
                        </div>

                        {/* Vanquished Text */}
                        <div className={`absolute ${showVanquished ? 'animate-vanquished-text-reveal' : 'opacity-0'}`}>
                            <WavyText
                                text="Vanquished!"
                                className="text-7xl sm:text-8xl font-bold text-yellow-400"
                                style={{ textShadow: '2px 2px 0 #92400e, 4px 4px 0 #78350f' }}
                                staggerMs={40}
                            />
                        </div>
                    </div>
                    
                    <p className={`relative text-2xl sm:text-3xl font-bold transition-all duration-500 ${animationPhase === 'impact' || animationPhase === 'vanquish' ? 'text-gray-500' : 'text-red-400'} ${animationPhase === 'vanquish' ? 'opacity-0' : 'opacity-100'}`}>
                        {enemyName}
                        <span 
                            className={`absolute top-1/2 left-0 h-1 bg-red-500 transition-transform duration-300 ease-in-out`}
                            style={{
                                transform: `scaleX(${(animationPhase === 'impact' || animationPhase === 'vanquish') ? 1 : 0}) rotate(-3deg)`,
                                transformOrigin: 'left center',
                                boxShadow: '0 0 5px #ef4444'
                            }}
                        />
                    </p>
                </div>


                {/* Middle section: Animation Scene */}
                <div className="relative w-full max-w-lg h-48 flex justify-center items-center">
                    {/* Player */}
                    <div className={playerClasses}>
                        {playerEmoji}
                        <span className="text-6xl absolute top-1/2 left-[80%] -translate-y-1/2 opacity-0" style={{ animation: `lore-weapon-appear 0.3s forwards 0.8s` }}>
                            {weaponEmoji}
                        </span>
                    </div>
                    
                    {/* Boss */}
                    <div 
                        className={`absolute left-1/2 top-1/2 text-8xl transition-all duration-300
                            ${(animationPhase === 'impact' || animationPhase === 'vanquish') ? 'filter grayscale' : ''}
                            ${animationPhase === 'impact' ? 'animate-boss-baddie-hit' : ''}
                            ${animationPhase === 'vanquish' ? 'animate-boss-vanquish' : ''}
                            ${animationPhase !== 'vanquish' ? 'opacity-100' : ''}
                        `}
                        style={{ transform: 'translate(-50%, -50%)' }}
                    >
                        {defeatedBossEmoji}
                    </div>

                    {/* Impact */}
                    {animationPhase === 'impact' && (
                         <div className="absolute left-1/2 top-1/2 text-9xl text-white opacity-0" style={{ animation: 'boss-defeat-impact-flash 0.3s ease-out forwards' }}>💥</div>
                    )}
                    
                    {/* Flying Heal Trinket */}
                    {healPhase === 'fly' && (
                        <div className="absolute left-1/2 top-1/2 text-5xl" style={{ animation: 'boss-defeat-trinket-fly 0.5s ease-in forwards' }}>
                            {healTrinketEmoji}
                        </div>
                    )}

                     {/* Healing Particle Burst */}
                    <div className="absolute top-1/2" style={{ left: '12rem', transform: 'translateY(-50%)' }}>
                        {healPhase === 'burst' && particles.map(p => (
                            <div
                                key={p.id}
                                className="absolute top-0 left-0 text-3xl opacity-0"
                                style={{
                                    animation: `boss-defeat-heal-particle-burst 1s ease-out forwards ${p.delay}s`,
                                    '--burst-x': `${p.dx}px`,
                                    '--burst-y': `${p.dy}px`,
                                } as React.CSSProperties}
                            >{p.emoji}</div>
                        ))}
                    </div>

                    {/* Healing Text Pill */}
                    {healPhase === 'burst' && (
                        <div 
                            className="absolute top-1/2 left-[5rem] -translate-y-1/2 liquid-glass px-3 py-2 rounded-full flex items-center gap-2 border-2 border-green-400/50 opacity-0 animate-heal-text-reveal"
                            style={{ animationDelay: '0.2s', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}
                        >
                            <span className="text-3xl">{healTrinketEmoji}</span>
                            <span className="text-green-300 font-bold text-lg sm:text-xl whitespace-nowrap">
                                {realmHealText} healing for +{healAmount.toLocaleString()} health
                            </span>
                        </div>
                    )}
                </div>

                {/* Bottom section: Result */}
                <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                    {unlockedClassName && (
                        <div 
                            className={`opacity-0 ${animationPhase === 'vanquish' ? 'animate-fade-in' : ''}`}
                            style={{ animationDelay: '0.5s' }}
                        >
                            <div className="liquid-glass-gold p-3 rounded-xl border-2 border-yellow-300 shadow-lg animate-pulse-border-green" style={{animationDuration: '3s'}}>
                                <p className="font-bold text-xl sm:text-2xl text-white flex items-center justify-center gap-2">
                                    <span className="text-3xl">{unlockedClassEmoji}</span>
                                    <span><span className="text-yellow-300">{unlockedClassName}</span> now unlocked!</span>
                                </p>
                            </div>
                        </div>
                    )}
                    <div className={`opacity-0 mt-8 ${animationPhase === 'vanquish' ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.5s' }}>
                        <p className="text-2xl sm:text-3xl text-gray-200">
                            by <span className="font-bold text-white">{playerName}</span>
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="mt-1 text-center text-xl text-gray-200 tracking-widest animate-pulse font-bold" style={{ textShadow: '0 0 15px black, 0 0 20px black' }}>
                Double tap to skip
            </div>
        </div>
    );
};

export default BossDefeatCinematic;
