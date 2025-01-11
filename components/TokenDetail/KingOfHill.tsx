'use client';
import { useState, useEffect } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { coinInfo } from "@/types";
import moment from "moment";
import Image from "next/image";
import { useData } from "@/contexts/PageContext";

const KingOfHill = ({ token, vlxPrice }: { token: coinInfo, vlxPrice: number }) => {
    const [progress, setProgress] = useState<number>(60);
    const { socket } = useSocket();
    const [_token, setToken] = useState<coinInfo>(token);

    const { metaData } = useData()

    useEffect(() => {
        const value = Math.floor((_token.price || 0) * 1_000_000_000 / ((token.graduationMarketCap || 5) * ((metaData?.kingPercent || 50) / 100)) * 100)
        setProgress(value);
    }, [_token, setProgress]);

    useEffect(() => {
        const handleUpdateBondingCurve = (
            data: {
                tokenId: string,
                price: number
            }
        ) => {
            console.log(data)
            if (_token._id === data.tokenId) {
                const value = Math.floor(((data.price || 0) * 1_000_000_000) / ((token.graduationMarketCap || 5) * ((metaData?.kingPercent || 50) / 100)) * 100)
                setProgress(value);
                setToken(prevState => ({ ...prevState, price: data.price }))
            }
        }
        const handleKingChanged = (data: coinInfo) => {
            console.log(data);
            if (data._id === token._id) {
                setToken(data);
            }
        }
        socket?.on('update-bonding-curve', handleUpdateBondingCurve);
        socket?.on('king-changed', handleKingChanged);
        return () => {
            socket?.off('update-bonding-curve', handleUpdateBondingCurve);
            socket?.off('king-changed', handleKingChanged);
        }
    }, [socket]);

    return (
        <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:mt-3 mb-4 border dark:border-gray-700 border-gray-200">
            <h4 className="text-sm md:text-base font-semibold !leading-none pb-4 md:pb-5">Alpha progress : {Math.min(progress, 100)}%</h4>
            <div className="bg-body-color w-full rounded-md h-2 md:h-2.5 mb-4 md:mb-5">
                <div className="bg-primary rounded-md h-2 md:h-2.5" style={{ width: `${Math.min(progress, 100)}%` }}></div>
            </div>
            <div>
                {_token.kingDate ?
                    <p className="text-xs font-normal leading-normal flex gap-1">
                        <Image src="/images/king.svg" width="16" height="16" alt="king" />
                        Crowned the alpha on {moment(_token.kingDate).format('MM/DD/YYYY, hh:mm:ss A')}
                    </p>
                    :
                    <p className="text-xs font-normal leading-normal">
                        Dethrone the current alpha at ${(vlxPrice / 2 * (_token.graduationMarketCap || 5)).toLocaleString()} market cap
                    </p>
                }
            </div>
        </div>
    )
}

export default KingOfHill;