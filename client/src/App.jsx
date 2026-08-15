import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout, { ProtectedRoute } from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./component/Register";
import Login from "./component/Login";
import NewExp from "./pages/NewExp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/exp" element={<NewExp />} />
          </Route>
        </Route>
      </Routes>

    </>
  );
}

export default App;
