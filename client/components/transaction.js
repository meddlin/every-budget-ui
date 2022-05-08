import { useState } from "react";

export default function Transaction() {
    const [dateAdded, setDateAdded] = useState('05/09/2022');
    const [vendor, setVendor] = useState('ACME Co.');
    const [amount, setAmount] = useState('34.58');
    const [note, setNote] = useState('Bought on Tues.');

    return (
        <>
            <div>{dateAdded}</div>
            <div>{vendor}</div>
            <div>{amount}</div>
            <div>{note}</div>
        </>
    );
}