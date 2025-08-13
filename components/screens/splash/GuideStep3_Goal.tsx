/**
 * @file GuideStep3_Goal.tsx
 * @description The third step of the hero's guide, explaining stats and the game's goal.
 */
import React from 'react';
import { REALM_THEMES } from '../../../constants';

const StatCard: React.FC<{
    emoji: string;
    title: string;
    children: React.ReactNode;
    animation: React.ReactNode;
}> = ({ emoji, title, children, animation }) => (
    <div 
        className="bg-gray-900/50 p-4 rounded-lg text-left flex flex-col gap-2 w-full border border-yellow-400/20 min-h-[12rem]"
    >
        <div className="flex items-start gap-3 flex-grow">
            <div className="text-5xl mt-1 animate-idle-bob">{emoji}</div>
            <div className="flex-grow">
                <h3 className="font-title text-3xl text-amber-300 tracking-wider">{title}</h3>
                <p className="text-gray-200 text-xl leading-relaxed">{children}</p>
            </div>
        </div>
        <div className="w-full h-16 bg-black/30 rounded-md flex items-center justify-center overflow-hidden relative mt-auto border border-black/50">
            {animation}
        </div>
    </div>
);

interface GuideStep3GoalProps {
    cardAnimationStep: number;
    cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const GuideStep3_Goal: React.FC<GuideStep3GoalProps> = ({ cardAnimationStep, cardRefs }) => {
    const finalBoss = REALM_THEMES.find(t => t.name === "The Mad King's Vault")?.boss;

    const statCards = [
        { 
            emoji: "❤️", 
            title: "Health", 
            animation: <div className="text-5xl animate-heart-beat">❤️</div>,
            children: <>Your life force. <span className="font-title text-yellow-300 text-2xl">Don't let it run out!</span></>
        },
        { 
            emoji: "🔥", 
            title: "Attack", 
            animation: <div className="text-5xl animate-punch-1" style={{animationDelay: '0s', animationDuration: '1s'}}>👊</div>,
            children: <>How much damage <span className="font-title text-yellow-300 text-2xl">you deal</span> with each hit.</>
        },
        { 
            emoji: "⚡️", 
            title: "Speed", 
            animation: <div className="text-5xl animate-running">🏃</div>,
            children: <>How many times you attack <span className="font-title text-yellow-300 text-2xl">per second.</span></>
        },
        { 
            emoji: "🎯", 
            title: "Crit Chance", 
            animation: (
                <div className="relative w-24 h-12">
                    <div className="absolute text-5xl left-0 top-1/2 -translate-y-1/2 animate-arrow-shot">➡️</div>
                    <div className="absolute text-5xl right-0 top-1/2 -translate-y-1/2">🎯</div>
                </div>
            ),
            children: <>Your odds of landing a <span className="font-title text-yellow-300 text-2xl">massive lucky critical hit!</span></>
        }
    ];

    const fortuneCard = { 
        emoji: "🍀", 
        title: "Fortune", 
        animation: (
            <>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="absolute text-3xl animate-coin-rain" style={{ left: `${10 + i * 20}%`, animationDelay: `${i*0.2}s` }}>💰</div>
                ))}
            </>
        ),
        children: <>Increases your gold and your chances of finding <span className="font-title text-yellow-300 text-2xl">rare items.</span></>
    };

    return (
        <div className="flex flex-col items-center gap-4 animate-fade-in w-full max-w-2xl mx-auto">
            <h3 className="font-title text-3xl text-green-400">Your Core Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {statCards.map((card, index) => (
                    <div 
                        key={card.title}
                        ref={el => { if (el) cardRefs.current[index] = el; }}
                        className={`transition-all duration-500 ease-out ${cardAnimationStep > index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    >
                        <StatCard {...card} />
                    </div>
                ))}
                <div 
                    ref={el => { if (el) cardRefs.current[statCards.length] = el; }}
                    className={`sm:col-span-2 transition-all duration-500 ease-out ${cardAnimationStep > statCards.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                     <StatCard {...fortuneCard} />
                </div>
            </div>
            
            <div 
                ref={el => { if (el) cardRefs.current[statCards.length + 1] = el; }}
                className={`w-full transition-all duration-500 ease-out ${cardAnimationStep > statCards.length + 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
                <div className="bg-gray-900/50 p-4 rounded-lg text-center w-full mt-4 border border-purple-400/30">
                    <h3 className="font-title text-3xl text-purple-400 mb-2">The Ultimate Goal</h3>
                    <p className="text-xl text-gray-200">
                        Your quest: Conquer 10 Realms 🗺️ & defeat the final boss:
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-3 bg-black/20 p-2 rounded-md">
                        <span className="text-5xl">{finalBoss?.emoji || '🤴'}</span>
                        <span className="font-title text-3xl text-yellow-300">{finalBoss?.name || 'The Mad King'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideStep3_Goal;