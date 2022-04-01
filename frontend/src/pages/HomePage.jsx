import React from 'react';
import { NavLink } from 'react-router-dom';

import { APP_ROUTES } from '../services/routeService';

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-2 p-4">
      <h3 className="text-center font-semibold mb-6">Seja bem-vindo(a) ao Portal para Desenvolvedores!</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mx-auto">
        {APP_ROUTES.map(({ id, path, description, icon }) => {
          return (
            icon && (
              <NavLink
                key={id}
                exact
                to={path}
                className="p-4 bg-gray-200 rounded-lg shadow-md hover:text-yellow-500 hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-1">
                  {React.cloneElement(icon, { size: '2rem' })}
                  <span className="text-center">{description}</span>
                </div>
              </NavLink>
            )
          );
        })}
      </div>
    </div>
  );
}
