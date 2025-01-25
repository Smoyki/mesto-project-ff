import './index.css'; 
import { initialCards } from "./components/cards.js"; 
import { openModal, closePopup } from './components/modal.js'; 
import { likeCard } from './components/card.js'; 
import { createCard, deleteCard } from './components/card.js'; 
import { getInformationAbout, getCards, patchGetEditProfile, baseUser, postNewCard} from './components/api.js';

const imagePopup = document.querySelector('.popup__image');  
const popupCaption = document.querySelector('.popup__caption');  
const popupTypeImage = document.querySelector('.popup_type_image'); 
const popupButton = document.querySelector('.popup__button');
const popups = document.querySelectorAll('.popup'); 
const cardContainer = document.querySelector('.places__list'); 
const buttonAdd = document.querySelector('.profile__add-button'); 
const popupCard = document.querySelector('.popup_type_new-card'); 
const popupTypeEdit = document.querySelector('.popup_type_edit'); 
const buttonEdit = document.querySelector('.profile__edit-button'); 
const profileTitle = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description'); 
const popupOpen = document.querySelectorAll('.popup_is-opened'); 
const formNewPlace = document.querySelector('[name="new-place"]'); 
const placeInpit = document.querySelector('.popup__input_type_card-name'); 
const urlInput = document.querySelector('.popup__input_type_url'); 
const popupTypeNewCard = document.querySelector('.popup_type_new-card'); 
const newCardButton = popupTypeNewCard.querySelector('.popup__button')
const formEditProfile = document.querySelector('[name="edit-profile"]');

const profileImage = document.querySelector('.profile__image')
// @todo: Функция создания карточки 
function openModalImage(evt) {  
    openModal (popupTypeImage); 
    imagePopup.src = evt.target.src;  
    popupCaption.textContent = evt.target.alt;  
    imagePopup.textContent = evt.target.alt; 
}

// @todo: Вывести карточки на страницу 
initialCards.forEach(function(item) { 
    const itemCard = createCard(item, deleteCard, likeCard, openModalImage); 
    cardContainer.append(itemCard); 
}); 

function handleEditProfileFormSubmit(evt) { 
    evt.preventDefault(); 
    const nameValue = nameInput.value; 
    const jobValue = jobInput.value; 
    profileTitle.textContent = nameValue; 
    profileDescription.textContent = jobValue; 
    closePopup(popupTypeEdit);
} 

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);  

function clearForm(form) { 
    form.reset(); 
} 

function handlePlacesFormSubmit(evt){ 
    evt.preventDefault(); 
    const placeValue = placeInpit.value; 
    const imageValue = urlInput.value; 
    const newCard = { 
        name: placeValue, 
        link: imageValue 
    }; 
    const createNewCard = createCard(newCard, deleteCard, likeCard, openModalImage); 
    cardContainer.prepend(createNewCard); 
    clearForm(formNewPlace); 
    closePopup(popupTypeNewCard); 
}

formNewPlace.addEventListener('submit', (evt) =>{
    evt.preventDefault();

    newCardButton.textContent = "Сохранение...";

    postNewCard(placeInpit.value, urlInput.value)
    .then((res) =>{
        cardContainer.prepend(
            createCard(res, deleteCard, likeCard, openModal, res.owner)
        );
        formNewPlace.reset();
        closePopup(popupTypeNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() =>{
        newCardButton.textContent = "Сохранить";
    });
});

function popupSmoothly(evt){ 
    evt.style.transition = 'opacity 2.5s, linear'; 
    evt.style.opacity = '0'; 
} 


buttonAdd.addEventListener('click', () => { 
    openModal(popupCard); 
}); 

buttonEdit.addEventListener('click', () => { 
    nameInput.value = profileTitle.textContent;  
    jobInput.value = profileDescription.textContent;   
    openModal(popupTypeEdit) 
}); 

formEditProfile.addEventListener('submit', (evt) =>{
    evt.preventDefault();
    popupButton.textContent = "Сохранение...";

    patchGetEditProfile(nameInput.value, jobInput.value)
    .then((res) =>{
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        closePopup(popupTypeEdit);
    })
    .catch((err) => console.log(err))
    .finally(()=>{
        popupButton.textContent = 'Сохранить';
    });
});

//закрывает через крестик 
popups.forEach((popup) => { 
    const popupClosed = popup.querySelector('.popup__close'); 
    popupClosed.addEventListener("click", () =>{ 
        closePopup(popup) 
    }); 
});

//закрывает через оверлей 
popups.forEach((popup) =>{ 
    popup.addEventListener('mousedown', (evt)=>{ 
        if (evt.target.classList.contains('popup')){ 
            closePopup(popup); 
        } 
    }) 
}) 

popupOpen.forEach(popup => { 
    popup.style.opacity = '0'; // начальное состояние 
    popupSmoothly(popup);  
}); 

formNewPlace.addEventListener('submit', handlePlacesFormSubmit)

Promise.all([getInformationAbout(), getCards()])
    .then(([user, cards]) => {
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
        profileImage.style.backgroundImage = `url("${user.avatar}")`;

        cards.forEach((card) => {
            cardContainer.append(
                createCard(card, deleteCard, likeCard, openModalImage, user)
            );
        });
    })
    .catch((err) => {
        console.error("Ошибка получения данных пользователя и карточек:", err);

        profileTitle.textContent = baseUser.name;
        profileDescription.textContent = baseUser.about;
        profileImage.style.backgroundImage = `url("${baseUser.avatar}")`;

        initialCards.forEach((card) => {
            cardContainer.append(
            createCard(card, deleteCard, likeCard, openModalImage, baseUser)
        );
    });
});

