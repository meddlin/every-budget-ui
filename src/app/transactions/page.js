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

const Transactions = () => {
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('id', {
            header: () => <h3>id</h3>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('description', {
            header: () => <h3>Description</h3>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('amount', {
            header: () => <h3>Amount</h3>,
            cell: info => info.getValue()
        }),
    ];

    const data = [
        {
            id: '1',
            description: 'some description',
            amount: '10.5'
        }
    ]

    const table = useReactTable({
        columns,
        data: (data && data.length > 0) ? data : [],
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="flex justify-center">
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
                                <td key={cell.id} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;