import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { getCartsByUser } from "./api/cartApi";
import { checkUserIsExist, verifyToken } from "./api/userApi";
import AdminLayout from "./components/Layout/AdminLayout";
import DefaultLayout from "./components/Layout/DefaultLayout";
import NotFound from "./components/NotFound";
import Admin from "./pages/Admin";
import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";
import ListProductAdmin from "./pages/Admin/ListProduct";
import UserManagement from "./pages/Admin/UserManagement";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import userSlice from "./pages/Auth/userSlice";
import Cart from "./pages/Cart";
import cartSlice from "./pages/Cart/cartSlice";
import ListProduct from "./pages/Product/ListProduct";
import ProductDetail from "./pages/Product/ProductDetail";
import OrderProduct from "./pages/Admin/OrderProduct";

// role 0 : user
// role 1 : admin
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  // Lưu trạng thái user hay admin đang đăng nhập
  const [auth, setAuth] = useState(false);
  // Lưu trạng thái token còn hiệu lực không
  const [isToken, setIsToken] = useState(false);

  const user = useSelector((state) => state.users.currentUser);
  const checkLogin = async () => {
    try {
      // Kiểm tra user còn tồn tại trong DB không
      const isUserExistDB = await checkUserIsExist({ email: user.email });
      if (isUserExistDB) {
        // Kiểm tra xem token còn hiệu lực không
        const response = await verifyToken();
        if (response?.data?.status === 200) {
          setIsToken(true);
          if (user.role === 0) {
            setAuth(false);
          } else {
            setAuth(true);
          }
        } else {
          dispatch(userSlice.actions.logout());
          localStorage.removeItem("user");
          setIsToken(false);
        }
      } else {
        dispatch(userSlice.actions.logout());
        localStorage.removeItem("user");
        setIsToken(false);
      }
    } catch (error) {
      if (error?.response?.data?.status === 401) {
        dispatch(userSlice.actions.logout());
        localStorage.removeItem("user");
        setIsToken(false);
      } else {
        console.log("Loi he thong");
      }
    }
  };
  // eslint-disable-next-line
  useEffect(() => {
    checkLogin();
  }, [location.search, location.pathname]);

  // lay thong tin cart luu vao local khi nguoi dung load trang
  useEffect(() => {
    (async () => {
      if (user.role === 0) {
        // Lấy thông tin trong cart theo user
        const carts = await getCartsByUser(user.userCode);
        // Luu thong tin cart len local
        localStorage.setItem("cart", JSON.stringify(carts.data.data));
        dispatch(cartSlice.actions.initCart(carts.data.data));
      }
    })();
  }, [location.pathname]);
  return (
    <div className="App">
      <Routes>
        {isToken ? (
          <>
            {auth ? (
              <>
                <Route
                  path="/admin"
                  element={
                    <AdminLayout>
                      <Admin />
                    </AdminLayout>
                  }
                >
                  <Route index element={<UserManagement />} />
                  <Route path="product" element={<ListProductAdmin />} />
                  <Route path="product/create" element={<AddProduct />} />
                  <Route path="product/edit/:id" element={<EditProduct />} />
                  <Route path="order" element={<OrderProduct />} />
                </Route>
              </>
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    <DefaultLayout>
                      <ListProduct />
                    </DefaultLayout>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <DefaultLayout>
                      <ProductDetail />
                    </DefaultLayout>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <DefaultLayout>
                      <Cart />
                    </DefaultLayout>
                  }
                />
              </>
            )}
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <DefaultLayout>
                  <ListProduct />
                </DefaultLayout>
              }
            />
            <Route
              path="/product/:id"
              element={
                <DefaultLayout>
                  <ProductDetail />
                </DefaultLayout>
              }
            />
          </>
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <NotFound src="https://material-kit-pro-react.devias.io/assets/errors/error-404.png" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
