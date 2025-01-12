import { Metadata } from "next";
import Transactions from "@/components/Admin/Transactions";

export const metadata: Metadata = {
    title: "BluePill Fun | Admin | Transactions",
    description: "BluePill Fun Platform deploying memecoin",
};

const TransactionsPage = () => {
    return (
        <Transactions />
    )
}

export default TransactionsPage;