/**
 * @file data/playerConstants.ts
 * @description Contains all constants related to the player's character,
 * stats, and visual transformations.
 */

import { PlayerEmojiBase, TransformationEmojis, PlayerClassId, StatFocus } from '../../types';

// --- PLAYER ---

/** The health percentage below which the player is considered to be at "low health" for visual effects. */
export const LOW_HEALTH_THRESHOLD = 0.25; // 25%

/** Base character options for the player, categorized by gender representation. */
export const PLAYER_EMOJI_CATEGORIES = {
    neutral: ['🧑', '🧓'] as PlayerEmojiBase[],
    male: ['👨', '👨‍🦰', '👨‍🦳', '👨‍🦲', '🧔', '👴'] as PlayerEmojiBase[],
    female: ['👩', '👩‍🦰', '👩‍🦳', '👩‍🦲', '👵'] as PlayerEmojiBase[],
};

/** A flattened array of all base emojis for random generation. */
export const PLAYER_EMOJI_BASES: PlayerEmojiBase[] = [
    ...PLAYER_EMOJI_CATEGORIES.neutral,
    ...PLAYER_EMOJI_CATEGORIES.male,
    ...PLAYER_EMOJI_CATEGORIES.female,
];


/** Skin tone options for player emojis. The modifier is a Unicode string. */
export const PLAYER_SKIN_TONES = [
    { name: 'Default', color: '#FFC93A', modifier: '' }, // Yellow emoji color
    { name: 'Light', color: '#F7D4A6', modifier: '\u{1F3FB}' },
    { name: 'Medium-Light', color: '#E4B58A', modifier: '\u{1F3FC}' },
    { name: 'Medium', color: '#C58C62', modifier: '\u{1F3FD}' },
    { name: 'Medium-Dark', color: '#A1663B', modifier: '\u{1F3FE}' },
    { name: 'Dark', color: '#5C3823', modifier: '\u{1F3FF}' },
];


// --- RANDOM CHARACTER GENERATION ---

/** Defines the structure for a pre-defined celebrity character. */
export interface CelebrityCharacter {
    name: string;
    baseEmoji: PlayerEmojiBase;
    skinToneModifier: string;
}

/** 
 * A curated list of pre-defined characters mapping names to a specific emoji and skin tone.
 * This ensures consistency when a character is randomly selected.
 */
