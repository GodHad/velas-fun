'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Token } from "@/types/token";
import { users } from "@/utils/statics";
import moment from "moment";
import TradingViewWidget from "./TradingViewWidget";

const TokenDetail = ({ token }: { token: Token }) => {
    const router = useRouter();
    const [showing, setShowing] = useState<string>('thread')

    const handleCopyAddressClick = () => {
        navigator.clipboard.writeText(token.address);
    }

    const user = users.find(user => user.id === token.creator);

    const [trade, setTrade] = useState<string>('buy');

    return (
        <>
            <section id="home"
                className="dark:bg-gray-dark bg-white relative z-10 overflow-hidden pt-[120px] pb-[280px] md:pt-[150px] xl:pt-[180px] xl:pb-[300px] 2xl:pt-[210px] 2xl:pb-[350px]">
                <div className="container">
                    <a className="flex gap-2 sm:gap-3 mb-5 text-gray-8 items-center group cursor-pointer" onClick={() =>
                        router.back()}>
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
                    </a>
                    <div className="rounded-xl sm:rounded-2xl p-4 mb-6 border dark:border-gray-700 border-gray-200">
                        <div className="flex items-start md:items-center gap-5 xl:gap-6 flex-col md:flex-row">
                            <Image width={100} height={100} alt="token image"
                                className="img-fluid w-16 md:w-20 lg:w-24.5 h-16 md:h-20 lg:h-24.5"
                                src={`/images/token-logos/${token.logo}`} />
                            <div className="flex items-start gap-5 xl:gap-6 flex-wrap lg:flex-nowrap w-calc124">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 w-full">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-1.5">
                                            <p className="text-[9px] font-normal !leading-none text-body-color">Coin name</p>
                                            {token.website ?
                                                <a href={token.website} target="_blank">
                                                    <p className="text-sm lg:text-base font-medium lg:!leading-none text-primary">
                                                        {token.name}
                                                    </p>
                                                </a>
                                                :
                                                <p className="text-sm lg:text-base font-medium lg:!leading-none">{token.name}
                                                </p>
                                            }
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <p className="text-[9px] font-normal !leading-none text-body-color">Ticker</p>
                                            <p className="text-sm lg:text-base font-medium lg:!leading-none">{token.ticker}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-1.5">
                                            <p className="text-[9px] font-normal !leading-none text-body-color">Price</p>
                                            <p className="text-sm lg:text-base font-medium lg:!leading-none text-green-1">
                                                {new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 9,
                                                    maximumFractionDigits: 18
                                                }).format(token.price)} USD
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <p className="text-[9px] font-normal !leading-none text-body-color">Time</p>
                                            <p className="text-sm lg:text-base font-medium lg:!leading-none">
                                                {moment(token.createdAt).fromNow()}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-1.5">
                                            <p className="text-[9px] font-normal !leading-none text-body-color">Market cap</p>
                                            <p className="text-sm lg:text-base font-medium lg:!leading-none">${token.marketCap}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <p className="text-[9px] font-normal !leading-none text-body-color">Created By</p>
                                            <p
                                                className="text-sm lg:text-base font-medium lg:!leading-none hover:underline cursor-pointer">
                                                {token.creator}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="token-social-share flex gap-3.5">
                                            {token.telegram &&
                                                <a target="_blank" className="transition-all duration-500 ease-in-out"
                                                    href={token.telegram}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                        viewBox="0 0 32 32" fill="none"
                                                        className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8">
                                                        <rect x="0.3398" y="0.3398" width="31.3204" height="31.3204" rx="15.6602"
                                                            fill="#4A6CF7" fillOpacity="0.5"></rect>
                                                        <rect x="0.3398" y="0.3398" width="31.3204" height="31.3204" rx="15.6602"
                                                            stroke="#4A6CF7" strokeWidth="0.679601"></rect>
                                                        <path
                                                            d="M13.2169 18.1019L12.9459 21.9133C13.3336 21.9133 13.5015 21.7468 13.7028 21.5468L15.5205 19.8097L19.2869 22.5679C19.9776 22.9529 20.4643 22.7502 20.6506 21.9324L23.1229 10.348L23.1236 10.3473C23.3427 9.32616 22.7543 8.92686 22.0813 9.17736L7.54956 14.7409C6.5578 15.1259 6.57281 15.6788 7.38096 15.9293L11.0961 17.0849L19.7258 11.6851C20.1319 11.4162 20.5012 11.565 20.1974 11.8339L13.2169 18.1019Z"
                                                            fill="white"></path>
                                                    </svg>
                                                </a>
                                            }
                                            {token.twitter &&
                                                <a target="_blank" className="transition-all duration-500 ease-in-out"
                                                    href={token.twitter}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                        viewBox="0 0 32 32" fill="none"
                                                        className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8">
                                                        <path
                                                            d="M0.3398 16C0.3398 7.35111 7.35111 0.3398 16 0.3398C24.6489 0.3398 31.6602 7.35111 31.6602 16C31.6602 24.6489 24.6489 31.6602 16 31.6602C7.35111 31.6602 0.3398 24.6489 0.3398 16Z"
                                                            fill="#4A6CF7" fillOpacity="0.5"></path>
                                                        <path
                                                            d="M0.3398 16C0.3398 7.35111 7.35111 0.3398 16 0.3398C24.6489 0.3398 31.6602 7.35111 31.6602 16C31.6602 24.6489 24.6489 31.6602 16 31.6602C7.35111 31.6602 0.3398 24.6489 0.3398 16Z"
                                                            stroke="#4A6CF7" strokeWidth="0.679601"></path>
                                                        <path
                                                            d="M17.4951 14.6773L23.5933 7.74634H22.1482L16.8531 13.7644L12.6239 7.74634H7.74609L14.1414 16.8467L7.74609 24.1149H9.19126L14.783 17.7596L19.2493 24.1149H24.1272L17.4951 14.6773ZM15.5157 16.9269L14.8677 16.0207L9.71197 8.81003H11.9317L16.0924 14.6293L16.7404 15.5355L22.1489 23.0996H19.9292L15.5157 16.9269Z"
                                                            fill="white"></path>
                                                    </svg>
                                                </a>
                                            }
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p className="text-[9px] font-normal !leading-none text-body-color">Token Address
                                            </p>
                                            <a className="flex items-center group">
                                                <Image
                                                    className="img-fluid w-6 md:w-8 h-6 md:h-8 rounded-full border-body-color border"
                                                    src={user && user.logo ? user.logo : '/images/creator-logos/default.png'}
                                                    width={16} height={16} alt={user ? user.username : 'Creator name'} />
                                                <span
                                                    className="text-sm lg:text-base font-medium lg:!leading-none ps-1.5 inline-flex gap-1 cursor-pointer">
                                                    {token.address.slice(0, 4)}....{token.address.slice(-4)}
                                                    <div onClick={handleCopyAddressClick}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"
                                                            viewBox="0 0 14 15" fill="none">
                                                            <path
                                                                d="M5.25 9.25C5.25 7.6001 5.25 6.77515 5.76256 6.26256C6.27515 5.75 7.1001 5.75 8.75 5.75H9.33333C10.9832 5.75 11.8082 5.75 12.3208 6.26256C12.8333 6.77515 12.8333 7.6001 12.8333 9.25V9.83333C12.8333 11.4832 12.8333 12.3082 12.3208 12.8208C11.8082 13.3333 10.9832 13.3333 9.33333 13.3333H8.75C7.1001 13.3333 6.27515 13.3333 5.76256 12.8208C5.25 12.3082 5.25 11.4832 5.25 9.83333V9.25Z"
                                                                stroke="#A4A4A4" strokeLinecap="round" strokeLinejoin="round"
                                                                className="transition-all duration-500 ease-in-out group-hover:stroke-primary">
                                                            </path>
                                                            <path
                                                                d="M9.91791 5.74996C9.91651 4.02499 9.89043 3.1315 9.3883 2.51971C9.29135 2.40156 9.18303 2.29323 9.0649 2.19627C8.4195 1.66663 7.46068 1.66663 5.54297 1.66663C3.62527 1.66663 2.66642 1.66663 2.02105 2.19627C1.9029 2.29323 1.79457 2.40156 1.69761 2.51971C1.16797 3.16508 1.16797 4.12393 1.16797 6.04163C1.16797 7.95933 1.16797 8.91816 1.69761 9.56356C1.79457 9.68168 1.9029 9.79001 2.02105 9.88696C2.63284 10.3891 3.52633 10.4152 5.2513 10.4166"
                                                                stroke="#A4A4A4" strokeLinecap="round" strokeLinejoin="round"
                                                                className="transition-all duration-500 ease-in-out group-hover:stroke-primary">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 flex-wrap lg:flex-nowrap">
                        <div className="w-full">
                            <TradingViewWidget />
                            <div className="tabs mt-4">
                                <div className="flex items-center gap-2 pb-4">
                                    <div className={`font-semibold text-xs leading-none cursor-pointer w-24 sm:w-28 pb-2 pt-2 px-4 text-center flex justify-center items-center transition-colors duration-300 rounded ${showing === 'thread' ? 'bg-primary text-white' : 'text-gray-500'}`} onClick={() => setShowing('thread')}> Thread </div>
                                    <div className={`font-semibold text-xs leading-none cursor-pointer w-24 sm:w-28 pb-2 pt-2 px-4 text-center flex justify-center items-center transition-colors duration-300 rounded ${showing === 'trades' ? 'bg-primary text-white' : 'text-gray-500'}`} onClick={() => setShowing('trades')}> Trades </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div>
                                    <div className="dark:bg-gray-800 bg-gray-100 rounded-xl sm:rounded-2xl flex flex-col gap-5 lg:gap-6 p-4 sm:p-5">
                                        <div className="flex flex-col gap-3 lg:gap-4">
                                            <div className="flex flex-col gap-2">
                                                <a className="flex items-center group text-sm lg:text-base font-normal">
                                                    <Image alt="token-id" className="img-fluid w-5 h-5" src={user?.logo ? user?.logo : '/images/creator-logos/default.png'} width={16} height={16} />
                                                    <div className="flex gap-3">
                                                        <span className="text-yellow hover:text-yellow-500 ps-1.5 inline-flex gap-1 transition-all duration-500 ease-in-out hover:underline cursor-pointer"> 0x2d74 </span>
                                                        <span className="text-body-color">Nov 28, 2024, 02:20:30</span>
                                                        <span className="text-body-color">674819bd46d37c437bf50ffd</span>
                                                    </div>
                                                </a>
                                                <div className="flex gap-4">
                                                    <span className="text-md font-semibold"> Hello </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <button className="text-sm lg:text-base font-medium text-gray-200 bg-body-color px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 rounded-2xl sm:rounded-20">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" className="size-6 ml-1" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                                                    </svg>
                                                    <span>0</span>
                                                </button>
                                                <button className="">Reply</button>
                                            </div>
                                            <hr className="border-black-5.1.1" />
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-primary text-white rounded-md py-2 px-4">Post a reply</button>
                            </div>
                        </div>
                        <div className="lg:max-w-[380px] w-auto">
                            <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:mt-3 mb-4 border dark:border-gray-700 border-gray-200">
                                <div className="flex items-center border border-primary rounded-md overflow-hidden mb-5 lg:mb-6">
                                    <div className={`font-syne font-semibold text-sm sm:text-base xl:text-lg  cursor-pointer w-full py-1.5 sm:py-2 px-2 sm:px-2.5 text-nowrap flex justify-center items-center relative ${trade === 'buy' ? 'bg-primary text-white' : 'text-gray-500 opacity-50'}`} onClick={() => setTrade('buy')}>Buy</div>
                                    <div className={`font-syne font-semibold text-sm sm:text-base xl:text-lg cursor-pointer w-full py-1.5 sm:py-2 px-2 sm:px-2.5 text-nowrap flex justify-center items-center relative  ${trade === 'sell' ? 'bg-primary text-white' : 'text-gray-500 opacity-50'}`} onClick={() => setTrade('sell')}>Sell</div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between flex-wrap gap-3 pb-2">
                                        <button className="text-[10px] font-normal !leading-none text-body-color px-2 pt-1.5 pb-1 border border-primary rounded">Switch to BENJI</button>
                                    </div>
                                    <div className="mb-1.5 relative">
                                        <input type="number" id="token" placeholder="0.0" min="0" className="border dark:border-gray-700 border-gray-200 rounded-md placeholder:text-body-color text-[13px] sm:text-sm lg:text-base !leading-none ps-3 pe-16 sm:pe-20 py-3 w-full focus:outline-0 hide-arrows ng-valid" />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[13px] sm:text-sm lg:text-base !leading-none font-normal flex gap-1 sm:gap-1.5 items-center">
                                            <span>POL</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" className="w-4 sm:w-5 h-4 sm:h-5"><rect x="0.571289" width="20" height="20" rx="10" fill="#8247E5"></rect>
                                                <mask id="mask0_508_7931" maskUnits="userSpaceOnUse" x="4" y="4" width="13" height="12" style={{ maskType: 'luminance' }}>
                                                    <path d="M16.5869 4.79248H4.58691V15.3082H16.5869V4.79248Z" fill="white"></path>
                                                </mask>
                                                <g mask="url(#mask0_508_7931)">
                                                    <path d="M13.6473 7.99427C13.4275 7.86818 13.1465 7.86818 12.8979 7.99427L11.1471 9.03179L9.95827 9.69105L8.23987 10.725C8.02012 10.8511 7.73912 10.8511 7.49055 10.725L6.14681 9.90721C5.92705 9.78112 5.77214 9.52894 5.77214 9.24794V7.67724C5.77214 7.42507 5.89823 7.17649 6.14681 7.01798L7.49055 6.23263C7.7103 6.10654 7.9913 6.10654 8.23987 6.23263L9.58361 7.05041C9.80337 7.17649 9.95827 7.42867 9.95827 7.70967V8.74719L11.1471 8.05551V6.98916C11.1471 6.73699 11.021 6.48841 10.7724 6.3299L8.27229 4.85287C8.05254 4.72678 7.77154 4.72678 7.52297 4.85287L4.96158 6.36232C4.713 6.48841 4.58691 6.74059 4.58691 6.98916V9.93963C4.58691 10.1918 4.713 10.4404 4.96158 10.5989L7.49415 12.0759C7.7139 12.202 7.9949 12.202 8.24347 12.0759L9.96188 11.0708L11.1507 10.3791L12.8691 9.37403C13.0889 9.24794 13.3699 9.24794 13.6184 9.37403L14.9622 10.1594C15.1819 10.2855 15.3368 10.5376 15.3368 10.8186V12.3893C15.3368 12.6415 15.2107 12.8901 14.9622 13.0486L13.6509 13.834C13.4311 13.96 13.1501 13.96 12.9015 13.834L11.5542 13.0486C11.3344 12.9225 11.1795 12.6703 11.1795 12.3893V11.3842L9.9907 12.0759V13.1135C9.9907 13.3656 10.1168 13.6142 10.3654 13.7727L12.8979 15.2497C13.1177 15.3758 13.3987 15.3758 13.6473 15.2497L16.1798 13.7727C16.3996 13.6466 16.5545 13.3944 16.5545 13.1135V10.1306C16.5545 9.87839 16.4284 9.62981 16.1798 9.4713L13.6473 7.99427Z" fill="white"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="text-[15px] font-medium leading-none">
                                    </div>
                                    <br />
                                    <div>
                                        <div className="">
                                            <div className="flex items-center flex-wrap gap-1.5 mb-5 lg:mb-6">
                                                <button className="text-[10px] font-normal !leading-none text-gray-1 pb-1 p-1.5 border border-primary rounded">Reset</button>
                                                <button className="text-[10px] font-normal !leading-none text-gray-1 pb-1 p-1.5 border border-primary rounded"> 1 POL </button>
                                                <button className="text-[10px] font-normal !leading-none text-gray-1 pb-1 p-1.5 border border-primary rounded"> 5 POL </button>
                                                <button className="text-[10px] font-normal !leading-none text-gray-1 pb-1 p-1.5 border border-primary rounded"> 10 POL </button>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <button className="font-syne font-semibold text-sm sm:text-base xl:text-lg xl:leading-normal bg-primary text-white hover:bg-primary opacity-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-500 ease-in-out w-full rounded-md p-2">Place trade </button>
                                </div>
                            </div>
                            <div className="bg-gray-2 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 border dark:border-gray-700 border-gray-200">
                                <h4 className="text-sm md:text-base font-semibold !leading-none pb-4 md:pb-5">Bonding curve progress : 100.00%</h4>
                                <div className="bg-body-color w-full rounded-md h-2 md:h-2.5 mb-4 md:mb-5">
                                    <div className="bg-primary rounded-md h-2 md:h-2.5" style={{ width: "100%" }}></div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[10px] font-normal leading-normal"> When the market cap reaches $0 all the liquidity from the bonding curve will be deposited into BX Dex and burned. progression increases as the price goes up. </p>
                                    <p className="text-[10px] font-normal leading-normal"> There are 0 tokens still available for sale in the bonding curve and there is 0 POL in the bonding curve. </p>
                                </div>
                            </div>
                            <div className="bg-gray-2 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 border dark:border-gray-700 border-gray-200">
                                <h4 className="text-[15px] md:text-base xl:text-lg font-semibold !leading-none mb-3.5">Overview</h4>
                                <div>
                                    <div className="flex flex-wrap items-center gap-5 pb-4 sm:pb-5">
                                        <Image className="img-fluid w-16 md:w-20 h-16 md:h-20" src={'/images/token-logos' + token.logo} alt="coin image" width={80} height={80} />
                                        <div className="flex flex-col gap-2.5">
                                            <div className="flex flex-col gap-1.5">
                                                <p className="text-xs font-normal text-body-color !leading-none">Coin name</p>
                                                <p className="text-sm lg:text-base font-medium leading-normal xl:!leading-none">Basenji</p>
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <p className="text-xs font-normal text-body-color !leading-none">Ticker</p>
                                                <p className="text-sm lg:text-base font-medium !leading-none">BENJI</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-normal text-body-color !leading-none pb-2">Description</p>
                                        <p className="text-xs font-normal text-gray-3">
                                            The live Basenji price today is $0.036905 USD with a 24-hour trading volume of $1,928,458 USD. We update our BENJI to USD price in real-time. Basenji is down 4.40% in the last 24 hours. The current CoinMarketCap ranking is #749, with a live market cap of $34,028,427 USD. It has a circulating supply of 922,044,870 BENJI coins and a max. supply of 1,000,000,000 BENJI coins.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-2 rounded-xl sm:rounded-2xl divide-y dark:divide-gray-700 divide-gray-200 border dark:border-gray-700 border-gray-200">
                                <div className="p-4 py-3 flex items-center justify-between gap-3 flex-wrap xl:flex-nowrap">
                                    <h4 className="text-[15px] md:text-base xl:text-lg font-semibold text-white !leading-none">Holders Distribution</h4>
                                    <button className="text-xs font-medium xl:!leading-none rounded-md text-white bg-primary hover:bg-primary border border-primary transition-all duration-500 ease-in-out pb-1.5 sm:pb-2 pt-2 sm:pt-2.5 xl:py-2.5 p-2">Generate Bubble Map</button>
                                </div>
                                <div className="px-4 py-4 sm:pt-18 sm:pb-17 flex items-center justify-between gap-3">
                                    <p className="text-sm lg:text-base font-medium text-body-color !leading-5 xl:!leading-none">
                                        1. <span className="text-yellow hover:underline cursor-pointer"> 0xRubeth</span>
                                        <span>(Dev)</span>
                                    </p>
                                    <p className="text-sm lg:text-base font-medium text-white !leading-5 xl:!leading-none"> 100.00% </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default TokenDetail;