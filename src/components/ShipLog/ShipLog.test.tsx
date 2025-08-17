import { render, screen } from '@testing-library/react';
import { userData } from '@/__mocks__/data.mock';
import { ShipLog } from './ShipLog';

describe('ShipLog', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        disconnect() {}
        unobserve() {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it('renders placeholder message', () => {
    render(<ShipLog userData={userData} />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });
});
