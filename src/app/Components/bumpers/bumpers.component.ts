import { Component, OnInit } from '@angular/core';
import { SocketCommunicationService } from '../../Services/socket-communication.service';

@Component({
  selector: 'bumpers',
  templateUrl: './bumpers.component.html',
  styleUrls: ['./bumpers.component.scss'],
})
export class BumpersComponent implements OnInit {

  bumperTopLeft = false;
  bumperTopRight = false;
  bumperBottomLeft = false;
  bumperBottomRight = false;

  constructor(public socket: SocketCommunicationService,) { }

  ngOnInit() {}

  readBumpers()
  {
    this.socket.readBumpers();
  }

}
