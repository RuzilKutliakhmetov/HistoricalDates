import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { TimelinePeriod } from '../../types/timelines'
import './TimelineSlider.scss'

interface TimelineSliderProps {
	periods: TimelinePeriod[]
	activePeriod?: number
	isMobile?: boolean
	onSlideChange?: (index: number) => void
	activeSlideIndex?: number
}

export const TimelineSlider: React.FC<TimelineSliderProps> = memo(
	({ periods, activePeriod = 0, isMobile = false, onSlideChange, activeSlideIndex = 0 }) => {
		const activePeriodData = periods[activePeriod]
		const swiperRef = useRef<SwiperType | null>(null)
		const [isBeginning, setIsBeginning] = useState(true)
		const [isEnd, setIsEnd] = useState(false)
		const [activeIndex, setActiveIndex] = useState(0)

		const handleSwiperInit = useCallback((swiper: SwiperType) => {
			swiperRef.current = swiper
			setIsBeginning(swiper.isBeginning)
			setIsEnd(swiper.isEnd)
			setActiveIndex(swiper.activeIndex)
		}, [])

		const handleSlideChange = useCallback((swiper: SwiperType) => {
			setIsBeginning(swiper.isBeginning)
			setIsEnd(swiper.isEnd)
			const newIndex = swiper.activeIndex
			setActiveIndex(newIndex)
			onSlideChange?.(newIndex)
		}, [onSlideChange])

		const goNext = useCallback(() => {
			if (swiperRef.current && !swiperRef.current.isEnd) {
				swiperRef.current.slideNext()
			}
		}, [])

		const goPrev = useCallback(() => {
			if (swiperRef.current && !swiperRef.current.isBeginning) {
				swiperRef.current.slidePrev()
			}
		}, [])

		const goToSlide = useCallback((index: number) => {
			if (swiperRef.current) {
				swiperRef.current.slideTo(index)
			}
		}, [])

		useEffect(() => {
			if (swiperRef.current && activeSlideIndex !== activeIndex) {
				swiperRef.current.slideTo(activeSlideIndex)
				setActiveIndex(activeSlideIndex)
			}
		}, [activeSlideIndex, activeIndex])

		useEffect(() => {
			if (swiperRef.current) {
				setIsBeginning(swiperRef.current.isBeginning)
				setIsEnd(swiperRef.current.isEnd)
				setActiveIndex(swiperRef.current.activeIndex)
			}
		}, [activePeriodData.events])

		return (
			<div
				className={`timeline-slider ${isMobile ? 'timeline-slider--mobile' : ''
					}`}
			>
				{!isMobile && (
					<div className='timeline-slider__button'>
						<button
							className={`timeline-slider__prev ${isBeginning ? 'disabled' : ''
								}`}
							onClick={goPrev}
							disabled={isBeginning}
							aria-label='Предыдущий слайд'
						>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								aria-hidden='true'
							>
								<path
									d='M15 18L9 12L15 6'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>
				)}

				<Swiper
					spaceBetween={30}
					slidesPerView={isMobile ? 2 : 1.5}
					onSwiper={handleSwiperInit}
					onSlideChange={handleSlideChange}
					breakpoints={{
						640: {
							slidesPerView: isMobile ? 2 : 2,
						},
						768: {
							slidesPerView: isMobile ? 2 : 2.5,
						},
						1024: {
							slidesPerView: isMobile ? 2 : 3,
						},
					}}
					key={activePeriod}
				>
					{activePeriodData.events.map(event => (
						<SwiperSlide key={event.id}>
							<div className='timeline-event'>
								<div className='timeline-event__year'>{event.year}</div>
								<div className='timeline-event__description'>
									{event.description}
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{!isMobile && (
					<div className='timeline-slider__button'>
						<button
							className={`timeline-slider__next ${isEnd ? 'disabled' : ''}`}
							onClick={goNext}
							disabled={isEnd}
							aria-label='Следующий слайд'
						>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								aria-hidden='true'
							>
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
				)}
			</div>
		)
	}
)

TimelineSlider.displayName = 'TimelineSlider'