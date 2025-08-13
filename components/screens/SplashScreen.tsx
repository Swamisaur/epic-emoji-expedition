/**
 * @file SplashScreen.tsx
 * @description The container component for the splash screen. It manages state for
 * character creation and orchestrates its child components through a multi-step process.
 */
import React, { useState, useRef } from 'react';
import { PLAYER_SKIN_TONES, CELEBRITY_CHARACTERS, ALL_CLASSES, ANIMATION_DURATIONS } from '../../constants';
import type { PlayerEmojiBase, PlayerClassId } from '../../types';

// Child Components
import GameAnimations from '../game/GameAnimations';
import FloatingEmojisBackground from './FloatingEmojisBackground';
import TitleStep from './TitleStep';
import LoreStep from './LoreStep';
import CreationStep from './CreationStep';
import ClassSelectionStep from './ClassSelectionStep'; // New component for class selection
import VolumeControl from '../ui/VolumeControl';

interface SplashScreenProps {
  onStart: (info: { name: string, baseEmoji: string, skinTone: string, finalEmoji: string, playerClassId: PlayerClassId }) => void;
  onInteraction: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  isFullscreen: boolean;
  handleToggleFullscreen: () => void;
  unlockedAdvancedClasses: Set<PlayerClassId>;
  newlyUnlockedClass: PlayerClassId | null;
}

interface CreatedCharacter {
    name: string;
    baseEmoji: PlayerEmojiBase;
    skinTone: { name: string; color: string; modifier: string; };
    finalEmoji: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onStart, onInteraction, volume, setVolume, isFullscreen, handleToggleFullscreen, unlockedAdvancedClasses, newlyUnlockedClass }) => {
  const [step, setStep] = useState(1); // 1: Title, 2: Lore, 3: Creation, 4: Class Selection
  const [isExiting, setIsExiting] = useState(false);
  const [createdCharacter, setCreatedCharacter] = useState<CreatedCharacter | null>(null);
  const hasInteractedRef = useRef(false);

  const handleFirstInteraction = () => {
      if (!hasInteractedRef.current) {
          onInteraction();
          hasInteractedRef.current = true;
      }
  };
  
  const handleStartJourney = () => {
      handleFirstInteraction();
      setStep(2);
  };
  
  const handleContinueToCreation = () => {
      setStep(3);
  };

  const handleProceedToClassSelection = (characterInfo: CreatedCharacter) => {
      setCreatedCharacter(characterInfo);
      setStep(4);
  };

  const handleStartGame = (playerClassId: PlayerClassId) => {
    if (createdCharacter) {
      handleFirstInteraction();
      setIsExiting(true);
      setTimeout(() => {
        onStart({ 
            ...createdCharacter,
            skinTone: createdCharacter.skinTone.modifier,
            playerClassId,
        });
      }, ANIMATION_DURATIONS.SCREEN_FADE_OUT); // match animation duration
    }
  };
  
  const renderContent = () => {
      switch(step) {
          case 1:
              return (
                   <TitleStep
                        volume={volume}
                        setVolume={setVolume}
                        onEmbark={handleStartJourney}
                        isFullscreen={isFullscreen}
                        handleToggleFullscreen={handleToggleFullscreen}
                   />
              );
          case 2:
               return (
                  <LoreStep
                        onContinue={handleContinueToCreation}
                  />
              );
          case 3:
              return (
                  <CreationStep
                      onProceed={handleProceedToClassSelection}
                      onInteraction={handleFirstInteraction}
                  />
              );
          case 4:
              return createdCharacter && (
                  <ClassSelectionStep
                      character={createdCharacter}
                      onStartGame={handleStartGame}
                      unlockedAdvancedClasses={unlockedAdvancedClasses}
                      newlyUnlockedClass={newlyUnlockedClass}
                  />
              );
          default:
              return null;
      }
  };

  return (
    <div 
      className={`splash-background-container fixed inset-0 text-gray-200 flex flex-col h-screen overflow-hidden ${isExiting ? 'animate-fade-out' : 'animate-fade-in'}`}
    >
      <FloatingEmojisBackground />
      <GameAnimations />
      
      {(step > 1) && (
        <div className="absolute top-4 left-4 z-30">
            <VolumeControl volume={volume} setVolume={setVolume} layout="icon-only"/>
        </div>
      )}
      
      <main className="flex-grow flex items-center justify-center relative z-10 w-full min-h-0 overflow-y-auto no-scrollbar p-4">
        {renderContent()}
      </main>

      <footer className="flex-shrink-0 flex items-center justify-center z-20 pb-4 px-4">
          <a 
              href="https://www.saurabhswami.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="liquid-glass rounded-lg p-2 inline-flex items-center gap-3 text-lg text-white/90 hover:text-white transition-all duration-200 shine-effect-card transform hover:scale-105"
          >
              <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center shadow-lg">
                <img src="https://res.cloudinary.com/dadxgvzm5/image/upload/v1753704066/Saurabh_Swami_logomark_nyi0wh.png" alt="SaurabhSwami logo" className="w-5 h-5 object-contain" />
              </div>
              <span className="whitespace-nowrap">Made by Saurabh Swami</span>
          </a>
      </footer>
    </div>
  );
};

export default React.memo(SplashScreen);