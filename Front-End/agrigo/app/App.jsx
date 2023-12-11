// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* Gunakan PrivateRoute untuk melindungi rute lainnya */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/profil" component={LandingPage} />
        {/* Rute lainnya */}
      </Switch>
    </Router>
  );
};

export default App;