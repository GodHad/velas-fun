import { useEffect, useState } from "react";
import Image from "next/image";
import { coinInfo } from "@/types";

export default function TokenOverview({ token }: { token: coinInfo }) {
    const [progress, setProgress] = useState<number>(60);

    useEffect(() => {
        const value = Math.floor(token.reserveOne / 10_000_000_000_000)
        setProgress(100 - value)
    }, [token, setProgress])
    return (
        <>
            <div className="bg-gray-2 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 border dark:border-gray-700 border-gray-200">
                <h4 className="text-sm md:text-base font-semibold !leading-none pb-4 md:pb-5">Bonding curve progress : {progress}%</h4>
                <div className="bg-body-color w-full rounded-md h-2 md:h-2.5 mb-4 md:mb-5">
                    <div className="bg-primary rounded-md h-2 md:h-2.5" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-[10px] font-normal leading-normal"> When the market cap reaches $65,534 all the liquidity from the bonding curve will be deposited into BX Dex and burned. progression increases as the price goes up. </p>
                    <p className="text-[10px] font-normal leading-normal"> There are {token.reserveOne} tokens still available for sale in the bonding curve and there is {token.reserveTwo / 1000_000_000 - 30} VLX in the bonding curve. </p>
                </div>
            </div>
            <div className="bg-gray-2 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 border dark:border-gray-700 border-gray-200">
                <h4 className="text-[15px] md:text-base xl:text-lg font-semibold !leading-none mb-3.5">Overview</h4>
                <div>
                    <div className="flex flex-wrap items-center gap-5 pb-4 sm:pb-5">
                        <Image className="img-fluid w-16 md:w-20 h-16 md:h-20" src={token.url} alt="coin image" width={80} height={80} />
                        <div className="flex flex-col gap-2.5">
                            <div className="flex flex-col gap-1.5">
                                <p className="text-xs font-normal text-body-color !leading-none">Coin name</p>
                                <p className="text-sm lg:text-base font-medium leading-normal xl:!leading-none">{token.name}</p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <p className="text-xs font-normal text-body-color !leading-none">Ticker</p>
                                <p className="text-sm lg:text-base font-medium !leading-none">{token.ticker}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-normal text-body-color !leading-none pb-2">Description</p>
                        <p className="text-xs font-normal">
                            {token.description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}