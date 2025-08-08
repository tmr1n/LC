import { useNavigate } from 'react-router-dom'

import Button from '@/components/button/Button'

import styles from './NotFound.module.scss'

const NotFound = () => {
	const navigate = useNavigate()
	return (
		<>
			<div className={styles.notFound}>
				<h1 className={styles.nf}>
					ПЭЙДЖ <br /> НОТ <br /> ФАУНД
				</h1>
				<p className={styles.ptext}>
					Ошибка 404. Такая страница не существует
					<br /> либо была удалена
				</p>
				<Button onClick={() => navigate('/')}>На главную</Button>
			</div>
		</>
	)
}

export default NotFound
