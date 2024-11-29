export type Token = {
    id: number | string;
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
  };
  