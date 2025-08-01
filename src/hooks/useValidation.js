// hooks/useValidation.js
import { useState } from 'react'

import {
	validateEmail,
	validateEmailOrUsername,
	validateLoginPassword,
	validatePassword,
	validateUsername
} from '../utils/validation.js'

export const useValidation = () => {
	const [errors, setErrors] = useState({})

	const validateField = (field, value, formData = {}) => {
		const newErrors = { ...errors }

		switch (field) {
			case 'email':
				if (value && !validateEmail(value)) {
					newErrors.email = ['Недопустимый адрес эл. почты']
				} else {
					delete newErrors.email
				}
				break

			case 'username':
				if (value) {
					const usernameErrors = validateUsername(value)
					if (usernameErrors.length > 0) {
						newErrors.username = usernameErrors
					} else {
						delete newErrors.username
					}
				} else {
					delete newErrors.username
				}
				break

			case 'password':
				if (value) {
					const passwordErrors = validatePassword(value)
					if (passwordErrors.length > 0) {
						newErrors.password = passwordErrors
					} else {
						delete newErrors.password
					}
				} else {
					delete newErrors.password
				}

				// Проверяем совпадение паролей для регистрации
				if (formData.passwordRepeat && value !== formData.passwordRepeat) {
					newErrors.passwordRepeat = ['Пароли не совпадают']
				} else if (
					formData.passwordRepeat &&
					value === formData.passwordRepeat
				) {
					delete newErrors.passwordRepeat
				}
				break

			case 'passwordRepeat':
				if (value && value !== formData.password) {
					newErrors.passwordRepeat = ['Пароли не совпадают']
				} else {
					delete newErrors.passwordRepeat
				}
				break

			case 'emailOrUsername':
				if (value) {
					const validationErrors = validateEmailOrUsername(value)
					if (validationErrors.length > 0) {
						newErrors.emailOrUsername = validationErrors
					} else {
						delete newErrors.emailOrUsername
					}
				} else {
					delete newErrors.emailOrUsername
				}
				break

			case 'loginPassword':
				if (value) {
					const passwordErrors = validateLoginPassword(value)
					if (passwordErrors.length > 0) {
						newErrors.password = passwordErrors
					} else {
						delete newErrors.password
					}
				} else {
					delete newErrors.password
				}
				break
		}

		setErrors(newErrors)
		return newErrors
	}

	const validateForm = (formData, type = 'registration') => {
		const newErrors = {}

		if (type === 'registration') {
			// Валидация для регистрации
			if (!formData.email) {
				newErrors.email = ['Поле обязательно для заполнения']
			} else if (!validateEmail(formData.email)) {
				newErrors.email = ['Недопустимый адрес эл. почты']
			}

			if (!formData.username) {
				newErrors.username = ['Поле обязательно для заполнения']
			} else {
				const usernameErrors = validateUsername(formData.username)
				if (usernameErrors.length > 0) {
					newErrors.username = usernameErrors
				}
			}

			if (!formData.password) {
				newErrors.password = ['Поле обязательно для заполнения']
			} else {
				const passwordErrors = validatePassword(formData.password)
				if (passwordErrors.length > 0) {
					newErrors.password = passwordErrors
				}
			}

			if (!formData.passwordRepeat) {
				newErrors.passwordRepeat = ['Поле обязательно для заполнения']
			} else if (formData.password !== formData.passwordRepeat) {
				newErrors.passwordRepeat = ['Пароли не совпадают']
			}

			if (!formData.termsAccepted) {
				newErrors.terms = [
					'Примите условия предоставления услуг и политику конфиденциальности LangCards, чтобы продолжить.'
				]
			}
		} else if (type === 'auth') {
			// Валидация для входа
			const emailUsernameErrors = validateEmailOrUsername(
				formData.emailOrUsername
			)
			if (emailUsernameErrors.length > 0) {
				newErrors.emailOrUsername = emailUsernameErrors
			}

			const passwordErrors = validateLoginPassword(formData.password)
			if (passwordErrors.length > 0) {
				newErrors.password = passwordErrors
			}
		} else if (type === 'forgotPassword') {
			// Валидация для восстановления пароля
			if (!formData.email) {
				newErrors.email = ['Поле обязательно для заполнения']
			} else if (!validateEmail(formData.email)) {
				newErrors.email = ['Недопустимый адрес эл. почты']
			}
		}

		setErrors(newErrors)
		return newErrors
	}

	const clearErrors = () => setErrors({})

	return {
		errors,
		validateField,
		validateForm,
		clearErrors,
		setErrors
	}
}
