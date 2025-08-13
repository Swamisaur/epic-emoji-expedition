/**
 * @file data/events.ts
 * @description The central barrel file for all narrative events in the game.
 * It imports events from modularized files and exports a single combined array.
 */

import { GameEvent } from '../../types';
import { commonEvents_1 } from './events/common_1';
import { commonEvents_2 } from './events/common_2';
import { commonEvents_3 } from './events/common_3';
import { commonEvents_4 } from './events/common_4';
import { commonEvents_5 } from './events/common_5';
import { piratesCoveEvents_1 } from './events/piratesCove_1';
import { piratesCoveEvents_2 } from './events/piratesCove_2';
import { piratesCoveEvents_3 } from './events/piratesCove_3';
import { piratesCoveEvents_4 } from './events/piratesCove_4';
import { piratesCoveEvents_5 } from './events/piratesCove_5';
import { whisperingWoodsEvents_1 } from './events/whisperingWoods_1';
import { whisperingWoodsEvents_2 } from './events/whisperingWoods_2';
import { whisperingWoodsEvents_3 } from './events/whisperingWoods_3';
import { whisperingWoodsEvents_4 } from './events/whisperingWoods_4';
import { whisperingWoodsEvents_5 } from './events/whisperingWoods_5';
import { scorchedSandsEvents_1 } from './events/scorchedSands_1';
import { scorchedSandsEvents_2 } from './events/scorchedSands_2';
import { scorchedSandsEvents_3 } from './events/scorchedSands_3';
import { scorchedSandsEvents_4 } from './events/scorchedSands_4';
import { scorchedSandsEvents_5 } from './events/scorchedSands_5';
import { infernoPeakEvents_1 } from './events/infernoPeak_1';
import { infernoPeakEvents_2 } from './events/infernoPeak_2';
import { infernoPeakEvents_3 } from './events/infernoPeak_3';
import { infernoPeakEvents_4 } from './events/infernoPeak_4';
import { infernoPeakEvents_5 } from './events/infernoPeak_5';
import { fallenCitadelEvents_1 } from './events/fallenCitadel';
import { fallenCitadelEvents_2 } from './events/fallenCitadel_2';
import { fallenCitadelEvents_3 } from './events/fallenCitadel_3';
import { fallenCitadelEvents_4 } from './events/fallenCitadel_4';
import { fallenCitadelEvents_5 } from './events/fallenCitadel_5';
import { hauntedCatacombsEvents_1 } from './events/hauntedCatacombs';
import { hauntedCatacombsEvents_2 } from './events/hauntedCatacombs_2';
import { hauntedCatacombsEvents_3 } from './events/hauntedCatacombs_3';
import { hauntedCatacombsEvents_4 } from './events/hauntedCatacombs_4';
import { hauntedCatacombsEvents_5 } from './events/hauntedCatacombs_5';
import { scrapheapMetropolisEvents_1 } from './events/scrapheapMetropolis';
import { scrapheapMetropolisEvents_2 } from './events/scrapheapMetropolis_2';
import { scrapheapMetropolisEvents_3 } from './events/scrapheapMetropolis_3';
import { scrapheapMetropolisEvents_4 } from './events/scrapheapMetropolis_4';
import { scrapheapMetropolisEvents_5 } from './events/scrapheapMetropolis_5';
import { glacialPeakEvents_1 } from './events/glacialPeak';
import { glacialPeakEvents_2 } from './events/glacialPeak_2';
import { glacialPeakEvents_3 } from './events/glacialPeak_3';
import { glacialPeakEvents_4 } from './events/glacialPeak_4';
import { glacialPeakEvents_5 } from './events/glacialPeak_5';
import { tangledJungleEvents_1 } from './events/tangledJungle';
import { tangledJungleEvents_2 } from './events/tangledJungle_2';
import { tangledJungleEvents_3 } from './events/tangledJungle_3';
import { tangledJungleEvents_4 } from './events/tangledJungle_4';
import { tangledJungleEvents_5 } from './events/tangledJungle_5';
import { contaminatedSewersEvents_1 } from './events/contaminatedSewers';
import { contaminatedSewersEvents_2 } from './events/contaminatedSewers_2';
import { contaminatedSewersEvents_3 } from './events/contaminatedSewers_3';
import { contaminatedSewersEvents_4 } from './events/contaminatedSewers_4';
import { contaminatedSewersEvents_5 } from './events/contaminatedSewers_5';
import { madKingsVaultEvents_1 } from './events/madKingsVault';
import { madKingsVaultEvents_2 } from './events/madKingsVault_2';
import { madKingsVaultEvents_3 } from './events/madKingsVault_3';
import { madKingsVaultEvents_4 } from './events/madKingsVault_4';
import { madKingsVaultEvents_5 } from './events/madKingsVault_5';
import { legendEvents } from './events/legends';


