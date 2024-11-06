import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute.jsx";
import UpdateAccountScreen from "./screens/UpdateAccountScreen/UpdateAccountScreen.jsx";
import SingleBlogScreen from "./screens/SingleBlogScreen/SingleBlogScreen.jsx";
import NotFoundPage from "./components/PageNotFound/PageNotFound.jsx";
import UserPublicProfile from "./components/UserPublicProfile/UserPublicProfile.jsx";
import EmailSignUp from "./components/EmailSignUp/Verification.jsx";
import ForgotPassword from "./screens/ForgotPasswordScreen/ForgotPassword.jsx";
import ResetPassword from "./screens/ResetPassword/ResetPassword.jsx";

const BlogCreationScreen = lazy(() =>
  import("./screens/BlogCreationScreen/BlogCreationScreen.jsx")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/signin" element={<LoginScreen />} />
      <Route path="/signup" element={<RegisterScreen />} />
      <Route path="/sitemap" element={<h1>SITTMAP</h1>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="verify-email" element={<EmailSignUp />} />
        <Route path="/profile/update" element={<UpdateAccountScreen />} />
        <Route
          path="/create"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <BlogCreationScreen />
            </Suspense>
          }
        />
      </Route>
      <Route path="/post/:id" element={<SingleBlogScreen />} />
      <Route path="/author/:id" element={<UserPublicProfile />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
