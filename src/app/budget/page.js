'use client';

import Category from './category';
import { useState, useEffect } from 'react';
import SearchBar from './search';
import { useBudget } from '../../utility/fetchers';
import BudgetNameEditor from '@/components/budget-name-editor';

const Budget = () => {
    const { budget, isLoadingBudget, isErrorBudget } = useBudget();
    // const [categories, setCategories] = useState(budget.categories);
    const [editBudgetName, setEditBudgetName] = useState(false);

    // /**
    //  * Constructor function for Category
    //  * @returns 
    //  */
    // const newCategory = () => {
    //     return { 
    //         name: 'new name', 
    //         description: 'new desc', 
    //         planned: 100.00, 
    //         spent: 21.00,
    //         budgetItems: []
    //     };
    // }

    // function updateCategories() {
    //     if (categories && categories.length > 0) {
    //         return [...categories, newCategory()]
    //     } else {
    //         return [newCategory()]
    //     }        
    // }

    return (
        <div className="flex flex-col content-center justify-center">
            <div className="flex">
                <div className="w-1/4">
                    {/* left gutter */}
                </div>
                <div className="w-1/2">
                    <SearchBar />

                    {/* DEBUG */}
                    {/* {`Budget categories: ${budget && budget.categories ? budget.categories.length : 'no categories yet'}`}
                    {`Budget categories[0].budgetItems: ${budget && budget.categories[0] ? budget.categories[0].budgetItems : 'no budgeItems yet'}`} */}

                    {editBudgetName ? (
                        <>
                            <BudgetNameEditor 
                                data={{id: budget.id, name: budget.name}} 
                                callback={() => setEditBudgetName(!editBudgetName)}
                            />
                        </>
                    ) : (
                        <h2 className="text-2xl my-4" onClick={() => setEditBudgetName(!editBudgetName)}>{budget.name}</h2>
                    )}                    

                    <div className="flex">
                        <div className="flex flex-col min-w-[75%]">
                            {budget && budget.categories && budget.categories.length > 0 ? budget.categories.map( (cat, idx) => (
                                <Category
                                    key={idx}
                                    data={cat}
                                />
                            )) : 'Need to create Categories'}

                            {/* <button onClick={
                                () => setCategories(updateCategories())
                            }>Add Category</button> */}
                        </div>
                        <div className="flex flex-col max-w-[25%]">
                            <div>{budget && budget.categories && budget.categories.length > 0 ? (
                                budget.categories[0].budgetItems[0].transactions.map( txn => {
                                    return <div>{JSON.stringify(txn)}</div>
                                })
                            ) : ''}</div>
                        </div>
                    </div>
                
                </div>
                <div className="w-1/4">
                    {/* right gutter */}
                </div>
            </div>
        </div>
    )
};

export default Budget;