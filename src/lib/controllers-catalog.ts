/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
type TControllerRecord = {
    name: string
    path: string
    constructor: any
    instance?: any
}

export interface IControllersCatalog {
    readonly catalog: TControllerRecord[]
    add: (
        name: string,
        path: string,
        target: Function
    ) => void
    reset: () => void
}

export class ControllersCatalog implements IControllersCatalog {
    
    private _catalog: TControllerRecord[]

    constructor (private readonly _app_id: string) {
        this._catalog = [];
    }

    get catalog (): TControllerRecord[] {
        return this._catalog;
    }

    add (
        name: string,
        path: string,
        target: Function
    ): void {

        for (const record of this._catalog) {
            if (path === record.path) {
                throw new Error(`Koa decorators error. Path ${path} for controller ${name} application ${this._app_id} already exist for controller ${record.name}`);
            }
        }

        const constructor = target as FunctionConstructor;
        
        this._catalog.push({
            name: name,
            path: path,
            constructor: constructor
        });

    }

    reset (): void {
        this._catalog = [];
    }

}