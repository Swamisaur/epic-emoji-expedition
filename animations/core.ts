/**
 * @file animations/core.ts
 * @description Core UI and general-purpose animations.
 */
export const CORE_UI_ANIMATIONS = `
    /* --- Core UI & General Purpose --- */
    @keyframes fade-up {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-50px); }
    }
    .animate-fade-up { animation: fade-up 1s ease-out forwards; }

    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
    
    @keyframes fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    .animate-fade-out { animation: fade-out 0.5s ease-out forwards; }

    @keyframes slide-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up { animation: slide-up 0.5s ease-out 0.2s forwards; opacity: 0; }

    @keyframes pulse-dot-effect {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.8; }
    }
    .animate-pulse-dot { animation: pulse-dot-effect 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    
    @keyframes log-message-animation {
        0% { opacity: 0; transform: translateY(10px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
    .animate-log-message { animation: log-message-animation 4s ease-out forwards; }

    @keyframes icon-flash-effect {
        0%, 100% { filter: brightness(1) drop-shadow(0 0 0 transparent); transform: scale(1); }
        50% { filter: brightness(1.5) drop-shadow(0 0 5px #fef08a); transform: scale(1.1); }
    }
    .animate-icon-flash { animation: icon-flash-effect 1s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

    .white-vignette-effect::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 15;
        border-radius: inherit;
        background: radial-gradient(ellipse at center, transparent 55%, rgba(255, 255, 255, 0.35) 100%);
    }

    @keyframes shake-on-hover {
        10%, 90% { transform: translate3d(-1px, 0, 0) rotate(-1deg); }
        20%, 80% { transform: translate3d(2px, 0, 0) rotate(2deg); }
        30%, 50%, 70% { transform: translate3d(-3px, 0, 0) rotate(-3deg); }
        40%, 60% { transform: translate3d(3px, 0, 0) rotate(3deg); }
    }
    .animate-shake-on-hover:hover, .animate-shake-on-hover:focus {
        animation: shake-on-hover 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    @keyframes enemy-name-reveal {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-enemy-name-reveal { animation: enemy-name-reveal 0.8s ease-out forwards; }
`;