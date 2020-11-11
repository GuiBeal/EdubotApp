import { Injectable } from '@angular/core';
import { SocketInterface, ConnState } from '../interface/Socket.Interface';

declare var Socket: any;

@Injectable({
  providedIn: 'root',
})
export class SocketCommunicationService {
  socket: SocketInterface;
  constructor() {
    this.socket = new Socket();

    this.socket.onData = function (data) {
      // invoked after new batch of data is received (typed array of bytes Uint8Array)
    };
    this.socket.onError = function (errorMessage) {
      // invoked after error occurs during connection
    };
    this.socket.onClose = function (hasError) {
      // invoked after connection close
    };

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
    }
  }

  moveForward() {
    alert('pra frente');
  }

  moveBack() {
    alert('pra tras');
  }

  rotateLeft() {
    alert('rotacione esquerda');
  }

  rotateRigth() {
    alert('rotacione direita');
  }

  stop() {
    alert('pare');
  }

  readBumpers(): number {
    alert('implementar');
    return 0;
  }
}
