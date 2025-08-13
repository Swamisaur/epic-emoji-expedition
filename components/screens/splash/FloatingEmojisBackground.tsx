/**
 * @file FloatingEmojisBackground.tsx
 * @description Renders the dynamic, drifting emoji background for the splash screen.
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
 * - Opacity: 0.2 to 1.0, with smaller emojis being more transparent.
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
    // The range is mapped to [0.2, 1.0].
    let opacity = 0.2 + Math.pow(normalized, 2) * (1.0 - 0.2);

    // If the size is in the top 40th percentile of the bell curve (normalized > 0.6), make it fully opaque.
    // This makes more of the larger emojis stand out.
    if (normalized > 0.6) {
        opacity = 1.0;
    }

    return { sizeMultiplier, opacity };
};

const FloatingEmojisBackground: React.FC = React.memo(() => {
    const emojis = useMemo(() => {
        const allEmojis = ['🏞️', '⚔️', '👹', '💰', '👑', '💎', '🛡️', '👻', '🤖', '🔥', '✨', '🌲', '🌳', '🌿', '🍄', '🦋', '🌵', '🐍', '🦂', '🌋', '☄️', '🏰', '💀', '⛓️', '⚰️', '🕯️', '🔩', '⚙️', '🦾', '🔌', '👽', '🛸', '👾', '🪐', '⭐', '💫', '🚀', '😇', '🦊', '🦄', '🕊️', '🧞', '👁️', '😈', '❤️', '❤️‍🩹', '💥', '🎯'];
        const repeatedEmojis = [];
        for (let i = 0; i < 90; i++) { // Optimized: Reduced from 150 to 90
            repeatedEmojis.push(allEmojis[i % allEmojis.length]);
        }
        return repeatedEmojis;
    }, []);

    const emojiStyles = useMemo(() => {
        return emojis.map(() => {
            const baseSizeRem = 1.5;
            const { sizeMultiplier, opacity } = generateSizeAndOpacity();

            // --- New Speed Logic ---
            // Linear interpolation for speed multiplier.
            // sizeMultiplier: 1 (smallest) -> speedMultiplier: 6
            // sizeMultiplier: 10 (largest) -> speedMultiplier: 1
            const speedMultiplier = 6 - (5 * (sizeMultiplier - 1) / 9);
            const baseDuration = Math.random() * 72 + 48; // Base duration increased by 20% for slower effect
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
            const endRotation = startRotation + (Math.random() * 720 - 360);

            return {
                // @ts-ignore - Custom properties for animation
                '--end-tx': endTranslateX,
                '--end-ty': endTranslateY,
                '--start-rot': `${startRotation}deg`,
                '--end-rot': `${endRotation}deg`,
                top: startTop,
                left: startLeft,
                fontSize: `${baseSizeRem * sizeMultiplier}rem`,
                opacity: opacity,
                animationDuration: `${animationDuration}s`,
                animationDelay: `-${Math.random() * 50}s`,
            };
        });
    }, [emojis]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {emojis.map((emoji, i) => (
                <span
                    key={i}
                    className="absolute animate-drift-across"
                    style={emojiStyles[i] as React.CSSProperties}
                >
                    {emoji}
                </span>
            ))}
        </div>
    );
});

export default FloatingEmojisBackground;