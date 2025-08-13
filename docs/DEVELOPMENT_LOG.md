# Idle Emoji Saga - Development Log

This file documents the major work completed on the project, including features implemented, significant bugs fixed, and architectural changes.

---

### **Phase 1: Initial Implementation**

-   **Core Game Loop**:
    -   Implemented the fundamental `Player vs. Enemy` combat logic.
    -   Created the progression system of `Stages` and `Sub-stages`.
    -   Enemies scale in difficulty based on the current stage.
-   **Player Stats & Upgrades**:
    -   Established the initial set of player stats: Attack Power, Attack Speed, Health, Crit Chance/Damage.
    -   Created the in-run upgrade system where players can spend coins to boost stats.
    -   Upgrades were categorized into `flat` and `percent` types.
-   **UI & Feedback**:
    -   Developed the initial UI, including health bars, a combat log, and floating damage numbers.
    -   Used emojis for all characters and icons to enable rapid prototyping.
-   **Prestige System**:
    -   Implemented the `Evolve` (now "Ascend") and `Retain` (now "Try Again") options on the Game Over screen.
    -   Evolving provides a permanent percentage-based boost to core stats for subsequent runs.

---

### **Phase 2: Feature Expansion & Bug Fixing**

-   **Special Abilities**:
    -   Added a panel for special abilities (`Fireball`, `Freeze`, `Frenzy`, `Heal`).
    -   Implemented cost scaling (based on stage) and cooldowns for each ability.
-   **Unlock Notifications**:
    -   Created a system to notify the player with a badge when new upgrades or abilities become affordable for the first time.
-   **Significant Bug Fix: Enemy Skipping / Double Stage Progression**
    -   **Problem**: When an enemy was defeated, the game would sometimes immediately skip the next enemy and spawn the one after it. The final "Monsters Slain" count was also incorrect.
    -   **Root Cause**: The issue was traced to React's `StrictMode`. In development, `StrictMode` intentionally mounts, unmounts, and re-mounts components to detect side effects. This caused the `useEffect` hook responsible for handling an enemy's death to fire twice in rapid succession for the *same enemy*.
    -   **Solution**: A "lock" was implemented using a `useRef` hook (`processedEnemyIds`). This ref holds a `Set` of the unique IDs of enemies whose deaths have already been processed. When the victory logic runs, it first checks if the enemy's ID is in the set. If it is, the function exits immediately. If not, it adds the ID to the set and proceeds with the logic. This ensures the victory process runs exactly once per enemy, fixing the bug.

---

### **Phase 3: Major Code Refactoring & Documentation**

-   **Goal**: To improve modularity, readability, and maintainability in preparation for future feature development.
-   **Architectural Changes**:
    -   **Logic Extraction to Hooks**: The monolithic logic within `App.tsx` was broken down and encapsulated into custom React hooks:
        -   `useGameLoop`: Manages the core `setInterval` for combat.
        -   `useGameEvents`: Handles game state transitions (victory, defeat).
        -   `useUnlockManager`: Manages the UI logic for unlock notifications.
    -   **Utility Functions**: Helper functions (`calculatePlayerStats`, `generateEnemy`, `formatPlayerStats`) were moved into a new `/utils` directory.
    -   **Componentization**: Large components were broken down into smaller, more focused units (e.g., `UpgradePanel` now uses `UpgradeButton` and `AbilityButton` children).
    -   **File Structure**: Reorganized the `/components` directory into `common`, `game`, `ui`, and `screens` subdirectories for better clarity.
    -   **Centralized Animations**: All CSS keyframe animations were moved into a single `GameAnimations.tsx` component to de-clutter other component files.
-   **Documentation**:
    -   Added extensive JSDoc and inline comments to all files to explain their purpose and the "why" behind the code.
    -   Created three top-level documentation files:
        -   `REQUIREMENTS.md`: To outline the project's vision and roadmap.
        -   `WORK_DONE.md`: This file, to log progress.
        -   `CODING_GUIDELINES.md`: To establish best practices for future development.

---

### **Phase 4: Equipment & Polish**

-   **Equipment System**:
    -   Implemented a full equipment system with 6 slots: Head, Top Wear, Bottom Wear, Main Hand, Off Hand, and Trinket.
    -   Created a database of items in `data/items.ts`.
    -   Enemies now have a chance to drop items, with the chance scaling with the player's `Luck` stat.
    -   Items can drop with `Common`, `Rare`, or `Legendary` rarity, which affects their stat multipliers.
    -   Item stats scale based on the total number of upgrade levels purchased, making them relevant at all stages of the game.
-   **Player Customization & Transformation**:
    -   The splash screen now allows players to choose a base character emoji and skin tone.
    -   The player's emoji now dynamically transforms based on their highest-level stat group (e.g., investing heavily in Attack upgrades changes the player's appearance).
    -   Transformations support the chosen base character and skin tone.
-   **UI/UX Overhaul**:
    -   The `UpgradePanel` is now tabbed, including a new `Equipment` tab for inventory and gear management.
    -   Polished the `SplashScreen` and `GameOverScreen` with more detailed instructions, better layouts, and themed, animated backgrounds.
    -   Added a "Click to attack faster!" hint to teach players about manual attacks.
