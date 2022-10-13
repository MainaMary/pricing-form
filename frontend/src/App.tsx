import React from "react";
import MainRoutes from "./mainRoutes";
import { QueryClientProvider, QueryClient } from "react-query";

import "./App.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MainRoutes />
    </QueryClientProvider>
  );
}

export default App;
