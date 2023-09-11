import prevPage from '../../assets/prevPage.png';
import nextPage from '../../assets/nextPage.png';
import styles from './PageNavigation.module.scss';

type PageNavigationProps = {
    allowPrevPage: boolean;
    allowNextPage: boolean;
    goToPrevPage: () => void;
    goToNextPage: () => void;
};

function PageNavigation({
    allowPrevPage,
    allowNextPage,
    goToPrevPage,
    goToNextPage,
}: PageNavigationProps) {
    return (
        <div className={styles.pageNavigation}>
            <div
                onClick={allowPrevPage ? goToPrevPage : undefined}
                className={`${styles.prevPage} ${
                    allowPrevPage ? '' : styles.pageDisabled
                }`}
            >
                <img src={prevPage} alt='To previous page' />
            </div>
            <div
                onClick={allowNextPage ? goToNextPage : undefined}
                className={`${styles.nextPage} ${
                    allowNextPage ? '' : styles.pageDisabled
                }`}
            >
                <img src={nextPage} alt='To next page' />
            </div>
        </div>
    );
}

export default PageNavigation;
