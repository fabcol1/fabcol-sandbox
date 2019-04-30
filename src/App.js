import './App.scss';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/navbar/Navbar';

import NotFound from './pages/not-found/NotFound';
import Scrollable from './pages/scrollable/Scrollable';
import MouseTrailNy from './components/mouse-trail-ny/MouseTrailNy';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <MouseTrailNy />
            <Navbar />

            <Switch>
              <Route exact path="/" component={Scrollable} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
