import axios from 'axios'

const api = axios.create({
	baseURL: 'https://ea1cb789ba29.ngrok-free.app/api/v1',
	withCredentials: true,
	headers: {
		accept: 'application/json',
		'content-Type': 'application/json'
	}
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token)
		}
	})
	failedQueue = []
}

// Добавление accessToken в каждый запрос
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

// Ловим 401 и пробуем обновить токен
api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		// Проверяем если это не попытка обновления и действительно 401
		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			if (isRefreshing) {
				// Если уже есть процесс обновления токенов — ждём его результата
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject })
				})
					.then(token => {
						originalRequest.headers['Authorization'] = 'Bearer ' + token
						return api(originalRequest)
					})
					.catch(err => Promise.reject(err))
			}

			originalRequest._retry = true
			isRefreshing = true

			try {
				// Запрос на backend для refresh (refresh-токен в httpOnly cookie)
				const res = await api.post('refresh')
				const newAccessToken = res.data.data.access_token

				localStorage.setItem('accessToken', newAccessToken)
				api.defaults.headers.common['Authorization'] =
					'Bearer ' + newAccessToken

				processQueue(null, newAccessToken)
				isRefreshing = false

				originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken
				return api(originalRequest) // Повторяем запрос!
			} catch (err) {
				processQueue(err, null)
				isRefreshing = false
				// Здесь можно делать logout и редирект на логин
				return Promise.reject(err)
			}
		}
		return Promise.reject(error)
	}
)

export default api
