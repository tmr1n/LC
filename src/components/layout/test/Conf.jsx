import React, { useState } from 'react'

import Confetti from '../../loader/Confetti.jsx'

export default function TestConfetti() {
	const [show, setShow] = useState(false)

	return (
		<>
			<button onClick={() => setShow(true)}>Запустить конфетти</button>
			{show && <Confetti />}
		</>
	)
}
