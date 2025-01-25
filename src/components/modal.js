export function openModal(popup){
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (evt.key === "Escape") {
        closePopup(openedPopup);
    }
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
}

