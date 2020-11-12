import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoEduService } from '../../Services/info-edu.service';
import { SocketCommunicationService } from '../../Services/socket-communication.service';

@Component({
  selector: 'setpoints',
  templateUrl: './setpoints.component.html',
  styleUrls: ['./setpoints.component.scss'],
})
export class SetpointsComponent implements OnInit {

  constructor(public infoEduService: InfoEduService,
              private socketService: SocketCommunicationService,
              private modalController: ModalController) { }

  ngOnInit() {}

  connect()
  {
    this.infoEduService.saveConnectionInfo();
    this.socketService.connect(this.infoEduService.ip, this.infoEduService.adress);
  }

  dismissModal()
  {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
