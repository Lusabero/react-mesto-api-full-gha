
function PopupWithForm({name, isOpen, title, buttonTitle, onClose, onSubmit, children}) {

    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" name={`form-${name}`} onSubmit={onSubmit}>
                    {children}
                    <button className="popup__button" type="submit">{buttonTitle}</button>
                </form>
                <button className="popup__button-close" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;