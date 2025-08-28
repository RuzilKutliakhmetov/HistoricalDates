import { Timeline } from './components/Timeline'
import { timelineData } from './const/TimelineData'

function App() {
	return (
		<div className='app'>
			<Timeline periods={timelineData} title='История развития компании' />
		</div>
	)
}

export default App
