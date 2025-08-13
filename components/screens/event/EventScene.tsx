/**
 * @file EventScene.tsx
 * @description Renders a dynamic emoji scene for the event screen. It randomly picks a layout.
 */
import React, { useMemo } from 'react';

// --- Types ---
type LayoutProps = { emojis: string[] };

interface EventSceneProps {
    emojis: string[];
    glowColor: string;
}


const BORDER_ANIMATIONS = [
    'event-border-spin 10s linear infinite', 
    'event-border-pulse 2s ease-in-out infinite alternate', 
    'event-border-bob 3s ease-in-out infinite alternate'
];

const AnimatedBorderEmoji: React.FC<{ emoji: string; style: React.CSSProperties }> = ({ emoji, style }) => {
    const animation = useMemo(() => BORDER_ANIMATIONS[Math.floor(Math.random() * BORDER_ANIMATIONS.length)], []);
    return <div className="absolute" style={{ ...style, animation }}>{emoji}</div>;
};


// --- Central Layout Components (5 variations) ---

const CenterSolo: React.FC<LayoutProps> = ({ emojis }) => (
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-8xl" style={{ animation: `event-center-solo-pulse 3s ease-in-out infinite` }}>{emojis[0]}</div>
    </div>
);

const CenterDuetHorizontal: React.FC<LayoutProps> = ({ emojis }) => (
    <div className="absolute inset-0 flex items-center justify-center gap-8">
        <div className="text-7xl" style={{ animation: `event-center-duet-bob-1 4s ease-in-out infinite` }}>{emojis[0]}</div>
        <div className="text-7xl" style={{ animation: `event-center-duet-bob-2 4s ease-in-out infinite` }}>{emojis[1]}</div>
    </div>
);

const CenterTrio: React.FC<LayoutProps> = ({ emojis }) => (
    <div className="absolute inset-0">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 text-7xl" style={{ animation: `event-trio-shake-1 2s ease-in-out infinite` }}>{emojis[0]}</div>
        <div className="absolute top-[65%] left-[35%] -translate-x-1/2 text-6xl" style={{ animation: `event-trio-shake-2 2s ease-in-out infinite 0.1s` }}>{emojis[1]}</div>
        <div className="absolute top-[65%] left-[65%] -translate-x-1/2 text-6xl" style={{ animation: `event-trio-shake-3 2s ease-in-out infinite 0.2s` }}>{emojis[2]}</div>
    </div>
);

const CenterQuartet: React.FC<LayoutProps> = ({ emojis }) => (
     <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'event-center-quartet-swirl 8s ease-in-out infinite alternate' }}>
        <div className="grid grid-cols-2 gap-4 text-6xl">
            <div>{emojis[0]}</div>
            <div>{emojis[1]}</div>
            <div>{emojis[2]}</div>
            <div>{emojis[3]}</div>
        </div>
    </div>
);

const CenterDuetVertical: React.FC<LayoutProps> = ({ emojis }) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="text-6xl" style={{ animation: `event-center-duet-bob-1 4s ease-in-out infinite` }}>{emojis[0]}</div>
        <div className="text-6xl" style={{ animation: `event-center-duet-bob-2 4s ease-in-out infinite` }}>{emojis[1]}</div>
    </div>
);


// --- Border Pattern Components (New Set) ---

const BorderCorners: React.FC<LayoutProps> = ({ emojis }) => ( // 4 emojis
    <>
        <AnimatedBorderEmoji emoji={emojis[0]} style={{ top: 2, left: 2, fontSize: '2.25rem', opacity: 0.7 }} />
        <AnimatedBorderEmoji emoji={emojis[1]} style={{ top: 2, right: 2, fontSize: '2.25rem', opacity: 0.7 }} />
        <AnimatedBorderEmoji emoji={emojis[2]} style={{ bottom: 2, left: 2, fontSize: '2.25rem', opacity: 0.7 }} />
        <AnimatedBorderEmoji emoji={emojis[3]} style={{ bottom: 2, right: 2, fontSize: '2.25rem', opacity: 0.7 }} />
    </>
);

