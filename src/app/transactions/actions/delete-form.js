import { Formik, ErrorMessage } from 'formik';
import { object } from 'yup';

const TransactionsTableDeleteForm = ({ vendor, amount, transactionDate }) => {
    const EditSchema = object();
    const initialValues = {
        vendor: vendor || '',
        amount: amount || 0.00,
        transactionDate: transactionDate || ''
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={EditSchema}
            onSubmit={ async(values, actions) => {
                const viewModel = {};
                const response = await fetch(``);
            }}
        >
            {(props) => (
                <div>
                    <form onSubmit={props.handleSubmit}>
                        <h2 className="text-lg font-bold">Delete Transaction</h2>

                        <div className="flex">
                            <div>
                                <label>Vendor</label>
                                <div>{props.values.vendor}</div>
                            </div>
                            <div>
                                <label>Amount</label>
                                <div>{props.values.amount}</div>
                            </div>
                            <div>
                                <label>Transaction Date</label>
                                <div>{props.values.transactionDate}</div>
                            </div>
                        </div>

                        <button
                            type="submit"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            )}
        </Formik>
    );
};

export default TransactionsTableDeleteForm;