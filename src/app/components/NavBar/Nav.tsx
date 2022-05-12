import * as React from 'react';
import qs from 'query-string';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { COLORS } from 'styles/global-colors';
import categoriesJson from './data/categories.json';

export function Nav() {
  const categories = categoriesJson;
  const location = useLocation();
  const query = qs.parse(location.search);
  return (
    <MenuWrapper>
      <ul className="main-menu large-screen">
        {categories?.map(category => (
          <li key={category.code} className="menu-item">
            <Link
              className={`menu-itm-link ${
                query?.categories === category.code ? 'active' : ''
              }`}
              to={`?categories=${category.code}`}
            >
              {category?.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="header-mobile m-aligner-right">
        {/* <span className="mobile-menu-btn open">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66663 4.16666V5.83332H18.3333V4.16666H1.66663ZM1.66663 9.16666V10.8333H18.3333V9.16666H1.66663ZM1.66663 14.1667V15.8333H18.3333V14.1667H1.66663Z"
              fill="white"
            />
          </svg>
        </span> */}
        <span className="mobile-menu-btn close">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.92253 2.74414L2.74414 3.92253L8.82162 10L2.74414 16.0775L3.92253 17.2559L10 11.1784L16.0775 17.2559L17.2559 16.0775L11.1784 10L17.2559 3.92253L16.0775 2.74414L10 8.82162L3.92253 2.74414Z"
              fill="white"
            />
          </svg>
        </span>
      </div>
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  .header-mobile {
    padding: 0 16px;
    width: 100vw;
  }
  .mobile-menu-btn {
    display: flex;
    width: 30px;
    height: 30px;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.open {
      background: linear-gradient(266.53deg, #3fc6c6 0%, #8dc63f 100%);
    }
  }
`;