-   **Official Win Condition**:
    -   Implemented a `WinScreen` for when the player defeats the Guardian of Realm 10.
    -   Winning the game grants the "Magic Necklace of Wishes," a permanent buff that doubles all stats for future runs.

---

### **Phase 5: State Management Refactor**

-   **Goal**: Decompose the monolithic `useGameState` hook into smaller, more focused hooks to improve separation of concerns and maintainability.
-   **Architectural Changes**:
    -   The `useGameState` hook was refactored to be a "composition" hook that orchestrates other hooks.
    -   State management was broken down into several new, specialized hooks:
        -   `usePlayerCoreState`: Manages the player's identity, stats, equipment, and related effects (stat calculation, transformations).
        -   `useRunState`: Manages the state for a single game session (game state, stage, coins, etc.).
        -   `useEnemyState`: Manages the current enemy's state and initial generation.
        -   `useAbilityState`: Manages cooldowns and active effects for special abilities.
        -   `useUIState`: Manages all UI-related state, such as combat logs, floating text, and interaction hints.
    -   This change further modularizes the codebase, making each part of the state logic independent and easier to reason about, without altering the application's external behavior or the `App` component's structure.

---

### **Phase 6: Game Logic Modularization**

-   **Goal**: Further improve code organization by breaking down the monolithic `utils/gameLogic.ts` file.
-   **Architectural Changes**:
    -   The `gameLogic.ts` file was decomposed into smaller, single-responsibility files based on their domain:
        -   `utils/playerStatCalculations.ts`: Handles all logic for calculating final player stats.
        -   `utils/itemStatCalculations.ts`: Manages stat scaling and combination for equipment.
        -   `utils/enemyLogic.ts`: Contains the logic for generating enemies.
        -   `utils/playerVisuals.ts`: Manages the logic for player character transformations.
    -   All related import paths throughout the application were updated to reflect this new structure. This enhances maintainability and makes it easier to locate specific pieces of game logic.

---

### **Phase 7: Player Actions Refactor**

-   **Goal**: Decompose the monolithic `usePlayerActions` hook to further improve separation of concerns.
-   **Architectural Changes**:
    -   The `usePlayerActions` hook was refactored and its responsibilities were split into three new, more focused hooks located in the `hooks/actions/` directory:
        -   `useUpgradeActions.ts`: Manages the logic for buying stat upgrades.
        -   `useEquipmentActions.ts`: Manages equipping and unequipping items.
        -   `useCombatActions.ts`: Manages real-time combat actions, including manual attacks and using special abilities.
    -   The `useGameState` hook was updated to compose these new action hooks directly, making the data flow more explicit and removing the need for the intermediate `usePlayerActions` hook.

---

### **Phase 8: UI Modularization (Splash Screen)**

-   **Goal**: Refactor the monolithic `SplashScreen.tsx` component to improve modularity and separation of concerns.
-   **Architectural Changes**:
    -   The `SplashScreen.tsx` component was refactored to act as a container, managing state and orchestrating child components.
    -   The UI was broken down into several new, single-responsibility components in the `components/screens/splash/` directory:
        -   `SplashHeader.tsx`: Displays the game title and subtitle.
        -   `SplashInfo.tsx`: Contains the "How to Play" and "Superpowers" informational sections.
        -   `CharacterCreator.tsx`: Encapsulates all UI and interactions for hero creation (name, emoji, skin tone).
        -   `StartButton.tsx`: A reusable button component for initiating the game.
    -   This change makes the splash screen's structure cleaner and individual UI parts easier to manage and update.

---

### **Phase 9: UI Modularization (Upgrade Panel)**

-   **Goal**: Decompose the monolithic `UpgradePanel.tsx` component to enhance modularity, making it easier to manage and extend with new features like the Equipment tab.
-   **Architectural Changes**:
    -   **Refactored `UpgradePanel`**: Transformed `UpgradePanel.tsx` into a pure container component. Its sole responsibilities are now managing tab state and rendering the appropriate tab content component.
    -   **Extracted Tab Components**: The rendering logic for each tab was moved into new, dedicated components within the `components/ui/upgrades/` directory:
        -   `CoreUpgradesTab.tsx`
        -   `MultiplierUpgradesTab.tsx`
        -   `SpecialAbilitiesTab.tsx`
    -   **Created Equipment UI Components**: The entire equipment interface was built using a modular approach in the `components/ui/equipment/` directory:
        -   `EquipmentTab.tsx`: The main view for the tab.
        -   `EquippedItemSlot.tsx`: Renders a single equipped item display.
        -   `InventoryItem.tsx`: Renders an item in the inventory list.
-   **Feature Enhancements**:
    -   The `useUnlockManager` hook was updated to track new items, enabling notifications on the Equipment tab.
-   **Bug Fixes**:
    -   Corrected a prop type in `UpgradeButton.tsx` to ensure purchase animations function correctly.

---

### **Phase 10: UI Polish (Splash Screen Guide)**

