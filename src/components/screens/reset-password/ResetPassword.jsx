import cn from 'clsx'
import React, { useEffect, useState } from 'react'
import { MdOutlineTipsAndUpdates } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { useValidation } from '@/hooks/useValidation.js'

// Импорт компонента Timer (проверьте путь)
import styles from '@/components/screens/reset-password/ResetPassword.module.scss'
import Timer from '@/components/screens/timer/Timer.jsx'

import { getInfoAboutToken } from '@/services/PasswordReset.service.js'

const ResetPassword = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		password: '',
		passwordRepeat: ''
	})
	const navigate = useNavigate()
	const [token, setToken] = useState(null)
	const [seconds, setSeconds] = useState(null)

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

	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)

	const { errors, debouncedValidateField, validateForm } = useValidation()

	const handleInputChange = (field, value) => {
		const newFormData = { ...formData, [field]: value }
		setFormData(newFormData)
		debouncedValidateField(field, value, newFormData)
	}

	const handleSubmit = () => {
		const validationErrors = validateForm(formData, 'resetPassword')
		if (Object.keys(validationErrors).length === 0 && onSubmit) {
			onSubmit({
				password: formData.password,
				password_confirmation: formData.passwordRepeat
			})
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.tooltip}>
				<h1>Сброс пароля</h1>
				<MdOutlineTipsAndUpdates size={20} color='#586380' />
				<span className={styles.tooltiptext}>
					{seconds !== null && <Timer initialSeconds={seconds} />}
				</span>
			</div>

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
						{showPassword ? 'Скрыть' : 'Показать'}
					</button>
				</div>
			</div>

			<div className={styles.inputGroup}>
				<label
					htmlFor='passwordRepeat'
					className={cn(styles.fieldLabel, {
						[styles.errorLabel]: errors.passwordRepeat
					})}
				>
					{errors.passwordRepeat
						? errors.passwordRepeat[0]
						: 'Повторите пароль'}
				</label>
				<div className={styles.passwordWrapper}>
					<input
						type={showPasswordRepeat ? 'text' : 'password'}
						id='passwordRepeat'
						className={cn(styles.inputField, {
							[styles.errorInput]: errors.passwordRepeat
						})}
						placeholder='••••••••'
						value={formData.passwordRepeat}
						onChange={e => handleInputChange('passwordRepeat', e.target.value)}
					/>
					<button
						className={styles.passwordToggle}
						type='button'
						onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
					>
						{showPasswordRepeat ? 'Скрыть' : 'Показать'}
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
	)
}

export default ResetPassword
