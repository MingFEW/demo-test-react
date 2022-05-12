import * as React from 'react';
import qs from 'query-string';
import styled from 'styled-components/macro';
import { Link, useLocation } from 'react-router-dom';
import { COLORS } from 'styles/global-colors';
import categoriesJson from './data/categories.json';

export function Nav() {
  const categories = categoriesJson;
  const location = useLocation();
  const query = qs.parse(location.search);
  return (
    <div>
      <ul className="main-menu">
      {categories?.map(category => (
        <li key={category.code} className="menu-item">
          <Link
            className={`menu-itm-link ${(query?.categories === category.code) ? "active" : "" }`}
            to={`?categories=${category.code}`}
          >
            {category?.name}
          </Link>
        </li>
      ))}
      </ul>
    </div>
  );
}
