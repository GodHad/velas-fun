import { Metadata } from "next";
import CoinManagement from "@/components/Admin/CoinManagement";

export const metadata: Metadata = {
    title: "BluePill Fun | Admin | Coins",
    description: "BluePill Fun Platform deploying memecoin",
};

const CoinsPage = () => {
    return (
        <CoinManagement />
    )
}

export default CoinsPage;