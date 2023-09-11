import { render, fireEvent } from '@testing-library/react';
import DropDown from './DropDown';

const mainBar = <div>Main Bar Text</div>;
const content = 'Content';

describe('DropDown', () => {
    it('renders main bar and content since it is initially open', () => {
        const { getByText } = render(<DropDown mainBar={mainBar}>{content}</DropDown>);

        expect(getByText('Main Bar Text')).toBeInTheDocument();
        expect(getByText('Content')).toBeInTheDocument();
    });

    it('toggles content on/off', async () => {
        const { getByText, getByAltText } = render(
            <DropDown mainBar={mainBar}>{content}</DropDown>
        );

        const arrowIcon = getByAltText('drop down arrow');
        const contentElement = getByText('Content');
        // Content initially in the document
        expect(contentElement).toBeInTheDocument();
        fireEvent.click(arrowIcon);
        // Now closed - content should disappear
        expect(contentElement).not.toBeInTheDocument();
        fireEvent.click(arrowIcon);
        // Back open again - content should be back
        expect(getByText('Content')).toBeInTheDocument();
    });
});
