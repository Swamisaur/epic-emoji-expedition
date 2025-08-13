/**
 * @file useAudio.ts
 * @description A hook to manage all game audio playback based on game state.
 */
import { useEffect, useRef } from 'react';
import { GameState, PlayerInfo } from '../types';

// Audio file URLs
const SPLASH_MUSIC_URL = "https://res.cloudinary.com/dadxgvzm5/video/upload/v1753659071/track01_splash_pfzesb.mp3";
const BATTLE_MUSIC_URL = "https://res.cloudinary.com/dadxgvzm5/video/upload/v1753659072/track02_battle_teu2b4.mp3";
const EVENT_MUSIC_URL = "https://res.cloudinary.com/dadxgvzm5/video/upload/v1753815756/track03_events_ixe4ht.mp3";
const END_SCREEN_MUSIC_URL = "https://res.cloudinary.com/dadxgvzm5/video/upload/v1753659071/track01_splash_pfzesb.mp3";

interface UseAudioProps {
    gameState: GameState;
    playerInfo: PlayerInfo | null;
    volume: number;
    hasInteracted: boolean;
}

type AudioType = 'splash' | 'battle' | 'event' | 'end';

export const useAudio = ({ gameState, playerInfo, volume, hasInteracted }: UseAudioProps) => {
    // Refs for audio elements, initialized to null
    const audioRefs = {
        splash: useRef<HTMLAudioElement | null>(null),
        battle: useRef<HTMLAudioElement | null>(null),
        event: useRef<HTMLAudioElement | null>(null),
        end: useRef<HTMLAudioElement | null>(null),
    };

    const audioSources: Record<AudioType, string> = {
        splash: SPLASH_MUSIC_URL,
        battle: BATTLE_MUSIC_URL,
        event: EVENT_MUSIC_URL,
        end: END_SCREEN_MUSIC_URL,
    };

    // Lazy-initialization function for audio elements
    const getAudio = (type: AudioType): HTMLAudioElement => {
        const audioRef = audioRefs[type];
        if (!audioRef.current) {
            audioRef.current = new Audio(audioSources[type]);
            audioRef.current.loop = true;
        }
        return audioRef.current;
    };

    // Effect to control audio playback and volume
    useEffect(() => {
        // This is the master volume controller. It runs whenever volume changes.
        Object.values(audioRefs).forEach(ref => {
            if (ref.current) {
                ref.current.volume = volume;
            }
        });

        if (!hasInteracted) return;
        
        const play = (type: AudioType) => {
            const audio = getAudio(type);
            audio.volume = volume; // Set volume just in case it's a new element
            if (audio.paused) {
                audio.play().catch(e => console.warn("Audio playback failed.", e));
            }
        };

        const pause = (type: AudioType) => {
            const audio = audioRefs[type].current;
            if (audio && !audio.paused) {
                audio.pause();
            }
        };

        const stop = (type: AudioType) => {
            const audio = audioRefs[type].current;
            if (audio && !audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }
        };

        const allTypes: AudioType[] = ['splash', 'battle', 'event', 'end'];
        
        // If muted, pause all and do nothing else.
        if (volume === 0) {
            allTypes.forEach(pause);
            return;
        }

        // Determine which track to play based on current game state
        let trackToPlay: AudioType | null = null;
        let trackToPause: AudioType | null = null;
        const tracksToStop: AudioType[] = [];

        if (!playerInfo) {
            trackToPlay = 'splash';
            tracksToStop.push('battle', 'event', 'end');
        } else if (gameState === 'playing' || gameState === 'victoryPaused') {
            trackToPlay = 'battle';
            tracksToStop.push('splash', 'event', 'end');
        } else if (gameState === 'gameOver' || gameState === 'gameWon') {
            trackToPlay = 'end';
            tracksToStop.push('splash', 'battle', 'event');
        } else if (gameState === 'event') {
            trackToPlay = 'event';
            trackToPause = 'battle'; // Pause battle music instead of stopping
            tracksToStop.push('splash', 'end');
        } else if (gameState === 'paused') {
             // On unpause, resume the correct track without stopping others unnecessarily
            const battleAudio = audioRefs.battle.current;
            const eventAudio = audioRefs.event.current;
            const endAudio = audioRefs.end.current;
            const splashAudio = audioRefs.splash.current;
            
            if (battleAudio && !battleAudio.paused) play('battle');
            else if (eventAudio && !eventAudio.paused) play('event');
            else if (endAudio && !endAudio.paused) play('end');
            else if (splashAudio && !splashAudio.paused) play('splash');
        }

        if (trackToPlay) {
            play(trackToPlay);
        }
        if (trackToPause) {
            pause(trackToPause);
        }
        tracksToStop.forEach(stop);

    }, [gameState, playerInfo, hasInteracted, volume]);
};