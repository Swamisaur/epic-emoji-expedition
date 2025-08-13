/**
 * @file utils/random.ts
 * @description Contains utility functions for handling randomness.
 */

export interface WeightedItem<T> {
    item: T;
    weight: number;
}

/**
 * Selects a random item from a list of weighted items.
 * @param items - An array of objects, each with an 'item' and its 'weight'.
 * @returns The selected item.
 */
export function getRandomItem<T>(items: WeightedItem<T>[]): T | undefined {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight <= 0) {
        return undefined; // Avoid division by zero and handle empty/invalid input
    }

    let random = Math.random() * totalWeight;

    for (const weightedItem of items) {
        if (random < weightedItem.weight) {
            return weightedItem.item;
        }
        random -= weightedItem.weight;
    }

    // Fallback in case of floating point inaccuracies
    return items[items.length - 1]?.item;
}
