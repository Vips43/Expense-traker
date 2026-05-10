import { Button, Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";
import Register from "../component/Register";
import Login from "../component/Login";

function AuthUser() {
  return (
    <>
      <Register />
      {/* <Login /> */}
    </>
  );
}

export default AuthUser;
