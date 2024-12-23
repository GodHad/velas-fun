"use client"
import { msgInfo, userInfo } from '@/types';
import { createContext } from 'react';

const UserContext = createContext({
    user: {} as userInfo,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUser: (_value: userInfo) => {},

    login: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLogin: (_value: boolean) => {},

    isLoading: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setIsLoading: (_value: boolean) => {},
    
    imageUrl: '/upload-bg.png',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setImageUrl: (_value: string) => {},

    isCreated: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setIsCreated: (_value: boolean) => {},

    messages: [] as msgInfo[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setMessages: (_value: msgInfo[]) => {}, 

    vlxPrice: 0,
    setVLXPrice: (_value: number) => {},
})

export default UserContext;