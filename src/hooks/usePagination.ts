import { useEffect, useMemo, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

type PaginationResult<T> = [
    number,
    number,
    (entries: T[]) => T[],
    boolean,
    boolean,
    () => void,
    () => void
];
/**
 * Provides tools for pagination for the array of entries with known length
 * @param totalEntries length of the entries array
 * @param limitPerPage number of entries to display per page
 * @param goToLastPageOnEntriesChange boolean - navigate to last page when number of entries changes
 * @returns array of values:
 * @curPage current page number,
 * @lastPage last page number,
 * @getEntriesForCurPage returns entries for current page,
 * @allowPrevPage shows if previous page is present,
 * @allowNextPage shows if next page is present,
 * @goToPrevPage navigates to previous page,
 * @goToNextPage navigates to next page,
 */
export function usePagination<T>(
    totalEntries: number,
    limitPerPage: number,
    goToLastPageOnEntriesChange: boolean = true
): PaginationResult<T> {
    const [searchParams, setSearchParams] = useSearchParams();
    const curPage = useMemo(() => Number(searchParams.get('page')), [searchParams]);
    // if curPage is lesst than 1 - go to page 1
    useEffect(() => {
        if (curPage < 1) {
            setSearchParams((prevParams) => {
                prevParams.set('page', '1');
                return prevParams;
            });
        }
        // setURLSearchParams of useSearchParams is not stable, considered a bug
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curPage]);

    const getEntriesForCurPage = useCallback(
        (entries: T[]) => {
            const curPageLastIndex = curPage * limitPerPage;
            const curPageFirstIndex = curPageLastIndex - limitPerPage;
            return entries.slice(curPageFirstIndex, curPageLastIndex);
        },
        [curPage, limitPerPage]
    );
    const lastPage = useMemo(
        () => Math.ceil(totalEntries / limitPerPage) || 1,
        [limitPerPage, totalEntries]
    );
    // Needed to track the changes of totalEntries for useEffect
    const oldValueOfTotalEntries = useRef(totalEntries);

    useEffect(() => {
        // if user entered an empty page or
        // number of entries increased - navigate to last page
        if (
            goToLastPageOnEntriesChange &&
            (curPage > lastPage || totalEntries > oldValueOfTotalEntries.current)
        ) {
            setSearchParams((prevParams) => {
                prevParams.set('page', lastPage.toString());
                return prevParams;
            });
            oldValueOfTotalEntries.current = totalEntries;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [goToLastPageOnEntriesChange, lastPage, curPage, totalEntries]);

    const allowPrevPage = useMemo(() => curPage > 1, [curPage]);
    const allowNextPage = useMemo(() => curPage < lastPage, [curPage, lastPage]);
    const goToPrevPage = useCallback(
        () =>
            setSearchParams((prevParams) => {
                prevParams.set('page', (curPage - 1).toString());
                return prevParams;
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [curPage]
    );
    const goToNextPage = useCallback(
        () =>
            setSearchParams((prevParams) => {
                prevParams.set('page', (curPage + 1).toString());
                return prevParams;
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [curPage]
    );
    return [
        +curPage,
        +lastPage,
        getEntriesForCurPage,
        allowPrevPage,
        allowNextPage,
        goToPrevPage,
        goToNextPage,
    ];
}
