import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  constructor(private _dataservice: DataService) {
  }
  title = 'app works!';
  ngOnInit() {
    this._dataservice.loadmap();
  }
}
