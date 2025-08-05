import React, { useState } from 'react'
import Realistic from 'react-canvas-confetti/dist/presets/realistic'

export default function ConfettiOnClick() {
	const [showConfetti, setShowConfetti] = useState(false)

	return (
		<div>
			<button onClick={() => setShowConfetti(true)}>Запустить конфетти</button>

			{showConfetti && <Realistic autorun={{ speed: 0.3 }} />}
		</div>
	)
}
