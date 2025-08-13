/**
 * @file AnimatedHeaderTitle.tsx
 * @description A component to render the main game title with a fun, waving animation.
 */
import React from 'react';

const AnimatedHeaderTitle: React.FC = () => {
    const fullTitle = "Epic Emoji Expedition";
    const shortTitle = "E E E";

    const renderAnimatedLine = (text: string) => {
        return text.split('').map((char, index) => (
            <span
                key={index}
                className="inline-block"
                style={{
                    // Apply the wave animation with a staggered delay for each character
                    animation: `wave-flag 1.4s ease-in-out infinite alternate`,
                    animationDelay: `${index * 0.05}s`
                }}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <h1 
            className="font-title text-3xl sm:text-4xl md:text-5xl text-yellow-400" 
            style={{ textShadow: '2px 2px 0 #92400e, 4px 4px 0 #78350f, 6px 6px 0 #451a03, 8px 8px 10px rgba(0,0,0,0.5)' }}
            aria-label="Epic Emoji Expedition"
        >
            <span className="hidden sm:inline">{renderAnimatedLine(fullTitle)}</span>
            <span className="inline sm:hidden">{renderAnimatedLine(shortTitle)}</span>
        </h1>
    );
};

export default AnimatedHeaderTitle;