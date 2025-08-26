import React from 'react'

import api from '@/api'

const test = async () => {
	// payload: { emailOrUsername, password }
	const response = await api.get('/test', { withCredentials: true })

	console.log(response)
	return response.data
}

const Test = () => {
	return (
		<div>
			<h1>Тест</h1>
			<p>Здесь будет тестовая страница.</p>
			<button onClick={test}>Охуеть</button>
		</div>
	)
}

export default Test
