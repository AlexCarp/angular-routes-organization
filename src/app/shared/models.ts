export type Partial<T> = {
    [V in keyof T]?: T[V];
};
