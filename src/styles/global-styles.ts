import { createGlobalStyle } from 'styled-components';
import { COLORS } from 'styles/global-colors';
/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Montserrat', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Montserrat', sans-serif;
  }
  
  p,
  label {
    line-height: 1.5em;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .container {
    padding-left: 8px;
    padding-right: 8px;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -8px;
    margin-right: -8px;
  }
  .cell-20 {
    flex: 0 0 auto;
    width: 20%;
    padding-left: 8px;
    padding-right: 8px;
  }
  .m-aligner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .m-aligner-left {
    display: flex;
    align-items: center;
    justify-content: left;
  }
  .game-item {
    margin-bottom: 30px;
  }

  .pt-60 {
    padding-top: 60px;
  }

  .main-menu {
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: 8px;
  }

  .main-menu li.menu-item {
    display: inline-block;
  }

  .main-menu li.menu-item .menu-itm-link {
    color: ${COLORS.white};
    cursor: pointer;
    text-decoration: none;
    display: flex;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: 500;
    align-items: center;
    transition: all 0.2s ease-in-out;
  }
  .main-menu li.menu-item .menu-itm-link.active {
    background: linear-gradient(266.53deg, #3fc6c6 0%, #8dc63f 100%);
    border-radius: 8px;
  }
  .main-menu li.menu-item a.menu-itm-link&:hover {
    color: ${COLORS.accentGreen};
  }
  .main-menu li.menu-item .menu-itm-link.active&:hover {
    color: ${COLORS.white};
  }
`;

