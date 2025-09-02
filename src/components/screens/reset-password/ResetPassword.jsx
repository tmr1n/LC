import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import React, { useEffect, useState } from 'react'
import Realistic from 'react-canvas-confetti/dist/presets/realistic/index.js'
import { MdOutlineTipsAndUpdates } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { useValidation } from '@/hooks/useValidation.js'

import Loader from '@/components/loader/Loader.jsx'
// Импорт компонента Timer (проверьте путь)
import styles from '@/components/screens/reset-password/ResetPassword.module.scss'
import Timer from '@/components/screens/timer/Timer.jsx'

import {
	getInfoAboutToken,
	passwordConfirm
} from '@/services/PasswordReset.service.js'

const ResetPassword = () => {
	const [formData, setFormData] = useState({
		password: '',
		passwordRepeat: ''
	})
	const navigate = useNavigate()
	const [token, setToken] = useState(null)
	const [seconds, setSeconds] = useState(null)

	const [showButton, setShowButton] = React.useState(false)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const tokenFromUrl = params.get('token')
		setToken(tokenFromUrl)

		if (tokenFromUrl) {
			// Здесь делаете запрос на бэкенд для проверки токена
			const dataToSend = {
				token: tokenFromUrl
			}
			getInfoAboutToken(dataToSend)
				.then(response => {
					setSeconds(response.data.data.count_seconds)
					// Обработка успешной проверки
					console.log('Токен валиден', response)
				})
				.catch(error => {
					console.log(error)
					if (error.response.status === 404) {
						// Токен недействителен или истек
						navigate('/404')
					}
					if (error.response.status === 410) {
						// Токен недействителен или истек
						alert(error.response.data.message)
					}
					if (error.response.status === 422) {
						// Токен недействителен или истек
						alert(error.response.data.errors.token[0])
					}
					// Обработка ошибки (некорректный токен и т.п.)
					console.error('Неверный токен', error)
				})
		} else {
			navigate('/')
		}
	}, [])
	const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success'
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)

	const { errors, debouncedValidateField, validateForm } = useValidation()

	const handleInputChange = (field, value) => {
		const newFormData = { ...formData, [field]: value }
		setFormData(newFormData)
		debouncedValidateField(field, value, newFormData)
	}

	const passwordResetMutation = useMutation({
		mutationFn: passwordConfirm,
		onSuccess: data => {
			console.log(data)
			setStatus('success')
			setFormData({
				password: '',
				passwordRepeat: '' // корректный ключ формы
			})
		},
		onSettled: () => {
			// По желанию сбросить статус на idle после окончания мутации
			setTimeout(() => setStatus('idle'), 2000) // например, через 2 секунды
		}
	})

	const handleSubmit = () => {
		if (status === 'loading') return
		const validationErrors = validateForm(formData, 'resetPassword')
		if (Object.keys(validationErrors).length === 0) {
			const dataToSend = {
				password: formData.password,
				password_confirmation: formData.passwordRepeat,
				token: token
			}
			setStatus('loading')
			passwordResetMutation.mutate(dataToSend)
		}
	}

	React.useEffect(() => {
		if (status === 'success') {
			const timer = setTimeout(() => {
				setShowButton(true)
			}, 2000)
			return () => clearTimeout(timer)
		} else {
			setShowButton(false)
		}
	}, [status])

	return (
		<>
			{status === 'idle' && (
				<div className={styles.container}>
					<h1>
						Сброс пароля{' '}
						<span className={styles.tooltipWrapper}>
							<MdOutlineTipsAndUpdates size={20} color='#586380' />
							<span className={styles.tooltiptext}>
								{seconds !== null && <Timer initialSeconds={seconds} />}
							</span>
						</span>
					</h1>

					<div className={styles.inputGroup}>
						<label
							htmlFor='password'
							className={cn(styles.fieldLabel, {
								[styles.errorLabel]: errors.password
							})}
						>
							{errors.password ? errors.password[0] : 'Новый пароль'}
						</label>
						<div className={styles.passwordWrapper}>
							<input
								type={showPassword ? 'text' : 'password'}
								id='password'
								className={cn(styles.inputField, {
									[styles.errorInput]: errors.password
								})}
								placeholder='••••••••'
								value={formData.password}
								onChange={e => handleInputChange('password', e.target.value)}
							/>
							<button
								className={styles.passwordToggle}
								type='button'
								onClick={() => setShowPassword(!showPassword)}
							>
								<svg viewBox='0 0 24 24' width='20' height='20'>
									<path
										fill='currentColor'
										d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
									/>
								</svg>
							</button>
						</div>
					</div>

					<div className={styles.inputGroup}>
						<label
							htmlFor='passwordRepeat'
							className={cn(styles.fieldLabel, {
								[styles.errorLabel]: errors.password_confirmation
							})}
						>
							{errors.password_confirmation
								? errors.password_confirmation[0]
								: 'Повторите пароль'}
						</label>
						<div className={styles.passwordWrapper}>
							<input
								type={showPasswordRepeat ? 'text' : 'password'}
								id='passwordRepeat'
								className={cn(styles.inputField, {
									[styles.errorInput]: errors.password_confirmation
								})}
								placeholder='••••••••'
								value={formData.passwordRepeat}
								onChange={e =>
									handleInputChange('passwordRepeat', e.target.value)
								}
							/>
							<button
								className={styles.passwordToggle}
								type='button'
								onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
							>
								<svg viewBox='0 0 24 24' width='20' height='20'>
									<path
										fill='currentColor'
										d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
									/>
								</svg>
							</button>
						</div>
					</div>

					<div className={styles.buttonContainer}>
						<button className={styles.buttonBlue} onClick={handleSubmit}>
							<p>Сменить пароль</p>
						</button>

						<button className={styles.buttonGray} onClick={() => navigate('/')}>
							<p>На главную</p>
						</button>
					</div>
				</div>
			)}

			{status === 'loading' && (
				<div className={styles.loaderWrapper}>
					<Loader />
				</div>
			)}

			{status === 'success' && (
				<div className={styles.successWrapper}>
					<h2>Успешно!</h2>
					<Realistic />
					<button
						className={`${styles.buttonGray} ${showButton ? styles.slideUp : ''}`}
						onClick={() => navigate('/')}
					>
						<p>На главную</p>
					</button>
				</div>
			)}
		</>
	)
}

export default ResetPassword
