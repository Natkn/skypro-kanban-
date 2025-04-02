import "../src/assets/App.css";
import AppRoutes from "./AppRoutes.jsx";
import AuthProvider from "./components/context/AuthProvider.jsx";
import { TaskProvider } from "./components/context/TaskProvider.jsx";
function App() {
  return (
    <TaskProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </TaskProvider>
  );
}

export default App;
