import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


function Sender(){

    const {username} = useParams();
    const [userExist, setUserExist] = useState(null);

    useEffect(() =>{
        
        async function getUser() {
            try{
                const res = await fetch("https://anony-message-backend.vercel.app/api/getuser",
                    {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username }),
                    }
                )
                const data = await res.json();
                if(res.ok){
                    console.log("True");
                    setUserExist(true);
                }else{
                    setUserExist(false);
                }
            }catch (err){
                console.log(err);
            }
        }
        getUser();
    }, [username]);

    if(userExist === null){
        return(
            <div id="container3">
                <h3 id="loadingPage">Loading...</h3>
            </div>
        );
    }

    if(userExist === false){
        return(
            <div id="container3">
            <img id="headerLogo" src="/icon.png" alt="Logo"/>

            <h2 id="userFalse">User Does Not Exist!!</h2>
        </div>
        );
    }

    if(userExist === true){
        return(
            <div id="container3">
            <img id="headerLogo" src="/icon.png" alt="Logo"/>

            <h2 id="SendMessageTXT">Send Your Message!</h2>
            <h3 id="SendMessageTXT2">Sending message to {username}</h3>
            <textarea id="MessageInput" placeholder="Type your message here..."></textarea>
            <button id="SubmitMessageBTN">Submit</button>
        </div>
        );
    }
}
export default Sender