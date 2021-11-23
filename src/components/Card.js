import './Card.css'

export default function Card({ card, handleChoice }) {

    const handleClick = () => {
        handleChoice(card)
    }



    return (
        <div>
            <div className="card">
                <div>
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
        </div>
    )
}
