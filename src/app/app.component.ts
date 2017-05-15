import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Station } from './station';
declare var google: any;
var myMap: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  stations: Station[];
  stationReports: any;
  bikes_available: number;
  docks_available: number;
  constructor(private _dataservice: DataService) {
  }

  ngOnInit() {
    myMap = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 42.3601, lng: -71.0589 },
      scrollwheel: false,
      zoom: 16
    });
    this.getStationStatusR();
    this.getStationList();
  }
  
  getStationList() {
    this._dataservice.getAllStations()
    .subscribe(stations => {
      this.stations = stations;
      this.createMapMarkers(this.stations);
    });
  }

  createMapMarkers(stationList) {
    let stationsArray = stationList['data']['stations'];
    for (var _i = 0; _i < stationsArray.length; _i++) {
      var station_id = stationsArray['station_id'];
      var marker = new google.maps.Marker({
        position: {
          lat: stationsArray[_i]['lat'],
          lng: stationsArray[_i]['lon'],
        },
        map: myMap,
        title: stationsArray[_i]['name'],
        visible: true
      });
      marker.addListener('click',function(){
        this.createStatusWindow(this.station_id, this.marker,this.stationReports);
      });
    }
  }

  getStationStatusR(){
    this._dataservice.getAllStationStatus()
    .subscribe(stationReports => {
      this.stationReports = stationReports
      // this.createStatusWindow(station_id, marker, stationReports);
    });
  }

  createStatusWindow(station_id, marker, stationReports) {
    var infowindow: any;
    // this._dataservice.getAllStationStatus()
    // .subscribe(stationReports => {
    //   this.stationReports = stationReports
    //   // this.createStatusWindow(station_id, marker, stationReports);
    // });
    let allStationStatus = stationReports['data']['stations'];
    console.log(allStationStatus['station_id'])
    //  for(var _j=0;_j < allStationStatus.length; _j++){
      var statusPair = allStationStatus.filter(function (station) {
        if (station['station_id'] == station_id) {
          this.bikes_available = station['num_bikes_available'];
          this.docks_available = station['num_docks_available'];
        }
      });
      let contentString = '<div id="content">' + '<h3>Current Status</h3>' +
      '<p>Bikes Available: ' + this.bikes_available + '</p>' + '<p>Docks Available: '
      + this.docks_available + '</p>' + '</div>';
      infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      // prev_infowindow = infowindow;
      infowindow.open(myMap, marker);
      //  }
    }
  }