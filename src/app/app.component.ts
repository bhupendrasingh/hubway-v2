import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  stations = {};
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
  getStationList(){
     console.log("inside getstationlist");
    this._dataservice.loadStations().subscribe();
  }
}