export const ALL_EVENTS: GameEvent[] = [
    // Common Events
    ...commonEvents_1,
    ...commonEvents_2,
    ...commonEvents_3,
    ...commonEvents_4,
    ...commonEvents_5,

    // Pirate's Cove
    ...piratesCoveEvents_1,
    ...piratesCoveEvents_2,
    ...piratesCoveEvents_3,
    ...piratesCoveEvents_4,
    ...piratesCoveEvents_5,
    
    // Whispering Woods
    ...whisperingWoodsEvents_1,
    ...whisperingWoodsEvents_2,
    ...whisperingWoodsEvents_3,
    ...whisperingWoodsEvents_4,
    ...whisperingWoodsEvents_5,

    // Scorched Sands
    ...scorchedSandsEvents_1,
    ...scorchedSandsEvents_2,
    ...scorchedSandsEvents_3,
    ...scorchedSandsEvents_4,
    ...scorchedSandsEvents_5,

    // Inferno Peak
    ...infernoPeakEvents_1,
    ...infernoPeakEvents_2,
    ...infernoPeakEvents_3,
    ...infernoPeakEvents_4,
    ...infernoPeakEvents_5,

    // Fallen Citadel
    ...fallenCitadelEvents_1,
    ...fallenCitadelEvents_2,
    ...fallenCitadelEvents_3,
    ...fallenCitadelEvents_4,
    ...fallenCitadelEvents_5,

    // Haunted Catacombs
    ...hauntedCatacombsEvents_1,
    ...hauntedCatacombsEvents_2,
    ...hauntedCatacombsEvents_3,
    ...hauntedCatacombsEvents_4,
    ...hauntedCatacombsEvents_5,

    // Scrapheap Metropolis
    ...scrapheapMetropolisEvents_1,
    ...scrapheapMetropolisEvents_2,
    ...scrapheapMetropolisEvents_3,
    ...scrapheapMetropolisEvents_4,
    ...scrapheapMetropolisEvents_5,

    // Glacial Peak
    ...glacialPeakEvents_1,
    ...glacialPeakEvents_2,
    ...glacialPeakEvents_3,
    ...glacialPeakEvents_4,
    ...glacialPeakEvents_5,

    // Tangled Jungle
    ...tangledJungleEvents_1,
    ...tangledJungleEvents_2,
    ...tangledJungleEvents_3,
    ...tangledJungleEvents_4,
    ...tangledJungleEvents_5,

    // Contaminated Sewers
    ...contaminatedSewersEvents_1,
    ...contaminatedSewersEvents_2,
    ...contaminatedSewersEvents_3,
    ...contaminatedSewersEvents_4,
    ...contaminatedSewersEvents_5,

    // The Mad King's Vault
    ...madKingsVaultEvents_1,
    ...madKingsVaultEvents_2,
    ...madKingsVaultEvents_3,
    ...madKingsVaultEvents_4,
    ...madKingsVaultEvents_5,
    
    // Post-Game Legend Events
    ...legendEvents,
];
