/**
 * @file RealmSpawnAnimations.tsx
 * @description Contains the unique, handcrafted spawn animation components for each realm.
 * This is where the artistic vision for each enemy reveal is implemented.
 */
import React, { useMemo } from 'react';
import { Haze, AnimatedParticle } from './AnimationPrimitives';

// --- Pirate's Cove ---
const PirateCoveSpawn: React.FC = () => {
    // Memoize the random properties for the waves so they are consistent on re-renders.
    const waves = useMemo(() => Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        emoji: ['🌊', '💧'][Math.floor(Math.random() * 2)],
        style: {
            fontSize: `${2 + Math.random() * 1.5}rem`,
            '--slide-to-x': i % 2 === 0 ? `translateX(-${60 + Math.random() * 20}px)` : `translateX(${60 + Math.random() * 20}px)`,
        } as React.CSSProperties,
        delay: `${0.3 + i * 0.2}s`,
        duration: `0.8s`
    })), []);

    // Memoize the random properties for the flotsam.
    const flotsam = useMemo(() => Array.from({ length: 3 }).map((_, i) => ({
        id: i,
        emoji: ['🐚', '🌴', '🥥'][Math.floor(Math.random() * 3)],
        style: {
            fontSize: `${1.5 + Math.random()}rem`,
            left: `${35 + Math.random() * 30}%`,
            top: `${40 + Math.random() * 20}%`,
            filter: 'drop-shadow(0 0 5px #fff)'
        } as React.CSSProperties,
        delay: `${1.2 + i * 0.1}s`,
        duration: '0.8s'
    })), []);

    return (
        <>
            <Haze color="rgba(21, 94, 117, 0.6)" duration={2200} />
            {waves.map(w => <AnimatedParticle key={w.id} animation="realm-wave-slide-in-out" {...w}>{w.emoji}</AnimatedParticle>)}
            {flotsam.map(f => <AnimatedParticle key={f.id} animation="realm-flotsam-glitter" {...f}>{f.emoji}</AnimatedParticle>)}
        </>
    );
};

// --- Whispering Woods ---
const WhisperingWoodsSpawn: React.FC = () => {
    // Generate a random assortment of forest emojis for a dynamic feel.
    const forestLife = useMemo(() => Array.from({ length: 7 }).map((_, i) => {
        const isTree = i < 2; // Ensure at least two big trees
        const emojiOptions = ['🌳', '🌿', '🍄', '🦋', '🌲'];
        const randomEmoji = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
        return {
            id: i,
            emoji: isTree ? '🌳' : randomEmoji,
            style: {
                fontSize: `${isTree ? 3.5 : 1.5 + Math.random()}rem`,
                left: `${15 + Math.random() * 70}%`,
                top: `${20 + Math.random() * 60}%`,
                '--slide-apart-x': `translateX(${i % 2 === 0 ? '-' : ''}${80 + Math.random() * 40}px)`,
            } as React.CSSProperties,
            shakeInDelay: `${0.3 + i * 0.15}s`,
            slideOutDelay: `${1.3 + i * 0.05}s`,
        };
    }), []);

    return (
        <>
            <Haze color="rgba(22, 101, 52, 0.6)" duration={2200} />
            {forestLife.map(f => (
                <div key={f.id}>
                    {/* Animate the emoji shaking into view */}
                    <AnimatedParticle 
                        animation="realm-emoji-shake-in" 
                        delay={f.shakeInDelay} 
                        duration="0.5s" 
                        style={{ ...f.style, animationFillMode: 'both' }} // Use 'both' to hold the 'shaken-in' state
                    >
                        {f.emoji}
                    </AnimatedParticle>
                     {/* Animate the emoji sliding away */}
                     <AnimatedParticle 
                        animation="realm-emoji-slide-apart" 
                        delay={f.slideOutDelay} 
                        duration="0.6s" 
                        style={f.style}
                    >
                        {f.emoji}
                    </AnimatedParticle>
                </div>
            ))}
        </>
    );
};

