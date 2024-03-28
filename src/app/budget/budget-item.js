import MoneyDisplay from './money-display';
import BudgetItemEditForm from './budget-item/edit-form';
import { PrimaryButton, Button, EditButton, DeleteButton } from '../../components/buttons';
import { 
    BudgetItemEditModal, 
    BudgetItemEditModalContents,
    BudgetItemEditModalDismissButton, 
    BudgetItemEditModalOpenButton 
} from '@/components/budget-item-modals/edit-modals';
import { 
    BudgetItemDeleteModal, 
    BudgetItemDeleteModalContents,
    BudgetItemDeleteModalDismissButton,
    BudgetItemDeleteModalOpenButton
} from '@/components/budget-item-modals/delete-modals';
import { 
    TransactionsViewerModal,
    TransactionsViewerModalContents, 
    TransactionsViewerModalDismissButton, 
    TransactionsViewerModalOpenButton 
} from './transactions-viewer/transactions-viewer-modal';
import TransactionsViewer from './transactions-viewer/transactions-viewer';

const BudgetItem = ({ data }) => {
    const { name, planned, spent, transactions } = data;

    const transactionsSum = (transactions) => {
        let sum = 0;
        transactions.forEach( trn => {
            sum = trn.amount + sum;
        })
        return sum;
    }

    return (
        <div className="border-t border-gray-100">
            <div className="flex px-4 py-6 sm:gap-4 sm:px-6">

                <div className="flex-col w-full">
                    <div className="flex"> {/* budget item main */}
                        <div className="w-3/4 text-sm font-medium text-gray-900">{`BI: ${name}`}</div>
                        <div className="w-1/4 flex justify-between">

                            <div className="flex-col">
                                <div className="flex justify-between">
                                    <BudgetItemEditModal>
                                        <BudgetItemEditModalOpenButton>
                                            <EditButton />
                                        </BudgetItemEditModalOpenButton>
                                        <BudgetItemEditModalContents>
                                            
                                            <BudgetItemEditForm 
                                                data={data} 
                                            />

                                            <BudgetItemEditModalDismissButton>
                                                <Button text="Close" />
                                            </BudgetItemEditModalDismissButton>
                                        </BudgetItemEditModalContents>
                                    </BudgetItemEditModal>
                                    
                                    <BudgetItemDeleteModal>
                                        <BudgetItemDeleteModalOpenButton>
                                            <DeleteButton />
                                        </BudgetItemDeleteModalOpenButton>
                                        <BudgetItemDeleteModalContents title="Delete budget item">
                                            <div className="text-black">
                                                test content
                                            </div>
                                            <BudgetItemDeleteModalDismissButton>
                                                <Button text="Close" />
                                            </BudgetItemDeleteModalDismissButton>
                                        </BudgetItemDeleteModalContents>
                                    </BudgetItemDeleteModal>
                                </div>

                                <div className="flex-col">
                                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <MoneyDisplay label="Planned" amount={planned} />
                                    </div>
                                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <MoneyDisplay label="Spent" amount={transactionsSum(transactions)} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div> {/* budget item transactions */}
                        {transactions && transactions.length > 0 ? (
                            <TransactionsViewerModal>
                                <TransactionsViewerModalOpenButton>
                                    <PrimaryButton 
                                        text="View transactions" 
                                    />
                                </TransactionsViewerModalOpenButton>
                                <TransactionsViewerModalContents>
                                    
                                    <TransactionsViewer transactions={transactions} />

                                    <TransactionsViewerModalDismissButton>
                                        <Button text="Close" />
                                    </TransactionsViewerModalDismissButton>
                                </TransactionsViewerModalContents>
                            </TransactionsViewerModal>
                        ) : (
                            <dd className="mt-1 text-sm leading-6 text-gray-700 italic sm:col-span-2 sm:mt-0">No transactions</dd>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BudgetItem;