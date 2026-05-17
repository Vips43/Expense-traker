import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout, { ProtectedRoute } from "./pages/Layout";
import AddExp from "./pages/AddExp";
import Home from "./pages/Home";
import Register from "./component/Register";
import Login from "./component/Login";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="form" element={<AddExp />} />
            <Route path="form/add-earning" element={<AddExp />} />
            <Route path="edit" element={<AddExp />} />
            <Route path="home" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