// --- Scorched Sands ---
const ScorchedSandsSpawn: React.FC = () => {
    // Create a sandstorm from multiple swirling particles.
    const particles = useMemo(() => Array.from({ length: 12 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 100 + Math.random() * 50; // Start far away
        
        // Define start and end points for the particle's journey
        return {
            id: i,
            emoji: ['💨', '⏳', '🏜️'][Math.floor(Math.random() * 3)],
            style: {
                fontSize: `${1.5 + Math.random() * 1.5}rem`,
                '--start-x': `${Math.cos(angle) * radius}px`,
                '--start-y': `${Math.sin(angle) * radius}px`,
                '--start-rot': `${Math.random() * 360}deg`,
                '--end-x': `${Math.cos(angle) * (radius + 50)}px`,
                '--end-y': `${Math.sin(angle) * (radius + 50)}px`,
            } as React.CSSProperties,
            delay: `${0.3 + Math.random() * 0.4}s`,
            duration: `${1.2 + Math.random() * 0.3}s`,
        };
    }), []);

    return (
        <>
            <Haze color="rgba(217, 119, 6, 0.5)" duration={2200} />
            {particles.map(p => (
                <AnimatedParticle 
                    key={p.id} 
                    animation="realm-sandstorm-particle"
                    {...p}
                >
                    {p.emoji}
                </AnimatedParticle>
            ))}
        </>
    );
};

// --- Inferno Peak ---
const InfernoPeakSpawn: React.FC = () => {
    // Magma cracks appearing on the ground
    const cracks = useMemo(() => Array.from({ length: 3 }).map((_, i) => ({
        id: i,
        emoji: '🔥',
        style: {
            fontSize: '2rem',
            left: `${20 + i * 30 + Math.random() * 10}%`,
            top: `${50 + Math.random() * 20}%`,
            transform: `rotate(${Math.random() * 360}deg) scale(1, 0.2)`, // Squish to look like cracks
        } as React.CSSProperties,
        delay: `${0.3 + i * 0.2}s`,
        duration: '1s',
    })), []);

    // Explosive particles for the eruption
    const particles = useMemo(() => Array.from({ length: 10 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 80 + Math.random() * 40;
        return {
            id: i,
            emoji: ['🔥', '💨', '💥'][Math.floor(Math.random() * 3)],
            style: {
                fontSize: `${2 + Math.random() * 1.5}rem`,
                left: '50%',
                top: '50%',
                '--end-x': `${Math.cos(angle) * radius}px`,
                '--end-y': `${Math.sin(angle) * radius}px`,
            } as React.CSSProperties,
            delay: `${1.2 + Math.random() * 0.2}s`,
            duration: `0.8s`,
        };
    }), []);

    return (
        <>
            <Haze color="rgba(159, 18, 57, 0.5)" duration={2200} />
            {/* Stage 1: Magma Cracks */}
            {cracks.map(c => <AnimatedParticle key={c.id} animation="realm-magma-crack-glow" {...c}>{c.emoji}</AnimatedParticle>)}
            {/* Stage 2: Lava Bubble */}
            <AnimatedParticle animation="realm-lava-bubble" delay="1.2s" duration="0.4s" style={{ fontSize: '3rem', left: '50%', top: '50%', transform: 'translateX(-50%)' }}>
                ❤️‍🔥
            </AnimatedParticle>
            {/* Stage 3: Eruption */}
            {particles.map(p => <AnimatedParticle key={p.id} animation="realm-eruption-blast" {...p}>{p.emoji}</AnimatedParticle>)}
        </>
    );
};

