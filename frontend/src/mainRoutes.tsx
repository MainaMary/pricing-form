import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Form from "./components/Form";
import SingleVariety from "./pages/SingleVariety";

const routes = [
  {
    path: "/",
    component: <Form />,
  },
  {
    path: "/products",
    component: <Products />,
  },
  {
    path: "/singleVariety/:id",
    component: <SingleVariety />,
  },
];

const MainRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, component }, index) => (
        <Route index key={index} path={path} element={component} />
      ))}
    </Routes>
  );
};
export default MainRoutes;
