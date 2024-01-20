import Category from './category';

const Budget = () => {
    const categories = [
        {
            name: 'Income',
            description: 'Money coming in'
        },
        {
            name: 'Housing',
            description: 'Any regular expense on the house'
        }
    ];
    
    return (
        <div className="">
            <h1>Budget</h1>

            {categories.map((category) => (
                <Category name={category.name} description={category.description} />
            ))}

        </div>
    )
};

export default Budget;