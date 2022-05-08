import { useState } from "react";
import Input from './input';

export default function Envelope() {
    const [title, setTitle] = useState('Test Env.');
    const [budgeted, setBudgeted] = useState('$30.00');
    const [spent, setSpent] = useState('$13.28');

    return (
        <>
            <Input placeholder={title} />
            <div className="flex flex-row">
                <Input placeholder={spent} />
                <Input placeholder={budgeted} />
            </div>
        </>
    );
}