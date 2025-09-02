import React, { memo } from 'react'
import './Pagination.scss'

interface PaginationProps {
	current: number
	total: number
	onNext: () => void
	onPrev: () => void
	isFirst: boolean
	isLast: boolean
}

export const Pagination: React.FC<PaginationProps> = memo(
	({ current, total, onNext, onPrev, isFirst, isLast }) => {
		return (
			<div className='pagination'>
				<div className='pagination__counter'>
					{current} / {total}
				</div>

				<div className='pagination__buttons'>
					<button
						className={`pagination__button pagination__button--prev ${
							isFirst ? 'disabled' : ''
						}`}
						onClick={onPrev}
						disabled={isFirst}
						aria-label='Предыдущий период'
					>
						<svg
							width='16'
							height='16'
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

					<button
						className={`pagination__button pagination__button--next ${
							isLast ? 'disabled' : ''
						}`}
						onClick={onNext}
						disabled={isLast}
						aria-label='Следующий период'
					>
						<svg
							width='16'
							height='16'
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
			</div>
		)
	}
)

Pagination.displayName = 'Pagination'
