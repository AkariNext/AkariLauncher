type Observer<T> = (state: T) => void;

export class useState<T> {
    value: T
    observers: Observer<T>[];

    constructor(defaultValue: T) {
        this.value = defaultValue;
        this.observers = [];
    }

    public get() {
        return this.value
    }

    public set(state: T) {
        this.value = state
        for (const observer of this.observers) {
            observer(state)
        }
    }

    public addObserver(observer: Observer<T>) {
        this.observers.push(observer);
    }
}

export const minecraftProcesses = new useState<{profileName: string}[]>([])
