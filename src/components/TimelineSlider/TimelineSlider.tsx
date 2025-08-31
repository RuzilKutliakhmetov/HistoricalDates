import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Swiper as SwiperType } from 'swiper'

import './TimelineSlider.scss'

import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { TimelinePeriod } from '../../types/timelines'

interface TimelineSliderProps {
	periods: TimelinePeriod[]
	activePeriod?: number
}
export const TimelineSlider: React.FC<TimelineSliderProps> = ({
	periods,
	activePeriod = 0,
}) => {
	const activePeriodData = periods[activePeriod]
	const swiperRef = useRef<SwiperType | null>(null)
	const [isBeginning, setIsBeginning] = useState(true)
	const [isEnd, setIsEnd] = useState(false)

	useEffect(() => {
		if (swiperRef.current) {
			setIsBeginning(swiperRef.current.isBeginning)
			setIsEnd(swiperRef.current.isEnd)
		}
	}, [activePeriodData.events])

	const handleSwiperInit = (swiper: SwiperType) => {
		swiperRef.current = swiper
		setIsBeginning(swiper.isBeginning)
		setIsEnd(swiper.isEnd)
	}

	const handleSlideChange = (swiper: SwiperType) => {
		setIsBeginning(swiper.isBeginning)
		setIsEnd(swiper.isEnd)
	}

	const goNext = () => {
		if (swiperRef.current && !swiperRef.current.isEnd) {
			swiperRef.current.slideNext()
		}
	}

	const goPrev = () => {
		if (swiperRef.current && !swiperRef.current.isBeginning) {
			swiperRef.current.slidePrev()
		}
	}

	return (
		<div className='timeline-slider'>
			<div className='timeline-slider__button'>
				<button
					className={`timeline-slider__prev ${isBeginning ? 'disabled' : ''}`}
					onClick={goPrev}
					disabled={isBeginning}
				>
					<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
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
			<Swiper
				modules={[Navigation]}
				spaceBetween={30}
				slidesPerView={1.5}
				onSwiper={handleSwiperInit}
				onSlideChange={handleSlideChange}
				breakpoints={{
					640: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 2.5,
					},
					1024: {
						slidesPerView: 3,
					},
				}}
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
			<div className='timeline-slider__button'>
				<button
					className={`timeline-slider__next ${isEnd ? 'disabled' : ''}`}
					onClick={goNext}
					disabled={isEnd}
				>
					<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
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
