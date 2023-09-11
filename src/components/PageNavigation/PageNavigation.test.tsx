import { render, fireEvent } from '@testing-library/react';
import PageNavigation from './PageNavigation';

const mockGoToPrevPage = vi.fn();
const mockGoToNextPage = vi.fn();

describe('PageNavigation', () => {
    beforeEach(() => {
        mockGoToPrevPage.mockClear();
        mockGoToNextPage.mockClear();
    });

    it(`renders navigation elements and changePage handlers
        fire when allowed`, () => {
        const { getByAltText } = render(
            <PageNavigation
                allowPrevPage
                allowNextPage
                goToPrevPage={mockGoToPrevPage}
                goToNextPage={mockGoToNextPage}
            />
        );

        const goToPrevPageElement = getByAltText('To previous page');
        const goToNextPageElement = getByAltText('To next page');

        expect(goToPrevPageElement).toBeInTheDocument();
        expect(goToNextPageElement).toBeInTheDocument();

        fireEvent.click(goToPrevPageElement);
        expect(mockGoToPrevPage).toHaveBeenCalledTimes(1);

        fireEvent.click(goToNextPageElement);
        expect(mockGoToNextPage).toHaveBeenCalledTimes(1);
    });

    it(`stops handlers from firing when allowPage is false`, () => {
        const { getByAltText } = render(
            <PageNavigation
                allowPrevPage={false}
                allowNextPage={false}
                goToPrevPage={mockGoToPrevPage}
                goToNextPage={mockGoToNextPage}
            />
        );

        const goToPrevPageElement = getByAltText('To previous page');
        const goToNextPageElement = getByAltText('To next page');

        fireEvent.click(goToPrevPageElement);
        expect(mockGoToPrevPage).toHaveBeenCalledTimes(0);

        fireEvent.click(goToNextPageElement);
        expect(mockGoToNextPage).toHaveBeenCalledTimes(0);
    });
});
