import { http } from './http'

export const fetchGenres = () => http.get('/genres').then((res) => res.data.data)

export const fetchGenre = (slug) =>
    http.get(`/genres/${encodeURIComponent(slug)}`).then((res) => res.data.data)
