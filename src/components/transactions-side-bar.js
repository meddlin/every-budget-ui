import { round } from '../utility/calculators';

const TransactionsSideBar = ({ transactions }) => {

    return (
        <div>{
            transactions && transactions.length > 0 ? (
                transactions.map((txn, key) => {
                    return (
                        <div key={key} className="flex flex-col text-sm">
                            <div className="flex">
                                <div>Vendor: {txn.vendor}</div>
                                <div>Amount: {round(txn.amount, 2)}</div>
                            </div>
                            <div>Date: {new Date(txn.transactionDate).toLocaleDateString()}</div>
                        </div>
                    )
                })
            ) : ''
        }</div>
    );
};

export default TransactionsSideBar;