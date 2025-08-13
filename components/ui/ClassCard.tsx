/**
 * @file ClassCard.tsx
 * @description A component for a single, selectable class card. It's designed to be
 * stylish, informative, and reusable for both character creation and rebirth.
 */
import React from 'react';
import { PlayerClass, PlayerClassId } from '../../../types';

const CLASS_BACKGROUND_MAP: Record<PlayerClassId, string> = {
    ninja: 'class-bg-ninja',
    rockstar: 'class-bg-rockstar',
    snacker: 'class-bg-snacker',
    spaceTank: 'class-bg-spacetank',
    mage: 'class-bg-mage',
    nightFang: 'class-bg-nightfang',
    conArtist: 'class-bg-conartist',
    diva: 'class-bg-diva',
};

const ClassCard: React.FC<{
    playerClass: PlayerClass;
    isSelected: boolean;
    onSelect: () => void;
    isLocked?: boolean;
    unlockDescription?: string;
    isNew?: boolean;
}> = ({ playerClass, isSelected, onSelect, isLocked = false, unlockDescription, isNew = false }) => {
    const backgroundClass = CLASS_BACKGROUND_MAP[playerClass.id] || 'bg-gray-800';
    
    const isSnacker = playerClass.id === 'snacker';
    const mainStatEmoji = playerClass.upgrades.find(u => u.id === playerClass.classStatId)?.emoji || '❔';
    const abilityEmojis = playerClass.skills.map(s => s.emoji).slice(0, 3); // Show first 3 skills

    const descriptionStyle = {
        textShadow: isSnacker 
            ? '0 1px 2px rgba(255,255,255,0.7)' 
            : '0 1px 4px rgba(0,0,0,0.9), 0 1px 10px rgba(0,0,0,0.7)'
    };

    return (
        <button
            onClick={!isLocked ? onSelect : undefined}
            className={`
                p-3 rounded-lg border-2 transition-all duration-300 ease-in-out
                ${isSnacker ? 'text-black' : 'text-white'}
                relative overflow-hidden flex flex-col w-full
                ${isLocked ? 'border-gray-700 filter grayscale cursor-not-allowed' : 'transform hover:-translate-y-1'}
                ${isSelected 
                    ? 'border-yellow-400 scale-[1.2] shadow-lg shadow-yellow-400/20' 
                    : 'border-gray-700 hover:border-gray-500'}
                ${backgroundClass}
            `}
            aria-pressed={isSelected}
            disabled={isLocked}
        >
            {/* Locked Overlay */}
            {isLocked && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20 p-2">
                    <span className="text-5xl">🔒</span>
                    <p className="text-xs font-bold text-gray-300 text-center mt-1">{unlockDescription}</p>
                </div>
            )}
            
            {/* New Badge */}
            {isNew && !isLocked && (
                <div className="absolute top-1 right-1 z-20">
                    <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">NEW</span>
                </div>
            )}
            
            {/* Content Container */}
            <div className="relative z-10 flex flex-col w-full">
                
                {/* Top Part: Emoji + Title */}
                <div className="flex items-center gap-2">
                    <div className="text-3xl flex-shrink-0" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                        {playerClass.emoji}
                    </div>
                    <h3 className={`font-title text-2xl ${isSnacker ? 'text-black' : 'text-white'} leading-tight`}>
                        {playerClass.name}
                    </h3>
                </div>

                {/* Description - now full width */}
                <p 
                    className={`text-sm ${isSnacker ? 'text-black/90' : 'text-gray-200'} leading-tight my-2 text-left`} 
                    style={descriptionStyle}
                >
                    {playerClass.description}
                </p>
                
                {/* Bottom Part: Skills */}
                <div className={`pt-1 border-t-2 ${isSnacker ? 'border-black/20' : 'border-white/10'} flex-shrink-0 mt-auto`}>
                    <div className="flex justify-around items-center text-left">
                        <div>
                            <div className={`text-[10px] uppercase font-bold ${isSnacker ? 'text-black/80' : 'text-gray-400'}`}>Focus</div>
                            <div className="text-lg leading-none">{mainStatEmoji}</div>
                        </div>
                        <div>
                            <div className={`text-[10px] uppercase font-bold ${isSnacker ? 'text-black/80' : 'text-gray-400'}`}>Skills</div>
                            <div className="flex gap-1 text-lg leading-none">
                                {abilityEmojis.map((emoji, i) => <span key={i}>{emoji}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default ClassCard;
