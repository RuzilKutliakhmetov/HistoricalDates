import { forwardRef, memo } from 'react'
import { TimelinePeriod } from '../../types/timelines'
import './TimelineYears.scss'

interface TimelineYearsProps {
	periods: TimelinePeriod[]
	activePeriod: number
	isMobile?: boolean
}

export const TimelineYears = memo(
	forwardRef<HTMLDivElement, TimelineYearsProps>(
		({ periods, activePeriod, isMobile = false }, ref) => {
			const activePeriodData = periods[activePeriod]

			return (
				<div
					ref={ref}
					className={`timeline-years ${isMobile ? 'timeline-years--mobile' : ''
						}`}
				>
					<div className='timeline-years__start'>
						{activePeriodData.startYear}
					</div>
					<div className='timeline-years__end'>{activePeriodData.endYear}</div>
				</div>
			)
		}
	)
)

TimelineYears.displayName = 'TimelineYears'
