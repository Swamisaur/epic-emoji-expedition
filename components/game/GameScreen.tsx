/**
 * @file GameScreen.tsx
 * @description The main visual component for the gameplay. It acts as a container,
 * orchestrating child components like characters, progress bars, and feedback animations.
 */
import React from 'react';
import { Enemy, CombatLogMessage, GameState, RealmTheme, PlayerClassId } from '../../types';
import { ENEMIES_PER_STAGE } from '../../constants';

// Child Components
import PlayerCharacter from './PlayerCharacter';
import EnemyCharacter from './EnemyCharacter';
import StageProgressBar from './StageProgressBar';
import CombatLogTicker from './CombatLogTicker';
import GameAnimations from './GameAnimations';
import AnimatedHeaderTitle from '../ui/AnimatedHeaderTitle';
import VolumeControl from '../ui/VolumeControl';

interface GameScreenProps {
    playerClassId: PlayerClassId;
    playerName: string;
    playerEmoji: string;
    playerTransformAnimation: 'evolve' | 'devolve' | null;
    playerBuffAnimation: string | null;
    enemy: Enemy | null;
    playerHealth: number;
    playerMaxHealth: number;
    playerDamageShield: number;
    hitAnimation: 'player' | 'enemy' | null;
    attackAnimation: string | null;
    isPlayerHealing: boolean;
    isPlayerDying: boolean;
    enemyWillMissCount: number;
    isEnemyFrozen: boolean;
    isEnemyDying: boolean;
    isEnemySpawning: boolean;
    setIsEnemySpawning: (spawning: boolean) => void;
    isEnemyCharging: boolean;
    isEnemyChargingSpecial: boolean;
    isPlayerInFrenzy: boolean;
    isPlayerFeasting: boolean;
    messages: CombatLogMessage[];
    stage: number;
    subStage: number;
    onManualAttack: (position: { x: number; y: number; }) => void;
    showAttackHint: boolean;
    isComboActive: boolean;
    isEnteringRealm: boolean;
    showGlassEffect: boolean;
    // UI Controls
    volume: number;
    setVolume: (volume: number) => void;
    gameState: GameState;
    handleTogglePause: () => void;
    // Realm info for title
    realmName: string;
    realmEmoji: string;
    realmDisplay: string;
    realmTheme: RealmTheme;
    realmThemeColor: string;
    playerSkinToneColor: string;
    coins: number;
    // Refs for animation
    playerEmojiRef: React.RefObject<HTMLDivElement>;
    enemyEmojiRef: React.RefObject<HTMLDivElement>;
}


