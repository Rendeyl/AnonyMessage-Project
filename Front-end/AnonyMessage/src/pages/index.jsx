import { useNavigate } from "react-router-dom";

function Index(){

    const navigate = useNavigate();
    function create(){
        navigate("/createaccount")
    }

    function check(){
        navigate("/login")
    }

    return(
        <>
        <header>
            <div className="header-cont">
                <img id="headerLogo" src="/icon.png" alt="Logo"/>
                <h1 id="header-text">AnonyMessage</h1>
                <h2 id="header-text2">Anonymous Message Sender!</h2>
            </div>
        </header>

        <div id="lower-part">
            <h2 id="text0">Create an account to get your own link!</h2>
            <button id="account-btn" onClick={create}>Get Your Own Link!</button>
            <h3 id="orTXT">OR</h3>
            <button id="check-btn" onClick={check}>Check Account</button>
        </div>
        </>
    );
}
export default Index