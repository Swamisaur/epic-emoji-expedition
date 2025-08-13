/**
 * @file FloatingText.tsx
 * @description A component responsible for rendering and animating a single piece of floating text,
 * such as damage numbers, coin gains, or healing effects.
 */
import React, { useEffect, useRef } from 'react';
import { FloatingText } from '../../types';

interface FloatingTextComponentProps {
    text: FloatingText;
    onEnd: (id: number) => void;
}

const FloatingTextComponent: React.FC<FloatingTextComponentProps> = ({ text, onEnd }) => {
    const elementRef = useRef<HTMLDivElement>(null);

    // Effect to automatically remove the component after its animation duration.
    useEffect(() => {
        let duration = 1000;
        if (text.type === 'coin' || text.type === 'item') duration = 1200;
        if (text.type === 'bonus') duration = 4000;
        if (text.type === 'burst') duration = 800;
        if (text.type === 'player_attack_emoji') duration = 500;
        if (text.type === 'enemy_attack_emoji') duration = 500;
        if (text.type === 'debuff') duration = 2000;
        if (text.type === 'miss') duration = 800; // Match animation duration
        if (text.type === 'orbital_strike') duration = 1500;
        if (text.type === 'singularity') duration = 2000;
        if (text.type === 'shuriken') duration = 400;
        if (text.type === 'dragon_strike') duration = 800;
        if (text.type === 'starfall') duration = 500;
        if (text.type === 'rolling_pin') duration = 400;
        if (text.type === 'rocket_dash_impact') duration = 500;
        if (text.type === 'spark_bolt') duration = 300;
        if (text.type === 'chain_zap_bolt') duration = 200;
        if (text.type === 'meteor_fall') duration = 600;
        if (text.type === 'meteor_impact') duration = 400;
        if (text.type === 'poison_dot' || text.type === 'burn_dot' || text.type === 'bleed_dot') duration = 1000;
        if (text.type === 'fang_bite') duration = 400;
        if (text.type === 'shadow_tendril') duration = 500;
        if (text.type === 'blood_moon') duration = 8000;
        if (text.type === 'coin_flip') duration = 1000;
        if (text.type === 'jackpot_effect') duration = 4000;
        if (text.type === 'flash_pose') duration = 400;
        if (text.type === 'siren_song_notes') duration = 1500;
        if (text.isCrit) duration = 1200; // Longer duration for the impactful crit animation
        
        const timer = setTimeout(() => {
            onEnd(text.id);
        }, duration);
        return () => clearTimeout(timer);
    }, [text.id, onEnd, text.type, text.isCrit]);
    
    // Effect for dynamic attack animation positioning, using pre-calculated path data
    useEffect(() => {
        if (
            (text.type !== 'player_attack_emoji' && text.type !== 'enemy_attack_emoji' && text.type !== 'shuriken' && text.type !== 'spark_bolt' && text.type !== 'chain_zap_bolt' && text.type !== 'siren_song_notes') ||
            text.startX === undefined || text.startY === undefined || text.deltaX === undefined || text.deltaY === undefined
        ) {
            return;
        }

        const el = elementRef.current;
        if (!el) return;
        
        // Use requestAnimationFrame to ensure the element is painted before getting its dimensions
        requestAnimationFrame(() => {
            const selfRect = el.getBoundingClientRect();
            
            // Offset start position by half the element's size to center it
            const finalStartX = text.startX! - selfRect.width / 2;
            const finalStartY = text.startY! - selfRect.height / 2;

            el.style.left = `${finalStartX}px`;
            el.style.top = `${finalStartY}px`;
            el.style.setProperty('--target-x', `${text.deltaX}px`);
            el.style.setProperty('--target-y', `${text.deltaY}px`);
            
            // Make element visible now that it's positioned
            el.style.opacity = '1';
        });

    }, [text]);

    // Different styling and animation for each type of floating text.
    switch (text.type) {
        case 'player_attack_emoji':
            return (
                <div 
                    ref={elementRef}
                    className={`absolute pointer-events-none text-4xl animate-player-attack`}
                    style={{ filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.5))', opacity: 0 }}
                >
                    {text.text}
                </div>
            );
        case 'enemy_attack_emoji':
            return (
                 <div 
                    ref={elementRef}
                    className={`absolute pointer-events-none text-4xl animate-enemy-impact`}
                    style={{ filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.5))', opacity: 0 }}
                >
                    {text.text}
                </div>
            );
        case 'shuriken':
            return (
                <div 
                    ref={elementRef}
                    className={`absolute pointer-events-none text-3xl animate-shuriken-throw`}
                    style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))', opacity: 0 }}
                >
                    {text.text}
                </div>
            );
        case 'spark_bolt':
            return (
                <div
                    ref={elementRef}
                    className="absolute pointer-events-none text-3xl animate-spark-bolt"
                    style={{ filter: 'drop-shadow(0 0 5px #fef08a)', opacity: 0 }}
                >
                    {text.text}
                </div>
            );
        case 'chain_zap_bolt':
            return (
                <div
                    ref={elementRef}
                    className="absolute pointer-events-none text-8xl animate-chain-zap"
                    style={{ filter: 'drop-shadow(0 0 10px #60a5fa)', opacity: 0 }}
                >
                    {text.text}
                </div>
            );
        case 'meteor_fall':
             return (
                <div
                    className="absolute pointer-events-none text-8xl animate-meteor-fall"
                    style={{ 
                        left: `${text.x}%`, 
                        top: '-10%',
                        '--target-x': `${text.dx}px`,
                        '--target-y': `${text.dy}px`,
                         textShadow: '0 0 10px #fca5a5, 0 0 20px #ef4444'
                    } as React.CSSProperties}
                >
                    {text.text}
                </div>
            );
        case 'meteor_impact':
            return (
                <div
                    className="absolute pointer-events-none text-9xl animate-meteor-impact"
                    style={{ 
                        left: `${text.x}%`, 
                        top: `${text.y}%`,
                        textShadow: '0 0 15px #f97316'
                    }}
                >
                    {text.text}
                </div>
            );
        case 'fang_bite':
             return (
                <div
                    className="absolute pointer-events-none text-6xl text-red-500 animate-fang-bite"
                    style={{ 
                        left: `${text.x}%`, 
                        top: `${text.y}%`,
                        textShadow: '0 0 5px #f87171, 0 0 10px #dc2626'
                    }}
                >
                    {text.text}
                </div>
            );
        case 'shadow_tendril':
            return (
                <div
                    className="absolute pointer-events-none text-6xl text-purple-400 animate-shadow-tendril"
                    style={{
                        left: `${text.x}%`,
                        top: `${text.y}%`,
                        // @ts-ignore
                        '--target-x': `${text.dx}px`,
                        '--target-y': `${text.dy}px`,
                        filter: 'drop-shadow(0 0 5px #a855f7)',
                    }}
                >
                    {text.text}
                </div>
            );
        case 'blood_moon':
            return (
                <div
                    className="absolute pointer-events-none text-9xl text-red-600 animate-blood-moon"
                    style={{
                        left: `${text.x}%`,
                        top: `${text.y}%`,
                        filter: 'drop-shadow(0 0 20px #ef4444)',
                        animation: 'blood-moon-rise 1s ease-out forwards, pulse-dot-effect 2s ease-in-out infinite 1s'
                    }}
                >
                    {text.text}
                </div>
            );
        case 'coin_flip':
             return (
                <div
                    className="absolute pointer-events-none text-8xl animate-coin-flip"
                    style={{
                        left: `${text.x}%`,
                        top: `${text.y}%`,
                        transformOrigin: 'center',
                        filter: 'drop-shadow(0 0 10px #facc15)',
                    }}
                >
                    {text.text}
                </div>
            );
        case 'jackpot_effect':
            return (
                 <div
                    className="absolute pointer-events-none flex gap-2"
                    style={{
                        left: '50%',
                        top: '40%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    {['💎', '💎', '💎'].map((emoji, i) => (
                        <div key={i} className="w-24 h-32 bg-black/50 border-4 border-yellow-400 rounded-lg overflow-hidden relative" style={{ animation: `jackpot-slots-appear 0.5s ease-out forwards ${i * 0.2}s`}}>
                            <div className="text-7xl" style={{ animation: `jackpot-slots-spin 1s ease-in-out ${0.5 + i * 0.3}s forwards`, background: 'linear-gradient(to bottom, 🍀, 🍒, 🍋, 🔔, 💎, 🍀, 🍒, 🍋, 🔔, 💎)', backgroundSize: '100% 1000%', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                            </div>
                             <div className="absolute inset-0 text-7xl flex items-center justify-center opacity-0" style={{ animation: `jackpot-slots-win 1.5s ease-in-out infinite 2s` }}>
                                💎
                            </div>
                        </div>
                    ))}
                </div>
            );
        case 'flash_pose':
            return (
                <div
                    className="absolute pointer-events-none text-9xl animate-flash-pose"
                    style={{ 
                        left: `${text.x}%`, 
                        top: `${text.y}%`,
                        filter: 'drop-shadow(0 0 20px white)',
                    }}
                >
                    {text.text}
                </div>
            );
        case 'siren_song_notes':
            return (
                <div
                    ref={elementRef}
                    className="absolute pointer-events-none text-3xl animate-siren-song-notes opacity-0"
                    style={{
                        '--target-x': `${text.deltaX}px`,
                        '--target-y': `${text.deltaY}px`,
                        filter: 'drop-shadow(0 0 5px #f9a8d4)',
                    } as React.CSSProperties}
                >
                    {text.text}
                </div>
            );
        case 'dragon_strike':
            return (
                <div
                    className={`absolute pointer-events-none text-9xl animate-dragon-strike`}
                    style={{ left: `${text.x}%`, top: `${text.y}%` }}
                >
                    {text.text}
                </div>
            );
        case 'starfall':
            return (
                <div 
                    className={`absolute pointer-events-none text-6xl animate-starfall`}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, textShadow: '0 0 10px #fef08a, 0 0 20px #facc15' }}
                >
                    {text.text}
                </div>
            );
        case 'rolling_pin':
            return (
                <div
                    className={`absolute pointer-events-none text-8xl animate-tenderize-whack`}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, transformOrigin: 'bottom right', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}
                >
                    {text.text}
                </div>
            );
        case 'rocket_dash_impact':
            return (
                <div
                    className={`absolute pointer-events-none text-8xl animate-rocket-dash-impact`}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, textShadow: '0 0 10px #67e8f9, 0 0 20px #22d3ee' }}
                >
                    {text.text}
                </div>
            );
        case 'orbital_strike':
             return (
                <div
                    className={`absolute pointer-events-none text-8xl animate-orbital-strike`}
                    style={{ left: `${text.x}%`, top: `${text.y}%` }}
                >
                    {text.text}
                </div>
            );
        case 'singularity':
             return (
                <div
                    className={`absolute pointer-events-none text-9xl animate-singularity`}
                    style={{ left: `${text.x}%`, top: `${text.y}%` }}
                >
                    {text.text}
                </div>
            );
        case 'fireball':
            return (
                <div 
                    className={`absolute font-extrabold pointer-events-none text-5xl animate-fireball`}
                    style={{ left: `${text.x}%`, top: `${text.y}%` }}
                >
                    {text.text}
                </div>
            );
        case 'coin':
            return (
                <div 
                    className={`absolute font-extrabold pointer-events-none animate-coin-drop text-yellow-300 text-4xl`}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                    {text.text}
                </div>
            );
         case 'item':
            return (
                <div 
                    className={`absolute font-extrabold pointer-events-none animate-item-drop text-5xl`}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, filter: 'drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px #ff0)' }}
                >
                    {text.text}
                </div>
            );
        case 'bonus':
             return (
                <div 
                    className={`absolute pointer-events-none animate-emoji-shower text-3xl opacity-0`}
                    style={{ 
                        left: `${text.x}%`, 
                        top: `${text.y}%`, 
                        animationDelay: `${Math.random() * 0.5}s`,
                        filter: 'drop-shadow(0 0 2px #fff)'
                    }}
                >
                    {text.text}
                </div>
            );
        case 'burst':
            return (
                <div
                    className="absolute pointer-events-none animate-burst-out-particle text-3xl"
                    style={{
                        // @ts-ignore - CSS custom properties for animation
                        '--burst-x': `${text.dx || 0}px`,
                        '--burst-y': `${text.dy || 0}px`,
                        left: `${text.x}%`,
                        top: `${text.y}%`,
                    }}
                >
                    {text.text}
                </div>
            );
        case 'heal':
            return (
                 <div 
                    className={`absolute font-extrabold pointer-events-none animate-fade-up text-green-400 text-3xl`}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                    {text.text}
                </div>
            );
        case 'debuff':
            return (
                <div
                    className={`absolute pointer-events-none text-4xl animate-debuff`}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.5))' }}
                >
                    {text.text}
                </div>
            );
        case 'miss':
            return (
                <div 
                    className={`absolute font-extrabold pointer-events-none animate-miss-whoosh text-gray-400 text-2xl`}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                >
                    {text.text}
                </div>
            );
        case 'poison_dot':
            return (
                <div 
                    className={`absolute font-extrabold pointer-events-none animate-dot-drip text-green-400 text-2xl`}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                >
                    {text.text}
                </div>
            );
        case 'burn_dot':
            return (
                <div 
                    className={`absolute font-extrabold pointer-events-none animate-dot-drip text-orange-500 text-2xl`}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                >
                    {text.text}
                </div>
            );
        case 'bleed_dot':
            return (
                <div 
                    className={`absolute font-extrabold pointer-events-none animate-dot-drip text-red-600 text-2xl`}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                >
                    {text.text}
                </div>
            );
        default: {
            let color = 'text-white';
            if (text.type === 'player') {
                color = text.isCrit ? 'text-yellow-400' : 'text-red-500';
            } else if (text.type === 'enemy') {
                color = 'text-white'; // Enemy damage to player
            }
            
            const fontSize = text.isCrit ? 'text-5xl' : 'text-2xl';
            const animationClass = text.isCrit && text.type === 'player' ? 'animate-crit-impact' : 'animate-fade-up';

            return (
                <div 
                    className={`absolute font-extrabold pointer-events-none ${animationClass} ${color} ${fontSize}`}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, textShadow: text.isCrit && text.type === 'player' ? '2px 2px 5px rgba(0,0,0,0.8), 0 0 10px #fef08a' : '1px 1px 3px rgba(0,0,0,0.7)' }}
                >
                    {text.text}
                </div>
            );
        }
    }
};

export default FloatingTextComponent;