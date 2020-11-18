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

    this.socket.onData = function (data) {
      console.log(data);
    };
    this.socket.onError = function (errorMessage) {
      console.log('Error');
      console.log(errorMessage);
    };
    this.socket.onClose = function (hasError) {};

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
                () => {},
                () => {}
              );
            },
            (e) => {
              console.log(' err0:');
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
          console.log(' success');
        },
        (e) => {
          console.log(' err0:');
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

    var data = this.stringToCharCode('v' + speed / 100);
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

    var data = this.stringToCharCode('v-' + speed / 100);
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

    var data = this.stringToCharCode('r-' + angle);
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

    var data = this.stringToCharCode('r' + angle);
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

    var data = this.stringToCharCode('b');
    this.socket.write(
      data,
      () => {},
      () => {}
    );
  }

  readBumpers(): number {
    alert('implementar');
    return 0;
  }

  stringToCharCode(dataString: string): Uint8Array {
    var data = new Uint8Array(dataString.length);
    for (var i = 0; i < data.length; i++) {
      data[i] = dataString.charCodeAt(i);
    }

    return data;
  }
}
