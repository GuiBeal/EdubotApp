import { SocketAdapterOptions } from './SocketOptions';
export enum ConnState{
    CLOSED = 0,
    OPENING = 1,
    OPENED = 2,
    CLOSING = 3
}

export enum ErrorType{
    GENERAL = 0,
    OPEN_TIMEOUT = 1,
    WRITE_TIMEOUT = 2
}

type CallbackFunction = (message: any) => void

export interface SocketInterface {

    _state: ConnState;
    onData: CallbackFunction;
    onClose: CallbackFunction;
    onError: CallbackFunction;

    open: (ip: string, port: number, sucess: CallbackFunction, error: CallbackFunction) => void;
    write: (data: any, sucess: CallbackFunction, error: CallbackFunction) => void;
    shutdownWrite: (sucess: CallbackFunction, error: CallbackFunction) => void;
    close: (sucess: CallbackFunction, error: CallbackFunction) => void;
    setOptions: (options: SocketAdapterOptions, sucess: CallbackFunction, error: CallbackFunction) => void;
}