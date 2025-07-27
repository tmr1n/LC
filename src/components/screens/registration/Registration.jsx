import { FcGoogle } from 'react-icons/fc'
import { GoX } from 'react-icons/go'

import styles from './registration.module.scss'

const Registration = ({ onClose, onSwitchToAuth }) => {
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
					<GoX
						className={styles.closeButton}
						fill='#586380'
						fontSize={30}
						onClick={onClose}
					/>
					<div className={styles.container}>
						<div className={styles.titleNames}>
							{/* Вкладка "Регистрация" */}
							<div className={styles.underline}>
								<h3
									className={`${styles.regTitle} ${styles.withUnderline}`}
									onClick={() => ''}
								>
									Зарегистрироваться
								</h3>
							</div>

							{/* Вкладка "Вход" */}
							<div className={styles.underline}>
								<h3
									className={`${styles.regTitle} ${styles.inActive}`}
									onClick={onSwitchToAuth}
								>
									Вход
								</h3>
							</div>
						</div>

						<button
							className={`${styles.buttonGray} ${styles.mt15}`}
							onClick={() => {}}
						>
							<FcGoogle
								className={styles.iconGoogle}
								fill='#000000'
								fontSize={25}
							/>
							<p>Продолжить с Google</p>
						</button>
						<div className={styles.dividerFlex}>
							<span className={styles.line}></span>
							<span className={styles.text}>или адрес эл. почты</span>
							<span className={styles.line}></span>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='email' className={styles.fieldLabel}>
								Email
							</label>
							<input
								type='email'
								id='email'
								className={styles.inputField}
								placeholder='user@mail.com'
							/>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='username' className={styles.fieldLabel}>
								Имя пользователя
							</label>
							<input
								type='text'
								id='username'
								className={styles.inputField}
								placeholder='andrew123'
							/>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='password' className={styles.fieldLabel}>
								Пароль
							</label>
							<div className={styles.passwordWrapper}>
								<input
									type='password'
									id='password'
									className={styles.inputField}
									placeholder='••••••••'
								/>
								<button type='button' className={styles.passwordToggle}>
									<svg viewBox='0 0 24 24' width='20' height='20'>
										<path
											d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
											fill='currentColor'
										/>
									</svg>
								</button>
							</div>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='passwordRepeat' className={styles.fieldLabel}>
								Повторите пароль
							</label>
							<div className={styles.passwordWrapper}>
								<input
									type='password'
									id='password'
									className={styles.inputField}
									placeholder='••••••••'
								/>
								<button type='button' className={styles.passwordToggle}>
									<svg viewBox='0 0 24 24' width='20' height='20'>
										<path
											d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
											fill='currentColor'
										/>
									</svg>
								</button>
							</div>
						</div>

						<div className={styles.checkboxGroup}>
							<label className={styles.checkboxLabel}>
								<input type='checkbox' className={styles.checkboxInput} />
								<span className={styles.checkboxCustom}></span>
								<span className={styles.checkboxText}>
									Я хочу получать новости, рекламные сообщения, обновления и
									советы о том, как использовать LangCards
								</span>
							</label>
						</div>

						<div className={styles.checkboxGroup}>
							<label className={styles.checkboxLabel}>
								<input
									type='checkbox'
									className={styles.checkboxInput}
									required
								/>
								<span className={styles.checkboxCustom}></span>
								<span className={styles.checkboxText}>
									Я принимаю положения, которые содержат{' '}
									<a href='#' className={styles.checkboxLink}>
										Условия предоставления услуг
									</a>{' '}
									и{' '}
									<a href='#' className={styles.checkboxLink}>
										Политику конфиденциальности
									</a>{' '}
									LangCards
								</span>
							</label>
						</div>

						<button className={styles.buttonBlue} onClick={() => {}}>
							<p>Зарегистрироваться</p>
						</button>
						<button className={styles.buttonGray} onClick={onSwitchToAuth}>
							<p>Уже есть учетная запись? Войти</p>
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Registration
