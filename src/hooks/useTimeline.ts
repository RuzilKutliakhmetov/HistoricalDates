import { useEffect, useState } from 'react'
import { TimelinePeriod } from '../types/timelines'

export const useTimeline = (periods: TimelinePeriod[]) => {
	const [activePeriod, setActivePeriod] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const interval = periods.length > 1 ? 100 / (periods.length - 1) : 0
		setProgress(activePeriod * interval)
	}, [activePeriod, periods.length])

	const handlePeriodChange = (index: number) => {
		if (index >= 0 && index < periods.length) {
			setActivePeriod(index)
		}
	}

	const handleNext = () => {
		if (activePeriod < periods.length - 1) {
			setActivePeriod(activePeriod + 1)
		}
	}

	const handlePrev = () => {
		if (activePeriod > 0) {
			setActivePeriod(activePeriod - 1)
		}
	}

	return {
		activePeriod,
		progress,
		handlePeriodChange,
		handleNext,
		handlePrev,
		activePeriodData: periods[activePeriod],
		isFirst: activePeriod === 0,
		isLast: activePeriod === periods.length - 1,
	}
}
