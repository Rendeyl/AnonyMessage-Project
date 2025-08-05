import { useState } from "react";
import { Link } from "react-router-dom";

function Create_Account(){

    const [showPassword, setShowPassword] = useState(false);

    function CheckboxChange() {
    setShowPassword(prev => !prev);
  }


    return(
        <div id="container1">
            <Link to={"/"}>
            <img id="headerLogo" src="/icon.png" alt="Logo"/>
            </Link>

            <h1 id="createtxt">Create Account</h1>

            <input id="username-input" className="CA-input"
             placeholder="Username" type="text"/>

            <input id="password-input" className="CA-input"
             placeholder="Password" type={showPassword ? "text" : "password"}/>

            <input id="confirm-password" className="CA-input"
             placeholder="Confirm Password" type={showPassword ? "text" : "password"}/>
            
            <label id="passwordCB">
                <input type="checkbox" id="checkboxPassword"
                 checked={showPassword}
                onChange={CheckboxChange}/> Show Password
            </label>

            <button id="CA-btn">Create Account</button>
            
        </div>
    );

}
export default Create_Account