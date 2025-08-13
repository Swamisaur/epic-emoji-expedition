/**
 * @file StartButton.tsx
 * @description A simple button component for starting the game from the splash screen.
 */
import React from 'react';

interface StartButtonProps {
    onClick: () => void;
    disabled: boolean;
    text: React.ReactNode;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick, disabled, text }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="font-title w-full max-w-sm mx-auto text-white py-3 px-4 rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-green-400 
                 disabled:cursor-not-allowed disabled:scale-100 disabled:animate-none 
                 bg-gradient-to-r from-green-500 to-green-700 disabled:from-gray-600 disabled:to-gray-800
                 animate-begin-expedition hover:scale-105 text-2xl"
    >
      {text}
    </button>
);

export default StartButton;