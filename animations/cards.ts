/**
 * @file animations/cards.ts
 * @description Animations and patterned backgrounds for upgrade and ability cards.
 */
export const UPGRADE_ABILITY_CARDS = `
    /* --- Upgrade & Ability Cards --- */
    @keyframes card-activation {
        0% { transform: rotateY(180deg) scale(1); filter: brightness(1); }
        50% { transform: rotateY(180deg) scale(1.1); filter: brightness(1.5) drop-shadow(0 0 10px #fff); }
        100% { transform: rotateY(180deg) scale(1); filter: brightness(1); }
    }
    .animate-card-activation { animation: card-activation 0.7s ease-out; }

    @keyframes hold-progress {
        from {
            width: 0%;
            height: 0%;
            opacity: 0.7;
        }
        to {
            width: 200%;
            height: 200%;
            opacity: 0;
        }
    }
    .animate-hold-progress { animation: hold-progress 1.5s linear forwards; }
    
    @keyframes pulse-ready-effect {
        0%, 100% { box-shadow: 0 0 8px rgba(253, 224, 71, 0.3); border-color: rgba(250, 204, 21, 0.5); }
        50% { box-shadow: 0 0 16px rgba(253, 224, 71, 0.7); border-color: rgba(253, 224, 71, 1); }
    }
    .animate-pulse-ready { animation: pulse-ready-effect 2s infinite ease-in-out; }

    .upgrade-bg-attackPower {
        background-color: #ef4444; /* red-500 */
        background-image: 
            radial-gradient(circle at 50% 120%, hsla(35, 100%, 80%, 0.35) 0%, transparent 25%),
            radial-gradient(circle at 20% 90%, hsla(35, 100%, 80%, 0.2) 0%, transparent 15%),
            radial-gradient(circle at 80% 85%, hsla(35, 100%, 80%, 0.25) 0%, transparent 20%),
            radial-gradient(circle at 50% 40%, hsla(35, 100%, 80%, 0.1) 0%, transparent 30%);
    }
    .upgrade-bg-maxHealth {
        background-color: #be185d; /* pink-700 */
        background-image: radial-gradient(circle, rgba(255,255,255,0.05) 50%, transparent 50%),
                          linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px),
                          linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px);
        background-size: 30px 30px, 30px 30px, 30px 30px;
        background-position: center center;
    }
    .upgrade-bg-attackSpeed {
        background-color: #3b82f6;
        background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px);
    }
    .upgrade-bg-critChance {
        background-color: #7c3aed;
        background-image: repeating-radial-gradient(circle at center, rgba(255,255,255,0.07) 0, rgba(255,255,255,0.07) 10px, transparent 10px, transparent 20px);
        background-size: 40px 40px;
    }
    .upgrade-bg-critDamage {
        background-color: #d97706;
        background-image: radial-gradient(circle at 0% 0%, rgba(255,255,255,.1) 0, transparent 10%), radial-gradient(circle at 100% 0%, rgba(255,255,255,.1) 0, transparent 10%), radial-gradient(circle at 0% 100%, rgba(255,255,255,.1) 0, transparent 10%), radial-gradient(circle at 100% 100%, rgba(255,255,255,.1) 0, transparent 10%);
        background-size: 40px 40px;
    }
    .upgrade-bg-attackPowerPercent {
        background-color: #16a34a;
        background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 5px, transparent 5px, transparent 15px);
    }
    .upgrade-bg-luck {
        background-color: #059669;
        background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 0);
        background-size: 15px 15px;
    }
    .upgrade-bg-fireball {
        background-color: #9f1239; /* red-900 */
        background-image: 
            radial-gradient(circle at 30% 70%, rgba(255, 224, 138, 0.2) 0%, transparent 20%),
            radial-gradient(circle at 70% 20%, rgba(255, 165, 0, 0.2) 0%, transparent 25%),
            radial-gradient(circle at 50% 50%, rgba(255, 69, 0, 0.15) 10%, transparent 60%);
    }
     .upgrade-bg-poison {
        background-color: #166534; /* green-800 */
        background-image:
            radial-gradient(circle at 50% 50%, rgba(134, 239, 172, 0.15) 0%, transparent 30%);
    }
    .upgrade-bg-accuracy {
        background-color: #1d4ed8; /* blue-700 */
        background-image:
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 30%),
            repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(255,255,255,0.05) 5px, rgba(255,255,255,0.05) 6px),
            repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(255,255,255,0.05) 5px, rgba(255,255,255,0.05) 6px);
    }
    .upgrade-bg-damageReduction {
        background-color: #3f3f46; /* zinc-700 */
        background-image: repeating-linear-gradient(45deg, #52525b 25%, transparent 25%, transparent 75%, #52525b 75%, #52525b), repeating-linear-gradient(45deg, #52525b 25%, transparent 25%, transparent 75%, #52525b 75%, #52525b);
        background-size: 20px 20px;
        background-position: 0 0, 10px 10px;
    }
     .upgrade-bg-heal {
        background-color: #047857; /* emerald-700 */
        background-image:
            radial-gradient(circle at 50% 0, rgba(255,255,255,0.1), transparent 50%),
            radial-gradient(circle at 0 100%, rgba(255,255,255,0.1), transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1), transparent 50%);
        background-size: 40px 40px;
    }
    
    /* --- Class Cards --- */
    .class-bg-ninja {
        background-color: #1f2937; /* gray-800 */
        background-image:
            repeating-linear-gradient(315deg, transparent, transparent 10px, rgba(96, 103, 115, 0.2) 10px, rgba(96, 103, 115, 0.2) 12px),
            repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(96, 103, 115, 0.2) 10px, rgba(96, 103, 115, 0.2) 12px);
    }
    .class-bg-rockstar {
        background-color: #5b21b6; /* violet-800 */
        background-image:
            radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0, transparent 8%),
            radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0, transparent 8%),
            repeating-linear-gradient(315deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px);
    }
    .class-bg-snacker {
        background-color: #f59e0b; /* amber-500 */
        background-image: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 40%);
    }
    .class-bg-spacetank {
        background-color: #4b5563; /* gray-600 */
        background-image:
            linear-gradient(45deg, #6b7280 25%, transparent 25%), 
            linear-gradient(-45deg, #6b7280 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #6b7280 75%),
            linear-gradient(-45deg, transparent 75%, #6b7280 75%);
        background-size: 20px 20px;
    }
    .class-bg-mage {
        background-color: #5b21b6; /* violet-800 */
        background-image: 
            radial-gradient(circle at center, rgba(255,255,255,0.07), transparent 40%), 
            repeating-radial-gradient(circle at center, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px);
    }
    .class-bg-nightfang {
        background-color: #4c0519; /* rose-950 */
        background-image: 
            radial-gradient(circle at 100% 0, rgba(255,255,255,0.1) 0, transparent 15%), 
            radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.1) 0, transparent 30%);
    }
    .class-bg-conartist {
        background-color: #047857; /* emerald-700 */
        background-image:
            radial-gradient(circle at 50% 50%, transparent, rgba(0,0,0,0.3) 100%),
            repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.05) 15px, rgba(255,255,255,0.05) 30px),
            repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(255,255,255,0.05) 15px, rgba(255,255,255,0.05) 30px);
    }
    .class-bg-diva {
        background-color: #be185d; /* pink-700 */
        background-image:
            radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.25) 0%, transparent 20%),
            radial-gradient(circle at 85% 40%, rgba(255, 255, 255, 0.2) 0%, transparent 25%),
            radial-gradient(circle at 40% 90%, rgba(255, 255, 255, 0.15) 0%, transparent 20%);
    }
`