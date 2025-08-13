/**
 * @file CombatLogTicker.tsx
 * @description Renders the scrolling ticker of recent combat log events.
 */
import React from 'react';
import { CombatLogMessage } from '../../types';

interface CombatLogTickerProps {
    messages: CombatLogMessage[];
}

/** Helper to determine the text color for a combat log message based on its type. */
const getLogTextColor = (type: CombatLogMessage['type']) => {
    switch (type) {
        case 'player': return 'text-blue-300';
        case 'crit': return 'text-yellow-500 font-bold';
        case 'enemy': return 'text-red-400';
        case 'reward': return 'text-yellow-400';
        case 'special': return 'text-purple-400 font-bold';
        case 'info': return 'text-purple-300';
        case 'item': return 'text-gray-300';
        default: return 'text-gray-300';
    }
};

const CombatLogTicker: React.FC<CombatLogTickerProps> = ({ messages }) => {
    return (
        <div className="text-left pointer-events-none flex flex-col justify-end" aria-live="polite" aria-atomic="true">
            {messages.map((msg) => (
                <p
                    key={msg.id}
                    className={`text-sm leading-tight animate-log-message ${getLogTextColor(msg.type)}`}
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.9)' }}
                    dangerouslySetInnerHTML={{ __html: msg.message }} // Used for rarity color spans
                >
                </p>
            ))}
        </div>
    );
};

export default CombatLogTicker;