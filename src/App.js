import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Admin from "./pages/Admin";
import Member from "./pages/Member";
import Login from "./pages/Login";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";
import Layout from "./component/Layout";
import RequireAuth from "./component/RequireAuth";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/oauth2/**" element={<Login />} />

          <Route
            element={<RequireAuth allowedPermissions={["view-member-list"]} />}
          >
            <Route exact path="/employees" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedPermissions={["view-member"]} />}>
            <Route exact path="/employees/profile/:id" element={<Member />} />
          </Route>
          <Route
            element={<RequireAuth allowedPermissions={["view-profile"]} />}
          >
            <Route exact path="/profile" element={<Member />} />
          </Route>
          <Route element={<RequireAuth allowedPermissions={["add-member"]} />}>
            <Route exact path="/employees/add" element={<AddMember />} />
          </Route>
          <Route element={<RequireAuth allowedPermissions={["edit-member"]} />}>
            <Route exact path="/employees/Edit/:id" element={<EditMember />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
