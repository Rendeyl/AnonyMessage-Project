import Index from "./pages/index";
import Create_Account from "./pages/create-account";
import UserPage from "./pages/userpage";
import Sender from "./pages/SendMessage";
import Login from "./pages/Login";
import {} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return(
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/CreateAccount" element={<Create_Account/>}/>
        <Route path="/User" element={<UserPage username={"Rhen Dale"}/>}/>
        <Route path="/Send" element={<Sender/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes> 
    </Router>
    
    </>
  );  
}

export default App