export const CELEBRITY_CHARACTERS: CelebrityCharacter[] = [
    { name: "Rihanna", baseEmoji: '👩', skinToneModifier: '\u{1F3FD}' },
    { name: "Shakira", baseEmoji: '👩', skinToneModifier: '\u{1F3FC}' },
    { name: "Adele", baseEmoji: '👩', skinToneModifier: '\u{1F3FB}' },
    { name: "Beyoncé", baseEmoji: '👩', skinToneModifier: '\u{1F3FD}' },
    { name: "Taylor Swift", baseEmoji: '👩', skinToneModifier: '\u{1F3FB}' },
    { name: "Oprah Winfrey", baseEmoji: '👵', skinToneModifier: '\u{1F3FE}' },
    { name: "Lionel Messi", baseEmoji: '🧔', skinToneModifier: '\u{1F3FC}' },
    { name: "Cristiano Ronaldo", baseEmoji: '👨', skinToneModifier: '\u{1F3FC}' },
    { name: "Narendra Modi", baseEmoji: '👴', skinToneModifier: '\u{1F3FD}' },
    { name: "Elon Musk", baseEmoji: '👨', skinToneModifier: '\u{1F3FB}' },
    { name: "Shah Rukh Khan", baseEmoji: '👨', skinToneModifier: '\u{1F3FD}' },
    { name: "Dwayne Johnson", baseEmoji: '👨‍🦲', skinToneModifier: '\u{1F3FD}' },
    { name: "Vladimir Putin", baseEmoji: '👴', skinToneModifier: '\u{1F3FB}' },
    { name: "Dalai Lama", baseEmoji: '👴', skinToneModifier: '\u{1F3FD}' },
    { name: "Paul McCartney", baseEmoji: '👴', skinToneModifier: '\u{1F3FB}' },
    { name: "David Attenborough", baseEmoji: '👴', skinToneModifier: '\u{1F3FB}' },
    { name: "Anthony Hopkins", baseEmoji: '👴', skinToneModifier: '\u{1F3FB}' },
    { name: "Morgan Freeman", baseEmoji: '👴', skinToneModifier: '\u{1F3FE}' },
    { name: "Queen Elizabeth", baseEmoji: '👵', skinToneModifier: '\u{1F3FB}' },
    { name: "Jane Goodall", baseEmoji: '👵', skinToneModifier: '\u{1F3FB}' },
    { name: "Maggie Smith", baseEmoji: '👵', skinToneModifier: '\u{1F3FB}' },
    { name: "Angela Merkel", baseEmoji: '👵', skinToneModifier: '\u{1F3FB}' },
    { name: "Greta Thunberg", baseEmoji: '🧑', skinToneModifier: '\u{1F3FB}' },
    { name: "Kylian Mbappé", baseEmoji: '🧑', skinToneModifier: '\u{1F3FF}' },
    { name: "Zendaya", baseEmoji: '👩', skinToneModifier: '\u{1F3FD}' },
    { name: "Jungkook", baseEmoji: '🧑', skinToneModifier: '\u{1F3FB}' },
    { name: "MrBeast", baseEmoji: '🧔', skinToneModifier: '\u{1F3FB}' },
    { name: "Xi Jinping", baseEmoji: '👨', skinToneModifier: '' },
    { name: "Donald Trump", baseEmoji: '👴', skinToneModifier: '' },
    { name: "Joe Biden", baseEmoji: '👴', skinToneModifier: '\u{1F3FB}' },
    { name: "Pope Francis", baseEmoji: '👴', skinToneModifier: '\u{1F3FB}' },
    { name: "Justin Trudeau", baseEmoji: '👨', skinToneModifier: '\u{1F3FB}' },
    { name: "Jackie Chan", baseEmoji: '👴', skinToneModifier: '' },
    { name: "Tom Hanks", baseEmoji: '👴', skinToneModifier: '\u{1F3FB}' },
    { name: "Will Smith", baseEmoji: '👨', skinToneModifier: '\u{1F3FE}' },
    { name: "Leonardo DiCaprio", baseEmoji: '👨', skinToneModifier: '\u{1F3FB}' },
    { name: "Keanu Reeves", baseEmoji: '🧔', skinToneModifier: '\u{1F3FB}' },
    { name: "Amitabh Bachchan", baseEmoji: '👴', skinToneModifier: '\u{1F3FD}' },
    { name: "Rekha", baseEmoji: '👵', skinToneModifier: '\u{1F3FC}' },
    { name: "Sachin Tendulkar", baseEmoji: '👨', skinToneModifier: '\u{1F3FD}' },
    { name: "Priyanka Chopra", baseEmoji: '👩', skinToneModifier: '\u{1F3FD}' },
    { name: "Alia Bhatt", baseEmoji: '👩', skinToneModifier: '\u{1F3FB}' },
    { name: "Rajinikanth", baseEmoji: '🧔', skinToneModifier: '\u{1F3FE}' },
    { name: "Virat Kohli", baseEmoji: '🧔', skinToneModifier: '\u{1F3FD}' },
    { name: "Deepika Padukone", baseEmoji: '👩', skinToneModifier: '\u{1F3FD}' },
    { name: "A.R. Rahman", baseEmoji: '👨', skinToneModifier: '\u{1F3FE}' },
    { name: "Ratan Tata", baseEmoji: '👨‍🦳', skinToneModifier: '\u{1F3FC}' },
];

/** The level difference required for a Novice transformation/specialization. */
export const NOVICE_TRANSFORMATION_THRESHOLD = 5;

/** The level difference required for an Expert transformation/specialization. */
export const EXPERT_TRANSFORMATION_THRESHOLD = 10;

/** A mapping of class and stat focus to a flavorful description for the transformation summary screen. */
export const TRANSFORMATION_TEXT: Record<PlayerClassId, Record<StatFocus, string>> = {
    ninja: {
        power: "Traded stealth for strength.",
        speed: "Became an untouchable blur.",
        health: "Became an unbreakable fortress.",
        fortune: "Learned to see every weakness."
    },
    rockstar: {
        power: "Their solos became pure fire.",
        speed: "Became a true rock god.",
        health: "Got tour-ready shredded.",
        fortune: "Wove magic into their music."
    },
    snacker: {
        power: "Learned to weaponize flavor.",
        speed: "The sugar rush became permanent.",
        health: "Became chonkier.",
        fortune: "Found the recipe for success."
    },
    spaceTank: {
        power: "Upgraded to superhero status.",
        speed: "Became an ace pilot of the cosmos.",
        health: "Became one with their machine.",
        fortune: "Learned the secrets of the stars."
    },
    mage: {
        power: "Distilled magic into pure power.",
        speed: "Mastered ancient elven celerity.",
        health: "Achieved a perfect mind and body.",
        fortune: "Became a grand archmage of fate."
    },
    nightFang: {
        power: "Unleashed their inner monster.",
        speed: "Learned to dance between shadows.",
        health: "Became an immortal of impeccable style.",
        fortune: "Became a hunter of secrets."
    },
    conArtist: {
        power: "Mastered the art of the killer smile.",
        speed: "Turned deception into an art form.",
        health: "Cooked up a bulletproof alibi.",
        fortune: "Learned to juggle fate itself."
    },
    diva: {
        power: "Became a true force of nature.",
        speed: "Learned to waltz through danger.",
        health: "Learned that self-care is true power.",
        fortune: "Was officially crowned royalty."
    }
};
