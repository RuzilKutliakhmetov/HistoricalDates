import React from 'react'
import { TimelineSlider } from '../TimelineSlider/TimelineSlider'

import { TimelinePeriod } from '../../types/timelines'
import './TimelineContent.scss'

interface TimelineContentProps {
	periods: TimelinePeriod[]
	activePeriod?: number
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
	periods,
	activePeriod = 0,
}) => {
	const activePeriodData = periods[activePeriod]

	return (
		<div className='timeline-content'>
			<div className='timeline-content__header'>
				<div className='timeline-content__counter'>
					{activePeriod + 1} / {periods.length}
				</div>
				<h3 className='timeline-content__title'>{activePeriodData.name}</h3>
			</div>

			<TimelineSlider events={activePeriodData.events} />
		</div>
	)
}
