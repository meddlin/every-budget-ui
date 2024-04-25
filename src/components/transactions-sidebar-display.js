import { round } from '../utility/calculators';
import { useDraggable } from '@dnd-kit/core';
import Badge from '../components/badge';
import { TrashIcon } from '@heroicons/react/24/outline';

const TransactionsSideBarDisplay = ({ id, vendor, amount, date, importedFlag }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `draggable-${vendor}-${amount}`,
        data: {
            transactionId: id
        }
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined;

    return (
        <div 
            // ref={setNodeRef} 
            style={style} 
            className={`${transform ? 'z-40' : ''} text-sm my-2 mr-12 p-2 hover:bg-slate-100 hover:border hover:border-slate-300 border-white border rounded-md cursor-pointer`}
            >
            <div className="flex justify-between" {...listeners} {...attributes}>
                <div>
                    <span>{vendor}</span>
                </div>
                <div className="mx-2">
                    <span>{`$ ${round(amount, 2)}`}</span>
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                    <div className="italic text-slate-500">
                        {new Date(date).toLocaleDateString()}
                    </div>
                </div>
                <div>
                    {importedFlag ? (
                        <Badge text="imported" />
                    ) : ''}
                </div>
            </div>
            {/* <TrashIcon className="h-5 w-5" aria-hidden="true" /> */}
        </div>
    );
};

export default TransactionsSideBarDisplay;