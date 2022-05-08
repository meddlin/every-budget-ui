import Envelope from "./envelope";

export default function Category() {
    return (
        <div className="flex flex-col min-w-[50%] border-2 border-rose-500">
            <div className="flex-1">
                title
            </div>

            <div className="flex-3">
                <ul>
                    <li className="flex flex-row justify-between">
                        <Envelope />
                    </li>
                    <li className="flex flex-row justify-between">
                        <Envelope />
                    </li>
                </ul>

                <div>more stuff...</div>
            </div>

        </div>
    );
}