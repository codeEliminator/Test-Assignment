import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ children }) {
  const username = localStorage.getItem('username');

  return username ? children : <Navigate to="/" />;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
export default PrivateRoute