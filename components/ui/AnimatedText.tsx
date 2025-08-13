/**
 * @file AnimatedText.tsx
 * @description A reusable component for displaying text with a letter-by-letter animation.
 */
import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
    text: string;
    className?: string;
    onComplete?: () => void;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reset the animation whenever the text prop changes.
    useEffect(() => {
        setCurrentIndex(0);
    }, [text]);

    // This effect handles the character-by-character animation timer.
    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, 8); // 11ms -> 8ms (approx 30% faster)
            return () => clearTimeout(timeout);
        } else if (currentIndex === text.length) {
            // Animation is complete, trigger the callback if it exists.
            onComplete?.();
        }
    }, [currentIndex, text, onComplete]);

    // Derive the currently visible text from the state.
    const displayedText = text.substring(0, currentIndex);
    const finalClassName = className || "text-amber-100 font-semibold text-xl leading-snug";

    return <p className={finalClassName} style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>{displayedText}</p>;
};

export default AnimatedText;