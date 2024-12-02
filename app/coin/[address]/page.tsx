import { Metadata } from "next";
import { notFound } from "next/navigation";
import { tokens } from "@/utils/statics";
import TokenDetail from "@/components/TokenDetail";

export const metadata: Metadata = {
  title: "Velas Fun | Token",
  description: "Velas Fun Platform deploying memecoin",
};

const CoinPage = async ({ params }: { params: Promise<{address: string}> }) => {
  const { address } = await params;

  // Find the token by address
  const token = tokens.find((_token) => _token.address === address);

  if (!token) {
    notFound();
  }

  return (
    <>
      <TokenDetail token={token} />
    </>
  );
};

export default CoinPage;
