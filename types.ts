/**
 * @file types.ts
 * @description This file contains all the core TypeScript types and interfaces
 * used throughout the application. It helps ensure data consistency and provides
 * a single source of truth for the shapes of our data structures.
 */

/** Represents a single slot where an item can be equipped. */
export type EquipmentSlot = 'head' | 'topWear' | 'bottomWear' | 'mainHand' | 'offHand' | 'trinket';

/** Represents the base emoji for a player character, before transformations or skin tones. */
export type PlayerEmojiBase = 
    '🧑' | '🧓' | // Neutral
    '👨' | '👨‍🦰' | '👨‍🦳' | '👨‍🦲' | '🧔' | '👴' | // Male
    '👩' | '👩‍🦰' | '👩‍🦳' | '👩‍🦲' | '👵'; // Female

/** Represents the rarity of an item. */
export type Rarity = 'common' | 'rare' | 'legendary';

/** Defines the unique identifiers for each player class. */
export type PlayerClassId = 'ninja' | 'rockstar' | 'snacker' | 'spaceTank' | 'mage' | 'nightFang' | 'conArtist' | 'diva';

/** A set of stat categories used for determining player transformations. */
export type StatFocus = 'power' | 'speed' | 'health' | 'fortune';

/** Defines the emoji variants for transformations to support gender choices. */
export interface TransformationEmojis {
    neutral: string;
    male: string;
    female: string;
}

/** Defines a single transformation path for a player class. */
export interface ClassTransformations {
    focus: StatFocus;
    upgradeId: UpgradeId;
    novice: TransformationEmojis;
    expert: TransformationEmojis;
}

/** Defines the structure for a player class, acting as a self-contained template. */
export interface PlayerClass {
    id: PlayerClassId;
    name: string;
    description: string;
    emoji: string;
    tier: 'base' | 'advanced';
    baseClassId?: PlayerClassId; // Link to the base class if this is an advanced class
    unlockDescription: string;
    classStatId: UpgradeId; // The primary stat for this class, used for SPECIALIZATION bonuses
    
    // --- Core Mechanics ---
    baseStats: Omit<PlayerStats, 'evolveBonus'>; // The starting stats for this class.
    upgrades: Omit<Upgrade, 'level' | 'cost'>[];
    skills: SpecialAbility[];
    
    // --- Specialization System ---
    noviceEffectDescription: string;
    expertEffectDescription: string;
    specializationBonuses: {
        novice: StatModifier;
        expert: StatModifier;
    };

    // --- Visual Transformation System ---
    transformations: ClassTransformations[];
}

/** Defines the visual theme for a realm's background. */
export interface RealmTheme {
    name: string;
    emojis: string[];
    color: string; // A base HSL color string for the background gradient and emoji color
    minions: { name: string; emoji: string; attackEmoji: string; }[];
    boss: {
        name: string;
        epithet: string;
        emoji: string;
        attackEmoji: string;
        specialAttack: {
            emoji: string;
            damageMultiplier: number;
            chargeTime: number; // in ms
        };
    };
}

/** Represents the stat bonuses an item can provide. */
export interface ItemStat {
    attackPower?: number;
    maxHealth?: number;
    attackSpeed?: number; // Flat bonus to attacks per second
    critChance?: number;
    critDamage?: number;
    luck?: number;      // Additive bonus to the luck multiplier
    accuracy?: number;  // Additive bonus to accuracy, e.g. 0.05 for +5%
}

/** Represents a single piece of equipment or an item in the inventory. */
export interface Item {
    id: string; // This is the unique item type ID, e.g., 'leather_vest'
    instanceId: string; // This will be the unique ID for this specific drop
    name: string;
    emoji: string;
    slot: EquipmentSlot;
    rarity: Rarity;
    baseStats: ItemStat;
}

/** Represents the player's core identity and appearance. */
export interface PlayerInfo {
    name: string;
    baseName: string; // The character's core name, without titles
    baseEmoji: string; // The character chosen at start
    skinTone: string; // The skin tone modifier
    displayEmoji: string; // The emoji currently shown (can be transformed)
    playerClassId: PlayerClassId;
}

