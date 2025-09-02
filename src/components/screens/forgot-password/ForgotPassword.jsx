import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { useState } from 'react'
import { GoArrowLeft, GoX } from 'react-icons/go'

import { useValidation } from '@/hooks/useValidation.js'

import Loader from '@/components/loader/Loader.jsx'
// ← импорт clsx
import styles from '@/components/screens/registration/Registration.module.scss'

import { passwordReset } from '@/services/PasswordReset.service.js'

const ForgotPassword = ({ onClose, onGoBack }) => {
	const [formData, setFormData] = useState({ email: '' })
	const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success'
	const [sentEmail, setSentEmail] = useState('')
	const { errors, debouncedValidateField, validateForm, setErrors } =
		useValidation()

	const handleInputChange = (field, value) => {
		setFormData(prev => ({ ...prev, [field]: value }))
		debouncedValidateField(field, value)
	}

	// const handleSubmit = async () => {
	// 	if (status === 'loading') return
	// 	const validationErrors = validateForm(formData, 'forgotPassword')
	//
	// 	if (Object.keys(validationErrors).length === 0) {
	// 		setStatus('loading')
	// 		try {
	// 			await passwordReset({ email: formData.email })
	// 			setStatus('success')
	// 		} catch (error) {
	// 			if (error.status === 422) setStatus('idle')
	// 			console.error('Ошибка при отправке ссылки:', error)
	// 		}
	// 	}
	// }
	const forgottPasswordMutation = useMutation({
		mutationFn: passwordReset,
		onSuccess: data => {
			console.log(data)
			console.log('success')
			console.log(this)

			setSentEmail(formData.email) // сохраняем сюда email
			setStatus('success')
			setFormData({ email: '' }) // очищаем форму

			setFormData({
				email: ''
			})
		},
		onError: error => {
			if (error?.response?.status === 422) {
				// Валидационные ошибки — показываем ошибки по полям
				if (error.response.data.errors) {
					setErrors(error.response.data.errors)
				}
			} else if (error?.response?.status === 409) {
				// Конфликт — например, email уже зарегистрирован
				const message = error.response.data.message || 'Конфликт данных'
				// Присваиваем ошибку email (или username, если нужно)
				setErrors({ email: [message] })
			} else {
				alert(error?.response?.data?.message || 'Ошибка при регистрации')
			}
			setStatus('idle')
		}
	})

	const handleSubmit = () => {
		if (status === 'loading') return
		const validationErrors = validateForm(formData, 'forgotPassword')
		if (Object.keys(validationErrors).length === 0) {
			const dataToSend = {
				email: formData.email
			}
			setStatus('loading')
			forgottPasswordMutation.mutate(dataToSend)
		}
	}

	const maskEmail = email => {
		if (!email) return ''
		const [name, domain] = email.split('@')
		if (!domain) return email
		const visibleName = name.length > 2 ? name.slice(0, 2) : name[0]
		const maskedName =
			visibleName + '*'.repeat(Math.max(0, name.length - visibleName.length))
		return maskedName + '@' + domain
	}

	return (
		<div className={styles.sec1}>
			<div className={styles.d1}>
				<h1>У вас всё получится!</h1>
				<img
					className={styles.logo}
					src='../../../assets/images/Registration-logo.svg'
					alt='Изображение'
				/>
			</div>

			<div className={styles.d2}>
				{/* Кнопка "Назад" */}
				<GoArrowLeft
					className={styles.backButton}
					fill='#586380'
					fontSize={30}
					onClick={onGoBack}
				/>

				{/* Кнопка "Закрыть" */}
				<GoX
					className={styles.closeButton}
					fill='#586380'
					fontSize={30}
					onClick={onClose}
				/>

				{status === 'idle' && (
					<div className={styles.container}>
						<h1>Выполнить сброс пароля</h1>
						<p>
							Введите адрес электронной почты, использованный при регистрации.
							Мы отправим вам ссылку для входа и сброса пароля. Если вы
							зарегистрировались с помощью адреса электронной почты родителей,
							мы отправим им эту ссылку.
						</p>

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

						<button className={styles.buttonBlue} onClick={handleSubmit}>
							<p>Отправить ссылку для сброса</p>
						</button>
					</div>
				)}

				{status === 'loading' && (
					<div className={styles.loaderWrapper}>
						<Loader />
					</div>
				)}

				{status === 'success' && (
					<div className={styles.container}>
						<h1>Проверьте свой почтовый ящик!</h1>
						<p>Мы отправили сообщение на адрес</p>
						<p>{maskEmail(sentEmail)}</p>
						<p>Если вы не получили сообщение, проверьте свою папку спама.</p>
						<button className={styles.buttonBlue} onClick={onClose}>
							<p>Закрыть</p>
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default ForgotPassword
