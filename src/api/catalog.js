import { http } from './http'

export const fetchGenres = () => http.get('/genres').then((res) => res.data.data)

export const fetchGenre = (slug) =>
    http.get(`/genres/${encodeURIComponent(slug)}`).then((res) => res.data.data)

export const fetchBooks = (params = {}) =>
    http.get('/books', { params }).then((res) => res.data)

export const fetchGenreBooks = (slug, params = {}) =>
    http.get(`/genres/${encodeURIComponent(slug)}/books`, { params }).then((res) => res.data)

export const fetchBook = (id) =>
    http.get(`/books/${encodeURIComponent(id)}`).then((res) => res.data.data)

export const fetchAuthor = (id) =>
    http.get(`/authors/${encodeURIComponent(id)}`).then((res) => res.data.data)