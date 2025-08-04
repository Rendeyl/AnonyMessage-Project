import TextCard from "../Components/card";

function UserPage({username}){

    let tnd = "August  6, 2025 | 10:39PM";
    let message = "I love you";

    return(

        <div id="container2">
            <header id="userHeader">
                <img id="headerLogo2" src="/icon.png" alt="Logo"/>
                <h1 id="displayUser">{username}</h1>
                <button id="logoutBTN">Log out</button>
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