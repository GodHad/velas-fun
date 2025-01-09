import { coinInfo, userInfo } from "@/types";
import Image from "next/image";

interface CoinBlogProps {
    coin: coinInfo;
    componentKey: string;
    vlxPrice: number;
}

export const CoinBlog: React.FC<CoinBlogProps> = ({ coin, componentKey, vlxPrice }) => {
    return (
        <div className="flex w-[380px] items-center hover:border-collapse pt-2 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
            <Image width={110} height={110} src={coin?.url} alt="image" className="px-3" />
            {/* <img src="/bonkz10157.png" alt="" className="w-[110px]  px-3" /> */}
            <div>
                <div className="flex">
                    <div className="flex items-center gap-1">Created by <Image src={(coin.creator as userInfo)?.avatar || '/images/creator-logos/default.png'} width={16} height={16} alt="avatar" /></div>
                    <div className="hover:border-slate-300 border-slate-600 border-b-2">
                        {(coin?.creator as userInfo)?.name}
                    </div>
                </div>
                <div>market cap: ${((coin.price || 0) * 1_000_000_000 * vlxPrice).toFixed(2)} {coin.kingDate && `[badge:👑]`}</div>
                <div>replies: {coin?.replies || 0}</div>
                <div>
                    {coin?.name} [ticker: {coin?.ticker}]
                </div>

                {componentKey === "coin" ? (
                    coin?.description && <div>{coin?.description}</div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
