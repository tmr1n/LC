export function convertSecondsToTime(totalSeconds) {
	const mins = Math.floor(totalSeconds / 60)
	const secs = totalSeconds % 60
	return [
		mins < 10 ? `0${mins}` : `${mins}`,
		secs < 10 ? `0${secs}` : `${secs}`
	]
}
