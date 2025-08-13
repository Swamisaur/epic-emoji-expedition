
/**
 * @file AnimatedStatLine.tsx
 * @description A component that animates a numerical value from a start to an end point.
 */
import React, { useState, useEffect } from 'react';

interface AnimatedStatLineProps {
    label?: string;
    start: number;
    end: number;
    duration: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    highlightClass?: string;
    startAnimation: boolean;
    delay?: number;
}

const AnimatedStatLine: React.FC<AnimatedStatLineProps> = ({ label, start, end, duration, decimals = 0, prefix = '', suffix = '', highlightClass = 'text-green-400 font-bold', startAnimation, delay = 0 }) => {
    const [currentValue, setCurrentValue] = useState(start);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!startAnimation) return;

        const startTimeout = setTimeout(() => {
            setIsVisible(true);
            let animationFrameId: number;
            const startTime = Date.now();
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

                const animatedValue = start + (end - start) * easedProgress;
                setCurrentValue(animatedValue);

                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    setCurrentValue(end); // Ensure final value is exact
                }
            };

            animationFrameId = requestAnimationFrame(animate);

            return () => cancelAnimationFrame(animationFrameId);
        }, delay);

        return () => clearTimeout(startTimeout);

    }, [startAnimation, start, end, duration, delay]);

    const formattedValue = currentValue.toFixed(decimals);

    if (label) {
        return (
            <li className={`transition-opacity duration-300 text-sm ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {label} {(prefix && start > 0 ? prefix : '')}{start.toFixed(decimals)}{suffix} → <span className={highlightClass}>{(prefix && currentValue > 0 ? prefix : '')}{formattedValue}{suffix}</span>
            </li>
        );
    }

    return (
        <strong className={`transition-opacity duration-300 text-sm ${isVisible ? 'opacity-100' : 'opacity-0'} ${highlightClass}`}>
            {prefix}{formattedValue}{suffix}
        </strong>
    );
};

export default AnimatedStatLine;
