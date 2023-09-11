import styles from './PageCounter.module.scss';

type PageCounterProps = {
    curPage: number;
    lastPage: number;
};

function PageCounter({ curPage, lastPage }: PageCounterProps) {
    return <div className={styles.pageCounter}>{`page ${curPage}/${lastPage}`}</div>;
}

export default PageCounter;
