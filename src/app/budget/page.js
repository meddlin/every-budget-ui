'use client';

import { useState, useEffect } from 'react';
import { API_URL } from '@/utility/constants';
import { useSWRConfig } from 'swr';

import Category from './category';
import SearchBar from './search';
import { useBudget } from '../../utility/fetchers';
import BudgetNameEditor from '@/components/budget-name-editor';
import TransactionsSideBar from '@/components/transactions-side-bar';
import { DndContext, useDndMonitor } from '@dnd-kit/core';

const Budget = () => {
    const { budget, isLoadingBudget, isErrorBudget } = useBudget();
    const [groupedTransactions, setGroupedTransactions] = useState([]);
    // const [categories, setCategories] = useState(budget.categories);
    const [editBudgetName, setEditBudgetName] = useState(false);
    const { mutate } = useSWRConfig();

    const collapseTransactions = (budget) => {
        let txns = [];

        budget && budget.categories ? budget.categories.forEach( cat => {
            cat.budgetItems.forEach( bi => {
                bi.transactions.forEach( tr => {
                    txns.push(tr)
                })
            })
        }) : [];

        return txns;
    }

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
                <DndContext
                    // onDragStart={(event) => {
                    //     // const { active, over } = event;
                    //     // do more stuff with event
                    // }}
                    onDragEnd={(event) => {
                        const { active, over } = event;
                        console.log(`ACTIVE -> ${JSON.stringify(active)}`)
                        console.log(`OVER -> ${JSON.stringify(over)}`)

                        const viewModel = {
                            id: active.data.current.transactionId,
                            dateUpdated: new Date(),
                            vendor: '',
                            amount: 0,
                            transactionDate: new Date(),
                            notes: 'some notes',
                            budgetItemId: over.data.current.budgetItemId
                        }

                        fetch(`https://localhost:7291/api/Transactions/RelateToBudgetItem`, {
                            method: 'POST',
                            mode: 'cors',
                            cache: 'no-cache',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(viewModel)
                        }).then(res => {
                            if (res.ok) {
                                console.log(res);
                                console.log(`res.status: ${res.status}`)
                                console.log(`res.ok: ${res.ok}`)
                                return res.json();
                            }
                        }).then(data => {
                            const responseMessage = data && data.message ? data.message : '';
                            
                            if (responseMessage.toLowerCase().includes("success")) {
                                console.log('success happened');
                                mutate(`${API_URL}/api/Budgets/Get`, viewModel);
                            }
        
                        }).catch(error => {
                            console.log(error);
                        });
                    }}
                >
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
                        </div>
                    
                    </div>
                    <div className="w-1/4 my-36 ">
                        {/* right gutter */}
                        <h3>Untracked Transactions</h3>
                        {/* <div className="max-h-[25%] overflow-y-auto"> */}
                        <div className="">
                            {budget ? <TransactionsSideBar transactions={collapseTransactions(budget)} /> : '' }
                        </div>
                    </div>
                </DndContext>
            </div>
        </div>
    )
};

export default Budget;