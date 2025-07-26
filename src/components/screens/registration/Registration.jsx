import { FcGoogle } from 'react-icons/fc'
import { GoX } from 'react-icons/go'

import styles from './registration.module.scss'

const Registration = () => {
	return (
		<div>
			<section className={styles.sec1}>
				<div className={styles.d1}>
					<h1>Самый лучший способ учиться. чтобы сохранить прогресс!.</h1>
					<img
						className={styles.logo}
						src='src/assets/Registration-logo.svg'
						alt='Изображение'
					/>
				</div>

				<div className={styles.d2}>
					<GoX className={styles.closeButton} fill='#000000' fontSize={35} />
					<div className={styles.container}>
						<div className={styles.titleNames}>
							<h3 className={styles.regTitle}>Зарегистрироваться</h3>
							<h3 className={styles.regTitle}>Вход</h3>
						</div>
						<button className={styles.buttonGoogle} onClick={() => {}}>
							<FcGoogle
								className={styles.iconGoogle}
								fill='#000000'
								fontSize={25}
							/>
							<p>Продолжить с Google</p>
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Registration
