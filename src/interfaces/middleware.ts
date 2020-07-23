import { IKoaDConfig } from "./koad-config";

export interface IMiddleware {
    use: (config: IKoaDConfig) => unknown | void
}