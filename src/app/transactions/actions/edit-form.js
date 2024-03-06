import { Formik, ErrorMessage } from 'formik';
import { object } from 'yup';
import ComboSelector from '@/components/combo-selector';
import InputWithValidation from '@/components/input';
import InputPrice from '@/components/input-price';

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

                        <ComboSelector />

                        <div className="flex">
                            <InputWithValidation
                                labelText={"Vendor"}
                                id={"vendor"} 
                                name={"vendor"}
                                type={"text"}
                                placeholder={"Vendor"}
                                defaultValue={''}
                                validationMessage={"Not a valid vendor"}
                                onChange={props.handleChange}
                                onBlur={props.onBlur}
                                values={props.values.vendor}
                            />

                            <InputPrice labelText={"Amount"} />

                            {/* <label>Amount</label>
                            <input
                                id="amount"
                                name="amount"
                                type="number" min="1" step="any"
                                className=""
                                // placeholder="0.00"
                                onChange={props.handleChange}
                                onBlur={props.onBlur}
                                values={props.values.amount}
                            /> */}
                        </div>

                        <label>Transaction Date</label>
                        <input
                            id="transactionDate"
                            name="transactionDate"
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