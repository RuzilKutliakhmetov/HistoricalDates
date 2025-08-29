import { gsap } from 'gsap'
import React, { useEffect, useRef } from 'react'
import { TimelinePeriod } from '../../types/timelines'

import { TimelineYears } from '../TimelineYears/TimelineYears'
import { Pagination } from './Pagination/Pagination'
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
	const yearsRef = useRef<HTMLDivElement>(null)

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

	// Навигация с ограничениями (без цикличности)
	const handleNext = () => {
		if (activePeriod < periods.length - 1) {
			onPeriodChange(activePeriod + 1)
		}
	}

	const handlePrev = () => {
		if (activePeriod > 0) {
			onPeriodChange(activePeriod - 1)
		}
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

		// Анимация чисел годов
		if (yearsRef.current) {
			gsap.fromTo(
				yearsRef.current.children,
				{ opacity: 0, y: 10 },
				{ opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' }
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
			<div className='timeline-circle__left'>
				<div className='timeline-circle__title'>Исторические даты</div>
				{/* Пагинация - вынесена в отдельный компонент */}
				<Pagination
					current={activePeriod + 1}
					total={periods.length}
					onNext={handleNext}
					onPrev={handlePrev}
					isFirst={activePeriod === 0}
					isLast={activePeriod === periods.length - 1}
				/>
			</div>

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

				{/* Блок с годами в центре круга */}
				<div className='timeline-circle__years'>
					<TimelineYears
						periods={periods}
						activePeriod={activePeriod}
						ref={yearsRef}
					/>
				</div>

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
		</div>
	)
}
