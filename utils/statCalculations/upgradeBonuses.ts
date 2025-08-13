/**
 * @file upgradeBonuses.ts
 * @description Applies bonuses from purchased upgrades to the player's stats.
 */
import { PlayerStats, Upgrade, UpgradeId } from '../../types';

/**
 * Applies both flat and percentage-based bonuses from the player's upgrades.
 * @param stats - The player's current stats object.
 * @param upgrades - The list of current upgrades with their levels.
 * @returns A new PlayerStats object with upgrade bonuses applied.
 */
export const applyUpgradeBonuses = (stats: PlayerStats, upgrades: Upgrade[]): PlayerStats => {
    const newStats = { ...stats };
    const upgradesMap = new Map(upgrades.map(u => [u.id, u]));
    const getUpgradeLevel = (id: UpgradeId) => upgradesMap.get(id)?.level ?? 1;

    // --- Apply flat bonuses first ---
    // Ninja
    newStats.attackPower += 5 * (getUpgradeLevel(UpgradeId.EdgeUp) - 1);
    newStats.attackSpeed += 0.75 * (getUpgradeLevel(UpgradeId.QuickHands) - 1);
    newStats.maxHealth += 30 * (getUpgradeLevel(UpgradeId.IronLungs) - 1);
    
    // Rockstar
    newStats.attackPower += 8 * (getUpgradeLevel(UpgradeId.PowerChord) - 1);
    newStats.attackSpeed += 0.75 * (getUpgradeLevel(UpgradeId.Encore) - 1);
    newStats.maxHealth += 40 * (getUpgradeLevel(UpgradeId.StageStamina) - 1);
    
    // Snacker
    newStats.maxHealth += 50 * (getUpgradeLevel(UpgradeId.SnackStack) - 1);
    newStats.attackPower += 4 * (getUpgradeLevel(UpgradeId.BulkUp) - 1);
    newStats.attackSpeed += 0.75 * (getUpgradeLevel(UpgradeId.SugarRush) - 1);

    // Space Tank
    newStats.maxHealth += 60 * (getUpgradeLevel(UpgradeId.PlasteelPlate) - 1);
    newStats.attackPower += 6 * (getUpgradeLevel(UpgradeId.RocketPunch) - 1);
    newStats.attackSpeed += 0.75 * (getUpgradeLevel(UpgradeId.ZeroGFlow) - 1);
    
    // Mage
    newStats.attackSpeed += 0.75 * (getUpgradeLevel(UpgradeId.WandSpeed) - 1);
    newStats.maxHealth += 30 * (getUpgradeLevel(UpgradeId.VitalSpark) - 1);
    newStats.attackPower += 6 * (getUpgradeLevel(UpgradeId.EchoBolt) - 1);
    
    // Night Fang
    newStats.attackSpeed += 0.75 * (getUpgradeLevel(UpgradeId.SharpenFang) - 1);
    newStats.maxHealth += 35 * (getUpgradeLevel(UpgradeId.DarkVitality) - 1);
    newStats.attackPower += 8 * (getUpgradeLevel(UpgradeId.NightHunger) - 1);

    // Con Artist
    newStats.attackSpeed += 0.75 * (getUpgradeLevel(UpgradeId.QuickFingers) - 1);
    newStats.maxHealth += 35 * (getUpgradeLevel(UpgradeId.PocketSnacks) - 1);
    newStats.attackPower += 8 * (getUpgradeLevel(UpgradeId.GreasePalm) - 1);

    // Diva
    newStats.attackSpeed += 0.75 * (getUpgradeLevel(UpgradeId.RhythmFlow) - 1);
    newStats.maxHealth += 50 * (getUpgradeLevel(UpgradeId.EncoreHealth) - 1);
    newStats.attackPower += 6 * (getUpgradeLevel(UpgradeId.FanFlair) - 1);


    // --- Apply percentage bonuses on top of the new base values ---
    let attackPowerPercentBonus = 0;
    attackPowerPercentBonus += 0.10 * (getUpgradeLevel(UpgradeId.AssassinsCode) - 1);
    attackPowerPercentBonus += 0.12 * (getUpgradeLevel(UpgradeId.AmpFeedback) - 1);
    attackPowerPercentBonus += 0.15 * (getUpgradeLevel(UpgradeId.Awoooo) - 1);
    newStats.attackPower *= (1 + attackPowerPercentBonus);
    
    // --- Apply flat percentage bonuses ---
    // Crit Chance
    newStats.critChance += 0.02 * (getUpgradeLevel(UpgradeId.KeenEye) - 1);
    newStats.critChance += 0.025 * (getUpgradeLevel(UpgradeId.CrowdSurf) - 1);
    // CalorieConvert is handled in useGameLoop
    newStats.critChance += 0.02 * (getUpgradeLevel(UpgradeId.IonThrusters) - 1);
    newStats.critChance += 0.03 * (getUpgradeLevel(UpgradeId.ArcaneFocus) - 1);
    newStats.critChance += 0.04 * (getUpgradeLevel(UpgradeId.BloodEdge) - 1);
    newStats.critChance += 0.03 * (getUpgradeLevel(UpgradeId.LuckyStrike) - 1);
    newStats.critChance += 0.025 * (getUpgradeLevel(UpgradeId.SpotlightCrit) - 1);

    // Crit Damage
    newStats.critDamage += 0.20 * (getUpgradeLevel(UpgradeId.CloakedBlade) - 1);
    newStats.critDamage += 0.25 * (getUpgradeLevel(UpgradeId.StageFlair) - 1);
    newStats.critDamage += 0.25 * (getUpgradeLevel(UpgradeId.ManaSurge) - 1);
    newStats.critDamage += 0.30 * (getUpgradeLevel(UpgradeId.ClawFury) - 1);
    newStats.critDamage += 0.20 * (getUpgradeLevel(UpgradeId.MarkedCards) - 1);

    // Luck
    newStats.luck += 0.10 * (getUpgradeLevel(UpgradeId.FanFrenzy) - 1);
    newStats.luck += 0.08 * (getUpgradeLevel(UpgradeId.ComfortFood) - 1);
    newStats.luck += 0.10 * (getUpgradeLevel(UpgradeId.StarFortune) - 1);
    newStats.luck += 0.08 * (getUpgradeLevel(UpgradeId.RuneFire) - 1);
    newStats.luck += 0.10 * (getUpgradeLevel(UpgradeId.SpellLuck) - 1);
    newStats.luck += 0.10 * (getUpgradeLevel(UpgradeId.TheMoon) - 1);
    newStats.luck += 0.12 * (getUpgradeLevel(UpgradeId.LoadedDice) - 1);
    newStats.luck += 0.12 * (getUpgradeLevel(UpgradeId.GoldenTongue) - 1);
    newStats.luck += 0.15 * (getUpgradeLevel(UpgradeId.StarPower) - 1);
    newStats.luck += 0.10 * (getUpgradeLevel(UpgradeId.MermaidsGift) - 1);
    newStats.luck += 0.12 * (getUpgradeLevel(UpgradeId.RoyaltyBonus) - 1);

    // Attack Speed (from grind)
    newStats.attackSpeed += 0.75 * (getUpgradeLevel(UpgradeId.Footwork) - 1);
    
    // Damage Reduction
    newStats.damageReduction = (newStats.damageReduction || 0) +
        (0.02 * (getUpgradeLevel(UpgradeId.ThickSkin) - 1)) +
        (0.03 * (getUpgradeLevel(UpgradeId.GForceGrit) - 1)) +
        (0.015 * (getUpgradeLevel(UpgradeId.ArcaneArmor) - 1)) +
        (0.02 * (getUpgradeLevel(UpgradeId.SlickMoves) - 1)) +
        (0.02 * (getUpgradeLevel(UpgradeId.GlamGuard) - 1));
    
    return newStats;
};