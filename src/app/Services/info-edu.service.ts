import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class InfoEduService {

  ip = "";
  adress = 0;
  speed = 0;
  angle = 0;

  constructor(private storage: Storage) {
    storage.get('IP').then((val) => {
     this.ip = val;
    });
    storage.get('adress').then((val) => {
      this.adress = val;
    });
    storage.get('speed').then((val) => {
      this.speed = val;
    });
    storage.get('angle').then((val) => {
      this.angle = val;
    });
  }

  setIp(value: string)
  {
    this.ip = value;
    return this.storage.set('IP', value);
  }

  setAdress(value: number)
  {
    this.adress = value;
    return this.storage.set('adress', value);
  }

  setSpeed(value: number)
  {
    this.speed = value;
    return this.storage.set('speed', value);
  }

  setAngle(value: number)
  {
    this.angle = value;
    return this.storage.set('angle', value);
  }

  saveConnectionInfo()
  {
    this.setIp(this.ip);
    this.setAdress(this.adress);
  }

  saveMovementInfo()
  {
    this.setSpeed(this.speed);
    this.setAngle(this.angle);
  }
}
