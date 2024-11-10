'use client'

import { Formik, ErrorMessage } from 'formik';
import { object } from 'yup';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function EditTransactionForm({ transaction }: any) {
    const EditSchema = object();
    const initialValues = {
        id: transaction.id || '',
        transactionDate: transaction.transactionDate || '',
        vendor: transaction.vendor || '',
        amount: transaction.amount || 0.00,
        notes: transaction.notes || ''
    }

    const onSubmit = async (values: any, actions: any) => {
        const viewModel = {
            id: values.id,
            vendor: values.vendor,
            amount: values.amount,
            budgetItem: 'test', // values.budgetItem,
            transactionDate: values.transactionDate,
            notes: values.notes
        };

        actions.setSubmitting(false);

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
                console.log('SUCCESS - from responseMessage')
            }

        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={EditSchema}
                onSubmit={onSubmit}
            >
                {({ setFieldValue, handleChange, handleBlur, handleReset, handleSubmit, values, errors, touched, isValid, dirty }) => (
                    <form>
                        <div className="flex flex-row justify-center items-center">
                            <Label
                                htmlFor="transactionDate"
                                className="mr-4"
                            >
                                Transaction Date
                            </Label>
                            <Input
                                className="my-2"
                                placeholder="Transaction Date"
                                id="transactionDate"
                                name="transactionDate"
                                type="date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onReset={handleReset}
                                value={values.transactionDate}
                            />
                        </div>

                        <div className="flex flex-row justify-center items-center">
                            <Label
                                htmlFor="vendor"
                                className="mr-4"
                            >
                                Vendor
                            </Label>
                            <Input
                                className="my-2"
                                placeholder="Vendor"
                                id="vendor"
                                name="vendor"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onReset={handleReset}
                                value={values.vendor}
                            />
                        </div>

                        <div className="flex flex-row justify-center items-center">
                            <Label
                                htmlFor="amount"
                                className="mr-4"
                            >
                                Amount
                            </Label>
                            <Input
                                className="my-2"
                                placeholder="0.00"
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onReset={handleReset}
                                value={values.amount}
                            />
                        </div>

                        <div>
                            <Label htmlFor="notes"
                                className="mr-4"
                            >Notes</Label>
                            <Textarea />
                        </div>

                        <div className="flex flex-row justify-between items-center mt-8">
                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                            >
                                Submit
                            </button>
                            {/* <Button>Cancel</Button> */}
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}