import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderMenuComponent } from './Components/header-menu/header-menu.component';
import { SocketCommunicationService } from './Services/socket-communication.service';
import { IonicStorageModule } from '@ionic/storage';
import { InfoEduService } from './Services/info-edu.service';

@NgModule({
  declarations: [AppComponent, HeaderMenuComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    IonicStorageModule.forRoot({
      name: '__mydb',
driverOrder: ['localstorage']
    })],
  providers: [
    StatusBar,
    SocketCommunicationService,
    InfoEduService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent, HeaderMenuComponent]
})
export class AppModule {}
