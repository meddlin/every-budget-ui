
/**
 * Input component to be used on elements in the budgeting UI
 * Ref: https://dev.to/ms_yogii/form-inputs-with-react-and-tailwind-57o2
 * @param {*} props 
 * @returns 
 */
export default function Input(props) {
    const { 
        id, 
        placeholder = '', 
        label = '', 
        type = 'text', 
        ...children 
    } = props;

    return (
        <div className={`border transition duration-150 ease-in-out focus-within:border-primary border-gray-gray4`}>
            <label 
                className={`text-xs text-primary font-light placeholder-gray-gray4 px-2 pt-1.5`}
                htmlFor={id}>{placeholder}
            </label>
            <input 
                className={`w-full px-2 pb-1.5 text-primary outline-none text-base font-light rounded-md`}
                type={type} 
                placeholder={placeholder} 
                {...children} />
        </div>
    );
}