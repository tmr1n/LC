import cn from 'clsx'
import React, { useState } from 'react'

import { useValidation } from '@/hooks/useValidation.js'

import styles from '@/components/screens/reset-password/ResetPassword.module.scss'

const ResetPassword = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		password: '',
		passwordRepeat: ''
	})

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
			<h1>Сброс пароля</h1>

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
			</div>
		</div>
	)
}

export default ResetPassword