/** Represents all the items the player currently has equipped. */
export type EquippedItems = {
    [key in EquipmentSlot]?: Item;
};

/** Represents the player's calculated combat and utility statistics. */
export interface PlayerStats {
  attackPower: number;
  attackSpeed: number; // Attacks per second
  critChance: number;  // 0.0 to 1.0
  critDamage: number;  // Multiplier, e.g., 1.5 for 150%
  maxHealth: number;
  luck: number;        // Multiplier, e.g., 1.1 for +10%
  evolveBonus: number; // Permanent % bonus from Evolving
  accuracy: number;    // The chance to hit, from 0.0 to 1.0
  damageReduction: number; // Percentage damage reduction, from 0.0 to 1.0
}

/** Represents the main states of the game loop. */
export type GameState = 'playing' | 'victoryPaused' | 'gameOver' | 'gameWon' | 'paused' | 'event';

/** Unique identifiers for each type of player upgrade. */
export enum UpgradeId {
  // --- Universal Stats (DEPRECATED FOR CLASS-SPECIFIC) ---
  AttackPower = 'attackPower',
  AttackSpeed = 'attackSpeed',
  MaxHealth = 'maxHealth',
  CritChance = 'critChance',
  CritDamage = 'critDamage',
  Luck = 'luck',
  
  // --- Ninja Upgrades ---
  EdgeUp = 'edgeUp',
  QuickHands = 'quickHands',
  IronLungs = 'ironLungs',
  KeenEye = 'keenEye',
  Footwork = 'footwork',
  PoisonTips = 'poisonTips',
  CloakedBlade = 'cloakedBlade',
  AssassinsCode = 'assassinsCode',

  // --- Rockstar Upgrades ---
  PowerChord = 'powerChord',
  Encore = 'encore',
  StageStamina = 'stageStamina',
  CrowdSurf = 'crowdSurf',
  AmpFeedback = 'ampFeedback',
  PyroShow = 'pyroShow',
  StageFlair = 'stageFlair',
  FanFrenzy = 'fanFrenzy',

  // --- Snacker Upgrades ---
  SnackStack = 'snackStack',
  ThickSkin = 'thickSkin',
  BulkUp = 'bulkUp',
  ComfortFood = 'comfortFood',
  SnackHeal = 'snackHeal',
  GreaseShield = 'greaseShield',
  SugarRush = 'sugarRush',
  CalorieConvert = 'calorieConvert',
    
  // --- Space Tank Upgrades ---
  PlasteelPlate = 'plasteelPlate',
  GForceGrit = 'gForceGrit',
  RocketPunch = 'rocketPunch',
  StarFortune = 'starFortune',
  AutoMed = 'autoMed',
  DeflectorNet = 'deflectorNet',
  ZeroGFlow = 'zeroGFlow',
  IonThrusters = 'ionThrusters',
  
  // --- Mage Upgrades ---
  ArcaneFocus = 'arcaneFocus',
  WandSpeed = 'wandSpeed',
  VitalSpark = 'vitalSpark',
  ManaSurge = 'manaSurge',
  RuneFire = 'runeFire',
  EchoBolt = 'echoBolt',
  ArcaneArmor = 'arcaneArmor',
  SpellLuck = 'spellLuck',

  // --- Night Fang Upgrades ---
  BloodEdge = 'bloodEdge',
  SharpenFang = 'sharpenFang',
  DarkVitality = 'darkVitality',
  ClawFury = 'clawFury',
  TheMoon = 'theMoon',
  NightHunger = 'nightHunger',
  BleedingHits = 'bleedingHits',
  Awoooo = 'awoooo',

  // --- Con Artist Upgrades ---
  LoadedDice = 'loadedDice',
  QuickFingers = 'quickFingers',
  PocketSnacks = 'pocketSnacks',
  LuckyStrike = 'luckyStrike',
  SlickMoves = 'slickMoves',
  GoldenTongue = 'goldenTongue',
  MarkedCards = 'markedCards',
  GreasePalm = 'greasePalm',

