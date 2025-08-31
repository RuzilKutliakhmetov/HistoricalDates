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
			<div className='timeline__axes'>
				<svg
					viewBox='0 0 100 100'
					preserveAspectRatio='xMidYMid meet'
					className='timeline__axes-svg'
				>
					<line
						x1='-100'
						y1='46.8'
						x2='200'
						y2='46.8'
						stroke='#d0d5e0'
						strokeWidth='0.1'
					/>
					<line
						x1='50'
						y1='0'
						x2='50'
						y2='100'
						stroke='#d0d5e0'
						strokeWidth='0.1'
					/>
				</svg>
			</div>

			<div className='timeline__container'>
				<div className='timeline__navigation'>
					<TimelineCircle
						periods={periods}
						activePeriod={activePeriod}
						onPeriodChange={handlePeriodChange}
					/>
				</div>

				<TimelineSlider periods={periods} activePeriod={activePeriod} />
			</div>
		</div>
	)
}