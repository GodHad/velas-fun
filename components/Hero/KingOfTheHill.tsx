'use client'
import { useSocket } from "@/contexts/SocketContext"
import { coinInfo, userInfo } from "@/types"
import { getKingCoin } from "@/utils/api"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const KingOfTheHillMain = ({ vlxPrice }: { vlxPrice: number }) => {
    const [token, setToken] = useState<coinInfo | null>(null)
    const { socket } = useSocket()

    const formatNumber = (num: number, digit: number = 2) => {
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(2).replace(/\.0$/, '') + 'B';
        } else if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(2).replace(/\.0$/, '') + 'M';
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(2).replace(/\.0$/, '') + 'K';
        }
        return num.toFixed(digit);
    }

    useEffect(() => {
        const handleGetKing = async () => {
            const _token = await getKingCoin();
            setToken(_token);
        }

        handleGetKing()
    }, [])

    useEffect(() => {
        const handleKingChanged = (data: coinInfo) => {
            setToken(data);
        }
        socket?.on('king-changed', handleKingChanged);
        return () => {
            socket?.off('king-changed', handleKingChanged);
        }
    }, [socket]);

    if (!token) return null;

    return (
        <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-[24px] font-extrabold mb-2">Top Of the Hill</h1>
            <Link href={`/coin/${token._id}`}>
                <div className="card cursor-pointer sm:w-[320px] w-full">
                    <div className="dark:bg-black bg-white rounded-lg p-2.5 flex gap-2.5 shadow-xl dark:shadow-orange-600">
                        <div className="relative rounded-lg">
                            <div className="w-full h-full overflow-hidden">
                                <Image
                                    src={token.url}
                                    alt={token.name}
                                    width={80}
                                    height={80}
                                    className="w-full rounded object-cover z-0 left-0 top-0 blur-bg hover:scale-110 transition-[0.5]"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 md:gap-2.5">
                                    Created by
                                    <Image
                                        className="img-fluid w-6 md:w-8 h-6 md:h-8 rounded-full border-body-color border"
                                        src={typeof token.creator !== 'string' && token.creator.avatar ? token.creator.avatar : '/images/creator-logos/default.png'}
                                        width={32}
                                        height={32}
                                        alt={typeof token.creator !== 'string' && token.creator.name ? token.creator.name : 'Creator Avatar'}
                                    />
                                    {(token.creator as userInfo).name}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 justify-between w-full z-10">
                                <p className="text-white text-xxs-10 font-medium leading-none">
                                    Market cap: ${formatNumber(vlxPrice * (token.price || 0) * 1_087_598_453)}
                                </p>
                                {token.kingDate && (
                                    <Image src="/images/king.svg" alt="king" width={16} height={16} className="img-fluid w-3 sm:w-4 h-3 sm:h-4" />
                                )}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h2 className="text-xs font-medium line-clamp-1">{token.name} [ticker: {token.ticker}]</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default KingOfTheHillMain