// --- Fallen Citadel ---
const FallenCitadelSpawn: React.FC = () => {
    // Generate ghostly wisps that will swirl into the center.
    const wisps = useMemo(() => Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const radius = 120 + Math.random() * 40;
        return {
            id: i,
            emoji: ['👻', '🌫️'][Math.floor(Math.random() * 2)],
            style: {
                fontSize: `${1.5 + Math.random() * 1.5}rem`,
                '--start-x': `${Math.cos(angle) * radius}px`,
                '--start-y': `${Math.sin(angle) * radius}px`,
            } as React.CSSProperties,
            delay: `${0.3 + Math.random() * 0.5}s`,
            duration: `1.2s`,
        };
    }), []);

    return (
        <>
            <Haze color="rgba(71, 85, 105, 0.6)" duration={2200} />
            {wisps.map(w => (
                <AnimatedParticle key={w.id} animation="realm-ghostly-swirl-in" {...w}>
                    {w.emoji}
                </AnimatedParticle>
            ))}
            <AnimatedParticle animation="realm-spirit-flash" delay="1.6s" duration="0.5s" style={{ fontSize: '6rem', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                ✨
            </AnimatedParticle>
        </>
    );
};

// --- Haunted Catacombs ---
const HauntedCatacombsSpawn: React.FC = () => {
    // Stage 1: Cracks appear
    const cracks = useMemo(() => [
        { id: 'c1', left: '50%', top: '65%', width: '100px', height: '4px', transform: 'translateX(-50%) rotate(-5deg)' },
        { id: 'c2', left: '30%', top: '60%', width: '70px', height: '3px', transform: 'translateX(-50%) rotate(20deg)' },
        { id: 'c3', left: '70%', top: '58%', width: '80px', height: '3px', transform: 'translateX(-50%) rotate(-15deg)' },
    ].map((c, i) => ({
        ...c,
        delay: `${0.3 + i * 0.15}s`,
        duration: '0.7s'
    })), []);

    // Stage 2: Skeletal parts emerge then implode
    const parts = useMemo(() => [
        { id: 'p1', emoji: '✋', left: '45%', top: '50%', startRot: -30 },
        { id: 'p2', emoji: '🦴', left: '30%', top: '48%', startRot: 20 },
        { id: 'p3', emoji: '💀', left: '50%', top: '40%', startRot: 0 },
        { id: 'p4', emoji: '✋', left: '65%', top: '52%', startRot: 35 },
    ].map((p, i) => {
        // Calculate the translation needed to move from initial position to the center (50%, 50%)
        const endX = 50 - parseFloat(p.left);
        const endY = 50 - parseFloat(p.top);
        return {
            ...p,
            emergeDelay: `${0.9 + i * 0.1}s`,
            implodeDelay: `${1.5 + i * 0.08}s`,
            style: {
                fontSize: '2.5rem',
                left: p.left,
                top: p.top,
                '--start-rot': `${p.startRot}deg`,
                '--end-x': `${endX}%`,
                '--end-y': `${endY}%`,
            } as React.CSSProperties
        };
    }), []);

    return (
        <>
            <Haze color="rgba(76, 29, 149, 0.6)" duration={2200} />
            {/* Render cracks */}
            {cracks.map(crack => (
                <AnimatedParticle
                    key={crack.id}
                    animation="realm-spectral-crack-appear"
                    delay={crack.delay}
                    duration={crack.duration}
                    style={{
                        left: crack.left,
                        top: crack.top,
                        width: crack.width,
                        height: crack.height,
                        transform: crack.transform,
                        backgroundColor: '#c4b5fd',
                        borderRadius: '50%',
                    }}
                >
                    {''}
                </AnimatedParticle>
            ))}
            {/* Render skeletal parts */}
            {parts.map(part => (
                <div key={part.id}>
                    {/* Emerge animation */}
                    <AnimatedParticle
                        animation="realm-skeletal-emerge"
                        delay={part.emergeDelay}
                        duration="0.5s"
                        style={{ ...part.style, animationFillMode: 'forwards' }} // Use forwards to hold emerge position
                    >
                        {part.emoji}
                    </AnimatedParticle>
                    {/* Implode animation */}
                    <AnimatedParticle
                        animation="realm-fragments-implode"
                        delay={part.implodeDelay}
                        duration="0.4s"
                        style={part.style}
                    >
                        {part.emoji}
                    </AnimatedParticle>
                </div>
            ))}
        </>
    );
};

// --- Scrapheap Metropolis ---
const ScrapheapMetropolisSpawn: React.FC = () => {
    // Stage 1: Magnet appears and pulses
    const magnet = {
        id: 'magnet',
        emoji: '🧲',
        style: {
            fontSize: '3rem',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        } as React.CSSProperties,
        delay: '0.3s',
        duration: '2.1s', // Pulse for the whole duration
    };

    // Stage 2: Scrap parts are pulled in and then vanish
    const scrapParts = useMemo(() => Array.from({ length: 15 }).map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const startRadius = 150 + Math.random() * 50; // Start far off-screen
        const endRadius = 15 + Math.random() * 30;
        const endAngle = Math.random() * Math.PI * 2;
        return {
            id: i,
            emoji: ['🔩', '⚙️', '🔌', '🗜️'][Math.floor(Math.random() * 4)],
            style: {
                fontSize: `${1.5 + Math.random()}rem`,
                left: '50%',
                top: '50%',
                '--start-x': `${Math.cos(angle) * startRadius}px`,
                '--start-y': `${Math.sin(angle) * startRadius}px`,
                '--end-x': `${Math.cos(endAngle) * endRadius}px`,
                '--end-y': `${Math.sin(endAngle) * endRadius}px`,
            } as React.CSSProperties,
            delay: `${0.4 + i * 0.04}s`,
            duration: '1.1s',
        };
    }), []);

    // Sparks and electricity effects that fly in and disappear
    const sparks = useMemo(() => Array.from({ length: 8 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 150 + Math.random() * 50;
        return {
            id: i,
            emoji: '⚡️',
            style: {
                fontSize: '2rem',
                left: '50%',
                top: '50%',
                '--start-x': `${Math.cos(angle) * radius}px`,
                '--start-y': `${Math.sin(angle) * radius}px`,
                '--end-x': '0px',
                '--end-y': '0px',
            } as React.CSSProperties,
            delay: `${0.4 + Math.random() * 1.0}s`,
            duration: '0.6s'
        };
    }), []);


    return (
        <>
            <Haze color="rgba(71, 85, 105, 0.7)" duration={2200} />
            {/* Magnet */}
            <AnimatedParticle animation="realm-magnet-pulse" {...magnet}>
                {magnet.emoji}
            </AnimatedParticle>
            {/* Sparks */}
            {sparks.map(spark => (
                <AnimatedParticle key={spark.id} animation="realm-scrap-pull-and-vanish" {...spark}>
                    {spark.emoji}
                </AnimatedParticle>
            ))}
            {/* Scrap */}
            {scrapParts.map(part => (
                <AnimatedParticle key={part.id} animation="realm-scrap-pull-and-vanish" {...part}>
                    {part.emoji}
                </AnimatedParticle>
            ))}
            {/* Final flash happens just as the scrap vanishes */}
             <AnimatedParticle 
                animation="realm-magnetic-implosion" 
                delay="2.0s" 
                duration="0.2s"
                style={{
                    fontSize: '8rem',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#60a5fa', // blue-400
                    borderRadius: '50%',
                }}
            >
                {''}
            </AnimatedParticle>
        </>
    );
};

