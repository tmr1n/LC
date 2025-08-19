import styles from './header.module.scss'

import projectLogoMobile from '../../../assets/Logo-adaptive.svg'
//import { useNavigate } from 'react-router-dom'
import projectLogo from '../../../assets/Logo.svg'

const Header = ({ openAuth }) => {
	return (
		<header className={styles.header}>
			<a href='.' target='_blank'>
				<img src={projectLogo} className={styles.logoDesktop} alt='Logo' />
				<img
					src={projectLogoMobile}
					className={styles.logoMobile}
					alt='Logo mobile'
				/>
			</a>
			<button className={styles.buttonBlue} onClick={openAuth}>
				Вход
			</button>
			{/* User Profile */}
		</header>
	)
}

export default Header
