import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Station} from './station';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class DataService {
    constructor(private _http: Http) {
    }
    loadStations(): Observable<string> {
        return this._http.get('https://gbfs.thehubway.com/gbfs/en/station_information.json',).
            map(this.extractdata).
            catch(this.handleError);
    }
    private extractdata(res: Response) {
        let body = res.json();
        console.log("inside extarcted");
        console.log(body.data());
        return body.data() || {};
    }
    private handleError(error: Response | any) {
        let errmsg: string;
        errmsg = error.json.toString();
        console.log("Error occured: ", errmsg);
        return Observable.throw(errmsg);
    }
}