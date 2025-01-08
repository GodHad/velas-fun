import { useEffect, useState } from "react";
import { userInfo, recordInfo, coinInfo } from "@/types";
import { getRecordByCoin } from "@/utils/api";
import { useSocket } from "@/contexts/SocketContext";

interface holderInfo {
    holder: {
        name: string;
        wallet: string;
        bondingCurve?: boolean;
        dev?: boolean;
    };
    totalAmount: number;
}

interface backendRecordInfo {
    token: coinInfo;
    user: userInfo;
    isBuy: number;
    amount: number;
    price: number;
    tx: string;
    feePercent: number;
}

export default function Holders({ param, token }: { param: string | null, token: coinInfo }) {
    const [holders, setHolders] = useState<holderInfo[]>([]);
    const [records, setRecords] = useState<recordInfo[]>([]);
    const { socket } = useSocket();

    useEffect(() => {
        const fetchData = async () => {
            if (param) {
                const data = await getRecordByCoin(param);
                setRecords(data);
            }
        }

        fetchData();
    }, [param]);

    useEffect(() => {
        const holderCalc = (records: recordInfo[]): holderInfo[] => {
            const aggregation = records.reduce((acc, record) => {
                const { holder } = record;

                if (!acc[holder.name]) {
                    acc[holder.name] = {
                        holder: {
                            name: holder.name,
                            wallet: holder.wallet,
                            dev: holder._id === (token.creator as userInfo)._id
                        },
                        totalAmount: 0,
                    } as holderInfo
                }

                if (record.holdingStatus === 2)
                    acc[holder.name].totalAmount += record.amount / record.price;
                else acc[holder.name].totalAmount -= record.amount / 1_000_000;
                return acc;
            }, {} as Record<string, holderInfo>);
            return Object.values(aggregation);
        }

        const agr = holderCalc(records);
        const bondingCurve: holderInfo = {
            holder: {
                name: token.token.slice(0, 6),
                wallet: token.token,
                bondingCurve: true
            },
            totalAmount: 1_087_598_453 - token.reserveOne / 1_000_000
        }
        setHolders([bondingCurve, ...agr].sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 20));
    }, [records]);

    useEffect(() => {
        const handleNewRecord = (data: backendRecordInfo) => {
            if (data.token._id !== param) return ;
            const newRecord: recordInfo = {
                holder: data.user,
                holdingStatus: data.isBuy,
                time: new Date(),
                amount: data.amount, 
                price: data.price,
                tx: data.tx,
                feePercent: data.feePercent
            }
            setRecords(prevState => ([newRecord, ...prevState]));
        }
        socket?.on('transaction', handleNewRecord);
        
        return () => {
            socket?.off('transaction', handleNewRecord);
        }
    }, [socket]);

    return (
        <div className=" rounded-xl sm:rounded-2xl divide-y dark:divide-gray-700 divide-gray-200 border dark:border-gray-700 border-gray-200">
            <div className="p-4 py-3 flex items-center justify-between gap-3 flex-wrap xl:flex-nowrap">
                <h4 className="text-[15px] md:text-base xl:text-lg font-semibold !leading-none">Holders Distribution</h4>
                {/* <button className="text-xs font-medium xl:!leading-none rounded-md text-white bg-primary hover:bg-primary border border-primary transition-all duration-500 ease-in-out pb-1.5 sm:pb-2 pt-2 sm:pt-2.5 xl:py-2.5 p-2">Generate Bubble Map</button> */}
            </div>
            {holders && holders.map((holder, index) => (
                <div className="px-4 py-4 flex items-center justify-between gap-3" key={'holder' + index}>
                    <a href={`https://solscan.io/address/${holder.holder.wallet}`} className="text-sm lg:text-base font-medium text-body-color !leading-5 xl:!leading-none">
                        {index + 1}. <span className="text-yellow hover:underline cursor-pointer">{holder.holder.name} {holder.holder.dev ? '(dev)' : ''} {holder.holder.bondingCurve ? '(bonding curve)' : ''}</span>
                    </a>
                    <p className="text-sm lg:text-base font-medium !leading-5 xl:!leading-none"> {Math.floor(Math.abs((holder.totalAmount / 1_087_598_453) * 10000)) / 100}% </p>
                </div>
            ))}
        </div>
    )
}