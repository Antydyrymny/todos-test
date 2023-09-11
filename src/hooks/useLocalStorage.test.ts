import { renderHook, act } from '@testing-library/react';
import { useLocalStorageState } from '.';

describe('useLocalStorageState', () => {
    const mockKey = 'mockKey';
    const initialVal = 'initialVal';
    const oldVal = 'oldVal';
    const newVal = 'newVal';
    const clearLocalStorage = () => {
        localStorage.clear();
    };

    afterEach(() => {
        clearLocalStorage();
    });

    it('correctly sets initial state', () => {
        const { result } = renderHook(() => useLocalStorageState(initialVal, mockKey));

        const [state] = result.current;

        expect(state).toBe(initialVal);
    });

    it('saves state to localStorage and updates "state"', () => {
        const { result } = renderHook(() => useLocalStorageState(initialVal, mockKey));
        const [, setState] = result.current;

        act(() => {
            setState(newVal);
        });

        const storedValue = localStorage.getItem(mockKey);
        const [state] = result.current;

        expect(storedValue).toBe(JSON.stringify(newVal));
        expect(state).toBe(newVal);
    });

    it('reads state from localStorage', () => {
        localStorage.setItem(mockKey, JSON.stringify(oldVal));

        const { result } = renderHook(() => useLocalStorageState(initialVal, mockKey));
        const [state] = result.current;

        expect(state).toBe(oldVal);
    });

    it('should clear localStorage when clearLocalStorage is called', () => {
        localStorage.setItem(mockKey, JSON.stringify(oldVal));

        const { result } = renderHook(() => useLocalStorageState(initialVal, mockKey));

        const [, , clearLocalStorage] = result.current;

        act(() => {
            clearLocalStorage();
        });

        const storedValue = localStorage.getItem(mockKey);
        expect(storedValue).toBe(null);
    });
});
