import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './components/dashboard/dashboard-component';
import LandingPage from './components/landing-page/landing-component';
import ErrorPage from './components/error-page/error-component';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' component={LandingPage} exact></Route>
          <Route path='/:id([0-9]+)' component={Dashboard} exact></Route>
          <Route component={ErrorPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
