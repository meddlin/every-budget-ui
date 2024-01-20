const BudgetItem = ({ name, planned, spent }) => {
    return (
        <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">{name}</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{planned}</dd>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{spent}</dd>
            </div>
            </dl>
        </div>
    );
};

export default BudgetItem;