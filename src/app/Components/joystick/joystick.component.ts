import { Component, OnInit } from '@angular/core';
import { SocketCommunicationService } from '../../Services/socket-communication.service';
import { InfoEduService } from '../../Services/info-edu.service';

@Component({
  selector: 'joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.scss'],
})
export class JoystickComponent implements OnInit {
  S0: string = '';
  S1: string = '';
  S2: string = '';
  S3: string = '';
  S4: string = '';
  S5: string = '';
  S6: string = '';

  bumper1: boolean = false;
  bumper2: boolean = false;
  bumper3: boolean = false;
  bumper4: boolean = false;

  constructor(
    public socket: SocketCommunicationService,
    public infoEduService: InfoEduService
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.S0 = this.infoEduService.S0;
      this.S1 = this.infoEduService.S1;
      this.S2 = this.infoEduService.S2;
      this.S3 = this.infoEduService.S3;
      this.S4 = this.infoEduService.S4;
      this.S5 = this.infoEduService.S5;
      this.S6 = this.infoEduService.S6;

      if (
        this.infoEduService.bumpers[0] !== this.bumper1 ||
        this.infoEduService.bumpers[2] !== this.bumper2 ||
        this.infoEduService.bumpers[1] !== this.bumper3 ||
        this.infoEduService.bumpers[3] !== this.bumper4
      ) {
        this.bumper1 = this.infoEduService.bumpers[0];
        this.bumper2 = this.infoEduService.bumpers[2];
        this.bumper3 = this.infoEduService.bumpers[1];
        this.bumper4 = this.infoEduService.bumpers[3];
      }
    }, 500);
  }
}
