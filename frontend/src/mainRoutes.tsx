import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";

const routes = [
  {
    path: "/products",
    component: <Products />,
  },
];

const MainRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, component }, index) => (
        <Route key={index} path={path} element={component} />
      ))}
    </Routes>
  );
};
export default MainRoutes;
