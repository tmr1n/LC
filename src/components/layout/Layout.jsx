import { useLocation } from 'react-router-dom'

import './layout.module.scss'

import Header from '@/components/layout/header/Header.jsx'

const Layout = ({ children }) => {
	const location = useLocation()
	// ✅ Определяем страницы, где НЕ нужен хедер
	const hideHeaderPages = ['/registration', '/auth']
	const shouldShowHeader = !hideHeaderPages.includes(location.pathname)
	// ✅ Принимает children
	return (
		<div>
			{shouldShowHeader && <Header />}
			{children} {/* ✅ Рендерит переданные компоненты */}
			{/* <Footer /> */}
		</div>
	)
}

export default Layout
