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
  errorMessage: string;
  mode = 'Observable';

  constructor(private _dataservice: DataService) {
  }

  ngOnInit() {
    myMap = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 42.3601, lng: -71.0589 },
      scrollwheel: false,
      zoom: 16
    });
    this.getStationList();
    // this.createMapMarkers();
  }
  getStationList() {
    this._dataservice.loadStations()
      .subscribe(stations => {
        this.stations = stations;
       setTimeout(function(){

       },10000);
        this.createMapMarkers(this.stations);
      });
  }

  createMapMarkers(stationList) {
    var prev_infowindow = false;
    let stationsArray = stationList['data']['stations'];
    for (var _i = 0; _i < stationsArray.length; _i++) {
      // console.log(myMap);
      // console.log( stationsArray[_i]['lat']);
      var marker = new google.maps.Marker({
        postion: {
          lat: stationsArray[_i]['lat'],
          lon: stationsArray[_i]['lon'],
        },
        // map: myMap,
        title: stationsArray[_i]['name'],
        visible: true
      });
      marker.setMap(myMap);
      // console.log(marker);
      marker.addListener('click', function () {
        if (prev_infowindow) {
          // prev_infowindow.close();
          alert("hello");
        }
        // generate_status(id, map, marker)
        //infowindow.open(map,marker);
      });
    }
  }
}