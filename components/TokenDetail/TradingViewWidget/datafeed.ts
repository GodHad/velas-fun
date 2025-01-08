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
    socket,
    vlxPrice
}: {
    name: string;
    pairIndex: number;
    token: string;
    socket: Socket | undefined;
    vlxPrice: number;
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
        
                const bars: Bar[] = [];
                chartTable.table.forEach((bar: Bar) => {
                    if (bar.time >= from && bar.time < to) {
                        bars.push({ 
                            ...bar,
                            open: bar.open * vlxPrice,
                            close: bar.close * vlxPrice,
                            high: bar.high * vlxPrice,
                            low: bar.low * vlxPrice,
                            time: bar.time * 1000 
                        });
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
        
            socket?.on(`price-update-${token}`, (priceUpdate) => {
                const lastTime = new Date(priceUpdate.lastTime).getTime();
                const closedPrice = priceUpdate.closedPrice * vlxPrice;
                const currentTime = Math.floor(lastTime / 1000);
                const alignedTime = Math.floor(currentTime / resolutionInSeconds) * resolutionInSeconds * 1000; 
                const price = priceUpdate.price * vlxPrice;
        
                if (!lastBar) {
                    lastBar = {
                        time: alignedTime,
                        open: closedPrice,
                        high: Math.max(closedPrice, price),
                        low: Math.min(closedPrice, price),
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
                socket.off(`price-update-${token}`);
                console.log(`[unsubscribeBars]: Unsubscribed from price updates for ${currentSymbolInfo.name}`);
            }
        },
    };
}

const getResolutionInSeconds = (resolution: string) => {
    if (resolution.toLowerCase().endsWith("y")) return parseInt(resolution) * 86400 * 30 * 12;
    if (resolution.toLowerCase().endsWith("m")) return parseInt(resolution) * 86400 * 30;
    if (resolution.toLowerCase().endsWith("d")) return parseInt(resolution) * 86400;
    if (resolution.toLowerCase().endsWith("h")) return parseInt(resolution) * 3600;
    return parseInt(resolution) * 60;
};

