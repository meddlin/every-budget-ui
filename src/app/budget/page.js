import Category from './category';

const Budget = () => {

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
        <div className="">
            <h1>Budget</h1>

            {categories.map((category, idx) => (
                <Category 
                    key={idx}
                    name={category.name} 
                    description={category.description} 
                    budgetItems={category.budgetItems}
                />
            ))}

        </div>
    )
};

export default Budget;