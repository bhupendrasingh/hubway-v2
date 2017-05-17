import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Station } from './station';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {StationStatus} from './stationStatus';
@Injectable()
export class DataService {
    constructor(private _http: Http) {
    }
    getAllStations(): Observable<Station[]> {
        return this._http.get('https://gbfs.thehubway.com/gbfs/en/station_information.json').
            map(this.extractdata).
            catch(this.handleError);
    }
    getAllStationStatus():Observable<Station[]>{
        return this._http.get('https://gbfs.thehubway.com/gbfs/en/station_status.json').
            map((res:Response)=>res.json() || {}).
            catch(this.handleError);
    }
    private extractdata(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: Response | any) {
        let errmsg: string;
        errmsg = error.json.toString();
        console.log("Error occured: ", errmsg);
        return Observable.throw(errmsg);
    }
}