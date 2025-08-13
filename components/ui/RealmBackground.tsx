/**
 * @file RealmBackground.tsx
 * @description Renders a dynamic, infinitely scrolling emoji background
 * that changes based on the current realm.
 */
import React from 'react';
import { REALM_THEMES } from '../../constants';
import { RealmTheme } from '../../types';

interface RealmBackgroundProps {
    stage?: number;
    themeOverride?: RealmTheme;
    direction?: 'horizontal' | 'vertical-down';
}

const RealmBackground: React.FC<RealmBackgroundProps> = ({ stage, themeOverride, direction = 'horizontal' }) => {
    const theme = React.useMemo(() => {
        if (themeOverride) {
            return themeOverride;
        }
        if (stage !== undefined) {
            const themeIndex = (stage - 1) % REALM_THEMES.length;
            return REALM_THEMES[themeIndex] || REALM_THEMES[0];
        }
        return REALM_THEMES[0]; // Default fallback if no props are provided
    }, [stage, themeOverride]);
    
    const { emojis, color } = theme;

    // Create a very long, repeating, and shuffled pattern of emojis for each row
    const patternRow = React.useMemo(() => {
        let p = [];
        for (let i = 0; i < 15; i++) { // 15 repetitions of 5 emojis = 75 emojis
            p.push(...[...emojis].sort(() => 0.5 - Math.random()));
        }
        return p.join('\u00A0\u00A0'); // Add non-breaking spaces for consistent spacing
    }, [emojis]);

    const EmojiRows = () => (
        <>
            {Array.from({ length: 15 }).map((_, rowIndex) => (
                <div 
                    key={rowIndex} 
                    // Offset every second row for a more interesting, diamond-like pattern
                    style={{ transform: `translateX(${rowIndex % 2 === 0 ? '-1.5rem' : '0'})` }}
                >
                    {patternRow}
                </div>
            ))}
        </>
    );

    const commonWrapperStyle: React.CSSProperties = {
        color: `hsl(${color})`,
        fontSize: '3rem', // ~text-5xl
        lineHeight: '1.1',
        // A more prominent opacity to make the glass effect more noticeable.
        opacity: 0.25, 
        whiteSpace: 'nowrap',
    };

    // Horizontal scroll logic
    if (direction === 'horizontal') {
        return (
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="flex h-full" style={{...commonWrapperStyle, width: 'max-content', animation: 'scroll-bg-horizontal-animation 52s linear infinite'}}>
                    <div className="flex-shrink-0"><EmojiRows /></div>
                    <div className="flex-shrink-0"><EmojiRows /></div>
                </div>
            </div>
        );
    }

    // Vertical scroll logic (for splash/gameover screens)
    return (
        <div 
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        >
            <div 
                className="absolute top-0 left-0 w-full h-[200%] animate-scroll-bg-down"
                style={commonWrapperStyle}
            >
                <EmojiRows />
                <EmojiRows />
            </div>
        </div>
    );
};

export default RealmBackground;