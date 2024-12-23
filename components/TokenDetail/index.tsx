'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import CoinDetail from "./CoinDetail";
import TradingViewWidget from "./TradingViewWidget";
import { coinInfo } from "@/types";
import { usePathname } from "next/navigation";
import { getCoinInfo, getVLXPrice } from "@/utils/api";
import Thread from "./Thread";
import TradeForm from "./TradeForm";
import TokenOverview from "./TokenOverview";
import Holders from "./Holders";

const TokenDetail = () => {
    const pathname = usePathname();
    const [param, setParam] = useState<string>('');
    const [coin, setCoin] = useState<coinInfo | null>(null);
    const [vlxPrice, setVLXPrice] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const segments = pathname.split('/');
            const parameter = segments[segments.length - 1];
            setParam(parameter);
            const data = await getCoinInfo(parameter);
            setCoin(data as coinInfo);
        }

        fetchData();
    }, [pathname]);

    useEffect(() => {
        const _getVLXPrice = async () => {
            const price = await getVLXPrice();
            setVLXPrice(Number(price));
        }
        _getVLXPrice()
    }, [])

    return (
        <>
            <section id="home"
                className="dark:bg-gray-dark bg-white relative z-10 overflow-hidden pt-[120px] pb-[280px] md:pt-[150px] xl:pt-[180px] xl:pb-[300px] 2xl:pt-[210px] 2xl:pb-[350px]">
                <div className="container">
                    <Link href="/" className="flex gap-2 sm:gap-3 mb-5 text-gray-8 items-center group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"
                            className="text-body-color group-hover:text-primary transition-all duration-300">
                            <path
                                d="M20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38C29.9411 38 38 29.9411 38 20C38 10.0589 29.9411 2 20 2Z"
                                fill="currentColor"></path>
                            <path
                                d="M12.8041 19.8037C12.4693 20.1384 12.4693 20.6811 12.8041 21.0159L18.2589 26.4707C18.5936 26.8054 19.1363 26.8054 19.4711 26.4707C19.8058 26.136 19.8058 25.5933 19.4711 25.2585L14.6223 20.4098L19.4711 15.5611C19.8058 15.2263 19.8058 14.6836 19.4711 14.3489C19.1363 14.0141 18.5936 14.0141 18.2589 14.3489L12.8041 19.8037ZM29.4102 19.5526L13.4102 19.5526V21.2669L29.4102 21.2669V19.5526Z"
                                fill="white"></path>
                        </svg>
                        <span className="text-gray-8 text-base md:text-lg lg:text-xl leading-10 tracking-tighter">Back</span>
                    </Link>
                    {coin &&
                        <>
                            <CoinDetail token={coin} vlxPrice={vlxPrice} />
                            <div className="flex gap-5 flex-wrap lg:flex-nowrap">
                                <div className="w-full">
                                    <TradingViewWidget coin={coin} />
                                    <Thread param={param} coin={coin} />
                                </div>

                                <div className="lg:max-w-[380px] w-auto">
                                    <TradeForm token={coin} />
                                    <TokenOverview token={coin} />
                                    <Holders param={param} token={coin} />
                                </div>
                            </div>
                        </>
                    }
                </div>
            </section >
        </>
    );
};

export default TokenDetail;