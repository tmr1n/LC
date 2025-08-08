import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Test from '@/components/test-component/Test.jsx'

import Layout from '../components/layout/Layout'
// Раскомментируй!
import Home from '../components/screens/home/Home'
import NotFound from '../components/screens/not-found/NotFound'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/test' element={<Test />} />
					<Route path='*' element={<Navigate to='/404' replace />} />

					<Route path='/404' element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
