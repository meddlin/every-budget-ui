import { useEffect, useRef } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { object } from 'yup';
import { Button } from '@/components/buttons';
import {
    BudgetItemEditModalDismissButton
} from '@/components/budget-item-modals/edit-modals';
import { useSWRConfig } from 'swr';
import { API_URL } from '../../../utility/constants';

const BudgetItemEditForm = ({ data }) => {
    const { id, name, planned, spent } = data;
    const closeBtnRef = useRef(null);
    const { mutate } = useSWRConfig();

    useEffect(() => {
        if (closeBtnRef && closeBtnRef.current) {
            closeBtnRef.current.addEventListener('click', () => console.log('Close button clicked.'))
        }
    })

    const EditSchema = object();
    const initialValues = {
        id: id || '',
        name: name || '',
        planned: planned || '',
        spent: spent || ''
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={EditSchema}
            onSubmit={ async (values, actions) => {
                const viewModel = {
                    id: values.id,
                    name: values.name,
                    planned: values.planned,
                    spent: values.spent
                };

                actions.setSubmitting(false);
                await fetch('https://localhost:7291/api/BudgetItems/UpdateBudgetItem', {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(viewModel)
                }).then(res => {
                    if (res.ok) {
                        console.log(`Status: ${res.status}, Res OK: ${res.ok}, ${JSON.stringify(res)}`);
                        return res.json();
                    }
                }).then(data => {
                    const responseMessage = data && data.message ? data.message : '';
                    
                    if (responseMessage.toLowerCase().includes("success")) {
                        closeBtnRef.current.click();
                        actions.setSubmitting(false);
                        mutate(`${API_URL}/api/Budgets/Get`, viewModel);
                    }

                }).catch(error => {
                    console.log(error);
                });
            }}
        >
            {({ setFieldValue, handleChange, handleBlur, handleReset, handleSubmit, values, errors, touched, isValid, dirty }) => (
                <div>
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-lg font-bold">Edit</h2>

                        <label>Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className=""
                            placeholder="Enter name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onReset={handleReset}
                            value={values.name}
                        />

                        <div className="flex flex-col">
                            <label>Planned</label>
                            <input
                                id="planned"
                                name="planned"
                                type="number"
                                min="0"
                                step="any"
                                className=""
                                placeholder="0.00"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onReset={handleReset}
                                value={values.planned}
                            />

                            <label>Spent</label>
                            <input
                                id="spent"
                                name="spent"
                                type="number"
                                min="0"
                                step="any"
                                className=""
                                placeholder="0.00"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onReset={handleReset}
                                value={values.spent}
                            />
                        </div>

                        <div className="flex justify-between my-4">
                                <Button type="submit" text="Save" />

                                <BudgetItemEditModalDismissButton>
                                    <button
                                        type="button"
                                        ref={closeBtnRef}>Close</button>
                                </BudgetItemEditModalDismissButton>
                            </div>
                    </form>
                </div>
            )}
        </Formik>
    );
};

export default BudgetItemEditForm;