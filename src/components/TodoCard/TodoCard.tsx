import { Todo } from '../../TodoTypes';
import CheckmarkSvg from '../../assets/CheckmarkSvg';
import styles from './TodoCard.module.scss';

type TodoProps = {
    todo: Todo;
    toggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function TodoCard({ todo, toggle }: TodoProps) {
    return (
        <label className={styles.label}>
            <input type='checkbox' checked={todo.completed} onChange={toggle} />
            <div className={styles.checkMark}>{todo.completed && <CheckmarkSvg />}</div>
            <span
                className={`${styles.todo} ${
                    todo.completed ? styles.checked : styles.unchecked
                }`}
            >
                {todo.title}
            </span>
        </label>
    );
}

export default TodoCard;
