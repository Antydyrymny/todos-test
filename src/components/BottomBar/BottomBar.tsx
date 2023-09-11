import { TodoDisplayType } from '../../TodoTypes';
import styles from './BottomBar.module.scss';

type BottomBarProps = {
    todosLeft: number;
    displayType: TodoDisplayType;
    displayAll: () => void;
    displayActive: () => void;
    displayCompleted: () => void;
    clearCompleted: () => void;
};

function BottomBar({
    todosLeft,
    displayType,
    displayAll,
    displayActive,
    displayCompleted,
    clearCompleted,
}: BottomBarProps) {
    return (
        <div className={styles.bottomBar}>
            <div className={styles.button}>{`${todosLeft} items left`}</div>
            <div className={styles.displayButtons}>
                <button
                    onClick={displayAll}
                    className={displayType === TodoDisplayType.all ? styles.active : ''}
                >
                    All
                </button>
                <button
                    onClick={displayActive}
                    className={
                        displayType === TodoDisplayType.active ? styles.active : ''
                    }
                >
                    Active
                </button>
                <button
                    onClick={displayCompleted}
                    className={
                        displayType === TodoDisplayType.completed ? styles.active : ''
                    }
                >
                    Completed
                </button>
            </div>
            <button className={styles.clearCompleted} onClick={clearCompleted}>
                Clear Completed
            </button>
        </div>
    );
}

export default BottomBar;
