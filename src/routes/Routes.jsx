import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import Authenticated from '../components/screens/authenticated/Authenticated'
// Раскомментируй!
import Home from '../components/screens/home/Home'
import NotFound from '../components/screens/not-found/NotFound'
import ResetPassword from '../components/screens/reset-password/ResetPassword.jsx'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/authenticated' element={<Authenticated />} />
					<Route path='*' element={<Navigate to='/404' replace />} />
					<Route path='/reset-password' element={<ResetPassword />} />

					<Route path='/404' element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
