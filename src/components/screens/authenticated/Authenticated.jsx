import React from 'react'
import Realistic from 'react-canvas-confetti/dist/presets/realistic'

import api from '@/api.js'

const authenticated = async () => {
	// payload: { email, password }
	const response = await api.get('/authenticated', { withCredentials: true })

	console.log(response)
	return response.data
}

const Authenticated = () => {
	return (
		<div>
			<h1>Тест</h1>
			<p>Здесь будет тестовая страница.</p>
			<button onClick={authenticated}>Такие дела</button>
			{/*//TODO Realistic не работает*/}
			<Realistic />
		</div>
	)
}

export default Authenticated
