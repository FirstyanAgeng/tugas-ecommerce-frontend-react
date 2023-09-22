import { Routes, Route } from "react-router-dom";
import {
  HOME,
  PRODUCT,
  ORDER,
  LOGIN,
  DASHBOARD_ADMIN,
  MANAGE_PRODUCT,
  ORDER_ITEM,
} from "./router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Product from "./pages/User/Product";
import Dashboard from "./pages/Admin/Dashboard";
import NotFound from "./components/NotFound";
import Order from "./pages/Admin/Order";
import ProductManage from "./pages/Admin/Product";
import OrderItem from "./pages/Admin/OrderItem";

const App = () => {
  return (
    <Routes>
      <Route path={HOME} element={<Homepage />} />
      <Route path={LOGIN} element={<Login />} />
      <Route path={PRODUCT} element={<Product />} />
      <Route path={DASHBOARD_ADMIN} element={<Dashboard />} />
      <Route path={MANAGE_PRODUCT} element={<ProductManage />} />
      <Route path={ORDER} element={<Order />} />
      <Route path={ORDER_ITEM} element={<OrderItem />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