// --- Glacial Peak ---
const GlacialPeakSpawn: React.FC = () => {
    // Stage 1: Ice block materializes
    const iceBlock = {
        id: 'ice-block',
        emoji: '🧊',
        style: {
            fontSize: '5rem',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        } as React.CSSProperties,
        delay: '0.3s',
        duration: '1.2s'
    };
    
    // Stage 2: Cracks spread
    const cracks = {
        id: 'ice-cracks',
        emoji: '💥',
        style: {
             fontSize: '8rem',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            mixBlendMode: 'screen',
        } as React.CSSProperties,
        delay: '1.1s',
        duration: '0.5s',
    };

    // Stage 3: Shatter particles
    const shards = useMemo(() => Array.from({ length: 15 }).map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 100 + Math.random() * 50;
        return {
            id: i,
            emoji: '❄️',
            style: {
                fontSize: `${1.5 + Math.random() * 1.5}rem`,
                left: '50%',
                top: '50%',
                '--end-x': `${Math.cos(angle) * radius}px`,
                '--end-y': `${Math.sin(angle) * radius}px`,
                '--end-rot': `${(Math.random() - 0.5) * 720}deg`,
            } as React.CSSProperties,
            delay: `${1.3 + Math.random() * 0.1}s`,
            duration: '0.8s',
        };
    }), []);

    return (
        <>
            <Haze color="rgba(103, 232, 249, 0.5)" duration={2200} />
            <AnimatedParticle animation="realm-ice-materialize" {...iceBlock}>{iceBlock.emoji}</AnimatedParticle>
            <AnimatedParticle animation="realm-ice-cracks" {...cracks}>{cracks.emoji}</AnimatedParticle>
            {shards.map(shard => <AnimatedParticle key={shard.id} animation="realm-ice-shatter" {...shard}>{shard.emoji}</AnimatedParticle>)}
        </>
    );
};

