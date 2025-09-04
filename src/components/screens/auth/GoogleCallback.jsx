import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import api from '../../../api'

function GoogleCallback() {
	const { provider } = useParams()
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState({})
	const [user, setUser] = useState(null)
	const location = useLocation()

	// On page load, we take "search" parameters
	// and proxy them to /api/auth/callback on our Laravel API
	useEffect(() => {
		api
			.get(`/auth/${provider}/callback${location.search}`)
			.then(({ data }) => {
				setLoading(false)
				setData(data)
			})
			.catch(() => {
				setLoading(false)
			})
	}, [provider, location.search])

	// Helper method to fetch User data for authenticated user
	// Watch out for "Authorization" header that is added to this call
	function fetchUserData() {
		api
			.get('/user')
			.then(({ data }) => {
				setUser(data)
			})
			.catch(error => {
				console.error('Fetch user error:', error)
			})
	}

	if (loading) {
		return <DisplayLoading />
	} else {
		if (user != null) {
			return <DisplayData data={user} />
		} else {
			return (
				<div>
					<DisplayData data={data} />
					<div style={{ marginTop: 10 }}>
						<button onClick={fetchUserData}>Fetch User</button>
					</div>
				</div>
			)
		}
	}
}

function DisplayLoading() {
	return <div>Loading....</div>
}

function DisplayData(data) {
	return (
		<div>
			<samp>{JSON.stringify(data, null, 2)}</samp>
		</div>
	)
}

export default GoogleCallback
