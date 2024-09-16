import { useState } from 'react';

export default function TableMonthSelector({ months }) {
    const [selected, setSelected] = useState('')

    return (
        <ul>
            {months.map((month, key) => 
                <li 
                    key={key}
                    className={`px-3 py-2 text-sm hover:bg-slate-100 hover:cursor-pointer ${selected == key ? 'bg-slate-300' : ''}`}
                    onClick={() => setSelected(key)}
                >
                    {month}
                </li> 
            )}
        </ul>
    );
}