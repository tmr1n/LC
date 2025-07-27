import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import styles from './layout.module.scss'

import Auth from '../screens/auth/Auth'
import Registration from '../screens/registration/Registration'

import Header from '@/components/layout/header/Header.jsx'

const Layout = () => {
	const location = useLocation()
	const [showRegistration, setShowRegistration] = useState(false)
	const [showAuth, setShowAuth] = useState(false)
	const [isClosing, setIsClosing] = useState(false)

	const openRegistration = () => {
		setShowRegistration(true)
		setShowAuth(false)
		setIsClosing(false)
	}

	const openAuth = () => {
		setShowAuth(true)
		setShowRegistration(false)
		setIsClosing(false)
	}

	const closeModals = () => {
		setIsClosing(true)

		setTimeout(() => {
			setShowRegistration(false)
			setShowAuth(false)
			setIsClosing(false)
		}, 200)
	}

	useEffect(() => {
		if (showRegistration || showAuth) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [showRegistration, showAuth])

	const hideHeaderPages = []
	const shouldShowHeader = !hideHeaderPages.includes(location.pathname)
	const isModalOpen = showRegistration || showAuth

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
						visibility: isModalOpen ? 'hidden' : 'visible' // или display: 'none'
					}}
				>
					<Outlet context={{ openRegistration, openAuth }} />
				</main>
			)}

			{/* ✅ Только модальные окна анимируются */}
			{showRegistration && (
				<div
					className={`${styles.fullscreenModal} ${isClosing ? styles.closing : ''}`}
				>
					<Registration onClose={closeModals} onSwitchToAuth={openAuth} />
				</div>
			)}

			{showAuth && (
				<div
					className={`${styles.fullscreenModal} ${isClosing ? styles.closing : ''}`}
				>
					<Auth
						onClose={closeModals}
						onSwitchToRegistration={openRegistration}
					/>
				</div>
			)}
		</div>
	)
}

export default Layout
