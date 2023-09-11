import { useState, useCallback } from 'react';
import { useLocalStorageState, usePagination } from './hooks';
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoDisplayType } from './TodoTypes';
import TextInput from './components/TextInput/TextInput';
import PageCounter from './components/PageCounter/PageCounter';
import TodoPage from './components/TodoPage/TodoPage';
import DropDown from './components/DropDown/DropDown';
import styles from './Todos.module.scss';

const localStorageKey = 'TODOS_LOCALSTORAGE_KEY';
const todosPerPage = 3;

function Todos() {
    const [todos, setTodos] = useLocalStorageState<Todo[]>([], localStorageKey);
    const [displayType, setDisplayType] = useState<TodoDisplayType>(TodoDisplayType.all);

    // Helper functions
    const getActiveTodos = useCallback(() => {
        return todos.filter((todo: Todo): boolean => !todo.completed);
    }, [todos]);
    const getCompletedTodos = useCallback(() => {
        return todos.filter((todo: Todo): boolean => todo.completed);
    }, [todos]);

    const filteredTodos: Todo[] =
        displayType === TodoDisplayType.all
            ? todos
            : displayType === TodoDisplayType.active
            ? getActiveTodos()
            : getCompletedTodos();

    const [
        curPage,
        lastPage,
        getEntriesForCurPage,
        allowPrevPage,
        allowNextPage,
        goToPrevPage,
        goToNextPage,
    ] = usePagination<Todo>(filteredTodos.length, todosPerPage);
    const [newTodoTitle, setNewTodoTitle] = useState<string>('');

    const todosOnCurPage: Todo[] = getEntriesForCurPage(filteredTodos);

    // Event handlers
    const addTodo = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (newTodoTitle.trim() !== '') {
                setTodos([
                    ...todos,
                    { id: uuidv4(), title: newTodoTitle, completed: false },
                ]);
                setNewTodoTitle('');
            }
        },
        [newTodoTitle, setTodos, todos]
    );

    const getToggleTodo = useCallback(
        (targetId: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
            setTodos(
                todos.map(
                    (todo: Todo): Todo =>
                        targetId === todo.id
                            ? { ...todo, completed: e.target.checked }
                            : todo
                )
            ),
        [setTodos, todos]
    );

    const clearCompletedTodos = useCallback(
        () => setTodos(getActiveTodos()),
        [getActiveTodos, setTodos]
    );

    return (
        <DropDown
            mainBar={
                <form onSubmit={addTodo} className={styles.form}>
                    <TextInput
                        value={newTodoTitle}
                        placeholder={'Todo title'}
                        onChange={(e) => setNewTodoTitle(e.target.value)}
                        required
                    />
                    <PageCounter curPage={curPage} lastPage={lastPage} />
                </form>
            }
        >
            <TodoPage
                todosPerPage={todosPerPage}
                todosOnCurPage={todosOnCurPage}
                getToggleTodo={getToggleTodo}
                allowPrevPage={allowPrevPage}
                allowNextPage={allowNextPage}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage}
                todosLeft={getActiveTodos().length}
                displayType={displayType}
                displayAll={() => setDisplayType(TodoDisplayType.all)}
                displayActive={() => setDisplayType(TodoDisplayType.active)}
                displayCompleted={() => setDisplayType(TodoDisplayType.completed)}
                clearCompleted={clearCompletedTodos}
            />
        </DropDown>
    );
}

export default Todos;
