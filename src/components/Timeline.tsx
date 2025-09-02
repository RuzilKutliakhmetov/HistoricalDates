import React, { memo, useRef, useEffect, useState, useCallback } from 'react'
import { useTimeline } from '../hooks/useTimeline'
import { TimelinePeriod } from '../types/timelines'
import './Timeline.scss'
import { TimelineCircle } from './TimelineCircle/TimelineCircle'
import { TimelineSlider } from './TimelineSlider/TimelineSlider'

interface TimelineProps {
	periods: TimelinePeriod[]
}

export const Timeline: React.FC<TimelineProps> = memo(({ periods }) => {
	const { activePeriod, handlePeriodChange } = useTimeline(periods)
	const containerRef = useRef<HTMLDivElement>(null)
	const circleRef = useRef<HTMLDivElement>(null)
	const [axesPosition, setAxesPosition] = useState({ x: 50, y: 50 })
	const [isMobile, setIsMobile] = useState(false)
	const [activeSlideIndex, setActiveSlideIndex] = useState(0)

	const checkIsMobile = useCallback(() => {
		setIsMobile(window.innerWidth <= 768)
	}, [])

	const updateAxesPosition = useCallback(() => {
		if (containerRef.current && circleRef.current && !isMobile) {
			const containerRect = containerRef.current.getBoundingClientRect()
			const circleRect = circleRef.current.getBoundingClientRect()

			const circleCenterX = (circleRect.left + circleRect.width / 2 - containerRect.left) / containerRect.width * 100
			const circleCenterY = (circleRect.top + circleRect.height / 2 - containerRect.top) / containerRect.height * 100

			setAxesPosition({ x: circleCenterX, y: circleCenterY })
		}
	}, [isMobile])

	const handleSlideChange = useCallback((index: number) => {
		setActiveSlideIndex(index)
	}, [])

	useEffect(() => {
		checkIsMobile()
		updateAxesPosition()

		const observer = new ResizeObserver(() => {
			checkIsMobile()
			updateAxesPosition()
		})

		if (containerRef.current) observer.observe(containerRef.current)
		if (circleRef.current) observer.observe(circleRef.current)

		window.addEventListener('resize', checkIsMobile)
		window.addEventListener('orientationchange', checkIsMobile)

		return () => {
			observer.disconnect()
			window.removeEventListener('resize', checkIsMobile)
			window.removeEventListener('orientationchange', checkIsMobile)
		}
	}, [checkIsMobile, updateAxesPosition])

	if (periods.length < 2 || periods.length > 6) {
		console.error('Timeline must have between 2 and 6 periods')
		return null
	}

	return (
		<div className='timeline' ref={containerRef}>
			{!isMobile && (
				<div className='timeline__axes'>
					<svg
						viewBox='0 0 100 100'
						preserveAspectRatio='none'
						className='timeline__axes-svg'
						aria-hidden="true"
					>
						<line
							x1='0'
							y1={axesPosition.y + 5}
							x2='100'
							y2={axesPosition.y + 5}
							stroke='#d0d5e0'
							strokeWidth='0.1'
						/>
						<line
							x1={axesPosition.x}
							y1='0'
							x2={axesPosition.x}
							y2='100'
							stroke='#d0d5e0'
							strokeWidth='0.1'
						/>
					</svg>
				</div>
			)}

			{isMobile && (
				<div className='timeline__axes timeline__axes--mobile'>
					<svg
						viewBox='0 0 100 100'
						preserveAspectRatio='none'
						className='timeline__axes-svg'
						aria-hidden="true"
					>
						<line
							x1='0'
							y1='50'
							x2='100'
							y2='50'
							stroke='#d0d5e0'
							strokeWidth='0.1'
						/>
					</svg>
				</div>
			)}

			<div className='timeline__container'>
				<div className='timeline__navigation' ref={circleRef}>
					<TimelineCircle
						periods={periods}
						activePeriod={activePeriod}
						onPeriodChange={handlePeriodChange}
						isMobile={isMobile}
						onSlideChange={handleSlideChange}
						activeSlideIndex={activeSlideIndex}
					/>
				</div>

				<TimelineSlider
					periods={periods}
					activePeriod={activePeriod}
					isMobile={isMobile}
					onSlideChange={handleSlideChange}
					activeSlideIndex={activeSlideIndex}
				/>
			</div>
		</div>
	)
})

Timeline.displayName = 'Timeline'