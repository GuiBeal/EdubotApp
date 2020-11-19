import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'distances-sensores',
  templateUrl: './distances-sensores.component.html',
  styleUrls: ['./distances-sensores.component.scss'],
})
export class DistancesSensoresComponent implements OnInit {
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
