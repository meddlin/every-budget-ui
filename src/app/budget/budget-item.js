const BudgetItem = ({ name, planned, spent, transactions }) => {
    return (
        <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-900">{name}</div>
                <div className="flex">
                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Planned: {planned}</div>
                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Spent: {spent}</div>
                </div>

                {transactions && transactions.length > 0 ? 
                    transactions.map((transaction, idx) => (
                        <dd key={idx} className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction.name}</dd>
                    )) : (
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">No transactions</dd>
                    )
                }
            </div>
            </dl>
        </div>
    );
};

export default BudgetItem;