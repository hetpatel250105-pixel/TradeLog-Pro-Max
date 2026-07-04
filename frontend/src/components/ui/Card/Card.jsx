import "./Card.css";

function Card({
    children,
    className = ""
}) {

    return (

        <div className={`primary-card ${className}`}>

            {children}

        </div>

    );

}

export default Card;