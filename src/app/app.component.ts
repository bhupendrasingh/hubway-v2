import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import {Station} from './station';
declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  stations:Station[];
  errorMessage: string;
  mode = 'Observable';

  constructor(private _dataservice: DataService) {
  }

  ngOnInit() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 42.3601, lng: -71.0589 },
      scrollwheel: false,
      zoom: 10
    });
  }
  getStationList() {
    this._dataservice.loadStations()
      .subscribe(stations => {
        this.stations = stations;
      });
  }
}
