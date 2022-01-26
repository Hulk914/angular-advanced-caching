import { NetworkService } from './network.service';
import { Component, OnInit } from '@angular/core';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  data = '';

  constructor(private _networkService: NetworkService) {}

  ngOnInit(): void {
    this.makeCall();
  }

  makeCall() {
    this._networkService.makeCatFactCall().subscribe((res) => {
      this.data = res['fact'];
    });
  }
}
