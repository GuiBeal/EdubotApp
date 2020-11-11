import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { JoystickComponent } from '../Components/joystick/joystick.component';
import { SetpointsComponent } from '../Components/setpoints/setpoints.component';
import { DistancesSensoresComponent } from '../Components/distances-sensores/distances-sensores.component';
import { BumpersComponent } from '../Components/bumpers/bumpers.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    JoystickComponent,
    SetpointsComponent,
    DistancesSensoresComponent,
    BumpersComponent,
  ],
  bootstrap: [
    JoystickComponent,
    SetpointsComponent,
    DistancesSensoresComponent,
    BumpersComponent,
  ],
})
export class HomePageModule {}
