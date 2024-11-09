'use client';

import { useState, useEffect } from 'react';
import {
    useReactTable,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getSortedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    sortingFns,
} from "@tanstack/react-table";
import { useTransactions } from '@/utility/fetchers';
import TableMonthSelector from '@/components/table-month-selector';
import TableTagDisplay from '@/components/table-tag-display';
import Toggle from '@/components/toggle';

const Transactions = () => {
    const { fetchedTransactions, isLoadingTransactions, isErrorTransactions } = useTransactions();

    const columnHelper = createColumnHelper();
    const columns = [
        // columnHelper.accessor('id', {
        //     header: () => <h3>id</h3>,
        //     cell: info => info.getValue()
        // }),
        columnHelper.accessor('dateUpdated', {
            header: () => <h3>Date Updated</h3>,
            cell: info => {
                const dateUpdated = info.getValue()
                return new Date(dateUpdated).toISOString().split('T')[0]
            }
        }),
        columnHelper.accessor('vendor', {
            header: () => <h3>Vendor</h3>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('amount', {
            header: () => <h3>Amount</h3>,
            cell: info => {
                return Math.round(info.getValue() * 100) / 100
            }
        }),
        columnHelper.accessor('transactionDate', {
            header: () => <h3>Transaction Date</h3>,
            cell: info => {
                const transactionDate = info.getValue()
                return new Date(transactionDate).toISOString().split('T')[0]
            }
        }),
        columnHelper.accessor('budgetItemId', {
            header: () => <h3>Budget Item Id</h3>,
            cell: info => info.getValue()
        }),
    ];

    const table = useReactTable({
        columns,
        data: (fetchedTransactions) ? fetchedTransactions : [],
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="flex justify-center">
            {/* <div>
                <TableMonthSelector months={['2024-09', '2024-08', '2024-07']} />
            </div> */}
            <div>
                {fetchedTransactions ? (
                    <table>
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id} className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            {
                                                header.isPlaceholder
                                                    ? null
                                                    : (<>
                                                        <div>
                                                            {flexRender(
                                                                header.column.columnDef.header, header.getContext()
                                                            )}
                                                        </div>
                                                    </>)
                                            }
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="leading-4 text-sm hover:bg-slate-100 hover:cursor-pointer">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : 'No data to display'}
            </div>

            <div>
                <div>
                    <div>Hide Budgeted Transactions</div>
                    <Toggle />
                </div>
                <div className="pt-4">
                    <div>Tags/Categories</div>
                    <TableTagDisplay tags={['restaurants', 'groceries', 'gas', 'shopping', 'misc.']} />
                </div>
            </div>
        </div>
    );
};

export default Transactions;