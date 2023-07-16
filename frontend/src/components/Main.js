import {useContext} from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onAddPlace, cards, onCardClick, onCardDelete, onCardLike, onEditAvatar, onEditProfile}) {

    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__wrapper-avatar" onClick={onEditAvatar}>
                        <img className="profile__avatar" src={currentUser.avatar} alt="фото пользователя" />
                        <span className="profile__editAvatar"></span>
                    </div>

                    <div className="profile__wrapper">
                        <div className="profile__info">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <p className="profile__description">{currentUser.about}</p>
                        </div>
                        <button className="profile__button-edit" type="button"
                                onClick={onEditProfile}></button>
                    </div>
                </div>

                <button className="profile__button-add" type="button" onClick={onAddPlace}></button>
            </section>

            <section className="elements">
                {
                    cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))
                }
            </section>
        </main>
    )
}

export default Main;