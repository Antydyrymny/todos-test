import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { usePagination } from './usePagination';

let startVal = 1;
const testData = Array.from(new Array(100), () => startVal++);

type MockComponentProps = {
    totalEntries: number;
    limitPerPage: number;
    goToLastPageOnEntriesChange: boolean;
};

const MockComponent = ({
    totalEntries,
    limitPerPage,
    goToLastPageOnEntriesChange = true,
}: MockComponentProps) => {
    const [
        curPage,
        lastPage,
        getEntriesForCurPage,
        allowPrevPage,
        allowNextPage,
        goToPrevPage,
        goToNextPage,
    ] = usePagination(totalEntries, limitPerPage, goToLastPageOnEntriesChange);
    return (
        <>
            <div data-testid='currentPage'>{curPage}</div>
            <div data-testid='lastPage'>{lastPage}</div>
            <div data-testid='allowPrevPage'>{allowPrevPage.toString()}</div>
            <div data-testid='allowNextPage'>{allowNextPage.toString()}</div>
            <div data-testid='entriesForCurPage'>
                {JSON.stringify(getEntriesForCurPage(testData))}
            </div>
            <button onClick={allowPrevPage ? goToPrevPage : undefined}>prev Page</button>
            <button onClick={allowNextPage ? goToNextPage : undefined}>next Page</button>
        </>
    );
};

describe('usePagination Hook', () => {
    it(`should navigate to page 1 if the current page is not set, 
        last page should show correctly,
        allowPrevPage should be disabled on page 1,
        allowNextPage should be enabled (total pages > 1)`, () => {
        const { getByTestId } = render(
            <MemoryRouter initialEntries={[`/`]}>
                <MockComponent
                    totalEntries={testData.length}
                    limitPerPage={10}
                    goToLastPageOnEntriesChange
                />
            </MemoryRouter>
        );

        expect(getByTestId('currentPage')).toHaveTextContent('1');
        expect(getByTestId('lastPage')).toHaveTextContent('10');
        expect(getByTestId('allowPrevPage')).toHaveTextContent('false');
        expect(getByTestId('allowNextPage')).toHaveTextContent('true');
    });

    it('should navigate to first page if the current page is < 1', () => {
        const { getByTestId } = render(
            <MemoryRouter initialEntries={[`/?page=-1`]}>
                <MockComponent
                    totalEntries={testData.length}
                    limitPerPage={10}
                    goToLastPageOnEntriesChange
                />
            </MemoryRouter>
        );

        expect(getByTestId('currentPage')).toHaveTextContent('1');
    });

    it(`should navigate to last page if the current page is > last page,
        allowPrevPage should be enabled (total pages > 1),
        allowNextPage should be disabled on last page,`, () => {
        const { getByTestId } = render(
            <MemoryRouter initialEntries={[`/?page=99999`]}>
                <MockComponent
                    totalEntries={testData.length}
                    limitPerPage={10}
                    goToLastPageOnEntriesChange
                />
            </MemoryRouter>
        );

        expect(getByTestId('currentPage')).toHaveTextContent('10');
        expect(getByTestId('allowPrevPage')).toHaveTextContent('true');
        expect(getByTestId('allowNextPage')).toHaveTextContent('false');
    });

    it('should correctly display entries on the page', () => {
        const { getByTestId } = render(
            <MemoryRouter initialEntries={[`/?page=2`]}>
                <MockComponent
                    totalEntries={testData.length}
                    limitPerPage={10}
                    goToLastPageOnEntriesChange
                />
            </MemoryRouter>
        );

        expect(getByTestId('currentPage')).toHaveTextContent('2');
        expect(getByTestId('entriesForCurPage')).toHaveTextContent(
            '[11,12,13,14,15,16,17,18,19,20]'
        );
    });

    it('should navigate to prev/next page when toPrevPage/toNextPage is run', () => {
        const { getByTestId, getByText } = render(
            <MemoryRouter initialEntries={[`/?page=2`]}>
                <MockComponent
                    totalEntries={testData.length}
                    limitPerPage={10}
                    goToLastPageOnEntriesChange
                />
            </MemoryRouter>
        );

        expect(getByTestId('currentPage')).toHaveTextContent('2');

        const prevPageButton = getByText('prev Page');
        const nextPageButton = getByText('next Page');

        fireEvent.click(prevPageButton);
        expect(getByTestId('currentPage')).toHaveTextContent('1');
        fireEvent.click(nextPageButton);
        expect(getByTestId('currentPage')).toHaveTextContent('2');
    });

    it('should navigate to last page when number of entries increases', () => {
        const { getByTestId, rerender } = render(
            <MemoryRouter initialEntries={[`/?page=3`]}>
                <MockComponent
                    totalEntries={testData.length}
                    limitPerPage={10}
                    goToLastPageOnEntriesChange
                />
            </MemoryRouter>
        );

        expect(getByTestId('currentPage')).toHaveTextContent('3');
        expect(getByTestId('lastPage')).toHaveTextContent('10');

        testData.push(101);
        rerender(
            <MemoryRouter initialEntries={[`/?page=3`]}>
                <MockComponent
                    totalEntries={testData.length}
                    limitPerPage={10}
                    goToLastPageOnEntriesChange
                />
            </MemoryRouter>
        );
        expect(getByTestId('currentPage')).toHaveTextContent('11');
    });
});
