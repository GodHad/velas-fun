import Image from "next/image";
import moment from 'moment';
import { coinInfo } from "@/types";
import Link from "next/link";

export default function CoinDetail({ token }: { token: coinInfo }) {

    const handleCopyAddressClick = () => {
        navigator.clipboard.writeText(token.token);
    }

    return (
        <div className="rounded-xl sm:rounded-2xl p-4 mb-6 border dark:border-gray-700 border-gray-200">
            <div className="flex items-start md:items-center gap-5 xl:gap-6 flex-col md:flex-row">
                <Image width={100} height={100} alt="token image"
                    className="img-fluid w-16 md:w-20 lg:w-24.5 h-16 md:h-20 lg:h-24.5"
                    src={token.url} />
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
                                    {token?.price?.toFixed(9)} USD
                                </p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <p className="text-[9px] font-normal !leading-none text-body-color">Time</p>
                                <p className="text-sm lg:text-base font-medium lg:!leading-none">
                                    {moment(token.date).fromNow()}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1.5">
                                <p className="text-[9px] font-normal !leading-none text-body-color">Market cap</p>
                                <p className="text-sm lg:text-base font-medium lg:!leading-none">${(token.reserveOne / 10_000_000_000_000).toFixed(2)}
                                </p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <p className="text-[9px] font-normal !leading-none text-body-color">Created By</p>
                                <p
                                    className="text-sm lg:text-base font-medium lg:!leading-none hover:underline cursor-pointer">
                                    <Link href={`/profile/${typeof token.creator !== 'string' && token.creator ? token.creator._id : ''}`}>{typeof token.creator !== 'string' && token.creator ? token.creator.name : ''}</Link></p>
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
                                        src={(typeof token.creator !== 'string' && token.creator &&  token.creator.avatar) ? token.creator.avatar : '/images/creator-logos/default.png'}
                                        width={16} height={16} alt={typeof token.creator !== 'string' && token.creator ? token.creator.name : 'Creator name'} />
                                    <span
                                        className="text-sm lg:text-base font-medium lg:!leading-none ps-1.5 inline-flex gap-1 cursor-pointer">
                                        {token.token ? `${token.token.slice(0, 4)}....${token.token.slice(-4)}` : ''}
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
    )
}