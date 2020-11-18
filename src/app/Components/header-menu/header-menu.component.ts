import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SetpointsComponent } from '../setpoints/setpoints.component';
import { SocketCommunicationService } from '../../Services/socket-communication.service';

@Component({
  selector: 'header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private socket: SocketCommunicationService
  ) {}

  ngOnInit() {}

  getConnString() {
    return this.socket.socket._state === 2 ? 'Conectado' : 'Desconectado';
  }

  async createModal() {
    let modal = await this.modalController.create({
      component: SetpointsComponent,
    });

    modal.present();
  }
}
