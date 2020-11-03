import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

export const getPhotos = page => {
    return instance.get("photos/", { params: { page } })
}

export const postPhotos = photos => {
    return instance.post("photos/", { photos })
}

export const likePhoto = photo => {
    return instance.post(`photos/${photo}/like/`)
}

export const getCommets = photo => {
    return instance.get(`photos/${photo}/comments`)
}

export const postCommet = (photo, comment) => {
    return instance.post(`photos/${photo}/comments/`, { content: comment })
}