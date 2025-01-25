import baseAvatar from "../images/avatar.jpg";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
        authorization: 'f82711d0-1159-4aaa-9f6b-dc90f5c0b8e2',
        'Content-Type': 'application/json'
    }
}

export function getInformationAbout(){
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => getResponseData(res));
}

export function getCards(){
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then((res) => getResponseData(res));
}

export function patchGetEditProfile(name, description){
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description,
        }),
    })
    .then((res)=> getResponseData(res));
}

export function postNewCard(name, link){
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    })
    .then((res) => getResponseData(res))
}

export function deleteCardAPI(cardID){
    return fetch(`${config.baseUrl}/cards/${cardID}`,{
        headers: config.headers,
        method: "DELETE",
    })
    .then((res) => getResponseData(res));
}

export function putLike(cardID){
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`,{
        headers: config.headers,
        method: "PUT",
    })
    .then((res) => getResponseData(res))
}

export function deleteLike(cardID){
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`,{
        headers: config.headers,
        method: "DELETE",
    })
    .then((res) => getResponseData(res))
}

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

export const baseUser = {
    name: "Жак-Ив Кусто",
    about: "Исследователь океана",
    avatar: baseAvatar,
    _id: "-1",
};