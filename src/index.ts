/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Koa from "koa";
import { ListenOptions } from "net";
import { Server, createServer } from "http";
import { Linker } from "./lib/linker";

export * from "./decorators/get";
export * from "./decorators/controller";

export interface IKoaDConfig {
    keys?: string[]
    env?: string
    proxy?: boolean
    prefix?: string
    enable?: boolean
    subdomain_offset?: number
    proxy_header?: string
    ips_count?: number
}

export interface IKoaD {
    readonly id: string
    readonly server: Server
    readonly prefix: string
    close: (callback?: (err?: Error) => void) => Server
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

export default class KoaD extends Koa implements IKoaD {

    private readonly _config: IKoaDConfig
    private _server: Server

    constructor (
        config?: IKoaDConfig,
        private readonly _id: string = "default"
    ) {
        
        super();

        this._config = {
            env: "development",
            enable: true,
            proxy: false,
            prefix: "/",
            subdomain_offset: 2,
            proxy_header: "X-Forwarded-For",
            ips_count: 0,
            ...config
        };

        this.env = this._config.env;
        this.proxy = this._config.proxy;
        this.proxyIpHeader = this._config.proxy_header;
        this.subdomainOffset = this._config.subdomain_offset;
        this.maxIpsCount = this._config.ips_count;

        if (this._config.keys !== undefined) {
            this.keys = this._config.keys;
        }

        this._server = createServer(super.callback());

    }

    get id (): string {
        return this._id;
    }

    get server (): Server {
        return this._server;
    }

    get prefix (): string {
        return this._config.prefix;
    }

    listen(...args: any[]): Server {

        if (this._config.enable === false) {
            return this._server;
        } else {

            Linker(this);

            const reg = /([a-zA-Z]{1}[-a-zA-Z0-9.]{0,255}|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|\*)\:([0-9]{1,5})/;

            if (reg.test(args[0])) {

                const string_listening: string = args[0];

                args.splice(0, 1);

                let host = "*";
                let port = 3000;

                const arg = string_listening.match(reg);
                
                if (arg) {
                    
                    port = parseInt(arg[2]);
                    
                    if (arg[1] === "*") {
                        host = "0.0.0.0";
                    }

                    if (arg[1] !== "*" && arg[1] !== "0.0.0.0") {
                        host = arg[1];
                    }
                
                }

                return this._server.listen(port, host, ...args);

            } else {
                return this._server.listen(...args);
            }
            
        }

    }

    close (callback?: (err?: Error) => void): Server {
        return this._server.close(callback);
    }
}