"use client";

import { ThemeProvider } from "next-themes";
import React, { ReactNode, useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Web3ReactProvider } from "@web3-react/core";
import { ToastContainer } from "react-toastify";
import { PageProvider } from "@/contexts/PageContext";
import UserContext from "@/contexts/UserContext";
import { msgInfo, userInfo } from "@/types";
import "dotenv/config";
import SocketProvider from "@/contexts/SocketContext";
import { hooks, metaMask } from "@/connectors/metaMask";
import CookieConsent, { Cookies } from 'react-cookie-consent'

export const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userInfo>({} as userInfo);
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('/upload-bg.png');
  const [isCreated, setIsCreated] = useState(false);
  const [messages, setMessages] = useState<msgInfo[]>([]);
  const [vlxPrice, setVLXPrice] = useState<number>(3300);

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');

    socket.onmessage = (event) => {
      const trade = JSON.parse(event.data);
      setVLXPrice(trade.p);
    };

    return () => {
      socket.close()
    }
  }, [])

  const handleDecline = () => {
    Cookies.set("CookieConsent", "false", { path: "/" });
    localStorage.removeItem("addedTokens");
  };

  const handleAccept = () => {
    Cookies.set("CookieConsent", "true", { path: "/" });
  };

  return (
    <Web3ReactProvider connectors={[[metaMask, hooks]]}>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <PageProvider>
            <UserContext.Provider
              value={{
                messages,
                setMessages,
                isCreated,
                setIsCreated,
                imageUrl,
                setImageUrl,
                user,
                setUser,
                login,
                setLogin,
                isLoading,
                setIsLoading,
                vlxPrice,
                setVLXPrice
              }}
            >
              <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
                {children}
              </ThemeProvider>
              <ToastContainer
                pauseOnFocusLoss={false}
                theme="colored"
                limit={6}
                icon={false}
              />
              <CookieConsent
                location="bottom"
                buttonText="Accept"
                declineButtonText="Decline"
                cookieName="CookieConsent"
                enableDeclineButton
                onAccept={handleAccept}
                onDecline={handleDecline}
                disableStyles
                disableButtonStyles
                containerClasses="bg-black text-white p-4 flex flex-col md:flex-row items-center justify-between fixed bottom-0 w-full border-t z-[10000]"
                contentClasses="text-md mb-2 md:mb-0"
                buttonClasses="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
                declineButtonClasses="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all mx-4"
              >
                We use localStorage to manage certain functionalities:
                <ul className="list-disc pl-5">
                  <li><b>Mandatory:</b> Authentication tokens for login.</li>
                  <li><b>Optional:</b> MetaMask tokens for wallet integration.</li>
                </ul>
                By clicking &quot;Accept&quot; you agree to storing optional data.
              </CookieConsent>
            </UserContext.Provider>
          </PageProvider>
        </QueryClientProvider>
      </SocketProvider>
    </Web3ReactProvider>
  );
}
