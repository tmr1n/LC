import React, { useEffect, useState } from 'react'

function Timer({ initialSeconds }) {
	const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

	useEffect(() => {
		if (secondsLeft <= 0) return

		const timerId = setInterval(() => {
			setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0))
		}, 1000)

		return () => clearInterval(timerId)
	}, [secondsLeft])

	return (
		<div>
			{secondsLeft > 0 ? (
				<p>Осталось {secondsLeft} секунд до истечения токена</p>
			) : (
				<p>Токен истёк</p>
			)}
		</div>
	)
}

export default Timer
