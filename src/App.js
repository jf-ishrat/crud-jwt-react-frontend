import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import Admin from './pages/Admin';
import Member from './pages/Member';
import Login from './pages/Login';
import AddMember from './pages/AddMember';
import EditMember from './pages/EditMember';



function App() {
 // const user = AuthService.getUser();
  return (
   <div className="App">
    <Navbar /> 

<div className="content">
     <Routes>
        <Route path="/" element={ <Login/> } />
         <Route exact path="/admin-dashboard" element={ <Admin/> } />
        <Route exact path="/member-profile/:id" element={ <Member/> } />
        <Route exact path="/admin-dashboard/add" element={ <AddMember/> } />
        <Route exact path="/admin-dashboard/Edit/:id" element={ <EditMember/> } />
      
      </Routes>


     </div>

    {/* <Footer />  */}
    
    </div>
 
  );
}

export default App;
