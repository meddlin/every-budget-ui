'use client';

import Category from './category';
import { useState, useEffect } from 'react';
import SearchBar from './search';
import { replace } from 'formik';
import { useCategories, useBudget } from '../../utility/fetchers';

const Budget = () => {
    const { fetchedCategories, isLoadingCategories, isErrorCategories } = useCategories();
    const { budget, isLoadingBudget, isErrorBudget } = useBudget();
    const [categories, setCategories] = useState(fetchedCategories);

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
                
                </div>
                <div className="w-1/4">
                    {/* right gutter */}
                </div>
            </div>
        </div>
    )
};

export default Budget;