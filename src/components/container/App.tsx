import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import LazyComponent from './Lazy';

const App = () => {
  return (
    <div className="bg-dark-green h-100 w-100">
      <h3 className="light-blue ma0 tc ba">Here is the app component</h3>
      <Switch>
        <Route exact path="/" render={() => <LazyComponent bundle="about" />} />
        <Route
          path="/:component"
          render={route => (
            <LazyComponent bundle={route.match.params.component} />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
