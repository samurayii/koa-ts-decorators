/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListenOptions } from "net";
import { Server } from "http";

export interface IKoaDConfig {
    listening?: string,
    keys?: string[]
    env?: string
    proxy?: boolean
    prefix?: string
    enable?: boolean
    subdomain_offset?: number
    proxy_header?: string
    ips_count?: number
    [key: string]: any
}

export interface IMiddleware {
    use: (config: IKoaDConfig) => unknown | void
}

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