import MoneyDisplay from './money-display';

const BudgetItem = ({ name, planned, spent, transactions }) => {
    return (
        <div className="border-t border-gray-100">
            <div className="flex px-4 py-6 sm:gap-4 sm:px-6">

                <div className="flex-col w-full">
                    <div className="flex"> {/* budget item main */}
                        <div className="w-3/4 text-sm font-medium text-gray-900">{name}</div>
                        <div className="w-1/4 flex justify-between">
                            <div className="w-1/2 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <MoneyDisplay label="Planned" amount={planned} />
                            </div>
                            <div className="w-1/2 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <MoneyDisplay label="Spent" amount={spent} />
                            </div>
                        </div>
                    </div>
                    <div> {/* budget item transactions */}
                        {transactions && transactions.length > 0 ?
                            transactions.map((transaction, idx) => (
                                // <dd key={idx} className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction.vendor}</dd>
                                <button
                                    type="button"
                                    className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    View Transactions
                                </button>
                            )) : (
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">No transactions</dd>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BudgetItem;