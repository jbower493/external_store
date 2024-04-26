import { useEffect, useState } from "react";

interface Store<T> {
    listenerIdCounter: number;
    id: number;
    state: T;
    listeners: Record<number, () => void>;
    subscribe: (listenerUpdaterFunction: () => void) => number;
    unsubscribe: (listenerId: number) => void;
}

interface Storage {
    idCounter: number;
    addStore: <T>(initialState: T) => number;
    stores: {
        [key: number]: Store<any>;
    };
    updateStoreState: <T>(storeId: number, newState: T) => void;
}

const storage: Storage = {
    idCounter: 0,

    addStore<T>(initialState: T) {
        const newStore: Store<T> = {
            listenerIdCounter: 0,
            id: this.idCounter,
            state: initialState,
            listeners: {},
            subscribe(listenerUpdaterFunction) {
                const listenerId = this.listenerIdCounter++;
                this.listeners[listenerId] = listenerUpdaterFunction;

                return listenerId;
            },
            unsubscribe(listenerId) {
                delete this.listeners[listenerId];
            },
        };

        this.idCounter++;

        this.stores[newStore.id] = newStore;

        return newStore.id;
    },

    stores: {},

    updateStoreState<T>(storeId: number, newState: T) {
        const storeToUpdate = this.stores[storeId];
        storeToUpdate.state = newState;

        Object.values(storeToUpdate.listeners).forEach(
            (listenerUpdaterFunction) => {
                listenerUpdaterFunction();
            }
        );
    },
};

export function createStore<T>(initialState: T): number {
    const newStoreId = storage.addStore(initialState);

    return newStoreId;
}

export function useStore<T>(storeId: number): [T, (newState: any) => void] {
    const [, setCount] = useState(0);

    const state: T = storage.stores[storeId].state;

    function setState(newState: any) {
        storage.updateStoreState(storeId, newState);
    }

    useEffect(() => {
        const store = storage.stores[storeId];

        const listenerId = store.subscribe(() => setCount((prev) => prev + 1));

        return () => {
            store.unsubscribe(listenerId);
        };
    }, []);

    return [state, setState];
}
