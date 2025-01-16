'use client'
import Pagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { useMemo, useState, useEffect } from 'react';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import TanstackDatatable from '../Common/TanstackTable';
import DebouncedInput from '../Common/DebouncedInput';
import { transactionInfo, userInfo } from '@/types';
import { getTotalProfit, getTransactions } from '@/utils/api';
import Link from 'next/link';
import moment from 'moment';
import CardDataStats from './CardDataStats';
import ProfitChart from './ProfitChart';

const Transactions = () => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const columns = useMemo<ColumnDef<transactionInfo>[]>(
        () => [
            {
                accessorKey: 'user',
                header: 'User',
                cell: info => <Link href={`/profile/${(info.getValue() as userInfo)._id}`} className='underline text-primary'>{(info.getValue() as userInfo).name}</Link>,
            },
            {
                accessorKey: 'type',
                header: 'Type',
                cell: info => <span className='capitalize'>{info.getValue() as string}</span>
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                cell: info => (info.getValue() as number).toFixed(6)
            },
            {
                accessorKey: 'txHash',
                header: 'Tx',
                enableSorting: false,
                cell: info => {
                    const txHash = info.getValue() as string
                    return (<a href={`${process.env.NEXT_PUBLIC_TRANSACTION_EXPLORER_URL}${txHash}`} target='_blank' className='underline text-primary'>{txHash.substring(0, 6)}...{txHash.substring(txHash.length - 7, txHash.length - 1)}</a>)
                }
            },
            {
                accessorKey: 'createdAt',
                header: 'Creation Time',
                cell: info => moment(info.getValue() as Date).format('YYYY-MM-DD hh:mm:ss')
            }
        ],
        []
    )

    const [data, setData] = useState<transactionInfo[]>([]);
    const [totalProfit, setTotalProfit] = useState<number>(0);

    const table = useReactTable({
        data,
        columns,
        filterFns: {},
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    useEffect(() => {
        const handleGetTransactions = async () => {
            const totalProfit = await getTotalProfit();
            setTotalProfit(totalProfit.total)
            setIsLoading(true);
            const data = await getTransactions();
            setData(data);
            setIsLoading(false);
        }

        handleGetTransactions();
    }, [])

    const formatNumber = (num: number, digit: number = 0) => {
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(3).replace(/\.0$/, '') + 'B';
        } else if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(3).replace(/\.0$/, '') + 'M';
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(3).replace(/\.0$/, '') + 'K';
        }
        return Number(num).toFixed(digit);
    }

    return (
        <div>
            <CardDataStats
                title="Total Profit"
                data={{
                    total: formatNumber(totalProfit || 0, 3),
                    levelUp: false,
                    levelDown: false,
                    symbol: 'ETH'
                }}
            >
                <svg className="fill-primary dark:fill-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.65573 13.3765 7.75 12 7.75C10.6235 7.75 9.75 8.65573 9.75 9.5C9.75 10.3443 10.6235 11.25 12 11.25C13.9372 11.25 15.75 12.5828 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.3443 10.6235 16.25 12 16.25C13.3765 16.25 14.25 15.3443 14.25 14.5C14.25 13.6557 13.3765 12.75 12 12.75C10.0628 12.75 8.25 11.4172 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z"></path> </g></svg>
            </CardDataStats>
            <ProfitChart />
            <div className="flex sm:flex-row flex-col sm:items-center justify-between mt-4 mb-4 items-start gap-1">
                <div className="flex items-center gap-1">
                    Show
                    <select
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 25, 50, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                    entries
                </div>
                <div className="flex items-center gap-1">
                    Search:
                    <DebouncedInput
                        type="text"
                        value={globalFilter}
                        onChange={value => setGlobalFilter(value.toString())}
                        placeholder={``}
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                </div>
            </div>
            <TanstackDatatable
                table={table}
                isLoading={isLoading}
            />
            {data.length > 0 &&
                <div className="flex sm:flex-row flex-col sm:items-center items-start justify-between mt-4 gap-1">
                    <div className="col-sm-12 col-md-5">
                        <div
                            className="dataTables_info"
                            id="membershipsDataTable_info"
                            role="status"
                            aria-live="polite"
                        >
                            {`Showing ${(table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1)} to ${Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of ${table.getFilteredRowModel().rows.length} entries`}
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-7">
                        {table.getRowModel().rows.length > 0 && (
                            <div className="flex items-center justify-end gap-2">
                                <Pagination
                                    current={table.getState().pagination.pageIndex + 1}
                                    total={table.getPageCount()}
                                    onPageChange={(page) => {
                                        table.setPageIndex(page - 1);
                                    }}
                                    maxWidth={5}
                                    previousLabel="Previous"
                                    nextLabel="Next"
                                />
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default Transactions;