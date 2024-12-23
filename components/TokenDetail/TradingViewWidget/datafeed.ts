"use client";
import { Socket } from "socket.io-client";
import type {
    Bar,
    LibrarySymbolInfo,
    IBasicDataFeed,
    DatafeedConfiguration,
    ResolutionString,
} from "@/public/libraries/charting_library";
import { getChartTable } from "@/utils/getChartTable";

let currentSymbolInfo: LibrarySymbolInfo | null = null;
const barCache = new Map<string, Bar[]>();
const lastBarsCache = new Map<string, Bar>();
const configurationData: DatafeedConfiguration = {
    supported_resolutions: [
        "1",
        "5",
        "15",
        "45",
        "60",
        "240",
        "1440",
    ] as ResolutionString[],
};

export function getDataFeed({
    pairIndex,
    name,
    token,
    socket
}: {
    name: string;
    pairIndex: number;
    token: string;
    socket: Socket | undefined;
}): IBasicDataFeed {
    return {
        onReady: (callback) => {
            console.log("[onReady]: Method call");
            setTimeout(() => callback(configurationData), 0);
        },

        searchSymbols: () => {
            console.log("[searchSymbols]: Method call");
        },

        resolveSymbol: async (
            symbolName,
            onSymbolResolvedCallback,
        ) => {
            console.log("[resolveSymbol]: Method call", symbolName);

            const symbolInfo: LibrarySymbolInfo = {
                ticker: name,
                name: name,
                description: name,
                type: "crypto",
                session: "24x7",
                timezone: "Etc/UTC",
                minmov: 1,
                pricescale: 1000000000,
                exchange: "",
                has_intraday: true,
                visible_plots_set: 'ohlc',
                has_weekly_and_monthly: false,
                supported_resolutions: configurationData.supported_resolutions,
                volume_precision: 2,
                data_status: "streaming",
                format: "price",
                listed_exchange: "",
            };

            setTimeout(() => onSymbolResolvedCallback(symbolInfo), 0);
        },

        getBars: async (
            symbolInfo: LibrarySymbolInfo,
            resolution,
            periodParams,
            onHistoryCallback,
            onErrorCallback,
        ) => {
            const { from, to, firstDataRequest } = periodParams;
        
            try {
                const cacheKey = `${symbolInfo.name}-${from}-${to}-${resolution}`;
                if (barCache.has(cacheKey)) {
                    console.log("[getBars]: Returning cached data");
                    const cachedBars = barCache.get(cacheKey)!;
                    if (firstDataRequest) {
                        lastBarsCache.set(symbolInfo.name, { ...cachedBars[cachedBars.length - 1] });
                    }
                    onHistoryCallback(cachedBars, { noData: false });
                    return;
                }
        
                const chartTable = await getChartTable({
                    token,
                    pairIndex: pairIndex,
                    from,
                    to,
                    range: +resolution,
                });
        
                if (!chartTable || !chartTable.table) {
                    onHistoryCallback([], { noData: true });
                    return;
                }
        
                let bars: Bar[] = [];
                chartTable.table.forEach((bar: Bar) => {
                    if (bar.time >= from && bar.time < to) {
                        bars.push({ ...bar, time: bar.time * 1000 });
                    }
                });
        
                if (firstDataRequest && bars.length > 0) {
                    lastBarsCache.set(symbolInfo.name, { ...bars[bars.length - 1] });
                }
        
                onHistoryCallback(bars, { noData: false });
                barCache.set(cacheKey, bars);
            } catch (error) {
                console.log("[getBars]: Error", error);
                onErrorCallback(error as string);
            }
        },
        

        subscribeBars: (symbolInfo, resolution, onRealtimeCallback) => {
            currentSymbolInfo = symbolInfo;
            let lastBar: Bar | undefined = lastBarsCache.get(symbolInfo.name);
            const resolutionInSeconds = getResolutionInSeconds(resolution);
        
            socket?.on(`price-update-${symbolInfo.name}`, (priceUpdate) => {
                const currentTime = Math.floor(Date.now() / 1000) - 60;
                const alignedTime = Math.floor(currentTime / resolutionInSeconds) * resolutionInSeconds * 1000; 
                const price = priceUpdate.price;
        
                if (!lastBar) {
                    lastBar = {
                        time: alignedTime,
                        open: price,
                        high: price,
                        low: price,
                        close: price,
                        volume: 0,
                    };
                    lastBarsCache.set(symbolInfo.name, lastBar);
                    onRealtimeCallback(lastBar);
                    return;
                }
        
                if (alignedTime === lastBar.time) {
                    lastBar.high = Math.max(lastBar.high, price);
                    lastBar.low = Math.min(lastBar.low, price);
                    lastBar.close = price;
        
                    onRealtimeCallback(lastBar);
                } else if (alignedTime > lastBar.time) {
                    const newBar = {
                        time: alignedTime,
                        open: lastBar.close,
                        high: price,
                        low: price,
                        close: price,
                        volume: 0,
                    };
        
                    lastBarsCache.set(symbolInfo.name, newBar);
                    lastBar = newBar;
                    onRealtimeCallback(newBar);
                }
            });
        },
               
        
        unsubscribeBars: () => {
            if (socket && currentSymbolInfo) {
                socket.off(`price-update-${currentSymbolInfo.name}`);
                console.log(`[unsubscribeBars]: Unsubscribed from price updates for ${currentSymbolInfo.name}`);
            }
        },
    };
}

const getResolutionInSeconds = (resolution: string): number => {
    if (resolution === "24h") return 24 * 60 * 60;
    if (resolution === "4h") return 4 * 60 * 60;
    if (resolution === "1h") return 60 * 60;
    if (resolution === "45m") return 45 * 60;
    if (resolution === "15m") return 15 * 60;
    if (resolution === "5m") return 5 * 60;
    return 60;
}

