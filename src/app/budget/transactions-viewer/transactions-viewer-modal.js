import { 
    useState, 
    createContext,
    useContext,
    cloneElement,
    Fragment
} 
from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline';

/**
 * callAll will call all functions passed in, passing along any arguments
 */
const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

/**
 * TransactionsViewerModalContext is a context that will be used to share state between the TransactionsViewerModal and its children.
 */
const TransactionsViewerModalContext = createContext();

const TransactionsViewerModal = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    return <TransactionsViewerModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

const TransactionsViewerModalDismissButton = ({ children: child }) => {
    const [, setIsOpen] = useContext(TransactionsViewerModalContext)
    return cloneElement(child, {
        onClick: callAll(() => setIsOpen(false), child.props.onClick),
    })
}

const TransactionsViewerModalOpenButton = ({ children: child }) => {
    const [, setIsOpen] = useContext(TransactionsViewerModalContext)
    return cloneElement(child, {
        onClick: callAll(() => setIsOpen(true), child.props.onClick),
    })
}

const TransactionsViewerModalContentsBase = (props) => {
    const [isOpen, setIsOpen] = useContext(TransactionsViewerModalContext)
    return (
        <Transition.Root show={isOpen} as={Fragment} onClose={() => setIsOpen(false)} {...props}>
            <Dialog>
                <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                    {/* The backdrop, rendered as a fixed sibling to the panel container */}
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 sm:items-center sm:p-0">
                        <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                            <Dialog.Panel className="mx-auto max-w-8xl rounded bg-white">
                                {props.children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>

            </Dialog>
        </Transition.Root>
    )
}

const TransactionsViewerModalContents = ({ title, children, ...props }) => {
    return (
        <TransactionsViewerModalContentsBase {...props}>
            <div className="p-20">
                <div className="flex justify-end">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {title}
                    </Dialog.Title>
                </div>
                
                {children}
                
            </div>
        </TransactionsViewerModalContentsBase>
    )
}

export { TransactionsViewerModal, TransactionsViewerModalOpenButton, TransactionsViewerModalDismissButton, TransactionsViewerModalContents };