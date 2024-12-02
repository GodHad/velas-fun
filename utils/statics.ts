import { Token } from "@/types/token";

export const users = [
    {
        id: 1,
        username: '4wDDap',
        bio: 'Hello',
        walletAddress: '4wDDApfcjosefnosejioaca342',
        coinsHeld: [],
        follower: [2],
        following: [2],
        logo: null
    },
    {
        id: 2,
        username: '6cQQZD',
        bio: '',
        walletAddress: '6cQQZDfcjosefnosejioaca342',
        coinsHeld: [],
        follower: [3, 1],
        following: [1, 3],
        logo: null
    },
    {
        id: 3,
        username: 'E5fbPC',
        bio: '',
        walletAddress: 'E5fbPCfcjosefnosejioaca342',
        coinsHeld: [],
        follower: [2, 4],
        following: [2, 5],
        logo: null
    },
    {
        id: 4,
        username: '4wDDap',
        bio: '',
        walletAddress: '4wDDApfcjosefnosejioaca342',
        coinsHeld: [],
        follower: [2, 3],
        following: [2, 3],
        logo: null
    },
    {
        id: 5,
        username: '4wDDap',
        bio: '',
        walletAddress: '4wDDApfcjosefnosejioaca342',
        coinsHeld: [],
        follower: [4, 3],
        following: [3, 4],
        logo: null
    },
]

