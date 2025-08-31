// utils/validation.js

// Функции валидации
export const validateEmail = email => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

export const validateUsername = username => {
	const errors = []

	if (username.length < 3) {
		errors.push(
			'Имя пользователя слишком короткое. Оно должно содержать не менее 3 символов.'
		)
	}

	if (!/^[A-Za-z]/.test(username)) {
		errors.push(
			'Имена пользователей должны начинаться с букв A-Z и не могут содержать символы с диакритическими знаками.'
		)
	}

	if (!/^[A-Za-z0-9_-]+$/.test(username)) {
		errors.push(
			'Имя пользователя может содержать только буквы, цифры, подчеркивания и дефисы.'
		)
	}

	// Симуляция проверки на занятость имени
	const takenUsernames = ['admin', 'user', 'test', 'andrew123']
	if (takenUsernames.includes(username.toLowerCase())) {
		errors.push('Это имя пользователя уже занято.')
	}

	return errors
}

export const validatePassword = password => {
	const errors = []

	if (password.length < 8) {
		errors.push('Слишком короткий пароль. Минимальная длина – 8 знаков.')
	}

	if (!/[A-Z]/.test(password)) {
		errors.push('Пароль должен содержать одну большую букву.')
	}

	if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		errors.push('Пароль должен содержать один специальный символ.')
	}

	const commonPasswords = ['password', '12345678', 'qwerty123']
	if (commonPasswords.includes(password.toLowerCase())) {
		errors.push('Выберите пароль, который не так легко угадать.')
	}

	return errors
}

export const validateEmailOrUsername = value => {
	const errors = []

	if (!value) {
		errors.push('Поле обязательно для заполнения')
		return errors
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	const isEmail = emailRegex.test(value)

	const usernameRegex = /^[A-Za-z][A-Za-z0-9_-]*$/
	const isValidUsername = usernameRegex.test(value) && value.length >= 3

	if (!isEmail && !isValidUsername) {
		if (value.includes('@')) {
			errors.push('Недопустимый адрес эл. почты')
		} else {
			if (value.length < 3) {
				errors.push('Имя пользователя слишком короткое. Минимум 3 символа')
			} else if (!/^[A-Za-z]/.test(value)) {
				errors.push('Имя пользователя должно начинаться с буквы')
			} else if (!/^[A-Za-z0-9_-]+$/.test(value)) {
				errors.push(
					'Имя пользователя может содержать только буквы, цифры, подчеркивания и дефисы'
				)
			}
		}
	}

	return errors
}

// Простая валидация пароля для входа
export const validateLoginPassword = password => {
	const errors = []

	if (!password) {
		errors.push('Введите пароль')
	}

	if (password.length < 1) {
		errors.push('Пароль не может быть пустым')
	}

	return errors
}
