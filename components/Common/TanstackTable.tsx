import { flexRender, Table } from '@tanstack/react-table';
import Spinner from './Spinner';

type TanstackDatatableProps<TData> = {
    table: Table<TData>;
    isLoading: boolean;
};

// datatable
const TanstackDatatable = <TData,>({
    table,
    isLoading,
}: TanstackDatatableProps<TData>) => {
    return (
        <div className='overflow-x-auto w-full'>
            <table className='table table-bordered table-striped w-full'>
                <thead className='bg-[#F9FAFB] dark:bg-meta-4'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    className={`font-medium text-[#637381] dark:text-bodydark px-5 py-4 lg:px-7 2xl:px-11 text-center sorting ${header.column.getIsSorted() === 'asc' ? 'sorting_asc' : header.column.getIsSorted() === 'desc' ? 'sorting_desc' : ''}`}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {header.isPlaceholder ? null : (
                                        <>
                                            <div
                                                className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: ' ↑',
                                                    desc: ' ↓'
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        </>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className='bg-white dark:bg-boxdark'>
                    {
                        isLoading ?
                            <tr className='border-t border-[#EEEEEE] dark:border-strokedark'>
                                <td className='px-5 py-4 lg:px-7 2xl:px-11' colSpan={5}><Spinner /></td>
                            </tr>
                            :
                            table.getRowModel().rows.length > 0 ? table.getRowModel().rows.map(row => {
                                return (
                                    <tr key={row.id} className='border-t border-[#EEEEEE] dark:border-strokedark'>
                                        {row.getVisibleCells().map(cell => {
                                            return (
                                                <td key={cell.id} className='align-middle px-5 py-4 lg:px-7 2xl:px-11'>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            }) :
                                <tr className='border-t border-[#EEEEEE] dark:border-strokedark'>
                                    <td colSpan={table.getHeaderGroups()[0].headers.length} className='text-center px-5 py-4 lg:px-7 2xl:px-11'>No events</td>
                                </tr>
                    }
                </tbody>
                <thead className='bg-[#F9FAFB] dark:bg-meta-4'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    className={`font-medium text-[#637381] dark:text-bodydark px-5 py-4 lg:px-7 2xl:px-11 text-center`}
                                >
                                    {header.isPlaceholder ? null : (
                                        <>
                                            <div
                                                className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        </>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
            </table>
        </div >
    )
}

export default TanstackDatatable