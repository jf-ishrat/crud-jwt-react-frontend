import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";


const Navbar = () => {
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();

  const [showMemberBoard, setShowMemberBoard] = useState("");
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
   // const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // setShowMemberBoard(user?.role.includes("member"));
         setShowAdminBoard(user.role.includes("admin") || user.role.includes("Admin"));
    }
  
  }, []);
  const handleLogout = async() => {
    await AuthService.logout();
  };


  return (
    <nav className="navbar">
      <h1>DSi</h1>
    
      <div className="links">
       {showAdminBoard &&
       <>
        {adminMenu.map((item)=>(
            <Link key={item.id} to={item.path}>{item.name}</Link>

          ))}

        <Link to="/admin-dashboard/add" style={{ 
            color: 'white', 
            backgroundColor: '#0277bd'
          }}
         // onClick={addNewEmployee}
          >Add Employee</Link>
       </>
         
        
        } 

       {currentUser &&
           <Link to="/" style={{ 
            color: 'white', 
            backgroundColor: '#0277bd'
          }}
          onClick={handleLogout}
          >Logout</Link>
        }
        
      </div>
    </nav>
  );
}
 
export default Navbar;

const adminMenu = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin-dashboard"
  }

]