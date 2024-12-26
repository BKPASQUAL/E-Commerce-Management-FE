import { Route, Routes } from "react-router-dom";
import Home from "./components/common/home";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import Users from "./components/pages/Users";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
