import { createStore, useStore } from "../store";

const todosStore = createStore(0);

export default function Todos() {
    const [todosState, setTodosState] = useStore<number>(todosStore);
    console.log("todos re-rendered");

    return (
        <div>
            <h1>Todos</h1>
            <p>Todos state: {todosState}</p>
            <button onClick={() => setTodosState(todosState + 1)}>
                Update todos state
            </button>
        </div>
    );
}
