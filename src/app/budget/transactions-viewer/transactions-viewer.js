const TransactionsViewer = ({ transactions }) => {
    const header = transactions && transactions.length > 0 ? Object.keys(transactions[0]) : [];

    return (
        <>
            <h2>Transactions</h2>
            <div className="flex justify-center content-center">
                <div className="">
                    <table className="text-sm">
                        <thead>
                            <tr>
                                {header.map((item, key) => (
                                    <th key={key}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions && transactions.length > 0 ? (
                                transactions.map((rec, idx) => {
                                    return (
                                        <tr key={idx}>
                                            {
                                                Object.values(rec).map(
                                                    (val, key) => <td key={key}>{val}</td>
                                                )
                                            }
                                        </tr>
                                    );
                                }
                                )
                            ) : <tr><td>No transactions available</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TransactionsViewer;