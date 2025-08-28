import { gsap } from 'gsap'
import React, { useEffect, useRef } from 'react'

import { TimelinePeriod } from '../../types/timelines'
import './TimelineCircle.scss'

interface TimelineCircleProps {
	periods: TimelinePeriod[]
	activePeriod: number
	onPeriodChange: (index: number) => void
}

export const TimelineCircle: React.FC<TimelineCircleProps> = ({
	periods,
	activePeriod,
	onPeriodChange,
}) => {
	const pointsContainerRef = useRef<HTMLDivElement>(null)
	const pointRefs = useRef<(HTMLButtonElement | null)[]>([])
	const labelRef = useRef<HTMLDivElement>(null)

	// Инициализируем массив refs
	useEffect(() => {
		pointRefs.current = pointRefs.current.slice(0, periods.length)
	}, [periods.length])

	// Рассчитываем угол поворота для контейнера точек (активный элемент в 30 градусах)
	const calculateRotation = (index: number) => {
		const totalItems = periods.length
		const baseAngle = 360 / totalItems
		const targetAngle = 30
		const rotation = targetAngle - index * baseAngle
		return rotation
	}

	// Циклическая навигация
	const handleNext = () => {
		const nextIndex = (activePeriod + 1) % periods.length
		onPeriodChange(nextIndex)
	}

	const handlePrev = () => {
		const prevIndex = (activePeriod - 1 + periods.length) % periods.length
		onPeriodChange(prevIndex)
	}

	useEffect(() => {
		// Анимация вращения контейнера точек
		if (pointsContainerRef.current) {
			gsap.to(pointsContainerRef.current, {
				rotation: calculateRotation(activePeriod),
				duration: 0.3,
				ease: 'power2.out',
			})
		}

		// Анимация появления названия периода
		if (labelRef.current) {
			gsap.fromTo(
				labelRef.current,
				{ opacity: 0, x: 20 },
				{ opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
			)
		}

		// Анимация вращения текста в противоположную сторону
		pointRefs.current.forEach(point => {
			if (point) {
				gsap.to(point, {
					rotation: -calculateRotation(activePeriod),
					duration: 0.3,
					ease: 'power2.out',
				})
			}
		})
	}, [activePeriod, periods.length])

	const handlePeriodClick = (index: number) => {
		onPeriodChange(index)
	}

	return (
		<div className='timeline-circle'>
			{/* Контейнер круга и точек */}
			<div className='timeline-circle__container'>
				<svg className='timeline-circle__svg' viewBox='0 0 100 100'>
					{/* Фон круга */}
					<circle
						className='timeline-circle__background'
						cx='50'
						cy='50'
						r='45'
					/>
				</svg>

				{/* Контейнер точек с вращением */}
				<div
					ref={pointsContainerRef}
					className='timeline-circle__points'
					style={{ transform: `rotate(${calculateRotation(activePeriod)}deg)` }}
				>
					{periods.map((period, index) => {
						const angle = (index * 360) / periods.length
						const radian = (angle * Math.PI) / 180
						const x = 50 + 45 * Math.sin(radian)
						const y = 50 - 45 * Math.cos(radian)

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
							>
								{index === activePeriod ? (
									<span className='timeline-circle__index'>{index + 1}</span>
								) : (
									<span className='timeline-circle__dot'></span>
								)}
							</button>
						)
					})}
				</div>

				{/* Название активного периода фиксировано справа от круга */}
				<div ref={labelRef} className='timeline-circle__label'>
					{periods[activePeriod]?.name}
				</div>
			</div>

			{/* Кнопки навигации - ниже круга и слева */}
			<div className='timeline-circle__navigation'>
				<button
					className='timeline-circle__nav-btn timeline-circle__prev'
					onClick={handlePrev}
				>
					<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
						<path
							d='M15 18L9 12L15 6'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>

				<div className='timeline-circle__current'>
					{activePeriod + 1} / {periods.length}
				</div>

				<button
					className='timeline-circle__nav-btn timeline-circle__next'
					onClick={handleNext}
				>
					<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
						<path
							d='M9 18L15 12L9 6'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
			</div>
		</div>
	)
}
