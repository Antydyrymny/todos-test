import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Todos from './Todos';
import { Todo } from './TodoTypes';

const MockComponent = () => (
    <MemoryRouter>
        <Todos />
    </MemoryRouter>
);

const localStorageKey = 'TODOS_LOCALSTORAGE_KEY';
const initialTodos: Todo[] = [
    { id: '1', title: 'active Todo', completed: false },
    { id: '2', title: 'completed Todo', completed: true },
];
const newTodoTitle = 'new Todo';

const clearLocalStorage = () => {
    localStorage.clear();
};

describe('Todos', () => {
    afterEach(() => {
        clearLocalStorage();
    });

    it('reads and displays initial Todos (taken from local storage)', () => {
        localStorage.setItem(localStorageKey, JSON.stringify(initialTodos));
        const { getByText } = render(<MockComponent />);

        const activeTodo = getByText('active Todo');
        const completedTodo = getByText('completed Todo');

        expect(activeTodo).toBeInTheDocument();
        expect(completedTodo).toBeInTheDocument();
    });

    it('displays new Todo when added', () => {
        localStorage.setItem(localStorageKey, JSON.stringify(initialTodos));
        const { getByText, getByPlaceholderText } = render(<MockComponent />);

        const inputElement = getByPlaceholderText('Todo title');
        fireEvent.change(inputElement, { target: { value: newTodoTitle } });
        fireEvent.submit(inputElement);
        const newTodoElement = getByText(newTodoTitle);
        expect(newTodoElement).toBeInTheDocument();
    });

    it(`displays only active elements when "Active" is toggled,
        displays them all back when "All" is toggled`, () => {
        localStorage.setItem(localStorageKey, JSON.stringify(initialTodos));
        const { getByText } = render(<MockComponent />);

        const activeTodo = getByText('active Todo');
        const completedTodo = getByText('completed Todo');
        const allButton = getByText('All');
        const activeButton = getByText('Active');
        fireEvent.click(activeButton);

        expect(activeTodo).toBeInTheDocument();
        expect(completedTodo).not.toBeInTheDocument();

        fireEvent.click(allButton);

        expect(getByText('active Todo')).toBeInTheDocument();
        expect(getByText('completed Todo')).toBeInTheDocument();
    });

    it(`displays only completed elements when "Completed" is toggled,
        clears completed when clear completed is fired`, () => {
        localStorage.setItem(localStorageKey, JSON.stringify(initialTodos));
        const { getByText, queryByText } = render(<MockComponent />);

        const allButton = getByText('All');
        const completedButton = getByText('Completed');
        const clearCompletedButton = getByText('Clear Completed');

        fireEvent.click(completedButton);

        expect(queryByText('active Todo')).not.toBeInTheDocument();
        expect(getByText('completed Todo')).toBeInTheDocument();

        fireEvent.click(clearCompletedButton);
        fireEvent.click(allButton);

        expect(queryByText('active Todo')).toBeInTheDocument();
        expect(queryByText('completed Todo')).not.toBeInTheDocument();
    });
});
