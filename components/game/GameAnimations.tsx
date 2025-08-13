/**
 * @file GameAnimations.tsx
 * @description This component injects all dynamic CSS keyframe animations into the document head.
 * It imports animations from the modularized /animations directory.
 */
import React from 'react';
import { ALL_ANIMATIONS } from '../../animations';

const GameAnimations: React.FC = () => (
    <style>{ALL_ANIMATIONS.join('\n')}</style>
);

export default GameAnimations;