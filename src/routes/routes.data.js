import Profile from '@/components/screens/profile/Profile.jsx'
import ResetPassword from '@/components/screens/reset-password/ResetPassword.jsx'

import Home from '../components/screens/home/Home'

export const routes = [
	{
		path: '/',
		component: Home,
		auth: false
	},
	{
		path: '/profile',
		component: Profile,
		auth: true
	},

	{
		path: '/reset-password',
		component: ResetPassword,
		auth: false
	},
	{
		auth: false
	}
	// {
	// 	path: '/auth',
	// 	component: Auth,
	// 	auth: false
	// }
]
