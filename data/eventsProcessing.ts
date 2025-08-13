/**
 * @file data/eventsProcessing.ts
 * @description Pre-processes the master list of events into an optimized data structure
 * for more efficient lookups during gameplay. This improves performance by avoiding
 * repeated filtering of the entire event array.
 */
import { GameEvent } from '../types';
import { ALL_EVENTS } from './events';

export interface ProcessedEvents {
    realmSpecific: Map<string, GameEvent[]>;
    common: GameEvent[];
    flagged: GameEvent[];
}

export const PROCESSED_EVENTS: ProcessedEvents = (() => {
    const realmSpecific = new Map<string, GameEvent[]>();
    const common: GameEvent[] = [];
    const flagged: GameEvent[] = [];

    for (const event of ALL_EVENTS) {
        if (event.isPostGameEvent) {
            continue;
        }

        if (event.requiredFlag) {
            flagged.push(event);
        } else if (event.eventType === 'realm_specific' && event.realm) {
            if (!realmSpecific.has(event.realm)) {
                realmSpecific.set(event.realm, []);
            }
            realmSpecific.get(event.realm)!.push(event);
        } else if (event.eventType === 'common') {
            common.push(event);
        }
    }
    return { realmSpecific, common, flagged };
})();