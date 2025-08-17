import { useParams } from "react-router-dom";
import TextCard from "../Components/card"; 
import { useNavigate } from "react-router-dom";

function UserPage(){

    const navigate = useNavigate();
    const {username} = useParams();

    let tnd = "August  6, 2025 | 10:39PM";
    let message = "I love you";

    async function logout() {
        navigate("/");
    }

    return(

        <div id="container2">
            <header id="userHeader">
                <img id="headerLogo2" src="/icon.png" alt="Logo"/>
                <h1 id="displayUser">{username}</h1>
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