const GameScreen: React.FC<GameScreenProps> = (props) => {
    const {
        playerClassId,
        playerName,
        playerEmoji,
        playerTransformAnimation,
        playerBuffAnimation,
        enemy,
        playerHealth,
        playerMaxHealth,
        playerDamageShield,
        hitAnimation,
        attackAnimation,
        isPlayerHealing,
        isPlayerDying,
        enemyWillMissCount,
        isEnemyFrozen,
        isEnemyDying,
        isEnemySpawning,
        setIsEnemySpawning,
        isEnemyCharging,
        isEnemyChargingSpecial,
        isPlayerInFrenzy,
        isPlayerFeasting,
        messages,
        stage,
        subStage,
        onManualAttack,
        showAttackHint,
        isEnteringRealm,
        // UI props
        volume,
        setVolume,
        gameState,
        handleTogglePause,
        // Realm info
        realmName,
        realmEmoji,
        realmDisplay,
        realmTheme,
        realmThemeColor,
        playerSkinToneColor,
        coins,
        isComboActive,
        showGlassEffect,
        // Refs
        playerEmojiRef,
        enemyEmojiRef,
    } = props;
    
    const handleEnemyClick = (e: React.MouseEvent) => {
        // Calculate coordinates relative to the viewport, since the floating text container is full-screen.
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        onManualAttack({ x, y });
    };

    const bossEmoji = realmTheme.boss.emoji;

    return (
        <div className={`${showGlassEffect ? 'liquid-glass-base' : 'bg-gray-800/50'} p-2 md:p-4 rounded-lg shadow-lg flex-grow flex flex-col justify-center items-center relative overflow-hidden h-full transition-all duration-300`}>
            <GameAnimations />

            {/* --- Absolutely Positioned UI Overlays --- */}
            
            {/* Top-Left: Title & Controls */}
            <div className="absolute top-2 left-2 z-20 flex flex-col gap-2 items-start">
                <div className="sm:hidden -mb-2">
                    <AnimatedHeaderTitle />
                </div>
                {/* Desktop title now comes before buttons in the flex order */}
                <div className="hidden sm:block">
                    <AnimatedHeaderTitle />
                </div>
                <div className="flex flex-col gap-2">
                    <button 
                        onClick={handleTogglePause}
                        className="text-xl p-2 rounded-full bg-gray-900/50 hover:bg-gray-700/70 transition-colors"
                        aria-label={gameState === 'paused' ? 'Resume' : 'Pause'}
                    >
                        {gameState === 'paused' ? '▶️' : '⏸️'}
                    </button>
                    <VolumeControl volume={volume} setVolume={setVolume} layout="icon-only" />
                </div>
            </div>

            {/* Top-Center: Realm Info */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
                <div className="inline-flex flex-col items-center text-center">
                    {/* Row 1: Title */}
                    <div className="flex items-center justify-center gap-1.5">
                        <span className="font-bold text-xl" style={{ color: realmThemeColor, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            {realmEmoji}
                        </span>
                        <h2 className="font-title" style={{ color: realmThemeColor, textShadow: '1px 1px 2px rgba(0,0,0,0.5)', fontSize: '11px' }}>
                            {realmName}
                        </h2>
                         <span className="font-bold text-xl" style={{ color: realmThemeColor, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            {realmEmoji}
                        </span>
                    </div>

                    {/* Row 2: Progress bar and Stage display */}
                    <div className="flex justify-between items-center w-full mt-1">
                        <div className="flex items-center gap-1.5">
                            <StageProgressBar
                                stage={stage}
                                subStage={subStage}
                                realmThemeColor={realmThemeColor}
                                playerSkinToneColor={playerSkinToneColor}
                            />
                            <span className="font-bold text-xl" style={{ color: realmThemeColor, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                                {bossEmoji}
                            </span>
                        </div>
                        <span className="font-title text-sm" style={{ color: realmThemeColor, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            {realmDisplay}
                        </span>
                    </div>
                </div>
            </div>


            {/* Top-Right: Logo/Credit */}
            <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20 flex flex-col items-end text-right">
                <a href="https://www.saurabhswami.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-200">
                    <div className="hidden md:inline">Made by SaurabhSwami</div>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shadow-lg">
                        <img src="https://res.cloudinary.com/dadxgvzm5/image/upload/v1753704066/Saurabh_Swami_logomark_nyi0wh.png" alt="SaurabhSwami logo" className="w-5 h-5 object-contain" />
                    </div>
                </a>
            </div>

            {/* --- Main Content Area (this is now centered vertically) --- */}
            <div className="flex flex-col justify-center items-center w-full">
                {/* Combat Arena */}
                <div className="w-full flex justify-around items-center relative h-40 md:h-48">
                    <PlayerCharacter 
                        playerClassId={playerClassId}
                        playerName={playerName}
                        playerEmoji={playerEmoji}
                        playerHealth={playerHealth}
                        playerMaxHealth={playerMaxHealth}
                        damageShield={playerDamageShield}
                        hitAnimation={hitAnimation === 'player'}
                        attackAnimation={attackAnimation}
                        isPlayerHealing={isPlayerHealing}
                        isPlayerDying={isPlayerDying}
                        isPlayerInFrenzy={isPlayerInFrenzy}
                        isPlayerFeasting={isPlayerFeasting}
                        enemyWillMissCount={enemyWillMissCount}
                        playerTransformAnimation={playerTransformAnimation}
                        playerBuffAnimation={playerBuffAnimation}
                        playerEmojiRef={playerEmojiRef}
                    />
                    
                    <EnemyCharacter
                        enemy={enemy}
                        hitAnimation={hitAnimation === 'enemy'}
                        isAttacking={attackAnimation === 'enemy'}
                        isEnemyDying={isEnemyDying}
                        isEnemyFrozen={isEnemyFrozen}
                        isSpawning={isEnemySpawning}
                        setIsSpawning={setIsEnemySpawning}
                        isCharging={isEnemyCharging}
                        isChargingSpecial={isEnemyChargingSpecial}
                        onManualAttack={handleEnemyClick}
                        showAttackHint={showAttackHint}
                        isComboActive={isComboActive}
                        realmTheme={realmTheme}
                        isEnteringRealm={isEnteringRealm}
                        enemyEmojiRef={enemyEmojiRef}
                    />
                </div>
            </div>

             {/* Bottom-Left: Combat Log */}
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 z-10">
                <CombatLogTicker messages={messages} />
            </div>

            {/* Bottom-Right: Coin Counter */}
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-10 px-3 py-1.5 liquid-glass rounded-lg">
                <span className="font-bold text-yellow-400 text-lg whitespace-nowrap">💰 {coins.toLocaleString()}</span>
            </div>
        </div>
    );
};

export default React.memo(GameScreen);