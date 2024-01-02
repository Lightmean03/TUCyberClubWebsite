import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/Signin/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import createStore from "./redux/store";
import "./styles.css";

const store = createStore();
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
  </React.StrictMode>,
);