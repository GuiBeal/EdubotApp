import { Component, OnInit } from '@angular/core';
import { SocketCommunicationService } from '../../Services/socket-communication.service';
import { InfoEduService } from '../../Services/info-edu.service';

@Component({
  selector: 'joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.scss'],
})
export class JoystickComponent implements OnInit {

  constructor(public socket: SocketCommunicationService, public infoEduService: InfoEduService) { }

  ngOnInit() {}

}
