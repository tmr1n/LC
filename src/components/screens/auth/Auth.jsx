import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { GoX } from 'react-icons/go'

import styles from '../registration/registration.module.scss'

const Auth = ({ onClose, onSwitchToRegistration }) => {
	// Состояние для значений полей
	const [formData, setFormData] = useState({
		emailOrUsername: '',
		password: ''
	})

	// Состояние для ошибок
	const [errors, setErrors] = useState({})

	// Состояние для отображения пароля
	const [showPassword, setShowPassword] = useState(false)

	// Функция валидации email или username
	const validateEmailOrUsername = value => {
		const errors = []

		if (!value) {
			errors.push('Поле обязательно для заполнения')
			return errors
		}

		// Проверяем, является ли это email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		const isEmail = emailRegex.test(value)

		// Проверяем, является ли это валидным username
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

	// Функция валидации пароля для входа (упрощенная)
	const validatePassword = password => {
		const errors = []

		if (!password) {
			errors.push('Введите пароль')
			return errors
		}

		if (password.length < 1) {
			errors.push('Пароль не может быть пустым')
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
				break
		}

		setErrors(newErrors)
	}

	// Обработчик отправки формы
	const handleSubmit = () => {
		const newErrors = {}

		// Проверяем поле email/username
		const emailUsernameErrors = validateEmailOrUsername(
			formData.emailOrUsername
		)
		if (emailUsernameErrors.length > 0) {
			newErrors.emailOrUsername = emailUsernameErrors
		}

		// Проверяем пароль
		const passwordErrors = validatePassword(formData.password)
		if (passwordErrors.length > 0) {
			newErrors.password = passwordErrors
		}

		setErrors(newErrors)

		if (Object.keys(newErrors).length === 0) {
			// Форма валидна, можно отправлять данные
			console.log('Вход выполнен:', formData)
			// Здесь будет логика авторизации
		}
	}

	// Функция для определения типа ввода для placeholder и label
	const getInputHint = () => {
		if (!formData.emailOrUsername) {
			return {
				label: 'Email или имя пользователя',
				placeholder: 'Введите адрес эл. почты или имя пользователя'
			}
		}

		if (formData.emailOrUsername.includes('@')) {
			return {
				label: 'Email',
				placeholder: 'user@mail.com'
			}
		} else {
			return {
				label: 'Имя пользователя',
				placeholder: 'andrew123'
			}
		}
	}

	const inputHint = getInputHint()

	return (
		<div>
			<section className={styles.sec1}>
				<div className={styles.d1}>
					<h1>
						Щелкайте <br /> модули как орешки.
					</h1>
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
							{/* Вкладка "Регистрация" */}
							<div className={styles.underline}>
								<h3
									className={`${styles.regTitle} ${styles.inActive}`}
									onClick={onSwitchToRegistration}
								>
									Зарегистрироваться
								</h3>
							</div>

							{/* Вкладка "Вход" */}
							<div className={styles.underline}>
								<h3
									className={`${styles.regTitle} ${styles.withUnderline}`}
									onClick={() => ''}
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

						{/* Email или Username поле */}
						<div className={styles.inputGroup}>
							<label
								htmlFor='emailOrUsername'
								className={`${styles.fieldLabel} ${errors.emailOrUsername ? styles.errorLabel : ''}`}
							>
								{errors.emailOrUsername
									? errors.emailOrUsername[0]
									: inputHint.label}
							</label>
							<input
								type='text'
								id='emailOrUsername'
								className={`${styles.inputField} ${errors.emailOrUsername ? styles.errorInput : ''}`}
								placeholder={inputHint.placeholder}
								value={formData.emailOrUsername}
								onChange={e =>
									handleInputChange('emailOrUsername', e.target.value)
								}
								autoComplete='username'
							/>
							{/* Дополнительные ошибки */}
							{errors.emailOrUsername && errors.emailOrUsername.length > 1 && (
								<div className={styles.additionalErrors}>
									{errors.emailOrUsername.slice(1).map((error, index) => (
										<div key={index} className={styles.errorText}>
											{error}
										</div>
									))}
								</div>
							)}
						</div>

						{/* Password поле */}
						<div className={styles.inputGroup}>
							<div className={styles.labelRow}>
								<label
									htmlFor='password'
									className={`${styles.fieldLabel} ${errors.password ? styles.errorLabel : ''}`}
								>
									{errors.password ? errors.password[0] : 'Пароль'}
								</label>
								<a href='#' className={styles.forgotLink}>
									Забыли пароль?
								</a>
							</div>
							<div className={styles.passwordWrapper}>
								<input
									type={showPassword ? 'text' : 'password'}
									id='password'
									className={`${styles.inputField} ${errors.password ? styles.errorInput : ''}`}
									placeholder='••••••••'
									value={formData.password}
									onChange={e => handleInputChange('password', e.target.value)}
									autoComplete='current-password'
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
						</div>

						<button className={styles.buttonBlue} onClick={handleSubmit}>
							<p>Вход</p>
						</button>
						<button
							className={styles.buttonGray}
							onClick={onSwitchToRegistration}
						>
							<p>Впервые в LangCards? Создать учетную запись</p>
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Auth
