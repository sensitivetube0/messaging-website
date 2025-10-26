import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routes from "./routes/router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();
//queryclient not set up right
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
