import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Components/Signin/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";

import "./styles.css";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
