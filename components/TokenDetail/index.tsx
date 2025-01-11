'use client'
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import CoinDetail from "./CoinDetail";
import TradingViewWidget from "./TradingViewWidget";
import { coinInfo } from "@/types";
import { usePathname } from "next/navigation";
import { getCoinInfo } from "@/utils/api";
import Thread from "./Thread";
import TradeForm from "./TradeForm";
import TokenOverview from "./TokenOverview";
import Holders from "./Holders";
import { useSocket } from "@/contexts/SocketContext";
import UserContext from "@/contexts/UserContext";

const TokenDetail = () => {
    const pathname = usePathname();
    const [param, setParam] = useState<string>('');
    const [coin, setCoin] = useState<coinInfo | null>(null);
    const [showing, setShowing] = useState<string>('base');
    const { socket } = useSocket();
    const { vlxPrice } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const segments = pathname.split('/');
            const parameter = segments[segments.length - 1];
            setParam(parameter);
            const data = await getCoinInfo(parameter);
            setCoin(data as coinInfo);
            if (data.tradingOnUniswap) setShowing('current')
        }

        fetchData();
    }, [pathname]);

    useEffect(() => {
        const handleGraduatingToDEX = (data: coinInfo) => {
            if (data._id === pathname) {
                setCoin(data);
                setShowing('current')
            }
        }
        socket?.on('trading-enabled-on-uniswap', handleGraduatingToDEX);

        return () => {
            socket?.off('trading-enabled-on-uniswap');
        }
    }, [socket])

    return (
        <>
            <section id="home"
                className="dark:bg-gray-dark bg-white relative z-10 overflow-hidden pt-[100px] pb-[60px]">
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
                                    {coin.tradingOnUniswap &&
                                        <div className="tabs mt-4">
                                            <div className="flex items-center gap-2 pb-4">
                                                <div className={`font-semibold text-xs leading-none cursor-pointer w-24 sm:w-28 pb-2 pt-2 px-4 text-center flex justify-center items-center transition-colors duration-300 rounded ${showing === 'base' ? 'bg-primary text-white' : 'text-gray-500'}`} onClick={() => setShowing('base')}> BluePill Chart </div>
                                                <div className={`font-semibold text-xs leading-none cursor-pointer w-24 sm:w-28 pb-2 pt-2 px-4 text-center flex justify-center items-center transition-colors duration-300 rounded ${showing === 'current' ? 'bg-primary text-white' : 'text-gray-500'}`} onClick={() => setShowing('current')}> Current Chart</div>
                                            </div>
                                        </div>
                                    }
                                    {coin.tradingOnUniswap && showing === 'current' &&
                                        <>
                                            <iframe id="dextools-widget" title="DEXTools Trading Chart" width={"100%"} height={"400"} src={`https://www.dextools.io/widget-chart/en/base/pe-light/${coin.uniswapPair}?theme=dark`} />
                                        </>
                                    }
                                    {showing === 'base' && <TradingViewWidget coin={coin} />}
                                    <Thread param={param} coin={coin} />
                                </div>

                                <div className="lg:max-w-[380px] w-full">
                                    <TradeForm token={coin} />
                                    <TokenOverview token={coin} vlxPrice={vlxPrice} />
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