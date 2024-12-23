export type Token = {
    id: number | string;
    address: string;
    name: string;
    ticker: string;
    description: string;
    twitter: string;
    telegram: string;
    website: string;
    logo: string;
    creator: number | string;
    marketCap: number;
    badge: string | null;
    price: number;
    createdAt: string;
    holders: {
        userId: number | string;
        amount: number;
    }[];
    transactions: {
        userId: number | string;
        amount: number;
        type: string;
        date: string;
        transactionId: string;
    }[];
    replies: {
        userId: number | string;
        userLogo: string | null;
        content: string;
        image: string | null;
        likes: number;
        createdAt: string;
    }[];
};
