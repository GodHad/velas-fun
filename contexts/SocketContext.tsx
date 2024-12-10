/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { createContext, useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from "next/navigation";
import { errorAlert, infoAlert, successAlert } from "@/components/ToastGroup";

interface Context {
    socket?: Socket;
    counter?: number;
    randValue?: number;
    setRandValue?: Function;
    userArr?: any[];
    setUserArr?: Function;
    playerNumber?: number;
    setPlayerNumber?: Function;
    isLoading?: boolean;
    setIsLoading?: Function;
    isShowModal?: string;
    setIsShowModal?: Function;
    currentDepositAmount?: number;
    setCurrentDepositAmount?: Function;
    numberDecimals?: number;
    alertState?: AlertState;
    setAlertState?: Function;
}

const context = createContext<Context>({});

export const useSocket = () => useContext(context);

const SocketProvider = (props: { children: any }) => {
    const [socket, setSocket] = useState<Socket>();
    const [counter, setCounter] = useState<number>(1);
    const [randValue, setRandValue] = useState<number>(0);
    const [userArr, setUserArr] = useState<any[]>();
    const [playerNumber, setPlayerNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState('');
    const [currentDepositAmount, setCurrentDepositAmount] = useState(0);
    const [numberDecimals, setNumberDecimals] = useState(3);
    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: '',
        severity: undefined,
    })
    
    const router = useRouter();
    const wallet = useWallet();
    const { connection } = useConnection();

    const connectionUpdatedHandler = (data: number) => {
        setCounter(data);
    };

    const createSuccessHandler = (name: string, mint: string) => {
        console.log("Successfully Create Token Name:", name)
        setAlertState({
            open: true,
            message: 'Success',
            severity: 'success',
        });
        successAlert(`Successfully Created token: ${name} \n ${mint}`);
        setIsLoading(false);
    }

    const createFailedHandler = (name: string, mint: string) => {
        console.log("Failed Create Token Name:", name)
        setAlertState({
            open: true,
            message: 'Failed',
            severity: 'error',
        });
        errorAlert(`Failed Create token: ${name} \n ${mint}`)
        setIsLoading(false);
    }

    const createTransactionHandler = (data: any) => {
        console.log("Create Transaction:", data);
        setAlertState({
            open: true,
            message: `${data.user} ${data.isBuy === 2 ? 'bought' : 'sold'} ${data.amount} ${data.isBuy ? 'sol' : data.ticker}`,
            severity: 'info'
        });
        infoAlert(`${data.user} ${data.isBuy === 2 ? 'bought' : 'sold'} ${data.amount} ${data.isBuy ? 'sol' : data.ticker}`);
    }

    useEffect(() => {

        const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
            transports: ["websocket"],
        });
        socket.on("connect", async () => {
            console.log(" --@ connected to backend", socket.id);
        });
        socket.on("disconnect", () => {
            console.log(" --@ disconnected from backend", socket.id);
        });
        setSocket(socket);


        return () => {
            socket.off("connect");
            socket.off("disconnect");
            setSocket(undefined);
        };
    }, [router]);

    useEffect(() => {
            socket?.on("connectionUpdated", async (counter: number) => {
                console.log("--------@ Connection Updated: ", counter);
                
                connectionUpdatedHandler(counter)
            });

            socket?.on("Creation",  () => {
                console.log("--------@ Token Creation: ");

            });
            socket?.on("TokenCreated", async (name: string, mint: string) => {
                console.log("--------@ Token Created!: ", name);

                createSuccessHandler(name, mint);
            });

            socket?.on('transaction', (data) => {
                createTransactionHandler(data);
            })

            // socket?.on("TokenNotCreated", async (name: string, mint: string) => {
            //     console.log("--------@ Token Not Created: ", name);

            //     createFailedHandler(name, mint);
            // });

            return () => {
                socket?.off("Creation", createSuccessHandler);
                socket?.off("TokenCreated", createSuccessHandler);
                socket?.off("TokenNotCreated", createFailedHandler);

                socket?.disconnect();
            };
    }, [socket]);

    return (
        <context.Provider
            value={{
                socket,
                counter,
                randValue,
                setRandValue,
                userArr,
                setUserArr,
                playerNumber,
                setPlayerNumber,
                isLoading,
                setIsLoading,
                isShowModal,
                setIsShowModal,
                currentDepositAmount,
                setCurrentDepositAmount,
                numberDecimals,
                alertState,
                setAlertState
            }}
        >
            {props.children}
        </context.Provider>
    );
};

export interface AlertState {
    open: boolean
    message: string
    severity: 'success' | 'info' | 'warning' | 'error' | undefined
}

export default SocketProvider;