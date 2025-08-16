import { useState } from "react";
import { Link } from "react-router-dom";

function Login(){

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
        function CheckboxChange() {
        setShowPassword(prev => !prev);
      }

      async function handleLogin() {
        
        if (!username || !password) {
            alert("Please fill in all fields.");
            return;   
        }

        try{
            const res = await fetch(
            "https://anony-message-backend.vercel.app/api/login",
            {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
          }
        );

        const data = await res.json();

        if(res.ok){
            window.location.href = data.redirect;
        }else{
            alert(data.message);
        }

        }catch (err){
            console.error("Error:", err);
            alert("Something went wrong.");
        }

      }

    return(
        <div id="container1">
            <Link to={"/"}>
            <img id="headerLogo" src="/icon.png" alt="Logo"/>
            </Link>

            <h1 id="createtxt">Log-in</h1>

            <input id="username-input" className="CA-input"
             placeholder="Username" type="text"
             value={username} onChange={(e) => setUsername(e.target.value)}/>

             <input id="password-input" className="CA-input"
             placeholder="Password" type={showPassword ? "text" : "password"}
             value={password} onChange={(e) => setPassword(e.target.value)}/>

             <label id="passwordCB">
                <input type="checkbox" id="checkboxPassword"
                 checked={showPassword}
                onChange={CheckboxChange}/> Show Password
            </label>

             <button id="CA-btn" onClick={handleLogin}>Create Account</button>
        </div>
    );
}
export default Login