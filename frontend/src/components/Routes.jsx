import React from 'react';
import { NavLink } from 'react-router-dom';

import { APP_ROUTES } from '../services/routeService';

export default function Routes() {
  return (
    <ul className="flex flex-row justify-center space-x-4">
      {APP_ROUTES.map(({ id, path, description, icon }) => {
        return (
          icon && (
            <li key={id}>
              <NavLink
                exact
                to={path}
                className="flex flex-row items-center space-x-1 hover:text-yellow-500 hover:scale-105"
                activeClassName="text-yellow-500"
              >
                {React.cloneElement(icon, { size: '1.1rem' })}
                <span className="text-center">{description}</span>
              </NavLink>
            </li>
          )
        );
      })}
    </ul>
  );
}
