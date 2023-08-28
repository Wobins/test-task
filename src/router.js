import { createBrowserRouter, } from "react-router-dom";
import Home from "./views/Home/Home";
import CreateEntry from "./views/CreateEntry/CreateEntry";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create-entry",
    element: <CreateEntry />,
  }
]);

export default router;