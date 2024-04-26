import { createStore } from "../store";

const todosStore = createStore(0);

export default function Todos() {
    return (
        <div>
            <h1>Todos</h1>
        </div>
    );
}
