import { useParams } from "react-router-dom";
import TextCard from "../Components/card"; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UserPage(){

    const userID = localStorage.getItem("userID");
    const navigate = useNavigate();
    const {username} = useParams();
    const [copied, setCopied] = useState(false);
    const [messages, setMessages] = useState([]);

    async function logout() {
        navigate("/")
    }

    async function handleCopy() {
    const userLink = `https://anonymessagex.vercel.app/send/${username}`;
    try {
      await navigator.clipboard.writeText(userLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  useEffect(() =>{
    async function loadMessages() {
        if(!userID) return;
        try{
            const res = await fetch(
                `https://anony-message-backend.vercel.app/api/loadMessages?id=${userID}`,
                {credentials: "include"}
            );

            const data = await res.json();
            setMessages(data);

        }catch (err){
            console.log(err);
        }
    }

    loadMessages();
  }, [userID]);



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
                {messages.length > 0 ? (
          messages.map((msg) => (
            <TextCard
              key={msg.id}
              message={msg.content}
            />
          ))
        ) : (
          <h3 id="noMessages">No messages yet.</h3>
        )}
            </div>

        </div>

    );
}
export default UserPage