import BudgetItem from "./budget-item";
import { EditButton, Button } from '../../components/buttons';
import { 
    CategoryEditModal,
    CategoryEditModalContents,
    CategoryEditModalOpenButton,
    CategoryEditModalDismissButton
} from "./category/edit-modals";
import CategoryEditForm from './category/edit-form';

const Category = ({ name, description, budgetItems }) => {
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg my-4">
            <div className="px-4 py-2 sm:px-6">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">{name}</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{description}</p>
                    </div>
                    <div className="flex flex-col">
                        <CategoryEditModal>
                            <CategoryEditModalOpenButton>
                                <EditButton />
                            </CategoryEditModalOpenButton>
                            <CategoryEditModalContents>
                                <CategoryEditForm name={name} />
                                <CategoryEditModalDismissButton>
                                    <Button text="Close" />
                                </CategoryEditModalDismissButton>
                            </CategoryEditModalContents>
                        </CategoryEditModal>
                    </div>
                </div>
            </div>

            {budgetItems && budgetItems.length > 0 ? budgetItems.map((budgetItem, idx) => (
                <BudgetItem 
                    key={idx} 
                    name={budgetItem.name} 
                    planned={budgetItem.planned} 
                    spent={budgetItem.spent} 
                    transactions={budgetItem.transactions}
                />
            )) : <p>No items to show</p>}

        </div>
    );
}

export default Category;