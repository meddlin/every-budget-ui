import PropTypes from 'prop-types';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/20/solid';

const PrimaryButton = ({ text, type, onClick }) => {
    return (
        <button
            type={ type || `button` }
            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

const Button = ({ text, type, onClick, children }) => {
    return (
        <button
            type={ type || `button` }
            className="rounded bg-slate-400 px-2 py-1 text-xs font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onClick}
        >
            {text}
            {children}
        </button>
    );
};

const EditButton = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
    );
};

const DeleteButton = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            <XCircleIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
    );
};

PrimaryButton.propTypes = {
    text: PropTypes.string.isRequired
};

Button.propTypes = {
    text: PropTypes.string.isRequired
};

export { 
    PrimaryButton, 
    Button,
    EditButton,
    DeleteButton
};