import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown,
  Button,
} from "reactstrap";

import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = async () => {
    await auth.logout();
  };

  return (
    <nav className="navbar">
      <h1>DSi</h1>

      <div className="links">
        {auth?.user?.permissions?.includes("view-member-list") && (
          <Link to="/employees">Employees</Link>
        )}

        {auth?.user?.permissions?.includes("add-member") && (
          <Button
            color="primary"
            outline
            onClick={(e) => navigate("/employees/add")}
          >
            Add Employee
          </Button>
        )}

        {auth?.user?.access_token ? (
          <UncontrolledButtonDropdown
            className="dropdown-button"
            color="primary"
          >
            <DropdownToggle caret>
              {auth.user.username.split("@")[0]}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={(e) => navigate("/profile")}>
                Profile
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;

const adminMenu = [
  {
    id: 1,
    name: "Employees",
    path: "/employees",
  },
];
