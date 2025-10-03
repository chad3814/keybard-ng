import MainScreen from "./components/MainScreen";
import { VialProvider } from "./contexts/VialContext";

function App() {
    return (
        <VialProvider>
            <MainScreen />
        </VialProvider>
    );
}

export default App;