const BorderEightPointStar: React.FC<LayoutProps> = ({ emojis }) => ( // 8 emojis
    <>
        {/* Corners */}
        <AnimatedBorderEmoji emoji={emojis[0]} style={{ top: 2, left: 2, fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[1]} style={{ top: 2, right: 2, fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[2]} style={{ bottom: 2, left: 2, fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[3]} style={{ bottom: 2, right: 2, fontSize: '1.875rem', opacity: 0.6 }} />
        {/* Midpoints */}
        <AnimatedBorderEmoji emoji={emojis[4]} style={{ top: 2, left: '50%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[5]} style={{ bottom: 2, left: '50%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[6]} style={{ top: '50%', left: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[7]} style={{ top: '50%', right: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
    </>
);

const BorderTwelveGrid: React.FC<LayoutProps> = ({ emojis }) => ( // 12 emojis
    <>
        {/* Top */}
        <AnimatedBorderEmoji emoji={emojis[0]} style={{ top: 2, left: '25%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[1]} style={{ top: 2, left: '50%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[2]} style={{ top: 2, left: '75%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        {/* Bottom */}
        <AnimatedBorderEmoji emoji={emojis[3]} style={{ bottom: 2, left: '25%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[4]} style={{ bottom: 2, left: '50%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[5]} style={{ bottom: 2, left: '75%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        {/* Left */}
        <AnimatedBorderEmoji emoji={emojis[6]} style={{ top: '25%', left: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[7]} style={{ top: '50%', left: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[8]} style={{ top: '75%', left: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        {/* Right */}
        <AnimatedBorderEmoji emoji={emojis[9]} style={{ top: '25%', right: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[10]} style={{ top: '50%', right: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[11]} style={{ top: '75%', right: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
    </>
);

const BorderSixteenFrame: React.FC<LayoutProps> = ({ emojis }) => ( // 16 emojis
    <>
        {/* Top */}
        <AnimatedBorderEmoji emoji={emojis[0]} style={{ top: 2, left: '20%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[1]} style={{ top: 2, left: '40%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[2]} style={{ top: 2, left: '60%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[3]} style={{ top: 2, left: '80%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        {/* Bottom */}
        <AnimatedBorderEmoji emoji={emojis[4]} style={{ bottom: 2, left: '20%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[5]} style={{ bottom: 2, left: '40%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[6]} style={{ bottom: 2, left: '60%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[7]} style={{ bottom: 2, left: '80%', transform: 'translateX(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        {/* Left */}
        <AnimatedBorderEmoji emoji={emojis[8]} style={{ top: '20%', left: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[9]} style={{ top: '40%', left: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[10]} style={{ top: '60%', left: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[11]} style={{ top: '80%', left: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        {/* Right */}
        <AnimatedBorderEmoji emoji={emojis[12]} style={{ top: '20%', right: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[13]} style={{ top: '40%', right: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[14]} style={{ top: '60%', right: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
        <AnimatedBorderEmoji emoji={emojis[15]} style={{ top: '80%', right: 2, transform: 'translateY(-50%)', fontSize: '1.875rem', opacity: 0.6 }} />
    </>
);

const BorderChaos: React.FC<LayoutProps> = ({ emojis }) => ( // 4 emojis
    <>
        <AnimatedBorderEmoji emoji={emojis[0]} style={{ top: '15%', left: '10%', fontSize: '1.875rem', opacity: 0.5 }} />
        <AnimatedBorderEmoji emoji={emojis[1]} style={{ top: '80%', left: '20%', fontSize: '1.875rem', opacity: 0.5 }} />
        <AnimatedBorderEmoji emoji={emojis[2]} style={{ top: '25%', left: '90%', fontSize: '1.875rem', opacity: 0.5 }} />
        <AnimatedBorderEmoji emoji={emojis[3]} style={{ top: '70%', left: '85%', fontSize: '1.875rem', opacity: 0.5 }} />
    </>
);


// --- Main Scene Component ---

const centralLayouts: { component: React.FC<LayoutProps>; emojiCount: number }[] = [
    { component: CenterSolo, emojiCount: 1 },
    { component: CenterDuetHorizontal, emojiCount: 2 },
    { component: CenterTrio, emojiCount: 3 },
    { component: CenterQuartet, emojiCount: 4 },
    { component: CenterDuetVertical, emojiCount: 2 },
];

const borderPatterns: { component: React.FC<LayoutProps>; emojiCount: number }[] = [
    { component: BorderCorners, emojiCount: 4 },
    { component: BorderEightPointStar, emojiCount: 8 },
    { component: BorderTwelveGrid, emojiCount: 12 },
    { component: BorderSixteenFrame, emojiCount: 16 },
    { component: BorderChaos, emojiCount: 4 },
];


const EventScene: React.FC<EventSceneProps> = ({ emojis, glowColor }) => {
    // useMemo to select layouts only once per mount
    const { CentralLayout, BorderPattern, centralEmojis, borderEmojis } = useMemo(() => {
        // Ensure we have enough emojis, duplicating if necessary (max possible need is 4 center + 16 border)
        let safeEmojis = [...emojis];
        while (safeEmojis.length < 20) {
            safeEmojis.push(...(emojis.length > 0 ? emojis : ['❓']));
        }
        safeEmojis = [...safeEmojis].sort(() => 0.5 - Math.random()); // Shuffle for variety

        // Filter central layouts to only those we have enough emojis for
        const possibleCentralLayouts = centralLayouts.filter(l => safeEmojis.length >= l.emojiCount);
        const central = possibleCentralLayouts.length > 0
            ? possibleCentralLayouts[Math.floor(Math.random() * possibleCentralLayouts.length)]
            : centralLayouts[0]; // Fallback to solo

        const remainingEmojis = safeEmojis.slice(central.emojiCount);

        // Filter border patterns to only those we have enough REMAINING emojis for
        const possibleBorderPatterns = borderPatterns.filter(p => remainingEmojis.length >= p.emojiCount);
        const border = possibleBorderPatterns.length > 0
            ? possibleBorderPatterns[Math.floor(Math.random() * possibleBorderPatterns.length)]
            : borderPatterns[0]; // Fallback to corners

        const centralEmojis = safeEmojis.slice(0, central.emojiCount);
        const borderEmojis = remainingEmojis.slice(0, border.emojiCount);

        return { 
            CentralLayout: central.component, 
            BorderPattern: border.component, 
            centralEmojis, 
            borderEmojis 
        };
    }, [emojis]);

    return (
        <div className="relative w-full h-56 md:h-72 bg-black/20 rounded-lg overflow-hidden border animate-realm-glow-border"
             style={{
                 boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                 borderColor: glowColor,
                 '--glow-color': glowColor,
             } as React.CSSProperties}>
            <BorderPattern emojis={borderEmojis} />
            <CentralLayout emojis={centralEmojis} />
        </div>
    );
};

export default EventScene;