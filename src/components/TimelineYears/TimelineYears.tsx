import { gsap } from 'gsap'
import React, { useEffect, useRef } from 'react'

import { TimelinePeriod } from '../../types/timelines'
import './TimelineYears.scss'

interface TimelineYearsProps {
	periods: TimelinePeriod[]
	activePeriod?: number
}

export const TimelineYears: React.FC<TimelineYearsProps> = ({
	periods,
	activePeriod = 0,
}) => {
	const numbersRef = useRef<HTMLDivElement>(null)
	const activePeriodData = periods[activePeriod]

	useEffect(() => {
		if (numbersRef.current) {
			gsap.fromTo(
				numbersRef.current.children,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
			)
		}
	}, [activePeriod])

	return (
		<div ref={numbersRef} className='timeline-years'>
			<div className='timeline-years__start'>{activePeriodData.startYear}</div>
			<div className='timeline-years__end'>{activePeriodData.endYear}</div>
		</div>
	)
}
