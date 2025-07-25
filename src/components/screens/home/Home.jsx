import styles from './home.module.scss'

function Home() {
	return (
		<section className={styles.home}>
			<h1> Как вы хотите заниматься? </h1>
			<h2>
				Освойте любой изучаемый материал с помощью интерактивных карточек,
				пробных тестов и учебных активностей в Quizlet.
			</h2>
			<button className={styles.buttonBluee} onClick={() => {}}>
				Зарегистрироваться бесплатно
			</button>
		</section>
	)
}

export default Home
