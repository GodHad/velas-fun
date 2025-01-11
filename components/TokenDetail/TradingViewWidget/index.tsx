"use client"
import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Script from "next/script";
import { coinInfo } from "@/types";
import { getVLXPrice } from "@/utils/api";

interface TradingChartProps {
    coin: coinInfo;
}

const TVChartContainer = dynamic(
    () =>
        import("@/components/TokenDetail/TradingViewWidget/TVChartContainer").then((mod) => mod.TVChartContainer),
    { ssr: false }
);

export default function TradingViewWidget({ coin }: TradingChartProps) {
    const [isScriptReady, setIsScriptReady] = useState(false);

    const [vlxPrice, setVLXPrice] = useState<number>(3000);

    useEffect(() => {
        const handleGetPrice = async () => {
            const price = await getVLXPrice();
            setVLXPrice(price)
        }
        handleGetPrice()
    }, [])

    return (
        <>
            <Head>
                <title>Sample Demo TradingView with NextJS</title>
            </Head>
            <Script
                src="/libraries/datafeeds/udf/dist/bundle.js"
                strategy="lazyOnload"
                onReady={() => {
                    setIsScriptReady(true);
                }}
            />
            {isScriptReady && coin && <TVChartContainer
                name={coin.name}
                pairIndex={10}
                token={coin.token}
                vlxPrice={vlxPrice}
            />}
        </>
    );
}