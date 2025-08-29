import { forwardRef } from 'react'

import { TimelinePeriod } from '../../types/timelines'
import './TimelineYears.scss'

interface TimelineYearsProps {
	periods: TimelinePeriod[]
	activePeriod: number
}

export const TimelineYears = forwardRef<HTMLDivElement, TimelineYearsProps>(
	({ periods, activePeriod }, ref) => {
		const activePeriodData = periods[activePeriod]

		return (
			<div ref={ref} className='timeline-years'>
				<div className='timeline-years__start'>
					{activePeriodData.startYear}
				</div>
				<div className='timeline-years__end'>{activePeriodData.endYear}</div>
			</div>
		)
	}
)

TimelineYears.displayName = 'TimelineYears'
