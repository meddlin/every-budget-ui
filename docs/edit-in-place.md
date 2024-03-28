title: "Edit-in-place-input"


This is how an edit-in-place input element is created.

At its core, this is a conditional swap between a simple `<h2>` tag, and a component
holding containing a `<form>`. Further, following the patterns in this app, the form
uses Formik to manage that form. A simple state variable, via `useState()`, is used
to swap between these to "elements", and a callback is passed to the form component
so it can alter the state, after the form posts to the server.

You can find this on `/src/components/budget-name-editor.js` and `/app/buget/page.js`.

### Switching UI

Use a state variable, `editBudgetName`, to swap between
showing the `<BudgetNameEditor>` and the `<h2>` elements, in a conditional.

Notice, we also have a callback function, called `callback`, as a prop on the `BudgetNameEditor` component. This callback is just a way to alter our state
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

This component is basically a normal Formik-controlled `<form>`, but with a special
`ref` placed on the submitting button.

We have the `<form>` with an included `<button>`.

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

Then we update this to place a custom event handler on the button. This is done
via a `ref`. From `closeBtnRef` we create a new event listener on the `click` 
event, and this `ref` is assigned to the button.

The `ref` is created upon mounting the component, but we need to assign the click
event each time. That is why `useEffect` is necessary. So, `useEffect` is a 
one-time trigger, to create this event handling logic, and it's associated with
the button by a prop, like so:

```js
<button type="submit" ref={closeBtnRef}>Save</button>
```

```js
import { useEffect, useRef } from 'react';
import { Formik } from 'formik';

const BudgetNameEditor = () => {
    const closeBtnRef = useRef(null);

    useEffect(() => {
        if (closeBtnRef && closeBtnRef.current) {
            closeBtnRef.current.addEventListener('click', () => console.log('close button event handler'));
        }
    }, [])

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
                    <button type="submit" ref={closeBtnRef}>Save</button>
                </form>
            )}
        </Formik>
    );
};
```

### Form component - submission, updating state, and callback

It looks like there is a lot going on below, but we're only building on what we
had before.

Now, we're handling submission logic which includes:

- making a request to the server
- updating state so front-end components can respond to data changes
- trigger the callback to reset state, closing the form

**Making a request to the server...**

This is done via the Fetch API (see: `await fetch()`). A lot of this code is 
skipped as its outside the scope of this doc.

**Update state and sync with front-end...**

The seemingly out of place call to `mutate()` handles this whole process. It's 
provided via the SWR library: [https://swr.vercel.app/](https://swr.vercel.app/)

**Trigger the callback...**

Notice the `callback` passed into the component via props. We call it after the
`fetch` request is kicked off. Normally, this would be wrapped in checks to make 
sure the server request was completed successfully before calling the callback.

As it's a function passsed in via props, we just need to call it: `callback()`.

```js
import { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { useSWRConfig } from 'swr';

const BudgetNameEditor = ({ callback }) => {
    const closeBtnRef = useRef(null);
    const { mutate } = useSWRConfig();

    useEffect(() => {
        if (closeBtnRef && closeBtnRef.current) {
            closeBtnRef.current.addEventListener('click', () => console.log('close button event handler'));
        }
    }, [])

    return (
        <Formik
            onSubmit={async(values, actions) => {
                /* lot of stuff removed for brevity */
                await fetch('https://yourserver.com', {
                    /* options */
                })
                .then(res => res.json())
                .then(data => {
                    /* do stuff */
                    mutate('https://yourserver.com/some/route', data)
                    callback();
                })
            }}
        >
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
                    <button type="submit" ref={closeBtnRef}>Save</button>
                </form>
            )}
        </Formik>
    );
};
```