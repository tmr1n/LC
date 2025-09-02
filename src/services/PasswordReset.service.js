// src/services/PasswordReset.service.js
import api from '../api'

export const passwordReset = async payload => {
	// payload: { email, username, password, ... }
	return await api.post('/password/sendResetLink', payload)
}

export const getInfoAboutToken = async payload => {
	// payload: { email, username, password, ... }
	console.log('Payload in service:', payload)
	return await api.post('/password/infoAboutToken', payload)
}

export const passwordConfirm = async payload => {
	// payload: { emailOrUsername, password }
	return await api.post('/password/reset', payload)
}
