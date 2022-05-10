import { useState } from 'react';
import Transaction from './transaction';

export default function EnvelopeDetail() {
    const [viewTransactions, setViewTransactions] = useState(false);
    const [transactions, setTransactions] = useState([])

    const showTransactions = () => {
        if (viewTransactions) setViewTransactions(!viewTransactions)
        else setViewTransactions(true);
    }

    return (
        <>
            <h2>Envelope Detail</h2>

            {viewTransactions ? 
                ( (transactions && transactions.length) ? transactions.map(trx => {
                    return (
                        <li>
                            <Transaction transaction={trx} />
                        </li>
                    );
                }) : 'No transactions to display' ) 
            : '' }

            <button onClick={showTransactions}>View transactions</button>
        </>
    );
}