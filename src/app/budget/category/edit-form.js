import { useEffect, useRef } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { object } from 'yup';
import { Button } from '../../../components/buttons';
import { CategoryEditModalDismissButton } from './edit-modals';

const CategoryEditForm = ({ data }) => {
    const { id, name } = data;
    const closeBtnRef = useRef(null);

    useEffect(() => {
        if (closeBtnRef && closeBtnRef.current) {
            closeBtnRef.current.addEventListener('click', () => console.log('close button event handler'));
        }
    }, [])
    
    const EditSchema = object();
    const initialValues = {
        id: id || '',
        name: name || ''
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={EditSchema}
            onSubmit={ async(values, actions) => {
                const viewModel = {
                    id: values.id,
                    name: values.name
                };

                actions.setSubmitting(false);
                await fetch(`https://localhost:7291/api/Categories/UpdateCategory`, {
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

                        <div className="flex flex-col">
                            <label>Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className=""
                                placeholder="Enter name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                values={values.name}
                            />

                            <div className="flex justify-between my-4">
                                <Button type="submit" text="Save" />

                                <CategoryEditModalDismissButton>
                                    {/* <Button text="Close" ref={closeBtnRef} /> */}
                                    <button
                                        type="button"
                                        ref={closeBtnRef}>Close</button>
                                </CategoryEditModalDismissButton>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    );
}

export default CategoryEditForm;