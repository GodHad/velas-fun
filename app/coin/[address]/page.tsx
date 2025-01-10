import { Metadata } from "next";
import TokenDetail from "@/components/TokenDetail";

export const metadata: Metadata = {
  title: "BluePill Fun | Token",
  description: "BluePill Fun Platform deploying memecoin",
};

const CoinPage = async () => {
  return (
    <>
      <TokenDetail />
    </>
  );
};

export default CoinPage;
