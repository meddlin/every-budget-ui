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
import { DeleteButton, EditButton } from '@/components/buttons';
import { 
    TransactionsTableEditModal, 
    TransactionsTableEditModalContents, 
    TransactionsTableEditModalDismissButton, 
    TransactionsTableEditModalOpenButton 
} from './actions/edit-modal';
import TransactionsTableEditForm from './actions/edit-form';
import TransactionsTableDeleteForm from './actions/delete-form';
import { 
    TransactionsTableDeleteModal,
    TransactionsTableDeleteModalContents,
    TransactionsTableDeleteModalOpenButton,
    TransactionsTableDeleteModalDismissButton
} from './actions/delete-modal';
import Papa from 'papaparse';

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
    columnHelper.accessor('edit_button', {
        header: () => '',
        cell: ({ row }) => {
            return (
                <>
                    <TransactionsTableEditModal>
                        <TransactionsTableEditModalOpenButton>
                            <EditButton />
                        </TransactionsTableEditModalOpenButton>
                        <TransactionsTableEditModalContents>

                            <TransactionsTableEditForm data={row.original} />

                            <TransactionsTableEditModalDismissButton>
                                <div>Close</div>
                            </TransactionsTableEditModalDismissButton>
                        </TransactionsTableEditModalContents>
                    </TransactionsTableEditModal>
                </>
            );
        }
    }),
    columnHelper.accessor('del_button', {
        header: () => '',
        cell: ({ row }) => {
            return (
                <>
                    <TransactionsTableDeleteModal>
                        <TransactionsTableDeleteModalOpenButton>
                            <DeleteButton />
                        </TransactionsTableDeleteModalOpenButton>
                        <TransactionsTableDeleteModalContents>
                            
                            <TransactionsTableDeleteForm data={row.original} />
                        
                            <TransactionsTableDeleteModalDismissButton>
                                <div>Close</div>
                            </TransactionsTableDeleteModalDismissButton>
                        </TransactionsTableDeleteModalContents>
                    </TransactionsTableDeleteModal>
                </>
            );
        }
    })
];

const Transactions = () => {
    const { fetchedTransactions, isLoadingTransactions, isErrorTransactions } = useTransactions();
    const [csvData, setCsvData] = useState([]);

    const [showTransactionTable, setShowTransactionTable] = useState(true);
    const [showPreviewTable, setShowPreviewTable] = useState(false);

    function toggleTables() {
        setShowTransactionTable( !showTransactionTable );
        setShowPreviewTable( !showPreviewTable );
    }

    function resetUpload() {
        setCsvData([]);

        toggleTables()
    }

    function handleFileChange(event) {
        console.log(event.target.files[0]);
        console.log(`File to upload is: ${event.target.files[0].name}`)
        console.log(`File to upload is: ${JSON.stringify(event.target.files[0])}`)

        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log(results.data)
                setCsvData(results.data)
            },
        });

        toggleTables()
    }

    const table = useReactTable({
        columns,
        // data: (sampleTransactions && sampleTransactions.length > 0) ? sampleTransactions : [],
        data: (fetchedTransactions && fetchedTransactions.length > 0) ? fetchedTransactions : [],
        // data: (csvData && csvData.length > 0) ? csvData : [],
        // state: {
        //     columnFilters,
        //     globalFilter,
        // },
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="flex justify-center">
            <div className="flex flex-col">
                <div className="flex">
                    <input placeholder="Search..." />
                    <input 
                        type="file" 
                        name="file"
                        accept=".csv"
                        onChange={(event) => handleFileChange(event)}
                    />
                    <button
                        onClick={() => alert('upload clicked')}
                    >Upload</button>
                    <button
                        onClick={() => resetUpload()}
                    >
                        Cancel
                    </button>
                </div>

                {showPreviewTable ? (
                    <div>
                        <h2>View - previewing CSV data</h2>
                        <table>
                            <thead>
                                <tr><th>Head1</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Col1</td></tr>
                                {csvData && csvData.length > 0 ? (
                                    csvData.map(csvRec => (
                                        <tr>JSON.stringify(csvRec)</tr>
                                    ))
                                ) : 'No CSV data available'}
                            </tbody>
                        </table>
                    </div>
                ) : ''}

                {showTransactionTable ? (
                    <div>
                        <h2>View - Stored Transactions</h2>
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
                ) : ''}
            </div>
        </div>
    );
};

export default Transactions;