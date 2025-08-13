/**
 * @file PrestigeCard.tsx
 * @description A reusable card component for displaying a single prestige option.
 */
import React from 'react';

interface PrestigeCardProps {
    title: string;
    icon: string;
    description: React.ReactNode;
    buttonText: React.ReactNode;
    onSelect: () => void;
    colorScheme: 'green' | 'blue';
    startContentAnimation: boolean;
}

const PrestigeCard: React.FC<PrestigeCardProps> = ({ title, icon, description, buttonText, onSelect, colorScheme, startContentAnimation }) => {
    const colors = {
        green: {
            text: 'text-green-300',
            bg: 'bg-green-600',
            hover: 'hover:bg-green-500',
            ring: 'focus:ring-green-400',
            pulse: 'animate-pulse-border-green',
            border: 'border-yellow-400/80'
        },
        blue: {
            text: 'text-blue-300',
            bg: 'bg-blue-600',
            hover: 'hover:bg-blue-500',
            ring: 'focus:ring-blue-400',
            pulse: '',
            border: 'border-blue-400/50'
        }
    };

    const currentColors = colors[colorScheme];

    return (
        <div className={`liquid-glass-base p-4 rounded-lg flex flex-col justify-between border transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl group ${currentColors.border} ${currentColors.pulse}`}>
            <div className={`transition-opacity duration-500 ${startContentAnimation ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className={`font-title text-2xl ${currentColors.text} mb-2 flex items-center justify-center gap-3`}>
                    {title}
                    <span className="inline-block transition-transform duration-500 ease-out group-hover:rotate-[360deg] group-hover:scale-125">{icon}</span>
                </h2>
                <div className="text-sm">
                    {description}
                </div>
            </div>
            <button
                onClick={onSelect}
                className={`font-title w-full ${currentColors.bg} text-white py-2 px-4 rounded-lg ${currentColors.hover} transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 ${currentColors.ring} text-base mt-4 transition-opacity duration-500 delay-500 ${startContentAnimation ? 'opacity-100' : 'opacity-0'}`}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default PrestigeCard;