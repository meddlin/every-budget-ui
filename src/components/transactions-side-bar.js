import { round } from '../utility/calculators';
import TransactionsSideBarDisplay from './transactions-sidebar-display';

const TransactionsSideBar = ({ transactions }) => {

    return (
        <div className="">
            {
                transactions && transactions.length > 0 ? (
                    transactions.map((txn, key) => {
                        return (
                            <div key={key} 
                                onClick={() => alert('clicked transaction')}
                                className="flex flex-col ">
                                    <TransactionsSideBarDisplay 
                                        vendor={txn.vendor}
                                        amount={txn.amount}
                                        date={txn.transactionDate} />
                            </div>
                        )
                    })
                ) : ''
            }
        </div>
    );
};

export default TransactionsSideBar;