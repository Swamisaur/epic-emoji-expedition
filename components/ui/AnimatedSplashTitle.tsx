/**
 * @file AnimatedSplashTitle.tsx
 * @description A component to render the main game title on the splash screen
 * with a large, wavy text animation.
 */
import React from 'react';
import WavyText from './WavyText';

const AnimatedSplashTitle: React.FC = () => {
    const titleLine1 = "Epic Emoji";
    const titleLine2 = "Expedition";

    return (
        <div 
            className="relative z-10 text-yellow-400 text-center" 
            style={{ textShadow: '2px 2px 0 #92400e, 4px 4px 0 #78350f, 6px 6px 0 #451a03, 8px 8px 10px rgba(0,0,0,0.5)' }}
        >
            <div className="inline-block text-left">
                 <WavyText
                    text={titleLine1}
                    className="text-[5.52rem] sm:text-[6.325rem] md:text-[7.475rem] lg:text-[8.5rem] xl:text-[10rem] 2xl:text-[11rem]"
                    style={{ lineHeight: 1.2 }}
                    staggerMs={60}
                    delayOffset={0}
                />
                 <WavyText
                    text={titleLine2}
                    className="text-[5.75rem] sm:text-[6.555rem] md:text-[6.9rem] lg:text-[7.5rem] xl:text-[8.8rem] 2xl:text-[9.8rem]"
                    style={{ lineHeight: 0.8 }}
                    staggerMs={60}
                    delayOffset={titleLine1.length}
                />
            </div>
        </div>
    );
};

export default AnimatedSplashTitle;