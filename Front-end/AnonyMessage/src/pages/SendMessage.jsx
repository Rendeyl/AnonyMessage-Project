import { useParams } from "react-router-dom";

function Sender(){

    const {username} = useParams();

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
export default Sender