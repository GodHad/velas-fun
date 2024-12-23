import { userInfo, coinInfo, msgInfo, CoinResponse, replyInfo, followerInfo, Pagination, tradeInfo, recordInfo } from "@/types"
import axios from 'axios';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNewCoin = async (txHash: string, coin: coinInfo) => {
    const response = await axios.post(`${BACKEND_URL}/coin/`, { txHash, coin });
    return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const walletConnect = async ({ data }: { data: userInfo }): Promise<any> => {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/`, data)
        return response.data;
    } catch {
        return { error: "error setting up the request" }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const confirmWallet = async ({ data }: { data: userInfo }): Promise<any> => {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/confirm`, data)
        return response.data
    } catch {
        return { error: "error setting up the request" }
    }
}

export const getCoinsInfo = async ({ perPage = 10, sortBy, searchTerm, currentPage = 1 }: { perPage: number, sortBy: string, searchTerm: string, currentPage: number }): Promise<CoinResponse> => {
    const res = await axios.get(`${BACKEND_URL}/coin?perPage=${perPage}&currentPage=${currentPage}&sortBy=${sortBy}&searchTerm=${searchTerm}`);
    return res.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCoinInfo = async (data: string, perPage: number = 10, currentPage: number = 0): Promise<any> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/coin/${data}?perPage=${perPage}&currentPage=${currentPage}`)
        return response.data
    } catch {
        return { error: "error setting up the request" }
    }
}

export const getMessageByCoin = async (data: string, perPage: number = 10, currentPage: number = 0): Promise<{ messages: msgInfo[], pagination: Pagination }> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/feedback/coin/${data}?perPage=${perPage}&currentPage=${currentPage}`)
        console.log("messages:", response.data)
        return response.data
    } catch {
        return { messages: [], pagination: {} as Pagination };
    }
}

export const getTradeByCoin = async (data: string, perPage: number = 10, currentPage: number = 0): Promise<{ trade: tradeInfo, pagination: Pagination }> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/cointrade/${data}?perPage=${perPage}&currentPage=${currentPage}`)
        console.log("trade response::", response)
        return response.data
    } catch {
        return { trade: {} as tradeInfo, pagination: {} as Pagination }
    }
}

export const getRecordByCoin = async (data: string): Promise<recordInfo[]> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/cointrade/coin-holders/${data}`);
        return response.data;
    } catch {
        return [];
    }
}

export const postReply = async (data: replyInfo) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/feedback/`, data)
        return response.data
    } catch {
        return { error: "error setting up the request" }
    }
}

const JWT = process.env.NEXT_PUBLIC_PINATA_PRIVATE_JWT;

export const pinFileToIPFS = async (blob: File) => {
    try {
        const data = new FormData();
        data.append("file", blob);
        const res = await fetch(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${JWT}`,
                },
                body: data,
            }
        );
        const resData = await res.json();
        return resData;
    } catch (error) {
        console.log(error);
    }
};

export const uploadImage = async (url: string) => {
    const res = await fetch(url);
    const blob = await res.blob();

    const imageFile = new File([blob], "image.png", { type: "image/png" });
    const resData = await pinFileToIPFS(imageFile);
    if (resData) {
        return `https://gateway.pinata.cloud/ipfs/${resData.IpfsHash}`;
    } else {
        return undefined;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUser = async ({ id }: { id: string }): Promise<any> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/user/${id}`);
        return response.data;
    } catch {
        return { error: 'error setting up the request' }
    }
}


export const getHoldingBy = async (userId: string, perPage: number = 10, currentPage: number = 0): Promise<{ holdings: UserHolding[], pagination: Pagination }> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/cointrade/user-holdings/${userId}?perPage=${perPage}&currentPage=${currentPage}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return { holdings: [], pagination: { currentPage: '', perPage: '', totalItems: 0, totalPages: 0 } };
    }
}

export const getCoinsInfoBy = async (id: string, perPage: number = 10, currentPage: number = 0): Promise<{ coins: coinInfo[], pagination: Pagination }> => {
    try {
        const res = await axios.get(`${BACKEND_URL}/coin/user/${id}?perPage=${perPage}&currentPage=${currentPage}`);
        return res.data
    } catch (error) {
        console.error(error);
        return { coins: [], pagination: { currentPage: '', perPage: '', totalItems: 0, totalPages: 0 } };
    }
}

export const getMessagesInfoBy = async (id: string, perPage: number = 10, currentPage: number = 0): Promise<{ messages: msgInfo[], pagination: Pagination }> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/feedback/user/${id}?perPage=${perPage}&currentPage=${currentPage}`);
        return response.data;
    } catch {
        return { messages: [], pagination: { currentPage: '', perPage: '', totalItems: 0, totalPages: 0 } };
    }
}

export const getFollowers = async (param: string): Promise<followerInfo> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/follow/${param}`);
        return response.data;
    } catch {
        return {
            userId: '',
            followers: []
        }
    }
}

export const followUser = async (userId: string, param: string): Promise<followerInfo> => {
    try {
        const response = await axios.post(`${BACKEND_URL}/follow/${param}`, { followerId: userId });
        return response.data;
    } catch (error) {
        console.error(error);
        return {
            userId: '',
            followers: []
        }
    }
}

export const unfollowUser = async (userId: string, param: string): Promise<followerInfo> => {
    try {
        const response = await axios.post(`${BACKEND_URL}/follow/unfollow/${param}`, { followerId: userId });
        return response.data;
    } catch (error) {
        console.error(error);
        return {
            userId: '',
            followers: []
        }
    }
}

export const getFollowingUsers = async (userId: string): Promise<userInfo[]> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/follow/following/${userId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export interface UserHolding {
    coin: coinInfo;
    totalAmount: number;
}

export const updateUser = async (userId: string, username: string, bio: string, url?: string): Promise<userInfo | null> => {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/update/${userId}`, { username, bio, url });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const testLiveChart = async (name: string, price: number) => {
    await axios.get(`${BACKEND_URL}/chart/test?name=${name}&price=${price}`);
}

export const boughtTokens = async (txHash: string) => {
    await axios.post(`${BACKEND_URL}/coin/buy-tokens`, { txHash });
}

export const soldTokens = async (txHash: string) => {
    await axios.post(`${BACKEND_URL}/coin/sell-tokens`, { txHash });
}

export async function getVLXPrice() {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=velas&vs_currencies=usd');
    const price = response.data.velas.usd;
    return price;
}