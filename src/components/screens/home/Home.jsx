//import cn from 'clsx'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useOutletContext } from 'react-router-dom'

import styles from './home.module.scss'

const Home = () => {
	const { openRegistration } = useOutletContext()
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 2000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<section className={styles.home}>
			{loading ? (
				<>
					{/*TODO сделать адаптив skeletonLoader*/}
					<Skeleton height={60} width={320} style={{ marginBottom: 24 }} />
					<Skeleton height={40} width={280} style={{ marginBottom: 24 }} />
					<Skeleton height={50} width={220} borderRadius={25} />
				</>
			) : (
				<>
					<h1 className={styles.title}>Как вы хотите заниматься?</h1>
					<p className={styles.miniTitle}>
						Освойте любой изучаемый материал с помощью интерактивных карточек,
						<br />
						пробных тестов и учебных активностей.
					</p>
					<button className={styles.buttonBluee} onClick={openRegistration}>
						Зарегистрироваться бесплатно
					</button>
				</>
			)}
		</section>
	)
}

export default Home
