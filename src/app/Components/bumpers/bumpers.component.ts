import { Component, Input, OnInit } from '@angular/core';
import { InfoEduService } from '../../Services/info-edu.service';

@Component({
  selector: 'bumpers',
  templateUrl: './bumpers.component.html',
  styleUrls: ['./bumpers.component.scss'],
})
export class BumpersComponent implements OnInit {
  @Input() Bumper1;
  @Input() Bumper2;
  @Input() Bumper3;
  @Input() Bumper4;

  constructor() { }

  ngOnInit() {}

}
