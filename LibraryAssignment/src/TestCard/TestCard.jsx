import "./TestCard.css"
import PropTypes from 'prop-types';

function TestCard({ testId, isCompleted }) {
    return (
        <div className="testCard">
            <h3>{testId}</h3>
            <p className={isCompleted ? 'completed' : 'notCompleted'}>
                Status: {isCompleted ? 'Completed' : 'Not Completed'}
            </p>
        </div>
    );
}

TestCard.propTypes = {
    testId: PropTypes.string.isRequired, 
    isCompleted: PropTypes.bool.isRequired
};
export default TestCard;
  