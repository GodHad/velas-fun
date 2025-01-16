'use client'
import ReactPagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { useMemo, useState, useEffect } from 'react';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import TanstackDatatable from '../Common/TanstackTable';
import DebouncedInput from '../Common/DebouncedInput';
import { coinInfo, Pagination, userInfo } from '@/types';
import Link from 'next/link';
import { deleteTokenById, getCoinsInfo } from '@/utils/api';
import Image from 'next/image';
import { errorAlert, successAlert } from '../ToastGroup';

const CoinManagement = () => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const columns = useMemo<ColumnDef<coinInfo>[]>(
        () => [
            {
                accessorKey: 'creator',
                header: 'Creator',
                cell: info => (
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                            <Image className="rounded-full h-12 w-12 object-contain" src={(info.getValue() as userInfo).avatar || ''} alt="Brand" width={48} height={48} />
                        </div>
                        <Link href={`/profile/${(info.getValue() as userInfo)._id}`} className='underline text-primary'>
                            {(info.getValue() as userInfo).name}
                        </Link>
                    </div>
                )
            },
            {
                accessorKey: 'name',
                header: 'Name',
                cell: info => (
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                            <Image className="rounded-full h-12 w-12 object-contain" src={info.row.original.url} alt="Brand" width={48} height={48} />
                        </div>
                        <Link className="underline text-primary" href={`/coin/${info.row.original._id}`}>{info.getValue() as string}</Link>
                    </div>
                )
            },
            {
                accessorKey: 'ticker',
                header: 'Ticker',
                cell: info => info.getValue()
            },
            {
                accessorKey: 'reserveOne',
                header: 'Total Sold',
                cell: info => (
                    <span>
                        {((info.getValue() as number) / 1_000_000).toFixed(0)}
                    </span>
                )
            },
            {
                accessorKey: 'reserveTwo',
                header: 'Total ETH',
                cell: info => (
                    <span>
                        {((info.getValue() as number) / 1_000_000_000_000_000_000).toFixed(4)}
                    </span>
                )
            },
            {
                accessorKey: 'tradingOnUniswap',
                header: 'Graduated',
                cell: info => (
                    <span>
                        {(info.getValue() as boolean) ? 'Yes' : 'No'}
                    </span>
                )
            },
            {
                accessorKey: '_id',
                header: '',
                cell: info => (
                    <button className="w-8 h-8 flex justify-center items-center transition-transform duration-300 ease-in-out transform group-hover:scale-110" onClick={() => deleteCoin(info.getValue() as string)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M2.02637 4H14.3689" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.65527 7.19971V11.9996" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.7373 7.19971V11.9996" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.79785 4L3.56926 13.5997C3.56926 14.024 3.7318 14.431 4.02114 14.731C4.31047 15.0311 4.70289 15.1997 5.11207 15.1997H11.2833C11.6925 15.1997 12.0849 15.0311 12.3743 14.731C12.6636 14.431 12.8261 14.024 12.8261 13.5997L13.5975 4" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.02246 3.99971V1.59978C6.02246 1.38761 6.10373 1.18414 6.2484 1.03411C6.39307 0.884088 6.58928 0.799805 6.79387 0.799805H9.8795C10.0841 0.799805 10.2803 0.884088 10.425 1.03411C10.5696 1.18414 10.6509 1.38761 10.6509 1.59978V3.99971" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                )
            }
        ]
        ,
        []
    )

    const [data, setData] = useState<coinInfo[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        perPage: 10,
        totalItems: 0,
        totalPages: 0
    })

    const table = useReactTable({
        data,
        columns,
        filterFns: {},
        state: {
            globalFilter
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: false,
        debugHeaders: true,
        debugColumns: false,
    })

    const handleGetCoins = async () => {
        setIsLoading(true)
        const result = await getCoinsInfo({ perPage: pagination.perPage, currentPage: pagination.currentPage, searchTerm: globalFilter, sortBy: 'date' });
        setData(result.coins);
        setPagination(result.pagination);
        setIsLoading(false);
    }

    useEffect(() => {
        handleGetCoins()
    }, [pagination.perPage, pagination.currentPage, globalFilter])

    const deleteCoin = async (id: string) => {
        const res = await deleteTokenById(id);
        if (res) {
            successAlert('Deleted Token Successfully');
            handleGetCoins();
        }
        else errorAlert('Failed to delete token')
    }

    return (
        <>
            <div className="flex sm:flex-row flex-col sm:items-center justify-between mt-4 mb-4 items-start gap-1">
                <div className="flex items-center gap-1">
                    Show
                    <select
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        value={pagination.perPage}
                        onChange={e => {
                            setPagination(prev => ({
                                ...prev,
                                perPage: Number(e.target.value)
                            }))
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
                            {`Showing ${((pagination.currentPage - 1) * pagination.perPage + 1)} to ${Math.min(pagination.currentPage * pagination.perPage, pagination.totalItems)} of ${pagination.totalItems} entries`}
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-7">
                        {pagination.totalItems > 0 && (
                            <div className="flex items-center justify-end gap-2">
                                <ReactPagination
                                    current={pagination.currentPage}
                                    total={pagination.totalPages}
                                    onPageChange={(page) => {
                                        setPagination(prev => ({ ...prev, currentPage: page }));
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
        </>
    )
}

export default CoinManagement;