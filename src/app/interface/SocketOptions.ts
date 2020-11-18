export interface SocketAdapterOptions {
    
    keepAlive: boolean;
    oobInline: boolean;
    soLinger: number;
    soTimeout: number;
    receiveBufferSize: number;
    sendBufferSize: number;
    trafficClass: number;
}