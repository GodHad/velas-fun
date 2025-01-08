export type ChartTable = {
    table: {
        open: number;
        high: number;
        low: number;
        close: number;
        time: number;
    }[];
};

export type Chart = {
    time: number;
    opens: number[];
    highs: number[];
    lows: number[];
    closes: number[];
  };
  

export interface userInfo {
    _id?: string,
    name: string,
    wallet: string,
    avatar?: string,
    isLedger?: boolean,
    signature?: string,
    follower?: number;
    bio: string;
    admin?: boolean;
}

export interface Pagination {
    currentPage: string;
    perPage: string;
    totalItems: number;
    totalPages: number;
}

export interface CoinResponse {
    coins: coinInfo[];
    pagination: Pagination;
}

export interface coinInfo {
    _id?: string;
    name: string;
    creator: string | userInfo;
    ticker: string;
    url: string;
    reserveOne: number;
    reserveTwo: number;
    token: string;
    marketcap?: number;
    graduationMarketCap?: number;
    price?: number;
    replies?: number;
    description?: string;
    twitter?: string;
    telegram?: string;
    website?: string;
    date?: Date;
    tradingOnUniswap?: boolean;
    tradingPaused?: boolean;
    uniswapPair?: boolean;
}
export interface msgInfo {
    coinId: string | coinInfo,
    sender: string | userInfo,
    time: Date,
    img?: string,
    msg: string,
}

export interface tradeInfo {
    creator: string | coinInfo,
    record: recordInfo[],
}

export interface recordInfo {
    holder: userInfo,
    holdingStatus: number,
    time: Date,
    amount: number,
    price: number,
    tx: string,
    feePercent: number;
}

export interface CharTable {
    table: {
        time: number;
        low: number;
        high: number;
        open: number;
        close: number;
        volume: number;
    }[];
}

export interface Bar {
    time: number;
    low: number;
    high: number;
    open: number;
    close: number;
    volume: number;
}

export interface replyInfo {
    coinId: string;
    sender: string;
    msg: string;
    img?: string;
}

export interface followerInfo {
    userId: string;
    followers: {
        _id: string;
        follower: userInfo;
    }[];
}