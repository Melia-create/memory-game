import './Card.css'

export default function Card({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled && !flipped) {
        handleChoice(card);
        }
    }



    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img
                    className="front"
                    src={card.src}
                    alt="Card Front"></img>
                <img
                    className="back"
                    src="/img/cover.png"
                    alt="Card Back"
                    onClick={handleClick}></img>
            </div>
        </div>

    )
}