  // --- Diva Upgrades ---
  StarPower = 'starPower',
  RhythmFlow = 'rhythmFlow',
  EncoreHealth = 'encoreHealth',
  SpotlightCrit = 'spotlightCrit',
  GlamGuard = 'glamGuard',
  FanFlair = 'fanFlair',
  MermaidsGift = 'mermaidsGift',
  RoyaltyBonus = 'royaltyBonus',

  // --- DEPRECATED ---
  AttackPowerPercent = 'attackPowerPercent',
  GoldenTouch = 'goldenTouch',
  Vanguard = 'vanguard',
  Spellweaver = 'spellweaver',
  Venom = 'venom',
}

/** Unique identifiers for each special ability. */
export enum SpecialAbilityId {
    // --- Ninja Skills ---
    SwiftSlash = 'swiftSlash',
    SmokeScreen = 'smokeScreen',
    ShurikenStorm = 'shurikenStorm',
    DragonStrike = 'dragonStrike',

    // --- Rockstar Skills ---
    PowerRiff = 'powerRiff',
    AmpShield = 'ampShield',
    SonicBoom = 'sonicBoom',
    Starfall = 'starfall',
    
    // --- Snacker Skills ---
    Munch = 'munch',
    StickyGlaze = 'stickyGlaze',
    RollingPin = 'rollingPin',
    FeastMode = 'feastMode',
    
    // --- Space Tank Skills ---
    RocketDash = 'rocketDash',
    ForceField = 'forceField',
    OrbitalStrike = 'orbitalStrike',
    Singularity = 'singularity',
    
    // --- Mage Skills ---
    SparkShot = 'sparkShot',
    MagicBarrier = 'magicBarrier',
    ChainZap = 'chainZap',
    MeteorCall = 'meteorCall',
    
    // --- Night Fang Skills ---
    QuickBite = 'quickBite',
    BatForm = 'batForm',
    ShadowRift = 'shadowRift',
    BloodMoon = 'bloodMoon',
    
    // --- Con Artist Skills ---
    CoinFlip = 'coinFlip',
    EscapeRope = 'escapeRope',
    Pickpocket = 'pickpocket',
    Jackpot = 'jackpot',

    // --- Diva Skills ---
    FlashPose = 'flashPose',
    WardrobeShift = 'wardrobeShift',
    SirenSong = 'sirenSong',
    EncoreFinale = 'encoreFinale',

    // --- DEPRECATED ---
    Fireball = 'fireball',
    ShieldWall = 'shieldWall',
    ChallengingShout = 'challengingShout',
    SecondWind = 'secondWind',
    ChainLightning = 'chainLightning',
    ArcaneIntellect = 'arcaneIntellect',
    PoisonBlade = 'poisonBlade',
    SmokeBomb_deprecated = 'smokeBomb_deprecated',
    BladeFlurry = 'bladeFlurry',
    HostileTakeover = 'hostileTakeover',
    GoldenHandshake = 'goldenHandshake',
    LiquidateAssets = 'liquidateAssets',
}

/** Defines the criteria required to unlock an upgrade or ability. */
export interface UnlockCriteria {
    requiredCoreUpgradeVariety?: number; // How many *different* core stat upgrades must have at least one level.
    requiredTotalLevels?: number; // The total number of levels purchased across all upgrades.
}

/** Defines the structure of a special ability. */
export interface SpecialAbility {
    id: SpecialAbilityId;
    name: string;
    description: string;
    cost: (stage: number, casts?: number) => number; // Cost can scale with game progress & uses
    cooldown: number; // in milliseconds
    emoji: string;
    unlockCriteria?: UnlockCriteria; // Criteria to be met for this ability to become available
}

/** Defines the structure of a player upgrade. */
export interface Upgrade {
  id: UpgradeId;
  name:string;
  level: number;
  cost: number;
  description: string;
  statChangeText: string;
  costIncreaseFactor: number; // How much the cost multiplies each level
  baseCost: number;
  category: 'core' | 'grind'; // Core stats vs. unlockable training upgrades
  emoji: string;
  unlockCriteria?: UnlockCriteria; // Criteria to be met for this upgrade to become available
}

/** Defines the different attack patterns an enemy can have. */
export type EnemyArchetype = 'standard' | 'swift' | 'heavy' | 'arcane' | 'vampiric' | 'juggernaut';

