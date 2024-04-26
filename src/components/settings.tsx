import { createStore, useStore } from "../store";

const settingsStore = createStore(0);

export default function Settings() {
    const [settingsState, setSettingsState] = useStore<number>(settingsStore);
    console.log("settings re-rendered");

    return (
        <div>
            <h1>Settings</h1>
            <p>Settings state: {settingsState}</p>
            <button onClick={() => setSettingsState(settingsState + 1)}>
                Update settings state
            </button>
        </div>
    );
}
