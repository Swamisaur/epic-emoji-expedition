/**
 * @file data/items.ts
 * @description The central source of truth for all droppable items in the game.
 * Its contents are merged from the now-obsolete files in the /data/items/ directory.
 */
import { Item } from '../types';

// The 'instanceId' and 'rarity' properties will be added when an item is generated in-game.
export type ItemTemplate = Omit<Item, 'instanceId' | 'rarity'>;

// --- Head ---
const headItems: ItemTemplate[] = [
    { id: 'h1', name: 'Baseball Cap', emoji: '🧢', slot: 'head', baseStats: { maxHealth: 20 } },
    { id: 'h2', name: 'Reading Glasses', emoji: '👓', slot: 'head', baseStats: { critChance: 0.01 } },
    { id: 'h3', name: 'Crown of Greed', emoji: '👑', slot: 'head', baseStats: { luck: 0.05 } },
    { id: 'h4', name: 'Top Hat', emoji: '🎩', slot: 'head', baseStats: { luck: 0.05 } },
    { id: 'h5', name: 'Graduation Cap', emoji: '🎓', slot: 'head', baseStats: { critDamage: 0.1 } },
    { id: 'h6', name: 'Helm of A-peel-ing', emoji: '🍌', slot: 'head', baseStats: { maxHealth: 30, luck: 0.02 } },
    { id: 'h7', name: 'Hard Hat', emoji: '👷', slot: 'head', baseStats: { maxHealth: 50 } },
    { id: 'h8', name: 'Detective Hat', emoji: '🕵️', slot: 'head', baseStats: { critChance: 0.02, critDamage: 0.05 } },
    { id: 'h9', name: 'Magic Turban', emoji: '👳', slot: 'head', baseStats: { attackPower: 5 } },
    { id: 'h10', name: 'Fedora of Fortune', emoji: '👒', slot: 'head', baseStats: { luck: 0.06 } },
];

// --- Top Wear ---
const topWearItems: ItemTemplate[] = [
    { id: 't1', name: 'T-Shirt', emoji: '👕', slot: 'topWear', baseStats: { maxHealth: 30 } },
    { id: 't2', name: 'Leather Vest', emoji: '🎽', slot: 'topWear', baseStats: { maxHealth: 40, attackPower: 3 } },
    { id: 't3', name: 'Kimono', emoji: '👘', slot: 'topWear', baseStats: { attackSpeed: 0.1 } },
    { id: 't4', name: 'Safety Vest', emoji: '🦺', slot: 'topWear', baseStats: { maxHealth: 100 } },
    { id: 't5', name: 'Lab Coat', emoji: '🥼', slot: 'topWear', baseStats: { critChance: 0.03 } },
    { id: 't6', name: 'Running Shirt', emoji: '🏃', slot: 'topWear', baseStats: { attackSpeed: 0.2 } },
    { id: 't7', name: 'Scarf of Warmth', emoji: '🧣', slot: 'topWear', baseStats: { maxHealth: 60 } },
    { id: 't8', name: 'Robe of the Magi', emoji: '🧙', slot: 'topWear', baseStats: { attackPower: 10 } },
    { id: 't9', name: 'Spiked Pauldrons', emoji: '💪', slot: 'topWear', baseStats: { attackPower: 8, maxHealth: 20 } },
    { id: 't10', name: 'Golden Fleece', emoji: '🏆', slot: 'topWear', baseStats: { luck: 0.15 } },
];

