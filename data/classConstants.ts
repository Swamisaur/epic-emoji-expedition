/**
 * @file data/classConstants.ts
 * @description The new single source of truth for all player class definitions.
 * It imports standalone class files and composes them into the ALL_CLASSES array.
 */
import { PlayerClass, PlayerClassId } from '../types';

// Import individual class definitions
import { ninja } from './classes/ninja';
import { rockstar } from './classes/rockstar';
import { snacker } from './classes/snacker';
import { spaceTank } from './classes/spaceTank';
import { mage } from './classes/mage';
import { nightFang } from './classes/nightFang';
import { conArtist } from './classes/conArtist';
import { diva } from './classes/diva';

/**
 * The master registry for all player classes in the game, composed from individual files.
 */
export const ALL_CLASSES: PlayerClass[] = [
    ninja,
    rockstar,
    snacker,
    spaceTank,
    mage,
    nightFang,
    conArtist,
    diva,
];

/**
 * A helper function to generate the initial, unleveled array of upgrades for a given class.
 * This is used to set up the player's state at the beginning of a run.
 * @param classId The ID of the class to get upgrades for.
 * @returns An array of `Upgrade` objects, initialized to level 1.
 */
export const getInitialUpgradesForClass = (classId: PlayerClassId) => {
    const playerClass = ALL_CLASSES.find(c => c.id === classId);
    if (!playerClass) {
        console.error(`Class with id ${classId} not found. Falling back to Ninja.`);
        return ALL_CLASSES[0].upgrades.map(upgradeTpl => ({
            ...upgradeTpl,
            level: 1,
            cost: upgradeTpl.baseCost,
        }));
    }

    return playerClass.upgrades.map(upgradeTpl => ({
        ...upgradeTpl,
        level: 1,
        cost: upgradeTpl.baseCost,
    }));
};
