import { Formik, ErrorMessage } from 'formik';
import { object } from 'yup';
import ComboSelector from '@/components/combo-selector';
import InputWithValidation from '@/components/input';
import InputPrice from '@/components/input-price';
import { useBudgetItems } from '@/utility/fetchers';

const TransactionsTableEditForm = ({ data }) => {
    const { budgetItems, isLoadingBudgetItems, isErrorBudgetItems } = useBudgetItems();

    const { id, vendor, amount, transactionDate } = data; // "Data" from the original object

    const EditSchema = object();
    const initialValues = {
        id: id,
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
                alert(`submitted values: ${JSON.stringify(values)}`);
                const viewModel = {
                    id: values.id,
                    vendor: values.vendor,
                    amount: values.amount,
                    // budgetItem: values.budgetItem,
                    transactionDate: values.transactionDate
                };

                await fetch(`https://localhost:7291/api/Transactions/Update/${values.id}`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(viewModel)
                }).then(res => {
                    if (res.ok) {
                        console.log(res);
                        console.log(`res.status: ${res.status}`)
                        console.log(`res.ok: ${res.ok}`)
                        return res.json();
                    }
                }).then(data => {
                    console.log(`data: ${JSON.stringify(data)}`)

                    const responseMessage = data && data.message ? data.message : '';
                    if (responseMessage.toLowerCase().includes("success")) {
                        resetUpload();
                    }

                }).catch(error => {
                    console.log(error);
                });
            }}
        >
            {({ setFieldValue, handleChange, handleBlur, handleReset, handleSubmit, values, errors, touched, isValid, dirty }) => (
                <div>
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-lg font-bold">Edit Transaction</h2>

                        {!isLoadingBudgetItems && !isErrorBudgetItems ? (
                            <ComboSelector 
                                choices={budgetItems} 
                                name="budgetItem"
                                id="budgetItem"
                                value={values.budgetItem}
                                onChange={data => {
                                    console.log(`IN ONCHANGE: ${JSON.stringify(data)}`)

                                    const { id, dateCreated, dateUpdated, categoryId, name, planned, spent, description } = data;

                                    // handleChange(data);
                                    setFieldValue('budgetItem', data)
                                }}
                            />
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

                            <InputPrice 
                                labelText={"Amount"} 
                                id={"amount"}
                                name={"amount"}
                                // type -> this will be automatically set for a specific input like this
                                // className => not implemented yet
                                placeholder={'0.00'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                values={values.amount}
                            />
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
                            value={values.transactionDate}
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