import { Formik, ErrorMessage } from 'formik';
import { object } from 'yup';

const CategoryEditForm = ({ name }) => {
    const EditSchema = object();
    const initialValues = {
        name: name || ''
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
                        <h2 className="text-lg font-bold">Edit</h2>

                        <label>Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className=""
                            placeholder="Enter name"
                            onChange={props.handleChange}
                            onBlur={props.onBlur}
                            values={props.values.name}
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
}

export default CategoryEditForm;