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

            if (res) successAlert('Sell tokens successfully');
            else errorAlert('Failed to buy tokens');

            setIsTrading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBalance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connector, account]);

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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" className="w-4 sm:w-5 h-4 sm:h-5"><rect x="0.571289" width="20" height="20" rx="10" fill="#8247E5"></rect>
                                        <mask id="mask0_508_7931" maskUnits="userSpaceOnUse" x="4" y="4" width="13" height="12" style={{ maskType: 'luminance' }}>
                                            <path d="M16.5869 4.79248H4.58691V15.3082H16.5869V4.79248Z" fill="white"></path>
                                        </mask>
                                        <g mask="url(#mask0_508_7931)">
                                            <path d="M13.6473 7.99427C13.4275 7.86818 13.1465 7.86818 12.8979 7.99427L11.1471 9.03179L9.95827 9.69105L8.23987 10.725C8.02012 10.8511 7.73912 10.8511 7.49055 10.725L6.14681 9.90721C5.92705 9.78112 5.77214 9.52894 5.77214 9.24794V7.67724C5.77214 7.42507 5.89823 7.17649 6.14681 7.01798L7.49055 6.23263C7.7103 6.10654 7.9913 6.10654 8.23987 6.23263L9.58361 7.05041C9.80337 7.17649 9.95827 7.42867 9.95827 7.70967V8.74719L11.1471 8.05551V6.98916C11.1471 6.73699 11.021 6.48841 10.7724 6.3299L8.27229 4.85287C8.05254 4.72678 7.77154 4.72678 7.52297 4.85287L4.96158 6.36232C4.713 6.48841 4.58691 6.74059 4.58691 6.98916V9.93963C4.58691 10.1918 4.713 10.4404 4.96158 10.5989L7.49415 12.0759C7.7139 12.202 7.9949 12.202 8.24347 12.0759L9.96188 11.0708L11.1507 10.3791L12.8691 9.37403C13.0889 9.24794 13.3699 9.24794 13.6184 9.37403L14.9622 10.1594C15.1819 10.2855 15.3368 10.5376 15.3368 10.8186V12.3893C15.3368 12.6415 15.2107 12.8901 14.9622 13.0486L13.6509 13.834C13.4311 13.96 13.1501 13.96 12.9015 13.834L11.5542 13.0486C11.3344 12.9225 11.1795 12.6703 11.1795 12.3893V11.3842L9.9907 12.0759V13.1135C9.9907 13.3656 10.1168 13.6142 10.3654 13.7727L12.8979 15.2497C13.1177 15.3758 13.3987 15.3758 13.6473 15.2497L16.1798 13.7727C16.3996 13.6466 16.5545 13.3944 16.5545 13.1135V10.1306C16.5545 9.87839 16.4284 9.62981 16.1798 9.4713L13.6473 7.99427Z" fill="white"></path>
                                        </g>
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