/** Represents a single enemy in the game. */
export interface Enemy {
  id: string; // A unique identifier for the enemy instance
  name: string;
  emoji: string;
  maxHealth: number;
  currentHealth: number;
  attackPower: number;
  coinReward: number;
  isBoss: boolean;
  attackEmoji: string;
  archetype: EnemyArchetype;
  attackInterval: number; // Time in ms between attacks
  chargeTime: number; // Time in ms for attack wind-up
  lifesteal?: number; // e.g., 0.25 for 25% lifesteal
  specialAttack?: {
    emoji: string;
    damageMultiplier: number;
    chargeTime: number; // in ms
  };
}

/** A message displayed in the combat log ticker. */
export interface CombatLogMessage {
  id: number;
  message: string;
  type: 'player' | 'enemy' | 'reward' | 'info' | 'crit' | 'special' | 'item';
}

/** Data for a floating text animation (e.g., damage numbers, coin gains). */
export interface FloatingText {
    id: number;
    text: string;
    isCrit: boolean;
    x: number; // Position as a percentage of the container width
    y: number; // Position as a percentage of the container height
    type: 'player' | 'enemy' | 'coin' | 'fireball' | 'heal' | 'item' | 'bonus' | 'burst' | 'player_attack_emoji' | 'enemy_attack_emoji' | 'debuff' | 'shield' | 'miss' | 'orbital_strike' | 'singularity' | 'shuriken' | 'dragon_strike' | 'poison_dot' | 'burn_dot' | 'bleed_dot' | 'slash_effect' | 'starfall' | 'rolling_pin' | 'rocket_dash_impact' | 'spark_bolt' | 'chain_zap_bolt' | 'meteor_fall' | 'meteor_impact' | 'fang_bite' | 'shadow_tendril' | 'blood_moon' | 'coin_flip' | 'jackpot_effect' | 'flash_pose' | 'siren_song_notes';
    dx?: number; // For burst effect horizontal displacement
    dy?: number; // For burst effect vertical displacement
    // New properties for pre-calculated animation paths
    startX?: number;
    startY?: number;
    deltaX?: number;
    deltaY?: number;
}

/** Player stats formatted as strings for display in the UI. */
export interface FormattedPlayerStats {
    attackPower: number;
    attackSpeed: string;
    critChance: string;
    critDamage: string;
    maxHealth: number;
    luck: string;
    evolveBonus: string;
    accuracy: string;
    damageReduction: string;
}

/** Represents a Damage-over-Time effect for skills. */
export interface DoTEffect {
    damage: number;
    duration: number;
}

/** Represents all temporary effects on the player or enemy originating from player skills. */
export interface SkillEffects {
    // --- General Statuses ---
    freeze: boolean;            // Is the enemy frozen?
    frenzy: boolean;            // Is the player in a frenzy?
    enemyWillMiss: number;      // How many enemy attacks will miss.
    isFeasting?: boolean;       // Is the Snacker's Feast Mode active?
    
    // --- Player Buffs ---
    luckBuff: number;           // Multiplier for luck
    attackPowerBuff: number;    // Multiplier for attack power
    attackSpeedBuff: number;    // Multiplier for attack speed
    damageReduction: number;    // Percentage damage reduction (0 to 1)
    damageShield: number;       // Flat damage absorption amount
    guaranteedCrits: number;    // Number of guaranteed critical hits
    critBuff: { chance: number; damage: number } | null; // Temporary buff to crit chance/damage
    critDamageBuff: number;     // Multiplier for crit damage
    reflectDamage: number;      // Percentage of damage to reflect (0 to 1)
    poisonAttacks: number;      // Number of attacks that will apply poison

    // --- Enemy Debuffs ---
    enemyPowerDebuff: number;   // Percentage reduction in enemy power (0 to 1)
    enemySpeedDebuff: number;   // Percentage reduction in enemy speed (0 to 1)
    
    // --- Damage Over Time Effects on Enemy ---
    poisonDoT: DoTEffect;
    venomDoT: DoTEffect;
    burnDoT: DoTEffect;
    bleedDoT: DoTEffect;
}

