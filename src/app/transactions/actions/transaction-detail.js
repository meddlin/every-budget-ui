import { TrashIcon } from "@heroicons/react/20/solid";
import { DeleteButton } from '@/components/buttons';
import { API_URL } from "@/utility/constants";

const TransactionDetail = ({ id, vendor, amount, transactionDate, imported }) => {

    const deleteTransaction = (id, imported) => {
        console.log(`deleteTransaction --> id: ${id}, imported: ${imported}`)

        // const imported = true;
        if (imported) {
            fetch(`${API_URL}/api/UploadedTransactions/Delete/${id}`, {
                    method: 'DELETE',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    }
            }).then( res => {
                if (res.ok) {
                    console.log(res);
                    console.log(`res.status: ${res.status}`)
                    console.log(`res.ok: ${res.ok}`)
                    return res.json()
                }
            }).then( data => {
                const responseMessage = data && data.message ? data.message : '';
                if (responseMessage.toLowerCase().includes("success")) {
                    console.log('success happened');
                    mutate(`${API_URL}/api/Budgets/Get`, viewModel);
                }
            });
        } else {
            fetch(`${API_URL}/api/Transactions/Delete/${id}`, {
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then( res => {
                if (res.ok) {
                    console.log(res);
                    console.log(`res.status: ${res.status}`)
                    console.log(`res.ok: ${res.ok}`)
                    return res.json()
                }
            }).then( data => {
                const responseMessage = data && data.message ? data.message : '';
                if (responseMessage.toLowerCase().includes("success")) {
                    console.log('success happened');
                    mutate(`${API_URL}/api/Budgets/Get`, viewModel);
                }
            });
        }
    }

    return (
        <div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Vendor</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{vendor}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">ID</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{id}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Amount</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amount}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Date</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transactionDate}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Imported</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{imported ? 'True' : 'False'}</dd>
                    </div>
                </dl>
                <hr />
                {/* <DeleteButton onClick={({id, imported}) => deleteTransaction(id, imported)} /> */}
                <DeleteButton onClick={() => {
                    deleteTransaction(id, imported)
                }} />
                {/* <TrashIcon className="h-5 w-5" aria-hidden="true" /> */}
            </div>
        </div>
    );
};

export default TransactionDetail;