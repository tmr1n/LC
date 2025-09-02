import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { convertSecondsToTime } from '@/utils/timer.js'

function Timer({ initialSeconds }) {
	const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
	const [seconds, setSeconds] = useState(null)
	const [minute, setMinute] = useState(null)

	const navigate = useNavigate()

	// useEffect(() => {
	// 	if (secondsLeft <= 0) return
	//
	// 	console.log(secondsLeft)
	// 	const timerId = setInterval(() => {
	// 		const totalSeconds = secondsLeft > 0 ? secondsLeft - 1 : 0
	// 		const mins = Math.floor(totalSeconds / 60)
	// 		const minsString = mins < 10 ? `0${mins}` : mins
	// 		const secs = totalSeconds % 60
	// 		const secsString = secs < 10 ? `0${secs}` : secs
	// 		setSeconds(secsString)
	// 		setMinute(minsString)
	//
	// 		setSecondsLeft(totalSeconds)
	// 		//setSecondsLeft(10)
	// 	}, 1000)
	//
	// 	return () => clearInterval(timerId)
	// }, [secondsLeft])
	//
	// useEffect(() => {
	// 	if (secondsLeft === 0) {
	// 		// пример для react-router-dom v6
	// 		navigate('/')
	// 	}
	// }, [secondsLeft])

	useEffect(() => {
		let totalSeconds = secondsLeft // начальное значение секунд
		const [mins, secs] = convertSecondsToTime(totalSeconds)
		setMinute(mins)
		setSeconds(secs)

		// Запускаем интервал
		const timerId = setInterval(() => {
			if (totalSeconds <= 0) {
				clearInterval(timerId)
				navigate('/') // переход при достижении 0
				return
			}

			totalSeconds -= 1

			const [mins, secs] = convertSecondsToTime(totalSeconds)
			setMinute(mins)
			setSeconds(secs)
		}, 1000)

		return () => clearInterval(timerId) // очистка при размонтировании
	}, []) // пустой массив зависимостей — useEffect сработает один раз

	return (
		<div>
			{secondsLeft > 0 ? (
				<p>
					Оставшееся время на смену пароля: {minute}:{seconds}
				</p>
			) : (
				<p>Токен истёк</p>
			)}
		</div>
	)
}

export default Timer
