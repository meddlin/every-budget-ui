'use client';

import { useState } from 'react';
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
import { useTransactions } from '../../utility/fetchers';

const sampleTransactions = [
    {
        vendor: 'ACME Co.',
        amount: '100.00',
        transactionDate: '02/19/2024'
    },
    {
        vendor: 'ACME Co.',
        amount: '100.00',
        transactionDate: '02/17/2024'
    },
    {
        vendor: 'ACME Co.',
        amount: '100.00',
        transactionDate: '02/01/2024'
    }
];

const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor('vendor', {
        header: () => <h3>Vendor</h3>,
        cell: info => info.getValue()
    }),
    columnHelper.accessor('amount', {
        header: () => <h3>Amount</h3>,
        cell: info => info.getValue()
    }),
    columnHelper.accessor('transactionDate', {
        header: () => <h3>Transaction Date</h3>,
        cell: info => info.getValue()
    }),
];

const Transactions = () => {
    const { fetchedTransactions, isLoadingTransactions, isErrorTransactions } = useTransactions();

    const table = useReactTable({
        columns,
        // data: (sampleTransactions && sampleTransactions.length > 0) ? sampleTransactions : [],
        data: (fetchedTransactions && fetchedTransactions.length > 0) ? fetchedTransactions : [],
        // state: {
        //     columnFilters,
        //     globalFilter,
        // },
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="flex justify-center">
            <div className="flex flex-col">
                <input placeholder="Search..." />

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
                                // onClick={() => setCurrentAlloy(row.original)}
                                className="leading-4 text-sm hover:bg-slate-100 hover:cursor-pointer">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;