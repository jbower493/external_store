import { createStore } from "../store";

const settingsStore = createStore(0);

export default function Settings() {
    return (
        <div>
            <h1>Settings</h1>
        </div>
    );
}
