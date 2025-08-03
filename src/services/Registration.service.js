// src/services/Registration.service.js
import api from '../api'

export const register = async payload => {
	// payload: { email, username, password, ... }
	const response = await api.post('/registration', payload)
	return response.data
}
