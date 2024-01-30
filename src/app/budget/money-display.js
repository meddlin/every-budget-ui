import PropTypes from 'prop-types';

const MoneyDisplay = ({ label, amount }) => {
    return (
        <div>
            <span>{label}: {`$ ${amount}`}</span>
        </div>
    );
};

MoneyDisplay.propTypes = {
    label: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
};

export default MoneyDisplay;