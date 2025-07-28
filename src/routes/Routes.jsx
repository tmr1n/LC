import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import Home from '../components/screens/home/Home'
import NotFound from '../components/screens/not-found/NotFound'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
				</Route>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
