import Image from "next/image";
import { coinInfo } from "@/types";
import { useEffect, useState } from "react";
import { buyTokens, sellTokens, getTokenAmount } from "@/program/VelasFunContractService";
import { hooks } from "@/connectors/metaMask";
import { errorAlert, successAlert } from "../ToastGroup";
import { useWeb3React } from "@web3-react/core";
import Spinner from "../Common/Spinner";

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
            if (!account || !connector.provider) return;
            const balance = await getTokenAmount(connector.provider, account, token.token)
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

            let res = false;
            setIsTrading(true);
            if (isBuy === 2) res = await buyTokens(connector.provider, account, token.token, sol);
            else res = await sellTokens(connector.provider, account, token.token, sol);

            if (res) successAlert(isBuy === 2 ? 'Bought tokens successfully' : 'Sold tokens successfully');
            else errorAlert('Failed to buy tokens');

            setIsTrading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBalance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connector, account, isTrading]);

    return (
        <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:mt-3 mb-4 border dark:border-gray-700 border-gray-200">
            <div className="flex items-center border border-primary rounded-md overflow-hidden mb-5 lg:mb-6">
                <div className={`font-syne font-semibold text-sm sm:text-base xl:text-lg  cursor-pointer w-full py-1.5 sm:py-2 px-2 sm:px-2.5 text-nowrap flex justify-center items-center relative ${isBuy === 2 ? 'bg-primary text-white' : 'text-gray-500 opacity-50'}`} onClick={() => setIsBuy(2)}>Buy</div>
                <div className={`font-syne font-semibold text-sm sm:text-base xl:text-lg cursor-pointer w-full py-1.5 sm:py-2 px-2 sm:px-2.5 text-nowrap flex justify-center items-center relative  ${isBuy === 1 ? 'bg-primary text-white' : 'text-gray-500 opacity-50'}`} onClick={() => setIsBuy(1)}>Sell</div>
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
                                    <span>VLX</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 42 42" xmlSpace="preserve">
                                        <path fill="#0037C1" d="M28.9,13.9L21,27.7l-7.9-13.9H28.9z M36.8,9.2H5.2L21,37L36.8,9.2z M0,0l2.6,4.6h36.7L42,0H0z" />
                                    </svg>
                                </div>
                                :
                                <div className="absolute right-5 top-[16px] text-sm md:text-base font-normal flex gap-1.5 items-center leading-5">
                                    <div className="flex item-center gap-1 rounded-full">
                                        <span className="relative top-[2px] leading-4">{token.name}</span>
                                        <Image width={20} height={20} alt="Token Image" className="w-[20px] sm:w-[20px] h-[20px] sm:h-[20px] rounded-full" src={token.url} />
                                    </div>
                                </div>
                            }
                        </div>
                        <div>
                            <div className="">
                                <div className="flex items-center flex-wrap gap-1.5 mb-5 lg:mb-6">
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol('')}>Reset</button>
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol('1')}> 1 VLX </button>
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol('5')}> 5 VLX </button>
                                    <button className="text-[10px] font-normal !leading-none text-body-color pb-1 p-1.5 border border-primary rounded" onClick={() => setSol('10')}> 10 VLX </button>
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
                                    <span className="relative top-[2px] leading-4">{token.name}</span>
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
                <button className="font-syne font-semibold text-sm sm:text-base xl:text-lg xl:leading-normal bg-primary text-white hover:bg-primary opacity-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-500 ease-in-out w-full rounded-md p-2 overflow-hidden" onClick={handleTrade} disabled={isTrading}>
                    {
                        isTrading ?
                            <Spinner />
                            : 'Place trade'
                    }
                </button>
            </div>
        </div>
    )
}