import { round } from '../utility/calculators';

const TransactionsSideBar = ({ transactions }) => {
    return (
        <div className="">
            {
                transactions && transactions.length > 0 ? (
                    transactions.map((txn, key) => {
                        return (
                            <div key={key} 
                                onClick={() => alert('clicked transaction')}
                                className="flex flex-col text-sm my-2 mr-12 p-2 hover:bg-slate-100 hover:border hover:border-slate-300 border-white border rounded-md cursor-pointer">
                                <div className="flex justify-between">
                                    <div>
                                        <span>{txn.vendor}</span>
                                    </div>
                                    <div className="mx-2">
                                        <span>{`$ ${round(txn.amount, 2)}`}</span>
                                    </div>
                                </div>
                                <div className="italic text-slate-500">
                                    {new Date(txn.transactionDate).toLocaleDateString()}
                                </div>
                            </div>
                        )
                    })
                ) : ''
            }
        </div>
    );
};

export default TransactionsSideBar;