import { Metadata } from "next";
import TokenDetail from "@/components/TokenDetail";

export const metadata: Metadata = {
  title: "Velas Fun | Token",
  description: "Velas Fun Platform deploying memecoin",
};

const CoinPage = async () => {
  return (
    <>
      <TokenDetail />
    </>
  );
};

export default CoinPage;
