/**
 * @file data/uiConstants.ts
 * @description Contains constants for UI elements, such as emojis and thresholds.
 */

// --- UI & VISUALS ---

/** The default emoji for coins. */
export const COIN_EMOJI = '💰';

/** Different coin emojis to show for different amounts of coin gain. */
export const COIN_EMOJI_TIERS = { small: '🪙', medium: '💰', large: '💵' };

/** The thresholds for showing different coin tier emojis. */
export const COIN_TIER_THRESHOLDS = { medium: 50, large: 250 };

/**
 * A centralized object for UI animation durations in milliseconds.
 * This ensures consistency for state transitions and visual feedback across the app.
 */
export const ANIMATION_DURATIONS = {
    ENEMY_DEATH: 1200,
    PLAYER_DEATH: 1500,
    TRANSFORMATION: 600,
    SCREEN_FADE_OUT: 500,
};
