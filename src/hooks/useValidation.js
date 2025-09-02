import { useCallback, useRef, useState } from 'react'

import {
	validateEmail,
	validateEmailOrUsername,
	validateLoginPassword,
	validatePassword,
	validateUsername
} from '../utils/validation.js'

export const useValidation = () => {
	const [errors, setErrors] = useState({})
	const timer = useRef(null) // Для debounce таймера

	// Основная функция валидации конкретного поля
	const validateField = useCallback(
		(field, value, formData = {}) => {
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

					// Проверяем совпадение паролей
					if (formData.passwordRepeat && value !== formData.passwordRepeat) {
						newErrors.password_confirmation = ['Пароли не совпадают']
					} else if (
						formData.passwordRepeat &&
						value === formData.passwordRepeat
					) {
						delete newErrors.password_confirmation
					}
					break

				case 'passwordRepeat':
					if (value && value !== formData.password) {
						newErrors.password_confirmation = ['Пароли не совпадают']
					} else {
						delete newErrors.password_confirmation
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
					console.log(newErrors.emailOrUsername)
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

			setErrors(prevErrors => {
				console.log('В этом месте мы понимаем, что пошло не так')
				console.log(prevErrors)
				console.log(newErrors)
				return newErrors
			})

			console.log('NewErrors', newErrors)
			console.log('Errors in state ', errors)
			return newErrors
		},
		[errors]
	)

	// Вариант с задержкой вызова validateField — debounce
	const debouncedValidateField = useCallback(
		(field, value, formData = {}) => {
			if (timer.current) clearTimeout(timer.current)
			timer.current = setTimeout(() => {
				validateField(field, value, formData)
			}, 500) // Задержка 500мс, можно изменить
		},
		[validateField]
	)

	// Ваша функция validateForm без изменений
	const validateForm = (formData, type = 'registration') => {
		const newErrors = {}

		if (type === 'registration') {
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
				newErrors.password_confirmation = ['Поле обязательно для заполнения']
			} else if (formData.password !== formData.passwordRepeat) {
				newErrors.password_confirmation = ['Пароли не совпадают']
			}

			if (!formData.terms_accepted) {
				newErrors.terms = [
					'Примите условия предоставления услуг и политику конфиденциальности LangCards, чтобы продолжить.'
				]
			}
		} else if (type === 'auth') {
			const emailErrors = validateEmail(formData.email)
			if (emailErrors.length > 0) {
				newErrors.email = emailErrors
			}

			const passwordErrors = validateLoginPassword(formData.password)
			if (passwordErrors.length > 0) {
				newErrors.password = passwordErrors
			}
		} else if (type === 'forgotPassword') {
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
		setErrors,
		debouncedValidateField // экспортируем функцию с debounce
	}
}
