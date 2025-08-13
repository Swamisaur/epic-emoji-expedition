# Game Design Document

This document details the core concepts, mechanics, and design philosophies of Epic Emoji Expedition.

## 1. High-Level Concept

**Epic Emoji Expedition** is an infinite idle RPG with a charming emoji-based visual style. The player battles through progressively difficult realms, collecting gold and equipment to grow stronger. The core gameplay loop is designed to be simple, satisfying, and rewarding, whether the player is actively engaged or letting the game run in the background.

### Core Gameplay Loop
1.  **Combat**: The hero automatically fights a series of minions and a final boss (Guardian) in each realm. Players can tap the enemy to attack faster.
2.  **Earn**: Defeating enemies rewards the player with gold and equipment.
3.  **Upgrade**: The player spends gold on class-specific upgrades and equips items to increase their power.
4.  **Progress**: The player advances through 11 unique, procedurally ordered realms, facing ever-stronger foes.
5.  **Prestige**: After being defeated, the player can "Ascend," resetting their run but gaining a permanent power boost for all future runs.

## 2. Core Mechanics

### Player Classes
The game features a roster of eight classes, split into two tiers. Players begin by choosing one of four **Base Classes**. By completing the first realm with a base class, they unlock its corresponding **Advanced Class**, which offers a more specialized and powerful playstyle.

#### Base Classes
-   **Ninja 🥷**: A swift assassin, prioritizing raw power and critical hits.
-   **Snacker 🫃**: A connoisseur of combat cuisine, turning snacks into survivability.
-   **Mage 🧙**: A master of arcane arts, focused on critical strikes and elemental power.
-   **Con Artist 🤹**: A silver-tongued trickster who juggles fortune and risk.

#### Advanced Classes
-   **Rockstar 🧑‍🎤**: (Unlocks from Ninja) An icon of shred, overwhelming foes with raw power and flair.
-   **Space Tank 🧑‍🚀**: (Unlocks from Snacker) A heavily armored unit, specializing in damage mitigation and high-impact abilities.
-   **Night Fang 🧛**: (Unlocks from Mage) A deadly predator of the night, thriving on critical strikes and life steal.
-   **Diva 🧚**: (Unlocks from Con Artist) A dazzling superstar who bends fate with flair.

### Upgrades and Abilities
-   **Upgrades**: Each class has a unique set of `Core` (flat bonus) and `Multiplier` (percentage bonus) upgrades.
-   **Abilities**: Each class has three unique, activatable skills with costs and cooldowns.

### Equipment System
-   **Loot**: Enemies have a chance to drop equipment, influenced by the player's Fortune stat.
-   **Slots**: There are 6 equipment slots: Head, Top Wear, Bottom Wear, Main Hand, Off Hand, and Trinket.
-   **Rarity**: Items can be `Common`, `Rare`, or `Legendary`, which multiplies their effectiveness.
-   **Scaling**: Item stats scale based on the total number of upgrade levels purchased, ensuring they remain relevant throughout the game.

### Player Transformation
The player's character emoji visually transforms based on their most upgraded stat category, creating a dynamic appearance that reflects their build (e.g., high Attack leads to a 👮 Firefighter emoji, high Health leads to a 🏋️ Weightlifter emoji).

### Event System
-   **Narrative Choices**: During a run, over 150 unique narrative events can occur, presenting the player with four choices.
-   **Consequences**: Choices can lead to a wide variety of outcomes, including temporary buffs/debuffs, gold or item rewards, teleportation, or even permanent stat changes for the current run.
-   **Chained Events**: Some choices set a "flag," which can unlock a special follow-up event later in the same run.

### Prestige & Win Condition
-   **Ascension**: After defeat, players can "Evolve," which converts their total upgrade levels into a permanent, stacking percentage bonus to all stats for future runs. This also increases the `lineageCount`.
-   **Ascension Tiers**: After winning the game, players can "Ascend," which increases the `ascensionCount`. This makes all enemies significantly harder but also increases rewards, acting as a "New Game+" mode.
-   **Win Condition**: The game is won by defeating the Guardian of the 10th and final realm, The Mad King's Vault. Winning unlocks a permanent buff that doubles all stats.

## 3. UI/UX & Design Philosophy

The design of Epic Emoji Expedition is guided by creating a clean, immersive, and satisfying user experience.

*   **Liquid Glass Interface**: The UI uses a modern "liquid glass" effect, achieved with CSS `backdrop-filter` and a custom SVG filter. This creates a frosted, refractive look that gives the interface a sense of depth over the dynamic emoji backgrounds.
*   **Dynamic Backgrounds**: The splash and event screens feature a dynamic, multi-layered background effect to create a sense of depth and visual interest. Emoji sizes are determined by a bell-curve distribution, with most emojis clustering around a medium size while allowing for very large and very small variations. This size is then linked to other properties to create a parallax effect:
    *   **Opacity**: Larger emojis are more opaque, while smaller ones are fainter, creating a depth-of-field illusion.
    *   **Speed**: Smaller, "distant" emojis move faster than larger, "closer" ones, enhancing the parallax effect.
    *   **Visual Impact**: A ceiling function ensures that the largest emojis are always fully opaque, making them stand out for maximum visual impact.
*   **Responsive First**: The game is designed to be fully responsive. Layouts dynamically adjust, and elements like the main title intelligently truncate (`Epic Emoji Expedition` → `E E E`) to ensure a clean experience on any screen size.
*   **Living Interface**: The UI is packed with animations—from the subtle pulse of a boss to the "card flip" of a new unlock—to make the game feel alive and provide clear feedback for player actions.