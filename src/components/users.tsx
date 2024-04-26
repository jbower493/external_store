import { createStore, useStore } from "../store";

const usersStore = createStore(0);

export default function Users() {
    const [usersState, setUsersState] = useStore<number>(usersStore);
    console.log("users re-rendered");

    return (
        <div>
            <h1>Users</h1>
            <p>Users state: {usersState}</p>
            <button onClick={() => setUsersState(usersState + 1)}>
                Update users state
            </button>
        </div>
    );
}
