/**
 * @file constants.ts
 * @description This file acts as a central barrel file for all game constants.
 * It re-exports constants from more specific files in the `data/` directory.
 * This makes it easy to import any constant from a single, predictable location
 * while keeping the definitions organized.
 */

export * from './data/classConstants';
export * from './data/playerConstants';
export * from './data/gameplayConstants';
export * from './data/itemConstants';
export * from './data/realmConstants';
export * from './data/uiConstants';
export * from './data/events';
export * from './data/items';
export * from './data/eventsProcessing';