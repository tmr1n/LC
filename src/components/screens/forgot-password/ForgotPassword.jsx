import { useState } from 'react'
import { GoArrowLeft, GoX } from 'react-icons/go'

import styles from '@/components/screens/registration/Registration.module.scss'

const ForgotPassword = ({ onClose, onGoBack }) => {
	const [formData, setFormData] = useState({
		email: ''
	})

	const [errors, setErrors] = useState({})

	const validateEmail = email => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	const handleInputChange = (field, value) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}))

		const newErrors = { ...errors }

		switch (field) {
			case 'email':
				if (value && !validateEmail(value)) {
					newErrors.email = ['Недопустимый адрес эл. почты']
				} else {
					delete newErrors.email
				}
				break
		}

		setErrors(newErrors)
	}

	const handleSubmit = () => {
		const newErrors = {}

		if (!formData.email) {
			newErrors.email = ['Поле обязательно для заполнения']
		} else if (!validateEmail(formData.email)) {
			newErrors.email = ['Недопустимый адрес эл. почты']
		}

		setErrors(newErrors)

		if (Object.keys(newErrors).length === 0) {
			console.log('Отправка ссылки для сброса пароля на:', formData.email)
			// Здесь логика отправки письма
		}
	}

	return (
		<div className={styles.sec1}>
			<div className={styles.d1}>
				<h1>У вас всё получится!</h1>
				<img
					className={styles.logo}
					src='src/assets/Registration-logo.svg'
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

				<div className={styles.container}>
					<h1>Выполнить сброс пароля</h1>
					<p>
						Введите адрес электронной почты, использованный при регистрации. Мы
						отправим вам ссылку для входа и сброса пароля. Если вы
						зарегистрировались с помощью адреса электронной почты родителей, мы
						отправим им эту ссылку.
					</p>

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

					<button className={styles.buttonBlue} onClick={handleSubmit}>
						<p>Отправить ссылку для сброса</p>
					</button>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword
