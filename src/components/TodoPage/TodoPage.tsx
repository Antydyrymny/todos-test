import { Todo, TodoDisplayType } from '../../TodoTypes';
import TodoCardWrapper from '../TodoCard/TodoCardWrapper';
import TodoCard from '../TodoCard/TodoCard';
import PageNavigation from '../PageNavigation/PageNavigation';
import BottomBar from '../BottomBar/BottomBar';

type TodoPageProps = {
    todosPerPage: number;
    todosOnCurPage: Todo[];
    getToggleTodo: (targetId: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    allowPrevPage: boolean;
    allowNextPage: boolean;
    goToPrevPage: () => void;
    goToNextPage: () => void;
    todosLeft: number;
    displayType: TodoDisplayType;
    displayAll: () => void;
    displayActive: () => void;
    displayCompleted: () => void;
    clearCompleted: () => void;
};

function TodoPage({
    todosPerPage,
    todosOnCurPage,
    getToggleTodo,
    allowPrevPage,
    allowNextPage,
    goToPrevPage,
    goToNextPage,
    todosLeft,
    displayType,
    displayAll,
    displayActive,
    displayCompleted,
    clearCompleted,
}: TodoPageProps) {
    return (
        <>
            {new Array(todosPerPage).fill(null).map((_, ind) => {
                const curTodo = todosOnCurPage[ind];
                return curTodo ? (
                    <TodoCardWrapper key={ind}>
                        <TodoCard todo={curTodo} toggle={getToggleTodo(curTodo.id)} />
                    </TodoCardWrapper>
                ) : (
                    <TodoCardWrapper key={ind} />
                );
            })}
            <PageNavigation
                allowPrevPage={allowPrevPage}
                allowNextPage={allowNextPage}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage}
            />
            <BottomBar
                todosLeft={todosLeft}
                displayType={displayType}
                displayAll={displayAll}
                displayActive={displayActive}
                displayCompleted={displayCompleted}
                clearCompleted={clearCompleted}
            />
        </>
    );
}

export default TodoPage;
