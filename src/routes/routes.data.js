import Test from '@/components/test-component/Test.jsx'

import Home from '../components/screens/home/Home'

export const routes = [
	{
		path: '/',
		component: Home,
		auth: false
	},
	{
		path: '/test',
		component: Test,
		auth: true
	}

	// {
	// 	path: '/registration',
	// 	component: Registration,
	// 	auth: false
	// },
	// {
	// 	path: '/auth',
	// 	component: Auth,
	// 	auth: false
	// }
	// Остальные роуты раскомментируете по мере необходимости
]
