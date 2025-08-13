/**
 * @file EventBackground.tsx
 * @description Renders the dynamic, raining emoji background for the event screen.
 */
import React, { useMemo } from 'react';

/**
 * Generates a random number following a standard normal distribution.
 * Uses the Box-Muller transform.
 */
const randomNormal = () => {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
};

/**
 * Generates size and opacity multipliers for emojis following a bell-curve distribution.
 * This ensures that size and opacity are linked, as requested.
 * - Size multiplier: 1x to 10x, centered around 2x.
 * - Opacity: 0.1 to 1.0, with smaller emojis being more transparent for a subtle effect.
 */
const generateSizeAndOpacity = () => {
    const z0 = randomNormal();
    const zClamped = Math.max(-3, Math.min(3, z0)); // Clamp to 3 standard deviations
    const normalized = (zClamped + 3) / 6; // Normalize to a 0-1 range

    let sizeMultiplier;
    if (normalized < 0.5) {
        // Map the lower half of the "bell curve" (0 to 0.5) to the size range [1x, 2x]
        sizeMultiplier = 1 + (normalized / 0.5) * (2 - 1);
    } else {
        // Map the upper half of the "bell curve" (0.5 to 1) to the size range [2x, 10x]
        sizeMultiplier = 2 + ((normalized - 0.5) / 0.5) * (10 - 2);
    }

    // Tie opacity to the same normalized value, with a ceiling.
    // The base range is mapped to [0.1, 0.8] for subtlety.
    let opacity = 0.1 + Math.pow(normalized, 2) * (0.8 - 0.1);

    // If the size is in the top 40th percentile of the bell curve (normalized > 0.6), make it fully opaque.
    // This makes more of the larger emojis stand out.
    if (normalized > 0.6) {
        opacity = 1.0;
    }

    return { sizeMultiplier, opacity };
};


const DriftingEmoji: React.FC<{ emoji: string; index: number }> = ({ emoji, index }) => {
    const style = useMemo(() => {
        const baseSizeRem = 2.25; // Corresponds to text-4xl
        const { sizeMultiplier, opacity } = generateSizeAndOpacity();

        // --- Speed Logic ---
        const speedMultiplier = 6 - (5 * (sizeMultiplier - 1) / 9);
        const baseDuration = (Math.random() * 24 + 30); // 20% slower: 30s to 54s base
        const animationDuration = baseDuration / speedMultiplier;

        // --- All-directions logic ---
        const startEdge = Math.floor(Math.random() * 8); // 0-7 for 8 directions
        let startTop, startLeft, endTranslateX, endTranslateY;
        const randPercent = () => Math.random() * 100;
        const sideDriftX = `${(Math.random() * 40 - 20)}vw`;
        const sideDriftY = `${(Math.random() * 40 - 20)}vh`;

        switch (startEdge) {
            case 0: // top
                startTop = '-30%'; startLeft = `${randPercent()}%`;
                endTranslateX = sideDriftX; endTranslateY = '160vh';
                break;
            case 1: // top-right
                startTop = '-30%'; startLeft = '130%';
                endTranslateX = '-160vw'; endTranslateY = '160vh';
                break;
            case 2: // right
                startTop = `${randPercent()}%`; startLeft = '130%';
                endTranslateX = '-160vw'; endTranslateY = sideDriftY;
                break;
            case 3: // bottom-right
                startTop = '130%'; startLeft = '130%';
                endTranslateX = '-160vw'; endTranslateY = '-160vh';
                break;
            case 4: // bottom
                startTop = '130%'; startLeft = `${randPercent()}%`;
                endTranslateX = sideDriftX; endTranslateY = '-160vh';
                break;
            case 5: // bottom-left
                startTop = '130%'; startLeft = '-30%';
                endTranslateX = '160vw'; endTranslateY = '-160vh';
                break;
            case 6: // left
                startTop = `${randPercent()}%`; startLeft = '-30%';
                endTranslateX = '160vw'; endTranslateY = sideDriftY;
                break;
            case 7: // top-left
            default:
                startTop = '-30%'; startLeft = '-30%';
                endTranslateX = '160vw'; endTranslateY = '160vh';
                break;
        }

        const startRotation = Math.random() * 360;
        const endRotation = startRotation + (Math.random() * 360 - 180);

        return {
            // @ts-ignore - Custom properties for animation
            '--end-tx': endTranslateX,
            '--end-ty': endTranslateY,
            '--start-rot': `${startRotation}deg`,
            '--end-rot': `${endRotation}deg`,
            '--start-scale': '0.8',
            '--end-scale': '1.2',
            top: startTop,
            left: startLeft,
            fontSize: `${baseSizeRem * sizeMultiplier}rem`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `-${Math.random() * 48}s`,
            filter: 'blur(1px)',
            opacity: opacity,
        };
    }, []);

    return (
        <span
            className="absolute animate-drift-across"
            style={style as React.CSSProperties}
            aria-hidden="true"
        >
            {emoji}
        </span>
    );
};

const EventBackground: React.FC<{ emojis: string[] }> = ({ emojis }) => {
    const repeatedEmojis = useMemo(() => {
        const base = emojis;
        if (base.length === 0) return [];
        let arr = [];
        // Generate enough emojis for a full-screen effect
        for(let i=0; i<50; i++) { // Optimized: Reduced from 80
            arr.push(base[i % base.length]);
        }
        return arr;
    }, [emojis]);

    return (
        <div 
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" 
            aria-hidden="true"
        >
            {repeatedEmojis.map((emoji, i) => <DriftingEmoji key={i} emoji={emoji} index={i} />)}
        </div>
    );
};

export default EventBackground;