import * as React from 'react';
import { render } from '@testing-library/react';

import { FormLabel } from '../index';
import { themes } from 'styles/theme/themes';
import { DefaultTheme } from 'styled-components';

const renderWithTheme = (theme?: DefaultTheme) =>
  render(<FormLabel theme={theme || themes.light} />);

describe('<FormLabel />', () => {
  it('should render an <label> tag', () => {
    const label = renderWithTheme();
    expect(label.container.querySelector('label')).toBeInTheDocument();
  });

  // you can only test the styles dedined inside styled components, not outside as props
  // check here: https://github.com/testing-library/jest-dom/issues/295
  // and here: https://github.com/testing-library/jest-dom/issues/113#issuecomment-496971128
  it('should have theme', () => {
    const a = renderWithTheme();
    expect(a.container.firstChild).toHaveStyle(`text-transform: uppercase;`);
  });
});
