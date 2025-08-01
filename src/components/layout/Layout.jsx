import cn from 'clsx'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

// ← Добавлено
import Header from '@/components/layout/header/Header.jsx'

import styles from './layout.module.scss'

import Auth from '../screens/auth/Auth'
import ForgotPassword from '../screens/forgot-password/ForgotPassword'
import Registration from '../screens/registration/Registration'

const Layout = () => {
	const location = useLocation()
	const [currentModal, setCurrentModal] = useState(null)
	const [isClosing, setIsClosing] = useState(false)

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
			{shouldShowHeader && (
				<Header openRegistration={openRegistration} openAuth={openAuth} />
			)}

			{!isModalOpen && (
				<main
					className={cn({ [styles.hiddenContent]: isModalOpen })}
					style={{
						visibility: isModalOpen ? 'hidden' : 'visible'
					}}
				>
					<Outlet context={{ openRegistration, openAuth }} />
				</main>
			)}

			{currentModal === 'registration' && (
				<div
					className={cn(styles.fullscreenModal, {
						[styles.closing]: isClosing
					})}
				>
					<Registration onClose={closeModals} onSwitchToAuth={switchToAuth} />
				</div>
			)}

			{currentModal === 'auth' && (
				<div
					className={cn(styles.fullscreenModal, {
						[styles.closing]: isClosing
					})}
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
					className={cn(styles.fullscreenModal, {
						[styles.closing]: isClosing
					})}
				>
					<ForgotPassword onClose={closeModals} onGoBack={switchToAuth} />
				</div>
			)}
		</div>
	)
}

export default Layout
