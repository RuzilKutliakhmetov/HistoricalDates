import React from 'react'
import { TimelineCircle } from './TimelineCircle/TimelineCircle'

import { TimelineYears } from './TimelineYears/TimelineYears'

import { useTimeline } from '../hooks/useTimeline'
import { TimelinePeriod } from '../types/timelines'
import './Timeline.scss'
import { TimelineSlider } from './TimelineSlider/TimelineSlider'

interface TimelineProps {
	periods: TimelinePeriod[]
}

export const Timeline: React.FC<TimelineProps> = ({ periods }) => {
	const { activePeriod, handlePeriodChange } = useTimeline(periods)

	if (periods.length < 2 || periods.length > 6) {
		console.error('Timeline must have between 2 and 6 periods')
		return null
	}

	return (
		<div className='timeline'>
			<div className='timeline__container'>
				<div className='timeline__navigation'>
					<TimelineCircle
						periods={periods}
						activePeriod={activePeriod}
						onPeriodChange={handlePeriodChange}
					/>
					<TimelineYears periods={periods} activePeriod={activePeriod} />
				</div>

				<TimelineSlider periods={periods} activePeriod={activePeriod} />
			</div>
		</div>
	)
}
