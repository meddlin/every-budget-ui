import { Formik, ErrorMessage } from 'formik';
import { object } from 'yup';

const BudgetItemEditForm = ({ name, planned, spent }) => {

    const EditSchema = object();

    const initialValues = {
        planned: planned || '',
        spent: spent || ''
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={EditSchema}
            onSubmit={ async (values, actions) => {
                const viewModel = {}
                const response = await fetch(``)
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
                            values={props.values.planned}
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
                                onChange={props.handleChange}
                                onBlur={props.onBlur}
                                values={props.values.planned}
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
                                onChange={props.handleChange}
                                onBlur={props.onBlur}
                                values={props.values.planned}
                            />
                        </div>

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

export default BudgetItemEditForm;