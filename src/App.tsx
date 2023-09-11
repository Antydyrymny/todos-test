import Todos from './Todos';
import styles from './App.module.scss';
import BottomBarDecoration from './components/BottomBar/BottomBarDecoration';

function App() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>todos</h1>
            <main className={styles.container}>
                <Todos />
                <BottomBarDecoration />
            </main>
        </div>
    );
}

export default App;
