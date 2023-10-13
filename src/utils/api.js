
const BASE_URL = 'https://norma.nomoreparties.space/api/'

const checkResponse = (res) => {
    return res.ok? res.json() : res.json().then(error => Promise.reject(error))
}

export const request = (endPoint, options) => {
    return fetch(BASE_URL + endPoint, options).then(checkResponse)
}