import { NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './OffersNavigation.module.css';

function OffersNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/offers"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Offers
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/Offer/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New Offer
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default OffersNavigation;
