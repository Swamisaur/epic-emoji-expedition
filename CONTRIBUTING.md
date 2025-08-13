# Contributing to Epic Emoji Expedition

Thank you for your interest in contributing! Adhering to these guidelines helps maintain code quality, consistency, and readability.

## Coding Guidelines

### 1. File & Directory Structure

The project is organized to separate concerns, making it easier to locate and manage different parts of the application. Please follow the existing structure.

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

### 2. State Management & Data Flow

-   **Single Source of Truth**: The primary game state is managed within the master `useGameState.ts` hook, which composes smaller, specialized hooks.
-   **Props-Down**: State is passed down from `App.tsx` to child components via props.
-   **Logic in Hooks**: All stateful logic is encapsulated in custom hooks. Components should be as presentational as possible.

### 3. Game Data & Balancing

-   **Centralized Constants**: All values related to game balance (e.g., costs, damage, scaling factors) **MUST** be defined in files within the `/data` directory and exported via `constants.ts`. Avoid using "magic numbers" directly in components or hooks.
-   **Modular Data**: All static data templates (items, events, realms) must be defined in their respective files in the `/data` directory.

### 4. React Best Practices

-   **React StrictMode**: Be mindful that `useEffect` can run twice in development. For one-time events (like processing an enemy defeat), use a `useRef` to store a lock or a `Set` of processed IDs to prevent double-execution. This is a critical pattern in this codebase.
-   **Memoization**: Use `useMemo` for expensive derived calculations and `useCallback` for functions passed as props to memoized child components.

## Adding New Events

The event system is the narrative heart of the game. New events are highly encouraged! Please follow these design and technical guidelines.

### Event Design Philosophy

*   **Be Unique & Engaging:** Events should be memorable, often funny, and always present an intriguing hook.
*   **High-Stakes Choices:** Options should feel meaningful, with real rewards or downsides. A choice should never feel pointless.
*   **Create Interconnectivity:** Whenever possible, design events that link to one another. A choice in one event can unlock a unique, follow-up event later in the same run using the flag system.
*   **Incorporate Realm Theming:** Events created for a specific realm **must** feel like they belong there. They should reference the realm's environment, inhabitants, or theme.
*   **Dynamic Choices (Future):** Keep in mind that future development will allow choices to be conditional on player class, upgrade levels, or equipment.

### Technical & Content Guidelines

1.  **File Location**: New events should be added to the appropriate file in `data/events/`.
2.  **Modularization**: To keep files manageable, each event file should not exceed **200-300 lines of code**.
3.  **File Naming**: When a file is full, create a new one using a numbered sequence (e.g., `piratesCove_5.ts`, `common_5.ts`).
4.  **Registration**: After creating a new event file, you **must** import it and add it to the `ALL_EVENTS` array in `data/events.ts`.
5.  **Chained Events**:
    *   To set a flag, use the consequence type `EventConsequenceType.SET_FLAG` and provide a unique `flag` string in the payload.
    *   To make an event require a flag, add the `requiredFlag` property to the `GameEvent` object with the matching string.
