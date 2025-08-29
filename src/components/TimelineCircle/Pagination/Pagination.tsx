import React from 'react'
import './Pagination.scss'

interface PaginationProps {
	current: number
	total: number
	onNext: () => void
	onPrev: () => void
	isFirst: boolean
	isLast: boolean
}

export const Pagination: React.FC<PaginationProps> = ({
	current,
	total,
	onNext,
	onPrev,
	isFirst,
	isLast,
}) => {
	return (
		<div className='pagination'>
			{/* Номер пагинации выше кнопок */}
			<div className='pagination__counter'>
				{current} / {total}
			</div>

			{/* Кнопки навигации */}
			<div className='pagination__buttons'>
				<button
					className={`pagination__button pagination__button--prev ${
						isFirst ? 'disabled' : ''
					}`}
					onClick={onPrev}
					disabled={isFirst}
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

				<button
					className={`pagination__button pagination__button--next ${
						isLast ? 'disabled' : ''
					}`}
					onClick={onNext}
					disabled={isLast}
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
