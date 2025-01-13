import Image from "next/image";
import { coinInfo } from "@/types";
import { useEffect, useState } from "react";
import { buyTokens, sellTokens, getTokenAmount } from "@/program/VelasFunContractService";
import { hooks } from "@/connectors/metaMask";
import { errorAlert, warningAlert } from "../ToastGroup";
import { useWeb3React } from "@web3-react/core";
import Spinner from "../Common/Spinner";
import { useData } from "@/contexts/PageContext";

export default function TradeForm({ token }: { token: coinInfo }) {
    const { connector } = useWeb3React();
    const [sol, setSol] = useState<string>('');
    const [isBuy, setIsBuy] = useState<number>(2);
    const [tokenBal, setTokenBal] = useState<number>(0);
    const [isTrading, setIsTrading] = useState<boolean>(false);

    const { useAccount } = hooks;

    const account = useAccount();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isNaN(parseFloat(value))) {
            setSol(value);
        } else if (value === '') {
            setSol('');
        }
    }

    const getBalance = async () => {
        try {
            if (!account) return;
            const balance = await getTokenAmount(account, token.token)
            setTokenBal(balance);
        } catch {
            setTokenBal(0);
        }
    }

    const handleTrade = async () => {
        try {
            if (!connector.provider || !account) {
                errorAlert('Please connect your wallet')
                return;
            }

            if (metaData?.siteKill) {
                warningAlert('Site is stopped to working temporarily.')
            }

            let res = false;
            setIsTrading(true);
            if (isBuy === 2) res = await buyTokens(connector.provider, account, token.token, sol);
            else res = await sellTokens(connector.provider, account, token.token, sol);

            if (!res) errorAlert(isBuy === 2 ? 'Failed to buy tokens' : 'Failed to sell tokens');

            setIsTrading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBalance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connector, account, isTrading]);

    const { metaData } = useData();

    return (
        <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:mt-3 mb-4 border dark:border-gray-700 border-gray-200">
            <div className="flex items-center rounded-md overflow-hidden mb-5 lg:mb-6">
                <div className={`font-syne font-semibold text-sm sm:text-base xl:text-lg  cursor-pointer w-full py-1.5 sm:py-2 px-2 sm:px-2.5 text-nowrap flex justify-center items-center relative border ${isBuy === 2 ? 'bg-green-500 text-white border-green-500' : 'text-gray-500 opacity-50 border-primary'}`} onClick={() => setIsBuy(2)}>Buy</div>
                <div className={`font-syne font-semibold text-sm sm:text-base xl:text-lg cursor-pointer w-full py-1.5 sm:py-2 px-2 sm:px-2.5 text-nowrap flex justify-center items-center relative border ${isBuy === 1 ? 'bg-red-500 text-white border-red-500' : 'text-gray-500 opacity-50 border-primary'}`} onClick={() => setIsBuy(1)}>Sell</div>
            </div>
            <div>
                {isBuy === 2 ?
                    <>
                        {/* <div className="flex items-center justify-between flex-wrap gap-3 pb-2">
                                <button className="text-[10px] font-normal !leading-none text-body-color px-2 pt-1.5 pb-1 border border-primary rounded" onClick={set}>Switch to {isBuy === 2 ? token.name : 'VLX'}</button>
                            </div> */}
                        <div className="mb-1.5 relative">
                            <input type="number" id="token" placeholder="0.0" min="0" className="border dark:border-gray-700 border-gray-200 rounded-md placeholder:text-body-color text-[13px] sm:text-sm lg:text-base !leading-none ps-3 pe-16 sm:pe-20 py-3 w-full focus:outline-0 hide-arrows ng-valid" value={sol} onChange={handleInputChange} />
                            {isBuy === 2 ?
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[13px] sm:text-sm lg:text-base !leading-none font-normal flex gap-1 sm:gap-1.5 items-center">
                                    <span>ETH</span>
                                    <Image src={`/images/Base_Network_Logo.svg`} width={24} height={24} alt="base logo" />
                                </div>
                                :
                                <div className="absolute right-5 top-[16px] text-sm md:text-base font-normal flex gap-1.5 items-center leading-5">
                                    <div className="flex item-center gap-1 rounded-full">
                                        <span className="relative top-[2px] leading-4">{token.ticker}</span>
                                        <Image width={20} height={20} alt="Token Image" className="w-[20px] sm:w-[20px] h-[20px] sm:h-[20px] rounded-full" src={token.url} />
                                    </div>
                                </div>
                            }
                        </div>
                        <div>
                            <div className="">
                                <div className="flex items-center flex-wrap gap-1.5 mb-5 lg:mb-6">
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol('')}>Reset</button>
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol('0.1')}> 0.1 ETH </button>
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol('0.5')}> 0.5 ETH </button>
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol('1')}> 1 ETH </button>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="mb-1.5 relative">
                            <input type="number" id="token" placeholder="0.0" min="0" className="border dark:border-gray-700 border-gray-200 rounded-md placeholder:text-body-color text-[13px] sm:text-sm lg:text-base !leading-none ps-3 pe-16 sm:pe-20 py-3 w-full focus:outline-0 hide-arrows" value={sol} onChange={handleInputChange} />
                            <div className="absolute right-5 top-[16px] text-sm md:text-base font-normal flex gap-1.5 items-center leading-5">
                                <div className="flex item-center gap-1 rounded-full">
                                    <span className="relative top-[2px] leading-4">{token.ticker}</span>
                                    <Image width={20} height={20} alt="Token Image" className="w-[20px] sm:w-[20px] h-[20px] sm:h-[20px] rounded-full" src={token.url} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="">
                                <div className="flex items-center flex-wrap gap-1.5 mb-5 lg:mb-6">
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol('')}>Reset</button>
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol((tokenBal / 4).toString())}> 25% </button>
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol((tokenBal / 2).toString())}> 50% </button>
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol((tokenBal * 3 / 4).toString())}> 75% </button>
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol(tokenBal.toString())}> 100% </button>
                                </div>
                            </div>
                        </div>
                    </>
                }
                <button className={`font-syne font-semibold text-sm sm:text-base xl:text-lg xl:leading-normal text-white opacity-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-500 ease-in-out w-full rounded-md p-2 overflow-hidden ${isBuy === 2 ? 'bg-green-500' : 'bg-red-500'}`} onClick={handleTrade} disabled={isTrading || metaData?.siteKill || (token.tradingPaused && !token.tradingOnUniswap)}>
                    {
                        isTrading ?
                            <Spinner />
                            : 'Place Trade'
                    }
                </button>
            </div>
        </div>
    )
}