import { userInfo, coinInfo, msgInfo, CoinResponse, replyInfo } from "@/types"
import axios from 'axios';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const walletConnect = async ({ data }: { data: userInfo }): Promise<any> => {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/`, data)
        return response.data;
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const confirmWallet = async ({ data }: { data: userInfo }): Promise<any> => {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/confirm`, data)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const getCoinsInfo = async ({ perPage, sortBy, searchTerm, currentPage }: { perPage: number, sortBy: string, searchTerm: string, currentPage: number }): Promise<CoinResponse> => {
    const res = await axios.get(`${BACKEND_URL}/coin?perPage=${perPage}&currentPage=${currentPage}&sortBy=${sortBy}&searchTerm=${searchTerm}`);
    return res.data
}

export const getCoinInfo = async (data: string): Promise<any> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/coin/${data}`)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const getMessageByCoin = async (data: string): Promise<msgInfo[]> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/feedback/coin/${data}`)
        console.log("messages:", response.data)
        return response.data
    } catch (err) {
        return [];
    }
}

export const getTradeByCoin = async (data: string): Promise<any> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/cointrade/${data}`)
        console.log("trade response::", response)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const postReply = async (data: replyInfo) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/feedback/`, data)
        return response.data
    } catch (err) {
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
        return false;
    }
};