import './index.css'; 
import { initialCards } from "./components/cards.js"; 
import { openModal, closePopup } from './components/modal.js'; 
import { likeCard } from './components/card.js'; 
import { createCard, deleteCard } from './components/card.js'; 

// Переменные для работы с DOM 
const popupImage = document.querySelector('.popup__image');  
const popupCaption = document.querySelector('.popup__caption');  
const popupCardImg = document.querySelector('.popup_type_image'); 
const popups = document.querySelectorAll('.popup'); 
const placesList = document.querySelector('.places__list'); 
const buttonAdd = document.querySelector('.profile__add-button'); 
const  popupCard= document.querySelector('.popup_type_new-card'); 
const popupTypeEdit = document.querySelector('.popup_type_edit'); 
const buttonEdit = document.querySelector('.profile__edit-button'); 
const profileName = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description'); 
const popupOpen = document.querySelectorAll('.popup_is-opened'); 
const formNewPlace = document.querySelector('[name="new-place"]'); 
const placeInpit = document.querySelector('.popup__input_type_card-name'); 
const urlInput = document.querySelector('.popup__input_type_url'); 
const popupTypeNewCard = document.querySelector('.popup_type_new-card'); 
const formEditProfile = document.querySelector('[name="edit-profile"]'); 
 
// @todo: Функция создания карточки 
function openModalImage(evt) {  
    openModal (popupCardImg); 
    popupImage.src = evt.target.src;  
    popupCaption.textContent = evt.target.alt;  
    popupImage.textContent = evt.target.alt; 
} 
// @todo: Вывести карточки на страницу 
initialCards.forEach(function(item) { 
    const itemCard = createCard(item, deleteCard, likeCard, openModalImage); 
    placesList.append(itemCard); 
}); 
 
function handleEditProfileFormSubmit(evt) { 
    evt.preventDefault(); 
    const nameValue = nameInput.value; 
    const jobValue = jobInput.value; 
    profileName.textContent = nameValue; 
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
    placesList.prepend(createNewCard); 
    clearForm(formNewPlace); 
    closePopup(popupTypeNewCard); 
} 
 
function popupSmoothly(evt){ 
    evt.style.transition = 'opacity 2.5s, linear'; 
    evt.style.opacity = '0'; 
} 
 
 
buttonAdd.addEventListener('click', () => { 
    openModal(popupCard); 
}); 
 
buttonEdit.addEventListener('click', () => { 
     
    nameInput.value = profileName.textContent;  
    jobInput.value = profileDescription.textContent;  
 
    openModal(popupTypeEdit) }); 
 
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
 
formNewPlace.addEventListener('submit', handlePlacesFormSubmit);