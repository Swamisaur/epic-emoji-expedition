/**
 * @file animations/background.ts
 * @description Background scrolling animations.
 */
export const BACKGROUND_ANIMATIONS = `
    /* --- Backgrounds --- */
    @keyframes scroll-bg-horizontal-animation {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
    }
    
    @keyframes scroll-bg-down-animation {
        from { transform: translateY(-50%); }
        to { transform: translateY(0); }
    }
    .animate-scroll-bg-down { animation: scroll-bg-down-animation 20s linear infinite; }
`;