"use client"
import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";
import Script from "next/script";
import { coinInfo } from "@/types";

interface TradingChartProps {
    coin: coinInfo;
    vlxPrice: number;
}

const TVChartContainer = dynamic(
    () =>
        import("@/components/TokenDetail/TradingViewWidget/TVChartContainer").then((mod) => mod.TVChartContainer),
    { ssr: false }
);

export default function TradingViewWidget({ coin, vlxPrice }: TradingChartProps) {
    const [isScriptReady, setIsScriptReady] = useState(false);
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