import { useState } from "react";
import Envelope from "./envelope";
import EnvelopeDetail from "./envelope-detail";
import Input from './input';

export default function Category() {
    const [title, setTitle] = useState('Category Title');
    const [showDetail, setShowDetail] = useState(false);
    const [envelopes, setEnvelopes] = useState([]);
    const addEnvelope = () => {
        let newEnv = {
            title: 'New Envelope',
            spent: '50.00',
            budgeted: '100.00'
        }

        setEnvelopes(envelopes => [...envelopes, newEnv]);
    }

    const removeEnvelope = (event) => {
        /**
         * NOTE: https://stackoverflow.com/questions/57341541/removing-object-from-array-using-hooks-usestate
         */
        const name = event.target.getAttribute("name");
        setEnvelopes( envelopes.filter(env => env.title !== name) );
    }

    const showEnvelopDetail = () => {
        if (showDetail) setShowDetail(!showDetail)
        else setShowDetail(true);
    }

    return (
        <div className="flex flex-col min-w-[50%] border-2 border-rose-500">
            <div className="flex-1">
                <Input />
            </div>

            <div className="flex-3">
                <ul>
                    {envelopes && envelopes.length > 0 ?
                        envelopes.map( (env, idx) => {
                            return (
                                <li className="flex flex-row justify-between">
                                    <Envelope key={idx} />
                                    <button onClick={showEnvelopDetail}>VIEW DET.</button>
                                    <button onClick={removeEnvelope} name={env.title}>Remove...</button>
                                </li>
                            );
                        }) : 'Create an envelope'
                    }
                </ul>

                <button onClick={addEnvelope}>Add...</button>
            </div>

            {showDetail ? <EnvelopeDetail /> : ''}

        </div>
    );
}