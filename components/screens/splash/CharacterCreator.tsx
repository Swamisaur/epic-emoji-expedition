/**
 * @file CharacterCreator.tsx
 * @description The UI component for creating a player character on the splash screen.
 * It encapsulates name input, emoji selection, and skin tone choice.
 */
import React from 'react';
import { PLAYER_SKIN_TONES } from '../../../constants';
import { applySkinTone } from '../../../utils/formatters';
import type { PlayerEmojiBase } from '../../../types';

interface CharacterCreatorProps {
    name: string;
    setName: (name: string) => void;
    selectedBase: PlayerEmojiBase;
    setSelectedBase: (base: PlayerEmojiBase) => void;
    selectedToneModifier: string;
    finalEmoji: string;
    onRandomize: () => void;
    onInteraction: () => void;
    emojiBases: PlayerEmojiBase[];
}

const CharacterCreator: React.FC<CharacterCreatorProps> = ({
    name, setName, selectedBase, setSelectedBase, selectedToneModifier,
    finalEmoji, onRandomize, onInteraction, emojiBases
}) => {
    return (
        <div onMouseDown={onInteraction} className="w-full flex flex-col items-center gap-3">
            <div className="w-full flex items-center gap-3 bg-gray-700/50 p-2 rounded-lg">
                <span className="text-5xl w-16 h-16 flex items-center justify-center bg-gray-800/70 rounded-md">{finalEmoji}</span>
                <div className="flex-grow flex items-center gap-2">
                    <input
                        id="hero-name"
                        name="hero-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Hero Name"
                        maxLength={20}
                        className="bg-gray-900/70 text-white placeholder-gray-400 rounded-lg px-4 py-3 text-lg w-full text-center font-bold"
                        aria-label="Enter your hero's name"
                    />
                    <button
                        onClick={onRandomize}
                        className="flex-shrink-0 text-3xl p-2 rounded-lg bg-gray-900/70 hover:bg-yellow-500/80 transition-colors duration-200"
                        title="Randomize Hero"
                        aria-label="Randomize hero name and appearance"
                    >
                        🎲
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-wrap items-center justify-center gap-2 bg-gray-700/50 p-2 rounded-lg">
                {emojiBases.map(emoji => {
                    const displayEmojiWithTone = applySkinTone(emoji, selectedToneModifier);
                    return (
                    <button 
                        key={emoji} 
                        onClick={() => setSelectedBase(emoji)}
                        className={`text-3xl p-1 rounded-md transition-all duration-200 ${selectedBase === emoji ? 'bg-yellow-500 scale-110' : 'hover:bg-gray-600/80'}`}
                        aria-label={`Select character ${displayEmojiWithTone}`}
                        >
                        {displayEmojiWithTone}
                    </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CharacterCreator;