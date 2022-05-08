import { useState } from "react";
import Envelope from "./envelope";

export default function Category() {
    const [title, setTitle] = useState('Category Title');
    const [envelopes, setEnvelopes] = useState([]);
    const addEnvelope = () => {
        let newEnv = {
            title: 'New Envelope',
            spent: '50.00',
            budgeted: '100.00'
        }

        setEnvelopes(envelopes => [...envelopes, newEnv]);
    }

    return (
        <div className="flex flex-col min-w-[50%] border-2 border-rose-500">
            <div className="flex-1">{title}</div>

            <div className="flex-3">
                <ul>
                    {envelopes && envelopes.length > 0 ?
                        envelopes.map( (env, idx) => {
                            return (
                                <li className="flex flex-row justify-between">
                                    <Envelope key={idx} />
                                </li>
                            );
                        }) : 'No Envelopes'
                    }
                </ul>

                <button onClick={addEnvelope}>Add...</button>
            </div>

        </div>
    );
}