/**
 * @file App.tsx
 * @description The main component of the Idle Emoji Saga application.
 * It serves as the root of the component tree and manages the global game state.
 * This component orchestrates the different parts of the game like the game screen, upgrade panels, and game state transitions.
 */

import React, { useCallback } from 'react';

// Core Types
import { PlayerInfo, PlayerClassId } from './types';

// Constants
import { PLAYER_SKIN_TONES, ALL_CLASSES } from './constants';

// Utility Functions
import { getAscensionLetter } from './utils/formatters';

// Custom Hooks
import { useGameState } from './hooks/useGameState';

// Child Components
import GameScreen from './components/game/GameScreen';
import UpgradePanel from './components/ui/UpgradePanel';
import GameOverScreen from './components/screens/GameOverScreen';
import SplashScreen from './components/screens/splash/SplashScreen';
import RealmBackground from './components/ui/RealmBackground';
import PauseMenu from './components/ui/PauseMenu';
import EventScreen from './components/screens/EventScreen';
import FloatingTextComponent from './components/game/FloatingText';
import EnteringRealmScreen from './components/screens/EnteringRealmScreen';
import BossDefeatCinematic from './components/screens/BossDefeatCinematic';

const App: React.FC = () => {
    const {
        // State
        playerInfo,
        isLoading,
        hasWonGame,
        lineageCount,
        ascensionCount,
        unlockedAdvancedClasses,
        newlyUnlockedClass,
        volume,
        setVolume,
        isFullscreen,
        applyCssFullscreen,
        gameState,
        coins,
        stage,
        subStage,
        upgrades,
        playerStats,
        playerHealth,
        playerTransformAnimation,
        playerBuffAnimation,
        isPlayerHealing,
        isPlayerDying,
        inventory,
        equippedItems,
        currentEnemy,
        isEnemyDying,
        isEnemySpawning,
        setIsEnemySpawning,
        isEnemyCharging,
        isEnemyChargingSpecial,
        combatLog,
        floatingTexts,
        setFloatingTexts,
        hitAnimation,
        attackAnimation,
        activeUpgradeTab,
        setActiveUpgradeTab,
        showAttackHint,
        defeatedEnemies,
        coinsSpentThisRun,
        totalGoldEarnedThisRun,
        abilityCooldowns,
        abilityUses,
        skillEffects,
        activeSkillEffects,
        eventEffects,
        activeEvent,
        isComboActive,
        isEnteringRealm,
        setIsEnteringRealm,
        isEventExiting,
        bossDefeatInfo,
        screenShake,
        screenTint,
        transformationHistory,
        // Memoized values
        totalUpgradeLevels,
        coreUpgradeVariety,
        formattedPlayerStats,
        realmTheme,
        realmThemeOrder,
        // Handlers
        handleGameStart,
        handleToggleFullscreen,
        handleEvolve,
        handleRetain,
        handleUserInteraction,
        handleTogglePause,
        handleRestartGame,
        handleChangeClass,
        onBossDefeatCinematicEnd,
        // Unlock manager values
        newUnlockCounts,
        onTabActivated,
        // Player actions
        handleBuyUpgrade,
        handleMaxBuyUpgrade,
        handleEquipItem,
        handleUnequipItem,
        handlePlayerManualAttack,
        handleUseSpecialAbility,
        handleEventChoice,
        handleEventEnd,
        // Element Refs for animations
        playerEmojiRef,
        enemyEmojiRef,
    } = useGameState();


     // --- DERIVED STATE ---
    const backgroundStyle = React.useMemo(() => {
        if (!realmTheme) return {};
        const [h, s, l] = realmTheme.color.split(',').map(c => c.trim().replace('%', ''));
        const glowColor = `hsl(${h}, ${s}%, ${Math.max(10, parseFloat(l) - 30)}%)`;
        const baseBackgroundColor = '#111827'; // Tailwind's gray-900

        return {
            backgroundImage: `radial-gradient(ellipse at bottom, ${glowColor} 0%, ${baseBackgroundColor} 70%)`,
            transition: 'background-image 1.5s ease-in-out',
        };
    }, [realmTheme]);

    const playerSkinToneColor = React.useMemo(() => {
        if (!playerInfo) return PLAYER_SKIN_TONES[0].color;
        return PLAYER_SKIN_TONES.find(t => t.modifier === playerInfo.skinTone)?.color || PLAYER_SKIN_TONES[0].color;
    }, [playerInfo]);

    const isOverlayActive = gameState === 'paused' || (gameState === 'event' && !!activeEvent) || !!bossDefeatInfo || isEnteringRealm;
    const shakeClass = screenShake === 'strong' ? 'animate-screen-shake-strong' : screenShake === 'light' ? 'animate-screen-shake' : '';
    const tintClass = screenTint === 'red' ? 'animate-blood-moon-tint' : '';
    const showGlassEffect = true;
    
    const handleRealmAnimationEnd = useCallback(() => {
        setIsEnteringRealm(false);
    }, [setIsEnteringRealm]);


    // --- RENDER LOGIC ---
    if (isLoading || !currentEnemy || !realmTheme) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                Loading your legend...
            </div>
        );
    }

    if (!playerInfo) {
        return <SplashScreen 
                    onStart={handleGameStart} 
                    onInteraction={handleUserInteraction} 
                    volume={volume} 
                    setVolume={setVolume} 
                    isFullscreen={isFullscreen}
                    handleToggleFullscreen={handleToggleFullscreen}
                    unlockedAdvancedClasses={unlockedAdvancedClasses}
                    newlyUnlockedClass={newlyUnlockedClass}
                />;
    }

    if (gameState === 'gameOver') {
        const initialStats = ALL_CLASSES.find(c => c.id === playerInfo.playerClassId)?.baseStats;
        if (!initialStats) return <div>Error: Class stats not found.</div>;
        
        return (
            <GameOverScreen
                playerInfo={playerInfo}
                stats={formattedPlayerStats}
                initialStats={{...initialStats, evolveBonus: 0}}
                totalUpgradeLevels={totalUpgradeLevels}
                onEvolve={handleEvolve}
                onRetain={handleRetain}
                onRestart={handleRestartGame}
                defeatedEnemies={defeatedEnemies}
                coinsSpent={coinsSpentThisRun}
                totalGoldEarned={totalGoldEarnedThisRun}
                finalCoins={coins}
                upgrades={upgrades}
                inventory={inventory}
                volume={volume}
                setVolume={setVolume}
                stage={stage}
                ascensionCount={ascensionCount}
                realmThemeOrder={realmThemeOrder}
                lineageCount={lineageCount}
                unlockedAdvancedClasses={unlockedAdvancedClasses}
                newlyUnlockedClass={newlyUnlockedClass}
                transformationHistory={transformationHistory}
            />
        );
    }

    const realmName = realmTheme.name;
    const realmEmoji = realmTheme.minions[0].emoji;
    const realmDisplay = `${stage}${getAscensionLetter(ascensionCount)}-${subStage}`;
    const realmThemeColor = `hsl(${realmTheme.color})`;

    return (
        <>
            <div style={backgroundStyle} className={`relative flex flex-col h-screen max-h-screen text-gray-200 overflow-hidden animate-fade-in ${applyCssFullscreen ? 'css-fullscreen' : 'p-2 md:p-4'} ${shakeClass}`}>
                {screenTint && <div className={`absolute inset-0 z-20 pointer-events-none ${tintClass}`} />}
                <RealmBackground themeOverride={realmTheme} />
                
                {/* This wrapper div contains the two main panels and controls their sizing */}
                <div className="flex-grow flex flex-col overflow-hidden gap-2">
                    {/* Top Half (mobile) / Main Area (desktop) */}
                    <main className="flex-grow flex flex-col overflow-hidden relative">
                        <GameScreen 
                            playerClassId={playerInfo.playerClassId}
                            playerName={playerInfo.name}
                            playerEmoji={playerInfo.displayEmoji}
                            playerTransformAnimation={playerTransformAnimation}
                            playerBuffAnimation={playerBuffAnimation}
                            enemy={currentEnemy}
                            playerHealth={playerHealth}
                            playerMaxHealth={playerStats.maxHealth}
                            playerDamageShield={skillEffects.damageShield}
                            hitAnimation={hitAnimation}
                            attackAnimation={attackAnimation}
                            isPlayerHealing={isPlayerHealing}
                            isPlayerDying={isPlayerDying}
                            enemyWillMissCount={skillEffects.enemyWillMiss}
                            isEnemyFrozen={!!skillEffects.freeze}
                            isEnemyDying={isEnemyDying}
                            isEnemySpawning={isEnemySpawning}
                            setIsEnemySpawning={setIsEnemySpawning}
                            isEnemyCharging={isEnemyCharging}
                            isEnemyChargingSpecial={isEnemyChargingSpecial}
                            isPlayerInFrenzy={!!skillEffects.frenzy}
                            isPlayerFeasting={!!skillEffects.isFeasting}
                            messages={combatLog}
                            stage={stage}
                            subStage={subStage}
                            onManualAttack={handlePlayerManualAttack}
                            showAttackHint={showAttackHint}
                            isComboActive={isComboActive}
                            isEnteringRealm={isEnteringRealm}
                            // UI controls
                            volume={volume}
                            setVolume={setVolume}
                            gameState={gameState}
                            handleTogglePause={handleTogglePause}
                            // Realm info for title
                            showGlassEffect={showGlassEffect}
                            realmName={realmName}
                            realmEmoji={realmEmoji}
                            realmDisplay={realmDisplay}
                            realmTheme={realmTheme}
                            realmThemeColor={realmThemeColor}
                            playerSkinToneColor={playerSkinToneColor}
                            coins={coins}
                            // Refs for animation
                            playerEmojiRef={playerEmojiRef}
                            enemyEmojiRef={enemyEmojiRef}
                        />
                    </main>
                    <aside className="h-2/5 min-h-[320px]">
                        <UpgradePanel 
                            playerClassId={playerInfo.playerClassId}
                            playerName={playerInfo.name}
                            formattedPlayerStats={formattedPlayerStats}
                            hasWonGame={hasWonGame}
                            activeEffects={eventEffects}
                            activeSkillEffects={activeSkillEffects}
                            gameState={gameState}
                            coins={coins}
                            upgrades={upgrades}
                            onBuy={handleBuyUpgrade}
                            onMaxBuy={handleMaxBuyUpgrade}
                            stage={stage}
                            cooldowns={abilityCooldowns}
                            onUseSpecialAbility={handleUseSpecialAbility}
                            newUnlockCounts={newUnlockCounts}
                            onTabActivated={onTabActivated}
                            onTabChange={setActiveUpgradeTab}
                            inventory={inventory}
                            equippedItems={equippedItems}
                            onEquip={handleEquipItem}
                            onUnequip={handleUnequipItem}
                            totalUpgradeLevels={totalUpgradeLevels}
                            coreUpgradeVariety={coreUpgradeVariety}
                            abilityUses={abilityUses}
                        />
                    </aside>
                </div>
                {floatingTexts.map(text => (
                    <FloatingTextComponent key={text.id} text={text} onEnd={(id) => setFloatingTexts(texts => texts.filter(t => t.id !== id))} />
                ))}
                
                 {/* Fullscreen Overlay Menus */}
                 {isOverlayActive && <div className="absolute inset-0 bg-black/50 z-30 backdrop-blur-sm" />}

                {gameState === 'paused' && (
                    <PauseMenu 
                        onResume={handleTogglePause} 
                        onRestart={handleRestartGame} 
                        volume={volume} 
                        setVolume={setVolume} 
                        isFullscreen={isFullscreen}
                        handleToggleFullscreen={handleToggleFullscreen}
                    />
                )}
                 {gameState === 'event' && activeEvent && (
                     <EventScreen 
                        playerInfo={playerInfo}
                        event={activeEvent}
                        onChoice={handleEventChoice}
                        onEnd={handleEventEnd}
                        realmTheme={realmTheme}
                        volume={volume}
                        setVolume={setVolume}
                        coins={coins}
                        isExiting={isEventExiting}
                        totalUpgradeLevels={totalUpgradeLevels}
                        upgrades={upgrades}
                     />
                 )}
                 {isEnteringRealm && (
                    <EnteringRealmScreen
                        playerEmoji={playerInfo.displayEmoji}
                        realmTheme={realmTheme}
                        realmThemeOrder={realmThemeOrder}
                        stage={stage}
                        ascensionCount={ascensionCount}
                        onAnimationEnd={handleRealmAnimationEnd}
                    />
                 )}
                 {bossDefeatInfo && (
                     <BossDefeatCinematic 
                        {...bossDefeatInfo}
                        onAnimationEnd={onBossDefeatCinematicEnd}
                     />
                 )}
            </div>
        </>
    );
};

export default App;
