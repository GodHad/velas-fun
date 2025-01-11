"use client"
import { msgInfo, userInfo } from '@/types';
import { createContext } from 'react';

type UserContextType = {
    user: userInfo;
    setUser: (value: userInfo) => void;

    login: boolean;
    setLogin: (value: boolean) => void;

    isLoading: boolean;
    setIsLoading: (value: boolean) => void;

    imageUrl: string;
    setImageUrl: (value: string) => void;

    isCreated: boolean;
    setIsCreated: (value: boolean) => void;

    messages: msgInfo[];
    setMessages: React.Dispatch<React.SetStateAction<msgInfo[]>>;

    vlxPrice: number;
    setVLXPrice: (value: number) => void;
};

const UserContext = createContext<UserContextType>({
    user: {} as userInfo,
    setUser: () => {},

    login: false,
    setLogin: () => {},

    isLoading: false,
    setIsLoading: () => {},

    imageUrl: '/upload-bg.png',
    setImageUrl: () => {},

    isCreated: false,
    setIsCreated: () => {},

    messages: [] as msgInfo[],
    setMessages: () => {},

    vlxPrice: 3000,
    setVLXPrice: () => {},
})

export default UserContext;