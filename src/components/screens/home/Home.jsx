import cn from 'clsx'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import styles from './home.module.scss'

const Home = () => {
	const { openRegistration } = useOutletContext()
	const [loading, setLoading] = useState(true)

	// Имитируем загрузку данных
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 2000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<div className={styles.homeWrapper}>
			{/* Твоя существующая hero секция */}
			<section className={styles.home}>
				{loading ? (
					<HeroSkeleton />
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

			{/* Секция возможностей */}
			<section className={styles.featuresSection}>
				<div className={styles.container}>
					{loading ? (
						<FeaturesSkeleton />
					) : (
						<>
							<h2 className={styles.sectionTitle}>Наши возможности</h2>
							<div className={styles.featuresGrid}>
								{[
									{
										icon: '📚',
										title: 'Интерактивные карточки',
										desc: 'Создавайте и изучайте материал с помощью флеш-карт'
									},
									{
										icon: '✅',
										title: 'Пробные тесты',
										desc: 'Проверяйте знания с помощью адаптивных тестов'
									},
									{
										icon: '🎯',
										title: 'Учебные активности',
										desc: 'Разнообразные упражнения для лучшего запоминания'
									},
									{
										icon: '📊',
										title: 'Отслеживание прогресса',
										desc: 'Следите за своими успехами и достижениями'
									}
								].map((feature, index) => (
									<div key={index} className={styles.featureCard}>
										<div className={styles.featureIcon}>{feature.icon}</div>
										<h3 className={styles.featureTitle}>{feature.title}</h3>
										<p className={styles.featureDesc}>{feature.desc}</p>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</section>

			{/* Секция статистики */}
			<section className={styles.statsSection}>
				<div className={styles.container}>
					{loading ? (
						<StatsSkeleton />
					) : (
						<div className={styles.statsGrid}>
							{[
								{ number: '10K+', label: 'Активных студентов' },
								{ number: '50K+', label: 'Карточек создано' },
								{ number: '95%', label: 'Успешных тестов' },
								{ number: '24/7', label: 'Доступность' }
							].map((stat, index) => (
								<div key={index} className={styles.statItem}>
									<div className={styles.statNumber}>{stat.number}</div>
									<div className={styles.statLabel}>{stat.label}</div>
								</div>
							))}
						</div>
					)}
				</div>
			</section>

			{/* Секция "Как это работает" */}
			<section className={styles.howItWorksSection}>
				<div className={styles.container}>
					{loading ? (
						<StepsSkeleton />
					) : (
						<>
							<h2 className={styles.sectionTitle}>Как это работает</h2>
							<div className={styles.stepsGrid}>
								{[
									{
										step: '1',
										title: 'Регистрируйтесь',
										desc: 'Создайте аккаунт за несколько секунд'
									},
									{
										step: '2',
										title: 'Создавайте карточки',
										desc: 'Добавляйте свой учебный материал'
									},
									{
										step: '3',
										title: 'Изучайте',
										desc: 'Повторяйте и закрепляйте знания'
									},
									{
										step: '4',
										title: 'Прогрессируйте',
										desc: 'Отслеживайте свои достижения'
									}
								].map((step, index) => (
									<div key={index} className={styles.stepCard}>
										<div className={styles.stepNumber}>{step.step}</div>
										<h3 className={styles.stepTitle}>{step.title}</h3>
										<p className={styles.stepDesc}>{step.desc}</p>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</section>
		</div>
	)
}

// Skeleton компоненты
const HeroSkeleton = () => (
	<>
		<div className={cn(styles.skeleton, styles.skeletonTitle)}></div>
		<div className={cn(styles.skeleton, styles.skeletonMiniTitle)}></div>
		<div className={cn(styles.skeleton, styles.skeletonButton)}></div>
	</>
)

const FeaturesSkeleton = () => (
	<div className={styles.featuresSkeleton}>
		<div className={cn(styles.skeleton, styles.skeletonSectionTitle)}></div>
		<div className={styles.featuresGrid}>
			{[1, 2, 3, 4].map(item => (
				<div key={item} className={styles.featureCardSkeleton}>
					<div className={cn(styles.skeleton, styles.skeletonCircle)}></div>
					<div className={cn(styles.skeleton, styles.skeletonCardTitle)}></div>
					<div className={cn(styles.skeleton, styles.skeletonCardDesc)}></div>
					<div
						className={cn(
							styles.skeleton,
							styles.skeletonCardDesc,
							styles.short
						)}
					></div>
				</div>
			))}
		</div>
	</div>
)

const StatsSkeleton = () => (
	<div className={styles.statsGrid}>
		{[1, 2, 3, 4].map(item => (
			<div key={item} className={styles.statItemSkeleton}>
				<div className={cn(styles.skeleton, styles.skeletonStatNumber)}></div>
				<div className={cn(styles.skeleton, styles.skeletonStatLabel)}></div>
			</div>
		))}
	</div>
)

const StepsSkeleton = () => (
	<div className={styles.stepsSkeleton}>
		<div className={cn(styles.skeleton, styles.skeletonSectionTitle)}></div>
		<div className={styles.stepsGrid}>
			{[1, 2, 3, 4].map(item => (
				<div key={item} className={styles.stepCardSkeleton}>
					<div className={cn(styles.skeleton, styles.skeletonStepNumber)}></div>
					<div className={cn(styles.skeleton, styles.skeletonStepTitle)}></div>
					<div className={cn(styles.skeleton, styles.skeletonStepDesc)}></div>
				</div>
			))}
		</div>
	</div>
)

export default Home
