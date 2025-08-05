import { useState } from "react";
import { Link } from "react-router-dom";

function Login(){

    const [showPassword, setShowPassword] = useState(false);
    
        function CheckboxChange() {
        setShowPassword(prev => !prev);
      }

    return(
        <div id="container1">
            <Link to={"/"}>
            <img id="headerLogo" src="/icon.png" alt="Logo"/>
            </Link>

            <h1 id="createtxt">Log-in</h1>

            <input id="username-input" className="CA-input"
             placeholder="Username" type="text"/>

             <input id="password-input" className="CA-input"
             placeholder="Password" type={showPassword ? "text" : "password"}/>

             <label id="passwordCB">
                <input type="checkbox" id="checkboxPassword"
                 checked={showPassword}
                onChange={CheckboxChange}/> Show Password
            </label>

             <button id="CA-btn">Create Account</button>
        </div>
    );
}
export default Login