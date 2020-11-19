import { Component, OnInit } from '@angular/core';
import { InfoEduService } from '../../Services/info-edu.service';

@Component({
  selector: 'bumpers',
  templateUrl: './bumpers.component.html',
  styleUrls: ['./bumpers.component.scss'],
})
export class BumpersComponent implements OnInit {

  constructor(public info: InfoEduService) { }

  ngOnInit() {}

}
