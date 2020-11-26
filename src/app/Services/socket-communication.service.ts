import { Injectable } from '@angular/core';
import { SocketInterface, ConnState } from '../interface/Socket.Interface';
import { InfoEduService } from './info-edu.service';
import { SocketAdapterOptions } from '../interface/SocketOptions';

declare var Socket: any;

@Injectable({
  providedIn: 'root',
})
export class SocketCommunicationService {
  socket: SocketInterface;
  constructor(private info: InfoEduService) {
    this.socket = new Socket();

    this.socket.onData = (data) => {
      this.readSensorsInfo(data);
    };
    this.socket.onError = (errorMessage) => {
      console.log('Error');
      console.log(errorMessage);
    };
    this.socket.onClose = (hasError) => {};

    console.log(this.socket);
  }

  connect(ip: string, adress: number) {
    console.log(this.socket._state);

    if (this.socket._state == ConnState.OPENED) {
      console.log('closing...');

      this.socket.close(
        () => {
          this.socket.open(
            ip,
            adress,
            (e) => {
              console.log(' success');
              var dataString = 'Hello world';
              var data = new Uint8Array(dataString.length);
              for (var i = 0; i < data.length; i++) {
                data[i] = dataString.charCodeAt(i);
              }
              this.socket.write(
                data,
                () => {
                  console.log(' success Connection');
                },
                () => {
                  console.log(' error Connection');
                }
              );
            },
            (e) => {
              console.log(' error Close');
            }
          );
        },
        () => {}
      );
    } else {
      this.socket.open(
        ip,
        adress,
        (e) => {
          console.log(' success Connection');
        },
        (e) => {
          console.log(' error Connection');
        }
      );
    }
  }

  setOptions(ip, adress)
  {
    var options: SocketAdapterOptions = <any>{};

    options.keepAlive = true;
    options.soTimeout = 3000;

    this.socket.setOptions(
      options,
      () => {
        console.log('Sucess options');
        this.socket.open(
          ip,
          adress,
          (e) => {
            console.log(' success');
          },
          (e) => {
            console.log(' err0:');
          }
        );
      },
      () => {
        console.log('Error options');
      }
    );
  }

  moveForward(speed: number) {
    if (this.socket._state !== ConnState.OPENED) {
      alert(
        'Edubot desconectado, por favor, conecte-o ao aplicativo novamente'
      );
      return;
    }

    var data = this.stringToCharCode('v' + speed / 100 + '\r\n');
    this.socket.write(
      data,
      () => {},
      () => {}
    );
  }

  moveBack(speed: number) {
    if (this.socket._state != ConnState.OPENED) {
      alert(
        'Edubot desconectado, por favor, conecte-o ao aplicativo novamente'
      );
      return;
    }

    var data = this.stringToCharCode('v-' + speed / 100 + '\r\n');
    this.socket.write(
      data,
      () => {},
      () => {}
    );
  }

  rotateLeft(angle: number) {
    if (this.socket._state != ConnState.OPENED) {
      alert(
        'Edubot desconectado, por favor, conecte-o ao aplicativo novamente'
      );
      return;
    }

    var data = this.stringToCharCode('r-' + angle + '\r\n');
    this.socket.write(
      data,
      () => {},
      () => {}
    );
  }

  rotateRigth(angle: number) {
    if (this.socket._state != ConnState.OPENED) {
      alert(
        'Edubot desconectado, por favor, conecte-o ao aplicativo novamente'
      );
      return;
    }

    var data = this.stringToCharCode('r' + angle + '\r\n');
    this.socket.write(
      data,
      () => {},
      () => {}
    );
  }

  stop() {
    if (this.socket._state != ConnState.OPENED) {
      alert(
        'Edubot desconectado, por favor, conecte-o ao aplicativo novamente'
      );
      return;
    }

    var data = this.stringToCharCode('b\r\n');
    this.socket.write(
      data,
      () => {},
      () => {}
    );
  }

  readSensorsInfo(dataArr: number[])
  {
    console.log('Raw data: ' + dataArr);

    if (dataArr == null) {
      return 0;
    }

    if (dataArr[0] === 13 && dataArr[1] === 10) { // descarta \r\n
      return 0;
    }

    // s0,s1,s2,s3,s4,s5,s6,b0,b1,b2,b3,dt,encoderLeft,encoderRigth, x, y, theta
    let dataString = '';

    dataArr.forEach(data => {
      let char = String.fromCharCode(data);
      dataString += char;
    });
    console.log(`ASCII data: ${dataString}`);

    var dtArr = dataString.split(',', 20);

    if (dtArr.length !== 20) {
      return 0;
    }

    this.info.S0 = dtArr[0];
    this.info.S1 = dtArr[1];
    this.info.S2 = dtArr[2];
    this.info.S3 = dtArr[3];
    this.info.S4 = dtArr[4];
    this.info.S5 = dtArr[5];
    this.info.S6 = dtArr[6];

    let buffers = dtArr.slice(7, 11);

    for(let i = 0; i < buffers.length; i++)
    {
      this.info.bumpers[i] = buffers[i] === "true";

      console.log(this.info.bumpers[i])
    }
    this.info.bumpers
  }

  stringToCharCode(dataString: string): Uint8Array {
    var data = new Uint8Array(dataString.length);
    for (var i = 0; i < data.length; i++) {
      data[i] = dataString.charCodeAt(i);
    }

    return data;
  }
}