-   **Goal**: To enhance the "Hero's Guide" screen for a more polished and compelling user experience.
-   **Architectural Changes**:
    -   Streamlined `SplashInfo.tsx` by removing the "Your Superpowers" section and rewriting the lore and instructions to be more engaging and visually appealing with added emojis.
-   **UI/UX Enhancements**:
    -   Added a music toggle icon to the top-right corner of the guide screen for easy access to sound controls.
    -   Enhanced the "Continue" button with a pulsing emoji to draw user attention and guide them to the next step.
    -   Improved layout by ensuring a clear separation between the main content box and the footer credit line, preventing overlap on various screen sizes.

---

### **Phase 11: UI Polish (Special Abilities)**

-   **Goal**: To refine the user experience and visual feedback for the special ability cards.
-   **UI/UX Enhancements**:
    -   **Activation Animation**: Implemented a new, vibrant "glow and pulse" animation that triggers when an ability is successfully used, providing clear and satisfying feedback.
    -   **Cost Display Fix**: Corrected a layout bug where the ability cost could spill out of its container on smaller screens. The cost is now consistently and correctly aligned in the bottom-right of the card.
    -   **State Refinement**: Redesigned the visual states of the ability cards for better clarity:
        -   The **Locked** state is now darker and more distinct.
        -   The **Actionable** (ready-to-use) state now has a subtle pulse effect to draw attention.
        -   The **Disabled** (on cooldown or unaffordable) state now uses a grayscale filter to be more visually apparent.

---

### **Phase 12: UI Modularization (Splash Screen)**

-   **Goal**: Refactor the monolithic `SplashScreen.tsx` component to improve modularity and separation of concerns, making each step of the new player experience a self-contained unit.
-   **Architectural Changes**:
    -   **Refactored `SplashScreen`**: Transformed `SplashScreen.tsx` into a container component. It now manages the multi-step flow (Title -> Lore -> Character Creation) and orchestrates the child components for each step.
    -   **Extracted Step Components**: The rendering logic for each distinct view was moved into new, single-responsibility components within the `components/screens/splash/` directory:
        -   `TitleStep.tsx`: Handles the initial title and "Embark" view.
        -   `LoreStep.tsx`: Presents the "Hero's Guide" and instructions.
        -   `CreationStep.tsx`: Encapsulates the entire character creation UI and logic, including the `CharacterCreator` component.
    -   **Extracted UI Component**: The animated title (`AnimatedSplashTitle`) was extracted from `SplashScreen` into its own reusable component in `components/ui/` to de-clutter the splash screen logic.
    -   This change significantly cleans up the `SplashScreen` component, clarifies the new user flow, and makes each step easier to manage and modify independently.

---

### **Phase 13: Narrative Content Expansion (Events)**

-   **Goal**: Populate the game world with unique, thematic narrative events to complete the Event System feature.
-   **Work Completed**:
    -   **Content Creation**: Wrote and implemented over 50 new realm-specific events, ensuring that each of the 11 realms has a unique set of encounters that reflect its theme. This brings the total number of events in the game to over 65.
    -   **Data Modularization**: The monolithic `data/events.ts` file was broken down into a scalable structure. All event data now lives in separate files per realm within the `data/events/` directory, improving organization and maintainability.
    -   **Chained Events**: Implemented multiple interconnected, two-part event chains using the flag system (e.g., finding a map in one event leads to finding treasure in another). This adds a layer of narrative continuity and rewards specific choices.
    -   **Feature Completion**: This phase marks the completion of the narrative content for the Event System, turning it into a core, fully-realized feature that adds significant variety, replayability, and storytelling to the game.

---

### **Phase 14: UI Polish (Dynamic Backgrounds)**

-   **Goal**: To transform the static emoji background effects into a dynamic, multi-layered, physics-based system to enhance visual appeal and create a sense of depth.
-   **Work Completed**:
    -   **Bell-Curve Sizing**: Reworked the emoji generation logic for the splash and event screens to use a bell-curve distribution for emoji sizes. This increased the variance, with the largest emojis being 10x larger than the smallest, centered around a 2x base size.
    -   **Size-Opacity Linking**: Tied the opacity of each emoji directly to its size, making smaller emojis fainter and larger ones more opaque, creating a depth-of-field effect.
    -   **Inverse Speed-Size Linking**: Implemented a linear distribution where smaller emojis move significantly faster (up to 6x) than larger ones, creating a pronounced parallax effect.
    -   **Opacity Ceiling**: Added a ceiling function to make the largest ~40% of emojis fully opaque, ensuring they have a strong visual presence.
    -   **Iterative Tuning**: Fine-tuned the speed and opacity thresholds based on feedback to achieve the final dynamic and engaging background effect.

---

### **Phase 15: Class System Expansion & Content Proliferation**

-   **Class System Overhaul**: Expanded the class system from 4 to 8 unique classes. This introduced a `base` and `advanced` tier system, where players unlock powerful advanced classes by achieving milestones with the base classes. This change involved a complete rework of all class data, including new stats, upgrades, and special abilities for each.
-   **Content Proliferation**: Significantly increased the amount of in-game content to support the expanded class system, including new events, items, and transformations tailored to the new character archetypes.