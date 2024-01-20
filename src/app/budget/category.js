import BudgetItem from "./budget-item";

const Category = ({ name, description, budgetItems }) => {
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-6 sm:px-6">
                <h3 className="text-base font-semibold leading-7 text-gray-900">{name}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{description}</p>
            </div>

            {budgetItems && budgetItems.length > 0 ? budgetItems.map((budgetItem, idx) => (
                <BudgetItem key={idx} name={budgetItem.name} planned={budgetItem.planned} spent={budgetItem.spent} />
            )) : <p>No items to show</p>}

        </div>
    );
}

export default Category;