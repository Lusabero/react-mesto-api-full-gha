import union__success from "../images/union__success.svg"
import union__fail from "../images/union__fail.svg"

function InfoTooltip({isOpen, isSuccess, onClose}) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <img src={isSuccess ? union__success : union__fail} alt="Успешно" className="popup__info-tooltip-img"/>
                <p className="popup__info-tooltip-text">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
                <button className="popup__button-close" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;