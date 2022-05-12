import * as React from 'react';
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';
import { Nav } from './Nav';
import { PageWrapper } from '../PageWrapper';

export function NavBar() {
  return (
    <Wrapper>
      <div className="header-inner">
        <PageWrapper className="hhead m-aligner-left">
          <Nav />
        </PageWrapper>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  height: ${StyleConstants.NAV_BAR_HEIGHT};
  .header-inner {
    height: ${StyleConstants.NAV_BAR_HEIGHT};
    display: flex;
    background: linear-gradient(269.9deg, #2E2E2E 0%, #373737 100%);
    z-index: 5;
    position: fixed;
    left: 0;
    right: 0;
  }
`;
