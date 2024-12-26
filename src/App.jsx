import { Route, Routes } from "react-router-dom";
import Home from "./components/common/home";
import Dashboard from "./components/pages/Dashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

      </Route>
    </Routes>
  );
}

export default App;
