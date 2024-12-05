import { Metadata } from "next";
import TokenDetail from "@/components/TokenDetail";

export const metadata: Metadata = {
  title: "Velas Fun | Token",
  description: "Velas Fun Platform deploying memecoin",
};

const CoinPage = async ({ params }: { params: Promise<{address: string}> }) => {
  const { address } = await params;

  return (
    <>
      <TokenDetail />
    </>
  );
};

export default CoinPage;
