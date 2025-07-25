import './layout.module.scss'

import Header from './header/Header.jsx'
import Home from '@/components/screens/home/Home.jsx'

const Layout = () => {
	return (
		<div>
			<Header />
			<Home />
		</div>
	)
}

export default Layout
