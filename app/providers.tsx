"use client";

import { ThemeProvider } from "next-themes";
import React, { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import { PageProvider } from "@/contexts/PageContext";
import { SolanaWalletProvider } from "@/contexts/SolanaWalletProvider";
import UserContext from "@/contexts/UserContext";
import { msgInfo, userInfo } from "@/types";
import "dotenv/config";
import SocketProvider from "@/contexts/SocketContext";

export const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userInfo>({} as userInfo);
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('/upload-bg.png');
  const [isCreated, setIsCreated] = useState(false);
  const [messages, setMessages] = useState<msgInfo[]>([]);

  return (
    <SolanaWalletProvider>
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
              }}
            >
              <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
                {children}
              </ThemeProvider>
              <ToastContainer pauseOnFocusLoss={false} theme="colored" />
            </UserContext.Provider>
          </PageProvider>
        </QueryClientProvider>
      </SocketProvider>
    </SolanaWalletProvider>
  );
}
