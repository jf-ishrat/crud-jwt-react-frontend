import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";


const Navbar = () => {
  const user = AuthService.getUser();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate(0);


  }

  return (
    <nav className="navbar">
      <h1>Github Trending</h1>
      <div className="links">
        {user && 
          menu.map((item)=>(
            <Link key={item.id} to={item.path}>{item.name}</Link>

          ))
        }
        
        <Link to={user ? "/home" : "/"} style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>Login</Link>
          <Link to="/" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}
        onClick={handleLogout}
        >Logout</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;

const menu = [
  {
    id: 1,
    name: "Home",
    path: "/home"
  },
  {
    id: 2,
    name: "Top user by country",
    path: "/top-user-by-country"
  },
  {
    id: 3,
    name: "Top repositories",
    path: "/top-repositories"
  },
  {
    id: 4,
    name: "Data visualization",
    path: "/data-visualization"
  }
]