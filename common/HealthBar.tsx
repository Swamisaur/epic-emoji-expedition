/**
 * @file HealthBar.tsx
 * @description A reusable component that displays a horizontal health bar.
 * It's used for both the player and the enemy and features an animated damage effect.
 */
import React, { useState, useEffect, useRef } from 'react';

interface HealthBarProps {
    percentage: number;
    colorClass: string;
    shieldPercentage?: number;
    showComboParticles?: boolean;
    isSpawning?: boolean;
}

interface Particle {
    id: number;
    left: string;
}

const HealthBar: React.FC<HealthBarProps> = ({ percentage, colorClass, shieldPercentage = 0, showComboParticles = false, isSpawning = false }) => {
    const [health, setHealth] = useState(isSpawning ? 0 : percentage);
    const [damageBar, setDamageBar] = useState(isSpawning ? 0 : percentage);
    const [shield, setShield] = useState(isSpawning ? 0 : shieldPercentage);
    const [particles, setParticles] = useState<Particle[]>([]);
    
    const prevPercentageRef = useRef(percentage);
    const isInitialRender = useRef(true);
    const drainTimeoutRef = useRef<number | null>(null);
    const [isDraining, setIsDraining] = useState(false);

    useEffect(() => {
        setShield(shieldPercentage);
    }, [shieldPercentage]);

    useEffect(() => {
        // Skip animation on the very first render to prevent it from animating from 0
        if (isInitialRender.current) {
            isInitialRender.current = false;
            prevPercentageRef.current = percentage;
            if (isSpawning) {
                setTimeout(() => {
                    setHealth(percentage);
                    setDamageBar(percentage);
                    setIsDraining(true);
                }, 100);
            } else {
                setHealth(percentage);
                setDamageBar(percentage);
            }
            return;
        }

        const prevPercentage = prevPercentageRef.current;
        prevPercentageRef.current = percentage;
        
        // Always clear any pending drain timer when a new health update arrives.
        // This is the key to the "combo hold" effect.
        if (drainTimeoutRef.current) {
            clearTimeout(drainTimeoutRef.current);
        }

        // --- Damage Animation Logic ---
        if (percentage < prevPercentage) {
            // The health bar (red/green) snaps to the new value instantly.
            setHealth(percentage);
            
            // The damage bar (yellow) is set to the maximum of its current position
            // or the health value *before* this hit. This prevents it from shrinking
            // during a combo and holds it at the highest damage point.
            setDamageBar(current => Math.max(current, prevPercentage));
            
            // The drain animation is not active yet; we are in the "hold" period.
            setIsDraining(false);

            // Set a new timer. After a pause in attacks (200ms), the drain will begin.
            drainTimeoutRef.current = window.setTimeout(() => {
                setIsDraining(true); // Enable the transition for the drain animation
                setDamageBar(percentage); // Start draining the yellow bar to the current health
            }, 200);

        } 
        // --- Healing Animation Logic ---
        else if (percentage > prevPercentage) {
            setIsDraining(true); // Allow smooth transitions
            setDamageBar(percentage); // Yellow bar catches up instantly
            setHealth(percentage); // Main health bar animates up
            setParticles([]); // Instantly clear any damage particles on heal
        }

        return () => {
            if (drainTimeoutRef.current) {
                clearTimeout(drainTimeoutRef.current);
            }
        };
    }, [percentage]);

    const yellowBarVisible = damageBar > health;

    // Effect for continuous combo particles
    useEffect(() => {
        // Only generate particles if combo is active AND the yellow damage bar is visible.
        if (showComboParticles && yellowBarVisible) {
            const interval = setInterval(() => {
                setParticles(current => {
                    const newParticles = [...current];
                    if (newParticles.length > 20) newParticles.shift();
                    
                    newParticles.push({
                        id: Date.now() + Math.random(),
                        left: `${health}%` // Spawn at the edge of the current health bar
                    });
                    return newParticles;
                });
            }, 100);
            
            return () => clearInterval(interval);
        }
    }, [showComboParticles, yellowBarVisible, health]);
    
    // Conditionally apply transitions
    const healthBarTransition = isSpawning ? 'transition-all duration-[2000ms] ease-out' : (health < percentage ? 'transition-all duration-300 ease-in-out' : '');
    const damageBarTransition = isDraining ? `transition-all ${isSpawning ? 'duration-[2000ms]' : 'duration-300'} ease-out` : '';


    return (
        <div 
            className="w-full bg-gray-600 rounded-full h-3 my-1 shadow-inner overflow-hidden relative"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
            aria-label="Health bar"
        >
            {/* Damage Preview Bar (Yellow) */}
            <div
                className={`absolute top-0 left-0 bg-yellow-400 h-3 rounded-full ${damageBarTransition}`}
                style={{ width: `${Math.max(0, damageBar)}%` }}
                aria-hidden="true"
            />
            {/* Main Health Bar (Green/Red) */}
            <div
                className={`relative ${colorClass} h-3 rounded-full ${healthBarTransition}`}
                style={{ width: `${Math.max(0, health)}%` }}
            />
            
            {/* Shield Overlay Bar (Light Blue, semi-transparent) */}
            {shield > 0 && (
                <div
                    className="absolute top-0 left-0 bg-cyan-400 h-3 rounded-l-full transition-all duration-200 ease-out"
                    style={{
                        width: `${Math.max(0, shield)}%`,
                        opacity: 0.7,
                        boxShadow: 'inset 0 0 4px rgba(255, 255, 255, 0.5)',
                    }}
                    aria-hidden="true"
                />
            )}

            {/* Particle Container */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-red-400 rounded-full animate-health-particle pointer-events-none"
                    style={{
                        left: particle.left,
                        boxShadow: '0 0 4px #ef4444, 0 0 6px #f87171',
                    }}
                    onAnimationEnd={() => {
                        setParticles((currentParticles) =>
                            currentParticles.filter((p) => p.id !== particle.id)
                        );
                    }}
                />
            ))}
        </div>
    );
};

export default HealthBar;