// src/services/Auth.service.js
import api from '../api'

export const login = async payload => {
	// payload: { emailOrUsername, password }
	const response = await api.post('/login', payload)
	return response.data
}
