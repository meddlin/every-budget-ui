export default function BudgetComponent() {
    return (
        <div className="flex flex-col min-w-[50%] border-2 border-rose-500">
            <div className="flex-1">
                title
            </div>

            <div className="flex-3">
                <ul>
                    <li className="flex flex-row justify-between">
                        <div className="">super really long item, like so long...</div>
                        <div className="flex flex-row">
                            <div>$123.00</div>
                            <div>$0.00</div>
                        </div>
                    </li>
                    <li className="flex flex-row justify-between">
                        <div className="">Line item 2</div>
                        <div className="flex flex-row">
                            <div>$123.00</div>
                            <div>$0.00</div>
                        </div>
                    </li>
                </ul>

                <div>more stuff...</div>
            </div>

        </div>
    );
}