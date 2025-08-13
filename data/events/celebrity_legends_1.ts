/**
 * @file data/events/celebrity_legends_1.ts
 * @description Contains the first batch of celebrity-specific "Encounter with a Legend" events.
 * This modularization is part of the Great Event Expansion to improve maintainability.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const celebrityLegendEvents_1: GameEvent[] = [
    {
        id: 'legend_the_rock_01',
        title: "The Rock's Final Warning",
        description: "The Mad King crumbles. 'You have the people's love... for now,' he rasps. 'But their cheers are a gilded cage. Every champion becomes a monster when there are no more challengers. You'll see.'",
        emojis: ['🤨', '💪', '🪨', '🎤'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I fight FOR the people. Always."',
                emoji: '❤️',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_rock_peoples_champion' },
                    resultText: 'You embrace your role as champion. Your connection to the people makes you stronger and more resilient.',
                    outcomeEmoji: '💪'
                }
            },
            {
                text: '"I\'m not a champion. I\'m The Final Boss."',
                emoji: '😈',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_rock_final_boss' },
                    resultText: 'You embrace the role of the villain. The power you gain is immense, but it comes at the cost of your own vitality.',
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: '"It\'s all about the box office now."',
                emoji: '🤑',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_rock_hollywood_star' },
                    resultText: 'You turn your victory into a blockbuster movie franchise. Your star power attracts unimaginable fortune.',
                    outcomeEmoji: '💰'
                }
            },
            {
                text: '"IT DOESN\'T MATTER WHAT YOU THINK!"',
                emoji: '🎤',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_rock_jabroni' },
                    resultText: 'Your arrogance deafens you to his warning. You lose focus, and your fighting prowess suffers for it.',
                    outcomeEmoji: '😠'
                }
            }
        ]
    },
    {
        id: 'legend_elon_musk_01',
        title: "The Technoking's Timeline",
        description: "The Mad King glitches out of existence. 'You disrupted the market,' his static-filled voice echoes. 'But every innovator becomes the establishment. Your vision will become your prison. The timeline will correct.'",
        emojis: ['🚀', '🤖', '🐶', 'X'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"My goal is to benefit humanity."',
                emoji: '🌍',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_elon_humanity' },
                    resultText: 'Your noble goal empowers all aspects of your being. A balanced, powerful path forward.',
                    outcomeEmoji: '😇'
                }
            },
            {
                text: '"I will occupy Mars... and then, everything."',
                emoji: '🪐',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_elon_occupy' },
                    resultText: 'The ambition to conquer the stars requires immense power, but such focus comes at the cost of your own well-being.',
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: '"The memes... must flow."',
                emoji: '🐶',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_elon_doge' },
                    resultText: 'You become a memelord of cosmic proportions. Your luck is legendary, but your focus on jokes has dulled your edge.',
                    outcomeEmoji: '😂'
                }
            },
            {
                text: '"I AM the timeline."',
                emoji: '⏳',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_elon_timeline' },
                    resultText: 'The universe corrects your hubris. Your movements feel sluggish, as if you are fighting against the flow of time itself.',
                    outcomeEmoji: '😠'
                }
            }
        ]
    },
     {
        id: 'legend_taylor_swift_01',
        title: "The Poet's Victory",
        description: "'You wrote the final chapter,' the King sighs. 'But every star fades. The applause will deafen you. The encores will never be enough. You'll end up writing songs about yourself.'",
        emojis: ['🎤', '✨', '🧣', '💔'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"This is for the fans."',
                emoji: '❤️',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_swift_fans' },
                    resultText: 'Your connection to your fans makes you resilient and fortunate. A true icon.',
                    outcomeEmoji: '🥰'
                }
            },
            {
                text: '"My Reputation is all that matters."',
                emoji: '🐍',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_swift_reputation' },
                    resultText: 'Protecting your reputation is a full-time job. You become fiercely powerful, but the stress takes a toll.',
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: '"I\'ll just write a song about this."',
                emoji: '✍️',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_swift_song' },
                    resultText: 'You channel the experience into a heartbreakingly beautiful ballad. Your art makes you lucky and devastatingly critical.',
                    outcomeEmoji: '💔'
                }
            },
            {
                text: '"Look what you made me do."',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_swift_lwymmd' },
                    resultText: 'You let the drama consume you. Your focus on revenge has made your movements predictable and slow.',
                    outcomeEmoji: '😤'
                }
            }
        ]
    },
    {
        id: 'legend_rihanna_01',
        title: "The Empress's Reign",
        description: "'You shone bright,' the King rasps. 'But the brightest diamonds cast the darkest shadows. The empire you build will demand everything. You will have to work, work, work... forever.'",
        emojis: ['💎', '🎤', '💄', '💰'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
             {
                text: '"I\'ll build a kind empire."',
                emoji: '😇',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_rihanna_empire' },
                    resultText: 'Your empire protects you.',
                    outcomeEmoji: '🏰'
                }
            },
            {
                text: '"Time to get back to work."',
                emoji: '💼',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_rihanna_work' },
                    resultText: 'The grind never stops.',
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: '"Pour it up. The victory party starts now."',
                emoji: '🥂',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_rihanna_party' },
                    resultText: 'You choose to celebrate. Your fabulous parties make you incredibly lucky, but you neglect your training.',
                    outcomeEmoji: '🎉'
                }
            },
            {
                text: '"B*tch Better Have My Money."',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_rihanna_money' },
                    resultText: 'Your focus on money has dulled your edge.',
                    outcomeEmoji: '😠'
                }
            }
        ]
    },
    {
        id: 'legend_messi_01',
        title: "The GOAT's Final Match",
        description: "'A perfect finish,' the King concedes. 'But even the GOAT gets old. The next generation is always hungry. One day, you will be the final boss they must defeat.'",
        emojis: ['🐐', '⚽', '🏆', '🥇'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I play for the love of the game."',
                emoji: '❤️',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_messi_game' },
                    resultText: 'Your pure passion for the sport translates into unmatched speed and precision.',
                    outcomeEmoji: '🎯'
                }
            },
             {
                text: '"I need another trophy."',
                emoji: '🏆',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_messi_trophy' },
                    resultText: 'Your relentless pursuit of glory makes you lucky and devastatingly critical in the final moments.',
                    outcomeEmoji: '✨'
                }
            },
            {
                text: '"My legacy is eternal."',
                emoji: '👑',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_messi_legacy' },
                    resultText: 'You become a living legend. All your stats are enhanced, but the pressure of godhood takes a toll on your health.',
                    outcomeEmoji: '🐐'
                }
            },
            {
                text: '"I am the system."',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_messi_system' },
                    resultText: 'Your ego makes you a target for lesser players. You are more fragile than before.',
                    outcomeEmoji: '🤕'
                }
            }
        ]
    },
    {
        id: 'legend_oprah_01',
        title: "The Queen's Final Word",
        description: "'You... get a victory!' the King chokes out. 'But your influence is a drug. The power to give... is the power to control. You will become what you once fought against.'",
        emojis: ['🎤', '🐝', '🚗', '📚'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I choose to inspire."',
                emoji: '😇',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_oprah_inspire' },
                    resultText: 'Your choice to lift others up, and are lifted in return.',
                    outcomeEmoji: '💖'
                }
            },
            {
                text: '"YOU GET A BUFF! AND YOU GET A BUFF!"',
                emoji: '🎁',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_oprah_buffs' },
                    resultText: 'Your generosity empowers everyone, including yourself!',
                    outcomeEmoji: '✨'
                }
            },
            {
                text: '"I need a bigger empire."',
                emoji: '🤑',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_oprah_empire' },
                    resultText: 'Managing your empire leaves less time for training.',
                    outcomeEmoji: '💰'
                }
            },
            {
                text: '"I OWN this show."',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_oprah_own' },
                    resultText: 'Your absolute control has made you complacent.',
                    outcomeEmoji: '😤'
                }
            }
        ]
    },
    {
        id: 'legend_srk_01',
        title: "The Baadshah's Bow",
        description: "'A king... indeed,' the King whispers. 'But the Baadshah's reign must end. The love of the crowd is fickle. One flop, and you are forgotten.'",
        emojis: ['👑', '🕺', '🎬', '❤️'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I do it for love."',
                emoji: '❤️',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_srk_love' },
                    resultText: 'You are the King of Hearts, resilient and loved.',
                    outcomeEmoji: '🥰'
                }
            },
            {
                text: '"I am the king of the world!"',
                emoji: '👑',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_srk_king' },
                    resultText: 'Heavy is the head that wears the crown.',
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: '"Time for a blockbuster sequel."',
                emoji: '🎬',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_srk_sequel' },
                    resultText: 'The sequel is even more spectacular!',
                    outcomeEmoji: '✨'
                }
            },
            {
                text: '"Don\'t underestimate the power of a common man."',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_srk_common' },
                    resultText: 'Your humility was misinterpreted as weakness.',
                    outcomeEmoji: '😔'
                }
            }
        ]
    },
    {
        id: 'legend_mrbeast_01',
        title: "MrBeast's FINAL CHALLENGE",
        description: "'This... was your most insane video yet,' the King coughs. 'But the views... they will never be enough. The challenges will get bigger. The risks... greater. You will sacrifice everything for content.'",
        emojis: ['🤑', '📹', '🏆', '🔥'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"This is for my subscribers!"',
                emoji: '❤️',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_mrbeast_subs' },
                    resultText: 'Your generosity is rewarded with unbelievable luck and fortune.',
                    outcomeEmoji: '😇'
                }
            },
            {
                text: '"LAST TO LEAVE THIS REALM GETS MY CROWN!"',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_mrbeast_challenge' },
                    resultText: 'The content must be extreme, and so are you!',
                    outcomeEmoji: '💥'
                }
            },
            {
                text: '"I Bought God\'s Powers and Gave Them Away"',
                emoji: '🎁',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_mrbeast_giveaway' },
                    resultText: 'Your ultimate act of philanthropy is rewarded by the cosmic algorithm, granting a balanced boost to all your abilities.',
                    outcomeEmoji: '✨'
                }
            },
            {
                text: '"It\'s just a prank, bro."',
                emoji: '😂',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'legend_mrbeast_prank' },
                    resultText: 'The cosmic entities do not appreciate the prank. The joke has weakened your very essence.',
                    outcomeEmoji: '🤕'
                }
            }
        ]
    }
];