import React from 'react'
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks'

function Confetti() {
	return (
		<Fireworks
			autorun={{ speed: 3, duration: 200 }}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				pointerEvents: 'none'
			}}
			decorateOptions={options => ({
				...options,
				origin: { x: 0.5, y: 0.5 } // центр экрана
			})}
		/>
	)
}

export default Confetti
