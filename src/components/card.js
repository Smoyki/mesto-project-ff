const cardTemplate = document.querySelector('#card-template').content; 

export function likeCard(evt) { 
    if (evt.target.classList.contains('card__like-button')) { 
        evt.target.classList.toggle('card__like-button_is-active'); 
    } 
}; 

export function createCard(place, deleteCard, likeCard, openModalImage){ 
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
    const likeEl = cardElement.querySelector('.card__like-button'); 
    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    const image = cardElement.querySelector('.card__image'); 
    image.src = place.link; 
    image.alt = place.name; 
    cardElement.querySelector('.card__title').textContent = place.name; 
    image.addEventListener('click', openModalImage); 
    deleteButton.addEventListener('click', deleteCard); 
    likeEl.addEventListener('click', likeCard); 
    
    return cardElement; 
} 
// @todo: Функция уда 
export function deleteCard(item){ 
    item.target.closest('.places__item').remove(); 
} 
