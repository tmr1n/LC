import projectLogo from './assets/Logo.svg'
import './assets/styles/index.scss'

function App() {
	return (
		<>
			<div>
				<a href='https://react.dev' target='_blank'>
					<img src={projectLogo} className='logo' alt='Logo' />
				</a>
			</div>
			<h1>Занятия с лёгкостью!</h1>
			<div className='card'></div>
		</>
	)
}

export default App
