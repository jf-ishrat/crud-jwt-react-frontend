import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import AuthService from "./services/auth.service";
import Login from './Login';
import SearchDetails from './SearchDetails';
import TopUserByCountry from './TopUserByCountry';
import TopRepositories from './TopRepositories';
import DataVisual from './DataVisual';


function App() {
  const user = AuthService.getUser();
  return (
  
         <div className="App">
    <Navbar /> 

<div className="content">
     <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/home" element={ <Home/> } />
        <Route path="/details/:id" element={ <SearchDetails/> } />
        <Route path="/top-user-by-country" element={ <TopUserByCountry/> } />
        <Route path="/top-repositories" element={ <TopRepositories/> } />
        <Route path="/data-visualization" element={ <DataVisual/> } />
      
      </Routes>


     </div>

    <Footer /> 
    
    </div>
 
  );
}

export default App;
