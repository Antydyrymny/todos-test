export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};

export enum TodoDisplayType {
    all = 'All',
    active = 'Active',
    completed = 'Completed',
}
