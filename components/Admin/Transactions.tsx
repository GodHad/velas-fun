'use client'
import Pagination from 'react-responsive-pagination';
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
import { getTransactions } from '@/utils/api';
import Link from 'next/link';
import moment from 'moment';

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
            setIsLoading(true);
            const data = await getTransactions();
            setData(data);
            setIsLoading(false);
        }

        handleGetTransactions();
    }, [])

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                    Show
                    <select
                        className="custom-select custom-select-sm form-control form-control-sm"
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
                        className="form-control form-control-sm"
                    />
                </div>
            </div>
            <TanstackDatatable
                table={table}
                isLoading={isLoading}
            />
            {data.length > 0 &&
                <div className="row">
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