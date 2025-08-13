/**
 * @file animations/floatingText.ts
 * @description Animations for floating text, items, and projectiles.
 */
export const FLOATING_TEXT_ANIMATIONS = `
    /* --- Floating Text & Items --- */
    @keyframes coin-drop-effect {
        0% { opacity: 0; transform: translateY(20px) scale(0.5); }
        30% { opacity: 1; transform: translateY(0) scale(1.2); }
        100% { opacity: 0; transform: translateY(-60px) scale(0.8); }
    }
    .animate-coin-drop { animation: coin-drop-effect 1.2s ease-out forwards; }
    
    @keyframes item-drop-effect {
        0% { opacity: 0; transform: translateY(20px) scale(0.5) rotate(-15deg); }
        30% { opacity: 1; transform: translateY(0) scale(1.2) rotate(10deg); }
        100% { opacity: 0; transform: translateY(-80px) scale(0.5) rotate(30deg); }
    }
    .animate-item-drop { animation: item-drop-effect 1.2s ease-out forwards; }
    
    @keyframes emoji-shower-effect {
        0% { opacity: 1; transform: translateY(0) rotate(0deg); }
        100% { opacity: 0; transform: translateY(400px) rotate(360deg); }
    }
    .animate-emoji-shower { animation: emoji-shower-effect 2.5s ease-in forwards; }

    @keyframes burst-out-particle {
        0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
        100% { transform: translate(var(--burst-x), var(--burst-y)) scale(1.2); opacity: 0; }
    }
    .animate-burst-out-particle { animation: burst-out-particle 0.8s ease-out forwards; }

    @keyframes orbital-strike {
        0% { transform: translateY(-100px) scale(0.5); opacity: 0; filter: drop-shadow(0 0 20px white); }
        50% { transform: translateY(0) scale(1.5); opacity: 1; }
        100% { transform: translateY(0) scale(1); opacity: 0; filter: drop-shadow(0 0 0 white); }
    }
    .animate-orbital-strike { animation: orbital-strike 1.5s ease-out forwards; }

    @keyframes singularity {
        0% { transform: scale(3) rotate(180deg); opacity: 0; filter: blur(10px) brightness(3); }
        50% { transform: scale(0.8) rotate(-180deg); opacity: 1; filter: blur(0) brightness(1); }
        100% { transform: scale(1) rotate(0deg); opacity: 0; }
    }
    .animate-singularity { animation: singularity 2s ease-in-out forwards; }

    @keyframes fireball-travel {
        0% { transform: translateX(0) scale(1); opacity: 1; }
        100% { transform: translateX(12rem) scale(1.5); opacity: 0; }
    }
    .animate-fireball { animation: fireball-travel 0.4s ease-in forwards; }

    @keyframes gold-collect-animation {
        0% { transform: translate(var(--start-x), var(--start-y)) scale(1.2); opacity: 1; }
        100% { transform: translate(0, 0) scale(0.3); opacity: 0; }
    }
    .animate-gold-collect { animation: gold-collect-animation 0.8s ease-in forwards; }

    @keyframes player-attack-fly {
        0% { transform: translate(0, 0) scale(0.8); opacity: 1; }
        50% { transform: translate(var(--target-x), var(--target-y)) scale(1.5); opacity: 1; }
        51% { transform: translate(var(--target-x), var(--target-y)) scale(1.5) rotate(-10deg); }
        55% { transform: translate(var(--target-x), var(--target-y)) scale(1.5) rotate(10deg); }
        60% { transform: translate(var(--target-x), var(--target-y)) scale(1.5) rotate(0deg); }
        100% { transform: translate(var(--target-x), var(--target-y)) scale(0.5); opacity: 0; }
    }
    .animate-player-attack { animation: player-attack-fly 0.5s ease-out forwards; }

    @keyframes shuriken-throw {
        0% { transform: translate(0, 0) scale(0.8) rotate(0deg); opacity: 1; }
        100% { transform: translate(var(--target-x), var(--target-y)) scale(1) rotate(720deg); opacity: 0; }
    }
    .animate-shuriken-throw { animation: shuriken-throw 0.4s ease-in forwards; }

    @keyframes dragon-strike-effect {
        0% { transform: translateX(-50px) scale(0.5); opacity: 0; }
        30% { transform: translateX(0) scale(1.5); opacity: 1; filter: drop-shadow(0 0 15px #ef4444); }
        100% { transform: translateX(50vw) scale(2.5); opacity: 0; }
    }
    .animate-dragon-strike { animation: dragon-strike-effect 0.8s cubic-bezier(0.5, 0, 0.9, 0.5) forwards; }
    
    @keyframes starfall-effect {
        0% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        50% { transform: translateY(0) scale(1.5); opacity: 1; }
        100% { transform: translateY(0) scale(1.2); opacity: 0; }
    }
    .animate-starfall { animation: starfall-effect 0.5s ease-out forwards; }
    
    @keyframes tenderize-whack {
        0% { transform: translateY(-100px) rotate(-90deg) scale(1.5); opacity: 0; }
        40% { transform: translateY(-120px) rotate(-20deg) scale(2.5); opacity: 1; }
        100% { transform: translateY(0) rotate(75deg) scale(2.2); opacity: 1; }
    }
    .animate-tenderize-whack { animation: tenderize-whack 0.4s ease-out forwards; }

    @keyframes enemy-impact {
        0% { transform: translate(0, 0) scale(0.8); opacity: 1; }
        50% { transform: translate(var(--target-x), var(--target-y)) scale(1.5); opacity: 1; }
        51% { transform: translate(var(--target-x), var(--target-y)) scale(1.5) rotate(10deg); }
        55% { transform: translate(var(--target-x), var(--target-y)) scale(1.5) rotate(-10deg); }
        60% { transform: translate(var(--target-x), var(--target-y)) scale(1.5) rotate(0deg); }
        100% { transform: translate(var(--target-x), var(--target-y)) scale(0.5); opacity: 0; }
    }
    .animate-enemy-impact { animation: enemy-impact 0.5s ease-out forwards; }

    @keyframes crit-impact-effect {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1.2);
        }
        20% {
            opacity: 1;
            transform: translateY(-15px) scale(1.8) rotate(-10deg);
        }
        40% {
            transform: translateY(-25px) scale(1.6) rotate(10deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-120px) scale(1.4);
        }
    }
    .animate-crit-impact { animation: crit-impact-effect 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

    @keyframes miss-whoosh-effect {
        0% { opacity: 0; transform: translateY(0) translateX(0) scale(0.9); }
        30% { opacity: 1; transform: translateY(-15px) translateX(-10px) scale(1.1); }
        100% { opacity: 0; transform: translateY(-50px) translateX(-30px) scale(0.8); }
    }
    .animate-miss-whoosh { animation: miss-whoosh-effect 0.8s ease-out forwards; }

    @keyframes dot-drip-effect {
        0% { opacity: 1; transform: translateY(0) scale(1.1); }
        100% { opacity: 0; transform: translateY(30px) scale(0.8); }
    }
    .animate-dot-drip { animation: dot-drip-effect 1s ease-in forwards; }

    @keyframes debuff {
        0% { opacity: 0; transform: translateY(10px) scale(0.8); }
        20% { opacity: 1; transform: translateY(-5px) scale(1.1); }
        80% { opacity: 1; transform: translateY(-15px) scale(1); }
        100% { opacity: 0; transform: translateY(-25px) scale(0.9); }
    }
    .animate-debuff { animation: debuff 2s ease-in-out forwards; }

    @keyframes rocket-dash-impact-effect {
        0% { transform: scale(0.5); opacity: 0; filter: drop-shadow(0 0 15px #67e8f9); }
        50% { transform: scale(1.5); opacity: 1; }
        100% { transform: scale(1.2); opacity: 0; }
    }
    .animate-rocket-dash-impact { animation: rocket-dash-impact-effect 0.5s ease-out forwards; }

    /* Mage Skills */
    @keyframes spark-bolt-fly {
        from { transform: translate(0, 0) scale(0.8) rotate(0deg); opacity: 1; }
        to { transform: translate(var(--target-x), var(--target-y)) scale(0.3) rotate(360deg); opacity: 0; }
    }
    .animate-spark-bolt { animation: spark-bolt-fly 0.3s ease-in forwards; }
    
    @keyframes chain-zap-fly {
        0% { transform: translate(0, 0) scale(1.5); opacity: 1; filter: drop-shadow(0 0 10px white); }
        100% { transform: translate(var(--target-x), var(--target-y)) scale(0.5); opacity: 0; }
    }
    .animate-chain-zap { animation: chain-zap-fly 0.2s ease-out forwards; }
    
    @keyframes meteor-fall {
        0% { transform: translate(50px, -50px) scale(0.5) rotate(45deg); opacity: 0; }
        20% { opacity: 1; }
        100% { transform: translate(var(--target-x), var(--target-y)) scale(2.5) rotate(45deg); opacity: 1; }
    }
    .animate-meteor-fall { animation: meteor-fall 0.6s ease-in forwards; }

    @keyframes meteor-impact {
        0% { transform: scale(1); opacity: 1; filter: brightness(2); }
        100% { transform: scale(3); opacity: 0; filter: brightness(1); }
    }
    .animate-meteor-impact { animation: meteor-impact 0.4s ease-out forwards; }

    /* Night Fang Skills */
    @keyframes fang-bite {
        0% { transform: scale(0.8) rotate(-15deg); opacity: 0; }
        50% { transform: scale(1.5) rotate(15deg); opacity: 1; }
        100% { transform: scale(0.8) rotate(-15deg); opacity: 0; }
    }
    .animate-fang-bite { animation: fang-bite 0.4s ease-in-out forwards; }
    
    @keyframes shadow-tendril-lash {
        0% { transform: translate(0, 0) scale(0.5, 0.1); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translate(var(--target-x), var(--target-y)) scale(1, 1); opacity: 0; }
    }
    .animate-shadow-tendril { animation: shadow-tendril-lash 0.5s ease-out forwards; }

    @keyframes blood-moon-rise {
        0% { transform: translateY(50px) scale(0.8); opacity: 0; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
    }
    .animate-blood-moon { animation: blood-moon-rise 1s ease-out forwards; }

    /* Con Artist Skills */
    @keyframes coin-flip-spin {
        0% { transform: scale(0.5) rotateY(0deg); opacity: 0; }
        20% { transform: scale(1.2) rotateY(360deg); opacity: 1; }
        80% { transform: scale(1.2) rotateY(1800deg); opacity: 1; }
        100% { transform: scale(2) rotateY(1800deg); opacity: 0; }
    }
    .animate-coin-flip { animation: coin-flip-spin 1s cubic-bezier(0.5, 0, 0.5, 1) forwards; }

    @keyframes jackpot-slots-appear {
      0% { transform: translateY(-50px) scale(0.5); opacity: 0; }
      20% { transform: translateY(0) scale(1.1); opacity: 1; }
      40% { transform: scale(1); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes jackpot-slots-spin {
      from { background-position-y: 0px; }
      to { background-position-y: -2160px; } /* Adjust based on emoji height and number */
    }
    @keyframes jackpot-slots-win {
      0% { filter: brightness(1) drop-shadow(0 0 5px transparent); transform: scale(1); }
      20%, 80% { filter: brightness(2) drop-shadow(0 0 20px #fef08a); transform: scale(1.2); }
      100% { filter: brightness(1.5) drop-shadow(0 0 10px #facc15); transform: scale(1.1); }
    }
    
    /* Diva Skills */
    @keyframes flash-pose-effect {
        0% { transform: scale(2); opacity: 0; filter: brightness(5) saturate(0); }
        30% { opacity: 1; }
        100% { transform: scale(0.5); opacity: 0; }
    }
    .animate-flash-pose { animation: flash-pose-effect 0.4s ease-out forwards; }
    
    @keyframes siren-song-notes-fly {
        0% { transform: translate(0,0) scale(0.5); opacity: 0; }
        20% { opacity: 1; }
        100% { transform: translate(var(--target-x), var(--target-y)) scale(1.2); opacity: 0; }
    }
    .animate-siren-song-notes { animation: siren-song-notes-fly 1.5s ease-in-out forwards; }
    
    @keyframes siren-song-swirl {
        0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) rotate(360deg) scale(0); opacity: 0; }
    }
`;