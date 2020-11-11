import { Component, OnInit } from '@angular/core';
import { SocketCommunicationService } from '../../Services/socket-communication.service';

@Component({
  selector: 'distances-sensores',
  templateUrl: './distances-sensores.component.html',
  styleUrls: ['./distances-sensores.component.scss'],
})
export class DistancesSensoresComponent implements OnInit {

  constructor(public socket: SocketCommunicationService,) { }

  ngOnInit() {}

}
