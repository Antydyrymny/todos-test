import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

const placeholderText = 'enter new todo';
const inputValue = 'new Todo';
const onChangeMock = vi.fn();

describe('TextInput', () => {
    beforeEach(() => {
        onChangeMock.mockClear();
    });

    it('renders with provided props', () => {
        render(
            <TextInput
                value={inputValue}
                placeholder={placeholderText}
                onChange={() => {}}
            />
        );

        const inputElement = screen.getByPlaceholderText(placeholderText);

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue(inputValue);
    });

    it('triggers the onChange function when the input value changes', () => {
        render(
            <TextInput
                value={inputValue}
                placeholder={placeholderText}
                onChange={onChangeMock}
            />
        );

        const inputElement = screen.getByPlaceholderText(placeholderText);
        fireEvent.change(inputElement, { target: { value: 'Entered text' } });

        expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    it('renders as a required input if the "required" prop is provided', () => {
        render(
            <TextInput
                value={inputValue}
                placeholder={placeholderText}
                onChange={() => {}}
                required={true}
            />
        );

        const inputElement = screen.getByPlaceholderText(placeholderText);

        expect(inputElement).toHaveAttribute('required');
    });
});
