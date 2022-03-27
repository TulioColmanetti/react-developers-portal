import { Redirect, Route, Switch } from 'react-router-dom';

import { APP_ROUTES } from '../services/routeService';

export default function Pages() {
  return (
    <Switch>
      {APP_ROUTES.map(({ id, path, component }) => {
        return (
          <Route key={id} exact path={path}>
            {component}
          </Route>
        );
      })}
      <Redirect to="/" />;
    </Switch>
  );
}
