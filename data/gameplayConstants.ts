

/**
 * @file data/gameplayConstants.ts
 * @description Contains core constants defining game progression and rules.
 */

// --- GAME PACING ---

/** The resolution of the game loop in milliseconds. A smaller number means a smoother but more intensive loop. */
export const GAME_TICK_MS = 100;

/** The base time in milliseconds between enemy attacks. */
export const ENEMY_ATTACK_INTERVAL = 3300;

/** The base time in milliseconds for a player attack at 1.0 attack speed. */
export const PLAYER_ATTACK_INTERVAL_BASE = 3000;


// --- GAME PROGRESSION ---

/** The number of non-boss enemies per stage. The sub-stage after this will be the boss. */
export const ENEMIES_PER_STAGE = 5;

/** The permanent bonus to core stats (HP, Attack, Speed) gained per upgrade level upon Evolving. */
export const EVOLVE_BONUS_PER_LEVEL = 0.01; // 1% bonus per upgrade level

/** The stage the player must clear to win the game. */
export const WIN_REALM = 10;

// --- EVENT SYSTEM ---

/** The base probability (0.0 to 1.0) of an event triggering after defeating an enemy. NOTE: This is currently unused as of the guaranteed event system implementation. */
export const EVENT_CHANCE = 0.20; // 20% chance

/** The maximum number of events that can trigger within a single realm under the current logic. */
export const MAX_EVENTS_PER_REALM = 3;
