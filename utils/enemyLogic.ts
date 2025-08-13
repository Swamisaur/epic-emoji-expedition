/**
 * @file utils/enemyLogic.ts
 * @description Contains logic for enemy generation and scaling.
 */
import { Enemy, RealmTheme, EnemyArchetype } from '../types';
import { ENEMIES_PER_STAGE, ENEMY_ATTACK_INTERVAL } from '../constants';

const ENEMY_CHARGE_TIME_MS = 300; // Base charge time

/**
 * Defines the properties of each enemy archetype.
 */
const ARCHETYPE_CONFIG: Record<Exclude<EnemyArchetype, 'standard'>, { prefix: string; apply: (stats: Partial<Enemy>) => Partial<Enemy> }> = {
    swift: {
        prefix: 'Swift',
        apply: (stats) => {
            const baseDps = (stats.attackPower ?? 0) / (stats.attackInterval ?? ENEMY_ATTACK_INTERVAL);
            const newInterval = (stats.attackInterval ?? ENEMY_ATTACK_INTERVAL) * 0.6;
            return {
                ...stats,
                attackInterval: newInterval,
                attackPower: baseDps * newInterval,
                chargeTime: (stats.chargeTime ?? ENEMY_CHARGE_TIME_MS) * 0.7,
            };
        },
    },
    heavy: {
        prefix: 'Heavy',
        apply: (stats) => {
            const baseDps = (stats.attackPower ?? 0) / (stats.attackInterval ?? ENEMY_ATTACK_INTERVAL);
            const newInterval = (stats.attackInterval ?? ENEMY_ATTACK_INTERVAL) * 1.8;
            return {
                ...stats,
                attackInterval: newInterval,
                attackPower: baseDps * newInterval,
                chargeTime: (stats.chargeTime ?? ENEMY_CHARGE_TIME_MS) * 2.5,
            };
        },
    },
    arcane: {
        prefix: 'Arcane',
        apply: (stats) => ({
            ...stats,
            attackPower: (stats.attackPower ?? 0) * 1.25, // +25% damage
            maxHealth: (stats.maxHealth ?? 0) * 0.75,   // -25% health
        }),
    },
    vampiric: {
        prefix: 'Vampiric',
        apply: (stats) => ({
            ...stats,
            lifesteal: 0.25, // Heals for 25% of damage dealt
        }),
    },
    juggernaut: {
        prefix: 'Juggernaut',
        apply: (stats) => ({
            ...stats,
            maxHealth: (stats.maxHealth ?? 0) * 1.5,     // +50% health
            attackPower: (stats.attackPower ?? 0) * 0.8, // -20% damage
        }),
    },
};

const MODIFIER_ARCHETYPES = Object.keys(ARCHETYPE_CONFIG) as Exclude<EnemyArchetype, 'standard'>[];


/**
 * Generates a new enemy based on the current stage and sub-stage.
 * Bosses are generated at the end of a stage.
 * @param stage - The current game stage (Realm).
 * @param subStage - The current sub-stage within the realm.
 * @param theme - The RealmTheme for the current stage.
 * @param ascensionCount - The current New Game+ level, for difficulty scaling.
 * @returns A new Enemy object.
 */
export const generateEnemy = (stage: number, subStage: number, theme: RealmTheme, ascensionCount: number = 0): Enemy => {
    const isBoss = subStage > ENEMIES_PER_STAGE;
  
    const template = isBoss
        ? theme.boss
        : theme.minions[(subStage - 1) % theme.minions.length];

    // --- Archetype Selection ---
    let archetype: EnemyArchetype;
    const rand = Math.random();
    if (rand < 0.5) { // 50% chance for a standard enemy
        archetype = 'standard';
    } else {
        archetype = MODIFIER_ARCHETYPES[Math.floor(Math.random() * MODIFIER_ARCHETYPES.length)];
    }

    // --- Base Stat Scaling ---
    const healthScale = Math.pow(1.6, stage - 1) * Math.pow(1.12, subStage - 1);
    const powerScale = Math.pow(1.45, stage - 1) * Math.pow(1.1, subStage - 1);
    const coinScale = Math.pow(1.5, stage - 1) * Math.pow(1.15, subStage - 1);

    // Increased difficulty scaling for higher ascension levels.
    const ascensionMultiplier = 1 + ascensionCount * 1.0 * (1 + ascensionCount / 20);
    const coinAscensionMultiplier = 1 + ascensionCount * 0.25 * (1 + ascensionCount / 40);

    const baseHealth = isBoss ? 250 * 2.25 : 50 * 4;
    const basePower = isBoss ? 5 : 1.5; // Halved from 10 : 3
    const baseCoins = isBoss ? 100 : 10;

    let finalStats: Partial<Enemy> = {
        name: template.name,
        emoji: template.emoji,
        maxHealth: baseHealth * healthScale * ascensionMultiplier,
        attackPower: basePower * powerScale * ascensionMultiplier,
        coinReward: baseCoins * coinScale * coinAscensionMultiplier,
        attackInterval: ENEMY_ATTACK_INTERVAL,
        chargeTime: ENEMY_CHARGE_TIME_MS,
    };

    // --- Apply Archetype Modifiers ---
    if (archetype !== 'standard') {
        const config = ARCHETYPE_CONFIG[archetype];
        finalStats = config.apply(finalStats);
        finalStats.name = `${config.prefix} ${template.name}`;
    }

    // --- Finalize and Return ---
    const finalHealth = Math.ceil(finalStats.maxHealth ?? 0);

    return {
        id: `${stage}-${subStage}-${finalStats.name}-${Date.now()}`,
        name: finalStats.name!,
        emoji: finalStats.emoji!,
        maxHealth: finalHealth,
        currentHealth: finalHealth,
        attackPower: Math.ceil(finalStats.attackPower!),
        coinReward: Math.ceil(finalStats.coinReward!),
        isBoss,
        attackEmoji: template.attackEmoji,
        archetype,
        attackInterval: finalStats.attackInterval!,
        chargeTime: finalStats.chargeTime!,
        lifesteal: finalStats.lifesteal,
        specialAttack: isBoss ? theme.boss.specialAttack : undefined,
    };
};