// --- Bottom Wear ---
const bottomWearItems: ItemTemplate[] = [
    { id: 'b1', name: 'Blue Jeans', emoji: '👖', slot: 'bottomWear', baseStats: { maxHealth: 40 } },
    { id: 'b2', name: 'Shorts of Speed', emoji: '🩳', slot: 'bottomWear', baseStats: { attackSpeed: 0.15 } },
    { id: 'b3', name: 'Leaf Drawers', emoji: '🍃', slot: 'bottomWear', baseStats: { critChance: 0.02 } },
    { id: 'b4', name: 'Hiking Boots', emoji: '🥾', slot: 'bottomWear', baseStats: { maxHealth: 70 } },
    { id: 'b5', name: 'Greaves of Haste', emoji: '🦵', slot: 'bottomWear', baseStats: { attackSpeed: 0.25 } },
    { id: 'b6', name: 'Ninja Tabi', emoji: '🥷', slot: 'bottomWear', baseStats: { critChance: 0.01, attackSpeed: 0.1 } },
    { id: 'b7', name: 'Lucky Leggings', emoji: '🍀', slot: 'bottomWear', baseStats: { luck: 0.1 } },
    { id: 'b8', name: 'Iron Greaves', emoji: '🔩', slot: 'bottomWear', baseStats: { maxHealth: 120 } },
    { id: 'b9', name: 'Jorts', emoji: '🤠', slot: 'bottomWear', baseStats: { critDamage: 0.2 } },
    { id: 'b10', name: 'Kilt of Courage', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', slot: 'bottomWear', baseStats: { attackPower: 5, maxHealth: 50 } },
];

// --- Main Hand ---
const mainHandItems: ItemTemplate[] = [
    { id: 'm1', name: 'Spartan Dirk', emoji: '🗡️', slot: 'mainHand', baseStats: { attackPower: 8 } },
    { id: 'm2', name: 'Kitchen Knife', emoji: '🔪', slot: 'mainHand', baseStats: { critChance: 0.03 } },
    { id: 'm3', name: 'Lumberjack Axe', emoji: '🪓', slot: 'mainHand', baseStats: { critDamage: 0.25 } },
    { id: 'm4', name: 'Magic Wand', emoji: '🪄', slot: 'mainHand', baseStats: { attackPower: 5, critChance: 0.02 } },
    { id: 'm5', name: 'Carpenter\'s Hammer', emoji: '🔨', slot: 'mainHand', baseStats: { attackPower: 12 } },
    { id: 'm6', name: 'Trident of the Depths', emoji: '🔱', slot: 'mainHand', baseStats: { attackPower: 15 } },
    { id: 'm7', name: 'Pickaxe of Piercing', emoji: '⛏️', slot: 'mainHand', baseStats: { critDamage: 0.4 } },
    { id: 'm8', name: 'Scythe of Reaping', emoji: '💀', slot: 'mainHand', baseStats: { attackPower: 10, critChance: 0.03 } },
    { id: 'm9', name: 'Boxing Glove', emoji: '🥊', slot: 'mainHand', baseStats: { attackSpeed: 0.3 } },
    { id: 'm10', name: 'Excalibur', emoji: '⚔️', slot: 'mainHand', baseStats: { attackPower: 25 } },
];

// --- Off Hand ---
const offHandItems: ItemTemplate[] = [
    { id: 'o1', name: 'Wooden Shield', emoji: '🛡️', slot: 'offHand', baseStats: { maxHealth: 80 } },
    { id: 'o2', name: 'Elvan Bow', emoji: '🏹', slot: 'offHand', baseStats: { attackSpeed: 0.2, critChance: 0.02 } },
    { id: 'o3', name: 'Frying Pan', emoji: '🍳', slot: 'offHand', baseStats: { maxHealth: 40, attackPower: 4 } },
    { id: 'o4', name: 'Crystal Ball', emoji: '🔮', slot: 'offHand', baseStats: { critChance: 0.04 } },
    { id: 'o5', name: 'Book of Secrets', emoji: '📖', slot: 'offHand', baseStats: { critDamage: 0.3 } },
    { id: 'o6', name: 'Pouch of Holding', emoji: '👜', slot: 'offHand', baseStats: { luck: 0.15 } },
    { id: 'o7', name: 'Four-Leaf Clover', emoji: '🍀', slot: 'offHand', baseStats: { luck: 0.15 } },
    { id: 'o8', name: 'Kite Shield', emoji: '🪁', slot: 'offHand', baseStats: { maxHealth: 150 } },
    { id: 'o9', name: 'Monkey\'s Paw', emoji: '🐒', slot: 'offHand', baseStats: { luck: 0.1 } },
    { id: 'o10', 'name': 'Aegis of the Gods', 'emoji': '🏛️', 'slot': 'offHand', 'baseStats': { 'maxHealth': 200, 'attackPower': 10 } },
];

// --- Trinket ---
const trinketItems: ItemTemplate[] = [
    { id: 'r1', name: 'Magic Amber', emoji: '💍', slot: 'trinket', baseStats: { critChance: 0.05 } },
    { id: 'r2', name: 'Medal of Honor', emoji: '🎖️', slot: 'trinket', baseStats: { attackPower: 7 } },
    { id: 'r3', name: 'Gem of Power', emoji: '💎', slot: 'trinket', baseStats: { attackPower: 5, maxHealth: 50 } },
    { id: 'r4', name: ' Stopwatch', emoji: '⏱️', slot: 'trinket', baseStats: { attackSpeed: 0.25 } },
    { id: 'r5', name: 'Lucky Horseshoe', emoji: '🧲', slot: 'trinket', baseStats: { luck: 0.2 } },
    { id: 'r6', name: 'Golden Key', emoji: '🔑', slot: 'trinket', baseStats: { luck: 0.2 } },
    { id: 'r7', name: 'Magnifying Glass', emoji: '🔎', slot: 'trinket', baseStats: { critDamage: 0.4 } },
    { id: 'r8', name: 'Broken Compass', emoji: '🧭', slot: 'trinket', baseStats: { luck: 0.1, critChance: 0.02 } },
    { id: 'r9', name: 'Heart Amulet', emoji: '❤️', slot: 'trinket', baseStats: { maxHealth: 150 } },
    { id: 'r10', name: 'Infinity Stone', emoji: '🌌', slot: 'trinket', baseStats: { attackPower: 10, maxHealth: 100, attackSpeed: 0.1 } },
];

/**
 * The master list of all items in the game.
 */
export const ALL_ITEMS: ItemTemplate[] = [
    ...headItems,
    ...topWearItems,
    ...bottomWearItems,
    ...mainHandItems,
    ...offHandItems,
    ...trinketItems,
];
