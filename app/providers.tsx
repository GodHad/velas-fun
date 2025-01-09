"use client";

import { ThemeProvider } from "next-themes";
import React, { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Web3ReactProvider } from "@web3-react/core";
import { ToastContainer } from "react-toastify";
import { PageProvider } from "@/contexts/PageContext";
import UserContext from "@/contexts/UserContext";
import { msgInfo, userInfo } from "@/types";
import "dotenv/config";
import SocketProvider from "@/contexts/SocketContext";
import { hooks, metaMask } from "@/connectors/metaMask";

export const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userInfo>({} as userInfo);
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('/upload-bg.png');
  const [isCreated, setIsCreated] = useState(false);
  const [messages, setMessages] = useState<msgInfo[]>([]);
  const [vlxPrice, setVLXPrice] = useState<number>(0);

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
              />
            </UserContext.Provider>
          </PageProvider>
        </QueryClientProvider>
      </SocketProvider>
    </Web3ReactProvider>
  );
}
