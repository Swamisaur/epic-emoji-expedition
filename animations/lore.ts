
/**
 * @file animations/lore.ts
 * @description Animations specifically for the lore storyboard cinematic.
 */
export const LORE_ANIMATIONS = `
    /* --- Lore Storyboard Animations 3.0 --- */
    @keyframes lore-fade-in-out {
        0%, 100% { opacity: 0; }
        10%, 90% { opacity: 1; }
    }
    .animate-lore-fade-in-out {
        animation: lore-fade-in-out 8s ease-in-out forwards;
    }
    @keyframes lore-fade-in-only {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    .animate-lore-fade-in-only {
        animation: lore-fade-in-only 0.5s ease-in-out forwards;
    }

    @keyframes lore-text-fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .lore-description-text {
        font-size: 1.5rem; /* ~text-2xl */
        line-height: 1.2;
        max-width: 24rem; /* ~max-w-sm */
        margin-left: auto;
        margin-right: auto;
    }
    @keyframes lore-mountain-fade-in {
      from { opacity: 0; transform: translateY(20px) scale(0.9); }
      to { opacity: 0.5; transform: translateY(0) scale(1); }
    }
    
    @keyframes lore-chip-progress {
        from { width: 0%; }
        to { width: 100%; }
    }

    /* Scene 1: Thriving Kingdom */
    @keyframes lore-bg-pan {
        from { background-position: 0% 0%; }
        to { background-position: 100% 100%; }
    }
    @keyframes lore-sun-rise-slow {
        from { opacity: 0; transform: translateY(40px) scale(0.9); }
        to { opacity: 1; transform: translateY(0) scale(1); filter: drop-shadow(0 0 10px #fef08a); }
    }
    @keyframes lore-mountain-drift {
        from { transform: translateX(-5%); }
        to { transform: translateX(5%); }
    }
    @keyframes lore-cloud-drift {
        from { transform: translateX(-10%); }
        to { transform: translateX(10%); }
    }
    @keyframes lore-sun-shine {
        0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 10px #fef08a); }
        50% { transform: scale(1.1) rotate(15deg); filter: drop-shadow(0 0 25px #fef08a); }
    }
    @keyframes lore-flag-wave {
        from { transform: skewX(-5deg); }
        to { transform: skewX(5deg); }
    }
    @keyframes lore-villager-bob {
        from { transform: translateY(0) rotate(-2deg); }
        to { transform: translateY(-2px) rotate(2deg); }
    }
    @keyframes lore-butterfly-flutter {
        0%, 100% { transform: translateY(0px) translateX(0px) rotate(5deg); }
        50% { transform: translateY(-8px) translateX(4px) rotate(-5deg); }
    }
     @keyframes lore-flower-bloom {
        from { transform: scale(0.8); }
        to { transform: scale(1.1); }
    }

    /* Scene 2: The Horde Attacks */
    @keyframes lore-storm-drift {
        from { transform: translateX(5px); }
        to { transform: translateX(-5px); }
    }
    @keyframes lore-sun-hide {
        to { opacity: 0; transform: translateY(30px); }
    }
    @keyframes lore-storm-appear {
        from { opacity: 0; transform: scale(0.5); }
        to { opacity: 1; transform: scale(1); }
    }
    @keyframes lore-monster-enter {
        from { transform: translateX(-150px) scale(0.5); opacity: 0; }
        to { transform: translateX(0) scale(1); opacity: 1; }
    }
    @keyframes lore-fireball {
        0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translate(150px, 20px) scale(1.2); opacity: 0; }
    }
    @keyframes lore-villager-flee {
        to { transform: translateX(200px); opacity: 0; }
    }
    @keyframes lore-castle-shake {
        0%, 100% { transform: translate(0, 0) rotate(0); }
        10%, 30%, 50%, 70%, 90% { transform: translate(-3px, 3px) rotate(-1.5deg); }
        20%, 40%, 60%, 80% { transform: translate(3px, -3px) rotate(1.5deg); }
    }
    @keyframes lore-impact-burst {
        0% { transform: scale(0); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: scale(1.5); opacity: 0; }
    }
     @keyframes lore-diamond-stolen {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-250%, -50%) scale(0.8); opacity: 1; }
    }

    /* Scene 3: A Kingdom Weeps */
    @keyframes lore-diamond-emerge {
      from { opacity: 0; transform: translateY(20px) scale(0.5); }
      to { opacity: 1; transform: translateY(-10px) scale(1); }
    }
    @keyframes lore-monster-flee-with-diamond {
        0% { opacity: 0; transform: translateX(0) scale(0.8); }
        20% { opacity: 1; transform: translateX(0) scale(1); }
        100% { opacity: 0; transform: translateX(150px) scale(0.7); }
    }
    @keyframes lore-weeping-folk-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes lore-weep {
        from { transform: translateY(0px) rotate(-2deg); }
        to { transform: translateY(2px) rotate(2deg); }
    }

    /* Scene 4: Hero's Call */
    @keyframes lore-hero-appear {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
    @keyframes lore-chests-appear {
        from { opacity: 0; transform: translateY(20px) scale(0.8); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes lore-equip-from-bottom {
        from { opacity: 0; transform: translateY(100px) scale(0.5); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes lore-power-flash {
        0%, 100% { transform: scale(0); opacity: 0; }
        50% { transform: scale(2.5); opacity: 1; filter: drop-shadow(0 0 25px white); }
    }

    /* Scene 5: Epic Duel - NEW SEQUENCE */
    @keyframes lore-hero-emerge {
        from { opacity: 0; transform: scale(0.8) translateX(-20px); }
        to { opacity: 1; transform: scale(1) translateX(0); }
    }
    @keyframes lore-weapon-appear {
        from { opacity: 0; transform: scale(0) rotate(-90deg); }
        to { opacity: 1; transform: scale(1) rotate(0deg); }
    }
    @keyframes lore-hero-lunge {
        from { transform: translateX(0); }
        to { transform: translateX(12rem); } /* 12rem = 192px */
    }
    @keyframes lore-baddie-struck-and-die {
        0% { transform: scale(1) rotate(0); filter: grayscale(0) brightness(1); }
        10% { transform: translateX(-20px) rotate(-10deg) scale(1.2); filter: grayscale(0) brightness(2); } /* Harder hit reaction */
        11% { transform: translateX(-20px) rotate(-10deg) scale(1.2); filter: grayscale(1) brightness(0.8); } /* Instant grayscale */
        25% { transform: translateX(80px) translateY(50px) rotate(90deg) scale(1.1); } /* Fly back and down */
        40% { transform: translateX(120px) translateY(20px) rotate(180deg) scale(1.0); } /* Bounce up */
        100% { transform: translateX(250px) translateY(200px) rotate(720deg) scale(0); opacity: 0; filter: grayscale(1) brightness(0); }
    }
    @keyframes lore-slash-effect {
        0% { transform: scale(0) rotate(-45deg); opacity: 0; }
        50% { transform: scale(2.5) rotate(45deg); opacity: 1; }
        100% { transform: scale(0) rotate(135deg); opacity: 0; }
    }
    @keyframes lore-diamond-drop {
        0% { transform: translateY(0) scale(0); opacity: 0; }
        20% { transform: translateY(0) scale(1.2); opacity: 1; } /* Appear */
        100% { transform: translateY(150px) scale(0.8) rotate(360deg); opacity: 0; } /* Fall down */
    }
    
    /* Scene 6: A New Dawn */
    @keyframes lore-castle-sparkle {
        0%, 100% { filter: drop-shadow(0 0 5px #fff) brightness(1); }
        50% { filter: drop-shadow(0 0 20px #fff) brightness(1.5); }
    }
    @keyframes lore-sun-rise {
        from { transform: translateY(80px); opacity: 0.5; }
        to { transform: translateY(0); opacity: 1; }
    }
    @keyframes lore-confetti-rain {
        0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translateY(350px) rotate(720deg); opacity: 0; }
    }
    @keyframes lore-hero-triumph {
        from { transform: scale(1.2); }
        to { transform: scale(1.25); }
    }
    @keyframes lore-villager-cheer {
        from { transform: translateY(0); }
        to { transform: translateY(-5px); }
    }

    /* --- Guide Animations --- */
    @keyframes clash-effect {
        0%, 100% { transform: scale(0) rotate(-30deg); opacity: 0; }
        50% { transform: scale(1.5) rotate(15deg); opacity: 1; }
        70% { transform: scale(1.2) rotate(0deg); opacity: 1; }
    }
    .animate-clash-effect { animation: clash-effect 1.5s ease-in-out infinite; }

    @keyframes punch-1 {
        0%, 100% { transform: translate(-40px, 10px) rotate(-15deg); opacity: 0; }
        50% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        70% { transform: translate(40px, -10px) rotate(15deg); opacity: 0; }
    }
    .animate-punch-1 { animation: punch-1 1.5s ease-in-out infinite; }

    @keyframes punch-2 {
        0%, 100% { transform: translate(40px, -10px) rotate(15deg); opacity: 0; }
        50% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        70% { transform: translate(-40px, 10px) rotate(-15deg); opacity: 0; }
    }
    .animate-punch-2 { animation: punch-2 1.5s ease-in-out infinite 0.75s; }

    @keyframes guide-burst {
        0% { transform: translate(0,0) scale(0.5); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translate(var(--burst-x), var(--burst-y)) scale(1); opacity: 0; }
    }
    .animate-guide-burst { animation: guide-burst 1.2s ease-out; }

    @keyframes heart-beat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    .animate-heart-beat { animation: heart-beat 1s ease-in-out infinite; }

    @keyframes running {
        0%, 100% { transform: translateX(-30px) rotateY(0deg); }
        49% { transform: translateX(30px) rotateY(0deg); }
        50% { transform: translateX(30px) rotateY(180deg); }
        99% { transform: translateX(-30px) rotateY(180deg); }
    }
    .animate-running { animation: running 1.5s linear infinite; }

    @keyframes arrow-shot {
        0% { transform: translateX(-40px); opacity: 0; }
        30% { opacity: 1; }
        80% { transform: translateX(40px); opacity: 1; }
        100% { transform: translateX(40px); opacity: 0; }
    }
    .animate-arrow-shot { animation: arrow-shot 1.2s ease-in infinite; }

    @keyframes coin-rain {
        0% { transform: translateY(-50px); opacity: 0; }
        20% { opacity: 1; }
        100% { transform: translateY(50px); opacity: 0; }
    }
    .animate-coin-rain { animation: coin-rain 1.2s linear infinite; }
`;