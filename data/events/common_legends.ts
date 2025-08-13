/**
 * @file data/events/common_legends.ts
 * @description Contains the generic "Encounter with a Legend" events for custom characters.
 * This modularization is part of the Great Event Expansion to improve maintainability.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const commonLegendEvents: GameEvent[] = [
    {
        id: 'legend_generic_01',
        title: "Encounter with a Legend",
        description: "A being of pure light appears. 'You have conquered this timeline. Your legend grows. Choose your reward for the next life.'",
        emojis: ['✨', '👑', '♾️', '🎁'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: 'Take the Crown',
                emoji: '👑',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_crown_buff' },
                    resultText: 'You take the Crown of Ascension. Its power will echo through your next life, doubling your strength.',
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Change Your Path',
                emoji: '♾️',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_change_class' },
                    resultText: 'You choose a new destiny. The path to heroism is varied. You will be reborn to choose again.',
                    outcomeEmoji: '🗺️'
                }
            },
            {
                text: 'Ask for a Head Start',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_gold_start' },
                    resultText: '"A wise request." The being grants you a significant cache of gold for your next journey.',
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Ask for a Powerful Gift',
                emoji: '🎁',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_item_start' },
                    resultText: '"A tangible advantage." The being forges an item of legendary power for you to begin your next life with.',
                    outcomeEmoji: '🤩'
                }
            }
        ]
    },
    {
        id: 'legend_cosmic_forge_01',
        title: "The Cosmic Forge",
        description: "The Forge of Creation roars before you. Its keeper, a being of starlight, offers to reforge your destiny.",
        emojis: ['🌌', '🔥', '⚒️', '✨'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
             { text: 'Take the Crown', emoji: '👑', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_crown_buff' }, resultText: 'You take the Crown of Ascension. Its power will echo through your next life, doubling your strength.', outcomeEmoji: '✨' }},
             { text: 'Change Your Path', emoji: '♾️', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_change_class' }, resultText: 'You choose a new destiny. The path to heroism is varied. You will be reborn to choose again.', outcomeEmoji: '🗺️' }},
             { text: 'Temper my soul in cosmic fire.', emoji: '❤️‍🔥', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_permanent_hp' }, resultText: 'You endure the cosmic flames. Your soul is tempered like steel, granting you a permanent reserve of health for your next life.', outcomeEmoji: '💪' }},
             { text: "Grant me the Forge's Bounty.", emoji: '💰', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_double_gold_start' }, resultText: 'The keeper grants you a bounty forged from pure starlight. You will begin your next journey with an immense treasury.', outcomeEmoji: '🤑' }},
        ]
    },
    {
        id: 'legend_weaver_fates_01',
        title: "The Weaver of Fates",
        description: "An ancient crone sits at a loom, weaving the threads of destiny. 'Your thread is bright, hero,' she cackles. 'Let us add a new color to it.'",
        emojis: ['🧵', '👵', '✨', '✂️'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            { text: 'Take the Crown', emoji: '👑', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_crown_buff' }, resultText: 'You take the Crown of Ascension. Its power will echo through your next life, doubling your strength.', outcomeEmoji: '✨' }},
            { text: 'Change Your Path', emoji: '♾️', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_change_class' }, resultText: 'You choose a new destiny. The path to heroism is varied. You will be reborn to choose again.', outcomeEmoji: '🗺️' }},
            { text: 'Weave a thread of gold.', emoji: '💰', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_gold_start' }, resultText: 'The weaver threads pure gold into your destiny. You will begin your next life with a handsome sum.', outcomeEmoji: '🪙' }},
            { text: 'Weave a thread of victory.', emoji: '🏆', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_skip_realm_1' }, resultText: 'She weaves a shortcut into your fate. You will bypass the trials of the first realm in your next life.', outcomeEmoji: '🚀' }},
        ]
    },
    {
        id: 'legend_archivist_01',
        title: "The Archivist of Heroes",
        description: "You find yourself in an infinite library. A silent, hooded figure gestures to an empty pedestal. 'Your deeds are worthy of record. Choose how your legend will be remembered.'",
        emojis: ['📚', '✍️', '🏆', '🛡️'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
             { text: 'Take the Crown', emoji: '👑', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_crown_buff' }, resultText: 'You take the Crown of Ascension. Its power will echo through your next life, doubling your strength.', outcomeEmoji: '✨' }},
             { text: 'Change Your Path', emoji: '♾️', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_change_class' }, resultText: 'You choose a new destiny. The path to heroism is varied. You will be reborn to choose again.', outcomeEmoji: '🗺️' }},
             { text: 'Remembered for my treasures.', emoji: '💎', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_two_items_start' }, resultText: 'The Archivist records your legendary haul. You will begin your next life with not one, but two powerful artifacts.', outcomeEmoji: '🤩' }},
             { text: 'Remembered for my indomitable will.', emoji: '🛡️', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_start_with_shield' }, resultText: 'Your resilience is recorded. You will begin your next life with a permanent, unbreakable shield of will.', outcomeEmoji: '💪' }},
        ]
    },
    {
        id: 'legend_gambler_01',
        title: "The Gambler's Paradise",
        description: "You arrive in a celestial casino. A shadowy figure at a card table motions you over. 'You've won the grand prize, hero. Now, care for one last wager?'",
        emojis: ['🎲', '🎰', '🃏', '💰'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            { text: 'Take the Crown', emoji: '👑', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_crown_buff' }, resultText: 'You take the Crown of Ascension. Its power will echo through your next life, doubling your strength.', outcomeEmoji: '✨' }},
            { text: 'Change Your Path', emoji: '♾️', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_change_class' }, resultText: 'You choose a new destiny. The path to heroism is varied. You will be reborn to choose again.', outcomeEmoji: '🗺️' }},
            { text: 'All on red.', emoji: '💰', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_wager_gold' }, resultText: 'You wager it all on a coin flip. The fate of your next life\'s fortune is in the hands of chance.', outcomeEmoji: '🪙' }},
            { text: 'Let it ride.', emoji: '🎁', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_wager_item' }, resultText: 'You risk it all for a legendary prize. You will either start with an item of immense power... or something quite common.', outcomeEmoji: '❓' }},
        ]
    }
];
