import { useState } from "react";

export default function Envelope() {
    const [title, setTitle] = useState('Test Env.');
    const [budgeted, setBudgeted] = useState('$30.00');
    const [spent, setSpent] = useState('$13.28');

    return (
        <>
            <div className="">{title}</div>
            <div className="flex flex-row">
                <div>{spent}</div>
                <div>{budgeted}</div>
            </div>
        </>
    );
}