import React, { lazy, Suspense } from 'react';
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
import BackdropContext from './context/backdropContext.jsx';
import NotFoundPage from './components/PageNotFound/PageNotFound.jsx';

const BlogCreationScreen = lazy(() => import('./screens/BlogCreationScreen/BlogCreationScreen.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/signin" element={<LoginScreen />} />
      <Route path="/signup" element={<RegisterScreen />} />
      <Route path="*" element={<NotFoundPage/>} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/profile/update" element={<UpdateAccountScreen />} />
        <Route path="/create" element={
          <Suspense fallback={<div>Loading...</div>}>
            <BlogCreationScreen />
          </Suspense>
        } />
      </Route>
      <Route path="/post/:id" element={<SingleBlogScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
     <BackdropContext>
     <RouterProvider router={router} />
     </BackdropContext>
    </React.StrictMode>
  </Provider>
);
