import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.scss'],
})
export class DistanceComponent implements OnInit {
  @Input() S1: string;
  @Input() S2: string;
  @Input() S3: string;
  @Input() S4: string;
  @Input() S5: string;
  @Input() S6: string;
  @Input() S0: string;

  constructor() { }

  ngOnInit() {}

}
