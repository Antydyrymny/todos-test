import { useState } from 'react';
import dropDownArrow from '../../assets/dropDownArrow.png';
import styles from './DropDown.module.scss';

type DropDownProps = {
    mainBar: JSX.Element;
    children: React.ReactNode;
};

function DropDown({ children, mainBar }: DropDownProps) {
    const [dropDownIsOpen, setDropDownIsOpen] = useState(true);

    return (
        <>
            <div className={styles.mainBar}>
                <img
                    src={dropDownArrow}
                    onClick={() => setDropDownIsOpen(!dropDownIsOpen)}
                    className={`${styles.dropwDownArrow} ${
                        dropDownIsOpen ? styles.open : styles.closed
                    }`}
                    alt='drop down arrow'
                />
                {mainBar}
            </div>
            {dropDownIsOpen && <div className={styles.content}>{children}</div>}
        </>
    );
}

export default DropDown;
