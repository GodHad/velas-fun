import Image from "next/image"
import { coinInfo } from "@/types";
import Link from "next/link";

const TokenComponent = ({ token }: { token: coinInfo }) => {
    return (
        <>
            <Link href={`/coin/${token._id}`}>
                <div className="card cursor-pointer">
                    <div className="dark:bg-black bg-white rounded-lg p-2.5 flex flex-col gap-2.5 shadow-md dark:shadow-blue-600">
                        <div className="relative rounded-lg">
                            <div className="bg-primary rounded-t-lg px-2.5 py-1 h-6 flex items-center gap-3 justify-between w-full z-10">
                                <p className="text-white text-xxs-10 font-medium leading-none">
                                    Market cap: ${token.marketcap ? (token.marketcap / 1000).toFixed(1) : 0}k
                                </p>
                                {/* {token.url && (
                                    <p className="flex items-center gap-1">
                                        <span>Badge</span>
                                        <Image src="/images/king.svg" alt="king" width={16} height={16} className="img-fluid w-3 sm:w-4 h-3 sm:h-4" />
                                    </p>
                                )} */}
                            </div>
                            <div className="w-full h-full overflow-hidden">
                                <Image
                                    src={token.url}
                                    alt={token.name}
                                    width={240}
                                    height={176}
                                    className="w-full h-full rounded-b-lg object-cover z-0 left-0 top-0 blur-bg hover:scale-110 transition-[0.5]"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <h2 className="text-xs font-medium line-clamp-1">{token.name} [ticker: {token.ticker}]</h2>
                            <p className="text-body-color text-[11px] font-medium line-clamp-2 h-[calc(2*1rem)]">
                                {token.description}
                            </p>
                        </div>
                        <hr className="border-body-color" />
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 md:gap-2.5">
                                <Image
                                    className="img-fluid w-6 md:w-8 h-6 md:h-8 rounded-full border-body-color border"
                                    src={typeof token.creator !== 'string'  && token.creator.avatar ? token.creator.avatar : '/images/creator-logos/default.png'}
                                    width={32}
                                    height={32}
                                    alt={typeof token.creator !== 'string' && token.creator.name ? token.creator.name : 'Creator Avatar'}
                                />
                                <div className="flex flex-col gap-1">
                                    <p className="text-body-color text-[9px] !leading-none font-normal">Creator</p>
                                    <p className="text-[10px] !leading-none font-medium hover:underline">{typeof token.creator !== 'string' ? token.creator.name : token.creator}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default TokenComponent;