import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";

/// Pages
import Error404 from "./common/Error404";

//Scroll To Top
import ScrollToTop from "./layouts/ScrollToTop";

import Admins from "./pages/Admin";
import AddAdmin from "./pages/Admin/AddAdmin";
import Permission from "./pages/Rules";
import Profile from "./pages/Profile";
import ItemTransfer from "./pages/ItemTransfer";
import Products from "./pages/Products";
import AddProducts from "./pages/Products/AddProducts";
import Variant from "./pages/Variant";
import AddVariant from "./pages/Variant/AddVariant";
import Warehouse from "./pages/Warehouse";
import AddWarehouse from "./pages/Warehouse/AddWarehouse";
import Suppliers from "./pages/Suppliers";


const Markup = () => {
  const allroutes = [
    { url: "", component: <Admins /> },

    // Admins
    { url: "admins", component: <Admins /> },
    { url: "admins/add-admins", component: <AddAdmin /> },
    { url: "admins/edit-admin/:id/:name", component: <AddAdmin /> },

    // Rules
    { url: "rules", component: <Permission /> },
    { url: "rules/:id", component: <Permission /> },

    // Products
    { url: "products", component: <Products /> },
    { url: "products/add-products", component: <AddProducts /> },
    { url: "products/add-products/:id", component: <AddProducts /> },
    // { url: "products/:id", component: <EveryProduct /> },

    // Variant
    { url: "variant", component: <Variant /> },
    { url: "variant/add-variant", component: <AddVariant /> },
    { url: "variant/add-variant/:id", component: <AddVariant /> },

    // Warehouse
    { url: "warehouse", component: <Warehouse /> },
    { url: "warehouse/add-warehouse", component: <AddWarehouse /> },
    // Suppliers
    { url: "suppliers", component: <Suppliers /> },

    // Transfer
    { url: "transfer", component: <ItemTransfer /> },

    //Profile
    { url: "profile", component: <Profile /> },

    // Error
    { url: "*", component: <Error404 /> },
  ];

  return (
    <>
      <Routes>
        <Route path="page-error-404" element={<Error404 />} />
        <Route element={<MainLayout />}>
          {allroutes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  );
};

function MainLayout() {
  return (
    <div id="main-wrapper" className={`show `}>
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: window.screen.height - 45 }}
      >
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Markup;
