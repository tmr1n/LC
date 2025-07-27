import { useNavigate } from 'react-router-dom'

import styles from './header.module.scss'

//import { useNavigate } from 'react-router-dom'
import projectLogo from '../../../assets/Logo.svg'

const Header = () => {
	const navigate = useNavigate()

	const handleLoginClick = () => {
		navigate('/auth')
	}

	return (
		<header className={styles.header}>
			<a href='.' target='_blank'>
				<img src={projectLogo} className='logo' alt='Logo' />
			</a>
			<button className={styles.buttonBlue} onClick={handleLoginClick}>
				Вход
			</button>
			{/* User Profile */}
		</header>
	)
}

export default Header
