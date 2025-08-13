/**
 * @file AnimationPrimitives.tsx
 * @description Contains reusable, primitive components for building complex spawn animations.
 * This includes particles and atmospheric effects.
 */
import React from 'react';

/**
 * A generic animated particle component for spawning emojis.
 * @param {string} animation - The name of the CSS animation to play.
 * @param {string} delay - The animation-delay value.
 * @param {string} duration - The animation-duration value.
 * @param {React.CSSProperties} style - Additional inline styles, often including custom properties for the animation.
 * @param {React.ReactNode} children - The emoji or content to render inside the particle.
 */
export const AnimatedParticle: React.FC<{ animation: string; delay: string; duration: string; style: React.CSSProperties; children: React.ReactNode }> = ({ animation, delay, duration, style, children }) => (
    <div className="absolute opacity-0 pointer-events-none" style={{ animation: `${animation} ${duration} forwards ${delay}`, ...style }}>
        {children}
    </div>
);

/**
 * A reusable haze/fog effect for the background of spawn animations.
 * @param {string} color - The color of the haze (e.g., 'rgba(21, 94, 117, 0.6)').
 * @param {number} duration - The total duration of the animation sequence in milliseconds. The haze will fade out at the end.
 */
export const Haze: React.FC<{ color: string, duration: number }> = ({ color, duration }) => (
    <div className="absolute inset-0 flex items-center justify-center">
        <div 
            className="w-48 h-24 rounded-full opacity-0"
            style={{
                background: `radial-gradient(ellipse, ${color} 20%, transparent 70%)`,
                animation: `realm-haze-appear 0.4s ease-out forwards, realm-haze-dissipate 0.5s ease-in forwards ${duration - 500}ms`,
                filter: 'blur(15px)'
            }}
        />
    </div>
);
