export interface TimelineEvent {
	id: number
	year: number
	title: string
	description: string
}

export interface TimelinePeriod {
	id: number
	name: string
	startYear: number
	endYear: number
	events: TimelineEvent[]
}
