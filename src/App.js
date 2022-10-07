import React, { Fragment, useState } from "react";
import Header1 from "./components/Header";
import "antd/dist/antd.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./pages/categories";
import ListFood from "./pages/listfood";
import { message, Layout } from "antd";
import Cart from "./pages/Cart";
import Login from "./pages/Login";


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Header1></Header1>
                <Categories />
              </Layout>
            }
          />
          <Route
            path="/listfood:name"
            element={
              <Layout>
                <Header1></Header1>
                <ListFood />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <Header1></Header1>
                <Cart />
              </Layout>
            }
          />
           <Route
            path="/login"
            element={
              <Layout>
                <Header1></Header1>
                <Login />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
