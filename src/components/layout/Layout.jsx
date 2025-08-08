import cn from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'

import Header from '@/components/layout/header/Header.jsx'

import styles from './layout.module.scss'

import Auth from '../screens/auth/Auth'
import ForgotPassword from '../screens/forgot-password/ForgotPassword'
import Registration from '../screens/registration/Registration'

// Конфигурируем один раз
TopBarProgress.config({
	barColors: { 0: '#007BFF', '1.0': '#007BFF' },
	barThickness: 3,
	shadowBlur: 0
})

const Layout = () => {
	const location = useLocation()

	// Модалки
	const [currentModal, setCurrentModal] = useState(null) // 'registration' | 'auth' | 'forgotPassword' | null
	const [isClosing, setIsClosing] = useState(false)

	// Топбар (показываем на смене пути)
	const [showTopBar, setShowTopBar] = useState(false)
	const hideTimerRef = useRef(null)

	useEffect(() => {
		setShowTopBar(true)
		clearTimeout(hideTimerRef.current)
		// Минимальная видимость, чтобы не мигал
		hideTimerRef.current = setTimeout(() => setShowTopBar(false), 400)
		return () => clearTimeout(hideTimerRef.current)
	}, [location.pathname])

	// Прячем Header на явном /404
	const shouldShowHeader = !location.pathname.startsWith('/404')

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
		}, 200) // длительность анимации закрытия
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

	// Блокируем скролл страницы при открытой модалке
	useEffect(() => {
		if (currentModal) document.body.style.overflow = 'hidden'
		else document.body.style.overflow = 'unset'
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [currentModal])

	const isModalOpen = currentModal !== null

	return (
		<div>
			{showTopBar && <TopBarProgress />}
			{shouldShowHeader && (
				<Header openRegistration={openRegistration} openAuth={openAuth} />
			)}

			<main
				className={cn(styles.mainContent, {
					[styles.inactiveContent]: isModalOpen
				})}
				aria-hidden={isModalOpen}
			>
				<Outlet context={{ openRegistration, openAuth }} />
			</main>

			{currentModal === 'registration' && (
				<div
					className={cn(styles.fullscreenModal, {
						[styles.closing]: isClosing
					})}
					role='dialog'
					aria-modal='true'
				>
					<Registration onClose={closeModals} onSwitchToAuth={switchToAuth} />
				</div>
			)}

			{currentModal === 'auth' && (
				<div
					className={cn(styles.fullscreenModal, {
						[styles.closing]: isClosing
					})}
					role='dialog'
					aria-modal='true'
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
					role='dialog'
					aria-modal='true'
				>
					<ForgotPassword onClose={closeModals} onGoBack={switchToAuth} />
				</div>
			)}
		</div>
	)
}

export default Layout
