import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { useState } from 'react'
import Realistic from 'react-canvas-confetti/dist/presets/realistic'
// Импортируем реалистичные конфетти
import { FaYandex } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { GoX } from 'react-icons/go'
import { TiVendorMicrosoft } from 'react-icons/ti'

import { useValidation } from '@/hooks/useValidation.js'

import Loader from '@/components/loader/Loader'

import styles from './registration.module.scss'

import { register } from '@/services/Registration.service'

const Registration = ({ onClose, onSwitchToAuth }) => {
	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
		passwordRepeat: '',
		newsConsent: false,
		termsAccepted: false
	})
	const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success'

	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)
	const {
		errors,
		debouncedValidateField,
		validateForm,
		clearErrors,
		setErrors
	} = useValidation()

	const isLoading = status === 'loading'

	const handleInputChange = (field, value) => {
		const newFormData = { ...formData, [field]: value }
		setFormData(newFormData)
		debouncedValidateField(field, value, newFormData)
	}

	const handleGoogleLogin = () => {
		window.location.href = 'https://YOUR_BACKEND_DOMAIN/auth/google'
	}

	const registrationMutation = useMutation({
		mutationFn: register,
		onSuccess: () => {
			setStatus('success')
			clearErrors()
			setFormData({
				email: '',
				username: '',
				password: '',
				passwordRepeat: '',
				newsConsent: false,
				termsAccepted: false
			})
		},
		onError: error => {
			if (error?.response?.data?.errors) {
				setErrors(error.response.data.errors)
			} else {
				alert(error?.response?.data?.message || 'Ошибка при регистрации')
			}
			setStatus('idle')
		}
	})

	const handleSubmit = () => {
		if (isLoading) return
		const validationErrors = validateForm(formData, 'registration')
		if (Object.keys(validationErrors).length === 0) {
			const dataToSend = {
				email: formData.email,
				name: formData.username,
				password: formData.password,
				password_confirmation: formData.passwordRepeat
			}
			setStatus('loading')
			registrationMutation.mutate(dataToSend)
		}
	}

	return (
		<div>
			<section className={styles.sec1}>
				{/* Левая колонка - картинка и заголовок */}
				<div className={styles.d1}>
					<h1>
						Самый лучший способ учиться.
						<br />
						Чтобы сохранить прогресс!
					</h1>
					<img
						className={styles.logo}
						src='src/assets/images/Registration-logo.svg'
						alt='Логотип'
					/>
				</div>

				{/* Правая колонка - форма, лоадер или успех */}
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
									<div className={styles.underline}>
										<h3 className={cn(styles.regTitle, styles.withUnderline)}>
											Зарегистрироваться
										</h3>
									</div>
									<div className={styles.underline}>
										<h3
											className={cn(styles.regTitle, styles.inActive)}
											onClick={onSwitchToAuth}
										>
											Вход
										</h3>
									</div>
								</div>

								<div className={styles.gap}>
									<button
										className={cn(styles.buttonGray, styles.mt15)}
										onClick={handleGoogleLogin}
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
										onClick={() => {}}
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
										onClick={() => {}}
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

								<div className={styles.inputGroup}>
									<label
										htmlFor='email'
										className={cn(styles.fieldLabel, {
											[styles.errorLabel]: errors.email
										})}
									>
										{errors.email ? errors.email[0] : 'Email'}
									</label>
									<input
										type='email'
										id='email'
										className={cn(styles.inputField, {
											[styles.errorInput]: errors.email
										})}
										placeholder='user@mail.com'
										value={formData.email}
										onChange={e => handleInputChange('email', e.target.value)}
									/>
								</div>

								<div className={styles.inputGroup}>
									<label
										htmlFor='username'
										className={cn(styles.fieldLabel, {
											[styles.errorLabel]: errors.username
										})}
									>
										{errors.username ? errors.username[0] : 'Имя пользователя'}
									</label>
									<input
										type='text'
										id='username'
										className={cn(styles.inputField, {
											[styles.errorInput]: errors.username
										})}
										placeholder='andrew123'
										value={formData.username}
										onChange={e =>
											handleInputChange('username', e.target.value)
										}
									/>
									{errors.username && errors.username.length > 1 && (
										<div className={styles.additionalErrors}>
											{errors.username.slice(1).map((error, idx) => (
												<div key={idx} className={styles.errorText}>
													{error}
												</div>
											))}
										</div>
									)}
								</div>

								<div className={styles.inputGroup}>
									<label
										htmlFor='password'
										className={cn(styles.fieldLabel, {
											[styles.errorLabel]: errors.password
										})}
									>
										{errors.password ? errors.password[0] : 'Пароль'}
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
											onChange={e =>
												handleInputChange('password', e.target.value)
											}
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
									{errors.password && errors.password.length > 1 && (
										<div className={styles.additionalErrors}>
											{errors.password.slice(1).map((error, idx) => (
												<div key={idx} className={styles.errorText}>
													{error}
												</div>
											))}
										</div>
									)}
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

								{errors.terms && (
									<div className={styles.termsError}>{errors.terms[0]}</div>
								)}

								<button
									className={styles.buttonBlue}
									onClick={handleSubmit}
									disabled={registrationMutation.isLoading}
								>
									<p>Зарегистрироваться</p>
								</button>
								<button className={styles.buttonGray} onClick={onSwitchToAuth}>
									<p>Уже есть учетная запись? Войти</p>
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
							<Realistic />
						</div>
					)}

					<style>{`
            @keyframes fadeIn {
              to {
                opacity: 1;
              }
            }
          `}</style>
				</div>
			</section>
		</div>
	)
}

export default Registration
