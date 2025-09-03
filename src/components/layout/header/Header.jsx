import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useLocation } from 'react-router-dom'

import styles from './header.module.scss'

import projectLogoMobile from '../../../assets/images/Logo-adaptive.svg'
//import { useNavigate } from 'react-router-dom'
import projectLogo from '../../../assets/images/Logo.svg'

const Header = ({ openAuth }) => {
	const location = useLocation()
	const page = location.pathname

	return (
		<header className={styles.header}>
			<RxHamburgerMenu className={styles.hamburgerMenu} fontSize={25} />
			<a href='.' target='_blank'>
				<img src={projectLogo} className={styles.logoDesktop} alt='Logo' />
				<img
					src={projectLogoMobile}
					className={styles.logoMobile}
					alt='Logo mobile'
				/>
			</a>

			{page !== '/reset-password' && (
				<button className={styles.buttonBlue} onClick={openAuth}>
					Вход
				</button>
			)}
			{/* User Profile */}
		</header>
	)
}

export default Header
