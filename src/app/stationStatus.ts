export class StationStatus{
	constructor(
		private station_id:number,
		private num_bikes_available:number,
		private num_bikes_disables:number,
		private docks_bikes_available:number,
		private docs_bikes_disabled:number,
		private is_installed:number,
		private is_renting:number,
		private last_reported:number
	)
	{}
}