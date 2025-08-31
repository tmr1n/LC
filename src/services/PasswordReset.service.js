// src/services/PasswordReset.service.js
import api from '../api'

export const passwordReset = async payload => {
	// payload: { email, username, password, ... }
	return await api.post('/password/sendResetLink', payload)
}
