import { useState } from "react";

function Create_Account(){

    const [showPassword, setShowPassword] = useState(false);

    function CheckboxChange() {
    setShowPassword(prev => !prev);
  }


    return(
        <div id="container1">
            <img id="headerLogo" src="/icon.png" alt="Logo"/>

            <h1 id="createtxt">Create Account</h1>

            <input id="username-input" className="CA-input"
             placeholder="Username" type="text"/>

            <input id="password-input" className="CA-input"
             placeholder="Password" type={showPassword ? "text" : "password"}/>

            <input id="confirm-password" className="CA-input"
             placeholder="Confirm Password" type={showPassword ? "text" : "password"}/>
            
            <label>
                <input type="checkbox" id="showpassCB"
                 checked={showPassword}
                onChange={CheckboxChange}/> Show Password
            </label>
            
            <button id="CA-btn">Create Account</button>
        </div>
    );

}
export default Create_Account