// --- Tangled Jungle ---
const TangledJungleSpawn: React.FC = () => {
    const backgroundVines = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        emoji: ['🌿', '🍃', '🌱'][i % 3],
        style: {
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.7})`,
            fontSize: '3rem',
        } as React.CSSProperties,
    })), []);

    const leaves = useMemo(() => Array.from({ length: 20 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 100 + Math.random() * 50;
        return {
            id: i,
            emoji: ['🌿', '🍃'][i % 2],
            style: {
                fontSize: `${1.5 + Math.random() * 1.5}rem`,
                left: '50%',
                top: '50%',
                '--end-x': `${Math.cos(angle) * radius}px`,
                '--end-y': `${Math.sin(angle) * radius}px`,
                '--rot': `${(Math.random() - 0.5) * 540}deg`,
            } as React.CSSProperties,
            delay: `${0.8 + Math.random() * 0.4}s`,
            duration: '1.2s',
        };
    }), []);

    return (
        <>
            <Haze color="rgba(21, 128, 61, 0.6)" duration={2400} />
            <div 
                className="absolute inset-[-50%] opacity-0"
                style={{ animation: 'realm-jungle-curtain-fade-in 0.5s forwards 0.2s, realm-jungle-curtain-part 1.2s ease-in-out forwards 0.8s' }}
            >
                {backgroundVines.map(v => <div key={v.id} style={v.style}>{v.emoji}</div>)}
            </div>
            {leaves.map(leaf => (
                <AnimatedParticle key={leaf.id} animation="realm-leaf-burst" {...leaf}>{leaf.emoji}</AnimatedParticle>
            ))}
        </>
    );
};


// --- Contaminated Sewers ---
const ContaminatedSewersSpawn: React.FC = () => {
    // Sludge streams ooze in, then implode.
    const sludge = useMemo(() => Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const radius = 100 + Math.random() * 30; // Start off-screen
        const endRadius = 15 + Math.random() * 25; // Settle in a puddle
        const endAngle = Math.random() * Math.PI * 2;
        
        const puddleX = Math.cos(endAngle) * endRadius;
        const puddleY = Math.sin(endAngle) * endRadius;

        return {
            id: i,
            emoji: '🟢',
            style: {
                fontSize: `${2 + Math.random()}rem`,
                left: '50%',
                top: '50%',
                '--start-x': `${Math.cos(angle) * radius}px`,
                '--start-y': `${Math.sin(angle) * radius}px`,
                '--end-x': `${-puddleX}px`, // Implode FROM puddle TO center
                '--end-y': `${-puddleY}px`,
                '--start-rot': `${Math.random() * 360}deg`,
                 transform: `translate(${puddleX}px, ${puddleY}px)`,
            } as React.CSSProperties,
            appearDelay: `${0.3 + i * 0.1}s`,
            implodeDelay: `1.8s`,
        };
    }), []);

    // Eyes and bubbles pop in the formed puddle
    const bubbles = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        emoji: ['👁️', '🫧'][Math.floor(Math.random() * 2)],
        style: {
            fontSize: `${1.5 + Math.random()}rem`,
            left: `${40 + Math.random() * 20}%`,
            top: `${45 + Math.random() * 15}%`,
            transform: `translate(-50%, -50%)`,
        } as React.CSSProperties,
        delay: `${1.3 + Math.random() * 0.8}s`,
        duration: `0.8s`
    })), []);

    return (
        <>
            <Haze color="rgba(101, 163, 13, 0.6)" duration={2200} />
            {sludge.map(s => (
                <div key={s.id}>
                    {/* Animate IN to puddle position */}
                    <AnimatedParticle
                        animation="realm-sludge-ooze-in"
                        delay={s.appearDelay}
                        duration="1s"
                        style={{ ...s.style, transform: 'none', animationFillMode: 'forwards' }}
                    >
                        {s.emoji}
                    </AnimatedParticle>
                    {/* Animate OUT from puddle position */}
                    <AnimatedParticle
                        animation="realm-fragments-implode"
                        delay={s.implodeDelay}
                        duration="0.4s"
                        style={s.style}
                    >
                        {s.emoji}
                    </AnimatedParticle>
                </div>
            ))}
            {bubbles.map(b => (
                <AnimatedParticle key={b.id} animation="realm-sludge-bubble-pop" {...b}>
                    {b.emoji}
                </AnimatedParticle>
            ))}
        </>
    );
};

// --- The Mad King's Vault ---
const MadKingsVaultSpawn: React.FC = () => {
    // Stage 1: Treasure rains down and collects into a central point
    const treasures = useMemo(() => Array.from({ length: 25 }).map((_, i) => {
        const pileX = (Math.random() - 0.5) * 80; // A pile width of 80px
        const pileY = (Math.random() - 0.5) * 40; // A pile height of 40px
        return {
            id: i,
            emoji: ['🪙', '💎', '👑'][i % 3],
            style: {
                fontSize: `${1.5 + Math.random()}rem`,
                left: '50%',
                top: '50%',
                '--start-x': `${(Math.random() - 0.5) * 200}px`,
                '--start-y': `${-150 - Math.random() * 50}px`,
                '--pile-x': `${pileX}px`,
                '--pile-y': `${50 + pileY}px`, // Pile at bottom center
            } as React.CSSProperties,
            delay: `${0.2 + i * 0.03}s`,
            duration: `1.2s`,
        };
    }), []);

    return (
        <>
            <Haze color="rgba(252, 211, 77, 0.5)" duration={2200} />
            {treasures.map(t => (
                <AnimatedParticle key={t.id} animation="realm-treasure-rain-and-collect" {...t}>
                    {t.emoji}
                </AnimatedParticle>
            ))}
            <AnimatedParticle 
                animation="realm-treasure-flash" 
                delay="1.8s" 
                duration="0.5s"
                style={{
                    fontSize: '8rem',
                    left: '50%',
                    top: '50%',
                    backgroundColor: '#fde047', // yellow-300
                    borderRadius: '50%',
                }}
            >
                {''}
            </AnimatedParticle>
        </>
    );
};


/**
 * A map that links each realm's name to its unique spawn animation component.
 * This allows the `EnemyCharacter` component to dynamically render the correct animation.
 */
export const SPAWN_ANIMATION_MAP: Record<string, React.FC> = {
    "Pirate's Cove": PirateCoveSpawn,
    "Whispering Woods": WhisperingWoodsSpawn,
    "Scorched Sands": ScorchedSandsSpawn,
    "Inferno Peak": InfernoPeakSpawn,
    "Fallen Citadel": FallenCitadelSpawn,
    "Haunted Catacombs": HauntedCatacombsSpawn,
    "Scrapheap Metropolis": ScrapheapMetropolisSpawn,
    "Glacial Peak": GlacialPeakSpawn,
    "Tangled Jungle": TangledJungleSpawn,
    "Contaminated Sewers": ContaminatedSewersSpawn,
    "The Mad King's Vault": MadKingsVaultSpawn,
};