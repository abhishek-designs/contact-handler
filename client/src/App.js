import React from "react";
import "./assets/style/App.min.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import PrivateRoute from "./components/routes/PrivateRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";

function App() {
  return (
    <AlertState>
      <AuthState>
        <ContactState>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <ProtectedRoute
                exact
                path="/register"
                restricted={true}
                component={Register}
              />
              <ProtectedRoute
                exact
                path="/login"
                restricted={true}
                component={Login}
              />
            </Switch>
          </Router>
        </ContactState>
      </AuthState>
    </AlertState>
  );
}

export default App;
