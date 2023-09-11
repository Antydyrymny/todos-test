import styles from './TodoCard.module.scss';

type TodoCardWrapper = {
    children?: React.ReactNode;
};

function TodoCardWrapper({ children }: TodoCardWrapper) {
    return <div className={styles.wrapper}>{children}</div>;
}

export default TodoCardWrapper;
