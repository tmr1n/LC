import cn from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'

import Header from '@/components/layout/header/Header.jsx'

import styles from './layout.module.scss'

import Auth from '../screens/auth/Auth'
import ForgotPassword from '../screens/forgot-password/ForgotPassword'
import Registration from '../screens/registration/Registration'

const Layout = () => {
	const location = useLocation()

	const [currentModal, setCurrentModal] = useState(null)
	const [isClosing, setIsClosing] = useState(false)
	const [showTopBar, setShowTopBar] = useState(false)
	const hideTimerRef = useRef(null)
	useEffect(() => {
		// при каждом изменении pathname — показать прогресс
		setShowTopBar(true)
		// уберем через 300–500 мс (или дольше, если хочешь)
		clearTimeout(hideTimerRef.current)
		hideTimerRef.current = setTimeout(() => setShowTopBar(false), 400)
		return () => clearTimeout(hideTimerRef.current)
	}, [location.pathname])

	const openRegistration = () => {
		setCurrentModal('registration')
		setIsClosing(false)
	}

	const openAuth = () => {
		setCurrentModal('auth')
		setIsClosing(false)
	}

	const closeModals = () => {
		// Запускаем анимацию закрытия
		setIsClosing(true)

		// Убираем модалку из DOM через 200ms (соответствует длительности анимации)
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

	// Блокируем скролл страницы при открытой модалке
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

	// Можно задать пути, где хедер скрывать (если нужно)
	const hideHeaderPages = []
	const shouldShowHeader = !hideHeaderPages.includes(location.pathname)

	const isModalOpen = currentModal !== null

	return (
		<div>
			{/* Header всегда отображается, кроме страниц скрытия */}
			{showTopBar && <TopBarProgress />}
			{shouldShowHeader && (
				<Header openRegistration={openRegistration} openAuth={openAuth} />
			)}

			{/* Основной контент (Outlet) всегда в DOM, но становится неактивным и затемнённым при открытии модалки */}
			<main
				className={cn(styles.mainContent, {
					[styles.inactiveContent]: isModalOpen
				})}
				aria-hidden={isModalOpen}
			>
				<Outlet context={{ openRegistration, openAuth }} />
			</main>

			{/* Модалки поверх, с анимацией появления и закрытия */}
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
