import { Formik, ErrorMessage } from 'formik';
import { object } from 'yup';

const TransactionsTableEditForm = ({ vendor, amount, transactionDate }) => {
    const EditSchema = object();
    const initialValues = {
        vendor: vendor || '',
        amount: amount || 0.00,
        transactionDate: transactionDate || ''
    }

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
                        <h2 className="text-lg font-bold">Edit Transaction</h2>

                        <div className="flex">
                            <label>Vendor</label>
                            <input
                                id="vendor"
                                name="vendor"
                                type="text"
                                className=""
                                placeholder="Vendor"
                                onChange={props.handleChange}
                                onBlur={props.onBlur}
                                values={props.values.vendor}
                            />

                            <label>Amount</label>
                            <input
                                id="amount"
                                name="amount"
                                type="number" min="1" step="any"
                                className=""
                                // placeholder="0.00"
                                onChange={props.handleChange}
                                onBlur={props.onBlur}
                                values={props.values.amount}
                            />
                        </div>

                        <label>Transaction Date</label>
                        <input
                            id="vendor"
                            name="vendor"
                            type="date"
                            className=""
                            placeholder=""
                            onChange={props.handleChange}
                            onBlur={props.onBlur}
                            values={props.values.vendor}
                        />

                        <button
                            type="submit"
                        >
                            Save
                        </button>
                    </form>
                </div>
            )}
        </Formik>
    );
};

export default TransactionsTableEditForm;