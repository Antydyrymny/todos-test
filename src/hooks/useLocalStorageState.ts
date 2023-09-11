import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

/**
 * saves state in localStorage
 * @param initialState initial state value to save
 * @param key string by which state is saved to localStorage
 * @returns array of values:
 * @state react state,
 * @setState react setState,
 * @clearLocalStorage function to clear entry from localStorage
 */
export function useLocalStorageState<State>(
    initialState: State,
    key: string
): [State, Dispatch<SetStateAction<State>>, VoidFunction] {
    const initializer = (): State => {
        const storedValue = window.localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialState;
    };
    const [state, setState] = useState(() => initializer());

    useEffect(
        () => window.localStorage.setItem(key, JSON.stringify(state)),
        [state, key]
    );
    const clearLocalStorage = useCallback(
        () => window.localStorage.removeItem(key),
        [key]
    );

    return [state, setState, clearLocalStorage];
}
