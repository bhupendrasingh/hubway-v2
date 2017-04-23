import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class DataService {
    constructor(private _http: Http) {
    }
    loadmap(): Observable<string> {
        return this._http.get('https://maps.googleapis.com/maps/api/js?key=').
            map(this.extractdata).
            catch(this.handleError);
    }
    private extractdata(res: Response) {
        let body = res.json();
        return body.data() || {};
    }
    private handleError(error: Response | any) {
        let errmsg: string;
        errmsg = error.json.toString();
        console.log("Error occured: ", errmsg);
        return Observable.throw(errmsg);
    }
}