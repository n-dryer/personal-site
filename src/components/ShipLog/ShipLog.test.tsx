import { render, screen } from '@testing-library/react';
import { userData } from '@/__mocks__/data.mock';
import { ShipLog } from './ShipLog';

describe('ShipLog', () => {
  beforeAll(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        disconnect() {}
        unobserve() {}
      },
    );
  });
  it('renders placeholder message', () => {
    render(<ShipLog userData={userData} />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });
});
