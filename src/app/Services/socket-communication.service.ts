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

  connect(ip: string, port: number) {
    console.log(this.socket._state);

    if (this.socket._state === ConnState.OPENED) {
      console.log('Socket is already open, closing.');

      this.socket.shutdownWrite(
        () => {
          console.log('Socket shutdown successfully.');
        },
        () => {
          console.log('Socket shutdown failed.');
        }
      );

      this.socket.close(
        () => {
          console.log('Socket closed succesfully.');
          this.socket.open(
            ip,
            port,
            (e) => {
              console.log('Socket connected successfully. to ' + ip + ':' + port + '.');
              alert('Conectado.');
            },
            (e) => {
              console.log('Socket connection failed.');
              alert('Não foi possível conectar.');
            }
          );
        },
        () => {
          console.log('Socket closure failed.');
          alert('Não foi possível conectar.');
        }
      );
    } else {
      this.socket.open(
        ip,
        port,
        (e) => {
          console.log('Socket connected successfully. to ' + ip + ':' + port + '.');
          alert('Conectado.');
        },
        (e) => {
          console.log('Socket connection failed.');
          alert('Não foi possível conectar.');
        }
      );
    }
  }

  /*
   * Deve ser chamado antes de conectar
   */
  setOptions()
  {
    let options: SocketAdapterOptions = <any>{};
    options.keepAlive = true;

    this.socket.setOptions(
      options,
      () => {
        console.log('Options set successfully.');
      },
      () => {
        console.log('Options setting failed.');
      }
    );
  }

  moveForward(speed: number) {
    if (this.socket._state !== ConnState.OPENED) {
      alert('Edubot desconectado, por favor, conecte-o ao aplicativo novamente');
      return;
    }

    const data = this.stringToCharCode('v' + speed / 100 + '\r\n');
    this.socket.write(
      data,
      () => {},
      () => {}
    );
  }

  moveBack(speed: number) {
    if (this.socket._state !== ConnState.OPENED) {
      alert('Edubot desconectado, por favor, conecte-o ao aplicativo novamente');
      return;
    }

    const data = this.stringToCharCode('v-' + speed / 100 + '\r\n');
    this.socket.write(
      data,
      () => {},
      () => {}
    );
  }

  rotateLeft(angle: number) {
    if (this.socket._state !== ConnState.OPENED) {
      alert('Edubot desconectado, por favor, conecte-o ao aplicativo novamente');
      return;
    }

    const data = this.stringToCharCode('r-' + angle + '\r\n');
    this.socket.write(
      data,
      () => {},
      () => {}
    );
  }

  rotateRigth(angle: number) {
    if (this.socket._state !== ConnState.OPENED) {
      alert('Edubot desconectado, por favor, conecte-o ao aplicativo novamente');
      return;
    }

    const data = this.stringToCharCode('r' + angle + '\r\n');
    this.socket.write(
      data,
      () => {},
      () => {}
    );
  }

  stop() {
    if (this.socket._state !== ConnState.OPENED) {
      alert('Edubot desconectado, por favor, conecte-o ao aplicativo novamente');
      return;
    }

    const data = this.stringToCharCode('b\r\n');
    this.socket.write(
      data,
      () => {},
      () => {}
    );
  }

  readSensorsInfo(dataArr: number[])
  {
    console.log('Raw data: ' + dataArr);

    if (dataArr == null || (dataArr[0] === 13 && dataArr[1] === 10)) { // descarta mensagem vazia ou "\r\n"
      return 0;
    }

    // s0,s1,s2,s3,s4,s5,s6,b0,b1,b2,b3,dt,encoderLeft,encoderRigth,x,y,theta,bat0,bat1,bat2
    let dataString = '';

    dataArr.forEach(data => {
      const char = String.fromCharCode(data);
      dataString += char;
    });
    console.log(`ASCII data: ${dataString}`);

    const dtArr = dataString.split(',', 20);

    if (dtArr.length < 20) {
      return 0;
    }

    this.info.S0 = dtArr[0];
    this.info.S1 = dtArr[1];
    this.info.S2 = dtArr[2];
    this.info.S3 = dtArr[3];
    this.info.S4 = dtArr[4];
    this.info.S5 = dtArr[5];
    this.info.S6 = dtArr[6];

    const bumpers = dtArr.slice(7, 11);

    for (let i = 0; i < bumpers.length; i++)
    {
      this.info.bumpers[i] = (bumpers[i] !== '0');

      console.log(this.info.bumpers[i])
    }
  }

  stringToCharCode(dataString: string): Uint8Array {
    const data = new Uint8Array(dataString.length);
    for (let i = 0; i < data.length; i++) {
      data[i] = dataString.charCodeAt(i);
    }

    return data;
  }
}
