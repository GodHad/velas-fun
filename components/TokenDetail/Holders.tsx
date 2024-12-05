import { useEffect, useState } from "react";
import { userInfo, tradeInfo, recordInfo } from "@/types";
import { getTradeByCoin } from "@/utils/api";

interface holderInfo {
    holder: userInfo;
    totalAmount: number;
}

export default function Holders({ param }: { param: string | null }) {
    const [holders, setHolders] = useState<holderInfo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (param) {
                const data: tradeInfo = await getTradeByCoin(param);
                const agr = holderCalc(data.record);
                setHolders(agr);
            }
        }

        fetchData();
    }, [param]);

    const holderCalc = (records: recordInfo[]): holderInfo[] => {
        const aggregation = records.reduce((acc, record) => {
            const {holder, amount} = record;

            if (!acc[holder.name]) {
                acc[holder.name] = {
                    holder,
                    totalAmount: 0,
                }
            }

            acc[holder.name].totalAmount += (-1) **(record.holdingStatus + 1) * amount;
            return acc;
        }, {} as Record<string, holderInfo>);

        return Object.values(aggregation);
    }
    return (
        <div className="bg-gray-2 rounded-xl sm:rounded-2xl divide-y dark:divide-gray-700 divide-gray-200 border dark:border-gray-700 border-gray-200">
            <div className="p-4 py-3 flex items-center justify-between gap-3 flex-wrap xl:flex-nowrap">
                <h4 className="text-[15px] md:text-base xl:text-lg font-semibold text-white !leading-none">Holders Distribution</h4>
                <button className="text-xs font-medium xl:!leading-none rounded-md text-white bg-primary hover:bg-primary border border-primary transition-all duration-500 ease-in-out pb-1.5 sm:pb-2 pt-2 sm:pt-2.5 xl:py-2.5 p-2">Generate Bubble Map</button>
            </div>
            {holders && holders.map((holder, index) => (
                <div className="px-4 py-4 sm:pt-18 sm:pb-17 flex items-center justify-between gap-3" key={'holder' + index}>
                    <p className="text-sm lg:text-base font-medium text-body-color !leading-5 xl:!leading-none">
                        {index + 1}. <span className="text-yellow hover:underline cursor-pointer">{holder.holder.name}</span>
                    </p>
                    <p className="text-sm lg:text-base font-medium text-white !leading-5 xl:!leading-none"> {(holder.totalAmount / 10_000_000_000_000).toFixed(3)}% </p>
                </div>
            ))}
        </div>
    )
}