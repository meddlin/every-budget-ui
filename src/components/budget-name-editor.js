import { useEffect, useRef } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { object } from 'yup';
import { Button } from '@/components/buttons';
import { useSWRConfig } from 'swr';
import { API_URL } from '@/utility/constants';

const BudgetNameEditor = ({ data, callback }) => {
    const { id, name, description } = data;
    const closeBtnRef = useRef(null);
    const { mutate } = useSWRConfig();

    useEffect(() => {
        if (closeBtnRef && closeBtnRef.current) {
            closeBtnRef.current.addEventListener('click', () => console.log('close button event handler'));
        }
    }, [])

    const EditSchema = object();
    const initialValues = {
        id: id || '',
        name: name || '',
        description: description || ''
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={EditSchema}
            onSubmit={ async (values, actions) => {
                const viewModel = {
                    id: values.id,
                    name: values.name,
                    description: values.description
                };

                actions.setSubmitting(false);
                await fetch(`https://localhost:7291/api/Budgets/UpdateBudget`, {
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
                    const responseMessage = data && data.message ? data.message : '';
                    
                    if (responseMessage.toLowerCase().includes("success")) {
                        closeBtnRef.current.click();
                        actions.setSubmitting(false);
                        mutate(`${API_URL}/api/Budgets/Get`, viewModel);
                        callback();
                    }

                }).catch(error => {
                    console.log(error);
                });
            }}
        >
            {({ setFieldValue, handleChange, handleBlur, handleReset, handleSubmit, values, errors, touched, isValid, dirty }) => (
                <form onSubmit={handleSubmit}>
                    <input 
                        id="name" 
                        name="name"
                        type="text"
                        className=""
                        placeholder="Budget name" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name} 
                    />
                    {/* TODO: Move this callback() to the successful response from the server. */}
                    <button type="submit" ref={closeBtnRef}>Save</button>
                </form>
            )}
        </Formik>
    );
};

export default BudgetNameEditor;