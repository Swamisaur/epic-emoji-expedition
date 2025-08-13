/**
 * @file data/events/legends.ts
 * @description The central barrel file for all "Encounter with a Legend" events.
 * It imports events from modularized files and exports a single combined array.
 * This structure was implemented as part of the Great Event Expansion to improve maintainability.
 */
import { GameEvent } from '../../types';
import { commonLegendEvents } from './common_legends';
import { celebrityLegendEvents_1 } from './celebrity_legends_1';
import { celebrityLegendEvents_2 } from './celebrity_legends_2';
import { celebrityLegendEvents_3 } from './celebrity_legends_3';
import { celebrityLegendEvents_4 } from './celebrity_legends_4';

export const legendEvents: GameEvent[] = [
    ...commonLegendEvents,
    ...celebrityLegendEvents_1,
    ...celebrityLegendEvents_2,
    ...celebrityLegendEvents_3,
    ...celebrityLegendEvents_4,
];