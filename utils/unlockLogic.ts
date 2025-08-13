/**
 * @file unlockLogic.ts
 * @description Contains the centralized utility function for determining if an
 * upgrade or ability is unlocked based on the player's progress.
 */
import { Upgrade, SpecialAbility } from '../types';

/** Defines the shape of the player's progress relevant for unlock checks. */
interface PlayerProgress {
    totalUpgradeLevels: number;
    coreUpgradeVariety: number;
}

/**
 * Checks if a given item (Upgrade or SpecialAbility) is unlocked based on the player's progress.
 * @param item The upgrade or ability to check.
 * @param progress An object containing the player's current progress metrics.
 * @returns `true` if the item is unlocked, `false` otherwise.
 */
export const isUnlocked = (
    item: Upgrade | SpecialAbility,
    progress: PlayerProgress
): boolean => {
    // If an item has no unlock criteria, it is considered unlocked by default.
    if (!item.unlockCriteria) {
        return true;
    }

    const { requiredTotalLevels, requiredCoreUpgradeVariety } = item.unlockCriteria;

    // Check if the total number of purchased upgrade levels meets the requirement.
    if (requiredTotalLevels && progress.totalUpgradeLevels < requiredTotalLevels) {
        return false;
    }

    // Check if the number of unique core upgrades purchased meets the requirement.
    if (requiredCoreUpgradeVariety && progress.coreUpgradeVariety < requiredCoreUpgradeVariety) {
        return false;
    }

    // If all defined criteria are met, the item is unlocked.
    return true;
};
