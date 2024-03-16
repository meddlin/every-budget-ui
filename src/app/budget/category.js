import { useState } from 'react';
import BudgetItem from "./budget-item";
import { EditButton } from '../../components/buttons';
import { 
    CategoryEditModal,
    CategoryEditModalContents,
    CategoryEditModalOpenButton,
    CategoryEditModalDismissButton
} from "./category/edit-modals";
import CategoryEditForm from './category/edit-form';

const Category = ({ data }) => {
    const { name, budgetItems } = data;
    const [stateBudgetItems, setStateBudgetItems] = useState(budgetItems);
    
    const newBudgetItem = () => {
        return {
            name: '',
            planned: 0.00,
            spent: 0.00
        };
    }

    function updateBudgetItems() {
        console.log('in updateBudgetItems()')

        if (stateBudgetItems && stateBudgetItems.length > 0) {
            setStateBudgetItems([...stateBudgetItems, newBudgetItem()])
        } else {
            setStateBudgetItems([newBudgetItem()])
        }
    }

    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg my-4">
            <div className="px-4 py-2 sm:px-6">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">{`Cat: ${name}`}</h3>
                    </div>
                    <div className="flex flex-col">
                        <CategoryEditModal>
                            <CategoryEditModalOpenButton>
                                <EditButton />
                            </CategoryEditModalOpenButton>
                            <CategoryEditModalContents>
                                <CategoryEditForm data={data} />
                                
                            </CategoryEditModalContents>
                        </CategoryEditModal>
                    </div>
                </div>
            </div>

            {stateBudgetItems && stateBudgetItems.length > 0 ? stateBudgetItems.map((budgetItem, idx) => (
                <BudgetItem 
                    key={idx} 
                    name={budgetItem.name} 
                    planned={budgetItem.planned} 
                    spent={budgetItem.spent} 
                    transactions={budgetItem.transactions}
                />
            )) : <p>No items to show</p>}

            <button className="text-gray-500"
                onClick={
                    () => updateBudgetItems()
                }
            >Add Budg.Item</button>

        </div>
    );
}

export default Category;