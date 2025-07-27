import Auth from '../components/screens/auth/Auth'
import Home from '../components/screens/home/Home'
import Registration from '../components/screens/registration/Registration'

export const routes = [
	{
		path: '/',
		component: Home,
		auth: false
	},
	{
		path: '/registration',
		component: Registration,
		auth: false
	},
	{
		path: '/auth',
		component: Auth,
		auth: false
	}
	// Остальные роуты раскомментируете по мере необходимости
]
