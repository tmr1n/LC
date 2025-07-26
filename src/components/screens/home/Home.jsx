import styles from './home.module.scss'

const Home = () => {
	return (
		<section className={styles.home}>
			<h1 className={styles.title}> Как вы хотите заниматься? </h1>
			<p className={styles.miniTitle}>
				Освойте любой изучаемый материал с помощью интерактивных карточек,
				<br />
				пробных тестов и учебных активностей.
			</p>
			<button className={styles.buttonBluee} onClick={() => {}}>
				Зарегистрироваться бесплатно
			</button>
		</section>
	)
}

export default Home
