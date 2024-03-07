import { Formik, ErrorMessage } from 'formik';
import { object } from 'yup';
import ComboSelector from '@/components/combo-selector';
import InputWithValidation from '@/components/input';
import InputPrice from '@/components/input-price';
import { useBudgetItems } from '@/utility/fetchers';

const TransactionsTableEditForm = ({ vendor, amount, transactionDate }) => {
    const { budgetItems, isLoadingBudgetItems, isErrorBudgetItems } = useBudgetItems();

    const EditSchema = object();
    const initialValues = {
        vendor: vendor || '',
        amount: amount || 0.00,
        transactionDate: transactionDate || ''
    }

    // console.log(`budgetItems: ${JSON.stringify(budgetItems)}`)

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={EditSchema}
            onSubmit={ async(values, actions) => {
                // const viewModel = {};
                // const response = await fetch(``);

                alert(`submitted values: ${JSON.stringify(values)}`)
            }}
        >
            {({ setFieldValue, handleChange, handleBlur, handleReset, handleSubmit, values, errors, touched, isValid, dirty }) => (
                <div>
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-lg font-bold">Edit Transaction</h2>

                        {!isLoadingBudgetItems && !isErrorBudgetItems ? (
                            <ComboSelector choices={budgetItems} />
                        ) : ''}

                        <div className="flex">
                            <InputWithValidation
                                labelText={"Vendor"}
                                id={"vendor"} 
                                name={"vendor"}
                                type={"text"}
                                // placeholder={"Vendor"}
                                // defaultValue={''}
                                validationMessage={"Not a valid vendor"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                values={values.vendor}
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            values={values.transactionDate}
                        />

                        <div className="flex justify-between">
                            <button
                                type="submit"
                            >
                                Save
                            </button>
                            <button>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    );
};

export default TransactionsTableEditForm;