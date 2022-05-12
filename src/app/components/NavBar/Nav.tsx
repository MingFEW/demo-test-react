import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import qs from 'query-string';
import classNames from 'classnames';
import styled from 'styled-components/macro';
import { COLORS } from 'styles/global-colors';
import categoriesJson from './data/categories.json';

export function Nav() {
  const categories = categoriesJson;
  const location = useLocation();
  const query = qs.parse(location.search);
  return (
    <Wrapper>
      {categories?.map(category => (
        <CategoryLink
          key={category.code}
          to={`?categories=${category.code}`}
          style={
            query?.categories === category.code
              ? {
                  background:
                    'linear-gradient(266.53deg, #3fc6c6 0%, #8dc63f 100%)',
                  borderRadius: '8px',
                }
              : {}
          }
        >
          {category?.name}
        </CategoryLink>
      ))}
    </Wrapper>
  );
}
export const CategoryLink = styled(Link)`
  color: ${COLORS.white};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    color: ${COLORS.accentGreen};
  }

  .icon {
    margin-right: 0.25rem;
  }
`;

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;
