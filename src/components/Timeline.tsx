import React from 'react'
import { TimelineCircle } from './TimelineCircle/TimelineCircle'
import { TimelineContent } from './TimelineContent/TimelineContent'
import { TimelineYears } from './TimelineYears/TimelineYears'

import { useTimeline } from '../hooks/useTimeline'
import { TimelinePeriod } from '../types/timelines'
import './Timeline.scss'

interface TimelineProps {
	periods: TimelinePeriod[]
	title?: string
}

export const Timeline: React.FC<TimelineProps> = ({
	periods,
	title = 'Исторические даты',
}) => {
	const { activePeriod, handlePeriodChange } = useTimeline(periods)

	if (periods.length < 2 || periods.length > 6) {
		console.error('Timeline must have between 2 and 6 periods')
		return null
	}

	return (
		<div className='timeline'>
			<div className='timeline__container'>
				<h2 className='timeline__title'>{title}</h2>

				<div className='timeline__navigation'>
					<TimelineCircle
						periods={periods}
						activePeriod={activePeriod}
						onPeriodChange={handlePeriodChange}
					/>
					<TimelineYears periods={periods} activePeriod={activePeriod} />
				</div>

				<TimelineContent periods={periods} activePeriod={activePeriod} />
			</div>
		</div>
	)
}
