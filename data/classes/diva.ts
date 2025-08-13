/**
 * @file data/classes/diva.ts
 * @description Defines the Diva class.
 */
import { PlayerClass, UpgradeId, SpecialAbilityId } from '../../types';

export const diva: PlayerClass = {
    id: 'diva',
    name: 'Diva',
    emoji: '🧚',
    description: 'A dazzling superstar who bends fate with flair.',
    tier: 'advanced',
    baseClassId: 'conArtist',
    unlockDescription: 'Defeat Realm 1 Boss with Con Artist.',
    classStatId: UpgradeId.StarPower,
    noviceEffectDescription: "Stage presence boosts Luck moderately.",
    expertEffectDescription: "A true headliner: Luck and Crit Chance surge dramatically.",
    specializationBonuses: {
        novice: { percent: { luck: 0.12 } },
        expert: { percent: { luck: 0.25, critChance: 0.05 } }
    },
    transformations: [
        {
            focus: 'power',
            upgradeId: UpgradeId.FanFlair,
            novice: { neutral: '🧑‍🎤', male: '👨‍🎤', female: '👩‍🎤' },
            expert: { neutral: '🦸', male: '🦸‍♂️', female: '🦸‍♀️' },
        },
        {
            focus: 'speed',
            upgradeId: UpgradeId.RhythmFlow,
            novice: { neutral: '💃', male: '🕺', female: '💃' },
            expert: { neutral: '🤸', male: '🤸‍♂️', female: '🤸‍♀️' },
        },
        {
            focus: 'health',
            upgradeId: UpgradeId.EncoreHealth,
            novice: { neutral: '💆', male: '💆‍♂️', female: '💆‍♀️' },
            expert: { neutral: '🧖', male: '🧖‍♂️', female: '🧖‍♀️' },
        },
        {
            focus: 'fortune',
            upgradeId: UpgradeId.StarPower,
            novice: { neutral: '🫅', male: '🤴', female: '👸' },
            expert: { neutral: '🧚', male: '🧚‍♂️', female: '🧚‍♀️' },
        },
    ],
    baseStats: {
        attackPower: 7,
        attackSpeed: 1.20,
        critChance: 0.12,
        critDamage: 1.6,
        maxHealth: 100,
        luck: 1.30,
        accuracy: 0.95,
        damageReduction: 0
    },
    upgrades: [
        { id: UpgradeId.StarPower, name: 'Star Power', baseCost: 70, costIncreaseFactor: 1.22, description: 'Large Luck up.', statChangeText: '+15% Fortune', category: 'core', emoji: '✨' },
        { id: UpgradeId.RhythmFlow, name: 'Rhythm Flow', baseCost: 55, costIncreaseFactor: 1.22, description: 'Small Attack-speed up.', statChangeText: '+0.25 APS', category: 'core', emoji: '🎵' },
        { id: UpgradeId.EncoreHealth, name: 'Encore Health', baseCost: 65, costIncreaseFactor: 1.22, description: 'Moderate Health up.', statChangeText: '+50 Health', category: 'core', emoji: '🎤' },
        { id: UpgradeId.SpotlightCrit, name: 'Spotlight Crit', baseCost: 60, costIncreaseFactor: 1.22, description: 'Small Crit-chance up.', statChangeText: '+2.5% Crit', category: 'core', emoji: '🔦' },
        { id: UpgradeId.GlamGuard, name: 'Glam Guard', baseCost: 48, costIncreaseFactor: 1.25, description: 'Small damage-reduction.', statChangeText: '+2% Dmg Resist', category: 'grind', emoji: '🛡️', unlockCriteria: { requiredCoreUpgradeVariety: 1 } },
        { id: UpgradeId.FanFlair, name: 'Fan Flair', baseCost: 54, costIncreaseFactor: 1.25, description: 'Small Attack up.', statChangeText: '+6 Attack', category: 'grind', emoji: '🎫', unlockCriteria: { requiredCoreUpgradeVariety: 2 } },
        { id: UpgradeId.MermaidsGift, name: 'Mermaid’s Gift', baseCost: 60, costIncreaseFactor: 1.25, description: 'Small Luck up.', statChangeText: '+10% Fortune', category: 'grind', emoji: '🐚', unlockCriteria: { requiredCoreUpgradeVariety: 3 } },
        { id: UpgradeId.RoyaltyBonus, name: 'Royalty Bonus', baseCost: 66, costIncreaseFactor: 1.25, description: 'Medium Luck up.', statChangeText: '+12% Fortune', category: 'grind', emoji: '👑', unlockCriteria: { requiredCoreUpgradeVariety: 4 } }
    ],
    skills: [
        { id: SpecialAbilityId.FlashPose, name: 'Flash Pose', description: 'Strike a pose! A blinding flash deals 150% AP damage and guarantees your next 2 attacks are critical hits.', cost: (stage) => 9 + stage * 2, cooldown: 5000, unlockCriteria: { requiredTotalLevels: 2 }, emoji: '📸' },
        { id: SpecialAbilityId.WardrobeShift, name: 'Wardrobe Shift', description: 'A dazzlingly fast wardrobe change. Your new outfit grants you an incredible +50% damage reduction for 10 seconds.', cost: (stage) => 12 + Math.floor(stage * 2.5), cooldown: 10000, unlockCriteria: { requiredTotalLevels: 5 }, emoji: '👗' },
        { id: SpecialAbilityId.SirenSong, name: 'Siren Song', description: 'Sing an enchanting melody that deals 400% AP damage and stuns the enemy for a full 4 seconds.', cost: (stage) => 16 + Math.floor(stage * 3.5), cooldown: 15000, unlockCriteria: { requiredTotalLevels: 15 }, emoji: '🎶' },
        { id: SpecialAbilityId.EncoreFinale, name: 'Encore Finale', description: 'The grand finale! A spectacular performance that deals 1500% AP damage and doubles your Fortune for 15s.', cost: (stage, casts = 0) => 20 + stage * 4 + casts * 6, cooldown: 20000, unlockCriteria: { requiredTotalLevels: 30 }, emoji: '🌟' }
    ]
};