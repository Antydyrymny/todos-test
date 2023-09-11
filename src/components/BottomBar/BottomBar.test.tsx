import { render, fireEvent } from '@testing-library/react';
import BottomBar from './BottomBar';
import { TodoDisplayType } from '../../TodoTypes';

const todosLeft = 10;
const mockDisplayAll = vi.fn();
const mockDisplayActive = vi.fn();
const mockDisplayCompleted = vi.fn();
const mockClearCompleted = vi.fn();

describe('BottomBar', () => {
    beforeEach(() => {
        mockDisplayAll.mockClear();
        mockDisplayActive.mockClear();
        mockDisplayCompleted.mockClear();
        mockClearCompleted.mockClear();
    });

    it(`renders with provided props, display All is 
        highlighted and its event handler fires`, () => {
        const { getByText } = render(
            <BottomBar
                todosLeft={todosLeft}
                displayType={TodoDisplayType.all}
                displayAll={mockDisplayAll}
                displayActive={mockDisplayActive}
                displayCompleted={mockDisplayCompleted}
                clearCompleted={mockClearCompleted}
            />
        );
        const todosLeftElement = getByText('10 items left');
        const displayAllButton = getByText('All');

        expect(todosLeftElement).toBeInTheDocument();

        const computedStyle = window.getComputedStyle(displayAllButton);
        expect(computedStyle.getPropertyValue('border')).toContain('1px solid');

        fireEvent.click(displayAllButton);
        expect(mockDisplayAll).toHaveBeenCalledTimes(1);
    });

    it(`display Active is highlighted and its event handler fires`, () => {
        const { getByText } = render(
            <BottomBar
                todosLeft={todosLeft}
                displayType={TodoDisplayType.active}
                displayAll={mockDisplayAll}
                displayActive={mockDisplayActive}
                displayCompleted={mockDisplayCompleted}
                clearCompleted={mockClearCompleted}
            />
        );
        const displayActiveButton = getByText('Active');
        const computedStyle = window.getComputedStyle(displayActiveButton);
        expect(computedStyle.getPropertyValue('border')).toContain('1px solid');

        fireEvent.click(displayActiveButton);
        expect(mockDisplayActive).toHaveBeenCalledTimes(1);
    });

    it(`display Completed is highlighted and its event handler fires,
        clear completed handler fires as well`, () => {
        const { getByText } = render(
            <BottomBar
                todosLeft={todosLeft}
                displayType={TodoDisplayType.completed}
                displayAll={mockDisplayAll}
                displayActive={mockDisplayActive}
                displayCompleted={mockDisplayCompleted}
                clearCompleted={mockClearCompleted}
            />
        );
        const displayCompletedButton = getByText('Completed');
        const clearCompletedButton = getByText('Clear Completed');
        const computedStyle = window.getComputedStyle(displayCompletedButton);
        expect(computedStyle.getPropertyValue('border')).toContain('1px solid');

        fireEvent.click(displayCompletedButton);
        expect(mockDisplayCompleted).toHaveBeenCalledTimes(1);
        fireEvent.click(clearCompletedButton);
        expect(mockClearCompleted).toHaveBeenCalledTimes(1);
    });
});
