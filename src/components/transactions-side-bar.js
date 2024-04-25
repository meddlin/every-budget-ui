import { round } from '../utility/calculators';
import TransactionsSideBarDisplay from './transactions-sidebar-display';
import { 
    TransactionDetailModal, 
    TransactionDetailModalOpenButton,
    TransactionDetailModalContents
} from '@/app/transactions/actions/transaction-detail-modal';
import Banner from '@/components/banner';
import TransactionDetail from '@/app/transactions/actions/transaction-detail';

const TransactionsSideBar = ({ transactions }) => {
    return (
        <div className="">
            {
                transactions && transactions.length > 0 ? (
                    transactions.map((txn, key) => {
                        // onClick={() => alert('clicked transaction')}
                        return (
                            <div key={key} className="flex flex-col ">
                                <TransactionDetailModal>
                                    <TransactionDetailModalOpenButton>
                                        <div>
                                            <TransactionsSideBarDisplay 
                                                id={txn.id}
                                                vendor={txn.vendor}
                                                amount={txn.amount}
                                                date={txn.transactionDate}
                                                importedFlag={txn.imported} 
                                            />
                                        </div>
                                    </TransactionDetailModalOpenButton>
                                    <TransactionDetailModalContents>
                                        <div>
                                            <Banner title="Transaction Details" />
                                            <TransactionDetail 
                                                id={txn.id}
                                                vendor={txn.vendor}
                                                amount={txn.amount}
                                                date={txn.transactionDate}
                                                imported={txn.imported} 
                                            />
                                        </div>
                                    </TransactionDetailModalContents>
                                </TransactionDetailModal>
                            </div>
                        )
                    })
                ) : ''
            }
        </div>
    );
};

export default TransactionsSideBar;