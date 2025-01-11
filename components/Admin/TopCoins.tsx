'use client'
import UserContext from "@/contexts/UserContext";
import { getTop5Coins } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";

type Coin = {
    id: string;
    name: string;
    image: string;
    holders: number;
    marketcap: number;
    transactions: number;
    price: number;
};

const TopCoins = () => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const { vlxPrice } = useContext(UserContext);

    const getTop5CoinsMutaion = useMutation(getTop5Coins, {
        onSuccess: (data) => {
            setCoins(data);
        }
    })

    useEffect(() => {
        getTop5CoinsMutaion.mutate();
    }, [])

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Top Coins
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm  dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Coin
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Holders
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Market Cap($)
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Price(ETH)
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Transactions
                        </h5>
                    </div>
                </div>

                {coins.map((coin, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${key === coins.length - 1
                            ? ''
                            : 'border-b border-stroke dark:border-strokedark'
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <div className="flex-shrink-0">
                                <Image className="rounded-full h-12 w-12 object-contain" src={coin.image} alt="Brand" width={48} height={48} />
                            </div>
                            <Link href={'/coin/' + coin.id}>
                                <p className="hidden text-primary underline sm:block">
                                    {coin.name}
                                </p>
                            </Link>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{coin.holders}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">{(vlxPrice * coin.marketcap).toFixed(2)}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-meta-5">{coin.price.toFixed(9)}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white">{coin.transactions}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCoins;
