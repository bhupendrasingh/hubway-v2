export class Station{
    constructor(
        private stationName:string,
        private stationId:number,
        private lat:number,
        private lon:number,
        private capacity:number,
        private rentalMethod:string,
    ){}
}