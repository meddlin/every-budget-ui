'use client';

import { useState, useRef } from 'react';
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
import CsvPreviewTable from './csv-preview-table';
import { transformCsvData } from '@/utility/transformers';
import Papa from 'papaparse';

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

                            <TransactionsTableEditForm 
                                data={row.original}
                                // vendor={row.original.vendor} 
                                // amount={row.original.amount} 
                                // transactionDate={row.original.transactionDate} 
                            /> {/* data={row.original} */}

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
    const uploadInput = useRef(null);

    const [showTransactionTable, setShowTransactionTable] = useState(true);
    const [showPreviewTable, setShowPreviewTable] = useState(false);

    function toggleTables() {
        setShowTransactionTable( !showTransactionTable );
        setShowPreviewTable( !showPreviewTable );
    }

    function resetUpload() {
        uploadInput.current.value = null;

        toggleTables()
        setCsvData([]);
    }

    async function handleUpload() {
        console.log('upload clicked')

        // const response = await fetch('https://localhost:7291/api/Transactions/Upload', {
        await fetch('https://localhost:7291/api/Transactions/Upload', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transformCsvData(csvData))
        }).then(res => {
            if (res.ok) {
                console.log(res);
                console.log(`res.status: ${res.status}`)
                console.log(`res.ok: ${res.ok}`)
                return res.json();
            }
        }).then(data => {
            console.log(`data: ${JSON.stringify(data)}`)

            const responseMessage = data && data.message ? data.message : '';
            if (responseMessage.toLowerCase().includes("success")) {
                resetUpload();
            }

        }).catch(error => {
            console.log(error);
        });
    }

    function handleFileChange(event) {
        console.log(event.target.files[0]);
        if (event.target.files && event.target.files[0]) {
            console.log(`File to upload is: ${event.target.files[0].name}`);
            console.log(`File to upload is: ${JSON.stringify(event.target.files[0])}`);
        }

        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log(results.data)
                toggleTables()
                setCsvData(results.data)
            },
        });
    }

    const table = useReactTable({
        columns,
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
                <div className="flex">
                    <input placeholder="Search..." />
                    <input 
                        type="file" 
                        name="file"
                        accept=".csv"
                        onChange={(event) => handleFileChange(event)}
                    />
                    <button
                        ref={uploadInput}
                        onClick={() => handleUpload()}
                    >Upload</button>
                    <button
                        onClick={() => resetUpload()}
                    >
                        Cancel
                    </button>
                </div>

                {showPreviewTable ? (
                    <CsvPreviewTable data={csvData} />
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