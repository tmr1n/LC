// src/services/PasswordReset.service.js
import api from '../api'

export const passwordReset = async payload => {
	// payload: { email, username, password, ... }
	return await api.post('/password/sendResetLink', payload)
}

export const getInfoAboutToken = async token => {
	// payload: { email, username, password, ... }
	return await api.get(`/password/infoAboutToken?token=${token}`)
}
