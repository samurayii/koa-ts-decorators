/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
type TMiddlewareRecord = {
    name: string
    constructor: any
}

export interface IMiddlewareCatalog {
    readonly catalog: TMiddlewareRecord[]
    add: (
        name: string,
        constructor: any
    ) => void
    reset: () => void
}

export class MiddlewareCatalog implements IMiddlewareCatalog {
    
    private _catalog: TMiddlewareRecord[]

    constructor (private readonly _app_id: string) {
        this._catalog = [];
    }

    get catalog (): TMiddlewareRecord[] {
        return this._catalog;
    }

    add (
        name: string,
        constructor: any
    ): void {

        for (const record of this._catalog) {
            if (name === record.name) {
                throw new Error(`Koa decorators error. Middleware ${name} for application ${this._app_id} already exist`);
            }
        }

        this._catalog.push({
            name: name,
            constructor: constructor
        });

    }

    reset (): void {
        this._catalog = [];
    }

}