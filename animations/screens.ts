/**
 * @file animations/screens.ts
 * @description Animations for full-screen components (Splash, Game Over, Events, etc.).
 */
export const SCREEN_SPECIFIC_ANIMATIONS = `
    /* --- Screen-Specific Animations --- */

    /* New Splash Screen Background */
    .splash-background-container {
        position: relative;
        background:
            radial-gradient(ellipse at center, transparent 70%, hsla(210, 100%, 95%, 0.15) 100%),
            radial-gradient(ellipse at center, transparent 40%, black 85%),
            radial-gradient(ellipse at center, hsla(0, 0%, 0%, 0.2) 0%, hsla(0, 0%, 0%, 0.8) 55%, hsla(0, 0%, 0%, 1) 100%);
        background-color: black;
        z-index: 0;
    }
    .splash-background-container::before,
    .splash-background-container::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
    }
    .splash-background-container::before {
        background: radial-gradient(ellipse at center, hsl(35, 100%, 65%) 0%, hsl(15, 90%, 55%) 33%, hsl(300, 80%, 40%) 83%, hsl(260, 90%, 15%) 100%);
        animation: splash-fade-out 20s ease-in-out infinite;
        opacity: 0.75;
    }
    .splash-background-container::after {
        background: radial-gradient(ellipse at center, hsl(190, 100%, 75%) 0%, hsl(210, 90%, 50%) 33%, hsl(240, 80%, 30%) 83%, hsl(260, 90%, 10%) 100%);
        opacity: 0;
        animation: splash-fade-in 20s ease-in-out infinite;
    }
    @keyframes splash-fade-in {
      0%, 100% { opacity: 0; }
      50% { opacity: 0.75; }
    }
    @keyframes splash-fade-out {
      0%, 100% { opacity: 0.75; }
      50% { opacity: 0; }
    }

    /* Drifting Emoji Background */
    @keyframes drift-across {
        from {
            transform: translate(0, 0) rotate(var(--start-rot)) scale(var(--start-scale, 1));
        }
        to {
            transform: translate(var(--end-tx), var(--end-ty)) rotate(var(--end-rot)) scale(var(--end-scale, 1));
        }
    }
    .animate-drift-across {
        animation-name: drift-across;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        will-change: transform;
    }
    
    @keyframes wave-flag {
        from { transform: translateY(0) rotate(0deg); }
        to { transform: translateY(-0.2em) rotate(-5deg); }
    }

    @keyframes wave-flag-fast {
        from { transform: translateY(0) rotate(0deg); }
        to { transform: translateY(-0.2em) rotate(-8deg); }
    }

    @keyframes slide-up-splash {
        from { opacity: 0; transform: translateY(30px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-slide-up-splash { animation: slide-up-splash 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

    @keyframes embark-pulse-effect {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 15px 0px rgba(250, 204, 21, 0.5), 0 0 25px 0px rgba(252, 211, 77, 0.3);
        }
        50% {
            transform: scale(1.05);
            box-shadow: 0 0 25px 5px rgba(250, 204, 21, 0.8), 0 0 40px 10px rgba(252, 211, 77, 0.5);
        }
    }

    .animate-embark-pulse {
        animation: embark-pulse-effect 2.5s ease-in-out infinite;
        background: linear-gradient(145deg, #fde047, #f59e0b);
    }
    
    @keyframes begin-expedition-pulse-effect {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 15px 0px rgba(34, 197, 94, 0.5), 0 0 25px 0px rgba(74, 222, 128, 0.3);
        }
        50% {
            transform: scale(1.05);
            box-shadow: 0 0 25px 5px rgba(34, 197, 94, 0.8), 0 0 40px 10px rgba(74, 222, 128, 0.5);
        }
    }

    .animate-begin-expedition {
        animation: begin-expedition-pulse-effect 2.5s ease-in-out infinite;
    }

    @keyframes guide-card-entry {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    .animate-guide-card-entry { animation: guide-card-entry 0.4s ease-out forwards; }
    
    /* Game Over Screen */
    @keyframes pulse-border-green {
        0%, 100% { border-color: rgba(74, 222, 128, 0.5); box-shadow: 0 0 5px rgba(74, 222, 128, 0.2); }
        50% { border-color: rgba(74, 222, 128, 1); box-shadow: 0 0 15px rgba(74, 222, 128, 0.5); }
    }
    .animate-pulse-border-green { animation: pulse-border-green 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    
    @keyframes vanquished-entry-and-defeat {
        /* Phase 1: Pop In */
        0%   { opacity: 0; transform: scale(0.5) translateY(20px); }
        40%  { opacity: 1; transform: scale(1.2) translateY(0); }
        55%  { opacity: 1; transform: scale(1.0) translateY(0); }
        
        /* Phase 2: "Hit" Flash */
        65%  { filter: brightness(2.5) saturate(2); transform: scale(1.2) rotate(-5deg); }
        
        /* Phase 3: Settle as "Defeated" */
        100% { opacity: 0.7; transform: scale(0.9); filter: grayscale(1) brightness(0.8); }
    }
    .animate-vanquished-enemy {
        display: inline-block;
        opacity: 0;
        animation: vanquished-entry-and-defeat 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    @keyframes bag-pulse-effect {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
    }
    .animate-bag-pulse { animation: bag-pulse-effect 0.2s ease-in-out; }

    @keyframes item-pop-common {
        0% { transform: scale(0); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
    }
    .animate-item-pop-common { animation: item-pop-common 0.3s ease-out forwards; }

    @keyframes item-pop-rare {
        0% { transform: scale(0) rotate(-15deg); opacity: 0; }
        70% { transform: scale(1.1) rotate(5deg); filter: drop-shadow(0 0 10px #3b82f6); }
        100% { transform: scale(1) rotate(0); opacity: 1; filter: drop-shadow(0 0 5px #3b82f6); }
    }
    .animate-item-pop-rare { animation: item-pop-rare 0.5s ease-out forwards; }

    @keyframes item-pop-legendary {
        0% { transform: scale(0) rotate(360deg); opacity: 0; filter: brightness(2); }
        60% { transform: scale(1.25) rotate(-10deg); filter: drop-shadow(0 0 20px #a855f7) brightness(1.5); }
        100% { transform: scale(1) rotate(0deg); opacity: 1; filter: drop-shadow(0 0 10px #a855f7) brightness(1); }
    }
    .animate-item-pop-legendary { animation: item-pop-legendary 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    
    @keyframes player-swoop-in {
        0% { opacity: 0; transform: translateY(-80px) translateX(-50%) scale(0.5) rotate(-45deg); }
        60% { opacity: 1; transform: translateY(-25px) translateX(-50%) scale(1.1) rotate(10deg); }
        100% { opacity: 1; transform: translateY(-34px) translateX(-50%) scale(1) rotate(0deg); }
    }

    /* --- Boss Defeat Cinematic --- */
    @keyframes boss-defeat-hero-emerge-keyframe {
        from { opacity: 0; transform: translateX(-100px) translateY(-50%); }
        to { opacity: 1; transform: translateX(0) translateY(-50%); }
    }
    .boss-defeat-hero-emerging {
        animation: boss-defeat-hero-emerge-keyframe 0.5s ease-out forwards 0.5s;
    }

    @keyframes boss-defeat-hero-lunge-keyframe {
        /* 'from' state is inherited from the .boss-defeat-hero-lunging class */
        to { transform: translateX(12rem) translateY(-50%); }
    }
    
    /* This class defines both the final state of the emerge AND the start of the lunge */
    .boss-defeat-hero-lunging {
        opacity: 1;
        transform: translateX(0) translateY(-50%);
        animation: boss-defeat-hero-lunge-keyframe 0.5s ease-in forwards;
    }

    @keyframes boss-defeat-baddie-hit-effect {
        0% { transform: translate(-50%, -50%) rotate(0); filter: drop-shadow(0 0 0px white); }
        20% { transform: translate(-50%, -50%) translateX(-15px) rotate(-8deg); filter: drop-shadow(0 0 15px white); }
        40% { transform: translate(-50%, -50%) translateX(15px) rotate(8deg); filter: drop-shadow(0 0 0px white); }
        60% { transform: translate(-50%, -50%) translateX(-10px) rotate(-4deg); }
        80% { transform: translate(-50%, -50%) translateX(10px) rotate(4deg); }
        100% { transform: translate(-50%, -50%) rotate(0); }
    }
    .animate-boss-baddie-hit {
        animation: boss-defeat-baddie-hit-effect 0.4s ease-in-out;
    }
     @keyframes boss-defeat-baddie-die-effect {
        0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0) rotate(-180deg) translateY(-100px); opacity: 0; filter: blur(5px); }
    }
    .animate-boss-vanquish { animation: boss-defeat-baddie-die-effect 0.8s ease-in forwards; }
    @keyframes boss-defeat-impact-flash {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(3); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    }

    @keyframes boss-defeat-trinket-fly {
        from {
            opacity: 1;
            transform: translate(-100px, 0) scale(1.5) rotate(-30deg);
        }
        to {
            opacity: 0;
            transform: translate(150px, 0) scale(0.5) rotate(30deg);
        }
    }

    @keyframes boss-defeat-heal-particle-burst {
        0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
        100% { transform: translate(var(--burst-x), var(--burst-y)) scale(1.5); opacity: 0; }
    }

    @keyframes heal-text-reveal {
      0% {
        transform: scale(0.5);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    .animate-heal-text-reveal {
        animation: heal-text-reveal 0.8s ease-out forwards;
    }

    @keyframes vanquished-text-reveal {
      0% {
        transform: scale(3) translateY(20px);
        opacity: 0;
        text-shadow: 0 0 30px #facc15;
      }
      60% {
        transform: scale(0.9) translateY(0);
        opacity: 1;
        text-shadow: 0 0 10px #facc15, 2px 2px 0 #92400e, 4px 4px 0 #78350f;
      }
      80% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
        opacity: 1;
        text-shadow: 0 0 5px #facc15, 2px 2px 0 #92400e, 4px 4px 0 #78350f;
      }
    }
    .animate-vanquished-text-reveal {
        animation: vanquished-text-reveal 0.8s ease-out forwards;
    }

    /* Event Scene Animations */
    @keyframes realm-glow-border {
        0%, 100% { 
            box-shadow: inset 0 0 8px 2px var(--glow-color);
        }
        50% { 
            box-shadow: inset 0 0 20px 5px var(--glow-color);
        }
    }
    .animate-realm-glow-border {
        animation: realm-glow-border 3s ease-in-out infinite;
    }
    @keyframes event-center-solo-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    @keyframes event-center-duet-bob-1 {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    @keyframes event-center-duet-bob-2 {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(10px); }
    }
    @keyframes event-trio-shake-1 {
        0%, 100% { transform: translate(0, 0) rotate(0); }
        25% { transform: translate(-3px, 2px) rotate(-2deg); }
        50% { transform: translate(2px, -3px) rotate(2deg); }
        75% { transform: translate(-3px, -2px) rotate(-2deg); }
    }
    @keyframes event-trio-shake-2 {
        0%, 100% { transform: translate(0, 0) rotate(0); }
        25% { transform: translate(2px, -3px) rotate(3deg); }
        50% { transform: translate(-3px, 2px) rotate(-3deg); }
        75% { transform: translate(2px, 2px) rotate(3deg); }
    }
    @keyframes event-trio-shake-3 {
        0%, 100% { transform: translate(0, 0) rotate(0); }
        25% { transform: translate(3px, 3px) rotate(-1deg); }
        50% { transform: translate(-2px, -2px) rotate(1deg); }
        75% { transform: translate(3px, -3px) rotate(-1deg); }
    }
    @keyframes event-center-quartet-swirl {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(15deg); }
    }
    @keyframes event-border-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @keyframes event-border-pulse {
        0%, 100% { transform: scale(0.9); }
        50% { transform: scale(1.1); }
    }
    @keyframes event-border-bob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }

    @keyframes hex-border-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    /* Entering Realm Screen */
    @keyframes head-bob { 
        0%, 100% { transform: translate(-50%, -75%) rotate(-3deg); } 
        50% { transform: translate(-50%, -80%) rotate(3deg); } 
    }

    @keyframes realm-minion-slide-in {
        from { transform: scale(0.5); opacity: 0; }
        70% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
    }
    .animate-minion-slide-in { animation: realm-minion-slide-in 0.4s ease-out forwards; }

    @keyframes realm-minion-scare-away {
        0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translate(var(--fly-to-x, 200px), var(--fly-to-y, -100px)) rotate(var(--fly-rot, 90deg)) scale(0); opacity: 0; }
    }
    .animate-minion-scare-away { animation: realm-minion-scare-away 0.3s ease-in forwards; }

    @keyframes realm-boss-stomp {
        0% { transform: translate(-50%, -50%) translateY(-200px) scale(2.5); opacity: 0; }
        60% { transform: translate(-50%, -50%) translateY(10px) scale(0.9); opacity: 1; }
        80% { transform: translate(-50%, -50%) translateY(-10px) scale(1.1); }
        100% { transform: translate(-50%, -50%) translateY(-15px) scale(1); opacity: 1; }
    }
    .animate-boss-stomp { animation: realm-boss-stomp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.3s; }

    @keyframes final-boss-stomp {
        0% { transform: translate(-50%, -50%) translateY(-200px) scale(3) rotate(-15deg); opacity: 0; filter: brightness(3); }
        60% { transform: translate(-50%, -50%) translateY(10px) scale(0.9); opacity: 1; filter: brightness(1); }
        80% { transform: translate(-50%, -50%) translateY(-10px) scale(1.1); }
        100% { transform: translate(-50%, -50%) translateY(-15px) scale(1); opacity: 1; }
    }
    .animate-final-boss-stomp {
        animation: final-boss-stomp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.3s;
    }

    @keyframes realm-nameplate-reveal {
        from { transform: translateY(15px) scale(0.9); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
    }
    .animate-nameplate-reveal { animation: realm-nameplate-reveal 0.5s ease-out forwards; }

    @keyframes screen-shake {
        0%, 100% { transform: translateX(0) rotate(0); }
        10%, 90% { transform: translateX(-3px) rotate(-0.5deg); }
        20%, 80% { transform: translateX(3px) rotate(0.5deg); }
        30%, 70% { transform: translateX(-3px) rotate(0.5deg); }
        40%, 60% { transform: translateX(3px) rotate(-0.5deg); }
        50% { transform: translateX(0) rotate(0); }
    }
    .animate-screen-shake {
        animation: screen-shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
    }
     @keyframes screen-shake-strong {
        0%, 100% { transform: translateX(0) rotate(0); }
        10%, 90% { transform: translateX(-8px) rotate(-1.5deg); }
        20%, 80% { transform: translateX(8px) rotate(1.5deg); }
        30%, 70% { transform: translateX(-8px) rotate(1.5deg); }
        40%, 60% { transform: translateX(8px) rotate(-1.5deg); }
        50% { transform: translateX(0) rotate(0); }
    }
    .animate-screen-shake-strong {
        animation: screen-shake-strong 0.4s cubic-bezier(.36,.07,.19,.97) both;
    }

    /* Event Scene Animations */
    @keyframes event-scene-reveal {
        0% { opacity: 0; transform: scale(0.9) rotate(-3deg); filter: blur(4px); }
        100% { opacity: 1; transform: scale(1) rotate(0deg); filter: blur(0); }
    }
    .animate-event-scene-reveal { animation: event-scene-reveal 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

    @keyframes event-card-fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slide-in-left {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-in-left { animation: slide-in-left 0.5s ease-out forwards; }

    @keyframes slide-in-right {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-in-right { animation: slide-in-right 0.5s ease-out forwards; }

    @keyframes emoji-pop-in {
        0% { transform: scale(0) rotate(-180deg); opacity: 0; }
        80% { transform: scale(1.2) rotate(10deg); }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }

    @keyframes event-result-card-good {
        from { opacity: 0; transform: translateY(20px) scale(0.95); background-color: transparent; border-color: transparent; }
        to { opacity: 1; transform: translateY(0) scale(1); background-color: rgba(16, 185, 129, 0.15); border-color: rgba(52, 211, 153, 0.5); }
    }
    .animate-event-result-card-good { animation: event-result-card-good 0.5s ease-out forwards; }
    
    @keyframes event-result-card-bad {
        0% { opacity: 0; transform: translateX(20px) rotate(3deg); background-color: transparent; border-color: transparent; }
        70% { opacity: 1; transform: translateX(-5px) rotate(-1deg); }
        100% { opacity: 1; transform: translateX(0) rotate(0); background-color: rgba(239, 68, 68, 0.15); border-color: rgba(248, 113, 113, 0.5); }
    }
    .animate-event-result-card-bad { animation: event-result-card-bad 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

    @keyframes event-result-card-info {
        from { opacity: 0; transform: translateY(20px) scale(0.95); background-color: transparent; border-color: transparent; }
        to { opacity: 1; transform: translateY(0) scale(1); background-color: rgba(59, 130, 246, 0.15); border-color: rgba(96, 165, 250, 0.5); }
    }
    .animate-event-result-card-info { animation: event-result-card-info 0.5s ease-out forwards; }
    
    .event-option-bg-1 { background-color: #4f46e5; background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 40px 40px; background-position: 0 0, 20px 20px; }
    .event-option-bg-2 { background-color: #0d9488; background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 10px, transparent 10px, transparent 20px); }
    .event-option-bg-3 { background-color: #ca8a04; background-image: linear-gradient(30deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%, transparent 88%, transparent), linear-gradient(150deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%, transparent 88%, transparent), linear-gradient(30deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%, transparent 88%, transparent), linear-gradient(150deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%, transparent 88%, transparent); background-size: 80px 140px; }
    .event-option-bg-4 { background-color: #6d28d9; background-image: linear-gradient(rgba(255,255,255,.07) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.07) 2px, transparent 2px), linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px); background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px; }
    .event-option-bg-5 { background-color: #db2777; background-image: radial-gradient(circle at 100% 100%, transparent 0, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 22px, transparent 22px, transparent 100%), radial-gradient(circle at 0 0, transparent 0, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 22px, transparent 22px, transparent 100%); background-size: 40px 40px; }

    @keyframes blood-moon-tint-effect {
        0% { background-color: rgba(127, 29, 29, 0); }
        50% { background-color: rgba(127, 29, 29, 0.4); }
        100% { background-color: rgba(127, 29, 29, 0); }
    }
    .animate-blood-moon-tint { animation: blood-moon-tint-effect 8s ease-in-out forwards; }
`;}