// src/api.js
import axios from 'axios'

const api = axios.create({
	baseURL: 'https://57a0aca902dd.ngrok-free.app/api/v1',
	withCredentials: true
})

// Интерцептор для добавления accessToken, если он используется не через cookie
api.interceptors.request.use(
	config => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

export default api
