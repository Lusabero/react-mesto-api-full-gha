import {useRef, useEffect} from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onUpdateAvatar, onClose, isLoading}) {

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            buttonTitle={isLoading ? "Сохранение..." : "Сохранить"}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input className="popup__field popup__field_input_name" id="popup__avatar" name="avatar" type="url"
                       placeholder="Название" autoComplete="off" minLength="2" required ref={inputRef}/>
                <span id="popup__avatar-error" className="popup__error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup