import { render, screen, fireEvent } from '@testing-library/react';
import TodoCard from './TodoCard';
import { Todo } from '../../TodoTypes';

const mockTodoUnchecked: Todo = {
    id: '1',
    title: 'New Todo',
    completed: false,
};
const mockTodoChecked: Todo = {
    id: '1',
    title: 'New Todo',
    completed: true,
};
const mockToggle = vi.fn();

describe('TodoCard', () => {
    beforeEach(() => {
        mockToggle.mockClear();
    });

    it('renders todo with correct "unchecked" status', () => {
        render(<TodoCard todo={mockTodoUnchecked} toggle={mockToggle} />);
        const todoText = screen.getByText('New Todo');
        const checkbox = screen.getByLabelText('New Todo');
        const computedStyle = window.getComputedStyle(todoText);

        expect(todoText).toBeInTheDocument();
        expect(computedStyle.getPropertyValue('text-decoration')).not.toContain(
            'line-through'
        );
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });

    it('renders todo with correct "checked" status and line through style', () => {
        render(<TodoCard todo={mockTodoChecked} toggle={mockToggle} />);
        const todoText = screen.getByText('New Todo');
        const checkbox = screen.getByLabelText('New Todo');
        const computedStyle = window.getComputedStyle(todoText);

        expect(todoText).toBeInTheDocument();
        expect(computedStyle.getPropertyValue('text-decoration')).toContain(
            'line-through'
        );
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeChecked();
    });

    it('calls toggle function', () => {
        render(<TodoCard todo={mockTodoChecked} toggle={mockToggle} />);
        const checkbox = screen.getByLabelText('New Todo');
        fireEvent.click(checkbox);
        expect(mockToggle).toHaveBeenCalledTimes(1);
    });
});
