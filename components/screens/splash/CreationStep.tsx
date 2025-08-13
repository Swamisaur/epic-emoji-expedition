/**
 * @file CreationStep.tsx
 * @description The third step of the splash screen, where the user
 * creates their character.
 */
import React, { useState } from 'react';
import CharacterCreator from './CharacterCreator';
import StartButton from './StartButton';
import { PLAYER_EMOJI_CATEGORIES, PLAYER_SKIN_TONES, CELEBRITY_CHARACTERS } from '../../../constants';
import { applySkinTone } from '../../../utils/formatters';
import type { PlayerEmojiBase } from '../../../types';
import WavyText from '../../ui/WavyText';

type SkinTone = { name: string; color: string; modifier: string; };
type EmojiCategory = 'neutral' | 'male' | 'female';

interface CreationStepProps {
    onProceed: (characterInfo: {
        name: string;
        baseEmoji: PlayerEmojiBase;
        skinTone: SkinTone;
        finalEmoji: string;
    }) => void;
    onInteraction: () => void;
}

const getRandomCharacter = () => {
    const randomCelebrity = CELEBRITY_CHARACTERS[Math.floor(Math.random() * CELEBRITY_CHARACTERS.length)];
    const randomToneObject = PLAYER_SKIN_TONES.find(t => t.modifier === randomCelebrity.skinToneModifier) || PLAYER_SKIN_TONES[0];
    const categories: EmojiCategory[] = ['neutral', 'male', 'female'];
    const randomCategory = categories.find(c => PLAYER_EMOJI_CATEGORIES[c].includes(randomCelebrity.baseEmoji)) || 'neutral';
    
    return {
        name: randomCelebrity.name,
        base: randomCelebrity.baseEmoji,
        tone: randomToneObject,
        category: randomCategory,
    };
};

const CreationStep: React.FC<CreationStepProps> = ({ onProceed, onInteraction }) => {
    const [initialCharacter] = useState(getRandomCharacter);

    const [name, setName] = useState(initialCharacter.name);
    const [category, setCategory] = useState<EmojiCategory>(initialCharacter.category);
    const [selectedBase, setSelectedBase] = useState<PlayerEmojiBase>(initialCharacter.base);
    const [selectedTone, setSelectedTone] = useState(initialCharacter.tone);

    const handleCategoryChange = (newCategory: EmojiCategory) => {
        setCategory(newCategory);
        setSelectedBase(PLAYER_EMOJI_CATEGORIES[newCategory][0]);
    };

    const handleRandomize = () => {
        onInteraction();
        const { name: randomName, base: randomBase, tone: randomTone, category: randomCategory } = getRandomCharacter();
        
        setName(randomName);
        setCategory(randomCategory);
        setSelectedBase(randomBase);
        setSelectedTone(randomTone);
    };

    const handleProceedClick = () => {
        if (name.trim()) {
            onInteraction();
            onProceed({
                name: name.trim(),
                baseEmoji: selectedBase,
                skinTone: selectedTone,
                finalEmoji: applySkinTone(selectedBase, selectedTone.modifier),
            });
        }
    };
    
    const finalEmoji = applySkinTone(selectedBase, selectedTone.modifier);
    
    const categoryOptions: { id: EmojiCategory, emoji: string }[] = [
        { id: 'neutral', emoji: '⚤'},
        { id: 'male', emoji: '♂️'},
        { id: 'female', emoji: '♀️'},
    ];
    
    return (
        <div 
            className="relative z-10 w-full max-w-lg liquid-glass rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col gap-4 max-h-[95vh] overflow-y-auto animate-slide-up-splash no-scrollbar"
        >
            <WavyText 
                text="Create Your Hero"
                className="text-3xl sm:text-4xl font-extrabold text-yellow-300 text-center"
                style={{ textShadow: '2px 2px 0 #92400e, 4px 4px 0 #78350f, 6px 6px 0 #451a03, 8px 8px 10px rgba(0,0,0,0.5)' }}
            />
            
            <CharacterCreator 
                name={name}
                setName={setName}
                selectedBase={selectedBase}
                setSelectedBase={setSelectedBase}
                selectedToneModifier={selectedTone.modifier}
                finalEmoji={finalEmoji}
                onRandomize={handleRandomize}
                onInteraction={onInteraction}
                emojiBases={PLAYER_EMOJI_CATEGORIES[category]}
            />
            
            <div className="w-full flex items-center justify-center gap-3 bg-gray-700/50 p-2 rounded-lg">
                 {categoryOptions.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`text-2xl p-2 rounded-full transition-all duration-200 transform hover:scale-110 w-12 h-12 flex items-center justify-center ${
                            category === cat.id
                                ? 'bg-yellow-500 text-black shadow-lg'
                                : 'bg-gray-900/70 hover:bg-gray-600/80 text-white'
                        }`}
                         aria-label={`Select ${cat.id} characters`}
                    >
                        {cat.emoji}
                    </button>
                ))}
                
                <div className="w-px h-8 bg-gray-500/50" />
                
                {PLAYER_SKIN_TONES.map(tone => (
                    <button 
                    key={tone.name} 
                    onClick={() => setSelectedTone(tone)}
                    className={`w-8 h-8 rounded-full transition-all duration-200 border-2 ${selectedTone.name === tone.name ? 'border-white scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: tone.color }}
                    aria-label={`Select skin tone ${tone.name}`}
                    title={tone.name}
                    >
                    </button>
                ))}
            </div>


            <StartButton 
                onClick={handleProceedClick}
                disabled={!name.trim()}
                text="Choose Your Class"
            />
        </div>
    );
};

export default CreationStep;