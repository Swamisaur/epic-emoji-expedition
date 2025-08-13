/**
 * @file useAbilityState.ts
 * @description Manages the state for player abilities, including cooldowns and active effects.
 */
import { useState, useRef, useEffect } from 'react';
import { ActiveSkillEffect, SkillEffects } from '../types';

export const useAbilityState = () => {
    const [abilityCooldowns, setAbilityCooldowns] = useState<Record<string, number>>({});
    const [abilityUses, setAbilityUses] = useState<Record<string, number>>({});
    // Active effects for game logic (e.g., direct impact on calculations)
    const [skillEffects, setSkillEffects] = useState<SkillEffects>({
        // General
        freeze: false,
        frenzy: false,
        luckBuff: 0,
        attackPowerBuff: 0,
        isFeasting: false,
        // Knight
        damageReduction: 0, // number from 0 to 1
        enemyPowerDebuff: 0, // number from 0 to 1
        damageShield: 0, // flat damage absorption
        // Ninja
        poisonAttacks: 0, // number of attacks remaining
        poisonDoT: { damage: 0, duration: 0 },
        venomDoT: { damage: 0, duration: 0 },
        enemyWillMiss: 0, // number of attacks to miss
        guaranteedCrits: 0, // number of guaranteed crits
        // Wizard
        critBuff: null,
        // Rockstar
        burnDoT: { damage: 0, duration: 0 },
        // Snacker
        enemySpeedDebuff: 0, // number from 0 to 1
        // Mage
        reflectDamage: 0, // percentage of damage to reflect
        critDamageBuff: 0,
        // Night Fang
        bleedDoT: { damage: 0, duration: 0 },
        attackSpeedBuff: 0, // multiplier
    });
    
    // Active effects for UI display (buffs/debuffs shown in the stats panel)
    const [activeSkillEffects, setActiveSkillEffects] = useState<ActiveSkillEffect[]>([]);
    
    const effectTimers = useRef<Record<string, number>>({});

    // Cleanup timers on unmount
    useEffect(() => () => Object.values(effectTimers.current).forEach(clearTimeout), []);

    return {
        abilityCooldowns, setAbilityCooldowns,
        abilityUses, setAbilityUses,
        skillEffects, setSkillEffects,
        activeSkillEffects, setActiveSkillEffects,
        effectTimers,
    };
};