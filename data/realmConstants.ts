/**
 * @file data/realmConstants.ts
 * @description The new single source of truth for all realm definitions.
 * It imports standalone realm files and composes them into the REALM_THEMES array.
 */
import { RealmTheme } from '../types';

// Import individual realm definitions
import { piratesCove } from './realms/piratesCove';
import { whisperingWoods } from './realms/whisperingWoods';
import { scorchedSands } from './realms/scorchedSands';
import { infernoPeak } from './realms/infernoPeak';
import { fallenCitadel } from './realms/fallenCitadel';
import { hauntedCatacombs } from './realms/hauntedCatacombs';
import { scrapheapMetropolis } from './realms/scrapheapMetropolis';
import { glacialPeak } from './realms/glacialPeak';
import { tangledJungle } from './realms/tangledJungle';
import { contaminatedSewers } from './realms/contaminatedSewers';
import { madKingsVault } from './realms/madKingsVault';

/**
 * The master list of all realms in the game, composed from individual files.
 * The order here determines the progression in a standard run.
 */
export const REALM_THEMES: RealmTheme[] = [
    piratesCove,
    whisperingWoods,
    scorchedSands,
    infernoPeak,
    fallenCitadel,
    hauntedCatacombs,
    scrapheapMetropolis,
    glacialPeak,
    tangledJungle,
    contaminatedSewers,
    madKingsVault,
];