export const tokens: Token[] = [
    {
        id: 1,
        address: '0x857FbcECe3296FDF8af57D1FFa96Bb76327D8f6B',
        name: 'Onxe 2.0',
        ticker: 'onxe',
        description: 'great project but the DEV rug us. Will purchase the CTO for dex.',
        twitter: '',
        telegram: '',
        website: '',
        logo: '1.jpg',
        creator: 2,
        price: 0.000000001,
        marketCap: 2000,
        badge: 'king',
        createdAt: '2024-11-21 14:30:08',
        holders: [
            { userId: 1, amount: 800 },
            { userId: 2, amount: 300 },
            { userId: 5, amount: 10 }
        ],
        transactions: [
            {
                userId: 1,
                amount: 10,
                type: 'sell',
                date: '2024-11-21 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 2,
                amount: 10,
                type: 'buy',
                date: '2024-11-22 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 1,
                amount: 100,
                type: 'buy',
                date: '2024-11-23 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 5,
                amount: 18,
                type: 'sell',
                date: '2024-11-24 14:31:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
        ],
        replies: [
            {
                userId: 2,
                userLogo: null,
                content: 'Hello, World!',
                image: null,
                likes: 0,
                createdAt: '2024-11-30 18:10:11',
            },
            {
                userId: 2,
                userLogo: null,
                content: 'Hello, World!',
                image: null,
                likes: 0,
                createdAt: '2024-11-30 18:10:11',
            },
            {
                userId: 2,
                userLogo: null,
                content: 'Hello, World!',
                image: null,
                likes: 0,
                createdAt: '2024-11-30 18:10:11',
            },
        ]
    },
    {
        id: 2,
        address: '0x857FbcECe3296FDF8af57D1FFa96Bb76327D8f6B',
        name: 'manjunamai',
        ticker: 'manju',
        description: 'openlink.co/manjunamia',
        twitter: '',
        telegram: '',
        website: '',
        logo: '2.jpg',
        creator: 5,
        price: 0.000000001,
        marketCap: 4000,
        badge: null,
        createdAt: '2024-11-21 14:30:08',
        holders: [
            { userId: 2, amount: 800 },
            { userId: 3, amount: 300 },
            { userId: 5, amount: 10 }
        ],
        transactions: [
            {
                userId: 2,
                amount: 10,
                type: 'sell',
                date: '2024-11-21 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 3,
                amount: 10,
                type: 'buy',
                date: '2024-11-22 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 2,
                amount: 100,
                type: 'buy',
                date: '2024-11-23 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 5,
                amount: 18,
                type: 'sell',
                date: '2024-11-24 14:31:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
        ],
        replies: [
            {
                userId: 2,
                userLogo: null,
                content: 'Hello, World!',
                image: null,
                likes: 0,
                createdAt: '2024-11-30 18:10:11',
            }
        ]
    },
    {
        id: 3,
        address: '0x857FbcECe3296FDF8af57D1FFa96Bb76327D8f6B',
        name: 'Sun',
        ticker: 'Sun',
        description: 'Sun token. Hello. Sun token. Hello. Sun token. Hello. Sun token. Hello. Sun token. Hello. Sun token. Hello. Sun token. Hello.',
        twitter: '',
        telegram: '',
        website: '',
        logo: '3.jpg',
        creator: 5,
        price: 0.000000001,
        marketCap: 3000,
        badge: null,
        createdAt: '2024-11-21 14:30:08',
        holders: [
            { userId: 2, amount: 800 },
            { userId: 4, amount: 300 },
            { userId: 5, amount: 10 }
        ],
        transactions: [
            {
                userId: 5,
                amount: 10,
                type: 'sell',
                date: '2024-11-21 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 4,
                amount: 10,
                type: 'buy',
                date: '2024-11-22 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 2,
                amount: 100,
                type: 'buy',
                date: '2024-11-23 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 5,
                amount: 18,
                type: 'sell',
                date: '2024-11-24 14:31:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
        ],
        replies: [
            {
                userId: 2,
                userLogo: null,
                content: 'Hello, World!',
                image: null,
                likes: 0,
                createdAt: '2024-11-30 18:10:11',
            }
        ]
    },
    {
        id: 4,
        address: '0x857FbcECe3296FDF8af57D1FFa96Bb76327D8f6B',
        name: 'IVY',
        ticker: 'IVY',
        description: 'IVY is a tiny black pup with a heart full of love and misc hief.',
        twitter: '',
        telegram: '',
        website: '',
        logo: '4.jpg',
        creator: 3,
        price: 0.000000001,
        marketCap: 2000,
        badge: null,
        createdAt: '2024-11-21 14:30:08',
        holders: [
            { userId: 3, amount: 800 },
            { userId: 4, amount: 300 },
            { userId: 5, amount: 10 }
        ],
        transactions: [
            {
                userId: 3,
                amount: 10,
                type: 'sell',
                date: '2024-11-21 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 4,
                amount: 10,
                type: 'buy',
                date: '2024-11-22 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 3,
                amount: 100,
                type: 'buy',
                date: '2024-11-23 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 5,
                amount: 18,
                type: 'sell',
                date: '2024-11-24 14:31:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
        ],
        replies: [
            {
                userId: 2,
                userLogo: null,
                content: 'Hello, World!',
                image: null,
                likes: 0,
                createdAt: '2024-11-30 18:10:11',
            }
        ]
    },
    {
        id: 5,
        address: '0x857FbcECe3296FDF8af57D1FFa96Bb76327D8f6B',
        name: 'Just A Sexy red',
        ticker: 'sexyred',
        description: 'https://hello.com/',
        twitter: '',
        telegram: '',
        website: '',
        logo: '5.jpg',
        creator: 3,
        price: 0.000000001,
        marketCap: 3000,
        badge: null,
        createdAt: '2024-11-21 14:30:08',
        holders: [
            { userId: 1, amount: 800 },
            { userId: 2, amount: 300 },
            { userId: 3, amount: 10 }
        ],
        transactions: [
            {
                userId: 1,
                amount: 10,
                type: 'sell',
                date: '2024-11-21 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 2,
                amount: 10,
                type: 'buy',
                date: '2024-11-22 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 1,
                amount: 100,
                type: 'buy',
                date: '2024-11-23 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 3,
                amount: 18,
                type: 'sell',
                date: '2024-11-24 14:31:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
        ],
        replies: [
            {
                userId: 2,
                userLogo: null,
                content: 'Hello, World!',
                image: null,
                likes: 0,
                createdAt: '2024-11-30 18:10:11',
            }
        ]
    },
    {
        id: 6,
        address: '0x857FbcECe3296FDF8af57D1FFa96Bb76327D8f6B',
        name: 'Penguin happy christmas',
        ticker: 'PHCS',
        description: 'PHCS',
        twitter: '',
        telegram: '',
        website: '',
        logo: '6.jpg',
        creator: 4,
        price: 0.000000001,
        marketCap: 5000,
        badge: null,
        createdAt: '2024-11-21 14:30:08',
        holders: [
            { userId: 1, amount: 800 },
            { userId: 2, amount: 300 },
            { userId: 4, amount: 10 }
        ],
        transactions: [
            {
                userId: 1,
                amount: 10,
                type: 'sell',
                date: '2024-11-21 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 2,
                amount: 10,
                type: 'buy',
                date: '2024-11-22 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 1,
                amount: 100,
                type: 'buy',
                date: '2024-11-23 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 4,
                amount: 18,
                type: 'sell',
                date: '2024-11-24 14:31:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
        ],
        replies: [
            {
                userId: 2,
                userLogo: null,
                content: 'Hello, World!',
                image: null,
                likes: 0,
                createdAt: '2024-11-30 18:10:11',
            }
        ]
    },
    {
        id: 7,
        address: '0x857FbcECe3296FDF8af57D1FFa96Bb76327D8f6B',
        name: 'Snake AI',
        ticker: 'SNAKE',
        description: 'Your favorite classic game, with an AI twist.',
        twitter: '',
        telegram: '',
        website: '',
        logo: '7.jpg',
        price: 0.000000001,
        creator: 2,
        marketCap: 4000,
        badge: null,
        createdAt: '2024-11-21 14:30:08',
        holders: [
            { userId: 1, amount: 800 },
            { userId: 2, amount: 300 },
            { userId: 5, amount: 10 }
        ],
        transactions: [
            {
                userId: 1,
                amount: 10,
                type: 'sell',
                date: '2024-11-21 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 2,
                amount: 10,
                type: 'buy',
                date: '2024-11-22 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 1,
                amount: 100,
                type: 'buy',
                date: '2024-11-23 14:30:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
            {
                userId: 5,
                amount: 18,
                type: 'sell',
                date: '2024-11-24 14:31:08',
                transactionId: '61s7dQVsLGWmZukRGzsAFQhMNsdCywPKU1zUisThHAry2WciEaER8ooDnpmJ23iJnaKczyZQ7ec1zJRcQa7B4fzo',
            },
        ],
        replies: [
            {
                userId: 2,
                userLogo: null,
                content: 'Hello, World!',
                image: null,
                likes: 0,
                createdAt: '2024-11-30 18:10:11',
            }
        ]
    },
];