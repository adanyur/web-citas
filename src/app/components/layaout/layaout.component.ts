import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/core/service/http-data.service';

@Component({
  selector: 'app-layaout',
  templateUrl: './layaout.component.html',
  styleUrls: ['./layaout.component.css'],
})
export class LayaoutComponent implements OnInit {
  constructor() {}
  loading: boolean;
  ngOnInit(): void {}
}
