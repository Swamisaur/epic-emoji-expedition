/**
 * @file WavyText.tsx
 * @description A reusable component to render text with a fun, waving animation on each character.
 */
import React from 'react';

interface WavyTextProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    staggerMs?: number; // Animation stagger delay in milliseconds
    delayOffset?: number; // Index offset for staggering animation
    animationName?: string;
    animationDuration?: number;
}

const WavyText: React.FC<WavyTextProps> = ({ text, className = '', style = {}, staggerMs = 50, delayOffset = 0, animationName = 'wave-flag', animationDuration = 1.4 }) => {
    const words = text.split(' ');
    let characterIndexOffset = delayOffset;

    return (
        <div className={`font-title ${className}`} style={style} aria-label={text}>
            {words.map((word, i) => {
                const characters = Array.from(word); // Use Array.from for proper emoji splitting
                const wordSpan = (
                    <span key={i} className="inline-block whitespace-nowrap">
                        {characters.map((char, j) => {
                            const delay = (characterIndexOffset + j) * staggerMs;
                            return (
                                <span
                                    key={j}
                                    className="inline-block"
                                    style={{
                                        animation: `${animationName} ${animationDuration}s ease-in-out infinite alternate`,
                                        animationDelay: `${delay}ms`
                                    }}
                                >
                                    {char}
                                </span>
                            );
                        })}
                    </span>
                );
                characterIndexOffset += characters.length + 1; // account for space
                return (
                    <React.Fragment key={i}>
                        {wordSpan}
                        {i < words.length - 1 ? ' ' : ''}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default WavyText;