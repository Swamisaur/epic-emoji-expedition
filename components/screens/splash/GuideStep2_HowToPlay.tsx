/**
 * @file GuideStep2_HowToPlay.tsx
 * @description The second step of the hero's guide, explaining the game rules.
 */
import React from 'react';

interface HowToPlayCardProps {
    emoji: string;
    title: string;
    children: React.ReactNode;
    animation: React.ReactNode;
}

const HowToPlayCard: React.FC<HowToPlayCardProps> = ({ emoji, title, children, animation }) => (
    <div 
        className="bg-gray-900/50 p-4 rounded-lg text-left flex flex-col gap-3 w-full border border-yellow-400/20 min-h-[12rem]"
    >
        <div className="flex items-start gap-4 flex-grow">
            <div className="text-6xl mt-1 animate-idle-bob">{emoji}</div>
            <div className="flex-grow">
                <h3 className="font-title text-3xl text-amber-300 tracking-wider">{title}</h3>
                <p className="text-gray-200 text-xl leading-relaxed mt-1">
                    {children}
                </p>
            </div>
        </div>
        <div className="w-full h-20 bg-black/30 rounded-md flex items-center justify-center overflow-hidden relative mt-auto border border-black/50">
            {animation}
        </div>
    </div>
);

interface GuideStep2HowToPlayProps {
    cardAnimationStep: number;
    cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const GuideStep2_HowToPlay: React.FC<GuideStep2HowToPlayProps> = ({ cardAnimationStep, cardRefs }) => {
    const cards = [
        {
            emoji: "👆",
            title: "Tap to Attack",
            animation: (
                <>
                    <div className="text-5xl absolute animate-punch-1">👊</div>
                    <div className="text-5xl absolute animate-punch-2">👊</div>
                </>
            ),
            children: <>Join the fray! <span className="font-title text-yellow-300 text-3xl">Tap monsters to attack</span> even faster and turn the tide of battle.</>
        },
        {
            emoji: "⚔️",
            title: "Automatic Battles",
            animation: (
                <div className="flex items-center justify-around w-full">
                    <div className="text-5xl animate-idle-bob">🤴</div>
                    <div className="text-5xl animate-clash-effect" style={{animationDelay: '0.5s'}}>⚔️</div>
                    <div className="text-5xl animate-idle-bob">👹</div>
                </div>
            ),
            children: <>Your hero fights tirelessly on their own, automatically battling monsters. <span className="font-title text-yellow-300 text-2xl">No input needed</span> to progress!</>
        },
        {
            emoji: "💰",
            title: "Loot & Upgrade",
            animation: (
                <>
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="absolute text-3xl animate-guide-burst" style={{'--burst-x': `${Math.cos(i/15 * 2 * Math.PI) * 80}px`, '--burst-y': `${Math.sin(i/15 * 2 * Math.PI) * 80}px`, animationDelay: `${i*0.08}s`, animationIterationCount: 'infinite' } as React.CSSProperties}>💰</div>
                    ))}
                </>
            ),
            children: <>Defeat monsters to collect gold and powerful equipment 🛡️. Use your wealth to <span className="font-title text-yellow-300 text-2xl">learn new skills</span> and enhance your powers.</>
        },
        {
            emoji: "⚡️",
            title: "Max Buyout",
            animation: (
                 <div className="relative w-full h-full flex items-center justify-center text-white font-bold text-xl">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div className="bg-white/50 rounded-full animate-hold-progress" style={{ animationIterationCount: 'infinite', animationDuration: '1.5s' }}></div>
                    </div>
                    <span>HOLD</span>
                </div>
            ),
            children: <>For a power surge, <span className="font-title text-yellow-300 text-2xl">press and hold</span> an upgrade card to buy as many levels as you can afford at once.</>
        }
    ];

    return (
        <div className="flex flex-col items-center gap-6 animate-fade-in w-full max-w-lg mx-auto">
            {cards.map((card, index) => (
                 <div 
                    key={card.title}
                    ref={el => { if (el) cardRefs.current[index] = el; }}
                    className={`w-full transition-all duration-500 ease-out ${cardAnimationStep > index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    <HowToPlayCard
                        emoji={card.emoji}
                        title={card.title}
                        animation={card.animation}
                    >
                        {card.children}
                    </HowToPlayCard>
                </div>
            ))}
        </div>
    );
};

export default GuideStep2_HowToPlay;
