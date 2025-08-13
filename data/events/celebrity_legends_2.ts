/**
 * @file data/events/celebrity_legends_2.ts
 * @description Contains the final batch of celebrity-specific "Encounter with a Legend" events.
 * This modularization completes Task 12 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const celebrityLegendEvents_2: GameEvent[] = [
    {
        id: 'legend_ronaldo_01',
        title: "Encounter with CR7",
        description: "Cristiano Ronaldo strikes a pose. 'A top-level victory,' the King gasps. 'But every goal is forgotten. Every record is broken. You will be remembered... as the final opponent.'",
        emojis: ['⚽', '💪', '🏆', '🗣️'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I am dedicated to my craft."',
                emoji: '💪',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_ronaldo_craft' }, resultText: 'Your unmatched discipline rewards you with superior power and precision.', outcomeEmoji: '🎯' }
            },
            {
                text: '"My brand is everything."',
                emoji: '🤑',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_ronaldo_brand' }, resultText: 'You focus on your image. Your fortune becomes legendary, but your on-field performance suffers.', outcomeEmoji: '💰' }
            },
            {
                text: '"There is only me."',
                emoji: '😈',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_ronaldo_ego' }, resultText: 'Your ego is colossal. You gain immense power, but the team (your health) suffers for it.', outcomeEmoji: '🔥' }
            },
            {
                text: '"SIUUU!"',
                emoji: '🗣️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_ronaldo_siu' }, resultText: 'Your iconic celebration is a powerful taunt, but it makes you a predictable target.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_beyonce_01',
        title: "Encounter with Queen Bey",
        description: "'You are... irreplaceable,' the King whispers. 'But the stage is a lonely place for a queen. The world will watch your every move, waiting for you to fall.'",
        emojis: ['👑', '🐝', '💍', '🎶'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I am a Survivor."',
                emoji: '🙏',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_beyonce_survivor' }, resultText: 'Your resilience is your greatest strength. You become tougher and luckier.', outcomeEmoji: '💪' }
            },
            {
                text: '"I am Sasha Fierce."',
                emoji: '🔥',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_beyonce_fierce' }, resultText: 'You unleash your alter ego. Your power and speed are unmatched, but the performance is draining.', outcomeEmoji: '😈' }
            },
            {
                text: '"All the single ladies!"',
                emoji: '💍',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_beyonce_ladies' }, resultText: 'Your anthem empowers millions. Your fortune and critical impact are legendary.', outcomeEmoji: '✨' }
            },
            {
                text: '"Who runs the world? ME."',
                emoji: '😠',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_beyonce_runs_world' }, resultText: 'Your absolute control alienates your allies. Your critical insight falters.', outcomeEmoji: '😤' }
            }
        ]
    },
    {
        id: 'legend_keanu_01',
        title: "Encounter with The One",
        description: "'Whoa,' the King breathes. 'You truly are The One. But what happens when you are the only one left? The path of the hero is a lonely one, Mr. Anderson.'",
        emojis: ['😎', '❤️', '🏍️', '✨'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"We are all breathtaking."',
                emoji: '❤️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_keanu_breathtaking' }, resultText: 'Your kindness is your greatest power. You become more resilient and your attacks more precise.', outcomeEmoji: '😇' }
            },
            {
                text: '"I know Kung Fu."',
                emoji: '🥋',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_keanu_kungfu' }, resultText: 'You download the combat protocols. Your power and speed are immense, but you lose your human touch.', outcomeEmoji: '💥' }
            },
            {
                text: '"Guns. Lots of guns."',
                emoji: '🔫',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_keanu_guns' }, resultText: 'You become John Wick. Your critical strikes are legendary, but you live on the edge.', outcomeEmoji: '🔥' }
            },
            {
                text: '"Sad Keanu."',
                emoji: '😔',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_keanu_sad' }, resultText: 'The weight of your victories is heavy. The sadness makes you sluggish.', outcomeEmoji: '😭' }
            }
        ]
    },
    {
        id: 'legend_trump_01',
        title: "Encounter with The Don",
        description: "'A tremendous victory,' the King admits. 'The best. But the deals you make to stay on top... they will cost you. Everyone who sits on the throne becomes a swamp creature.'",
        emojis: ['🇺🇸', '🧱', '🤝', '💰'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"We will Make this Realm Great Again."',
                emoji: '🇺🇸',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_trump_maga' }, resultText: 'Your populist appeal is powerful. You become stronger and more resilient.', outcomeEmoji: '💪' }
            },
            {
                text: '"It\'s all about the brand."',
                emoji: '🤑',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_trump_brand' }, resultText: 'You build tremendous towers. Your fortune is huge, but managing it is a distraction.', outcomeEmoji: '💰' }
            },
            {
                text: '"I am a very stable genius."',
                emoji: '🧠',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_trump_genius' }, resultText: 'Your self-belief is absolute. Your power is tremendous, but your recklessness makes you fragile.', outcomeEmoji: '🔥' }
            },
            {
                text: '"WRONG."',
                emoji: '😠',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_trump_wrong' }, resultText: 'You refuse to listen. Your inability to adapt makes your attacks less effective.', outcomeEmoji: '😤' }
            }
        ]
    },
    {
        id: 'legend_putin_01',
        title: "Encounter with the President",
        description: "'A strong victory,' the King states, his form fading. 'But power is a cold bedfellow. The strongman is always alone. Your paranoia will be your undoing.'",
        emojis: ['🇷🇺', '🥋', '🐻', '🗺️'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"For the glory of the Motherland."',
                emoji: '🇷🇺',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_putin_motherland' }, resultText: 'Your patriotic fervor makes you incredibly resilient and powerful.', outcomeEmoji: '💪' }
            },
            {
                text: '"Power is the only reality."',
                emoji: '👑',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_putin_power' }, resultText: 'Your pursuit of absolute power is all-consuming. You become devastatingly strong, but at a cost.', outcomeEmoji: '🔥' }
            },
            {
                text: '"It was a special operation."',
                emoji: '🤫',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_putin_operation' }, resultText: 'Your tactical cunning is unmatched. Your critical strikes and fortune are greatly enhanced.', outcomeEmoji: '🎯' }
            },
            {
                text: '"There are no mistakes."',
                emoji: '😠',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_putin_nomistakes' }, resultText: 'Your refusal to admit fault makes you inflexible. Your attacks become slower.', outcomeEmoji: '😤' }
            }
        ]
    },
    {
        id: 'legend_chan_01',
        title: "Encounter with the Action Legend",
        description: "'A perfect final scene!' the King exclaims. 'But the life of an action hero is hard. Every bone will be broken. Every stunt is a risk. Eventually, you will fall.'",
        emojis: ['🥋', '😂', '🪜', '💪'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I do it for the fans."',
                emoji: '❤️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_chan_fans' }, resultText: 'Your dedication makes you beloved. You become luckier and more resilient.', outcomeEmoji: '🥰' }
            },
            {
                text: '"I do my own stunts."',
                emoji: '💪',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_chan_stunts' }, resultText: 'Your incredible toughness and agility make you a master of combat.', outcomeEmoji: '💥' }
            },
            {
                text: '"I don\'t want any trouble."',
                emoji: '😅',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_chan_notrouble' }, resultText: 'You try to avoid fights. You become faster and luckier, but your offensive power wanes.', outcomeEmoji: '😂' }
            },
            {
                text: '"Who am I?"',
                emoji: '🤔',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_chan_whoami' }, resultText: 'A lifetime of getting hit in the head has left you confused. Your accuracy suffers.', outcomeEmoji: '🤕' }
            }
        ]
    },
    {
        id: 'legend_shakira_01',
        title: "Encounter with the She Wolf",
        description: "'Your hips don't lie... you are the victor,' the King sighs. 'But the dance of fame is endless. You can never stop moving, or they will forget you.'",
        emojis: ['💃', '🐺', '🎤', '🌍'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"Whenever, Wherever."',
                emoji: '🌍',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_shakira_wherever' }, resultText: 'Your adaptability is your strength. You gain a balanced boost to your core abilities.', outcomeEmoji: '✨' }
            },
            {
                text: '"I\'m a She Wolf in the closet."',
                emoji: '🐺',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_shakira_shewolf' }, resultText: 'You unleash your primal instincts. You become incredibly fast and powerful, but more fragile.', outcomeEmoji: '🔥' }
            },
            {
                text: '"Try Everything."',
                emoji: '🦊',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_shakira_everything' }, resultText: 'Your optimism is infectious. You become incredibly lucky and resilient.', outcomeEmoji: '😇' }
            },
            {
                text: '"Hips Don\'t Lie."',
                emoji: '💃',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_shakira_hips' }, resultText: 'You are so focused on your dance, you forget to fight. Your attacks become weaker.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_jane_goodall_01',
        title: "Encounter with the Naturalist",
        description: "'You have shown great courage,' the King says softly. 'But you have only saved the emojis. The world is still wounded. One victory is not enough.'",
        emojis: ['🐵', '🌿', '🌍', '❤️'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"Every individual matters."',
                emoji: '❤️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_jane_individual' }, resultText: 'Your compassion makes you resilient and precise in your actions.', outcomeEmoji: '😇' }
            },
            {
                text: '"We must have hope."',
                emoji: '🙏',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_jane_hope' }, resultText: 'Your unwavering hope for the future grants you incredible health and luck.', outcomeEmoji: '✨' }
            },
            {
                text: '"The least I can do is speak out."',
                emoji: '🗣️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_jane_speak' }, resultText: 'Your voice becomes your weapon. Your critical strikes are powerful, but your own defenses are neglected.', outcomeEmoji: '💥' }
            },
            {
                text: '"What you do makes a difference."',
                emoji: '😔',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_jane_difference' }, resultText: 'The weight of the world is heavy. Your sense of responsibility makes you sluggish.', outcomeEmoji: '😭' }
            }
        ]
    },
    {
        id: 'legend_adele_01',
        title: "Encounter with the Diva",
        description: "'Hello from the other side,' the King rasps. 'You won. But the heartbreak of victory is that the story is over. There will be no one left to sing for.'",
        emojis: ['🎤', '💔', '🎶', '🏆'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I will set fire to the rain."',
                emoji: '🔥',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_adele_fire' }, resultText: 'You turn sorrow into raw power. Your attacks and criticals are devastating.', outcomeEmoji: '💥' }
            },
            {
                text: '"I\'ll be turning tables."',
                emoji: '🔄',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_adele_tables' }, resultText: 'You rewrite your own fate. Your luck and resilience are greatly enhanced.', outcomeEmoji: '✨' }
            },
            {
                text: '"Go easy on me."',
                emoji: '🙏',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_adele_easy' }, resultText: 'Your vulnerability is your strength. You become much healthier, but your attacks lose some of their edge.', outcomeEmoji: '❤️‍🩹' }
            },
            {
                text: '"Rumor has it..."',
                emoji: '🤫',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_adele_rumor' }, resultText: 'You get lost in the gossip and drama. Your attacks become less accurate.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_modi_01',
        title: "Encounter with the PM",
        description: "'A historic victory,' the King concedes. 'But a nation's work is never done. The demands of a billion people will grind you to dust.'",
        emojis: ['🇮🇳', '🙏', '📈', '🧘'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"A New India."',
                emoji: '🇮🇳',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_modi_newindia' }, resultText: 'Your vision for the future grants a balanced and powerful boost to all your abilities.', outcomeEmoji: '✨' }
            },
            {
                text: '"Make in India."',
                emoji: '🏭',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_modi_make' }, resultText: 'Your focus on industry brings great fortune, but at a cost to your own well-being.', outcomeEmoji: '💰' }
            },
            {
                text: '"I am a servant of the people."',
                emoji: '🙏',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_modi_servant' }, resultText: 'Your humility and dedication make you incredibly resilient and healthy.', outcomeEmoji: '❤️‍🩹' }
            },
            {
                text: '"Mitron!"',
                emoji: '🗣️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_modi_mitron' }, resultText: 'Your speeches are powerful, but your actions become slower and more deliberate.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_dalai_lama_01',
        title: "Encounter with His Holiness",
        description: "'You have achieved victory,' the King says peacefully. 'But this is the path of violence. True nirvana is freedom from this cycle of conflict. Your attachment to power is your final prison.'",
        emojis: ['🙏', '🧘', '☸️', '❤️'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"My religion is very simple. My religion is kindness."',
                emoji: '❤️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_dalai_kindness' }, resultText: 'Your compassion grants you immense health and resilience.', outcomeEmoji: '😇' }
            },
            {
                text: '"The purpose of our lives is to be happy."',
                emoji: '😊',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_dalai_happy' }, resultText: 'Your pursuit of happiness brings you incredible fortune.', outcomeEmoji: '✨' }
            },
            {
                text: '"Silence is sometimes the best answer."',
                emoji: '🤫',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_dalai_silence' }, resultText: 'Your contemplative silence makes you a defensive master, but you lose your aggressive edge.', outcomeEmoji: '🛡️' }
            },
            {
                text: '"This is my simple religion."',
                emoji: '🙏',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_dalai_simple' }, resultText: 'Your simple approach is misinterpreted as weakness, and your power fades slightly.', outcomeEmoji: '😔' }
            }
        ]
    },
    {
        id: 'legend_mccartney_01',
        title: "Encounter with a Beatle",
        description: "'You took a sad song, and made it better,' the King hums. 'But the show is over. The crowd is gone. All you'll have is yesterday.'",
        emojis: ['🎵', '🎸', '🪲', '❤️'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"We get by with a little help from our friends."',
                emoji: '🤝',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_mccartney_friends' }, resultText: 'Your collaborative spirit grants you a balanced boost to all your abilities.', outcomeEmoji: '✨' }
            },
            {
                text: '"Live and Let Die."',
                emoji: '💥',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_mccartney_die' }, resultText: 'Your explosive philosophy makes you a powerful but fragile warrior.', outcomeEmoji: '🔥' }
            },
            {
                text: '"Yesterday."',
                emoji: '😔',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_mccartney_yesterday' }, resultText: 'Dwelling on the past makes you resilient but less aggressive.', outcomeEmoji: '❤️‍🩹' }
            },
            {
                text: '"Silly Love Songs."',
                emoji: '❤️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_mccartney_silly' }, resultText: 'Some people want to fill the world with silly love songs. What\'s wrong with that? Nothing, but it makes you less of a fighter.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_attenborough_01',
        title: "Encounter with the Naturalist",
        description: "'A truly wonderful victory,' the King narrates in a soft voice. 'But this world, this habitat, is now yours to protect. A heavy burden for a single creature.'",
        emojis: ['🌍', '🐒', '🎤', '🌿'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"This world is a spectacular place."',
                emoji: '🌍',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_attenborough_spectacular' }, resultText: 'Your love for the world grants you immense resilience and good fortune.', outcomeEmoji: '😇' }
            },
            {
                text: '"The survival of the fittest."',
                emoji: '🐅',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_attenborough_fittest' }, resultText: 'You embrace the harsh law of nature. You become incredibly powerful and fast, but fragile.', outcomeEmoji: '🔥' }
            },
            {
                text: '"We must protect it."',
                emoji: '🛡️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_attenborough_protect' }, resultText: 'Your desire to protect makes you a defensive powerhouse.', outcomeEmoji: '💪' }
            },
            {
                text: '"It seems a pity to go."',
                emoji: '😔',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_attenborough_pity' }, resultText: 'Your hesitation and sorrow for what is lost makes you slower.', outcomeEmoji: '😭' }
            }
        ]
    },
    {
        id: 'legend_hopkins_01',
        title: "Encounter with Hannibal",
        description: "'A census taker once tried to test me,' the King whispers. 'You... are more interesting. But power is a feast, and you will eventually devour yourself.'",
        emojis: ['🎭', '🍷', '🧠', '🐑'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I do wish we could chat longer."',
                emoji: '🍷',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_hopkins_chat' }, resultText: 'Your civility is rewarded with a boost to your health and cunning.', outcomeEmoji: '✨' }
            },
            {
                text: '"I\'m having an old friend for dinner."',
                emoji: '🍽️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_hopkins_dinner' }, resultText: 'Your terrifying focus makes you a devastatingly powerful attacker.', outcomeEmoji: '🔥' }
            },
            {
                text: '"Love your suit."',
                emoji: '👔',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_hopkins_suit' }, resultText: 'Your focus on appearances makes you lucky, but you neglect your training.', outcomeEmoji: '💰' }
            },
            {
                text: '"The lambs have stopped screaming."',
                emoji: '🐑',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_hopkins_lambs' }, resultText: 'The peace you feel has dulled your killer instinct. Your critical strikes are weaker.', outcomeEmoji: '😔' }
            }
        ]
    },
    {
        id: 'legend_freeman_01',
        title: "Encounter with the Narrator",
        description: "'And so the hero won,' the King narrates. 'But every story must end. Every narrator must fall silent. What will you do when there is no one left to tell your tale?'",
        emojis: ['🎤', '🙏', '✨', '🎬'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"Get busy livin\'."',
                emoji: '😊',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_freeman_livin' }, resultText: 'You choose life. You become more resilient and luckier.', outcomeEmoji: '😇' }
            },
            {
                text: '"I am God."',
                emoji: '🙏',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_freeman_god' }, resultText: 'Your omnipotence grants you a balanced and powerful boost to all your abilities.', outcomeEmoji: '✨' }
            },
            {
                text: '"The Shawshank Redemption."',
                emoji: '🕊️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_freeman_shawshank' }, resultText: 'Hope is a good thing. It grants you immense health and resilience.', outcomeEmoji: '❤️‍🩹' }
            },
            {
                text: '"Get busy dyin\'."',
                emoji: '💀',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_freeman_dyin' }, resultText: 'Your fatalism has made you weaker.', outcomeEmoji: '😔' }
            }
        ]
    },
    {
        id: 'legend_queen_elizabeth_01',
        title: "Encounter with The Queen",
        description: "'A victory for the Crown,' the King says with a final, regal nod. 'But the cost of the throne is a heavy one. One day, you will be the history another reads.'",
        emojis: ['👑', '🇬🇧', '🐶', '💂'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"For Crown and Country."',
                emoji: '🇬🇧',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_queen_country' }, resultText: 'Your devotion to duty makes you powerful and resilient.', outcomeEmoji: '💪' }
            },
            {
                text: '"The Crown must win. Must always win."',
                emoji: '👑',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_queen_win' }, resultText: 'Your absolute focus on victory makes you powerful, but at a cost to your health.', outcomeEmoji: '🔥' }
            },
            {
                text: '"One is amused."',
                emoji: '😂',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_queen_amused' }, resultText: 'Your good humor brings you immense fortune.', outcomeEmoji: '💰' }
            },
            {
                text: '"Annus horribilis."',
                emoji: '😔',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_queen_horribilis' }, resultText: 'You dwell on the horrible year. The sorrow weakens your attacks.', outcomeEmoji: '😭' }
            }
        ]
    },
    {
        id: 'legend_maggie_smith_01',
        title: "Encounter with the Dame",
        description: "'A victory? Well, I suppose it will do,' the King says with a wry smile. 'But what is a victory, but a prelude to the next ghastly affair?'",
        emojis: ['👵', '🧐', '🏰', '✨'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I am a woman of substance."',
                emoji: '💪',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_maggie_substance' }, resultText: 'Your sharp wit and resilience make you a formidable force.', outcomeEmoji: '✨' }
            },
            {
                text: '"What is a weekend?"',
                emoji: '🤔',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_maggie_weekend' }, resultText: 'Your aristocratic focus brings great fortune, but you are above physical exertion.', outcomeEmoji: '💰' }
            },
            {
                text: '"At my age, one must ration one\'s excitement."',
                emoji: '😌',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_maggie_ration' }, resultText: 'Your calm demeanor makes you resilient, but you lack a killer instinct.', outcomeEmoji: '🛡️' }
            },
            {
                text: '"Don\'t be defeatist, dear, it\'s very middle class."',
                emoji: '🧐',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_maggie_defeatist' }, resultText: 'Your sharp tongue is your only weapon, but it has dulled your physical prowess.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_merkel_01',
        title: "Encounter with the Chancellor",
        description: "'The logical outcome,' the King states flatly. 'But every solution creates new problems. The calculus of power is... unforgiving.'",
        emojis: ['🇩🇪', '📈', '🤝', '🇪🇺'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"We can do this."',
                emoji: '🤝',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_merkel_cando' }, resultText: 'Your pragmatic optimism is a powerful force, granting a balanced boost to all abilities.', outcomeEmoji: '✨' }
            },
            {
                text: '"The numbers must be right."',
                emoji: '📈',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_merkel_numbers' }, resultText: 'Your focus on the economy brings great fortune and precision, but your health is neglected.', outcomeEmoji: '💰' }
            },
            {
                text: '"A strong defense is essential."',
                emoji: '🛡️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_merkel_defense' }, resultText: 'Your focus on security makes you incredibly resilient and healthy.', outcomeEmoji: '💪' }
            },
            {
                text: '"There is no alternative."',
                emoji: '😠',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_merkel_alternative' }, resultText: 'Your rigid pragmatism makes you inflexible. Your attack speed suffers.', outcomeEmoji: '😤' }
            }
        ]
    },
    {
        id: 'legend_thunberg_01',
        title: "Encounter with the Activist",
        description: "'You have won,' the King says, his voice like melting ice. 'But you have only delayed the crisis. How dare you celebrate when our house is still on fire?'",
        emojis: ['🌍', '😠', '🌱', '🗣️'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"We need hope."',
                emoji: '❤️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_thunberg_hope' }, resultText: 'Your hope for a better future makes you resilient and lucky.', outcomeEmoji: '😇' }
            },
            {
                text: '"The house is on fire!"',
                emoji: '🔥',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_thunberg_fire' }, resultText: 'Your righteous fury makes you fast and powerful, but the stress is draining.', outcomeEmoji: '💥' }
            },
            {
                text: '"You are failing us."',
                emoji: '😠',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_thunberg_failing' }, resultText: 'Your powerful words make your critical strikes devastating.', outcomeEmoji: '🎯' }
            },
            {
                text: '"How dare you!"',
                emoji: '😤',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_thunberg_dare' }, resultText: 'Your anger consumes you, making you less effective in combat.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_mbappe_01',
        title: "Encounter with the Phenom",
        description: "'A good game,' the King says coolly. 'But there is always another match. Another season. The pressure to stay at the top... it will break you.'",
        emojis: ['⚽', '🇫🇷', '🐢', '🏆'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I play for the team."',
                emoji: '🤝',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_mbappe_team' }, resultText: 'Your team-first mentality gives you a balanced boost to all abilities.', outcomeEmoji: '✨' }
            },
            {
                text: '"I am the future."',
                emoji: '🚀',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_mbappe_future' }, resultText: 'Your incredible confidence makes you lightning fast and powerful, but fragile.', outcomeEmoji: '🔥' }
            },
            {
                text: '"The goal is all that matters."',
                emoji: '🥅',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_mbappe_goal' }, resultText: 'Your focus on scoring makes your critical strikes and fortune legendary.', outcomeEmoji: '🎯' }
            },
            {
                text: '"The contract is what matters."',
                emoji: '💰',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_mbappe_contract' }, resultText: 'Your focus on the deal has made you less accurate on the field.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_zendaya_01',
        title: "Encounter with the Icon",
        description: "'A total slay,' the King admits. 'But fame is a fickle beast. Today's icon is tomorrow's trivia question. The challenge is not to win, but to endure.'",
        emojis: ['✨', '🕷️', '🎬', '🎭'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I have to be a warrior."',
                emoji: '💪',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_zendaya_warrior' }, resultText: 'Your inner strength makes you powerful and resilient.', outcomeEmoji: '✨' }
            },
            {
                text: '"The greatest showman."',
                emoji: '🎭',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_zendaya_showman' }, resultText: 'Your flair for the dramatic makes you fast and lucky, but you neglect your defenses.', outcomeEmoji: '💃' }
            },
            {
                text: '"The spice must flow."',
                emoji: '👁️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_zendaya_spice' }, resultText: 'The spice grants you prescience. Your critical strikes are unmatched.', outcomeEmoji: '🎯' }
            },
            {
                text: '"I\'m just a kid from Oakland."',
                emoji: '😔',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_zendaya_kid' }, resultText: 'Your false modesty is unconvincing. Your attacks lose their power.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_jungkook_01',
        title: "Encounter with the Golden Maknae",
        description: "'Dynamite performance,' the King concedes. 'But the life of an idol is fleeting. The fans will move on. And you will be left with only the echoes of their cheers.'",
        emojis: ['🎤', '💜', '🕺', '🐰'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I do it for the ARMY."',
                emoji: '💜',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_jungkook_army' }, resultText: 'Your devotion to your fans makes you resilient and lucky.', outcomeEmoji: '😇' }
            },
            {
                text: '"I\'m still hungry."',
                emoji: '🔥',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_jungkook_hungry' }, resultText: 'Your endless drive to improve makes you fast and powerful.', outcomeEmoji: '💥' }
            },
            {
                text: '"Smooth like butter."',
                emoji: '🧈',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_jungkook_butter' }, resultText: 'Your effortless cool makes your critical strikes and luck legendary.', outcomeEmoji: '✨' }
            },
            {
                text: '"I\'m a bad guy."',
                emoji: '😈',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_jungkook_badguy' }, resultText: 'Your attempt at an edgier image falls flat. Your attacks are weaker.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_xi_jinping_01',
        title: "Encounter with the Chairman",
        description: "'A glorious victory,' the King says, his form dissolving. 'But the weight of a nation is heavy. The path to prosperity is paved with sacrifice. Your own will be among them.'",
        emojis: ['🇨🇳', '🐼', '📖', '📈'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"Serve the people."',
                emoji: '🤝',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_xi_people' }, resultText: 'Your devotion to your nation grants a balanced and powerful boost to all abilities.', outcomeEmoji: '✨' }
            },
            {
                text: '"The China Dream."',
                emoji: '📈',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_xi_dream' }, resultText: 'Your ambitious vision brings great fortune, but the risks are immense.', outcomeEmoji: '💰' }
            },
            {
                text: '"A harmonious society."',
                emoji: '☯️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_xi_harmony' }, resultText: 'Your pursuit of stability makes you incredibly resilient and healthy.', outcomeEmoji: '🛡️' }
            },
            {
                text: '"My authority is absolute."',
                emoji: '👑',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_xi_authority' }, resultText: 'Your iron fist makes you strong, but inflexible. Your speed suffers.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_biden_01',
        title: "Encounter with the President",
        description: "'Listen, Jack, you beat the malarkey,' the King says, fading. 'But power... it's a funny thing. You build and build, and then the next guy comes along. That's the deal.'",
        emojis: ['🇺🇸', '😎', '🍦', '🗳️'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"We\'re building back better."',
                emoji: '🏗️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_biden_bbb' }, resultText: 'Your focus on rebuilding grants you a powerful and balanced boost to your core abilities.', outcomeEmoji: '✨' }
            },
            {
                text: '"It\'s about dignity and respect."',
                emoji: '🤝',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_biden_respect' }, resultText: 'Your character is your strength. You become more resilient and luckier.', outcomeEmoji: '😇' }
            },
            {
                text: '"Come on, man!"',
                emoji: '😠',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_biden_cmon' }, resultText: 'Your folksy anger is potent. You become much stronger, but less healthy.', outcomeEmoji: '🔥' }
            },
            {
                text: '"No malarkey!"',
                emoji: '🚫',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_biden_malarkey' }, resultText: 'Your straightforward approach is predictable. Your critical strikes are weaker.', outcomeEmoji: '😤' }
            }
        ]
    },
    {
        id: 'legend_pope_francis_01',
        title: "Encounter with the Pontiff",
        description: "'You have won, my child,' the King says with a final, holy light. 'But the temptations of earthly power are great. Even the shepherd can become the wolf.'",
        emojis: ['🇻🇦', '🙏', '🕊️', '❤️'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"We must build bridges, not walls."',
                emoji: '🤝',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_pope_bridges' }, resultText: 'Your focus on unity makes you resilient and healthy.', outcomeEmoji: '❤️‍🩹' }
            },
            {
                text: '"Who am I to judge?"',
                emoji: '🙏',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_pope_judge' }, resultText: 'Your humility brings great fortune and luck.', outcomeEmoji: '✨' }
            },
            {
                text: '"The wrath of God."',
                emoji: '🔥',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_pope_wrath' }, resultText: 'You channel divine fury. Your power is immense, but your compassion wanes.', outcomeEmoji: '💥' }
            },
            {
                text: '"This is God\'s will."',
                emoji: '😇',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_pope_will' }, resultText: 'Your faith is absolute, but it blinds you to tactics. Your critical hits are less frequent.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_trudeau_01',
        title: "Encounter with the Prime Minister",
        description: "'A great day for this realm,' the King says, his voice tired. 'But sunny ways, my friend, can bring about the worst storms. The people you lead will one day turn on you.'",
        emojis: ['🇨🇦', '🍁', '🤝', '✨'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"Diversity is our strength."',
                emoji: '❤️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_trudeau_diversity' }, resultText: 'Your inclusive vision grants a powerful and balanced boost to all abilities.', outcomeEmoji: '✨' }
            },
            {
                text: '"A budget that balances itself."',
                emoji: '💰',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_trudeau_budget' }, resultText: 'Your optimistic fiscal policy brings incredible fortune, but at the cost of your own health.', outcomeEmoji: '🤑' }
            },
            {
                text: '"Sunny ways."',
                emoji: '☀️',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_trudeau_sunny' }, resultText: 'Your sunny disposition makes you resilient and lucky.', outcomeEmoji: '😇' }
            },
            {
                text: '"Speaking moistly."',
                emoji: '💦',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_trudeau_moistly' }, resultText: 'A... poor choice of words. You are less effective in combat.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_hanks_01',
        title: "Encounter with America's Dad",
        description: "'You did it,' the King says with a weary smile. 'But every hero becomes a castaway. Every Forrest Gump must stop running. The credits will roll on you, too.'",
        emojis: ['🎬', '❤️', '🍫', '🏐'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"There\'s no crying in baseball!"',
                emoji: '⚾',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_hanks_crying' }, resultText: 'Your tough-love approach makes you powerful and resilient.', outcomeEmoji: '💪' }
            },
            {
                text: '"Life is like a box of chocolates."',
                emoji: '🍫',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_hanks_chocolates' }, resultText: 'You never know what you\'re gonna get. Your fortune is greatly increased.', outcomeEmoji: '💰' }
            },
            {
                text: '"WILSON!"',
                emoji: '🏐',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_hanks_wilson' }, resultText: 'Your loyalty to your friend makes you incredibly healthy, but you neglect your offense.', outcomeEmoji: '❤️‍🩹' }
            },
            {
                text: '"Houston, we have a problem."',
                emoji: '🚀',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_hanks_houston' }, resultText: 'The problem is your accuracy. You are less precise.', outcomeEmoji: '😠' }
            }
        ]
    },
    {
        id: 'legend_will_smith_01',
        title: "Encounter with the Fresh Prince",
        description: "'Welcome to Earth,' the King says, dissolving. 'You saved it. But every hero has a bad sequel. The critics are waiting. The slap... is coming.'",
        emojis: ['😎', '🎤', '👽', '👑'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I make this look good."',
                emoji: '😎',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_will_style' }, resultText: 'Your effortless style makes you fast and lucky.', outcomeEmoji: '✨' }
            },
            {
                text: '"Welcome to Miami."',
                emoji: '🌴',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_will_miami' }, resultText: 'The party lifestyle brings great fortune, but your combat skills atrophy.', outcomeEmoji: '💰' }
            },
            {
                text: '"This is how we do it."',
                emoji: '💥',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_will_doit' }, resultText: 'Your confidence makes you a devastating critical hitter.', outcomeEmoji: '🎯' }
            },
            {
                text: '"Keep my wife\'s name out your mouth!"',
                emoji: '😠',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_will_slap' }, resultText: 'Your anger makes you lose control. Your accuracy suffers greatly.', outcomeEmoji: '😤' }
            }
        ]
    },
    {
        id: 'legend_dicaprio_01',
        title: "Encounter with the Movie Star",
        description: "'A triumphant performance,' the King admits. 'But the Oscar will always be just out of reach. The next great challenge... will be your own legacy.'",
        emojis: ['🎬', '🏆', '🌍', '🚢'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            {
                text: '"I\'m the king of the world!"',
                emoji: '🚢',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_leo_king' }, resultText: 'Your boundless optimism makes you powerful, but incredibly fragile.', outcomeEmoji: '🔥' }
            },
            {
                text: '"A little party never killed nobody."',
                emoji: '🥳',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_leo_party' }, resultText: 'Your lavish lifestyle brings great fortune.', outcomeEmoji: '💰' }
            },
            {
                text: '"I have to be a warrior."',
                emoji: '🐻',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_leo_warrior' }, resultText: 'Your survival instinct makes you incredibly tough and resilient.', outcomeEmoji: '💪' }
            },
            {
                text: '"Catch me if you can."',
                emoji: '🏃',
                consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_leo_catch' }, resultText: 'You are a master of deception, but it has made your direct attacks weaker.', outcomeEmoji: '😠' }
            }
        ]
    }
];