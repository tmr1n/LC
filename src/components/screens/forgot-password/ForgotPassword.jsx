import cn from 'clsx'
import { useState } from 'react'
import { GoArrowLeft, GoX } from 'react-icons/go'

import { useValidation } from '@/hooks/useValidation.js'

// ← импорт clsx
import styles from '@/components/screens/registration/Registration.module.scss'

const ForgotPassword = ({ onClose, onGoBack }) => {
	const [formData, setFormData] = useState({
		email: ''
	})

	const { errors, debouncedValidateField, validateForm } = useValidation()

	const handleInputChange = (field, value) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}))
		debouncedValidateField(field, value)
	}

	const handleSubmit = () => {
		const validationErrors = validateForm(formData, 'forgotPassword')

		if (Object.keys(validationErrors).length === 0) {
			console.log('Отправка ссылки для сброса пароля на:', formData.email)
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
			</div>
		</div>
	)
}

export default ForgotPassword
