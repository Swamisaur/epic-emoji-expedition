/**
 * @file LoreAnimation.tsx
 * @description Renders a 6-step animated storyboard for the game's lore introduction.
 */
import React from 'react';

interface LoreAnimationProps {
    step: number;
}

const LoreAnimation: React.FC<LoreAnimationProps> = ({ step }) => {
    const BackgroundPattern: React.FC<{ pattern: string }> = ({ pattern }) => (
        <div className="absolute inset-0 text-5xl opacity-25 leading-none" style={{ color: '#fff' }}>
            {Array(20).fill(pattern.repeat(50)).map((line, i) => <div key={i}>{line}</div>)}
        </div>
    );

    const renderStep = () => {
        switch (step) {
            // Scene 1: A Thriving Kingdom
            case 0:
                return (
                    <div key={0} className="relative w-full h-full animate-lore-fade-in-out">
                        <div className="absolute inset-0 text-5xl opacity-15 leading-none" style={{ color: '#fff', animation: 'lore-bg-pan 60s linear infinite' }}>
                            {Array(20).fill('🌳'.repeat(50)).map((line, i) => <div key={i}>{line}</div>)}
                        </div>
                        {/* Clouds Layer 1 (Back) */}
                        <div className="absolute top-[5%] left-0 w-full text-8xl opacity-50" style={{ animation: `lore-cloud-drift 40s linear infinite alternate`}}>☁️</div>
                        <div className="absolute top-[15%] left-0 w-full text-7xl opacity-50" style={{ animation: `lore-cloud-drift 50s linear infinite alternate-reverse`}}>☁️</div>
                        {/* Far mountains (Both sides) */}
                        <div className="absolute bottom-4 left-[-10%] w-[50%] text-9xl opacity-75" style={{ animation: `lore-mountain-drift 30s ease-in-out infinite alternate`}}>⛰️</div>
                        <div className="absolute bottom-4 right-[-10%] w-[50%] text-9xl opacity-75" style={{ animation: `lore-mountain-drift 30s ease-in-out infinite alternate`}}>⛰️</div>
                        {/* Clouds Layer 2 (Mid) */}
                        <div className="absolute top-[25%] left-0 w-full text-6xl opacity-45" style={{ animation: `lore-cloud-drift 35s linear infinite`}}>☁️</div>
                        {/* Mid mountains (Both sides) - CORRECTED */}
                        <div className="absolute bottom-4 left-[-5%] w-[35%] text-9xl opacity-30" style={{ animation: `lore-mountain-drift 25s ease-in-out infinite alternate-reverse`}}>🏔️</div>
                        <div className="absolute bottom-4 right-[-5%] w-[35%] text-9xl opacity-30" style={{ animation: `lore-mountain-drift 25s ease-in-out infinite alternate-reverse`}}>🏔️</div>
                        {/* Sun */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-7xl" style={{ animation: `lore-sun-rise-slow 6s forwards, lore-sun-shine 3s ease-in-out infinite 6s` }}>☀️</div>
                        {/* Castle */}
                        <div className="absolute top-1/2 left-1/2 text-8xl -translate-x-1/2 -translate-y-1/2">
                            🏰
                            <div className="absolute -top-4 -right-4 text-3xl" style={{ animation: `lore-flag-wave 1s ease-in-out infinite alternate` }}>🚩</div>
                        </div>
                         {Array.from({ length: 3 }).map((_, i) => (
                             <div key={i} className="absolute bottom-8 text-4xl" style={{ left: `${20 + i * 25}%`, animation: `lore-villager-bob ${1.5 + i * 0.5}s ease-in-out infinite alternate ${i * 0.3}s` }}>{['🧑‍🌾', '👩‍🌾', '👨‍🌾'][i]}</div>
                         ))}
                         {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="absolute bottom-2 text-3xl" style={{ left: `${10 + i * 20}%`, animation: `lore-flower-bloom ${2 + i * 0.2}s ease-in-out infinite alternate ${i*0.2}s` }}>{['🌸', '🌷', '🌻', '🌹', '🌼'][i]}</div>
                         ))}
                    </div>
                );
            // Scene 2: The Horde Attacks
            case 1:
                return (
                    <div key={1} className="relative w-full h-full animate-lore-fade-in-out">
                        <BackgroundPattern pattern="⚡💥💨" />
                        {/* Storm Clouds */}
                        <div className="absolute top-[5%] left-[10%] text-7xl opacity-85" style={{ animation: 'lore-storm-drift 2s linear infinite alternate' }}>⛈️</div>
                        <div className="absolute top-[2%] left-[40%] text-8xl opacity-60" style={{ animation: 'lore-storm-drift 2.5s linear infinite alternate-reverse' }}>☁️</div>
                        <div className="absolute top-[8%] left-[70%] text-6xl opacity-85" style={{ animation: 'lore-storm-drift 1.8s linear infinite alternate' }}>⛈️</div>
                        <div className="absolute top-[15%] left-[55%] text-7xl opacity-50" style={{ animation: 'lore-storm-drift 2.2s linear infinite alternate-reverse' }}>☁️</div>

                        <div className="absolute top-1/2 left-1/2 text-8xl -translate-x-1/2 -translate-y-1/2" style={{ animation: `lore-castle-shake 0.5s linear infinite 0.5s` }}>
                            🏰
                             <div className="absolute top-1/2 left-1/2 text-4xl" style={{ animation: `lore-diamond-stolen 1s forwards 1.2s`, opacity: 0 }}>💎</div>
                        </div>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="absolute bottom-8 text-4xl" style={{ left: `${20 + i * 25}%`, animation: `lore-villager-flee ${1 + i*0.1}s forwards ${0.6 + i*0.2}s` }}>{['🧑‍🌾', '👩‍🌾', '👨‍🌾'][i]}</div>
                         ))}
                        <div className="absolute top-1/2 left-8 -translate-y-1/2 text-8xl" style={{ animation: `lore-monster-enter 0.5s ease-out forwards` }}>👹</div>
                        <div className="absolute top-[25%] left-36 text-5xl" style={{ animation: `lore-monster-enter 0.5s ease-out forwards 0.2s` }}>👺</div>
                        <div className="absolute bottom-[20%] left-40 text-5xl" style={{ animation: `lore-monster-enter 0.5s ease-out forwards 0.4s` }}>👿</div>
                        <div className="absolute top-1/2 left-32 -translate-y-1/2 text-5xl" style={{ animation: `lore-fireball 0.8s ease-in forwards 0.6s` }}>🔥</div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl" style={{ animation: `lore-impact-burst 0.3s forwards 1.4s`}}>💥</div>
                    </div>
                );
            // Scene 3: A Kingdom Weeps
            case 2:
                return (
                     <div key={2} className="relative w-full h-full animate-lore-fade-in-out">
                        <BackgroundPattern pattern="💧🥀" />
                        <div className="absolute top-1/2 left-1/2 text-8xl -translate-x-1/2 -translate-y-1/2">
                            🏚️
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-[calc(50%)] -translate-y-[calc(50%+1rem)] text-8xl" style={{ animation: `lore-monster-flee-with-diamond 1.5s forwards 0.2s`, opacity: 0 }}>👹<span className="text-4xl">💎</span></div>
                        
                        {/* Weeping villagers appear after monster leaves */}
                        {Array.from({ length: 5 }).map((_, i) => (
                             <div key={i} className="absolute text-5xl" style={{ left: `${10 + i * 20}%`, bottom: `${15 + Math.random() * 10}%`, animation: `lore-weeping-folk-fade-in 0.5s forwards ${1.8 + i*0.1}s, lore-weep ${1 + Math.random()}s ease-in-out infinite alternate ${2.3 + i*0.1}s`, opacity: 0}}>
                                <span className="text-3xl">{['😭','😢','😥','😪','😿'][i%5]}</span>
                                <span className="text-4xl">{['🏠','🏘️','🏚️'][i%3]}</span>
                            </div>
                        ))}
                    </div>
                );
            // Scene 4: A Hero's Call
            case 3:
                return (
                    <div key={3} className="relative w-full h-full animate-lore-fade-in-out flex items-center justify-center">
                        <BackgroundPattern pattern="☘️🍃🌲" />
                        {/* Hero container for relative positioning of equipment */}
                        <div className="relative text-8xl">
                             <span style={{ animation: `lore-hero-appear 0.5s forwards` }}>🤴</span>
                             {/* Equipment appears to fly up from the bottom to non-overlapping positions */}
                            <div className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 text-6xl" style={{ animation: `lore-equip-from-bottom 0.5s forwards 1.2s`, opacity: 0 }}>👖</div>
                            <div className="absolute top-[20%] right-[-3rem] text-6xl" style={{ animation: `lore-equip-from-bottom 0.5s forwards 1.5s`, opacity: 0 }}>🗡️</div>
                            <div className="absolute top-[20%] left-[-3rem] text-6xl" style={{ animation: `lore-equip-from-bottom 0.5s forwards 1.8s`, opacity: 0 }}>🔮</div>
                        </div>
                         {/* Chests appear at the bottom first */}
                        <div className="absolute bottom-4 w-full flex justify-center gap-4">
                            <div className="text-5xl" style={{ animation: `lore-chests-appear 0.5s forwards 0.5s`, opacity: 0 }}>📦</div>
                            <div className="text-5xl" style={{ animation: `lore-chests-appear 0.5s forwards 0.7s`, opacity: 0 }}>🎁</div>
                            <div className="text-5xl" style={{ animation: `lore-chests-appear 0.5s forwards 0.9s`, opacity: 0 }}>🧺</div>
                        </div>
                        <div className="absolute text-9xl text-white" style={{ animation: `lore-power-flash 0.5s forwards 2.4s`, opacity: 0 }}>✨</div>
                    </div>
                );
            // Scene 5: An Epic Duel - Fades in but does not fade out for a seamless transition
            case 4:
                return (
                    <div key={4} className="relative w-full h-full animate-lore-fade-in-only">
                        <BackgroundPattern pattern="⚔️💥" />
                        {/* Hero and their weapon */}
                        <div className="absolute left-[20%] top-1/2 -translate-y-1/2 opacity-0" style={{ animation: `lore-hero-emerge 0.5s forwards, lore-hero-lunge 0.5s ease-in forwards 1s` }}>
                            <span className="text-8xl">🤴</span>
                            <span className="text-6xl absolute top-1/2 left-[80%] -translate-y-1/2 opacity-0" style={{ animation: `lore-weapon-appear 0.3s forwards 0.6s` }}>🗡️</span>
                        </div>

                        {/* Baddie and Diamond Drop Container */}
                        <div className="absolute right-[20%] top-1/2 -translate-y-1/2">
                            <div className="text-8xl" style={{ animation: `lore-baddie-struck-and-die 0.8s ease-out forwards 1.5s` }}>👹</div>
                            <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-0" style={{ animation: `lore-diamond-drop 1s ease-out forwards 2.3s` }}>💎</div>
                        </div>
                        {/* Slash effect */}
                        <div className="absolute right-[28%] top-1/2 -translate-y-1/2 text-8xl text-white opacity-0" style={{ animation: `lore-slash-effect 0.3s ease-out forwards 1.5s` }}>💫</div>
                    </div>
                );
            // Scene 6: A New Dawn - Direct cut, no fade in on container
            case 5:
                return (
                    <div key={5} className="relative w-full h-full">
                         <BackgroundPattern pattern="🎉🎊🎈" />
                        <div className="absolute top-4 left-[20%] text-7xl" style={{ animation: `lore-sun-rise-slow 6s forwards 0.5s, lore-sun-shine 3s ease-in-out infinite 6.5s` }}>☀️</div>
                        <div className="absolute left-[25%] top-1/2 -translate-y-1/2 text-7xl" style={{ animation: `lore-hero-triumph 2s ease-in-out infinite alternate` }}>🤴<span className="text-4xl">💎</span></div>
                        <div className="absolute top-1/2 left-[75%] text-9xl -translate-x-1/2 -translate-y-1/2" style={{ animation: `lore-castle-sparkle 1.5s ease-in-out infinite` }}>🏰</div>
                         {Array.from({ length: 4 }).map((_, i) => (
                             <div key={i} className="absolute text-4xl" style={{ left: `${15 + i * 25}%`, bottom: `20%`, animation: `lore-hero-appear 0.5s forwards ${1.5 + i*0.2}s, lore-villager-cheer ${0.5 + i*0.1}s ease-in-out infinite alternate ${2 + i*0.2}s` }}>{['🥳','🧑‍🌾', '🥰','👩‍🌾'][i]}</div>
                         ))}
                        {Array.from({ length: 35 }).map((_, i) => (
                             <div key={i} className="absolute top-0 text-3xl" style={{ left: `${Math.random() * 100}%`, animation: `lore-confetti-rain ${2 + Math.random() * 2}s linear infinite ${1.5 + Math.random()}s`, opacity: 0 }}>{['🎊','🎉'][i%2]}</div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="relative w-full h-56 sm:h-64 lg:h-[22rem] bg-black/20 rounded-lg overflow-hidden border border-white/10" style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}>
            {renderStep()}
        </div>
    );
};

export default LoreAnimation;