/** Represents a temporary buff/debuff from a SKILL for UI display purposes. */
export interface ActiveSkillEffect {
    id: string; // The SpecialAbilityId
    name: string;
    emoji: string;
    description: string;
    durationMs: number;
    startTime: number;
}


// --- Event System Types ---

/** Defines the stat modifiers an ActiveEffect can apply. */
export interface StatModifier {
    // Flat bonuses are applied before percentage bonuses
    flat?: Partial<Pick<PlayerStats, 'attackPower' | 'maxHealth' | 'attackSpeed'>>;
    // Multiplicative bonuses (e.g., 0.1 for +10%) are applied after flat bonuses
    percent?: Partial<Pick<PlayerStats, 'attackPower' | 'maxHealth' | 'attackSpeed' | 'critChance' | 'critDamage' | 'luck' | 'accuracy' | 'damageReduction'>>;
}

/** Represents an ongoing buff or debuff on the player. */
export interface ActiveEffect {
    id: string; // Unique instance ID for this effect
    name: string;
    description: string;
    duration_ms: number; // Time remaining in milliseconds, or Infinity for permanent
    type: 'buff' | 'debuff';
    modifiers: StatModifier;
}

/** Defines the type of consequence an event option can have. */
export enum EventConsequenceType {
    STAT_MODIFIER = 'STAT_MODIFIER',
    ITEM_REWARD = 'ITEM_REWARD',
    RESOURCE = 'RESOURCE',
    TELEPORT = 'TELEPORT',
    NOTHING = 'NOTHING',
    SET_FLAG = 'SET_FLAG',
    HEAL = 'HEAL',
}

// Payload definitions for each consequence type
interface StatModifierPayload {
    effects: Omit<ActiveEffect, 'id' | 'duration_ms'>[];
    duration_ms: number; // Infinity for permanent
}
interface ItemRewardPayload {
    itemId: string; // Specific ID from items.ts
    rarity: Rarity;
}
interface ResourcePayload {
    amount: number; // Can be negative
}
interface TeleportPayload {
    substages: number; // -1 for back, +1 for forward
}
interface SetFlagPayload {
    flag: string;
}
interface HealPayload {
    healType: 'percent_missing' | 'percent_max' | 'full';
    amount: number; // 0.0 to 1.0 for percentages
}

/** The discriminated union for the outcome of an event choice. */
export type EventConsequence = { resultText: string; outcomeEmoji: string; } & (
    | { type: EventConsequenceType.STAT_MODIFIER; payload: StatModifierPayload }
    | { type: EventConsequenceType.ITEM_REWARD; payload: ItemRewardPayload }
    | { type: EventConsequenceType.RESOURCE; payload: ResourcePayload }
    | { type: EventConsequenceType.TELEPORT; payload: TeleportPayload }
    | { type: EventConsequenceType.SET_FLAG; payload: SetFlagPayload }
    | { type: EventConsequenceType.HEAL; payload: HealPayload }
    | { type: EventConsequenceType.NOTHING; payload?: never }
);

/** Represents a single, weighted consequence for a random event option. */
export interface WeightedConsequence {
    consequence: EventConsequence;
    weight: number;
}

/** Represents one of the four choices a player can make during an event. */
export interface EventOption {
    text: string;
    emoji: string;
    cost?: number;
    consequence?: EventConsequence;
    randomConsequences?: WeightedConsequence[];
    requirement?: {
        focus?: StatFocus;
        gender?: 'male' | 'female';
    };
    genderedConsequence?: {
        male: EventConsequence;
        female: EventConsequence;
        neutral?: EventConsequence;
    };
}

/** The core object for a single narrative event. */
export interface GameEvent {
    id: string; // e.g., `realm_pirate_cove_01`, `common_moral_dilemma_03`
    title: string;
    description: string;
    emojis: string[];
    options: [EventOption, EventOption, EventOption, EventOption];
    eventType: 'common' | 'realm_specific';
    realm?: string; // e.g., "Pirate's Cove", only for realm_specific events
    requiredFlag?: string; // The flag required to trigger this event
    isPostGameEvent?: boolean;
}