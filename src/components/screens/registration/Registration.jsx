import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { GoX } from 'react-icons/go'

import styles from './registration.module.scss'

const Registration = ({ onClose, onSwitchToAuth }) => {
	// Состояние для значений полей
	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
		passwordRepeat: '',
		newsConsent: false,
		termsAccepted: false
	})

	// Состояние для ошибок
	const [errors, setErrors] = useState({})

	// Состояние для отображения паролей
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)

	// Функции валидации
	const validateEmail = email => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	const validateUsername = username => {
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
		const takenUsernames = ['admin', 'user', 'test', 'andrew123'] // Это должно приходить с сервера
		if (takenUsernames.includes(username.toLowerCase())) {
			errors.push('Это имя пользователя уже занято.')
		}

		return errors
	}

	const validatePassword = password => {
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

		// Простая проверка на сложность
		const commonPasswords = ['password', '12345678', 'qwerty123']
		if (commonPasswords.includes(password.toLowerCase())) {
			errors.push('Выберите пароль, который не так легко угадать.')
		}

		return errors
	}

	// Обработчик изменения значений полей
	const handleInputChange = (field, value) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}))

		// Валидация в реальном времени
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
		}

		setErrors(newErrors)
	}

	// Обработчик отправки формы
	const handleSubmit = () => {
		const newErrors = {}

		// Проверяем все поля
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

		setErrors(newErrors)

		if (Object.keys(newErrors).length === 0) {
			// Форма валидна, можно отправлять данные
			console.log('Форма отправлена:', formData)
		}
	}

	return (
		<div>
			<section className={styles.sec1}>
				<div className={styles.d1}>
					<h1>Самый лучший способ учиться. чтобы сохранить прогресс!.</h1>
					<img
						className={styles.logo}
						src='src/assets/Registration-logo.svg'
						alt='Изображение'
					/>
				</div>

				<div className={styles.d2}>
					<GoX
						className={styles.closeButton}
						fill='#586380'
						fontSize={30}
						onClick={onClose}
					/>
					<div className={styles.container}>
						<div className={styles.titleNames}>
							<div className={styles.underline}>
								<h3
									className={`${styles.regTitle} ${styles.withUnderline}`}
									onClick={() => ''}
								>
									Зарегистрироваться
								</h3>
							</div>

							<div className={styles.underline}>
								<h3
									className={`${styles.regTitle} ${styles.inActive}`}
									onClick={onSwitchToAuth}
								>
									Вход
								</h3>
							</div>
						</div>

						<button
							className={`${styles.buttonGray} ${styles.mt15}`}
							onClick={() => {}}
						>
							<FcGoogle
								className={styles.iconGoogle}
								fill='#000000'
								fontSize={25}
							/>
							<p>Продолжить с Google</p>
						</button>

						<div className={styles.dividerFlex}>
							<span className={styles.line}></span>
							<span className={styles.text}>или адрес эл. почты</span>
							<span className={styles.line}></span>
						</div>

						{/* Email поле */}
						<div className={styles.inputGroup}>
							<label
								htmlFor='email'
								className={`${styles.fieldLabel} ${errors.email ? styles.errorLabel : ''}`}
							>
								{errors.email ? errors.email[0] : 'Email'}
							</label>
							<input
								type='email'
								id='email'
								className={`${styles.inputField} ${errors.email ? styles.errorInput : ''}`}
								placeholder='user@mail.com'
								value={formData.email}
								onChange={e => handleInputChange('email', e.target.value)}
							/>
						</div>

						{/* Username поле */}
						<div className={styles.inputGroup}>
							<label
								htmlFor='username'
								className={`${styles.fieldLabel} ${errors.username ? styles.errorLabel : ''}`}
							>
								{errors.username ? errors.username[0] : 'Имя пользователя'}
							</label>
							<input
								type='text'
								id='username'
								className={`${styles.inputField} ${errors.username ? styles.errorInput : ''}`}
								placeholder='andrew123'
								value={formData.username}
								onChange={e => handleInputChange('username', e.target.value)}
							/>
							{/* Дополнительные ошибки для username */}
							{errors.username && errors.username.length > 1 && (
								<div className={styles.additionalErrors}>
									{errors.username.slice(1).map((error, index) => (
										<div key={index} className={styles.errorText}>
											{error}
										</div>
									))}
								</div>
							)}
						</div>

						{/* Password поле */}
						<div className={styles.inputGroup}>
							<label
								htmlFor='password'
								className={`${styles.fieldLabel} ${errors.password ? styles.errorLabel : ''}`}
							>
								{errors.password ? errors.password[0] : 'Пароль'}
							</label>
							<div className={styles.passwordWrapper}>
								<input
									type={showPassword ? 'text' : 'password'}
									id='password'
									className={`${styles.inputField} ${errors.password ? styles.errorInput : ''}`}
									placeholder='••••••••'
									value={formData.password}
									onChange={e => handleInputChange('password', e.target.value)}
								/>
								<button
									type='button'
									className={styles.passwordToggle}
									onClick={() => setShowPassword(!showPassword)}
								>
									<svg viewBox='0 0 24 24' width='20' height='20'>
										<path
											d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
											fill='currentColor'
										/>
									</svg>
								</button>
							</div>
							{/* Дополнительные ошибки для password */}
							{errors.password && errors.password.length > 1 && (
								<div className={styles.additionalErrors}>
									{errors.password.slice(1).map((error, index) => (
										<div key={index} className={styles.errorText}>
											{error}
										</div>
									))}
								</div>
							)}
						</div>

						{/* Password Repeat поле */}
						<div className={styles.inputGroup}>
							<label
								htmlFor='passwordRepeat'
								className={`${styles.fieldLabel} ${errors.passwordRepeat ? styles.errorLabel : ''}`}
							>
								{errors.passwordRepeat
									? errors.passwordRepeat[0]
									: 'Повторите пароль'}
							</label>
							<div className={styles.passwordWrapper}>
								<input
									type={showPasswordRepeat ? 'text' : 'password'}
									id='passwordRepeat'
									className={`${styles.inputField} ${errors.passwordRepeat ? styles.errorInput : ''}`}
									placeholder='••••••••'
									value={formData.passwordRepeat}
									onChange={e =>
										handleInputChange('passwordRepeat', e.target.value)
									}
								/>
								<button
									type='button'
									className={styles.passwordToggle}
									onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
								>
									<svg viewBox='0 0 24 24' width='20' height='20'>
										<path
											d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
											fill='currentColor'
										/>
									</svg>
								</button>
							</div>
						</div>

						<div className={styles.checkboxGroup}>
							<label className={styles.checkboxLabel}>
								<input
									type='checkbox'
									className={styles.checkboxInput}
									checked={formData.newsConsent}
									onChange={e =>
										handleInputChange('newsConsent', e.target.checked)
									}
								/>
								<span className={styles.checkboxCustom}></span>
								<span className={styles.checkboxText}>
									Я хочу получать новости, рекламные сообщения, обновления и
									советы о том, как использовать LangCards
								</span>
							</label>
						</div>

						<div className={styles.checkboxGroup}>
							<label className={styles.checkboxLabel}>
								<input
									type='checkbox'
									className={styles.checkboxInput}
									checked={formData.termsAccepted}
									onChange={e =>
										handleInputChange('termsAccepted', e.target.checked)
									}
									required
								/>
								<span className={styles.checkboxCustom}></span>
								<span className={styles.checkboxText}>
									Я принимаю положения, которые содержат{' '}
									<a href='#' className={styles.checkboxLink}>
										Условия предоставления услуг
									</a>{' '}
									и{' '}
									<a href='#' className={styles.checkboxLink}>
										Политику конфиденциальности
									</a>{' '}
									LangCards
								</span>
							</label>
						</div>

						{/* Ошибка условий использования */}
						{errors.terms && (
							<div className={styles.termsError}>{errors.terms[0]}</div>
						)}

						<button className={styles.buttonBlue} onClick={handleSubmit}>
							<p>Зарегистрироваться</p>
						</button>
						<button className={styles.buttonGray} onClick={onSwitchToAuth}>
							<p>Уже есть учетная запись? Войти</p>
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Registration
