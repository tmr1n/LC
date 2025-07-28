import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import styles from './layout.module.scss'

import Auth from '../screens/auth/Auth'
import ForgotPassword from '../screens/forgot-password/ForgotPassword'
import Registration from '../screens/registration/Registration'

// ← Добавить импорт
import Header from '@/components/layout/header/Header.jsx'

const Layout = () => {
	const location = useLocation()
	const [currentModal, setCurrentModal] = useState(null) // ← Изменить на единое состояние
	const [isClosing, setIsClosing] = useState(false)

	// ← Обновленные функции управления модалками
	const openRegistration = () => {
		setCurrentModal('registration')
		setIsClosing(false)
	}

	const openAuth = () => {
		setCurrentModal('auth')
		setIsClosing(false)
	}

	const closeModals = () => {
		setIsClosing(true)

		setTimeout(() => {
			setCurrentModal(null)
			setIsClosing(false)
		}, 200)
	}

	// ← Функции для переключения между видами
	const switchToAuth = () => {
		setCurrentModal('auth')
		setIsClosing(false)
	}

	const switchToRegistration = () => {
		setCurrentModal('registration')
		setIsClosing(false)
	}

	const switchToForgotPassword = () => {
		setCurrentModal('forgotPassword')
		setIsClosing(false)
	}

	useEffect(() => {
		if (currentModal) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [currentModal])

	const hideHeaderPages = []
	const shouldShowHeader = !hideHeaderPages.includes(location.pathname)
	const isModalOpen = currentModal !== null

	return (
		<div>
			{/* ✅ Статичный хедер */}
			{shouldShowHeader && (
				<Header openRegistration={openRegistration} openAuth={openAuth} />
			)}

			{/* ✅ Статичный основной контент БЕЗ анимаций */}
			{!isModalOpen && (
				<main
					className={isModalOpen ? styles.hiddenContent : ''}
					style={{
						visibility: isModalOpen ? 'hidden' : 'visible'
					}}
				>
					<Outlet context={{ openRegistration, openAuth }} />
				</main>
			)}

			{/* ✅ Модальные окна с анимациями */}
			{currentModal === 'registration' && (
				<div
					className={`${styles.fullscreenModal} ${isClosing ? styles.closing : ''}`}
				>
					<Registration onClose={closeModals} onSwitchToAuth={switchToAuth} />
				</div>
			)}

			{currentModal === 'auth' && (
				<div
					className={`${styles.fullscreenModal} ${isClosing ? styles.closing : ''}`}
				>
					<Auth
						onClose={closeModals}
						onSwitchToRegistration={switchToRegistration}
						onSwitchToForgotPassword={switchToForgotPassword}
					/>
				</div>
			)}

			{currentModal === 'forgotPassword' && (
				<div
					className={`${styles.fullscreenModal} ${isClosing ? styles.closing : ''}`}
				>
					<ForgotPassword onClose={closeModals} onGoBack={switchToAuth} />
				</div>
			)}
		</div>
	)
}

export default Layout
