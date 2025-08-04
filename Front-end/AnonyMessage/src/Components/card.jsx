

function TextCard({timeNdate, message}){

    return(
        <div className="TCard">
            <h5 id="TnD">{timeNdate}</h5>
            <div className="WhiteCard">
                <p className="message">{message}</p>
            </div>
        </div>
    );

}
export default TextCard