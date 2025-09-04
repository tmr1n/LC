import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { useState } from 'react'
import { FaYandex } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { GoX } from 'react-icons/go'
import { TiVendorMicrosoft } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

// ← импорт clsx как cn
import { useValidation } from '@/hooks/useValidation.js'

import Confetti from '@/components/confetti/Confetti.jsx'
import Loader from '@/components/loader/Loader.jsx'

import styles from '../registration/registration.module.scss'

import { login } from '@/services/Auth.service'
import { oAuthLogin } from '@/services/Auth.service.js'

const Auth = ({
	onClose,
	onSwitchToRegistration,
	onSwitchToForgotPassword
}) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success'

	const navigate = useNavigate()

	const [showPassword, setShowPassword] = useState(false)

	const {
		errors,
		debouncedValidateField,
		validateForm,
		clearErrors,
		setErrors
	} = useValidation()

	// const [isLoading, setIsLoading] = useState(false)

	const handleInputChange = (field, value) => {
		const newFormData = { ...formData, [field]: value }
		setFormData(newFormData)
		// При валидации пароль использует ключ 'loginPassword'
		const fieldType = field === 'password' ? 'loginPassword' : field
		debouncedValidateField(fieldType, value, formData)
	}

	const handleLoginOauth = nameProvider => {
		oAuthLogin(nameProvider)
			.then(response => {
				// setStatus('success')
				window.location.href = response.data.data.url
			})
			.catch(error => {
				alert('Ошибка входа через ' + nameProvider)
				console.error('OAuth login error:', error)
				setStatus('idle')
			})
	}

	const loginMutation = useMutation({
		// Вызывается ПЕРЕД запросом
		// onMutate: async () => {
		// 	setIsLoading(true)
		// },
		mutationFn: login,
		onSuccess: data => {
			console.log(data)
			localStorage.setItem('accessToken', data.data.access_token)
			setStatus('success')
			navigate('/profile')
			clearErrors()
		},
		onError: error => {
			if (error?.response?.status === 422) {
				// Ошибки валидации (например, неправильный формат email или пустой пароль)
				if (error.response.data.errors) {
					setErrors({ ...error.response.data.errors })
				}
			} else if (error?.response?.status === 404) {
				// Пользователь не найден — можно показать ошибку в поле email
				const message = error.response.data.message || 'Пользователь не найден'
				setErrors({ email: [message] })
			} else {
				alert(error?.response?.data?.message || 'Ошибка входа')
			}
			setStatus('idle')
		}
	})

	const handleSubmit = () => {
		if (status === 'loading') return
		const validationErrors = validateForm(formData, 'auth')
		console.log(validationErrors)
		if (Object.keys(validationErrors).length === 0) {
			loginMutation.mutate({
				email: formData.email,
				password: formData.password
			})
		}
		setStatus('loading')
	}

	// Определяем label и placeholder для поля ввода
	const getInputHint = () => {
		if (!formData.email) {
			return {
				label: 'Email или имя пользователя',
				placeholder: 'Введите адрес эл. почты или имя пользователя'
			}
		}
		if (formData.email.includes('@')) {
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
						src='src/assets/images/Registration-logo.svg'
						alt='Изображение'
					/>
				</div>

				<div className={styles.d2}>
					{status === 'idle' && (
						<>
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
											className={cn(styles.regTitle, styles.inActive)}
											onClick={onSwitchToRegistration}
										>
											Зарегистрироваться
										</h3>
									</div>

									{/* Вкладка "Вход" */}
									<div className={styles.underline}>
										<h3
											className={cn(styles.regTitle, styles.withUnderline)}
											onClick={() => {}}
										>
											Вход
										</h3>
									</div>
								</div>

								<div className={styles.gap}>
									<button
										className={cn(styles.buttonGray, styles.mt15)}
										onClick={() => handleLoginOauth('google')}
									>
										<FcGoogle
											className={styles.iconGoogle}
											fill='#000000'
											fontSize={25}
										/>
										<p>Продолжить с Google</p>
									</button>

									<button
										className={cn(styles.buttonGray, styles.mt15)}
										onClick={() => handleLoginOauth('microsoft')}
									>
										<TiVendorMicrosoft
											className={styles.iconMicrosoft}
											fill='#000000'
											fontSize={25}
										/>
										<p>Продолжить с Microsoft</p>
									</button>

									<button
										className={cn(styles.buttonGray, styles.mt15)}
										onClick={() => handleLoginOauth('yandex')}
									>
										<FaYandex
											className={styles.iconGoogle}
											fill='#000000'
											fontSize={25}
										/>
										<p>Продолжить с Yandex</p>
									</button>
								</div>

								<div className={styles.dividerFlex}>
									<span className={styles.line}></span>
									<span className={styles.text}>или адрес эл. почты</span>
									<span className={styles.line}></span>
								</div>

								{/* Email или Username поле */}
								<div className={styles.inputGroup}>
									<label
										htmlFor='email'
										className={cn(styles.fieldLabel, {
											[styles.errorLabel]: errors.email
										})}
									>
										{errors.email ? errors.email[0] : inputHint.label}
									</label>
									<input
										type='text'
										id='email'
										className={cn(styles.inputField, {
											[styles.errorInput]: errors.email
										})}
										placeholder={inputHint.placeholder}
										value={formData.email}
										onChange={e => handleInputChange('email', e.target.value)}
										autoComplete='username'
									/>
									{/* Дополнительные ошибки */}
									{errors.email && errors.email.length > 1 && (
										<div className={styles.additionalErrors}>
											{errors.email.slice(1).map((error, index) => (
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
											className={cn(styles.fieldLabel, {
												[styles.errorLabel]: errors.password
											})}
										>
											{errors.password ? errors.password[0] : 'Пароль'}
										</label>
										<button
											type='button'
											className={styles.forgotLink}
											onClick={onSwitchToForgotPassword}
										>
											Забыли пароль?
										</button>
									</div>
									<div className={styles.passwordWrapper}>
										<input
											type={showPassword ? 'text' : 'password'}
											id='password'
											className={cn(styles.inputField, {
												[styles.errorInput]: errors.password
											})}
											placeholder='••••••••'
											value={formData.password}
											onChange={e =>
												handleInputChange('password', e.target.value)
											}
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
						</>
					)}

					{status === 'loading' && (
						<div className={styles.loaderWrapper}>
							<Loader />
						</div>
					)}

					{status === 'success' && (
						<div className={styles.successWrapper}>
							<h2>Успешно!</h2>
							<Confetti />
						</div>
					)}
				</div>
			</section>
		</div>
	)
}

export default Auth
