
function ImagePopup({ card, onClose }) {

    return (
        <div className={`popup popup_image ${(card.name && card.link) ? `popup_opened` : ''}`}>
            <div className="popup__wrapper">
                <img className="popup__img" src={card.link} alt={card.name} />
                <p className="popup__text">{card.name}</p>
                <button className="popup__button-close" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;