# Technical Architecture

This document explains the technical architecture of Epic Emoji Expedition, including the project's structure, state management, and key architectural patterns.

## 1. Tech Stack
*   **Framework**: React 19
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS (via CDN)

## 2. File & Directory Structure

The project is organized to separate concerns, making it easier to locate and manage different parts of the application.

```
/
├── animations/         # CSS keyframe animation modules
├── components/         # Reusable React components
│   ├── common/         # Generic components (e.g., HealthBar)
│   ├── game/           # Components for the gameplay screen
│   ├── screens/        # Full-screen components (Splash, GameOver, etc.)
│   └── ui/             # UI elements (UpgradePanel, ClassCard, etc.)
├── data/               # Static game data (items, realms, etc.)
│   └── events/         # Modularized narrative event files
├── docs/               # Project documentation
├── hooks/              # Custom React hooks for encapsulating logic
│   └── actions/        # Hooks that handle specific player actions
├── utils/              # Utility and game logic functions
│   └── statCalculations/ # Modularized player stat calculation pipeline
├── App.tsx             # Main application component
├── constants.ts        # Barrel file for all game constants
├── types.ts            # All TypeScript type definitions
└── ...
```

## 3. State Management

The application's state is managed entirely through React hooks, following a centralized but modular pattern.

*   **Master Hook (`useGameState.ts`)**: This is the single source of truth for the application's state. It does not contain logic itself but instead **composes** several smaller, specialized hooks, each responsible for a specific slice of the state.
*   **Specialized State Hooks**:
    *   `usePlayerCoreState.ts`: Manages the player's identity, progression (ascension, lineage), stats, and equipment.
    *   `useRunState.ts`: Manages state for a single game session (game state, stage, coins, events).
    *   `useEnemyState.ts`: Manages the current enemy's state.
    *   `useAbilityState.ts`: Manages ability cooldowns and active effects.
    *   `useUIState.ts`: Manages all UI-related state, such as combat logs, floating text, and animations.
*   **Data Flow**: The `App.tsx` component calls `useGameState` once to get all state and action handlers. It then passes this data down to child components via props. This creates a predictable, unidirectional data flow.

## 4. Key Architectural Lessons

### Handling React StrictMode
A significant early bug involved enemies being skipped due to the "enemy defeated" `useEffect` hook firing twice in development mode.

*   **Problem**: `<React.StrictMode>` intentionally mounts, unmounts, and re-mounts components to find side effects, causing `useEffect` to run twice.
*   **Solution**: A `useRef` (`processedEnemyIds`) was implemented to store a `Set` of IDs for enemies whose defeat has already been processed. Since `useRef` persists across re-renders without triggering them, it acts as a perfect "lock." The `useEffect` now checks this `Set` before executing its logic, ensuring the victory process runs exactly once per enemy. This pattern is crucial for any non-idempotent `useEffect` in the app.

### Technical Debt & Future Improvements
To maintain a high-quality codebase as the project scales, the following area has been identified for potential improvement:

*   **Event System Performance**:
    *   **Current State**: The event trigger logic in `useGameEvents.ts` filters the entire `ALL_EVENTS` array on each trigger. While performant now, this could introduce overhead as more events are added.
    *   **Proposed Improvement**: To optimize, we can pre-process the `ALL_EVENTS` array into a `Map` or `Record` object when the game first loads. This would group events by `eventType` and `realm`, allowing for near-instant O(1) lookups instead of O(n) filtering.
