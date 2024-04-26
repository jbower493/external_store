import { useEffect, useState } from "react";

interface Store {
    listenerIdCounter: number;
    id: number;
    state: any;
    listeners: Record<number, () => void>;
    subscribe: (listenerUpdaterFunction: () => void) => number;
    unsubscribe: (listenerId: number) => void;
}

interface Storage {
    idCounter: number;
    addStore: (initialState: any) => number;
    stores: Record<number, Store>;
    updateStoreState: (storeId: number, newState: any) => void;
}

const storage: Storage = {
    idCounter: 0,

    addStore(initialState: any) {
        const newStore: Store = {
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

    updateStoreState(storeId: number, newState: any) {
        const storeToUpdate = this.stores[storeId];
        storeToUpdate.state = newState;

        Object.entries(storeToUpdate.listeners).forEach(
            ([listenerId, listenerUpdaterFunction]) => {
                listenerUpdaterFunction();
            }
        );
    },
};

export function createStore(initialState: any): number {
    const newStoreId = storage.addStore(initialState);

    return newStoreId;
}

export function useStore(storeId: number): any {
    const [, setCount] = useState(0);

    const state = storage.stores[storeId].state;

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
