import { useParams } from "react-router-dom";
import TextCard from "../Components/card"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UserPage(){

    const navigate = useNavigate();
    const {username} = useParams();
    const [copied, setCopied] = useState(false);

    let tnd = "August  6, 2025 | 10:39PM";
    let message = "I love you";

    async function logout() {
        navigate("/");
    }

    async function handleCopy() {
    const userLink = `https://anonymessagex.vercel.app/send/${username}`;
    try {
      await navigator.clipboard.writeText(userLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }


    return(

        <div id="container2">
            <header id="userHeader">
                <img id="headerLogo2" src="/icon.png" alt="Logo"/>

                <h1 id="displayUser">{username}</h1>

                <div id="linkbox">
                    <h5 id="userLink">https://anonymessagex.vercel.app/send/{username}</h5>
                    <button id="copyLink" onClick={handleCopy}>
                    {copied ? "✅ Copied!" : "📄"}
                    </button>
                </div>

                <button id="logoutBTN" onClick={logout}>Log out</button>
            </header>

            <div id="containerCard">
                <TextCard timeNdate={tnd} message={message}/>
                <TextCard timeNdate={tnd} message={message}/>
                <TextCard timeNdate={tnd} message={message}/>
            </div>

        </div>

    );
}
export default UserPage