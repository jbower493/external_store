import { createStore } from "../store";

const usersStore = createStore(0);

export default function Users() {
    return (
        <div>
            <h1>Users</h1>
        </div>
    );
}
