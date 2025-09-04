import React from 'react'

import api from '@/api.js'

const profile = async () => {
	// payload: { email, password }
	const response = await api.get('/profile', { withCredentials: true })

	console.log(response)
	return response.data
}

const Profile = () => {
	return (
		<div>
			<h1>Тест</h1>
			<p>Здесь будет тестовая страница.</p>
			<button onClick={profile}>Такие дела</button>
		</div>
	)
}

export default Profile
