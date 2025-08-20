import cn from 'clsx'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/button/Button'
import styles1 from '@/components/button/Button.module.scss'

import styles from './NotFound.module.scss'

const NotFound = () => {
	const navigate = useNavigate()
	return (
		<>
			<div className={cn(styles.notFound, styles.pageBg)}>
				<div className={styles.sec1}>
					<h1 className={styles.nf}>ПЭЙДЖ НОТ ФАУНД</h1>
					<p className={styles.ptext}>
						Ошибка 404. Такая страница не существует либо была удалена
					</p>
					<Button
						className={styles1.buttonYellow}
						onClick={() => navigate('/')}
					>
						На главную
					</Button>
				</div>
			</div>
		</>
	)
}

export default NotFound
