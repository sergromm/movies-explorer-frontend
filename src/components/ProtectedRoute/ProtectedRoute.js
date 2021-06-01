import { Route, Redirect } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.isLoggedIn ? (
          <>
            <Header isLoggedIn={props.isLoggedIn} />
            <Component {...props} />
            {!props.isProfilePage && <Footer />}
          </>
        ) : (
          <Redirect to="/signin" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
