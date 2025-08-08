import styles from '@/components/button/Button.module.scss'

const Button = ({ children, onClick, type = 'button', ...rest }) => {
	return (
		<div>
			<button
				className={styles.buttonBlue}
				onClick={onClick}
				type={type}
				{...rest}
			>
				{children}
			</button>
		</div>
	)
}

export default Button
