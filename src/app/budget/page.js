import { PaperClipIcon } from '@heroicons/react/20/solid'
import Category from './category';

const Budget = () => {
    return (
        <div className="">
            <h1>Budget</h1>

            {/* <!-- Categories --> */}
            {/* <div>
                <h2>Income</h2>
                <ul>
                    <li>Paycheck</li>
                </ul>
            </div>
            <div>
                <h2>Housing</h2>
                <ul>
                    <li>Mortgage</li>
                    <li>Electric</li>
                </ul>
            </div> */}

            <Category />
            <Category />


        </div>
    )
};

export default Budget;