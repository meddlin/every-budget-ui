'use client';

import Category from './category';
import { useState, useEffect } from 'react';

const Budget = () => {
    // const [categories, setCategories] = useState([]);
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         const response = await fetch('https://localhost:7291/api/Budgets/Get');
    //         const data = await response.json();
    //         setCategories(data);
    //     };

    //     fetchCategories();
    // }, []);

    // Stub data
    const categories = [
        {
            name: 'Income',
            description: 'Money coming in',
            planned: 0.00,
            spent: 0.00,
            budgetItems: [
                {
                    name: 'Paycheck',
                    planned: 0.00,
                    spent: 0.00 
                }
            ]
        },
        {
            name: 'Housing',
            description: 'Any regular expense on the house',
            planned: 0.00,
            spent: 0.00,
            budgetItems: [
                {
                    name: 'Mortgage',
                    planned: 0.00,
                    spent: 0.00
                },
                {
                    name: 'Electric',
                    planned: 0.00,
                    spent: 0.00
                },
                {
                    name: 'Water',
                    planned: 0.00,
                    spent: 0.00
                }
            ]
        }
    ];
    
    return (
        <div className="flex content-center justify-center">

            <div className="w-1/2">
                {categories.map((category, idx) => (
                    <Category 
                        key={idx}
                        name={category.name} 
                        description={category.description} 
                        budgetItems={category.budgetItems}
                    />
                ))}
            </div>

        </div>
    )
};

export default Budget;