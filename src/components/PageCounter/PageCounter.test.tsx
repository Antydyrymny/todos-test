import { render, screen } from '@testing-library/react';
import PageCounter from './PageCounter';

describe('PageCounter', () => {
    it('renders the current and last page numbers correctly', () => {
        render(<PageCounter curPage={2} lastPage={5} />);
        const pageCounterElement = screen.getByText(`page 2/5`);

        expect(pageCounterElement).toBeInTheDocument();
    });
});
