import Index from "./pages/index";
import Create_Account from "./pages/create-account";
import UserPage from "./pages/userpage";
import {} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return(
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/CreateAccount" element={<Create_Account/>}/>
      </Routes>
    </Router>
    *
    {/*<UserPage username="Dale"/>*/}
    </>
  );
}

export default App
