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
} from './actions/transactions-table-edit-modal';
import TransactionsTableEditForm from './actions/transactions-table-edit-form';
import TransactionsTableDeleteForm from './actions/transactions-table-delete-form';
import { 
    TransactionsTableDeleteModal,
    TransactionsTableDeleteModalContents,
    TransactionsTableDeleteModalOpenButton,
    TransactionsTableDeleteModalDismissButton
} from './actions/transactions-table-delete-modal';
import CsvPreviewTable from './csv-preview-table';
import { transformCsvData } from '@/utility/transformers';
import Papa from 'papaparse';
import { DndContext } from '@dnd-kit/core';

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
        cell: info => {
            return new Date(info.getValue()).toLocaleDateString()
        }
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
    // const { fetchedTransactions, isLoadingTransactions, isErrorTransactions } = useTransactions();
    const [csvData, setCsvData] = useState([]);
    const uploadInput = useRef(null);

    function resetUpload() {
        uploadInput.current.value = null;
        setCsvData([]);
    }

    async function handleUpload() {
        console.log('upload clicked')

        // const response = await fetch('https://localhost:7291/api/Transactions/Upload', {
        await fetch('https://localhost:7291/api/UploadedTransactions/Upload', {
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
                setCsvData(results.data)
            },
        });
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <input placeholder="Search..." />
                    <input 
                        type="file" 
                        name="file"
                        accept=".csv"
                        onChange={(event) => handleFileChange(event)}
                    />
                    <div className="flex flex-row justify-between my-4">
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
                </div>
                
                <div className="flex flex-row-reverse">
                    <CsvPreviewTable data={csvData} />
                </div>
            </div>
        </div>
    );
};

export default Transactions;