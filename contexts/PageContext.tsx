"use client";
import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch } from "react";

interface PageContextType {
  solPrice: number;
  adminData: AdminDataProps | null;
  setAdminData: Dispatch<SetStateAction<AdminDataProps | null>>;
  metaData: MetaDataProps | null;
  setMetaData: Dispatch<SetStateAction<MetaDataProps | null>>;
}

export const PageContext = createContext<PageContextType | undefined>(
  undefined
);

export function useData() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useData must be used within a ModalProvider");
  }
  return context;
}

interface PageProviderProps {
  children: ReactNode;
}

interface AdminDataProps {
  admin: string[];
  feePercent: number;
  feeAddress: string;
  creationFee: number;
  creatorReward: number;
  velasFunReward: number;
  graduationMarketCap: number;
  siteKill: boolean;
  logoTitle?: string;
  logoUrl?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  bannerUrl?: string;
  bannerTitle?: string;
  bannerContent?: string;
  footerContent?: string;
  policy?: string;
  terms?: string;
}

interface MetaDataProps {
  logoTitle?: string;
  logoUrl?: string;
  bannerTitle?: string;
  bannerContent?: string;
  bannerUrl?: string;
  footerContent?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  policy?: string;
  terms?: string;
  siteKill: boolean;
}

export function PageProvider({ children }: PageProviderProps) {
  const [adminData, setAdminData] = useState<AdminDataProps | null>(null);
  const [metaData, setMetaData] = useState<MetaDataProps | null>(null);
  const pageContextValue: PageContextType = {
    solPrice: 101,
    adminData,
    setAdminData,
    metaData, 
    setMetaData
  };
  return (
    <PageContext.Provider value={pageContextValue}>
      {children}
    </PageContext.Provider>
  );
}
