"use client";

import { ChartTable } from "@/types";
import { BACKEND_URL } from "./api";

export async function getChartTable({
    pairIndex,
    from,
    to,
    range,
    token
}: {
    pairIndex: number;
    from: number;
    to: number;
    range: number;
    token: string;
}): Promise<ChartTable> {
    try {
        const res = await fetch(
            `${BACKEND_URL}/chart/${pairIndex}/${from}/${to}/${range}/${token}`,
        ).then((data) => data.json());

        if (!res) {
            throw new Error();
        }
        return res as ChartTable;
    } catch {
        return Promise.reject(new Error("Failed at fetching charts"));
    }
}
