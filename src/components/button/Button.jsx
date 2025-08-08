import styles from '@/components/button/Button.module.scss'

const Button = ({ children }) => {
	return (
		<div>
			<button className={styles.buttonBlue}>{children}</button>
		</div>
	)
}

export default Button
