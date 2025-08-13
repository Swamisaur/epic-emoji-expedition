/**
 * @file animations/combat.ts
 * @description Animations for combat effects and character states.
 */
export const COMBAT_CHARACTER_ANIMATIONS = `
    /* --- Procedural Spawn Animations --- */
    @keyframes spawn-shake {
        0% { transform: scale(0.8) translateX(0); opacity: 0; }
        50% { opacity: 1; }
        60% { transform: scale(1.1) translateX(-15px) rotate(-5deg); }
        70% { transform: scale(1.1) translateX(15px) rotate(5deg); }
        80% { transform: scale(1.1) translateX(-10px) rotate(-3deg); }
        90% { transform: scale(1.1) translateX(10px) rotate(3deg); }
        100% { transform: scale(1) translateX(0) rotate(0); opacity: 1; }
    }
    .animate-spawn-shake { animation: spawn-shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards; }

    @keyframes spawn-stomp {
        0% { transform: scale(1.5) translateY(-50px); opacity: 0; }
        60% { transform: scale(0.9) translateY(5px); opacity: 1; }
        80% { transform: scale(1.05) translateY(-5px); }
        100% { transform: scale(1) translateY(0); opacity: 1; }
    }
    .animate-spawn-stomp { animation: spawn-stomp 0.6s ease-out forwards; }

    @keyframes spawn-shimmer {
        0% { opacity: 0; filter: blur(10px) saturate(0); transform: scale(1.2); }
        50% { opacity: 0.7; filter: blur(2px) saturate(1); }
        100% { opacity: 1; filter: blur(0) saturate(1); transform: scale(1); }
    }
    .animate-spawn-shimmer { animation: spawn-shimmer 0.8s ease-in-out forwards; }

    @keyframes spawn-glitch {
        0% { opacity: 0; transform: scale(1.1) skew(-10deg); }
        20% { opacity: 1; transform: translateX(-5px) skew(10deg); text-shadow: 2px 2px #ff00ff, -2px -2px #00ffff; }
        40% { transform: translateX(5px) skew(-10deg); text-shadow: -2px 2px #ff00ff, 2px -2px #00ffff; }
        60% { transform: translateX(-3px) skew(5deg); text-shadow: 2px -2px #ff00ff, -2px 2px #00ffff; }
        80% { transform: translateX(3px) skew(-5deg); }
        100% { opacity: 1; transform: scale(1) skew(0); }
    }
    .animate-spawn-glitch { animation: spawn-glitch 0.7s linear forwards; }
    
    @keyframes spawn-pop {
       from { transform: scale(0); opacity: 0; }
       to { transform: scale(1); opacity: 1; }
    }
    .animate-spawn-pop { animation: spawn-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

    @keyframes spawn-drop {
       0% { transform: translateY(-100px); opacity: 0; }
       70% { transform: translateY(10px); opacity: 1; }
       85% { transform: translateY(-5px); }
       100% { transform: translateY(0); opacity: 1; }
    }
    .animate-spawn-drop { animation: spawn-drop 0.6s ease-out forwards; }

    /* --- Realm-Specific Enemy Appear --- */
    @keyframes persistent-realm-glow {
        0%, 100% { 
            transform: scale(1);
            opacity: 0.5;
        }
        50% { 
            transform: scale(1.1);
            opacity: 0.7;
        }
    }

    @keyframes realm-haze-appear {
      from { opacity: 0; transform: scale(0.8); filter: blur(10px); }
      to { opacity: 0.75; transform: scale(1); filter: blur(0); }
    }

    @keyframes realm-haze-dissipate {
      from { opacity: 0.75; transform: scale(1); filter: blur(0); }
      to { opacity: 0; transform: scale(1.2); filter: blur(10px); }
    }
    
    /* --- Pirate's Cove Specific --- */
    @keyframes realm-wave-slide-in-out {
      0% { transform: translateX(0) scale(0.8); opacity: 0; }
      50% { transform: translateX(var(--slide-to-x)) scale(1); opacity: 0.75; }
      100% { transform: var(--slide-to-x) scale(0.8); opacity: 0; }
    }
    
    @keyframes realm-flotsam-glitter {
        0% { transform: scale(0.8); opacity: 0; }
        50% { transform: scale(1.1) rotate(-10deg); opacity: 0.75; filter: drop-shadow(0 0 5px #fff); }
        100% { transform: scale(0.9) rotate(10deg); opacity: 0; }
    }

    /* --- Whispering Woods Specific --- */
    @keyframes realm-emoji-shake-in {
        0% { transform: scale(0.5) rotate(0deg); opacity: 0; }
        60% { transform: scale(1.1) rotate(-5deg); opacity: 0.75; }
        80% { transform: scale(0.95) rotate(5deg); }
        100% { transform: scale(1) rotate(0deg); opacity: 0.75; }
    }
    
    @keyframes realm-emoji-slide-apart {
        from { transform: translateX(0); opacity: 0.75; }
        to { transform: var(--slide-apart-x); opacity: 0; }
    }

    /* --- Scorched Sands Specific --- */
    @keyframes realm-sandstorm-particle {
        0% {
            opacity: 0;
            transform: translate(var(--start-x), var(--start-y)) scale(0.7) rotate(var(--start-rot));
        }
        50% {
            opacity: 0.75;
            transform: translate(0, 0) scale(1) rotate(360deg);
        }
        60% {
            opacity: 0.75;
            transform: translate(0, 0) scale(1.1) rotate(380deg);
        }
        100% {
            opacity: 0;
            transform: translate(var(--end-x), var(--end-y)) scale(0.5) rotate(720deg);
        }
    }

    /* --- Inferno Peak Specific --- */
    @keyframes realm-magma-crack-glow {
        0% { transform: scale(0); opacity: 0; box-shadow: 0 0 0px #fca5a5; }
        50% { opacity: 0.75; box-shadow: 0 0 20px 8px #fca5a5; }
        100% { transform: scale(1); opacity: 0.75; box-shadow: 0 0 10px 4px #fca5a5; }
    }

    @keyframes realm-lava-bubble {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.75; }
    }

    @keyframes realm-eruption-blast {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.75;
        }
        to {
            transform: translate(var(--end-x), var(--end-y)) scale(1.5);
            opacity: 0;
        }
    }

    /* --- Fallen Citadel Specific --- */
    @keyframes realm-ghostly-swirl-in {
        from {
            transform: translate(var(--start-x), var(--start-y)) rotate(0deg) scale(0.7);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) rotate(360deg) scale(1);
            opacity: 0.75;
        }
    }

    @keyframes realm-spirit-flash {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; filter: brightness(3); }
        50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.75; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; filter: brightness(1); }
    }
    
    /* --- Haunted Catacombs Specific --- */
    @keyframes realm-spectral-crack-appear {
      0% {
        transform: scaleX(0);
        opacity: 0.5;
        box-shadow: 0 0 0px #a78bfa;
      }
      50% {
        opacity: 0.75;
        box-shadow: 0 0 15px 5px #a78bfa;
      }
      100% {
        transform: scaleX(1);
        opacity: 0.75;
        box-shadow: 0 0 10px 3px #a78bfa;
      }
    }

    @keyframes realm-skeletal-emerge {
      from {
        transform: translateY(20px) rotate(-15deg) scale(0.8);
        opacity: 0;
      }
      to {
        transform: translateY(0) rotate(0deg) scale(1);
        opacity: 0.75;
      }
    }

    @keyframes realm-fragments-implode {
      from {
        opacity: 0.75;
        transform: translate(0, 0) rotate(var(--start-rot));
      }
      to {
        opacity: 0;
        transform: translate(var(--end-x), var(--end-y)) scale(0) rotate(360deg);
      }
    }

    /* --- Scrapheap Metropolis Specific --- */
    @keyframes realm-magnet-pulse {
      0%, 100% {
        transform: translate(-50%, -50%) scale(1);
        filter: drop-shadow(0 0 8px #60a5fa);
      }
      50% {
        transform: translate(-50%, -50%) scale(1.3);
        filter: drop-shadow(0 0 25px #60a5fa);
      }
    }

    @keyframes realm-scrap-pull-and-vanish {
      0% {
        transform: translate(var(--start-x), var(--start-y)) scale(0.5) rotate(0deg);
        opacity: 0;
      }
      70% {
        transform: translate(var(--end-x), var(--end-y)) scale(1) rotate(350deg);
        opacity: 0.75;
      }
      100% {
        transform: translate(0, 0) scale(0) rotate(360deg);
        opacity: 0;
      }
    }

    @keyframes realm-magnetic-implosion {
      0% {
        transform: scale(0);
        opacity: 0.75;
        filter: brightness(3);
      }
      50% {
        transform: scale(2);
        opacity: 0.6;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    /* --- Glacial Peak Specific --- */
    @keyframes realm-ice-materialize {
        from { opacity: 0; transform: scale(0.8) rotate(-15deg); filter: blur(5px); }
        to { opacity: 0.75; transform: scale(1) rotate(0deg); filter: blur(0); }
    }
    @keyframes realm-ice-cracks {
        from { box-shadow: 0 0 0px #fff; }
        to { box-shadow: 0 0 25px 10px #fff; }
    }
    @keyframes realm-ice-shatter {
        from { opacity: 0.75; transform: translate(0, 0) scale(1) rotate(0); }
        to { opacity: 0; transform: translate(var(--end-x), var(--end-y)) scale(0.5) rotate(var(--end-rot)); }
    }
    
    /* --- Tangled Jungle Specific --- */
    @keyframes realm-jungle-curtain-fade-in {
        to { opacity: 1; }
    }
    @keyframes realm-jungle-curtain-part {
        from { clip-path: circle(75% at center); }
        to { clip-path: circle(0% at center); }
    }
    @keyframes realm-leaf-burst {
        from {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
        }
        to {
            transform: translate(var(--end-x), var(--end-y)) scale(1) rotate(var(--rot));
            opacity: 0;
        }
    }
    
    /* --- Contaminated Sewers Specific --- */
    @keyframes realm-sludge-ooze-in {
      from {
        transform: translate(var(--start-x), var(--start-y)) scale(0.5);
        opacity: 0;
      }
      to {
        transform: translate(0, 0) scale(1);
        opacity: 0.75;
      }
    }

    @keyframes realm-sludge-bubble-pop {
      0% { transform: scale(0.8); opacity: 0; }
      50% { transform: scale(1.1); opacity: 0.75; }
      100% { transform: scale(0.8); opacity: 0; }
    }
    
    @keyframes realm-particle-fade-out {
        from { opacity: 0.75; transform: scale(1); }
        to { opacity: 0; transform: scale(0.5); }
    }

    /* --- Mad King's Vault Specific --- */
    @keyframes realm-treasure-rain-and-collect {
      0% {
        transform: translate(var(--start-x), var(--start-y)) scale(0.5);
        opacity: 0;
      }
      60% {
        transform: translate(var(--pile-x), var(--pile-y)) scale(1);
        opacity: 0.75;
      }
      100% {
        transform: translate(-50%, -50%) scale(0) rotate(360deg);
        opacity: 0;
      }
    }

    @keyframes realm-treasure-flash {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0.75;
        filter: brightness(5);
      }
      50% {
        transform: translate(-50%, -50%) scale(2.5);
        opacity: 0.6;
      }
      100% {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
      }
    }

    /* --- Combat & Character States --- */
    @keyframes idle-bob {
        0%, 100% { transform: translateY(0) rotate(-1deg); }
        50% { transform: translateY(-5px) rotate(1deg); }
    }
    .animate-idle-bob { animation: idle-bob 2s ease-in-out infinite; }

    @keyframes boss-idle-bob {
        0%, 100% { transform: translateY(0) rotate(0deg) scale(1.5); }
        50% { transform: translateY(-10px) rotate(0.5deg) scale(1.5); }
    }
    .animate-boss { animation: boss-idle-bob 2.5s ease-in-out infinite; transform-origin: center; }
    
    @keyframes hit-effect {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.9) translateX(-5px); }
    }
    .animate-hit { animation: hit-effect 0.3s ease-in-out; }

     @keyframes boss-hit-effect {
        0%, 100% { transform: scale(1.5); }
        50% { transform: scale(1.4) translateX(-8px); }
    }
    .animate-boss-hit { animation: boss-hit-effect 0.3s ease-in-out; transform-origin: center; }
    
    @keyframes attack-lunge {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(15px) scale(1.1); }
    }
    .animate-attack-lunge { animation: attack-lunge 0.3s ease-in-out; }

    @keyframes rocket-dash-lunge {
        0% { transform: translateX(-10px); }
        30% { transform: translateX(10rem) scale(1.2); }
        100% { transform: translateX(0); }
    }
    .animate-rocket-dash-lunge { animation: rocket-dash-lunge 0.4s ease-out; }
    
    @keyframes enemy-attack-lunge {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-15px) scale(1.1); }
    }
    .animate-enemy-attack-lunge { animation: enemy-attack-lunge 0.3s ease-in-out; }

    @keyframes charge-attack-effect {
        0% { filter: drop-shadow(0 0 0px #fef08a) brightness(1); }
        100% { filter: drop-shadow(0 0 15px #fef08a) brightness(1.5); transform: scale(1.1); }
    }
    .animate-charge-attack { animation: charge-attack-effect 0.3s forwards; }
    .animate-charge-heavy-attack { animation: charge-attack-effect 0.75s forwards; }
    .animate-charge-arcane-attack { animation: charge-arcane-attack-effect 0.3s forwards; }
    .animate-charge-vampiric-attack { animation: charge-vampiric-attack-effect 0.3s forwards; }
    .animate-charge-juggernaut-attack { animation: charge-juggernaut-attack-effect 0.3s forwards; }
    .animate-charge-special-attack { animation: charge-special-attack-effect 1s forwards; }
    
     @keyframes charge-special-attack-effect {
        0% { filter: drop-shadow(0 0 0px #fca5a5) brightness(1); transform: scale(1.1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(-5deg); }
        100% { filter: drop-shadow(0 0 25px #fca5a5) brightness(2) saturate(2); transform: scale(1.3) rotate(5deg); }
    }
    @keyframes charge-arcane-attack-effect {
        0% { filter: drop-shadow(0 0 0px #a78bfa) brightness(1); }
        100% { filter: drop-shadow(0 0 15px #a78bfa) brightness(1.5); transform: scale(1.1); }
    }
    @keyframes charge-vampiric-attack-effect {
        0% { filter: drop-shadow(0 0 0px #f43f5e) brightness(1); }
        100% { filter: drop-shadow(0 0 15px #f43f5e) brightness(1.5); transform: scale(1.1); }
    }
    @keyframes charge-juggernaut-attack-effect {
        0% { filter: drop-shadow(0 0 0px #ffffff) brightness(1); }
        100% { filter: drop-shadow(0 0 15px #ffffff) brightness(1.5); transform: scale(1.1); }
    }

    @keyframes frozen-effect {
        0%, 100% { filter: saturate(0) brightness(1.5) drop-shadow(0 0 5px #67e8f9); }
        50% { filter: saturate(0) brightness(1.2) drop-shadow(0 0 15px #67e8f9); }
    }
    .animate-frozen { animation: frozen-effect 1.5s ease-in-out infinite; }
    
    @keyframes heal-effect {
        0%, 100% { filter: drop-shadow(0 0 0px #4ade80) brightness(1); transform: scale(1); }
        50% { filter: drop-shadow(0 0 15px #4ade80) brightness(1.5); transform: scale(1.1); }
    }
    .animate-heal { animation: heal-effect 0.5s ease-in-out; }
    
    @keyframes frenzy-effect {
        0%, 100% { transform: translateX(0) rotate(0); filter: drop-shadow(0 0 5px #ef4444); }
        25% { transform: translateX(-5px) rotate(-3deg); }
        75% { transform: translateX(5px) rotate(3deg); }
    }
    .animate-frenzy { animation: frenzy-effect 0.2s linear infinite; }
    
    @keyframes evolve-effect {
        0% { transform: scale(1) rotate(0); opacity: 1; filter: brightness(1); }
        50% { transform: scale(1.5) rotate(180deg); opacity: 0; filter: brightness(3) drop-shadow(0 0 10px #fff); }
        100% { transform: scale(1) rotate(360deg); opacity: 1; filter: brightness(1); }
    }
    .animate-evolve { animation: evolve-effect 0.6s ease-in-out; }

    @keyframes devolve-effect {
        0% { transform: scale(1); filter: brightness(1); }
        50% { transform: scale(0.8); filter: brightness(0.5); }
        100% { transform: scale(1); filter: brightness(1); }
    }
    .animate-devolve { animation: devolve-effect 0.6s ease-in-out; }

    @keyframes flash-red {
        0%, 100% { filter: none; }
        50% { filter: drop-shadow(0 0 10px #ef4444) brightness(1.5) saturate(2); }
    }
    .animate-flash-red { animation: flash-red 0.4s ease-in-out; }

    /* Buff Animations */
    @keyframes buff-shield-effect {
        0% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; }
        100% { opacity: 0; transform: scale(1.2); }
    }
    .animate-buff-shield { animation: buff-shield-effect 0.8s ease-out; background: radial-gradient(circle, rgba(96, 165, 250, 0) 40%, rgba(96, 165, 250, 0.5) 70%, rgba(96, 165, 250, 0) 100%); }
    .animate-buff-intellect { animation: buff-shield-effect 0.8s ease-out; background: radial-gradient(circle, rgba(167, 139, 250, 0) 40%, rgba(167, 139, 250, 0.5) 70%, rgba(167, 139, 250, 0) 100%); }
    .animate-buff-poison { animation: buff-shield-effect 0.8s ease-out; background: radial-gradient(circle, rgba(74, 222, 128, 0) 40%, rgba(74, 222, 128, 0.5) 70%, rgba(74, 222, 128, 0) 100%); }
    .animate-buff-force-field { animation: buff-shield-effect 0.8s ease-out; background: radial-gradient(circle, rgba(34, 211, 238, 0) 40%, rgba(34, 211, 238, 0.6) 70%, rgba(34, 211, 238, 0) 100%); }
    
    @keyframes prismatic-ward-effect {
      0% { opacity: 0; transform: scale(0.8) rotate(0deg); }
      20% { opacity: 1; }
      100% { opacity: 1; transform: scale(1.1) rotate(60deg); }
    }
    .animate-buff-prismatic-ward {
      animation: prismatic-ward-effect 8s linear;
      background: conic-gradient(from 0deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7, #ef4444);
      clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
    }

    @keyframes supercharge-effect {
      0%, 100% { opacity: 0.8; transform: scale(1); filter: drop-shadow(0 0 8px #3b82f6); }
      50% { opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 16px #60a5fa); }
    }
    .animate-buff-supercharge {
      animation: supercharge-effect 0.5s ease-in-out infinite alternate;
      background: radial-gradient(circle, rgba(96, 165, 250, 0) 20%, rgba(96, 165, 250, 0.4) 60%, rgba(96, 165, 250, 0) 100%);
    }

    /* Night Fang Buffs */
    @keyframes buff-bloodlust-effect {
      0%, 100% { opacity: 0.8; transform: scale(1); filter: drop-shadow(0 0 6px #ef4444); }
      50% { opacity: 1; transform: scale(1.05); filter: drop-shadow(0 0 12px #f87171); }
    }
    .animate-buff-bloodlust {
        animation: buff-bloodlust-effect 1s ease-in-out infinite alternate;
        background: radial-gradient(circle, rgba(239, 68, 68, 0) 30%, rgba(239, 68, 68, 0.3) 60%, rgba(239, 68, 68, 0) 100%);
    }

    @keyframes hide-for-bat-form-anim { 0%, 100% { opacity: 1; } 5%, 95% { opacity: 0; } }
    .animate-hide-for-bat-form { animation: hide-for-bat-form-anim 10s forwards; }

    @keyframes buff-bat-form-effect {
        0%, 100% { opacity: 0; }
        5% { opacity: 1; }
        95% { opacity: 1; }
    }
    .animate-buff-bat-form::before {
        content: '🦇';
        position: absolute;
        inset: -10%;
        color: #111827;
        font-size: 1.5rem;
        text-shadow: 0 0 5px #4c1d95, 1px 1px 1px #000;
        animation: buff-bat-swarm 10s forwards;
    }
    @keyframes buff-bat-swarm {
        0%, 100% { opacity: 0; }
        5%, 95% { opacity: 1; }
        10% { transform: translate(10px, 5px) rotate(15deg); } 20% { transform: translate(-8px, -12px) rotate(-10deg); }
        30% { transform: translate(5px, 15px) rotate(20deg); } 40% { transform: translate(-12px, -5px) rotate(-15deg); }
        50% { transform: translate(15px, 0px) rotate(10deg); } 60% { transform: translate(-5px, 8px) rotate(-20deg); }
        70% { transform: translate(8px, -10px) rotate(15deg); } 80% { transform: translate(-15px, 12px) rotate(-5deg); }
        90% { transform: translate(10px, -8px) rotate(10deg); }
    }

    @keyframes buff-shadow-rift-effect {
      0%, 100% { filter: drop-shadow(0 0 8px #5b21b6); transform: scale(1.05); opacity: 0.7; }
      50% { filter: drop-shadow(0 0 16px #a78bfa); transform: scale(1); opacity: 0.9; }
    }
    .animate-buff-shadow-rift {
        animation: buff-shadow-rift-effect 0.8s ease-in-out infinite alternate;
        background: radial-gradient(circle, rgba(91, 33, 182, 0) 20%, rgba(91, 33, 182, 0.4) 70%, rgba(91, 33, 182, 0) 100%);
    }
    
    .animate-buff-blood-moon { animation: frenzy-effect 0.15s linear infinite, buff-bloodlust-effect 0.8s ease-in-out infinite alternate; }

    /* Con Artist Buffs */
     @keyframes jackpot-buff-effect {
      0%, 100% { opacity: 0.9; transform: scale(1); filter: drop-shadow(0 0 10px #facc15); }
      50% { opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 25px #fef08a); }
    }
    .animate-buff-jackpot {
        animation: jackpot-buff-effect 0.5s ease-in-out infinite alternate;
        background: radial-gradient(circle, rgba(250, 204, 21, 0) 30%, rgba(250, 204, 21, 0.4) 70%, rgba(250, 204, 21, 0) 100%);
    }

    /* Diva Buffs */
    @keyframes buff-flash-pose-effect {
      0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 8px #fbcfe8); }
      50% { opacity: 1; filter: drop-shadow(0 0 16px #f9a8d4); }
    }
    .animate-buff-flash-pose {
        animation: buff-flash-pose-effect 0.3s ease-in-out infinite alternate;
        background: radial-gradient(circle, rgba(251, 207, 232, 0) 30%, rgba(251, 207, 232, 0.3) 70%, rgba(251, 207, 232, 0) 100%);
    }

    @keyframes player-spin { 0% { transform: rotate(0deg) scale(1); } 100% { transform: rotate(1080deg) scale(0.5); } }
    @keyframes buff-wardrobe-shift-effect {
      0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 8px #db2777); }
      50% { opacity: 1; filter: drop-shadow(0 0 16px #f9a8d4); }
    }
    .animate-buff-wardrobe-shift {
        animation: buff-wardrobe-shift-effect 1s ease-in-out infinite alternate;
        background: radial-gradient(circle, rgba(219, 39, 119, 0) 30%, rgba(219, 39, 119, 0.4) 70%, rgba(219, 39, 119, 0) 100%);
    }
    
    .animate-buff-encore-finale { animation: jackpot-buff-effect 0.4s ease-in-out infinite alternate; }

    @keyframes health-particle-effect {
        0% { opacity: 1; transform: translate(0, -50%) scale(1.1); }
        100% { opacity: 0; transform: translate(25px, -50%) scale(0); }
    }
    .animate-health-particle { animation: health-particle-effect 0.3s ease-out forwards; }
    
    /* --- New Enemy Death Animation --- */
    @keyframes enemy-death-main-v2 {
        0% {
            transform: scale(1);
            filter: grayscale(0);
            opacity: 1;
        }
        15% { /* Quick punchy reaction */
            transform: scale(1.15);
            filter: grayscale(0.5);
            opacity: 1;
        }
        100% {
            transform: scale(0.6);
            filter: grayscale(1);
            opacity: 0;
        }
    }

    @keyframes enemy-death-wipe {
        from {
            clip-path: circle(75% at center);
        }
        to {
            clip-path: circle(0% at center);
        }
    }

    @keyframes enemy-death-particle {
        from {
            transform: translate(0, 0) scale(1);
            opacity: 0.9;
        }
        to {
            /* Use CSS variables to control direction */
            transform: translate(var(--dx), var(--dy)) scale(0);
            opacity: 0;
        }
    }

    /* Player Death */
    @keyframes player-death-main {
        0% { transform: translateY(0) scale(1); filter: grayscale(0) saturate(1); opacity: 1; }
        50% { transform: translateY(20px) scale(0.95); filter: grayscale(0.8) saturate(0.2); opacity: 0.8; }
        100% { transform: translateY(25px) scale(0.9); filter: grayscale(1) saturate(0); opacity: 0; }
    }
    @keyframes player-death-ghost {
        0% { transform: translateY(0) scale(0.8); opacity: 0; }
        20% { opacity: 1; }
        100% { transform: translateY(-80px) scale(1.2); opacity: 0; }
    }

    /* --- Archetype Glows --- */
    @keyframes glow-swift {
        0%, 100% { filter: drop-shadow(0 0 8px #22d3ee); } /* cyan-400 */
        50% { filter: drop-shadow(0 0 16px #67e8f9); } /* cyan-300 */
    }
    .animate-glow-swift { animation: glow-swift 2s ease-in-out infinite; }

    @keyframes glow-heavy {
        0%, 100% { filter: drop-shadow(0 0 8px #9ca3af); } /* gray-400 */
        50% { filter: drop-shadow(0 0 16px #d1d5db); } /* gray-300 */
    }
    .animate-glow-heavy { animation: glow-heavy 2s ease-in-out infinite; }

    @keyframes glow-arcane {
        0%, 100% { filter: drop-shadow(0 0 8px #a855f7); } /* purple-500 */
        50% { filter: drop-shadow(0 0 16px #c084fc); } /* purple-400 */
    }
    .animate-glow-arcane { animation: glow-arcane 2s ease-in-out infinite; }

    @keyframes glow-vampiric {
        0%, 100% { filter: drop-shadow(0 0 8px #dc2626); } /* red-600 */
        50% { filter: drop-shadow(0 0 16px #ef4444); } /* red-500 */
    }
    .animate-glow-vampiric { animation: glow-vampiric 2s ease-in-out infinite; }

    @keyframes glow-juggernaut {
        0%, 100% { filter: drop-shadow(0 0 8px #ea580c); } /* orange-600 */
        50% { filter: drop-shadow(0 0 16px #f97316); } /* orange-500 */
    }
    .animate-glow-juggernaut { animation: glow-juggernaut 2s ease-in-out infinite; }
`;