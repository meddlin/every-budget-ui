'use client';

import Category from './category';
import { useState, useEffect } from 'react';
import SearchBar from './search';
import { replace } from 'formik';

import { useCategories, useBudget } from '../../utility/fetchers';

// const initialCategories = [
//     {
//         name: 'Income',
//         description: 'Money coming in',
//         planned: 0.00,
//         spent: 0.00,
//         budgetItems: [
//             {
//                 name: 'Paycheck',
//                 planned: 0.00,
//                 spent: 0.00
//             }
//         ]
//     },
//     {
//         name: 'Housing',
//         description: 'Any regular expense on the house',
//         planned: 0.00,
//         spent: 0.00,
//         budgetItems: [
//             {
//                 name: 'Mortgage',
//                 planned: 0.00,
//                 spent: 0.00,
//                 transactions: [
//                     {
//                         vendor: 'UWM',
//                         amount: 0.00
//                     }
//                 ]
//             },
//             {
//                 name: 'Electric',
//                 planned: 0.00,
//                 spent: 0.00
//             },
//             {
//                 name: 'Water',
//                 planned: 0.00,
//                 spent: 0.00
//             }
//         ]
//     }
// ];

const Budget = () => {
    
    // const initialCategories = [
    //     {
    //                 name: 'Income',
    //                 description: 'Money coming in',
    //                 planned: 0.00,
    //                 spent: 0.00,
    //                 budgetItems: [
    //                     {
    //                         name: 'Paycheck',
    //                         planned: 0.00,
    //                         spent: 0.00
    //                     }
    //                 ]
    //             }
    // ];
    const { fetchedCategories, isLoadingCategories, isErrorCategories } = useCategories();
    const { budget, isLoadingBudget, isErrorBudget } = useBudget();
    const [categories, setCategories] = useState(fetchedCategories);

    const { myCategories } = budget;

    /**
     * Constructor function for Category
     * @returns 
     */
    const newCategory = () => {
        return { 
            name: 'new name', 
            description: 'new desc', 
            planned: 100.00, 
            spent: 21.00,
            budgetItems: []
        };
    }

    function updateCategories() {
        if (categories && categories.length > 0) {
            return [...categories, newCategory()]
        } else {
            return [newCategory()]
        }        
    }

    return (
        <div className="flex flex-col content-center justify-center">
            <div className="flex">
                <div className="w-1/4">
                    {/* left gutter */}
                </div>
                <div className="w-1/2">
                    <SearchBar />

                    { myCategories.toString() }

                    <div>
                        {budget && budget.categories && budget.categories.length > 0 ? budget.categories.map( (cat, idx) => (
                            <Category
                                key={idx}
                                name={cat.name}
                                description={cat.description}
                                budgetItems={cat.budgetItems}
                            />
                        )) : 'Need to create Categories'}

                        <button onClick={
                            () => setCategories(updateCategories())
                        }>Add Category</button>
                    </div>
                
                    {/* <div>
                        {categories && categories.length > 0 ? categories.map((category, idx) => (
                            <Category
                                key={idx}
                                name={category.name}
                                description={category.description}
                                budgetItems={category.budgetItems}
                            />
                        )) : 'No categories'}

                        <button onClick={
                            () => setCategories(updateCategories())
                        }>Add Category</button>
                    </div> */}
                </div>
                <div className="w-1/4">
                    {/* right gutter */}
                </div>
            </div>
        </div>
    )
};

export default Budget;