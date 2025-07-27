import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import NotFound from '../components/screens/not-found/NotFound'

import { routes } from './routes.data'

const Router = () => {
	return (
		<BrowserRouter>
			<Layout>
				{' '}
				{/* ✅ Layout оборачивает все роуты */}
				<Routes>
					{routes.map(route => (
						<Route
							key={route.path}
							path={route.path}
							element={<route.component />}
						/>
					))}

					<Route path='*' element={<NotFound />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	)
}

export default Router
