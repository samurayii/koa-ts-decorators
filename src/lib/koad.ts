/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Koa from "koa";
import { Server, createServer } from "http";
import Linking from "./linker";
import { IKoaD } from "../interfaces/koad";
import { IKoaDConfig } from "../interfaces/koad-config";

export class KoaD extends Koa implements IKoaD {

    private readonly _config: IKoaDConfig
    private _server: Server
    private _linked_flag: boolean

    constructor (
        config?: IKoaDConfig,
        private readonly _app_id: string = "default"
    ) {
        
        super();

        this._linked_flag = false;

        this._config = {
            listening: "*:3000",
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

        this.context.koad = {
            config: this._config
        };

        this._server = createServer(super.callback());

    }

    get id (): string {
        return this._app_id;
    }

    get server (): Server {
        return this._server;
    }

    get prefix (): string {
        return this._config.prefix;
    }

    get config (): IKoaDConfig {
        return this._config;
    }

    enable (): void {
        this._config.enable = true;
    }

    disable (): void {
        this._config.enable = false;
    }

    listen(...args: any[]): Server {

        if (this._config.enable === false) {
            return this._server;
        } else {

            if (this._linked_flag === false) {
                Linking(this);
                this._linked_flag = true;
            }

            if (typeof args[0] === "function" || typeof args[0] === "string") {
                
                let string_listening: string;

                if (typeof args[0] === "function") {
                    string_listening = this._config.listening;
                } else {
                    string_listening = args[0];
                    args.splice(0, 1);
                }

                const reg = /([a-zA-Z]{1}[-a-zA-Z0-9.]{0,255}|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|\*)\:([0-9]{1,5})/;

                if (reg.test(string_listening)) {
    
                    let host;
                    let port;
    
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

            } else {
                return this._server.listen(...args);
            }
            
        }

    }

    close (callback?: (err?: Error) => void): Server {
        return this._server.close(callback);
    }

}