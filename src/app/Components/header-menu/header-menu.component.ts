import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SetpointsComponent } from '../setpoints/setpoints.component';

@Component({
  selector: 'header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {

  constructor(private modalController: ModalController ) { }

  ngOnInit() {}

  async createModal()
  {
    let modal = await this.modalController.create({
      component: SetpointsComponent
    });
    
    modal.present();
  }

}
