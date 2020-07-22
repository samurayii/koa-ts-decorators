/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListenOptions } from "net";
import { Server } from "http";
import { IKoaDConfig } from "./koad-config";

export interface IKoaD {
    readonly id: string
    readonly server: Server
    readonly prefix: string
    readonly config: IKoaDConfig
    enable: () => void
    disable: () => void
    close: (callback?: (err?: Error) => void) => Server
    listen(callback?: Function): Server;
    listen(
        port?: number,
        hostname?: string,
        backlog?: number,
        listeningListener?: () => void,
    ): Server;
    listen(
        port: number,
        hostname?: string,
        listeningListener?: () => void,
    ): Server;
    listen(
        port: number,
        backlog?: number,
        listeningListener?: () => void,
    ): Server;
    listen(port: number, listeningListener?: () => void): Server;
    listen(
        path: string,
        backlog?: number,
        listeningListener?: () => void,
    ): Server;
    listen(path: string, listeningListener?: () => void): Server;
    listen(options: ListenOptions, listeningListener?: () => void): Server;
    listen(
        handle: any,
        backlog?: number,
        listeningListener?: () => void,
    ): Server;
    listen(handle: any, listeningListener?: () => void): Server;
}