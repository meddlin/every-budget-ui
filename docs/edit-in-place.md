title: "Edit-in-place-input"


This is how an edit-in-place input element is created.

At its core, this is a conditional swap between a simple `<h2>` tag, and a component
holding containing a `<form>`. Further, following the patterns in this app, the form
uses Formik to manage that form. A simple state variable, via `useState()`, is used
to swap between these to "elements", and a callback is passed to the form component
so it can alter the state, after the form posts to the server.

You can find this on `/src/components/budget-name-editor.js` and `/app/buget/page.js`.

### Switching UI

This is the basic concept. We're using a state variable, `editBudgetName`, to swap between
showing the `<BudgetNameEditor>` and the `<h2>` elements.

Notice, we're also establishing a callback function, called `callback`, as a prop to
pass to the `BudgetNameEditor` component. This callback is just a way to alter our state
variable from the child component.

```js
import { useState } from 'react';

const Budget = () => {
    const [editBudgetName, setEditBudgetName] = useState(false);

    return (
        {/* removed for brevity */}

        {editBudgetName ? (
            <>
                <BudgetNameEditor 
                    data={{id: budget.id, name: budget.name}} 
                    callback={() => setEditBudgetName(!editBudgetName)}
                />
            </>
        ) : (
            <h2 className="text-2xl my-4" onClick={() => setEditBudgetName(!editBudgetName)}>{budget.name}</h2>
        )}
    );
};
```

### Form component - BudgetNameEditor

First, we have the `<form>` with an included `<button>`. This is a rough idea
of what the Formik implementation will look like.

```js
import { Formik } from 'formik';
const BudgetNameEditor = () => {
    return (

        {/* 
            NOTE: THIS IS AN IN-PROGRESS EXAMPLE. This code snippet has
            a lot of code removed for brevity.
        */}
        <Formik>
            {({ handleChange, handleBlur, values }) => (
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
                    <button type="submit">Save</button>
                </form>
            )}
        </Formik>
    );
};
```

### Form component - complete picture

Now we're taking more into consideration. Form handling, form posting to server, 
client state resolution, and our callback. The main thing missing from this example 
would be form validation.