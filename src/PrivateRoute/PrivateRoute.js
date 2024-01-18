import { Navigate } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("jwt_Token");
  if (token) {
    return <Component {...rest} />;
  }
  return <Navigate to="/" />;
};

// const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
//   // Add your authentication logic here
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" replace />;
// };
// export default PrivateRoute;

export default PrivateRoute;
