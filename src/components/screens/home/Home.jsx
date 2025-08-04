import { useOutletContext } from 'react-router-dom'

import Conf from '@/components/layout/test/Conf'

import styles from './home.module.scss'

const Home = () => {
	const { openRegistration } = useOutletContext() // ✅ Получаем функции

	return (
		<section className={styles.home}>
			<h1 className={styles.title}> Как вы хотите заниматься? </h1>
			<p className={styles.miniTitle}>
				Освойте любой изучаемый материал с помощью интерактивных карточек,
				<br />
				пробных тестов и учебных активностей.
			</p>
			<button className={styles.buttonBluee} onClick={openRegistration}>
				Зарегистрироваться бесплатно
			</button>
			<Conf />
		</section>
	)
}

export default Home
