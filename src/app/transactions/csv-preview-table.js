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

const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor('Description', {
        header: () => <h3>Tr. Category</h3>,
        cell: info => {
            return info.getValue().substring(0, 30)
        }
    }),
    columnHelper.accessor('Transaction Category', {
        header: () => <h3>Tr. Category</h3>,
        cell: info => info.getValue()
    }),
    columnHelper.accessor('Amount', {
        header: () => <h3>Amount</h3>,
        cell: info => info.getValue()
    }),
    columnHelper.accessor('Effective Date', {
        header: () => <h3>Effective Date</h3>,
        cell: info => info.getValue()
    }),
];

const CsvPreviewTable = ({ data }) => {
    const header = data && data.length > 0 ? Object.keys(data[0]) : [];

    const table = useReactTable({
        columns,
        data: (data && data.length > 0) ? data : [],
        // state: {
        //     columnFilters,
        //     globalFilter,
        // },
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            {/* <h2>CSV data</h2> */}
            <div className="flex justify-center content-center">
                {/* <div className="h-[75vh] w-1/2 overflow-x-scroll"> */}
                <div className="h-[75vh] overflow-x-scroll">
                    {/* <table className="text-sm">
                        <thead>
                            <tr>
                                {header.map((item, key) => (
                                    <th key={key}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data.map((rec, idx) => {
                                    return (
                                        <tr key={idx}>
                                            {
                                                Object.values(rec).map(
                                                    (val, key) => <td key={key}>{val}</td>
                                                )
                                            }
                                        </tr>
                                    );
                                }
                                )
                            ) : <tr><td>No CSV data available</td></tr>}
                        </tbody>
                    </table> */}
                    <h2>CSV Data</h2>
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
            </div>
        </>
    );
};

export default CsvPreviewTable;