import { gsap } from 'gsap'
import React, { memo, useCallback, useEffect, useRef } from 'react'
import { TimelinePeriod } from '../../types/timelines'
import { TimelineYears } from '../TimelineYears/TimelineYears'
import { Pagination } from './Pagination/Pagination'
import './TimelineCircle.scss'

interface TimelineCircleProps {
	periods: TimelinePeriod[]
	activePeriod: number
	onPeriodChange: (index: number) => void
	isMobile?: boolean
}

export const TimelineCircle: React.FC<TimelineCircleProps> = memo(
	({ periods, activePeriod, onPeriodChange, isMobile = false }) => {
		const pointsContainerRef = useRef<HTMLDivElement>(null)
		const pointRefs = useRef<(HTMLButtonElement | null)[]>([])
		const labelRef = useRef<HTMLDivElement>(null)
		const yearsRef = useRef<HTMLDivElement>(null)

		const calculateRotation = useCallback(
			(index: number) => {
				const totalItems = periods.length
				const baseAngle = 360 / totalItems
				return 30 - index * baseAngle
			},
			[periods.length]
		)

		const handleNext = useCallback(() => {
			if (activePeriod < periods.length - 1) {
				onPeriodChange(activePeriod + 1)
			}
		}, [activePeriod, periods.length, onPeriodChange])

		const handlePrev = useCallback(() => {
			if (activePeriod > 0) {
				onPeriodChange(activePeriod - 1)
			}
		}, [activePeriod, onPeriodChange])

		const handlePeriodClick = useCallback(
			(index: number) => {
				onPeriodChange(index)
			},
			[onPeriodChange]
		)

		useEffect(() => {
			if (isMobile) return // Отключаем анимации на мобильных

			const ctx = gsap.context(() => {
				if (pointsContainerRef.current) {
					gsap.to(pointsContainerRef.current, {
						rotation: calculateRotation(activePeriod),
						duration: 0.3,
						ease: 'power2.out',
					})
				}

				if (labelRef.current) {
					gsap.fromTo(
						labelRef.current,
						{ opacity: 0, x: 20 },
						{ opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
					)
				}

				if (yearsRef.current) {
					gsap.fromTo(
						yearsRef.current.children,
						{ opacity: 0, y: 10 },
						{
							opacity: 1,
							y: 0,
							duration: 0.3,
							stagger: 0.1,
							ease: 'power2.out',
						}
					)
				}

				pointRefs.current.forEach(point => {
					if (point) {
						gsap.to(point, {
							rotation: -calculateRotation(activePeriod),
							duration: 0.3,
							ease: 'power2.out',
						})
					}
				})
			})

			return () => ctx.revert()
		}, [activePeriod, calculateRotation, isMobile])

		return (
			<div
				className={`timeline-circle ${
					isMobile ? 'timeline-circle--mobile' : ''
				}`}
			>
				{isMobile && (
					<div className='timeline-circle__mobile-header'>
						<div className='timeline-circle__title'>Исторические даты</div>
					</div>
				)}

				<div className='timeline-circle__left'>
					{!isMobile && (
						<>
							<div className='timeline-circle__title'>Исторические даты</div>
							<Pagination
								current={activePeriod + 1}
								total={periods.length}
								onNext={handleNext}
								onPrev={handlePrev}
								isFirst={activePeriod === 0}
								isLast={activePeriod === periods.length - 1}
							/>
						</>
					)}
				</div>

				<div className='timeline-circle__right'>
					<div
						className={`timeline-circle__container ${
							isMobile ? 'timeline-circle__container--mobile' : ''
						}`}
					>
						{!isMobile && (
							<svg
								className='timeline-circle__svg'
								viewBox='0 0 100 100'
								aria-hidden='true'
							>
								<circle
									className='timeline-circle__background'
									cx='50'
									cy='50'
									r='50'
								/>
							</svg>
						)}

						<div className='timeline-circle__years'>
							<TimelineYears
								periods={periods}
								activePeriod={activePeriod}
								ref={yearsRef}
								isMobile={isMobile}
							/>
						</div>

						{!isMobile && (
							<div
								ref={pointsContainerRef}
								className='timeline-circle__points'
								style={{
									transform: `rotate(${calculateRotation(activePeriod)}deg)`,
								}}
							>
								{periods.map((period, index) => {
									const angle = (index * 360) / periods.length
									const radian = (angle * Math.PI) / 180
									const x = 50 + 50 * Math.sin(radian)
									const y = 50 - 50 * Math.cos(radian)

									return (
										<button
											key={period.id}
											ref={el => {
												pointRefs.current[index] = el
											}}
											className={`timeline-circle__point ${
												index === activePeriod ? 'active' : ''
											}`}
											style={{
												left: `${x}%`,
												top: `${y}%`,
											}}
											onClick={() => handlePeriodClick(index)}
											aria-label={`Период ${index + 1}: ${period.name}`}
											aria-current={index === activePeriod ? 'true' : 'false'}
										>
											<span className='timeline-circle__dot'></span>
											<span className='timeline-circle__index'>
												{index + 1}
											</span>
										</button>
									)
								})}
							</div>
						)}

						{!isMobile && (
							<div ref={labelRef} className='timeline-circle__label'>
								{periods[activePeriod]?.name}
							</div>
						)}
					</div>
				</div>

				{isMobile && (
					<div className='timeline-circle__mobile-pagination'>
						<Pagination
							current={activePeriod + 1}
							total={periods.length}
							onNext={handleNext}
							onPrev={handlePrev}
							isFirst={activePeriod === 0}
							isLast={activePeriod === periods.length - 1}
						/>
					</div>
				)}
			</div>
		)
	}
)

TimelineCircle.displayName = 'TimelineCircle'
