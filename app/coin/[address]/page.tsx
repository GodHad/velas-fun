import { Metadata } from "next";
import TokenDetail from "@/components/TokenDetail";

export const metadata: Metadata = {
  title: "Bluepill Fun | Token",
  description: "Bluepill Fun Platform deploying memecoin",
};

const CoinPage = async () => {
  return (
    <>
      <TokenDetail />
    </>
  );
};

export default CoinPage;
