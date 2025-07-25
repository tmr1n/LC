import styles from './header.module.scss'

import projectLogo from '../../../assets/Logo.svg'

const Header = () => {
	return (
		<header className={styles.header}>
			<a href='.' target='_blank'>
				<img src={projectLogo} className='logo' alt='Logo' />
			</a>
			<button className={styles.buttonBlue} onClick={() => {}}>
				Вход
			</button>
			{/* User Profile */}
		</header>
	)
}

export default Header
