/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
type TMiddlewareRecord = {
    name: string
    instance: any
}

export interface IMiddlewareCatalog {
    readonly catalog: TMiddlewareRecord[]
    add: (
        name: string,
        instance: any
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
        instance: any
    ): void {

        for (const record of this._catalog) {
            if (name === record.name) {
                throw new Error(`Koa decorators error. Middleware ${name} for application ${this._app_id} already exist`);
            }
        }

        this._catalog.push({
            name: name,
            instance: instance
        });

    }

    reset (): void {
        this._catalog = [];
    }

}