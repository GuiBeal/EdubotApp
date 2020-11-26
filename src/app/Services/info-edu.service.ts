import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class InfoEduService {
  ip = '';
  port = 0;
  speed = 0;
  angle = 0;

  bumpers: boolean[] = [false, false, false, false];
  S0 = '0';
  S1 = '0';
  S2 = '0';
  S3 = '0';
  S4 = '0';
  S5 = '0';
  S6 = '0';

  constructor(private storage: Storage) {
    storage.get('IP').then((val) => {
      this.ip = val;
    });
    storage.get('port').then((val) => {
      this.port = val;
    });
    storage.get('speed').then((val) => {
      this.speed = val;
    });
    storage.get('angle').then((val) => {
      this.angle = val;
    });
  }

  setIp(value: string) {
    this.ip = value;
    return this.storage.set('IP', value);
  }

  setPort(value: number) {
    this.port = value;
    return this.storage.set('port', value);
  }

  setSpeed(value: number) {
    this.speed = value;
    return this.storage.set('speed', value);
  }

  setAngle(value: number) {
    this.angle = value;
    return this.storage.set('angle', value);
  }

  saveConnectionInfo() {
    this.setIp(this.ip);
    this.setPort(this.port);
  }

  saveMovementInfo() {
    this.setSpeed(this.speed);
    this.setAngle(this.angle);
  }
}
