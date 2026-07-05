import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/context.jsx";
import {  QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient.js";



createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
    ,
  </QueryClientProvider>,
);
