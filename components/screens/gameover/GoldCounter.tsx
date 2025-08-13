

/**
 * @file GoldCounter.tsx
 * @description A self-contained component to display an animated counter for gold earned,
 * complete with flying coin emoji effects.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { COIN_EMOJI_TIERS, COIN_TIER_THRESHOLDS } from '../../../constants';

interface GoldCounterProps {
    totalGoldEarned: number;
    startAnimation: boolean;
}

interface FloatingCoin {
    id: number;
    emoji: string;
    startX: string;
    startY: string;
    delay: number;
}

const GoldCounter: React.FC<GoldCounterProps> = ({ totalGoldEarned, startAnimation }) => {
    const [displayGold, setDisplayGold] = useState(0);
    const [floatingCoins, setFloatingCoins] = useState<FloatingCoin[]>([]);
    const [pulseKey, setPulseKey] = useState(0);

    const animationDuration = useMemo(() => Math.max(1500, Math.min(3000, 200 + totalGoldEarned * 5)), [totalGoldEarned]);

    // Effect to animate the gold counter number
    useEffect(() => {
        if (!startAnimation || totalGoldEarned <= 0) {
            if (totalGoldEarned === 0) setDisplayGold(0);
            return;
        };

        let animationFrameId: number;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

            const currentVal = Math.floor(easedProgress * totalGoldEarned);
            setDisplayGold(currentVal);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setDisplayGold(totalGoldEarned);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [startAnimation, totalGoldEarned, animationDuration]);

    // Effect to generate flying coin emojis
    useEffect(() => {
        if (!startAnimation || totalGoldEarned <= 0) return;
        
        const coinCount = Math.min(30, Math.floor(totalGoldEarned / 10));
        if(coinCount === 0 && totalGoldEarned > 0) { // ensure at least one coin animation
             setFloatingCoins([{ 
                id: Date.now(),
                emoji: COIN_EMOJI_TIERS.small,
                startX: `${Math.random() * 200 - 50}%`,
                startY: `${Math.random() * 200 - 50}%`,
                delay: 0,
            }]);
            setTimeout(() => setPulseKey(k => k+1), 800);
            return;
        }

        const coins: FloatingCoin[] = [];
        for (let i = 0; i < coinCount; i++) {
            coins.push({
                id: Date.now() + i,
                emoji: COIN_EMOJI_TIERS.small,
                startX: `${Math.random() * 200 - 50}%`,
                startY: `${Math.random() * 200 - 50}%`,
                delay: (i / coinCount) * (animationDuration - 800), // Distribute over animation duration
            });
        }
        setFloatingCoins(coins);
        
        // Pulse the bag when coins are "landing"
        const pulseInterval = setInterval(() => {
             setPulseKey(k => k + 1);
        }, animationDuration / coinCount);

        // Cleanup
        const cleanupTimeout = setTimeout(() => {
            setFloatingCoins([]);
            clearInterval(pulseInterval);
        }, animationDuration);
        
        return () => {
            clearTimeout(cleanupTimeout);
            clearInterval(pulseInterval);
        };

    }, [startAnimation, totalGoldEarned, animationDuration]);
    
    const counterEmoji = useMemo(() => {
        if (totalGoldEarned >= COIN_TIER_THRESHOLDS.large) return COIN_EMOJI_TIERS.large;
        if (totalGoldEarned >= COIN_TIER_THRESHOLDS.medium) return COIN_EMOJI_TIERS.medium;
        return COIN_EMOJI_TIERS.small;
    }, [totalGoldEarned]);

    return (
        <div className="relative h-full flex items-center justify-end">
            <div className="relative text-3xl sm:text-4xl font-extrabold text-amber-400 flex items-center gap-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                {/* Center of coin collection animation (the target) */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full" id="gold-target"></div>

                <div 
                    key={pulseKey}
                    className="w-12 h-12 flex items-center justify-center animate-bag-pulse"
                >
                    <span className="text-4xl">{counterEmoji}</span>
                </div>
                <span>{displayGold.toLocaleString()}</span>
                
                {/* Flying coin container */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {floatingCoins.map(coin => (
                        <span
                            key={coin.id}
                            className="absolute text-2xl animate-gold-collect opacity-0"
                            style={{
                                // @ts-ignore - CSS custom properties
                                '--start-x': coin.startX,
                                '--start-y': coin.startY,
                                left: '50%',
                                top: '50%',
                                animationDelay: `${coin.delay}ms`
                            }}
                        >
                            {coin.emoji}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GoldCounter;