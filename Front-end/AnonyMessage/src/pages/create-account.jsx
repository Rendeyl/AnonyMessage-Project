import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Create_Account(){
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);


    function CheckboxChange() {
    setShowPassword(prev => !prev);
  }

    async function handleCreateAccount() {

    if (!username || !password) {
      alert("Please fill in all fields.");
      return;   
    }

    if(username.length < 2 || username.length > 9){
      alert("Invalid Username Length");
      return;
    }
    
    if (password.length < 4 || password.length > 18) {
      alert("Invalid Password Length");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://anony-message-backend.vercel.app/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }), 
        }
      );

      const data = await res.json();
      console.log("Signup response:", data);

      if (res.ok) {
        setLoading(false);
        alert("Account created successfully!");
        navigate("/");
      } else {
        alert(data.message || "Error creating account.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  }


    return(
        <div id="container1">
            <Link to={"/"}>
            <img id="headerLogo" src="/icon.png" alt="Logo"/>
            </Link>

            <h1 id="createtxt">Create Account</h1>

            <input id="username-input" className="CA-input"
             placeholder="Username" type="text"
             value={username} onChange={(e) => setUsername(e.target.value)}/>

            <input id="password-input" className="CA-input"
             placeholder="Password" type={showPassword ? "text" : "password"} 
             value={password} onChange={(e) => setPassword(e.target.value)}
             />

            <input id="confirm-password" className="CA-input"
             placeholder="Confirm Password" type={showPassword ? "text" : "password"}
             value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            
            <label id="passwordCB">
                <input type="checkbox" id="checkboxPassword"
                 checked={showPassword}
                onChange={CheckboxChange}/> Show Password
            </label>

            <button id="CA-btn" onClick={handleCreateAccount} disabled={loading}>Create Account</button>
            
        </div>
    );

}
export default Create_Account