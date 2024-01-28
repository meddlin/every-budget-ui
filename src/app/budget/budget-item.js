const BudgetItem = ({ name, planned, spent, transactions }) => {
    return (
        <div className="border-t border-gray-100">
            <div className="flex px-4 py-6 sm:gap-4 sm:px-6">

                <div className="flex-col w-full">
                    <div className="flex"> {/* budget item main */}
                        <div className="w-3/4 text-sm font-medium text-gray-900">{name}</div>
                        <div className="flex justify-between">
                            <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Planned: {planned}</div>
                            <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Spent: {spent}</div>
                        </div>
                    </div>
                    <div> {/* budget item transactions */}
                        {transactions && transactions.length > 0 ? 
                            transactions.map((transaction, idx) => (
                                <dd key={idx} className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction.name}</dd>
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